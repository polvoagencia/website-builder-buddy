import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { HOME_ACTIVATION } from "@/data/home-content";
import { FohatCoreVisual } from "./FohatCoreVisual";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";

/**
 * Segundo ato — a tecnologia entra no mundo.
 * O núcleo se abre à medida que a seção é rolada.
 */
export function WorldActivation() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opennessMv = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);
  const openness = reduce ? 0.6 : opennessMv;

  return (
    <section id="ativacao" ref={ref} className="relative overflow-hidden bg-white py-28 lg:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-50" />

      <div className="fohat-shell relative grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-24">
        <div className="order-2 lg:order-1">
          <SectionReveal>
            <span className="fohat-eyebrow">{HOME_ACTIVATION.eyebrow}</span>
            <h2
              className="mt-6 font-bold text-navy"
              style={{
                fontSize: "clamp(2rem, 4.2vw, 3.75rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.045em",
              }}
            >
              {HOME_ACTIVATION.title.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="fohat-lead mt-6 max-w-[520px]">{HOME_ACTIVATION.lead}</p>

            <ol className="fohat-mono mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.22em] text-blue">
              {HOME_ACTIVATION.arc.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span>{step}</span>
                  {i < HOME_ACTIVATION.arc.length - 1 && (
                    <span aria-hidden className="text-steel">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </SectionReveal>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            <motion.div
              className="absolute inset-0"
              style={{
                // openness pode ser number (reduced) ou MotionValue
                opacity: 1,
              }}
            >
              <FohatCoreVisual state="sistemas" openness={reduce ? 0.6 : undefined} />
            </motion.div>
            {/* Núcleo animado sobreposto — recebe MotionValue como prop numérica
                via componente motion.div em torno; para simplicidade, usamos
                dois estados: reduce estático, senão wrapper com key para
                forçar re-render conforme progress. */}
            {!reduce && (
              <motion.div className="absolute inset-0" style={{ opacity: opennessMv }}>
                <FohatCoreVisual state="infraestrutura" openness={0.9} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
