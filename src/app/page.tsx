import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PhotoCard } from "@/components/PhotoCard";
import { PhotoBand } from "@/components/PhotoBand";
import { photos } from "@/lib/photos";

const picks = [
  { photo: photos.thoddoo, eyebrow: "Fare drop", deal: "LAX to Malé from $690 round trip, 5 nights on a local island" },
  { photo: photos.beloHorizonte, eyebrow: "Rarely available", deal: "Two nights in a 1960s concrete house in the forest, by invitation" },
  { photo: photos.lauterbrunnen, eyebrow: "Once a year", deal: "The valley before the lifts open, 4 nights, train from Zürich included" },
];

const ticker = [
  "Mykines · 6 nights · $1,940",
  "Kaafu Atoll · 5 nights · $2,210",
  "Meteora monastery guesthouse · April only",
  "Lauterbrunnen · 4 nights · $1,480",
  "Capo Caccia · 3 nights · $760",
];

export default function Home() {
  return (
    <main>
      {/* Hero: headline first, photo kept bright. Scrim only at the edges. */}
      <section
        style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", background: "var(--sand)" }}
      >
        <Image src={photos.kaafu.src} alt={photos.kaafu.alt} fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(20,19,17,0.35) 0%, rgba(20,19,17,0.18) 45%, rgba(20,19,17,0.18) 70%, var(--scrim) 100%)",
          }}
        />
        <div style={{ position: "relative" }}>
          <Nav onPhoto />
        </div>
        <div
          className="container"
          style={{ position: "relative", margin: "auto 0", textAlign: "center", color: "var(--on-photo)", textShadow: "0 1px 24px rgba(20,19,17,0.45)" }}
        >
          <h1 className="hero-h1" style={{ margin: "0 auto", maxWidth: "12ch" }}>
            Go somewhere you can&apos;t pronounce.
          </h1>
          <p style={{ margin: "var(--space-6) auto 0", maxWidth: "44ch", fontSize: 19, lineHeight: "28px" }}>
            One trip a month, found and booked by a concierge who knows what you like. $12.99 a month.
          </p>
          <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", marginTop: "var(--space-10)", flexWrap: "wrap" }}>
            <a href="#pricing" className="btn btn-primary">Start your free week</a>
            <Link href="/free" className="btn btn-photo">Try it free with a trip you have</Link>
          </div>
        </div>
        <div className="container ticker" style={{ position: "relative", color: "var(--on-photo)" }}>
          <span><b>This month</b></span>
          {ticker.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </section>

      {/* This month: three portrait cards */}
      <section className="section">
        <div className="container">
          <div className="label">This month, for a member in Los Angeles</div>
          <h2 style={{ marginTop: "var(--space-4)", maxWidth: "20ch" }}>Three trips the concierge found this week</h2>
          <div className="grid g3" style={{ marginTop: "var(--space-10)" }}>
            {picks.map((p) => (
              <PhotoCard key={p.photo.id} photo={p.photo} eyebrow={p.eyebrow} deal={p.deal} />
            ))}
          </div>
          <p className="small muted" style={{ marginTop: "var(--space-6)" }}>
            Prices are illustrative. Members see live fares in their own currency.
          </p>
        </div>
      </section>

      {/* Band: the split, told on a photo */}
      <PhotoBand
        photo={photos.capoCaccia}
        eyebrow="How it works"
        title="Free plans the trip you have. Premium finds the next one."
        body="Paste your flights and a hotel and the free plan fills in the days. Premium members get one trip a month, priced, with the yes button."
        cta={{ label: "See the free plan", href: "/free" }}
      />

      {/* The two plans, briefly, on sand */}
      <section id="how" className="section">
        <div className="container grid g2">
          <div className="card" style={{ background: "var(--sky)", borderColor: "transparent" }}>
            <div className="label">Free</div>
            <h3 style={{ marginTop: "var(--space-2)" }}>You already have a trip</h3>
            <p style={{ marginTop: "var(--space-4)" }}>
              Restaurants that take bookings, the walk that is better at dusk, what to skip. Change anything and the plan moves with you.
            </p>
            <Link href="/free" style={{ display: "inline-block", marginTop: "var(--space-4)" }}>Open the free plan</Link>
          </div>
          <div className="card">
            <div className="label" style={{ color: "var(--pine)" }}>Premium</div>
            <h3 style={{ marginTop: "var(--space-2)" }}>You want a reason to go</h3>
            <p style={{ marginTop: "var(--space-4)" }}>
              Once a month your concierge sends one trip, fully priced, with the flight, the stay and the thing you will talk about for years. Say yes and it is booked.
            </p>
            <Link href="/premium" style={{ display: "inline-block", marginTop: "var(--space-4)" }}>See the member view</Link>
          </div>
        </div>
      </section>

      {/* Band: booked, not bookmarked */}
      <PhotoBand
        photo={photos.zurich}
        eyebrow="Booked, not bookmarked"
        title="We handle the part that never gets done"
        body="Most trips die in a browser tab. A Premium concierge books the flight, holds the room, reserves the table and puts it all on one calendar. You pack."
        align="right"
      />

      {/* Pricing */}
      <section id="pricing" className="section">
        <div className="container grid g2" style={{ alignItems: "start" }}>
          <div>
            <div className="label">Premium</div>
            <h2 style={{ marginTop: "var(--space-4)", maxWidth: "16ch" }}>One plan. Cancel from your account page.</h2>
            <p style={{ marginTop: "var(--space-6)" }}>
              Members anywhere in the world pay in their own currency. Your first week is free; we will email you two days before it ends.
            </p>
          </div>
          <div className="card" style={{ display: "grid", gap: "var(--space-4)" }}>
            <div className="label" style={{ color: "var(--pine)" }}>Premium concierge</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-2)" }}>
              <span className="price">$12.99</span>
              <span>a month</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: "1.2em", display: "grid", gap: "var(--space-2)" }}>
              <li>One fully priced trip every month, chosen for you</li>
              <li>Flights, stays and experiences booked on your say-so</li>
              <li>Everything the free plan does, for every trip</li>
              <li>A human planner when the concierge is unsure</li>
            </ul>
            <form action="/api/checkout" method="POST">
              <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Start your free week</button>
            </form>
            <p className="small muted">$12.99 a month after 7 days. Cancel anytime from your account page.</p>
          </div>
        </div>
      </section>

      {/* Closing band */}
      <PhotoBand photo={photos.gruyeres} title="Somewhere is waiting." cta={{ label: "Start your free week", href: "#pricing" }} height="60svh" />

      <Footer />
    </main>
  );
}
