import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { FORMULA } from "@/data/engineering-presence";

/**
 * Diagrama conectado da Fórmula da Engenharia de Presença.
 * Desktop: coluna sticky com stack vertical + linha central que
 * preenche conforme o scroll. Mobile: sequência vertical simples.
 */
export function PresenceFormula() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawFill = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);
  const fill = reduce ? 1 : rawFill;

  return (
    <section
      id="formula"
      aria-labelledby="formula-heading"
      className="relative overflow-hidden bg-mist py-24 lg:py-32"
    >
      <div className="fohat-shell">
        <SectionReveal className="mb-16 max-w-[820px]">
          <span className="fohat-eyebrow">Fórmula</span>
          <h2 id="formula-heading" className="fohat-h2 mt-5">
            Cada etapa alimenta a próxima.
          </h2>
          <p className="fohat-lead mt-5">
            A engenharia por trás da presença é uma cadeia — não um cardápio.
            O que entra no início determina o que permanece no fim.
          </p>
        </SectionReveal>

        <div ref={ref} className="relative mx-auto max-w-[860px]">
          {/* linha central */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-6 top-4 bottom-4 w-px bg-line md:left-1/2 md:-translate-x-1/2"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: fill, transformOrigin: "top" }}
            className="pointer-events-none absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-blue via-blue to-cyan md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="relative space-y-14">
            {FORMULA.map((f, i) => (
              <li key={f.label} className="relative pl-16 md:grid md:grid-cols-2 md:gap-12 md:pl-0">
                {/* nó */}
                <span
                  aria-hidden
                  className="absolute left-2 top-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue/40 bg-white shadow-[var(--shadow-card)] md:left-1/2 md:-translate-x-1/2"
                >
                  <span className="fohat-mono text-[10px] font-bold text-blue">
                    0{i + 1}
                  </span>
                </span>

                <SectionReveal
                  delay={i * 60}
                  className={
                    i % 2 === 0
                      ? "md:col-start-1 md:pr-12 md:text-right"
                      : "md:col-start-2 md:pl-12"
                  }
                >
                  <div className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-blue">
                    {f.label}
                  </div>
                  <div className="mt-2 text-2xl font-bold tracking-tight">
                    {f.value}
                  </div>
                  <p className="mt-2 max-w-md text-sm text-muted-foreground md:ml-auto">
                    {f.desc}
                  </p>
                </SectionReveal>

                {/* espaço espelhado no lado oposto (desktop) */}
                <div aria-hidden className="hidden md:block" />
              </li>
            ))}
          </ol>

          {/* fechamento */}
          <SectionReveal
            delay={80}
            className="relative mt-16 rounded-2xl border border-blue/20 bg-white/70 p-6 text-center backdrop-blur-sm"
          >
            <div className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-blue">
              Resultado
            </div>
            <p className="mt-2 text-lg font-bold tracking-tight text-navy">
              A experiência permanece depois que a interação termina.
            </p>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
