import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const STEPS = [
  { title: "Entendimento", desc: "Problema, usuários e contexto operacional." },
  { title: "Arquitetura", desc: "Stack, dados, integrações e caminhos de evolução." },
  { title: "Desenvolvimento", desc: "Ciclos curtos com validação contínua." },
  { title: "Operação", desc: "Produção com monitoramento, suporte e evolução." },
];

/**
 * Pipeline horizontal de desenvolvimento com linha animada pelo scroll.
 * Mobile: timeline vertical, sem animação complexa.
 */
export function ProductPipeline() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0.2, 0.9], [0, 1]);
  const fill = reduce ? 1 : raw;

  return (
    <section
      id="processo"
      aria-labelledby="processo-heading"
      className="relative overflow-hidden bg-white py-24 lg:py-32"
    >
      <div className="fohat-shell">
        <SectionReveal className="mb-16 max-w-[820px]">
          <span className="fohat-eyebrow">Processo</span>
          <h2 id="processo-heading" className="fohat-h2 mt-5">
            Um caminho técnico transparente, do problema à operação.
          </h2>
        </SectionReveal>

        {/* Desktop: pipeline horizontal */}
        <div ref={ref} className="relative hidden md:block">
          <div aria-hidden className="absolute left-0 right-0 top-[46px] h-px bg-line" />
          <motion.div
            aria-hidden
            style={{ scaleX: fill, transformOrigin: "left" }}
            className="absolute left-0 right-0 top-[46px] h-px bg-gradient-to-r from-blue to-cyan"
          />
          <ol className="grid grid-cols-4 gap-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative">
                <div className="relative flex flex-col items-start">
                  <span
                    aria-hidden
                    className="mb-2 flex h-[46px] items-center justify-center"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-blue bg-white text-[10px] font-bold text-blue">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <div className="mt-4 rounded-2xl border border-line bg-mist p-5">
                    <div className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-blue">
                      Etapa {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-2 text-lg font-bold tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile: timeline vertical */}
        <ol className="space-y-4 md:hidden">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="relative rounded-2xl border border-line bg-mist p-5"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue bg-white text-xs font-bold text-blue">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
