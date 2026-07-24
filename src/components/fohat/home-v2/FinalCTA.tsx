import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import markAsset from "@/assets/mark-fohat.png.asset.json";
import { ContactDialog } from "@/components/fohat/ContactDialog";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Chapter 8 — Final CTA.
 *
 * One dark room, one sentence, one button. The button is magnetic
 * (softly follows the pointer within a radius) and the FOHAT mark glows
 * behind it. Deliberately minimal so the page closes on a strong beat.
 */
export function FinalCTA() {
  const reduce = useReducedMotion();

  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-navy px-6 py-32 text-white lg:py-40"
    >
      {/* Background composition */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 h-[85vmin] w-[85vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.46 0.09 253 / 0.55), transparent 60%)",
            filter: "blur(90px)",
          }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[45vmin] w-[45vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.85 0.11 220 / 0.45), transparent 65%)",
            filter: "blur(60px)",
          }}
          animate={reduce ? undefined : { scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* FOHAT mark ghost */}
        <motion.img
          src={markAsset.url}
          alt=""
          className="absolute left-1/2 top-1/2 h-[38vmin] w-[38vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        />
        {/* Blueprint grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.85 0.055 245) 1px, transparent 1px), linear-gradient(90deg, oklch(0.85 0.055 245) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse at center, black 25%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 25%, transparent 75%)",
          }}
        />
      </div>

      <div className="fohat-shell relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            <span
              className="fohat-mono text-[10px] font-bold uppercase tracking-[0.24em]"
              style={{ color: "var(--color-cyan)" }}
            >
              Comece pela intenção
            </span>
          </motion.div>

          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="fohat-h1 text-balance text-white"
            style={{
              fontSize: "clamp(2.5rem, 6.5vw, 6rem)",
              letterSpacing: "-0.05em",
              lineHeight: 0.98,
            }}
          >
            Presença, sistema ou infraestrutura —{" "}
            <span
              className="italic"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, oklch(0.98 0 0), oklch(0.85 0.11 220))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              conte o que você precisa colocar em funcionamento.
            </span>
          </motion.h2>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-8 max-w-[600px] text-lg leading-relaxed text-white/60 lg:text-xl"
          >
            A ideia não precisa estar pronta. A FOHAT ajuda a encontrar o
            caminho entre a intenção e a execução.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-col items-center gap-8"
          >
            <MagneticCTA />
            <a
              href="#inicio"
              className="fohat-mono inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white/40 transition-colors hover:text-cyan"
            >
              ↑ Voltar ao topo
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * The button softly follows the pointer inside a radius. Uses springs
 * so the motion feels physical and returns to center on leave.
 */
function MagneticCTA() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 220, damping: 20, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 220, damping: 20, mass: 0.4 });
  const rotate = useTransform(x, [-40, 40], [-2, 2]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const radius = 90; // pull strength radius
    const strength = 0.35;
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
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      className="relative"
    >
      {/* Glow that follows */}
      <motion.span
        aria-hidden
        className="absolute -inset-8 rounded-full"
        style={{
          x,
          y,
          background:
            "radial-gradient(circle, oklch(0.85 0.11 220 / 0.45), transparent 60%)",
          opacity: hovered ? 1 : 0.55,
          filter: "blur(24px)",
          transition: "opacity 0.4s ease",
        }}
      />
      <ContactDialog>
        <motion.button
          style={{ x, y, rotate }}
          className="group relative inline-flex h-16 items-center gap-3 overflow-hidden rounded-full bg-white px-10 text-base font-bold text-navy shadow-[0_20px_60px_oklch(0.78_0.11_220_/_0.4)] transition-colors hover:bg-cyan"
        >
          Conte sua ideia
          <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.button>
      </ContactDialog>
    </div>
  );
}
