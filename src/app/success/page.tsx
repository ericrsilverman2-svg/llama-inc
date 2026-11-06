import Link from "next/link";
import { headers } from "next/headers";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  // Format dates the way the visitor expects: "13 November 2026" in Paris, "November 13, 2026" in LA.
  const locale = (await headers()).get("accept-language")?.split(",")[0]?.trim() || "en-US";

  let headline = "You are in.";
  let detail =
    "Your concierge is already looking. The first trip lands in your inbox within the week.";
  let status: "ok" | "pending" | "missing" = "ok";
  let email: string | null = null;
  let trialEnds: string | null = null;

  if (!session_id) {
    status = "missing";
    headline = "Nothing to confirm yet.";
    detail = "This page expects a Checkout Session id. Start from the pricing section.";
  } else {
    try {
      const session = await getStripe().checkout.sessions.retrieve(session_id, {
        expand: ["subscription"],
      });
      email = session.customer_details?.email ?? null;
      const sub =
        session.subscription && typeof session.subscription !== "string"
          ? session.subscription
          : null;
      if (sub?.trial_end) {
        trialEnds = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(sub.trial_end * 1000));
      }
      // With a trial, payment_status is "no_payment_required" and that is a success.
      if (session.status !== "complete") {
        status = "pending";
        headline = "Almost there.";
        detail = "Stripe has not confirmed this session yet. Give it a moment and refresh.";
      }
    } catch {
      status = "missing";
      headline = "We could not find that session.";
      detail = "Start again from the pricing section.";
    }
  }

  return (
    <main style={{ minHeight: "100svh", display: "flex", flexDirection: "column" }}>
      <Nav />
      <section className="section container" style={{ flex: 1 }}>
        <div
          className="label"
          style={{ color: status === "ok" ? "var(--pine)" : "var(--muted)" }}
        >
          {status === "ok" ? "Premium active" : "Checkout"}
        </div>
        <h1 style={{ marginTop: "var(--space-4)", maxWidth: "14ch" }}>{headline}</h1>
        <p style={{ marginTop: "var(--space-6)" }}>{detail}</p>
        {status === "ok" && (
          <div className="card" style={{ marginTop: "var(--space-10)", maxWidth: 520, display: "grid", gap: "var(--space-4)" }}>
            {email && (
              <p className="small">
                Confirmation sent to <strong>{email}</strong>.
              </p>
            )}
            {trialEnds && (
              <p className="small">
                Your free week ends on <strong>{trialEnds}</strong>. We will email you
                two days before.
              </p>
            )}
            <form action="/api/portal" method="POST">
              <input type="hidden" name="session_id" value={session_id} />
              <button type="submit" className="btn btn-secondary">
                Manage your plan
              </button>
            </form>
            <p className="small muted">
              Update your card, see invoices or cancel. Opens Stripe&apos;s customer portal.
            </p>
          </div>
        )}
        <p style={{ marginTop: "var(--space-10)" }}>
          <Link href="/">Back to Llama Inc.</Link>
        </p>
      </section>
      <Footer />
    </main>
  );
}
