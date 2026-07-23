import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { ContactDialog } from "@/components/fohat/ContactDialog";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Projects Gateway — cinematic, procedural entrance to the FOHAT projects
 * area. Does NOT reference any specific case: uses vector composition,
 * capability keywords, technical grid and operational flow lines.
 *
 * Hooks (useScroll/useTransform) are called unconditionally; the reduced-
 * motion branch simply ignores the animated values downstream.
 */

const CAPABILITIES = [
  "estratégia",
  "desenvolvimento",
  "sistemas",
  "inteligência artificial",
  "equipamentos",
  "integração",
  "implantação",
  "operação",
  "monitoramento",
];

const NODES: { x: number; y: number; r: number; label?: string }[] = [
  { x: 90, y: 120, r: 4, label: "estratégia" },
  { x: 220, y: 70, r: 3 },
  { x: 340, y: 150, r: 5, label: "desenvolvimento" },
  { x: 470, y: 90, r: 3 },
  { x: 590, y: 170, r: 4, label: "IA" },
  { x: 720, y: 110, r: 3 },
  { x: 840, y: 200, r: 5, label: "operação" },
  { x: 160, y: 260, r: 3 },
  { x: 300, y: 320, r: 4, label: "integração" },
  { x: 460, y: 280, r: 3 },
  { x: 620, y: 340, r: 4, label: "implantação" },
  { x: 780, y: 300, r: 3 },
  { x: 240, y: 430, r: 4, label: "equipamentos" },
  { x: 420, y: 470, r: 3 },
  { x: 580, y: 440, r: 5, label: "monitoramento" },
  { x: 740, y: 480, r: 3 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [0, 7],
  [2, 8],
  [4, 10],
  [6, 11],
  [7, 8],
  [8, 9],
  [9, 10],
  [10, 11],
  [7, 12],
  [8, 13],
  [10, 14],
  [11, 15],
  [12, 13],
  [13, 14],
  [14, 15],
];

export function ProjectsGateway() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Called unconditionally — apply raw scroll value only when motion is allowed.
  const rawY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.06]);
  const rawSweep = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  const bgY = reduce ? "0%" : rawY;
  const bgScale = reduce ? 1 : rawScale;
  const sweepScale = reduce ? 1 : rawSweep;

  return (
    <section
      ref={ref}
      id="projetos"
      className="relative overflow-hidden bg-navy py-28 text-white lg:py-36"
    >
      {/* PROCEDURAL BACKDROP — grid, gradient, vector network */}
      <motion.div
        aria-hidden
        style={{ y: bgY, scale: bgScale }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 60% at 20% 20%, oklch(0.35 0.09 240 / 0.55), transparent 60%), radial-gradient(50% 50% at 80% 80%, oklch(0.42 0.11 210 / 0.4), transparent 60%)",
          }}
        />
        <div className="fohat-grid-bg-dark absolute inset-0 opacity-60" />
        <svg
          viewBox="0 0 960 540"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="pg-edge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.85 0.14 210)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="oklch(0.7 0.15 250)" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          {EDGES.map(([a, b], i) => {
            const na = NODES[a];
            const nb = NODES[b];
            return (
              <line
                key={i}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke="url(#pg-edge)"
                strokeWidth="0.8"
                opacity="0.55"
              />
            );
          })}
          {NODES.map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r={n.r} fill="oklch(0.9 0.12 210)" opacity="0.85" />
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r + 4}
                fill="none"
                stroke="oklch(0.9 0.12 210)"
                strokeWidth="0.5"
                opacity="0.25"
              />
            </g>
          ))}
        </svg>
        {/* Scroll-linked horizontal sweep */}
        <motion.div
          style={{ scaleX: sweepScale, transformOrigin: "left center" }}
          className="absolute inset-x-0 top-1/2 h-px origin-left bg-gradient-to-r from-transparent via-cyan/60 to-transparent"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/85 to-navy"
      />

      <div className="fohat-shell relative">
        <SectionReveal className="max-w-[840px]">
          <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
            Projetos em funcionamento
          </span>
          <h2 className="fohat-h2 mt-5 text-white">
            Tecnologia que sai do conceito e entra em operação no mundo real.
          </h2>
          <p className="fohat-lead mt-6 text-[oklch(0.85_0.02_250)]">
            Conheça projetos em que a FOHAT integrou estratégia, desenvolvimento, inteligência
            artificial, equipamentos e operação para criar experiências e soluções em diferentes
            contextos.
          </p>
        </SectionReveal>

        {/* Capability rail */}
        <SectionReveal delay={120} className="mt-12">
          <div className="flex flex-wrap gap-2">
            {CAPABILITIES.map((c) => (
              <span
                key={c}
                className="fohat-mono rounded-full border border-white/18 bg-white/[0.04] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/80"
              >
                {c}
              </span>
            ))}
          </div>
        </SectionReveal>

        {/* Operational flow — abstract diagram in three layers */}
        <SectionReveal delay={180} className="mt-12">
          <div className="relative rounded-[28px] border border-white/12 bg-white/[0.03] p-8 backdrop-blur-sm lg:p-10">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { n: "01", t: "Conceito", d: "Intenção, contexto e arquitetura da solução." },
                { n: "02", t: "Construção", d: "Software, IA, equipamentos e integrações." },
                { n: "03", t: "Operação", d: "Implantação, suporte presencial e monitoramento." },
              ].map((step) => (
                <div key={step.n} className="relative">
                  <div className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-cyan">
                    Camada {step.n}
                  </div>
                  <div className="mt-3 text-xl font-bold tracking-tight text-white">{step.t}</div>
                  <p className="mt-2 text-sm text-white/70">{step.d}</p>
                </div>
              ))}
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-8 bottom-4 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent"
            />
          </div>
        </SectionReveal>

        <SectionReveal delay={240} className="mt-12 flex flex-wrap gap-3">
          <Link
            to="/engenharia-de-presenca/projetos"
            className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-navy shadow-[0_14px_40px_oklch(0_0_0_/_0.24)] transition-transform hover:-translate-y-0.5 hover:bg-cyan"
          >
            Conheça nossos projetos
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <ContactDialog>
            <button className="group inline-flex h-14 items-center gap-3 rounded-full border border-white/28 bg-white/[0.06] px-7 text-sm font-bold text-white backdrop-blur-md transition-colors hover:border-cyan hover:text-cyan">
              Conte sua ideia
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </ContactDialog>
        </SectionReveal>
      </div>
    </section>
  );
}
