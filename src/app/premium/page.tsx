import { ParallaxImage } from "@/components/ParallaxImage";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PhotoCard } from "@/components/PhotoCard";
import { photos } from "@/lib/photos";

const spark = [44, 46, 40, 48, 50, 42, 38, 44, 24, 22];

const thread = [
  { k: "sky", n: "1", title: "Guesthouse Mykines, room 4", d: "Held until Friday 5 pm. Converts to a booking when you say yes.", s: "Held", c: "var(--muted)" },
  { k: "sky", n: "2", title: "LAX to Vágar via Copenhagen, SAS", d: "Fare locked at $540 for 72 hours. Seats 14A and 14C, your usual.", s: "Awaiting your yes", c: "var(--muted)" },
  { k: "pine", n: "✓", title: "Meteora monastery guesthouse, April 3 to 5", d: "Booked March 2. Confirmation MG-20418. Breakfast included.", s: "Booked", c: "var(--pine)" },
  { k: "pine", n: "✓", title: "Athens to Kalambaka, rail", d: "Booked March 2. Tickets on your phone.", s: "Booked", c: "var(--pine)" },
  { k: "clay", n: "!", title: "Dinner at Meteora Restaurant, April 4", d: "They don't take online bookings. A human planner is calling them Monday.", s: "Planner", c: "var(--clay)" },
];

