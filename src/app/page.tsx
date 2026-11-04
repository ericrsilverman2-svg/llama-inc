import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PhotoCard } from "@/components/PhotoCard";
import { photos } from "@/lib/photos";

export default function Home() {
  return (
    <main>
      {/* Hero: full-bleed photo, headline over the scrim */}
      <section
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          background: "var(--sand)",
        }}
      >
        <Image
          src={photos.sognefjord.src}
          alt={photos.sognefjord.alt}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(20,19,17,0.15) 0%, rgba(20,19,17,0) 25%, var(--scrim) 100%)",
          }}
        />
        <div style={{ position: "relative" }}>
          <Nav onPhoto />
        </div>
        <div
          className="container"
          style={{
            position: "relative",
            marginTop: "auto",
            paddingBottom: "var(--space-16)",
            color: "var(--on-photo)",
          }}
        >
          <div className="label" style={{ color: "var(--on-photo)", opacity: 0.8 }}>
            {photos.sognefjord.place}
          </div>
          <h1 style={{ marginTop: "var(--space-4)", maxWidth: 14 + "ch" }}>
            Every month, a trip worth taking. Booked for you.
          </h1>
          <p style={{ marginTop: "var(--space-6)", maxWidth: "48ch", fontSize: 19, lineHeight: "28px" }}>
            Llama Inc. is a travel concierge. Tell us what moves you and we will
            find the fare drops, the rooms that are never free, and the
            once-a-year experiences, then book all of it when you say yes.
          </p>
          <div style={{ display: "flex", gap: "var(--space-4)", marginTop: "var(--space-10)", flexWrap: "wrap" }}>
            <a href="#pricing" className="btn btn-primary">
              Start Premium, $12.99 a month
            </a>
            <a href="#how" className="btn btn-photo">
              See how it works
            </a>
          </div>
        </div>
      </section>

      {/* How it works: free is reactive, Premium is proactive */}
      <section id="how" className="section">
        <div className="container">
          <div className="label">How it works</div>
          <h2 style={{ marginTop: "var(--space-4)", maxWidth: "18ch" }}>
            Free plans the trip you have. Premium finds the next one.
          </h2>
          <div
            style={{
              display: "grid",
              gap: "var(--space-6)",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              marginTop: "var(--space-10)",
            }}
          >
            <div className="card" style={{ background: "var(--sky)", borderColor: "transparent" }}>
              <div className="label">Free</div>
              <h3 style={{ marginTop: "var(--space-2)" }}>You already have a trip</h3>
              <p style={{ marginTop: "var(--space-4)" }}>
                Paste your flights and hotel. We fill in the days: restaurants that
                take bookings, the walk that is better at dusk, what to skip. Change
                anything and the plan moves with you.
              </p>
            </div>
            <div className="card">
              <div className="label" style={{ color: "var(--pine)" }}>
                Premium
              </div>
              <h3 style={{ marginTop: "var(--space-2)" }}>You want a reason to go</h3>
              <p style={{ marginTop: "var(--space-4)" }}>
                Once a month your concierge sends one trip, fully priced, with the
                flight, the stay and the thing you will talk about for years. Say
                yes and it is booked, in your currency, on your card. Say no and we
                keep looking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* This month: three portrait cards, place name as the only text */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="label">This month, for a member in Los Angeles</div>
          <h2 style={{ marginTop: "var(--space-4)", maxWidth: "20ch" }}>
            Three trips the concierge found this week
          </h2>
          <div
            style={{
              display: "grid",
              gap: "var(--space-6)",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              marginTop: "var(--space-10)",
            }}
          >
            <PhotoCard
              photo={photos.mykines}
              eyebrow="Fare drop"
              deal="LAX to Vágar from $540 round trip, 6 nights in a turf-roof house"
            />
            <PhotoCard
              photo={photos.meteora}
              eyebrow="Rarely available"
              deal="Two nights inside the monastery guesthouse, April only"
            />
            <PhotoCard
              photo={photos.uyuni}
              eyebrow="Once a year"
              deal="The wet season mirror, 4 nights, driver and salt hotel included"
            />
          </div>
          <p className="small muted" style={{ marginTop: "var(--space-6)" }}>
            Prices are illustrative. Members see live fares in their own currency.
          </p>
        </div>
      </section>

      {/* Feature: 3:2 photo beside copy */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div
          className="container"
          style={{
            display: "grid",
            gap: "var(--space-10)",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              aspectRatio: "3 / 2",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              background: "var(--sand)",
            }}
          >
            <Image
              src={photos.deathValley.src}
              alt={photos.deathValley.alt}
              fill
              sizes="(min-width: 900px) 540px, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>
            <div className="label">Booked, not bookmarked</div>
            <h2 style={{ marginTop: "var(--space-4)" }}>We handle the part that never gets done</h2>
            <p style={{ marginTop: "var(--space-6)" }}>
              Most trips die in a browser tab. A Premium concierge books the flight,
              holds the room, reserves the table and puts it all on one calendar,
              with every confirmation in one thread. You pack.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing: one tier, one card, one button */}
      <section id="pricing" className="section" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container" style={{ display: "grid", gap: "var(--space-10)", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", alignItems: "start" }}>
          <div>
            <div className="label">Premium</div>
            <h2 style={{ marginTop: "var(--space-4)", maxWidth: "16ch" }}>One plan. Cancel from your account page.</h2>
            <p style={{ marginTop: "var(--space-6)" }}>
              Members anywhere in the world pay in their own currency. Your first
              week is free; we will email you two days before it ends.
            </p>
          </div>
          <div className="card" style={{ display: "grid", gap: "var(--space-4)" }}>
            <div className="label" style={{ color: "var(--pine)" }}>
              Premium concierge
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-2)" }}>
              <span style={{ fontSize: 48, lineHeight: "48px", fontWeight: 500, letterSpacing: "-0.02em" }}>
                $12.99
              </span>
              <span>a month</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: "1.2em", display: "grid", gap: "var(--space-2)" }}>
              <li>One fully priced trip every month, chosen for you</li>
              <li>Flights, stays and experiences booked on your say-so</li>
              <li>Everything the free plan does, for every trip</li>
              <li>A human planner when the concierge is unsure</li>
            </ul>
            <form action="/api/checkout" method="POST">
              <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                Start your free week
              </button>
            </form>
            <p className="small muted">
              $12.99 a month after 7 days. Cancel anytime from your account page.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
