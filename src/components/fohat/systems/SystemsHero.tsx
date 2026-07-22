import { InnerCTA } from "@/components/fohat/InnerHero";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { TextReveal } from "@/components/fohat/motion/TextReveal";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

/**
 * SystemsHero — abertura da página Sistemas e Aplicativos.
 * Composição visual de produto digital + operação, 100% procedural:
 * painéis, janelas, fluxos, nós e estados — sem screenshots reais e
 * sem imagens genéricas de laboratório.
 */
export function SystemsHero() {
  return (
    <section
      id="visao-geral"
      className="relative overflow-hidden bg-white pt-36 pb-24 lg:pt-44 lg:pb-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.85 0.055 245 / 0.4), transparent 65%)",
        }}
      />

      <div className="fohat-shell relative">
        <nav
          aria-label="Você está aqui"
          className="fohat-mono mb-8 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-blue"
        >
          <Link to="/" className="hover:text-navy">Início</Link>
          <ChevronRight aria-hidden className="h-3 w-3 opacity-50" />
          <span className="text-navy/70">Sistemas e Aplicativos</span>
        </nav>

        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <span className="fohat-eyebrow">Frente digital · FOHAT</span>
            <h1 className="fohat-h1 mt-6 max-w-[820px] text-navy [font-size:clamp(2.25rem,4.6vw,4.5rem)]">
              <TextReveal
                as="span"
                text={"Sistemas e aplicativos\ndesenvolvidos para"}
                stagger={110}
              />
              <span className="mt-2 block text-blue">
                <TextReveal
                  as="span"
                  text="colocar ideias e operações em funcionamento."
                  delay={260}
                />
              </span>
            </h1>
            <p className="fohat-lead mt-8 max-w-[560px]">
              A FOHAT desenvolve soluções digitais sob medida para empresas,
              projetos, eventos e operações que precisam organizar processos,
              conectar informações e criar novas formas de interação.
            </p>
            <SectionReveal delay={160} className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/"
                hash="contato"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-navy px-7 text-sm font-bold text-white shadow-[var(--shadow-cta)] transition-transform hover:-translate-y-0.5 hover:bg-blue"
              >
                Conte o sistema que você precisa desenvolver
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <InnerCTA to="/sistemas-e-aplicativos" hash="capacidades" variant="ghost">
                Ver capacidades
              </InnerCTA>
            </SectionReveal>
          </div>

          {/* Composição procedural: janelas de produto + fluxos */}
          <SectionReveal delay={140} className="relative">
            <div className="relative mx-auto aspect-[5/4] w-full max-w-[560px]">
              <div className="fohat-mono absolute -top-3 left-4 z-10 rounded-full bg-navy px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white">
                Representação visual
              </div>

              {/* janela principal — dashboard */}
              <div className="absolute inset-[2%_10%_10%_2%] overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-elegant)]">
                <div className="flex items-center gap-1.5 border-b border-line bg-mist px-4 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="fohat-mono ml-3 text-[9px] uppercase tracking-[0.2em] text-steel">
                    operacional / conectado
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 p-4">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="rounded-lg bg-ice/60 p-3">
                      <div className="h-1.5 w-8 rounded-full bg-blue/60" />
                      <div className="mt-2 h-3 w-14 rounded bg-navy/80" />
                      <div className="mt-1 h-1.5 w-10 rounded-full bg-steel/40" />
                    </div>
                  ))}
                </div>
                <div className="px-4 pb-4">
                  <svg viewBox="0 0 300 80" aria-hidden className="h-16 w-full">
                    <polyline
                      points="0,60 40,50 80,55 120,35 160,42 200,20 240,28 300,12"
                      fill="none"
                      stroke="oklch(0.46 0.055 253)"
                      strokeWidth="1.5"
                    />
                    <polyline
                      points="0,70 40,66 80,68 120,58 160,60 200,50 240,52 300,42"
                      fill="none"
                      stroke="oklch(0.85 0.055 245)"
                      strokeWidth="1.2"
                    />
                  </svg>
                </div>
              </div>

              {/* app mobile */}
              <div className="absolute bottom-[2%] right-[2%] w-[38%] overflow-hidden rounded-[24px] border border-line bg-white shadow-[var(--shadow-card)]">
                <div className="border-b border-line bg-navy px-3 py-2">
                  <div className="mx-auto h-1 w-8 rounded-full bg-white/40" />
                </div>
                <div className="space-y-2 p-3">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-2 rounded-md bg-mist p-2">
                      <div className="h-6 w-6 rounded-md bg-blue/30" />
                      <div className="flex-1 space-y-1">
                        <div className="h-1.5 w-3/4 rounded-full bg-navy/80" />
                        <div className="h-1 w-1/2 rounded-full bg-steel/50" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* estado / integração ativa flutuante */}
              <div className="fohat-mono absolute left-[6%] bottom-[12%] flex items-center gap-2 rounded-full border border-blue/30 bg-white px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-blue shadow-[var(--shadow-card)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue" />
                integração ativa
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