export default function Premium() {
  return (
    <main>
      {/* Preview banner: the demo has no accounts */}
      <div style={{ background: "var(--sky)", borderBottom: "1px solid var(--hairline)" }}>
        <div className="container small" style={{ padding: "10px var(--space-4)" }}>
          A preview of the member view. Nothing here is live until you subscribe.
        </div>
      </div>

      <section className="photo" data-reveal style={{ position: "relative", overflow: "hidden", minHeight: "88svh", display: "flex", flexDirection: "column" }}>
        <ParallaxImage photo={photos.mykines} speed={0.22} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(20,19,17,0.25) 0%, rgba(20,19,17,0) 30%, rgba(20,19,17,0.7) 100%)" }} />
        <div style={{ position: "relative" }}>
          <Nav onPhoto />
        </div>
        <div className="container hero-grid fx-up" style={{ position: "relative", marginTop: "auto", paddingBottom: "var(--space-10)", color: "var(--on-photo)", textShadow: "0 1px 24px rgba(20,19,17,0.55)" }}>
          <div>
            <div className="label" style={{ color: "var(--on-photo)", opacity: 0.8 }}>This month · Pick 7 of 12</div>
            <h1 style={{ marginTop: "var(--space-4)", maxWidth: "12ch", fontSize: 56, lineHeight: "54px" }}>Mykines, Faroe Islands</h1>
            <p style={{ marginTop: "var(--space-4)", maxWidth: "44ch" }}>
              Six nights in a turf-roof house on an island of eleven people, during the three weeks a year the puffins are in. You said islands, few people, long walks. This is the one.
            </p>
          </div>
          <div className="card" style={{ background: "var(--paper)", color: "var(--ink)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-2)" }}>
              <span className="tag tag-clay">Fare drop ends Friday</span>
              <span className="small muted">Jun 6 to 12</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-2)", marginTop: "var(--space-4)" }}>
              <span className="price" style={{ fontSize: 40, lineHeight: "40px" }}>$1,940</span>
              <span className="small muted">all in, two people, USD</span>
            </div>
            <div className="kv" style={{ marginTop: "var(--space-4)" }}>
              <span>LAX to Vágar, round trip</span><span className="v">$1,080</span>
              <span>Guesthouse Mykines, 6 nights</span><span className="v">$720</span>
              <span>Ferry, both ways</span><span className="v">$40</span>
              <span>Mykineshólmur walk, guided</span><span className="v">$100</span>
            </div>
            <div style={{ display: "flex", gap: "var(--space-2)", marginTop: "var(--space-6)" }}>
              <form action="/api/checkout" method="POST" style={{ flex: 1, display: "flex" }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Say yes, book it</button>
              </form>
              <button type="button" className="btn btn-secondary">Not this one</button>
            </div>
            <p className="small muted" style={{ marginTop: "var(--space-4)" }}>
              Charged only after you say yes. Fully refundable for 24 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="label">Why this one</div>
          <h2 style={{ marginTop: "var(--space-4)", maxWidth: "18ch" }}>Three things lined up this week</h2>
          <div className="grid g3" style={{ marginTop: "var(--space-10)" }}>
            <div className="card">
              <div className="label">Fare</div>
              <h3 style={{ marginTop: "var(--space-2)" }}>$540 round trip, usually $910</h3>
              <div className="spark" style={{ marginTop: "var(--space-4)" }}>
                {spark.map((h, i) => (
                  <i key={i} className={i === spark.length - 1 ? "now" : undefined} style={{ height: h }} />
                ))}
              </div>
              <p className="small muted" style={{ marginTop: "var(--space-2)" }}>Last 10 weeks, LAX to Vágar in June. We watch 40 routes against your brief.</p>
            </div>
            <div className="card">
              <div className="label">Window</div>
              <h3 style={{ marginTop: "var(--space-2)" }}>Puffins, May 20 to Aug 10</h3>
              <p className="small muted" style={{ marginTop: "var(--space-4)" }}>Mykines is only reachable by ferry in this window and the guesthouse has 8 rooms. June 6 had two left when we looked. We put one on hold.</p>
            </div>
            <div className="card">
              <div className="label">You</div>
              <h3 style={{ marginTop: "var(--space-2)" }}>&ldquo;Islands, nobody there, walking&rdquo;</h3>
              <p className="small muted" style={{ marginTop: "var(--space-4)" }}>From your brief, and from passing on Oia in March (&ldquo;too many people&rdquo;). This is the opposite of Oia.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section hair">
        <div className="container grid g2" style={{ alignItems: "start" }}>
          <div>
            <div className="label">Priced in your currency</div>
            <h2 style={{ marginTop: "var(--space-4)", maxWidth: "16ch" }}>The same trip, wherever you pay from</h2>
            <p style={{ marginTop: "var(--space-6)" }}>Members see live fares and stays in their own currency, and pay in it. No conversion surprises on the statement. Your plan renews the same way.</p>
            <div className="seg" style={{ marginTop: "var(--space-6)" }}><span className="on">USD</span><span>EUR</span><span>GBP</span><span>JPY</span></div>
          </div>
          <div className="card">
            <div className="kv" style={{ fontSize: 16, lineHeight: "24px" }}>
              <span>This trip, all in</span><span className="v" style={{ fontWeight: 600 }}>$1,940.00</span>
              <span className="muted">Shown in EUR</span><span className="v muted">€1,788.56</span>
              <span className="muted">Shown in GBP</span><span className="v muted">£1,522.07</span>
              <span className="muted">Shown in JPY</span><span className="v muted">¥301,842</span>
            </div>
            <div className="hair" style={{ marginTop: "var(--space-4)", paddingTop: "var(--space-4)" }}>
              <div className="kv" style={{ fontSize: 16, lineHeight: "24px" }}>
                <span>Premium, monthly</span><span className="v" style={{ fontWeight: 600 }}>$12.99</span>
                <span className="muted">Next renewal</span><span className="v muted">December 4</span>
              </div>
            </div>
            <p className="small muted" style={{ marginTop: "var(--space-4)" }}>Rates are illustrative. Live rates come from the booking partners at checkout.</p>
          </div>
        </div>
      </section>

      <section className="section hair">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "var(--space-2)" }}>
            <div>
              <div className="label">Bookings</div>
              <h2 style={{ marginTop: "var(--space-4)" }}>One thread, every confirmation</h2>
            </div>
            <a href="#" className="small">Add to calendar</a>
          </div>
          <div className="card" style={{ marginTop: "var(--space-10)" }}>
            {thread.map((m) => (
              <div className="msg" key={m.title}>
                <div className={`dot ${m.k}`}>{m.n}</div>
                <div>
                  <div style={{ fontWeight: 600 }}>{m.title}</div>
                  <div className="small muted">{m.d}</div>
                </div>
                <span className="status" style={{ color: m.c }}>{m.s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section hair">
        <div className="container">
          <div className="label">Past picks</div>
          <h2 style={{ marginTop: "var(--space-4)", maxWidth: "18ch" }}>What we&apos;ve found so far</h2>
          <div className="grid g3" style={{ marginTop: "var(--space-10)" }}>
            <PhotoCard photo={photos.meteora} eyebrow="Rarely available" deal="Going, April" />
            <PhotoCard photo={photos.oia} eyebrow="Fare drop" deal="Passed: too many people" />
            <PhotoCard photo={photos.kaafu} eyebrow="Once a year" deal="Saved for later" />
          </div>
          <p className="small muted" style={{ marginTop: "var(--space-6)" }}>Passing on a pick teaches the concierge. &ldquo;Too many people&rdquo; on Oia is why Mykines is here.</p>
        </div>
      </section>

      <section className="section hair">
        <div className="container grid g2" style={{ alignItems: "start" }}>
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div className="label">Your brief</div><a href="#" className="small">Edit</a>
            </div>
            <div className="kv" style={{ marginTop: "var(--space-4)", fontSize: 16, lineHeight: "24px", gridTemplateColumns: "140px 1fr" }}>
              <span className="muted">Home airport</span><span>LAX, will connect once</span>
              <span className="muted">Travelers</span><span>Two adults</span>
              <span className="muted">Passports</span><span>US · entry rules checked before every pick</span>
              <span className="muted">Budget</span><span>Up to $2,500 a trip</span>
              <span className="muted">When</span><span>Any month but December</span>
              <span className="muted">You like</span><span>Islands, long walks, few people, good bread</span>
              <span className="muted">You don&apos;t</span><span>Resorts, cruise ports, anything with a queue</span>
            </div>
          </div>
          <div>
            <div className="label">Human planner</div>
            <h3 style={{ marginTop: "var(--space-2)" }}>When the concierge isn&apos;t sure, Ana is</h3>
            <div style={{ display: "grid", gap: "var(--space-2)", marginTop: "var(--space-6)" }}>
              <div className="bubble them">The guesthouse can do a packed lunch for the Mykineshólmur walk. Want me to add it? About $14.</div>
              <div className="bubble me">Yes please. Also is the ferry rough?</div>
              <div className="bubble them">It can be. I&apos;ve booked the 10:20 which is the calmer crossing, and the helicopter is the backup if it&apos;s cancelled. Your rate holds either way.</div>
            </div>
            <input className="field" placeholder="Message Ana…" style={{ marginTop: "var(--space-4)" }} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
