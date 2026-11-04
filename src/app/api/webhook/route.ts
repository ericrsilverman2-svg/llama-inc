import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

// Receives the three events the SaaS guide lists as the minimum:
//   checkout.session.completed  -> a new subscription was started
//   invoice.paid                -> a billing period was paid (initial and renewals)
//   invoice.payment_failed      -> a renewal failed; point the customer to the portal
//
// The demo has no database, so "provisioning" is a log line. The shape is what a
// real app would do: verify the signature, dedupe on event.id, act on the type.

// Dedupe within one server process. Stripe retries on non-2xx, and retries carry
// the same event.id. A real app would persist processed ids.
const seen = new Set<string>();

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "STRIPE_WEBHOOK_SECRET is not set" }, { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  // Signature verification needs the raw body, not parsed JSON.
  const payload = await req.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(payload, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json({ error: `Signature verification failed: ${message}` }, { status: 400 });
  }

  if (seen.has(event.id)) {
    return NextResponse.json({ received: true, duplicate: true });
  }
  seen.add(event.id);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      // Payment can still be pending for delayed-notification methods; the guide
      // says to wait for invoice.paid before granting access. Logged here only.
      console.log("[webhook] checkout completed", {
        session: session.id,
        customer: session.customer,
        subscription: session.subscription,
        status: session.payment_status,
      });
      break;
    }
    case "invoice.paid": {
      const invoice = event.data.object;
      console.log("[webhook] invoice paid", {
        invoice: invoice.id,
        customer: invoice.customer,
        amount: invoice.amount_paid,
        currency: invoice.currency,
      });
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object;
      console.log("[webhook] invoice payment failed", {
        invoice: invoice.id,
        customer: invoice.customer,
      });
      break;
    }
    default:
      console.log("[webhook] ignored", event.type);
  }

  return NextResponse.json({ received: true });
}
