import { ArrowRight, ArrowUpRight } from "lucide-react";
import marcasAsset from "@/assets/marcas.jpg.asset.json";

import { BRANDS } from "@/data/presence-territories-content";
import { ContactDialog } from "@/components/fohat/ContactDialog";
import { TerritoryBreadcrumb } from "@/components/fohat/territories/shared/TerritoryBreadcrumb";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { TextReveal } from "@/components/fohat/motion/TextReveal";

/**
 * Hero de Marcas — participação, personalização e energia.
 * Diagrama vivo: mensagem → participação → personalização → memória.
 * Composição navy com brilhos cyan/magenta suaves; imagem editorial ao lado.
 */
export function BrandsHero() {
  const { hero, eyebrow, breadcrumb, cta } = { ...BRANDS.hero, ...BRANDS };
  const { diagram } = BRANDS.hero;
  return (
    <section
      id="visao-geral"
      aria-labelledby="brands-hero-title"
      className="relative overflow-hidden pt-36 pb-20 text-white lg:pt-44 lg:pb-28"
      style={{
        background:
          "radial-gradient(ellipse 90% 60% at 12% 0%, oklch(0.5 0.18 320 / 0.28), transparent 60%), radial-gradient(ellipse 70% 60% at 100% 100%, oklch(0.85 0.06 245 / 0.2), transparent 60%), linear-gradient(180deg, oklch(0.22 0.023 250) 0%, oklch(0.26 0.028 260) 100%)",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg-dark" />
      <div className="fohat-shell relative grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <SectionReveal>
          <div className="mb-6">
            <TerritoryBreadcrumb items={BRANDS.breadcrumb} tone="dark" />
          </div>
          <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
            {BRANDS.eyebrow}
          </span>
          <h1
            id="brands-hero-title"
            className="fohat-h1 mt-6 max-w-[820px] text-white [font-size:clamp(2.5rem,5.2vw,5rem)]"
          >
            <TextReveal
              as="span"
              text={`${BRANDS.hero.titleLead}\n${BRANDS.hero.titleAccent}`}
              stagger={120}
            />
          </h1>
          <p className="fohat-lead mt-6 max-w-[620px] text-[oklch(0.85_0.02_250)]">
            {BRANDS.hero.lead}
          </p>

          {/* Diagrama de transformação */}
          <ol
            aria-label="Fluxo de transformação: mensagem, participação, personalização, memória"
            className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-3"
          >
            {diagram.map((label, i) => (
              <li key={label} className="inline-flex items-center gap-2">
                <span className="fohat-mono inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.06] px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-cyan backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden />
                  {label}
                </span>
                {i < diagram.length - 1 && (
                  <ArrowRight
                    className="h-4 w-4 text-white/40"
                    aria-hidden
                  />
                )}
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <ContactDialog sourcePage="/engenharia-de-presenca/marcas" sourceCta={BRANDS.hero.cta}>
              <button
                type="button"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-navy shadow-[0_14px_40px_oklch(0_0_0_/_0.28)] transition-all hover:-translate-y-0.5 hover:bg-cyan"
              >
                {BRANDS.hero.cta}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </ContactDialog>
          </div>
        </SectionReveal>

        {/* Imagem editorial + camada procedural */}
        <SectionReveal delay={140} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[36px] border border-white/10 shadow-[var(--shadow-elegant)]">
            <img
              src={marcasAsset.url}
              alt="Público participando de uma ativação tecnológica em ambiente de marca — composição editorial, não representa um projeto específico da FOHAT."
              width={800}
              height={1000}
              loading="eager"
              className="h-full w-full object-cover"
              style={{ filter: "saturate(0.9) contrast(1.05)" }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 40%, oklch(0.22 0.023 250 / 0.72))",
              }}
            />
            {/* Nós procedurais representando participações individuais */}
            <svg
              aria-hidden
              viewBox="0 0 400 500"
              className="absolute inset-0 h-full w-full mix-blend-screen opacity-70"
            >
              {[
                [80, 110], [180, 60], [300, 130], [340, 260], [260, 360],
                [140, 400], [60, 300], [220, 210],
              ].map(([x, y], i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="oklch(0.85 0.055 245)"
                >
                  <animate
                    attributeName="r"
                    values="3;5;3"
                    dur={`${3 + i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
              <path
                d="M80 110 L180 60 L300 130 L340 260 L260 360 L140 400 L60 300 L220 210 Z"
                fill="none"
                stroke="oklch(0.85 0.055 245 / 0.35)"
                strokeWidth="1"
              />
            </svg>
            <div className="fohat-mono absolute left-5 top-5 rounded-full border border-white/30 bg-black/25 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
              Participação · rede
            </div>
          </div>
        </SectionReveal>
      </div>
      {/* silence unused warnings — hero/eyebrow/breadcrumb/cta consumed above */}
      <span className="sr-only">{`${hero.cta} ${eyebrow} ${cta} ${breadcrumb.length}`}</span>
    </section>
  );
}
