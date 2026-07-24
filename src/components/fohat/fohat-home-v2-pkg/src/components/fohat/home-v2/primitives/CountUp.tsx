import { useEffect, useRef, useState } from "react";
import { animate, useMotionValue, useTransform, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CountUpProps {
  value: number;
  /** Duration in seconds (default 1.6) */
  duration?: number;
  /** Show a leading + (e.g. 12+) */
  plus?: boolean;
  /** Format function; falls back to Intl.NumberFormat with pt-BR */
  format?: (n: number) => string;
  /** How many decimals to show while animating (default 0) */
  decimals?: number;
  className?: string;
}

/**
 * Count-up that starts when the element intersects the viewport.
 * Motion is driven by motion/react animate() — GPU-friendly and cancellable.
 * Respects prefers-reduced-motion by showing the final value immediately.
 */
export function CountUp({
  value,
  duration = 1.6,
  plus = false,
  format,
  decimals = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [started, setStarted] = useState(false);
  const reduce = useReducedMotion();

  const mv = useMotionValue(0);
  const display = useTransform(mv, (latest) => {
    const rounded =
      decimals > 0
        ? Number(latest.toFixed(decimals))
        : Math.round(latest);
    if (format) return format(rounded);
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(rounded);
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      mv.set(value);
      setStarted(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            setStarted(true);
            const controls = animate(mv, value, {
              duration,
              ease: [0.16, 1, 0.3, 1],
            });
            io.disconnect();
            return () => controls.stop();
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration, reduce, mv, started]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{display}</motion.span>
      {plus && <span aria-hidden>+</span>}
    </span>
  );
}
