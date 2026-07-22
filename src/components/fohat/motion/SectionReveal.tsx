import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  /** viewport intersection threshold (0..1) */
  threshold?: number;
  /** vertical translate in px before reveal */
  offset?: number;
  /** run once and disconnect */
  once?: boolean;
};

/**
 * Lightweight, GPU-friendly reveal driven by IntersectionObserver.
 * Uses transform+opacity only. Respects reduced motion via CSS
 * (`prefers-reduced-motion: reduce` neutralizes the transition).
 */
export function SectionReveal({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  threshold = 0.15,
  offset = 24,
  once = true,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) io.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);

  return (
    <Tag
      ref={ref as never}
      data-visible={visible ? "true" : "false"}
      className={cn("fohat-section-reveal", className)}
      style={{
        transitionDelay: `${delay}ms`,
        // hint the browser
        willChange: visible ? "auto" : "transform, opacity",
        // per-instance offset
        ["--reveal-offset" as string]: `${offset}px`,
      }}
    >
      {children}
    </Tag>
  );
}
