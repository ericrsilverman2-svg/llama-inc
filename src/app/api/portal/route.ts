import { NextResponse } from "next/server";
import { getStripe, siteUrl } from "@/lib/stripe";

// Opens the Stripe customer portal for the customer on a completed Checkout Session.
// The demo has no accounts, so the session id stands in for a login. In a real app
// the customer id would come from the signed-in user's record.
export async function POST(req: Request) {
  const form = await req.formData();
  const sessionId = String(form.get("session_id") ?? "");
  if (!sessionId.startsWith("cs_")) {
    return NextResponse.json({ error: "Missing or invalid session_id" }, { status: 400 });
  }

  const stripe = getStripe();
  const checkout = await stripe.checkout.sessions.retrieve(sessionId);
  const customer =
    typeof checkout.customer === "string" ? checkout.customer : checkout.customer?.id;
  if (!customer) {
    return NextResponse.json({ error: "No customer on this session" }, { status: 400 });
  }

  const portal = await stripe.billingPortal.sessions.create({
    customer,
    return_url: `${siteUrl()}/success?session_id=${sessionId}`,
  });

  return NextResponse.redirect(portal.url, 303);
}
