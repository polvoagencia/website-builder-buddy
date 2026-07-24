import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { ScrollLinkedText } from "./primitives/ScrollLinkedText";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Chapter 4 — The Belief.
 *
 * A full-viewport statement. The sentence assembles word-by-word driven
 * by scroll progress through the section. Background gradient interpolates
 * from navy → white as the reader crosses it, marking the philosophical
 * pivot from "how" to "why".
 */
export function Belief() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Interpolate a solid background color so the whole page seems to
  // exhale between the dark Frontiers and the light Vitrine.
  const bg = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [
      "oklch(0.22 0.023 250)",
      "oklch(0.35 0.03 250)",
      "oklch(0.85 0.02 250)",
      "oklch(0.97 0.008 250)",
    ],
  );
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.4, 0.55, 1],
    [
      "oklch(0.98 0 0)",
      "oklch(0.96 0 0)",
      "oklch(0.22 0.023 250)",
      "oklch(0.22 0.023 250)",
    ],
  );

  return (
    <motion.section
      id="crenca"
      ref={ref}
      className="relative flex min-h-[130vh] flex-col justify-center overflow-hidden px-6 py-32"
      style={{ backgroundColor: reduce ? "var(--color-mist)" : bg }}
    >
      {/* Subtle noise/lines behind the type */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 70%)",
        }}
      />

      <motion.div
        className="fohat-shell relative z-10 max-w-none"
        style={{ color: reduce ? undefined : textColor }}
      >
        <div className="mb-10 flex items-center gap-3">
          <span
            aria-hidden
            className="block h-px w-10 bg-current opacity-60"
          />
          <span className="fohat-mono text-[10px] font-bold uppercase tracking-[0.28em] opacity-70">
            Nossa crença
          </span>
        </div>

        <ScrollLinkedText
          as="h2"
          text="A tecnologia não precisa afastar as pessoas do mundo. Ela pode devolvê-las a ele — através da presença projetada, do sistema desenhado e da operação que sustenta."
          className="fohat-h1 max-w-[1180px]"
          range={[0.15, 0.75]}
        />

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 max-w-[680px] text-lg leading-relaxed opacity-70 lg:text-xl"
        >
          Projetamos tecnologia com intenção, integração e foco no que permanece
          para o público. Cada frente existe para servir a esse propósito.
        </motion.p>
      </motion.div>
    </motion.section>
  );
}
