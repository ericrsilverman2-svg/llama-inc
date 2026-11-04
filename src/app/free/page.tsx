import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { photos } from "@/lib/photos";

const days = [
  {
    title: "Day 1 · Saturday, May 9",
    note: "Land, settle, one good dinner",
    rows: [
      ["3:30 pm", "Transfer to Oia", "Pre-book a taxi; the island bus adds an hour on a Saturday. About €45."],
      ["6:45 pm", "Oia castle ruins for sunset", "Walk up 20 minutes early. It gets crowded; the view from the path just below is the same and empty."],
      ["8:30 pm", "Dinner at Roka", "Small, local, no view, which is why it's good. Ask for the fava and the tomato keftedes.", true],
    ],
  },
  {
    title: "Day 2 · Sunday, May 10",
    note: "The walk, then nothing",
    rows: [
      ["7:30 am", "Fira to Oia caldera trail", "10 km, 3 hours, do it before the heat. Taxi to Fira, walk home. Water and a hat; there is one café halfway at Imerovigli."],
      ["1:00 pm", "Lunch at Pitogyros", "Souvlaki, €12 for two, eat on the wall. Then your pool until dinner."],
      ["8:00 pm", "Dinner at Ammoudi Fish Tavern", "Down the 300 steps in Ammoudi Bay. Book the 8 pm so you walk down in light and take a taxi up.", true],
    ],
  },
  {
    title: "Day 3 · Monday, May 11",
    note: "The other side of the island",
    rows: [
      ["10:00 am", "Akrotiri excavation", "A Bronze Age town under ash, covered and cool. 90 minutes. €12."],
      ["12:30 pm", "Red Beach, then lunch at To Psaraki", "Skip swimming at Red Beach if it's windy; the taverna in Vlychada is the point."],
      ["5:00 pm", "Wine at Venetsanos", "Assyrtiko tasting on the cliff over the port. Book the 5 pm; it's the sunset slot nobody takes."],
    ],
  },
] as const;

export default function Free() {
  return (
    <main>
      <section className="photo" style={{ position: "relative", height: "42svh", minHeight: 300, display: "flex", flexDirection: "column" }}>
        <Image src={photos.oia.src} alt={photos.oia.alt} fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(20,19,17,0.2) 0%, rgba(20,19,17,0) 35%, var(--scrim) 100%)" }} />
        <div style={{ position: "relative" }}>
          <Nav onPhoto />
        </div>
        <div className="container" style={{ position: "relative", marginTop: "auto", paddingBottom: "var(--space-6)", color: "var(--on-photo)" }}>
          <span className="tag tag-sky">Free</span>
          <h1 style={{ marginTop: "var(--space-4)", maxWidth: "14ch", fontSize: 48, lineHeight: "48px" }}>Plan the trip you already have.</h1>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "var(--space-10)" }}>
        <div className="container layout">
          <div>
            <div className="card" style={{ display: "grid", gap: "var(--space-4)" }}>
              <div className="label">Your trip</div>
              <textarea className="field" rows={3} defaultValue="LAX to Santorini (JTR via ATH), May 9 to May 13. Staying at Canaves Oia Suites. Two adults." />
              <div style={{ display: "flex", gap: "var(--space-4)", alignItems: "center", flexWrap: "wrap" }}>
                <button className="btn btn-primary" type="button">Fill in my days</button>
                <span className="small muted">Paste a confirmation email, a hotel name, or just the dates.</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "var(--space-16)", flexWrap: "wrap", gap: "var(--space-2)" }}>
              <div>
                <div className="label">Santorini, 4 days</div>
                <h2 style={{ marginTop: "var(--space-2)" }}>Your days, filled in</h2>
              </div>
              <span className="small muted">Built around a 2:40 pm landing and a 9:15 am flight home</span>
            </div>

            <div className="grid" style={{ marginTop: "var(--space-10)", gap: "var(--space-4)" }}>
              {days.map((d) => (
                <div className="card" key={d.title}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "var(--space-2)" }}>
                    <h3>{d.title}</h3>
                    <span className="small muted">{d.note}</span>
                  </div>
                  <div style={{ marginTop: "var(--space-4)" }}>
                    {d.rows.map(([t, n, desc, books]) => (
                      <div className="row" key={n}>
                        <div className="t">{t}</div>
                        <div>
                          <div className="n">
                            {n}
                            {books && <span className="tag tag-pine" style={{ marginLeft: 6 }}>Takes bookings</span>}
                          </div>
                          <div className="d">{desc}</div>
                        </div>
                        <a className="act" href="#">Swap</a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="card" style={{ background: "var(--sky)", borderColor: "transparent" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "var(--space-2)" }}>
                  <h3>Day 4 · Tuesday, May 12</h3>
                  <span className="small muted">Early flight tomorrow, keep it close</span>
                </div>
                <p className="small" style={{ marginTop: "var(--space-4)" }}>
                  Two options we&apos;d pick between depending on the forecast. Tell us &ldquo;slow&rdquo; or &ldquo;boat&rdquo; and we&apos;ll fill it in.
                </p>
                <div className="chips" style={{ marginTop: "var(--space-4)" }}>
                  <span className="chip">Slow day in Oia</span>
                  <span className="chip">Catamaran to the hot springs</span>
                </div>
              </div>
            </div>
          </div>

          <div className="sticky">
            <div className="card" style={{ display: "grid", gap: "var(--space-4)" }}>
              <div className="label">Change anything</div>
              <p className="small">Tap a note and the days move with you.</p>
              <div className="chips">
                <span className="chip on">No seafood</span>
                <span className="chip">We have a toddler</span>
                <span className="chip">Make day 2 slower</span>
                <span className="chip">Cheaper dinners</span>
                <span className="chip">More swimming</span>
              </div>
              <input className="field" placeholder="Or just tell us…" />
            </div>

            <div className="card" style={{ marginTop: "var(--space-4)", display: "grid", gap: "var(--space-2)" }}>
              <div className="label">Export</div>
              <a href="#" className="small">Add to calendar</a>
              <a href="#" className="small">Send to my phone</a>
              <a href="#" className="small">Share with Lina</a>
            </div>

            <div className="card" style={{ marginTop: "var(--space-4)", background: "var(--ink)", color: "var(--sand)", borderColor: "var(--ink)", display: "grid", gap: "var(--space-4)" }}>
              <span className="tag tag-pine" style={{ justifySelf: "start" }}>Premium</span>
              <h3 style={{ color: "var(--sand)" }}>Don&apos;t have a next trip yet?</h3>
              <p className="small" style={{ opacity: 0.85 }}>A concierge finds one every month and books it for you. $12.99 a month, first week free.</p>
              <form action="/api/checkout" method="POST">
                <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Start your free week</button>
              </form>
              <Link href="/premium" className="small" style={{ color: "var(--sand)" }}>See the member view</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
