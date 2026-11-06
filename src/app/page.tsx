import { ParallaxImage } from "@/components/ParallaxImage";
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
        data-reveal
        style={{ position: "relative", overflow: "hidden", minHeight: "100svh", display: "flex", flexDirection: "column", background: "var(--sand)" }}
      >
        <ParallaxImage photo={photos.kaafu} speed={0.22} priority />
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
          className="container fx-up"
          style={{ position: "relative", margin: "auto", textAlign: "center", color: "var(--on-photo)", textShadow: "0 1px 24px rgba(20,19,17,0.45)" }}
        >
          <h1 className="hero-h1" style={{ margin: "0 auto", maxWidth: "14ch", textWrap: "balance" }}>
            Go somewhere you can&apos;t pronounce.
          </h1>
          <p style={{ margin: "var(--space-6) auto 0", maxWidth: "44ch", fontSize: 19, lineHeight: "28px", textWrap: "balance" }}>
            Trips you couldn&apos;t imagine, found and booked by a concierge who knows what you love.
          </p>
          <div className="plans">
            <div className="plan">
              <div className="label">Free</div>
              <div className="plan-price">$0</div>
              <p>Already have a trip? Bring it, and the concierge plans every day around what you love.</p>
              <Link href="/free" className="btn btn-photo">Start free</Link>
            </div>
            <div className="plan plan-featured">
              <div className="label">
                Premium <span className="tag tag-clay">7-day free trial</span>
              </div>
              <div className="plan-price">
                $12.99 <span>a month</span>
              </div>
              <p>Don&apos;t have the next one yet? Curated trips on-demand, found and booked for you.</p>
              <form action="/api/checkout" method="POST">
                <button type="submit" className="btn btn-primary">Get Started</button>
              </form>
            </div>
          </div>
        </div>
        <div className="container ticker" style={{ position: "relative", color: "var(--on-photo)" }}>
          <span><b>This month</b></span>
          {ticker.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </section>

      {/* The shared promise, in one line */}
      <section className="section" data-reveal style={{ paddingBottom: "var(--space-10)" }}>
        <div className="container fx-up">
          <div className="label">How it works</div>
          <h2 style={{ marginTop: "var(--space-4)", maxWidth: "22ch" }}>
            A concierge that learns what you love. Bring a trip, or let it bring you one.
          </h2>
        </div>
      </section>

      {/* ===== Sell 1: Free ===== */}
      <PhotoBand
        photo={photos.capoCaccia}
        eyebrow="Free"
        title="Already have a trip? We'll make it the best version of itself."
        body="Paste your flights and a hotel. The concierge fills in the days with the places it knows you'll love, and moves everything when your plans do."
        cta={{ label: "Plan a trip you have, free", href: "/free" }}
      />
      <section id="free" className="section" data-reveal>
        <div className="container grid g3">
          <div className="fx-up">
            <div className="label">Knows you</div>
            <h3 style={{ marginTop: "var(--space-2)" }}>Not the top ten list</h3>
            <p className="small muted" style={{ marginTop: "var(--space-2)" }}>Say &ldquo;no seafood&rdquo; or &ldquo;we have a toddler&rdquo; once and every day adjusts.</p>
          </div>
          <div className="fx-up" style={{ transitionDelay: "120ms" }}>
            <div className="label">Bookable</div>
            <h3 style={{ marginTop: "var(--space-2)" }}>Tables that take bookings</h3>
            <p className="small muted" style={{ marginTop: "var(--space-2)" }}>Every restaurant on the plan is one you can actually get into, with the right time slot.</p>
          </div>
          <div className="fx-up" style={{ transitionDelay: "240ms" }}>
            <div className="label">Yours</div>
            <h3 style={{ marginTop: "var(--space-2)" }}>Swap anything</h3>
            <p className="small muted" style={{ marginTop: "var(--space-2)" }}>One trip at a time, up to five days, on your calendar and your phone. No card needed.</p>
          </div>
        </div>
      </section>

      {/* ===== Sell 2: Premium ===== */}
      <PhotoBand
        photo={photos.zurich}
        eyebrow="Premium"
        title="Don't have the next one yet? We'll find it, and book it."
        body="Every month the same concierge sends one trip it knows you'll love, fully priced. Say yes and the flight, the stay and the table are booked. Say no and it keeps looking."
        cta={{ label: "Get Started", href: "#pricing" }}
        align="right"
      />
      <section className="section" data-reveal>
        <div className="container">
          <div className="label fx-up">This month, for a member in Los Angeles</div>
          <h2 className="fx-up" style={{ marginTop: "var(--space-4)", maxWidth: "20ch" }}>Three trips the concierge found this week</h2>
          <div className="grid g3" style={{ marginTop: "var(--space-10)" }}>
            {picks.map((p, i) => (
              <div key={p.photo.id} className="fx-up" style={{ transitionDelay: `${120 + i * 120}ms` }}>
                <PhotoCard photo={p.photo} eyebrow={p.eyebrow} deal={p.deal} />
              </div>
            ))}
          </div>
          <p className="small muted" style={{ marginTop: "var(--space-6)" }}>
            Prices are illustrative. Members see live fares in their own currency.{" "}
            <Link href="/premium">See the member view</Link>
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section" data-reveal>
        <div className="container grid g2" style={{ alignItems: "start" }}>
          <div className="fx-up">
            <div className="label">Premium</div>
            <h2 style={{ marginTop: "var(--space-4)", maxWidth: "22ch" }}>All you have to do is say &ldquo;Yes&rdquo;.</h2>
          </div>
          <div className="card fx-up" style={{ display: "grid", gap: "var(--space-4)", transitionDelay: "140ms" }}>
            <div className="label" style={{ color: "var(--pine)" }}>Premium concierge</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-2)" }}>
              <span className="price">$12.99</span>
              <span>a month</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: "1.2em", display: "grid", gap: "var(--space-2)" }}>
              <li>Curated trips on-demand</li>
              <li>Flights, stays and experiences booked on your say-so</li>
              <li>Everything the free plan does, for every trip</li>
              <li>A human planner when the concierge is unsure</li>
            </ul>
            <form action="/api/checkout" method="POST">
              <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Get Started</button>
            </form>
            <p className="small muted">$12.99 a month after 7 days. Cancel anytime from your account page.</p>
          </div>
        </div>
      </section>

      {/* Closing band */}
      <PhotoBand photo={photos.gruyeres} title="Somewhere is waiting." cta={{ label: "Get Started", href: "#pricing" }} height="60svh" />

      <Footer />
    </main>
  );
}
