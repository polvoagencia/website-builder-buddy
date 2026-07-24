import { motion } from "motion/react";
import { CountUp } from "./primitives/CountUp";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Chapter 2 — The numbers.
 *
 * Four punchy stats acting as a "proof strip" between the hero and the
 * long-form storytelling. Each number counts up when it enters the
 * viewport. Numbers below are safe placeholders — swap for real figures
 * before shipping (see NOTES on values marked TODO).
 */

interface Stat {
  /** The number to count up to */
  value: number;
  /** Show a plus after the number (e.g., 12+) */
  plus?: boolean;
  /** Number decimals shown while counting (default 0) */
  decimals?: number;
  /** Optional prefix (currency, etc.) */
  prefix?: string;
  /** Optional suffix (%, k, anos) */
  suffix?: string;
  /** Short line under the number */
  label: string;
  /** Optional caveat / secondary line */
  caption?: string;
  /** Mark placeholder values so they're easy to find */
  todo?: boolean;
}

const STATS: Stat[] = [
  { value: 3, label: "Frentes de contratação", caption: "Presença · Software · Infraestrutura" },
  { value: 6, label: "Capitais atendidas", caption: "Presença nacional em operação", todo: true },
  { value: 12, plus: true, suffix: "", label: "Anos de operação", caption: "Do conceito à entrega", todo: true },
  { value: 100, suffix: "%", label: "Projetos entregues", caption: "Com suporte técnico próprio", todo: true },
];

export function Numbers() {
  const reduce = useReducedMotion();

  return (
    <section
      id="numeros"
      className="relative overflow-hidden bg-mist py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="fohat-grid-bg pointer-events-none absolute inset-0 opacity-60"
      />

      <div className="fohat-shell relative">
        <div className="mb-14 flex flex-col items-start gap-4 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="fohat-eyebrow">A engenharia por trás</span>
            <h2 className="fohat-h2 mt-5 max-w-[720px]">
              Uma operação que sai do plano e entra em funcionamento.
            </h2>
          </div>
          <p className="max-w-[420px] text-muted-foreground">
            Números que descrevem, em quatro leituras, o que uma parceria com a
            FOHAT costuma envolver.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex flex-col justify-between gap-8 bg-white p-8 lg:p-10"
            >
              <span className="fohat-mono text-[10px] uppercase tracking-[0.24em] text-blue">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div>
                <div
                  className="fohat-h1 flex items-baseline text-navy"
                  style={{
                    fontSize: "clamp(3.5rem, 6.5vw, 5.5rem)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.05em",
                  }}
                >
                  {s.prefix && (
                    <span className="mr-1 text-[0.55em] text-blue">
                      {s.prefix}
                    </span>
                  )}
                  <CountUp
                    value={s.value}
                    decimals={s.decimals}
                    plus={s.plus}
                  />
                  {s.suffix && (
                    <span className="ml-1 text-[0.55em] text-blue">
                      {s.suffix}
                    </span>
                  )}
                </div>

                <div className="mt-5 space-y-1">
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-navy">
                    {s.label}
                  </p>
                  {s.caption && (
                    <p className="text-sm text-muted-foreground">{s.caption}</p>
                  )}
                </div>

                {s.todo && (
                  <span
                    aria-hidden
                    title="TODO: substituir por valor real"
                    className="fohat-mono absolute right-4 top-4 rounded-full border border-orange-400/40 bg-orange-50 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-orange-600"
                  >
                    editar
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <p className="fohat-mono mt-8 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          → Substitua os valores marcados como <span className="text-orange-600">EDITAR</span> pelos números reais da agência antes de publicar.
        </p>
      </div>
    </section>
  );
}
