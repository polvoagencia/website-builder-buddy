import { ArrowUpRight } from "lucide-react";
import culturaAsset from "@/assets/cultura.jpg.asset.json";

import { CULTURE } from "@/data/presence-territories-content";
import { ContactDialog } from "@/components/fohat/ContactDialog";
import { TerritoryBreadcrumb } from "@/components/fohat/territories/shared/TerritoryBreadcrumb";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { TextReveal } from "@/components/fohat/motion/TextReveal";

/**
 * Hero de Cultura — contemplativo, com muito respiro.
 * Composição em camadas: fragmentos de acervo, linhas de tempo, palavras.
 * Imagem culturaAsset como fragmento editorial, não como registro de projeto.
 */
export function CultureHero() {
  const { hero, breadcrumb, eyebrow } = CULTURE;
  return (
    <section
      id="visao-geral"
      aria-labelledby="culture-hero-title"
      className="relative overflow-hidden bg-mist pt-36 pb-20 lg:pt-44 lg:pb-32"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 80% 60% at 80% 0%, oklch(0.85 0.055 245 / 0.25), transparent 70%)",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-40" />

      <div className="fohat-shell relative grid gap-16 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <SectionReveal>
          <div className="mb-6">
            <TerritoryBreadcrumb items={breadcrumb} tone="light" />
          </div>
          <span className="fohat-eyebrow">{eyebrow}</span>
          <h1
            id="culture-hero-title"
            className="fohat-h1 mt-8 max-w-[760px] text-navy [font-size:clamp(2.5rem,5.2vw,5rem)] [line-height:1.02]"
          >
            <TextReveal as="span" text={hero.titleLead} stagger={140} />
            <span className="mt-3 block text-blue">
              <TextReveal as="span" text={hero.titleAccent} stagger={140} delay={280} />
            </span>
          </h1>
          <p className="fohat-lead mt-8 max-w-[560px] text-navy/70">{hero.lead}</p>

          {/* Fragmentos de acervo — pequenos rótulos que representam camadas */}
          <ul aria-label="Camadas de conteúdo cultural" className="mt-10 flex flex-wrap gap-2">
            {hero.fragments.map((f, i) => (
              <li
                key={f}
                className="fohat-mono rounded-sm border border-navy/15 bg-white/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-navy/70 backdrop-blur-sm"
                style={{ transform: `translateY(${(i % 3) * 4}px)` }}
              >
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <ContactDialog sourcePage="/engenharia-de-presenca/cultura" sourceCta={hero.cta}>
              <button
                type="button"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-navy px-7 text-sm font-bold text-white shadow-[var(--shadow-cta)] transition-all hover:-translate-y-0.5 hover:bg-blue"
              >
                {hero.cta}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </ContactDialog>
          </div>
        </SectionReveal>

        {/* Composição editorial em camadas */}
        <SectionReveal delay={180} className="relative">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[440px]">
            {/* Fragmento 1: imagem editorial */}
            <div className="absolute inset-y-0 left-0 w-[70%] overflow-hidden rounded-[8px] shadow-[var(--shadow-elegant)]">
              <img
                src={culturaAsset.url}
                alt="Visitante em pausa diante de obra em ambiente cultural — imagem editorial, não representa acervo específico."
                width={600}
                height={800}
                loading="eager"
                className="h-full w-full object-cover"
                style={{ filter: "saturate(0.85) contrast(1.02)" }}
              />
            </div>
            {/* Fragmento 2: cartela de linha de tempo */}
            <div
              aria-hidden
              className="absolute right-0 top-[10%] w-[55%] rounded-[6px] border border-navy/15 bg-white/95 p-4 shadow-[var(--shadow-card)] backdrop-blur"
            >
              <div className="fohat-mono text-[9px] uppercase tracking-[0.2em] text-blue">
                Linha do tempo
              </div>
              <div className="mt-3 space-y-2">
                {["Origem", "Contexto", "Presença", "Hoje"].map((t, i) => (
                  <div key={t} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-navy" />
                    <span className="fohat-mono text-[10px] uppercase tracking-[0.14em] text-navy/70">
                      {t}
                    </span>
                    <span className="ml-auto text-[9px] text-steel">camada 0{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Fragmento 3: nota de patrimônio */}
            <div
              aria-hidden
              className="absolute bottom-0 right-[6%] w-[45%] rounded-[6px] border border-navy/15 bg-navy/95 p-4 text-white shadow-[var(--shadow-card)]"
            >
              <div className="fohat-mono text-[9px] uppercase tracking-[0.2em] text-cyan">
                Patrimônio
              </div>
              <p className="mt-2 text-[13px] leading-snug">
                A obra permanece no centro. A tecnologia abre novas portas de entrada.
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
