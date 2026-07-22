import { BRANDS } from "@/data/presence-territories-content";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";

/**
 * Marcas · Jornada — Intenção → Narrativa → Tecnologia → Memória
 * Circuito em loop que retorna à marca como memória, conteúdo ou relacionamento.
 */
export function BrandEngagementJourney() {
  const { message, steps } = BRANDS.journey;
  return (
    <section
      id="jornada"
      aria-labelledby="brands-journey-title"
      className="relative overflow-hidden bg-navy py-24 text-white lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-60"
      />
      <div className="fohat-shell relative">
        <SectionReveal className="max-w-[820px]">
          <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
            Jornada
          </span>
          <h2 id="brands-journey-title" className="fohat-h2 mt-5 text-white">
            {message}
          </h2>
        </SectionReveal>

        <ol
          aria-label="Etapas da jornada de participação"
          className="mt-14 grid gap-6 lg:grid-cols-4"
        >
          {steps.map((s, i) => (
            <SectionReveal
              key={s.title}
              as="li"
              delay={i * 90}
              className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                  Etapa {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="fohat-mono text-[10px] text-cyan/50">
                  {i === steps.length - 1 ? "↺" : "→"}
                </span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white">{s.title}</h3>
              <p className="mt-3 text-sm text-[oklch(0.82_0.02_250)]">{s.desc}</p>
            </SectionReveal>
          ))}
        </ol>

        {/* Loop de retorno */}
        <div className="mt-10 flex items-center gap-3 text-sm text-cyan">
          <span aria-hidden className="h-px flex-1 bg-cyan/30" />
          <span className="fohat-mono text-[11px] uppercase tracking-[0.22em]">
            Memória retorna à marca como conteúdo e relacionamento
          </span>
          <span aria-hidden className="h-px flex-1 bg-cyan/30" />
        </div>
      </div>
    </section>
  );
}
