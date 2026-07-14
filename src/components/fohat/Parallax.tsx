import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: ReactNode;
  /** How much the child translates as it crosses the viewport (px) */
  strength?: number;
  className?: string;
}

/**
 * Lightweight scroll-linked parallax using transform.
 * Applies translateY based on the element's position relative to viewport center.
 */
export function Parallax({ children, strength = 60, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Progress from -1 (below viewport) to +1 (above viewport), 0 at center
      const p = (rect.top + rect.height / 2 - vh / 2) / vh;
      const y = Math.max(-1.2, Math.min(1.2, p)) * -strength;
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
