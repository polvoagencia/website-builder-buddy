import { useEffect, type ReactNode } from "react";

/**
 * Single global scroll listener. Writes normalized scroll progress
 * (0..1) and raw scroll offset to CSS custom properties on <html>:
 *
 *   --fohat-scroll        : 0..1 progress through the page
 *   --fohat-scroll-y      : current scrollTop in px
 *
 * Any component can read these in CSS without wiring its own listener.
 * Respects prefers-reduced-motion by skipping the loop and clamping to 0.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      root.style.setProperty("--fohat-scroll", "0");
      root.style.setProperty("--fohat-scroll-y", "0px");
      return;
    }

    let raf = 0;
    const tick = () => {
      const max = root.scrollHeight - root.clientHeight;
      const y = root.scrollTop;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      root.style.setProperty("--fohat-scroll", p.toFixed(4));
      root.style.setProperty("--fohat-scroll-y", `${y}px`);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <>{children}</>;
}
