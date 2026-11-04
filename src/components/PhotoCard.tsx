import Image from "next/image";
import type { Photo } from "@/lib/photos";

// A 4:5 portrait with the place as the only text, over a scrim. See the brand book.
export function PhotoCard({
  photo,
  eyebrow,
  deal,
}: {
  photo: Photo;
  eyebrow: string;
  deal: string;
}) {
  return (
    <figure
      style={{
        position: "relative",
        margin: 0,
        aspectRatio: "4 / 5",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        background: "var(--sand)",
      }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 900px) 360px, 100vw"
        style={{ objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(20,19,17,0) 40%, var(--scrim) 100%)",
        }}
      />
      <figcaption
        style={{
          position: "absolute",
          left: "var(--space-4)",
          right: "var(--space-4)",
          bottom: "var(--space-4)",
          color: "var(--on-photo)",
        }}
      >
        <div className="label" style={{ color: "var(--on-photo)", opacity: 0.8 }}>
          {eyebrow}
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            lineHeight: "32px",
            marginTop: "var(--space-2)",
          }}
        >
          {photo.place}
        </div>
        <div className="small" style={{ marginTop: 4 }}>
          {deal}
        </div>
      </figcaption>
    </figure>
  );
}
