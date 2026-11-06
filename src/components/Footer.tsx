import Link from "next/link";
import { credits } from "@/lib/photos";

export function Footer() {
  return (
    <footer
      style={{ borderTop: "1px solid var(--hairline)", padding: "var(--space-10) 0" }}
    >
      <div
        className="container small muted"
        style={{ display: "grid", gap: "var(--space-4)" }}
      >
        <p>
          Llama Inc. is a demo built for a Stripe written exercise. Payments run in
          Stripe sandbox mode; no card is charged. Use test card 4242 4242 4242 4242
          with any future date and any CVC. <Link href="/terms">Terms of service</Link>.
        </p>
        <p style={{ maxWidth: "none" }}>
          Photography:{" "}
          {credits.map((c, i) => (
            <span key={c.profile}>
              <a href={c.profile}>{c.photographer}</a>
              {i < credits.length - 1 ? ", " : ""}
            </span>
          ))}{" "}
          on Unsplash.
        </p>
      </div>
    </footer>
  );
}
