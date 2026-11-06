import Image from "next/image";
import type { Photo } from "@/lib/photos";

// Full-bleed photo layer that drifts on scroll. The parent section must be
// position: relative and overflow: hidden. Driven by ScrollFx.
export function ParallaxImage({ photo, speed = 0.18, priority = false }: { photo: Photo; speed?: number; priority?: boolean }) {
  return (
    <div data-parallax={speed} style={{ position: "absolute", inset: `${-speed * 100}% 0`, willChange: "transform" }}>
      <Image src={photo.src} alt={photo.alt} fill priority={priority} sizes="100vw" className="fx-zoom" style={{ objectFit: "cover" }} />
    </div>
  );
}
