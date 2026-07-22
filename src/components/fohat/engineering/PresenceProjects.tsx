import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";

/**
 * Entrada visual para /engenharia-de-presenca/projetos.
 * Composição procedural: janela editorial abstrata (grid + módulos)
 * representando projetos em funcionamento. Sem case específico em destaque.
 */
export function PresenceProjects() {
  return (
    <section
      id="projetos"
      aria-labelledby="projetos-heading"
      className="relative overflow-hidden bg-navy py-24 text-white lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 20% 30%, oklch(0.35 0.09 240 / 0.4), transparent 60%)",
        }}
      />

      <div className="fohat-shell relative grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <SectionReveal>
          <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
            Projetos de Engenharia de Presença
          </span>
          <h2 id="projetos-heading" className="fohat-h2 mt-5 text-white">
            Do conceito ao funcionamento diante do público.
          </h2>
          <p className="fohat-lead mt-6 text-[oklch(0.85_0.02_250)]">
            Conheça projetos em que a metodologia saiu do conceito e entrou em
            funcionamento diante do público.
          </p>
          <div className="mt-10">
            <Link
              to="/engenharia-de-presenca/projetos"
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-navy shadow-[0_14px_40px_oklch(0_0_0_/_0.24)] transition-transform hover:-translate-y-0.5 hover:bg-cyan"
            >
              Ver projetos de Engenharia de Presença
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </SectionReveal>

        <SectionReveal delay={120} className="relative">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.03] backdrop-blur-sm">
            <svg
              viewBox="0 0 500 400"
              aria-hidden
              className="absolute inset-0 h-full w-full"
            >
              <defs>
                <linearGradient id="pp-cell" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.85 0.055 245 / 0.35)" />
                  <stop offset="100%" stopColor="oklch(0.46 0.055 253 / 0.1)" />
                </linearGradient>
              </defs>
              {/* Grid procedural */}
              {Array.from({ length: 10 }).map((_, i) => (
                <line
                  key={`v${i}`}
                  x1={i * 50}
                  y1="0"
                  x2={i * 50}
                  y2="400"
                  stroke="oklch(1 0 0 / 0.05)"
                />
              ))}
              {Array.from({ length: 9 }).map((_, i) => (
                <line
                  key={`h${i}`}
                  x1="0"
                  y1={i * 50}
                  x2="500"
                  y2={i * 50}
                  stroke="oklch(1 0 0 / 0.05)"
                />
              ))}
              {/* Módulos representando projetos */}
              {[
                { x: 40, y: 40, w: 180, h: 110 },
                { x: 240, y: 40, w: 220, h: 60 },
                { x: 240, y: 120, w: 220, h: 130 },
                { x: 40, y: 170, w: 180, h: 80 },
                { x: 40, y: 270, w: 420, h: 90 },
              ].map((r, i) => (
                <g key={i}>
                  <rect
                    x={r.x}
                    y={r.y}
                    width={r.w}
                    height={r.h}
                    rx="10"
                    fill="url(#pp-cell)"
                    stroke="oklch(0.85 0.055 245 / 0.35)"
                    strokeWidth="0.6"
                  />
                  <circle cx={r.x + 12} cy={r.y + 12} r="2" fill="oklch(0.85 0.055 245)" />
                </g>
              ))}
            </svg>
            <div className="fohat-mono absolute left-5 top-5 rounded-full border border-white/25 bg-black/30 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/85 backdrop-blur">
              Projetos em operação
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
