import { useEffect, useRef } from "react";

/**
 * Reveals `.reveal` elements on scroll (adds visibility, removes it once far
 * clear so scrolling back replays). The flag lives in a `data-visible`
 * attribute — deliberately NOT a class: React overwrites `className` on
 * every re-render, which would wipe an observer-added class and make any
 * interactive widget (FAQ toggles, checklist, tabs…) hide its own section.
 * React never touches `data-visible`, so reveals survive re-renders.
 * No-JS parity: without this hook the elements simply render at rest.
 */
export function useRevealRoot<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    // flag JS presence so .reveal hidden-states only apply with JS (§9 no-JS parity)
    document.documentElement.classList.add("js");
    const root = ref.current;
    if (!root || typeof IntersectionObserver === "undefined") {
      root?.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      return;
    }
    const targets: Element[] = root.classList.contains("reveal")
      ? [root, ...root.querySelectorAll(".reveal")]
      : [...root.querySelectorAll(".reveal")];
    // Entry observer: plays the reveal once any meaningful part is visible.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) (e.target as HTMLElement).dataset.visible = "1";
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    // Exit observer: resets ONLY once fully clear of the viewport plus a
    // 25% buffer on every side. A single exit snapshot fires at the boundary
    // (useless for hysteresis), so the buffer lives in the root bounds
    // instead — partial pass-throughs at the edge keep their state and can
    // never flicker in a show/hide loop.
    const ioOut = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) delete (e.target as HTMLElement).dataset.visible;
        }
      },
      { threshold: 0, rootMargin: "25% 0px 25% 0px" }
    );
    targets.forEach((t) => {
      io.observe(t);
      ioOut.observe(t);
    });
    return () => {
      io.disconnect();
      ioOut.disconnect();
    };
  }, []);

  return ref;
}
