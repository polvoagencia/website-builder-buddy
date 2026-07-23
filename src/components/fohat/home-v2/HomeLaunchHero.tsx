import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ArrowDown } from "lucide-react";

import { HOME_HERO } from "@/data/home-content";
import { ContactDialog } from "@/components/fohat/ContactDialog";
import { FohatCoreVisual } from "./FohatCoreVisual";

/**
 * Hero monumental — abertura cinematográfica em camadas.
 * Não reutiliza HeroLayered. Sem tabs, sem fotografias, sem carrossel.
 */
export function HomeLaunchHero() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(reduce ?? false);

  useEffect(() => {
    // Sequência de entrada dispara após primeiro paint.
    const t = window.setTimeout(() => setReady(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  const handleSecondary = () => {
    const el = document.getElementById(HOME_HERO.secondaryCta.targetId);
    el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      className="relative isolate overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 20% 15%, oklch(0.30 0.04 250), transparent 60%), radial-gradient(ellipse 70% 60% at 100% 100%, oklch(0.46 0.055 253 / 0.35), transparent 60%), linear-gradient(180deg, oklch(0.18 0.023 250), oklch(0.22 0.023 250))",
        color: "white",
      }}
    >
      <div aria-hidden className="absolute inset-0 fohat-grid-bg-dark opacity-50" />

      <div className="fohat-shell relative grid min-h-[92vh] items-center gap-10 pt-32 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-40 lg:pb-28">
        {/* Coluna texto */}
        <div className="relative z-10 max-w-[720px]">
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
            className="fohat-mono text-[11px] uppercase tracking-[0.24em]"
            style={{ color: "var(--color-cyan)" }}
          >
            {HOME_HERO.eyebrow}
          </motion.span>

          <h1
            className="mt-6 font-bold tracking-[-0.055em] text-white"
            style={{
              fontSize: "clamp(2.75rem, 7.4vw, 6.75rem)",
              lineHeight: 0.95,
            }}
          >
            {HOME_HERO.titleLines.map((line, i) => (
              <motion.span
                key={i}
                className="block"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={ready ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 1, ease, delay: 0.35 + i * 0.18 }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, ease, delay: 0.85 }}
            className="mt-8 max-w-[560px] text-lg leading-relaxed lg:text-xl"
            style={{ color: "oklch(0.88 0.02 250)" }}
          >
            {HOME_HERO.lead}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, ease, delay: 1.05 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <ContactDialog sourcePage="/" sourceCta={HOME_HERO.primaryCta.label}>
              <button className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-navy transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cyan">
                {HOME_HERO.primaryCta.label}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </ContactDialog>
            <button
              type="button"
              onClick={handleSecondary}
              className="inline-flex h-14 items-center gap-2 rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5"
            >
              {HOME_HERO.secondaryCta.label}
            </button>
          </motion.div>
        </div>

        {/* Coluna núcleo visual */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.4, ease, delay: 0.55 }}
          className="relative mx-auto aspect-square w-full max-w-[560px] lg:mx-0"
        >
          <FohatCoreVisual
            state="presenca"
            ariaLabel="Núcleo FOHAT — camadas de presença, dados e infraestrutura conectadas"
          />
        </motion.div>
      </div>

      {/* Convite para rolar */}
      {!reduce && (
        <motion.button
          type="button"
          onClick={handleSecondary}
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="fohat-mono absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-white/70 hover:text-white lg:inline-flex"
          aria-label="Rolar para a próxima seção"
        >
          Rolar
          <ArrowDown className="h-3 w-3" />
        </motion.button>
      )}
    </section>
  );
}
