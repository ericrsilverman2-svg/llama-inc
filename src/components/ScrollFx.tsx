"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// One client component for the whole site. Two declarative hooks:
//   data-reveal       on a section: gets class "in" once it scrolls into view.
//                     Children with .fx-up fade and rise; .fx-zoom settles from 1.1 to 1.
//   data-parallax="s" on an absolutely positioned image layer whose parent is the
//                     section: the layer drifts by s * section height as it crosses
//                     the viewport. Pair with inset: -(s*100)% 0 so edges never show.
// Both respect prefers-reduced-motion.
export function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealEls = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    let io: IntersectionObserver | undefined;
    if (reduce || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("in"));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io?.unobserve(e.target);
            }
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );
      revealEls.forEach((el) => io?.observe(el));
    }

    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]")).map((el) => ({
      el,
      speed: parseFloat(el.dataset.parallax ?? "") || 0.2,
      host: el.parentElement as HTMLElement,
    }));
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const { el, speed, host } of layers) {
        const r = host.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        // -1 when the section is just below the viewport, +1 when just above.
        const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
        el.style.transform = `translate3d(0, ${(-p * speed * r.height).toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    if (!reduce && layers.length) {
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
