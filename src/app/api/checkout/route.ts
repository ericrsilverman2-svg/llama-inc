import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, PREMIUM_PRICE_ID, TRIAL_DAYS, siteUrl } from "@/lib/stripe";

// Creates a Checkout Session for the Premium plan and redirects the browser to it.
// Source: docs.stripe.com/get-started/use-cases/saas-subscriptions (trial section)
// and the Checkout Sessions API reference.
export async function POST() {
  if (!PREMIUM_PRICE_ID) {
    return NextResponse.json(
      { error: "STRIPE_PRICE_ID is not set. Create the Premium price in the Dashboard first." },
      { status: 500 },
    );
  }

  const stripe = getStripe();
  const base = siteUrl();

  const wantConsent = process.env.CHECKOUT_TERMS_CONSENT === "true";
  const params = (withConsent: boolean): Stripe.Checkout.SessionCreateParams => ({
      mode: "subscription",
      line_items: [{ price: PREMIUM_PRICE_ID, quantity: 1 }],
      // Checkout substitutes the real id for the placeholder after payment.
      success_url: `${base}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/cancel`,
      allow_promotion_codes: true,
      // Tags sessions from this flow so the Dashboard can compare it to others.
      integration_identifier: "llama_premium_checkout_qzmvwkph",
      subscription_data: {
        trial_period_days: TRIAL_DAYS,
      },
      // Stripe Tax: calculates VAT/GST/sales tax from the address Checkout collects.
      // Collects nothing until a registration is active in Tax > Locations.
      automatic_tax: { enabled: true },
      // Business buyers can enter a VAT/GST id, which reverse-charges cross-border sales.
      tax_id_collection: { enabled: true },
      // Explicit terms acceptance (expected in the EU, required in Germany). Stripe
      // refuses this parameter until a Terms of service URL is set in Dashboard >
      // Settings > Business details > Public details, hence the flag.
      ...(withConsent ? { consent_collection: { terms_of_service: "required" } } : {}),
  });

  // A fresh key per click: a retried request creates one session, not two.
  const opts = () => ({ idempotencyKey: crypto.randomUUID() });

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.create(params(wantConsent), opts());
  } catch (err) {
    // If the Dashboard has no Terms of service URL yet, Stripe rejects the consent
    // parameter. Degrade to a session without the checkbox rather than failing checkout.
    const msg = err instanceof Error ? err.message : "";
    if (wantConsent && /terms of service/i.test(msg)) {
      console.warn("[checkout] terms consent requested but no Terms URL in Stripe Dashboard; retrying without it");
      session = await stripe.checkout.sessions.create(params(false), opts());
    } else {
      throw err;
    }
  }

  if (!session.url) {
    return NextResponse.json({ error: "Stripe did not return a Checkout URL" }, { status: 502 });
  }

  // 303 so the browser follows with GET.
  return NextResponse.redirect(session.url, 303);
}
