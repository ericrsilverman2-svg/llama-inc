import Stripe from "stripe";

// One client per server process. Keys come from the environment only.
// STRIPE_SECRET_KEY is a sandbox key (sk_test_...) until the account goes live.
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(key);
}

export const PREMIUM_PRICE_ID = process.env.STRIPE_PRICE_ID ?? "";
export const TRIAL_DAYS = 7;

export function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
