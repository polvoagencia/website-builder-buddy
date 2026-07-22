import { Reveal } from "@/components/fohat/Reveal";
import { RENTAL_PROCESS } from "@/data/rental-content";

/**
 * Linha operacional em cinco etapas.
 * Desktop: pipeline horizontal com conectores. Mobile: timeline vertical.
 * Movimento apenas via reveal escalonado — sem parallax nem sticky longo.
 */
export function RentalProcess() {
  return (
    <section id="processo" className="relative overflow-hidden bg-navy py-20 text-white lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-60"
      />

      <div className="fohat-shell relative">
        <Reveal className="max-w-[880px]">
          <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
            Como funciona
          </span>
          <h2 className="fohat-h2 mt-5 text-white">Da demanda à operação em campo</h2>
        </Reveal>

        {/* Desktop pipeline */}
        <ol
          aria-label="Etapas do processo de locação"
          className="mt-14 hidden lg:grid lg:grid-cols-5 lg:gap-4"
        >
          {RENTAL_PROCESS.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 100} className="relative">
              {/* conector */}
              {i < RENTAL_PROCESS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-6 left-[calc(50%+18px)] right-[calc(-50%+18px)] h-px bg-gradient-to-r from-cyan/60 to-cyan/10"
                />
              )}
              <div className="flex flex-col items-start">
                <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-cyan/50 bg-navy">
                  <span className="fohat-mono text-[11px] tabular-nums text-cyan">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <span className="fohat-mono mt-4 text-[10px] uppercase tracking-[0.2em] text-cyan/80">
                  {step.keyword}
                </span>
                <h3 className="mt-2 text-base font-bold tracking-tight text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-[oklch(0.82_0.02_250)]">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* Mobile/tablet timeline */}
        <ol aria-label="Etapas do processo de locação" className="mt-14 lg:hidden">
          {RENTAL_PROCESS.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 60}
              className="relative flex gap-4 pb-8 last:pb-0"
            >
              <div className="flex flex-col items-center">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cyan/50 bg-navy">
                  <span className="fohat-mono text-[11px] tabular-nums text-cyan">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                {i < RENTAL_PROCESS.length - 1 && (
                  <span
                    aria-hidden
                    className="mt-2 w-px flex-1 bg-gradient-to-b from-cyan/50 to-cyan/10"
                  />
                )}
              </div>
              <div className="flex-1 pb-2">
                <span className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-cyan/80">
                  {step.keyword}
                </span>
                <h3 className="mt-1 text-base font-bold tracking-tight text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-[oklch(0.82_0.02_250)]">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
