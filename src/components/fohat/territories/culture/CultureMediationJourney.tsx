import { CULTURE } from "@/data/presence-territories-content";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";

/**
 * Cultura · Mediação — aproximação gradual entre conteúdo, mediação,
 * visitante e vínculo. Linhas suaves, sem animação rápida.
 */
export function CultureMediationJourney() {
  const { message, steps } = CULTURE.mediation;
  const flow = ["Conteúdo", ...steps.map((s) => s.title)];

  return (
    <section
      id="mediacao"
      aria-labelledby="culture-mediation-title"
      className="relative overflow-hidden bg-navy py-24 text-white lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-50"
      />
      <div className="fohat-shell relative">
        <SectionReveal className="max-w-[820px]">
          <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
            Mediação
          </span>
          <h2 id="culture-mediation-title" className="fohat-h2 mt-5 text-white">
            {message}
          </h2>
        </SectionReveal>

        {/* Fluxo de aproximação */}
        <SectionReveal delay={140} className="mt-16 overflow-x-auto">
          <div className="min-w-[720px]">
            <div className="relative flex items-center justify-between">
              {flow.map((label, i) => (
                <div key={label} className="relative flex flex-col items-center">
                  <div
                    className="h-3 w-3 rounded-full border border-cyan/70 bg-navy"
                    style={{ boxShadow: "0 0 24px oklch(0.85 0.055 245 / 0.35)" }}
                  />
                  <div className="fohat-mono mt-4 whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-cyan/90">
                    {String(i).padStart(2, "0")}
                  </div>
                  <div className="mt-1 whitespace-nowrap text-sm font-bold text-white">{label}</div>
                </div>
              ))}
              <div
                aria-hidden
                className="absolute left-2 right-2 top-1.5 -z-0 h-px bg-gradient-to-r from-cyan/40 via-cyan/70 to-cyan/40"
              />
            </div>
          </div>
        </SectionReveal>

        {/* Detalhamento das quatro etapas */}
        <ol className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <SectionReveal
              key={s.title}
              as="li"
              delay={i * 100}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
            >
              <span className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-cyan">
                {String(i + 1).padStart(2, "0")} · {s.title}
              </span>
              <p className="mt-4 text-sm text-[oklch(0.82_0.02_250)]">{s.desc}</p>
            </SectionReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
