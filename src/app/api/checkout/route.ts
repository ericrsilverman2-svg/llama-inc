import { NextResponse } from "next/server";
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

  const session = await stripe.checkout.sessions.create(
    {
      mode: "subscription",
      line_items: [{ price: PREMIUM_PRICE_ID, quantity: 1 }],
      // Checkout substitutes the real id for the placeholder after payment.
      success_url: `${base}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/cancel`,
      allow_promotion_codes: true,
      subscription_data: {
        trial_period_days: TRIAL_DAYS,
      },
    },
    {
      // A fresh key per click: a retried request creates one session, not two.
      idempotencyKey: crypto.randomUUID(),
    },
  );

  if (!session.url) {
    return NextResponse.json({ error: "Stripe did not return a Checkout URL" }, { status: 502 });
  }

  // 303 so the browser follows with GET.
  return NextResponse.redirect(session.url, 303);
}
