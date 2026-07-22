import { useEffect, useState, type RefObject } from "react";

/**
 * Progress of an element through the viewport (0..1).
 *
 * 0 = element top just entered the bottom of the viewport
 * 1 = element bottom just left the top of the viewport
 *
 * Values before/after that window are clamped. Useful for sticky story
 * sections that transform as the user scrolls through them.
 */
export function useElementProgress(
  ref: RefObject<HTMLElement | null>,
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const compute = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      const total = rect.height + vh;
      const traveled = vh - rect.top;
      const p = total > 0 ? Math.min(1, Math.max(0, traveled / total)) : 0;
      setProgress(p);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return progress;
}
