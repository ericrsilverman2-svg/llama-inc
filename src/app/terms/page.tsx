import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata = { title: "Terms of service · Llama Inc." };

// Plain-language terms for the Premium subscription. Stripe Checkout links here
// when it asks for consent. Demo copy: have counsel review before going live.
export default function Terms() {
  const updated = new Date("2026-11-06T00:00:00Z").toLocaleDateString("en-US", { dateStyle: "long" });
  return (
    <main style={{ minHeight: "100svh", display: "flex", flexDirection: "column" }}>
      <Nav />
      <section className="section container" style={{ flex: 1, maxWidth: 720 }}>
        <div className="label">Legal</div>
        <h1 style={{ marginTop: "var(--space-4)" }}>Terms of service</h1>
        <p className="small muted" style={{ marginTop: "var(--space-4)" }}>Last updated {updated}.</p>

        <div style={{ display: "grid", gap: "var(--space-6)", marginTop: "var(--space-10)" }}>
          <section>
            <h3>1. What Llama Inc. is</h3>
            <p style={{ marginTop: "var(--space-2)" }}>
              Llama Inc. is a travel concierge. The free plan helps you plan a trip you already have.
              Premium finds trips for you and, with your approval, books flights, stays and
              experiences on your behalf. Bookings are made with third-party providers under their
              own terms.
            </p>
          </section>
          <section>
            <h3>2. Premium subscription and free trial</h3>
            <p style={{ marginTop: "var(--space-2)" }}>
              Premium is a monthly subscription. Your first seven days are free. We will email you
              two days before the trial ends. After the trial, you are billed monthly in advance
              until you cancel. The price shown at checkout is the price you pay; any applicable tax
              is shown before you confirm.
            </p>
          </section>
          <section>
            <h3>3. Cancelling</h3>
            <p style={{ marginTop: "var(--space-2)" }}>
              You can cancel at any time from your account page. Cancelling stops future charges and
              keeps Premium active until the end of the period you have already paid for.
            </p>
          </section>
          <section>
            <h3>4. Right of withdrawal and refunds</h3>
            <p style={{ marginTop: "var(--space-2)" }}>
              If you live in the European Union, the United Kingdom or another jurisdiction with a
              statutory cooling-off right, you may withdraw within 14 days of your first payment and
              receive a full refund of that payment. Outside those jurisdictions, charges are
              non-refundable except where we say otherwise or the law requires it. To withdraw,
              email support with the address on your receipt.
            </p>
          </section>
          <section>
            <h3>5. Trips we book for you</h3>
            <p style={{ marginTop: "var(--space-2)" }}>
              We only book after you say yes to a priced itinerary. Flight, hotel and experience
              fares are set by their providers and may be non-refundable; we tell you before you
              approve. Changes and cancellations of a booked trip follow the provider&apos;s rules.
            </p>
          </section>
          <section>
            <h3>6. Your account</h3>
            <p style={{ marginTop: "var(--space-2)" }}>
              Keep your payment details current. Payments are processed by Stripe; we do not store
              card numbers. If a renewal fails we will email you and retry for a short period before
              pausing Premium.
            </p>
          </section>
          <section>
            <h3>7. Changes to these terms or the price</h3>
            <p style={{ marginTop: "var(--space-2)" }}>
              We will email you at least 30 days before a price change or a material change to these
              terms. If you do not agree, cancel before the change takes effect.
            </p>
          </section>
          <section>
            <h3>8. Governing law</h3>
            <p style={{ marginTop: "var(--space-2)" }}>
              These terms are governed by the laws of the State of California, without affecting any
              consumer protections you are entitled to where you live.
            </p>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
