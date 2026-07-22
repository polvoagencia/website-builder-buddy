import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { HOME_PROJECTS } from "@/data/home-content";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";

/**
 * Entrada geral para /engenharia-de-presenca/projetos.
 * Prova de capacidade procedural — sem fotos fictícias, sem grid de cases,
 * sem números inventados.
 */
export function HomeProjectsGateway() {
  return (
    <section
      className="relative overflow-hidden py-28 lg:py-36"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.22 0.023 250), oklch(0.18 0.023 250))",
        color: "white",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-70" />

      <div className="fohat-shell relative grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
        <SectionReveal>
          <span
            className="fohat-mono text-[11px] uppercase tracking-[0.24em]"
            style={{ color: "var(--color-cyan)" }}
          >
            {HOME_PROJECTS.eyebrow}
          </span>
          <h2
            className="mt-6 font-bold text-white"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.75rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.045em",
            }}
          >
            {HOME_PROJECTS.title}
          </h2>
          <p className="mt-6 max-w-[520px] text-lg leading-relaxed" style={{ color: "oklch(0.86 0.02 250)" }}>
            {HOME_PROJECTS.lead}
          </p>
          <Link
            to={HOME_PROJECTS.cta.to}
            className="group mt-9 inline-flex h-14 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-navy transition-transform hover:-translate-y-0.5 hover:bg-cyan"
          >
            {HOME_PROJECTS.cta.label}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </SectionReveal>

        <SectionReveal>
          <ProceduralOperationDiagram />
        </SectionReveal>
      </div>
    </section>
  );
}

/**
 * Diagrama procedural: conceito → sistema → interação → operação.
 * SVG estático, sem animação contínua.
 */
function ProceduralOperationDiagram() {
  const steps = ["Conceito", "Sistema", "Operação"];
  return (
    <div className="relative aspect-[5/4] w-full">
      <svg viewBox="0 0 500 400" className="h-full w-full" role="img" aria-label="Diagrama: conceito, sistema e operação conectados como um único fluxo">
        <defs>
          <linearGradient id="gwFlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-cyan)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--color-blue-2)" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Trilhas de operação */}
        <g stroke="var(--color-blue-2)" strokeOpacity="0.35" strokeWidth="1" fill="none">
          <path d="M 40 120 Q 250 40 460 120" />
          <path d="M 40 200 Q 250 260 460 200" />
          <path d="M 40 280 Q 250 340 460 280" />
        </g>

        {/* Fluxo principal — em operação */}
        <path
          d="M 40 200 Q 250 100 460 200"
          stroke="url(#gwFlow)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Nós */}
        {steps.map((label, i) => {
          const x = 40 + i * 210;
          return (
            <g key={label}>
              <circle cx={x} cy={200} r={22} fill="var(--color-navy)" stroke="var(--color-cyan)" strokeWidth="1.5" />
              <circle cx={x} cy={200} r={6} fill="var(--color-cyan)" />
              <text
                x={x}
                y={252}
                textAnchor="middle"
                fill="oklch(0.9 0.02 250)"
                fontSize="12"
                fontFamily="JetBrains Mono, monospace"
                letterSpacing="2"
              >
                {label.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Sinais laterais indicando "em funcionamento" */}
        <g fill="var(--color-cyan)">
          <circle cx="120" cy="120" r="2" opacity="0.7" />
          <circle cx="250" cy="90" r="2.5" />
          <circle cx="380" cy="120" r="2" opacity="0.7" />
          <circle cx="180" cy="310" r="2" opacity="0.5" />
          <circle cx="320" cy="310" r="2" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}
