# Llama Inc.

A travel concierge with one paid plan, Premium at $12.99 a month, sold through
Stripe-hosted Checkout in sandbox mode. Built for a Stripe PM written exercise.

## Stack

Next.js (App Router), plain CSS tokens, the `stripe` Node SDK. No database: the
success page reads the Checkout Session back from Stripe, and the webhook logs
events. Photos are hot-linked from Unsplash under the Unsplash License and
credited in the footer.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in the three Stripe values
npm run dev
```

Then, in a second terminal, forward webhooks:

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

Copy the `whsec_...` it prints into `STRIPE_WEBHOOK_SECRET`.

## Stripe setup (sandbox)

1. Product catalog: create "Premium", recurring, $12.99 USD monthly. Copy the price id into `STRIPE_PRICE_ID`.
2. Settings > Branding (Checkout): brand color `#C4542B`, accent `#1F4D3A`.
3. Settings > Billing > Customer portal: enable payment method updates and cancellation.
4. Optional: Settings > Payments > Adaptive Pricing, so global buyers pay in their currency.
5. Workbench > Webhooks: add the Vercel URL `/api/webhook` with `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed`.

## Routes

| Route | What it does |
| --- | --- |
| `POST /api/checkout` | Creates a subscription-mode Checkout Session (7-day trial, promotion codes on) and redirects to it. Idempotency key per request. |
| `GET /success?session_id=` | Retrieves the session and shows status, email, trial end, and a portal button. |
| `POST /api/portal` | Creates a customer portal session for the customer on that Checkout Session. |
| `POST /api/webhook` | Verifies the signature, dedupes on `event.id`, logs the three events. |

## Test

Card `4242 4242 4242 4242`, any future expiry, any CVC. With the trial, the first
invoice is $0; `invoice.paid` still fires.

## Deploy

Push to GitHub, import into Vercel, add the four env vars from `.env.example`,
then register the webhook URL in Stripe.
