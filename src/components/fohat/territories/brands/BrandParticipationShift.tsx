import { BRANDS } from "@/data/presence-territories-content";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";

/**
 * Marcas · Desafio — contraste visual entre "vista" e "vivida".
 * Tela dividida: estado passivo (silêncio, texto estático) → estado ativo
 * (partículas, movimento sutil). Sem QuoteBand.
 */
export function BrandParticipationShift() {
  const { passive, active } = BRANDS.challenge;
  return (
    <section
      id="desafio"
      aria-labelledby="brands-shift-title"
      className="relative overflow-hidden bg-white py-24 lg:py-32"
    >
      <h2 id="brands-shift-title" className="sr-only">
        Desafio de marcas: da mensagem vista à experiência vivida
      </h2>
      <div className="fohat-shell grid gap-px overflow-hidden rounded-[32px] border border-line md:grid-cols-2">
        {/* Estado passivo */}
        <SectionReveal className="relative bg-mist p-10 md:p-14">
          <span className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-steel">
            01 · Antes
          </span>
          <p className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.03em] text-navy/60 md:text-3xl">
            {passive}
          </p>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-10 bottom-8 h-px bg-navy/15"
          />
          <div className="fohat-mono absolute right-6 bottom-6 text-[10px] uppercase tracking-[0.18em] text-steel">
            estático · unilateral
          </div>
        </SectionReveal>

        {/* Estado ativo */}
        <SectionReveal
          delay={140}
          className="relative overflow-hidden bg-navy p-10 text-white md:p-14"
        >
          <div aria-hidden className="absolute inset-0 fohat-grid-bg-dark opacity-60" />
          <svg
            aria-hidden
            viewBox="0 0 400 300"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
          >
            {Array.from({ length: 20 }).map((_, i) => {
              const x = (i * 53) % 400;
              const y = (i * 37) % 300;
              return (
                <circle key={i} cx={x} cy={y} r="1.5" fill="oklch(0.85 0.055 245)">
                  <animate
                    attributeName="opacity"
                    values="0.2;1;0.2"
                    dur={`${2 + (i % 5)}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              );
            })}
          </svg>
          <span className="fohat-mono relative text-[10px] uppercase tracking-[0.22em] text-cyan">
            02 · Depois
          </span>
          <p className="relative mt-5 text-2xl font-semibold leading-tight tracking-[-0.03em] text-white md:text-3xl">
            {active}
          </p>
          <div className="fohat-mono absolute right-6 bottom-6 text-[10px] uppercase tracking-[0.18em] text-cyan">
            participativo · relacional
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
