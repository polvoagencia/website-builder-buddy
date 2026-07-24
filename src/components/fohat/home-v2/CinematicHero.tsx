import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

import { ContactDialog } from "@/components/fohat/ContactDialog";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Chapter 1 — Cold open.
 *
 * A single centered composition on a full-viewport dark stage. The core
 * copy line rises through a mask reveal, the ambient background pulses,
 * and everything is coupled to the page scroll so the hero "handoffs"
 * to the next chapter (translateY -up, subtle scale, opacity fade).
 *
 * There is no split layout, no tab switcher, no product card — the visual
 * *is* the light and the type. Apple-launch feeling comes from restraint,
 * not from more elements.
 */
export function CinematicHero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);

  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const orbOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-navy px-6 pt-28 text-white lg:pt-32"
    >
      {/* ============ AMBIENT BACKGROUND ============ */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Central orb — the "sun" of the composition */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[95vmin] w-[95vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            scale: reduce ? 1 : orbScale,
            opacity: reduce ? 1 : orbOpacity,
            background:
              "radial-gradient(circle, oklch(0.46 0.09 253 / 0.65) 0%, oklch(0.30 0.06 250 / 0.35) 30%, transparent 62%)",
            filter: "blur(50px)",
          }}
        />
        {/* Cyan halo */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[55vmin] w-[55vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            opacity: reduce ? 0.6 : orbOpacity,
            background:
              "radial-gradient(circle, oklch(0.85 0.11 220 / 0.5), transparent 65%)",
            filter: "blur(70px)",
          }}
          animate={
            reduce
              ? undefined
              : {
                  scale: [1, 1.08, 1],
                }
          }
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Mesh grid — the "blueprint" layer */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.85 0.055 245) 1px, transparent 1px), linear-gradient(90deg, oklch(0.85 0.055 245) 1px, transparent 1px)",
            backgroundSize: "84px 84px",
            maskImage:
              "radial-gradient(ellipse at 50% 50%, black 30%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 50%, black 30%, transparent 78%)",
          }}
        />
        {/* Thin horizon */}
        <div
          className="absolute bottom-[22%] left-0 h-px w-full opacity-70"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.85 0.11 220 / 0.55), transparent)",
            boxShadow: "0 0 24px oklch(0.85 0.11 220 / 0.4)",
          }}
        />
      </div>

      {/* ============ CENTER STAGE ============ */}
      <motion.div
        className="relative z-10 flex max-w-5xl flex-col items-center gap-10 text-center"
        style={{
          y: reduce ? 0 : contentY,
          scale: reduce ? 1 : contentScale,
          opacity: reduce ? 1 : contentOpacity,
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
          </span>
          <span
            className="fohat-mono text-[10px] font-bold uppercase tracking-[0.24em]"
            style={{ color: "var(--color-cyan)" }}
          >
            Tecnologia aplicada · do conceito à operação
          </span>
        </motion.div>

        {/* Massive display headline — two lines with mask reveal */}
        <div className="space-y-0">
          <MaskLine delay={0.1}>Do conceito</MaskLine>
          <MaskLine delay={0.35}>
            <span
              className="italic"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #ffffff 0%, oklch(0.85 0.055 245) 55%, oklch(0.65 0.09 240 / 0.75) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                display: "inline-block",
              }}
            >
              à operação.
            </span>
          </MaskLine>
        </div>

        {/* Subhead */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[640px] text-balance text-lg leading-relaxed text-white/60 lg:text-xl"
        >
          Três frentes. Uma engenharia. A FOHAT integra experiências, software e
          infraestrutura em projetos que acontecem diante do público.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <ContactDialog>
            <button className="group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-white px-8 text-sm font-bold text-navy shadow-[0_18px_48px_oklch(0.78_0.11_220_/_0.35)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cyan">
              Conte sua ideia
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </ContactDialog>
          <a
            href="#frentes"
            className="inline-flex h-14 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-8 text-sm font-bold text-white backdrop-blur-md transition-colors hover:border-cyan hover:text-cyan"
          >
            Conheça as frentes
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll hint at the bottom */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="fohat-mono absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white/50"
        style={{ opacity: reduce ? 0.5 : contentOpacity }}
      >
        <span>Role para começar</span>
        <motion.span
          className="inline-block h-4 w-px bg-white/50"
          animate={reduce ? undefined : { opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Bottom gradient handoff to the next (lighter) chapter */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(180deg, transparent, oklch(0.22 0.023 250 / 0.6) 40%, var(--color-mist))",
        }}
      />
    </section>
  );
}

/**
 * A single line rendered with an overflow-hidden mask and inner translateY
 * animation, so the words rise from below the baseline on first paint.
 */
function MaskLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <span
      className="block overflow-hidden pb-2"
      style={{ lineHeight: 0.92 }}
    >
      <motion.span
        initial={reduce ? false : { y: "108%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.05, delay, ease: [0.16, 1, 0.3, 1] }}
        className="fohat-h1 inline-block text-white"
        style={{
          fontSize: "clamp(3rem, 8.4vw, 8rem)",
          letterSpacing: "-0.05em",
          lineHeight: 0.92,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
