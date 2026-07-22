import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";

import { HOME_FRONTS, type HomeFront } from "@/data/home-content";
import { FohatCoreVisual } from "./FohatCoreVisual";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * As três frentes como sequência de três cenas.
 * Desktop: coluna esquerda sticky com o núcleo mudando de estado,
 *          coluna direita rolando pelas frentes.
 * Mobile:  três capítulos verticais completos, sem sticky.
 * Sem tabs, sem carrossel.
 */
export function HomeFrontsStory() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const indexMv = useTransform(scrollYProgress, (v) =>
    Math.min(HOME_FRONTS.length - 1, Math.max(0, Math.floor(v * HOME_FRONTS.length))),
  );

  useMotionValueEvent(indexMv, "change", (v) => {
    if (typeof v === "number") setActive(v);
  });

  return (
    <section id="frentes" className="relative bg-mist">
      {/* Cabeçalho */}
      <div className="fohat-shell pt-24 lg:pt-32">
        <SectionReveal className="max-w-[820px]">
          <span className="fohat-eyebrow">Três frentes complementares</span>
          <h2 className="fohat-h2 mt-5">
            Uma capacidade, três caminhos para entrar em operação.
          </h2>
        </SectionReveal>
      </div>

      {/* DESKTOP — sticky */}
      <div ref={ref} className="fohat-shell mt-16 hidden lg:block">
        <div className="grid grid-cols-[1fr_1.05fr] gap-20">
          {/* Visual sticky */}
          <div className="relative">
            <div className="sticky top-28">
              <div className="relative aspect-square w-full max-w-[520px] overflow-hidden rounded-[36px] border border-line bg-navy">
                {HOME_FRONTS.map((f, i) => (
                  <div
                    key={f.state}
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{ opacity: active === i ? 1 : 0 }}
                    aria-hidden={active !== i}
                  >
                    <FohatCoreVisual state={f.state} openness={0.5} />
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3">
                {HOME_FRONTS.map((f, i) => (
                  <span
                    key={f.id}
                    className={`h-[3px] flex-1 rounded-full transition-colors ${
                      active === i ? "bg-navy" : "bg-line"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Capítulos */}
          <div className="flex flex-col">
            {HOME_FRONTS.map((f) => (
              <FrontChapter key={f.id} front={f} />
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE / TABLET — sequencial */}
      <div className="fohat-shell mt-12 flex flex-col gap-16 pb-16 lg:hidden">
        {HOME_FRONTS.map((f) => (
          <SectionReveal key={f.id} as="article" className="flex flex-col gap-8">
            <div className="relative mx-auto aspect-square w-full max-w-[380px]">
              <FohatCoreVisual state={f.state} openness={reduce ? 0.5 : 0.4} />
            </div>
            <FrontCopy front={f} />
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}

function FrontChapter({ front }: { front: HomeFront }) {
  return (
    <article className="flex min-h-[85vh] flex-col justify-center py-16">
      <FrontCopy front={front} />
    </article>
  );
}

function FrontCopy({ front }: { front: HomeFront }) {
  return (
    <div>
      <span className="fohat-mono text-[11px] uppercase tracking-[0.24em] text-blue">
        Frente {front.index}
      </span>
      <h3
        className="mt-4 font-bold tracking-[-0.045em] text-navy"
        style={{ fontSize: "clamp(1.75rem, 3.4vw, 3rem)", lineHeight: 1.05 }}
      >
        {front.titleLines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h3>
      <p className="mt-5 max-w-[520px] text-lg text-muted-foreground">{front.lead}</p>
      <Link
        to={front.cta.to}
        className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-navy px-6 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 hover:bg-blue"
      >
        {front.cta.label}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </div>
  );
}
