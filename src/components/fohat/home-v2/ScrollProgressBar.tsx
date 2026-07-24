import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin scroll progress indicator fixed to the top of the viewport.
 * Reads the page's own scroll progress and smooths it via a spring.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.35,
  });

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, oklch(0.46 0.055 253), oklch(0.85 0.11 220))",
        boxShadow: "0 0 12px oklch(0.85 0.11 220 / 0.55)",
      }}
    />
  );
}
