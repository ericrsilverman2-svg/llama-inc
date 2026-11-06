import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { notifyMember } from "@/lib/notify";

// Receives the three events the SaaS guide lists as the minimum, plus three that
// matter once members are international:
//   checkout.session.completed       -> a new subscription was started
//   invoice.paid                     -> a billing period was paid (initial and renewals)
//   invoice.payment_failed           -> a renewal failed; point the customer to the portal
//   invoice.payment_action_required  -> a renewal needs 3DS/SCA; the member must act
//   customer.subscription.updated    -> past due after retries, or cancellation scheduled
//   customer.subscription.deleted    -> the subscription ended
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
      await notifyMember(customerId(invoice.customer), { kind: "payment_failed", invoiceId: invoice.id });
      break;
    }
    case "invoice.payment_action_required": {
      // Off-session renewal hit a 3D Secure / SCA challenge. Stripe cannot complete it
      // alone; the hosted invoice page lets the member authenticate.
      const invoice = event.data.object;
      console.log("[webhook] invoice needs authentication", {
        invoice: invoice.id,
        customer: invoice.customer,
        hosted_invoice_url: invoice.hosted_invoice_url,
      });
      await notifyMember(customerId(invoice.customer), {
        kind: "payment_action_required",
        invoiceId: invoice.id,
        hostedInvoiceUrl: invoice.hosted_invoice_url ?? null,
      });
      break;
    }
    case "customer.subscription.updated": {
      const sub = event.data.object;
      const prev = event.data.previous_attributes ?? {};
      const cid = customerId(sub.customer);
      if ("status" in prev && sub.status === "past_due") {
        console.log("[webhook] subscription past due", { subscription: sub.id, customer: cid });
        await notifyMember(cid, { kind: "past_due" });
      }
      if ("cancel_at_period_end" in prev || "cancel_at" in prev) {
        if (sub.cancel_at_period_end || sub.cancel_at) {
          const endsAt = sub.cancel_at ? new Date(sub.cancel_at * 1000) : null;
          console.log("[webhook] cancellation scheduled", { subscription: sub.id, customer: cid, endsAt });
          await notifyMember(cid, { kind: "cancellation_scheduled", endsAt });
        } else {
          console.log("[webhook] cancellation reverted", { subscription: sub.id, customer: cid });
          await notifyMember(cid, { kind: "cancellation_reverted" });
        }
      }
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object;
      console.log("[webhook] subscription ended", { subscription: sub.id, customer: sub.customer });
      await notifyMember(customerId(sub.customer), { kind: "subscription_ended" });
      break;
    }
    default:
      console.log("[webhook] ignored", event.type);
  }

  return NextResponse.json({ received: true });
}

function customerId(c: string | { id: string } | null): string | null {
  return typeof c === "string" ? c : c?.id ?? null;
}
