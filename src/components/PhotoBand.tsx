import Image from "next/image";
import type { Photo } from "@/lib/photos";

// Full-bleed photo with a short line of copy. Scrim only where the text sits.
export function PhotoBand({
  photo,
  eyebrow,
  title,
  body,
  cta,
  height = "72svh",
  align = "left",
}: {
  photo: Photo;
  eyebrow?: string;
  title: string;
  body?: string;
  cta?: { label: string; href: string };
  height?: string;
  align?: "left" | "right";
}) {
  return (
    <section
      className="photo"
      style={{ position: "relative", minHeight: height, display: "flex", alignItems: "flex-end" }}
    >
      <Image src={photo.src} alt={photo.alt} fill sizes="100vw" style={{ objectFit: "cover" }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, var(--scrim) 0%, rgba(20,19,17,0.35) 35%, rgba(20,19,17,0) 65%)",
        }}
      />
      <div
        className="container"
        style={{
          position: "relative",
          paddingTop: "var(--space-16)",
          paddingBottom: "var(--space-16)",
          color: "var(--on-photo)",
          display: "flex",
          flexDirection: "column",
          alignItems: align === "right" ? "flex-end" : "flex-start",
          textAlign: align === "right" ? "right" : "left",
        }}
      >
        <div className="label" style={{ color: "var(--on-photo)", opacity: 0.8 }}>
          {eyebrow ?? photo.place}
        </div>
        <h2 style={{ marginTop: "var(--space-4)", maxWidth: "18ch" }}>{title}</h2>
        {body && (
          <p style={{ marginTop: "var(--space-4)", maxWidth: "44ch", fontSize: 19, lineHeight: "28px" }}>{body}</p>
        )}
        {cta && (
          <a href={cta.href} className="btn btn-photo" style={{ marginTop: "var(--space-6)" }}>
            {cta.label}
          </a>
        )}
        {eyebrow && (
          <div className="small" style={{ marginTop: "var(--space-6)", opacity: 0.7 }}>
            {photo.place}
          </div>
        )}
      </div>
    </section>
  );
}
