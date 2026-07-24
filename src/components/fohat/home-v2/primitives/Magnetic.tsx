import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Magnetic — wraps a CTA (button/link) with a soft pointer-follow effect
 * plus a subtle glow. Same physics used by the FinalCTA button.
 *
 * Usage:
 *   <Magnetic>
 *     <button className="...">Conte sua ideia</button>
 *   </Magnetic>
 */
export function Magnetic({
  children,
  radius = 90,
  strength = 0.3,
  glow = true,
  glowColor = "oklch(0.85 0.11 220 / 0.45)",
  className = "",
}: {
  children: ReactNode;
  radius?: number;
  strength?: number;
  glow?: boolean;
  glowColor?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 220, damping: 20, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 220, damping: 20, mass: 0.4 });
  const rotate = useTransform(x, [-40, 40], [-2, 2]);

  const onMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (reduce) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const clamp = (v: number) => Math.max(-radius, Math.min(radius, v));
    rawX.set(clamp(dx) * strength);
    rawY.set(clamp(dy) * strength);
  };

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      className={`relative inline-block ${className}`}
    >
      {glow && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -inset-6 rounded-full"
          style={{
            x,
            y,
            background: `radial-gradient(circle, ${glowColor}, transparent 60%)`,
            opacity: hovered ? 1 : 0,
            filter: "blur(20px)",
            transition: "opacity 0.4s ease",
          }}
        />
      )}
      <motion.span
        style={{ x, y, rotate }}
        className="relative inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}
