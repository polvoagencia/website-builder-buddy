import { ArrowUpRight } from "lucide-react";
import eventosAsset from "@/assets/eventos.jpg.asset.json";

import { EVENTS } from "@/data/presence-territories-content";
import { ContactDialog } from "@/components/fohat/ContactDialog";
import { TerritoryBreadcrumb } from "@/components/fohat/territories/shared/TerritoryBreadcrumb";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { TextReveal } from "@/components/fohat/motion/TextReveal";

/**
 * Hero de Eventos e Espaços — espacial e operacional.
 * Composição: planta abstrata com zonas de interação conectadas,
 * imagem editorial como fragmento lateral.
 */
export function EventsHero() {
  const { hero, breadcrumb, eyebrow } = EVENTS;
  const zones = hero.zones;

  return (
    <section
      id="visao-geral"
      aria-labelledby="events-hero-title"
      className="relative overflow-hidden pt-36 pb-20 text-white lg:pt-44 lg:pb-28"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 100% 0%, oklch(0.42 0.09 210 / 0.35), transparent 60%), linear-gradient(180deg, oklch(0.22 0.023 250) 0%, oklch(0.24 0.032 240) 100%)",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg-dark" />

      <div className="fohat-shell relative grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <SectionReveal>
          <div className="mb-6">
            <TerritoryBreadcrumb items={breadcrumb} tone="dark" />
          </div>
          <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
            {eyebrow}
          </span>
          <h1
            id="events-hero-title"
            className="fohat-h1 mt-6 max-w-[820px] text-white [font-size:clamp(2.5rem,5.2vw,5rem)]"
          >
            <TextReveal as="span" text={hero.titleLead} stagger={120} />
            <span className="mt-2 block text-cyan">
              <TextReveal as="span" text={hero.titleAccent} stagger={120} delay={220} />
            </span>
          </h1>
          <p className="fohat-lead mt-6 max-w-[560px] text-[oklch(0.85_0.02_250)]">
            {hero.lead}
          </p>

          {/* Legenda de zonas */}
          <ul
            aria-label="Zonas de uma jornada espacial"
            className="mt-10 flex flex-wrap gap-2"
          >
            {zones.map((z, i) => (
              <li
                key={z}
                className="fohat-mono inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.05] px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-cyan/90"
              >
                <span className="text-cyan/60">{String(i + 1).padStart(2, "0")}</span>
                {z}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <ContactDialog
              sourcePage="/engenharia-de-presenca/eventos-e-espacos"
              sourceCta={hero.cta}
            >
              <button
                type="button"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-navy shadow-[0_14px_40px_oklch(0_0_0_/_0.28)] transition-all hover:-translate-y-0.5 hover:bg-cyan"
              >
                {hero.cta}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </ContactDialog>
          </div>
        </SectionReveal>

        {/* Planta abstrata + imagem editorial em canto */}
        <SectionReveal delay={140} className="relative">
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[32px] border border-white/10 bg-navy/50 p-6 backdrop-blur">
            <svg
              role="img"
              aria-label="Planta abstrata de um evento: zonas de entrada, circulação, interação, ambiente e entrega, conectadas por trajetos."
              viewBox="0 0 500 400"
              className="h-full w-full"
            >
              <defs>
                <pattern id="ev-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="oklch(0.85 0.055 245 / 0.15)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="500" height="400" fill="url(#ev-grid)" />

              {/* Zonas */}
              {[
                { x: 40, y: 300, w: 90, h: 60, label: "Entrada" },
                { x: 180, y: 250, w: 120, h: 90, label: "Circulação" },
                { x: 340, y: 220, w: 120, h: 110, label: "Interação" },
                { x: 200, y: 90, w: 140, h: 110, label: "Ambiente" },
                { x: 380, y: 60, w: 90, h: 70, label: "Entrega" },
              ].map((z) => (
                <g key={z.label}>
                  <rect
                    x={z.x}
                    y={z.y}
                    width={z.w}
                    height={z.h}
                    fill="oklch(0.85 0.055 245 / 0.08)"
                    stroke="oklch(0.85 0.055 245 / 0.5)"
                    strokeWidth="1"
                    rx="4"
                  />
                  <text
                    x={z.x + 8}
                    y={z.y + 16}
                    fontSize="9"
                    fontFamily="JetBrains Mono, monospace"
                    fill="oklch(0.85 0.055 245)"
                    letterSpacing="1.5"
                  >
                    {z.label.toUpperCase()}
                  </text>
                </g>
              ))}

              {/* Trajetos */}
              <path
                d="M 85 330 Q 150 320 240 295 T 400 275 T 450 130 T 425 95"
                fill="none"
                stroke="oklch(0.85 0.055 245)"
                strokeWidth="1.4"
                strokeDasharray="4 4"
              />

              {/* Fluxo de pessoas — pontos */}
              {[[85, 330], [240, 295], [400, 275], [270, 145], [425, 95]].map(
                ([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="4" fill="oklch(0.85 0.055 245)">
                    <animate
                      attributeName="opacity"
                      values="0.4;1;0.4"
                      dur={`${2 + i * 0.4}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                ),
              )}
            </svg>

            {/* Fragmento editorial no canto */}
            <div className="absolute bottom-4 left-4 h-24 w-32 overflow-hidden rounded-md border border-white/20 shadow-[var(--shadow-card)]">
              <img
                src={eventosAsset.url}
                alt="Instalação com iluminação e público em ambiente de evento — imagem editorial, não representa projeto específico."
                width={256}
                height={192}
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
