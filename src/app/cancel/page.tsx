import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function Cancel() {
  return (
    <main style={{ minHeight: "100svh", display: "flex", flexDirection: "column" }}>
      <Nav />
      <section className="section container" style={{ flex: 1 }}>
        <div className="label">Checkout</div>
        <h1 style={{ marginTop: "var(--space-4)", maxWidth: "14ch" }}>No charge, no change.</h1>
        <p style={{ marginTop: "var(--space-6)" }}>
          You left before finishing. Nothing was saved and your card was not
          touched. The free plan still works whenever you have a trip to fill in.
        </p>
        <div style={{ display: "flex", gap: "var(--space-4)", marginTop: "var(--space-10)", flexWrap: "wrap" }}>
          <Link href="/#pricing" className="btn btn-primary">
            Try Premium again
          </Link>
          <Link href="/" className="btn btn-secondary">
            Back to Llama Inc.
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
