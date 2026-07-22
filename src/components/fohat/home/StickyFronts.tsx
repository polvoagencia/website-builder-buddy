import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

import portalAsset from "@/assets/portal.jpg.asset.json";
import labAsset from "@/assets/lab.jpg.asset.json";
import heroAsset from "@/assets/hero.jpg.asset.json";

import { SERVICES } from "@/data/fohat-services";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { cn } from "@/lib/utils";

/**
 * Três frentes — apresentação sticky no desktop, sequencial no mobile.
 *
 * Desktop (>= lg): coluna esquerda com mídia sticky que troca conforme
 *   a coluna direita rola pelas três frentes. motion/react + useScroll
 *   dirigem opacidade/escala das mídias com base no progresso.
 *
 * Mobile: cada frente é uma seção completa, cinemática mas leve.
 *   Nenhum scroll listener extra, só IntersectionObserver via SectionReveal.
 *
 * prefers-reduced-motion: mídias ficam estáticas na primeira frente e
 *   a coluna direita continua rolando normalmente; sem transformações.
 */

const FRENTES = [
  { slug: "engenharia-de-presenca", media: portalAsset.url },
  { slug: "sistemas-e-aplicativos", media: labAsset.url },
  { slug: "locacao-de-equipamentos", media: heroAsset.url },
] as const;

function StickyMedia({
  progress,
  index,
  total,
  reduce,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  reduce: boolean;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;

  // Hooks chamados incondicionalmente; valor final é ignorado se reduce=true.
  const opacityMv = useTransform(
    progress,
    [start, mid, end],
    [index === 0 ? 1 : 0, 1, index === total - 1 ? 1 : 0],
  );
  const scaleMv = useTransform(progress, [start, end], [1.06, 1]);

  const f = FRENTES[index];
  const service = SERVICES.find((s) => s.slug === f.slug)!;

  return (
    <motion.div
      style={{
        opacity: reduce ? (index === 0 ? 1 : 0) : opacityMv,
        scale: reduce ? 1 : scaleMv,
      }}
      className="absolute inset-0"
      aria-hidden={index !== 0}
    >
      <img
        src={f.media}
        alt={service.title}
        className="h-full w-full object-cover"
        style={{ filter: "saturate(0.82) contrast(1.06)" }}
        loading="lazy"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 40%, oklch(0.22 0.023 250 / 0.75))",
        }}
      />
      <div className="absolute inset-x-8 bottom-8 text-white">
        <span className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-cyan">
          Frente {String(index + 1).padStart(2, "0")}
        </span>
        <div className="mt-2 text-3xl font-bold leading-tight tracking-tight">
          {service.title}
        </div>
      </div>
    </motion.div>
  );
}

export function StickyFronts() {
  const reduce = useReducedMotion();
  const stickyRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="frentes" className="relative bg-white">
      {/* CABEÇALHO DA SEÇÃO */}
      <div className="fohat-shell pt-24 lg:pt-32">
        <SectionReveal className="max-w-[860px]">
          <span className="fohat-eyebrow">Como podemos atuar</span>
          <h2 className="fohat-h2 mt-5">
            Três caminhos para colocar tecnologia em funcionamento.
          </h2>
          <p className="fohat-lead mt-5">
            A FOHAT pode ser contratada por qualquer uma destas frentes —
            separadamente ou combinadas dentro de um mesmo projeto.
          </p>
        </SectionReveal>
      </div>

      {/* DESKTOP — sticky duplo */}
      <div ref={stickyRef} className="fohat-shell mt-14 hidden lg:block">
        <div className="grid grid-cols-[1fr_1.1fr] gap-16">
          {/* Coluna sticky (mídia + label da frente ativa) */}
          <div className="relative">
            <div className="sticky top-28 aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-[36px] border border-line bg-navy shadow-[var(--shadow-elegant)]">
              {FRENTES.map((_, i) => (
                <StickyMedia
                  key={i}
                  progress={scrollYProgress}
                  index={i}
                  total={FRENTES.length}
                  reduce={reduce}
                />
              ))}

              {/* Barra de progresso vertical */}
              {!reduce && (
                <div
                  aria-hidden
                  className="absolute right-4 top-4 h-24 w-[3px] overflow-hidden rounded-full bg-white/25"
                >
                  <motion.div
                    className="h-full w-full origin-top rounded-full bg-cyan"
                    style={{ scaleY: scrollYProgress }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Coluna scroll — cards das frentes */}
          <div className="flex flex-col gap-24 py-10">
            {SERVICES.map((s, i) => (
              <SectionReveal
                as="article"
                key={s.slug}
                className="min-h-[70vh]"
                offset={40}
              >
                <span className="fohat-mono text-[11px] uppercase tracking-[0.24em] text-blue">
                  Frente {String(i + 1).padStart(2, "0")} · {s.eyebrow}
                </span>
                <h3 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-navy">
                  {s.title}
                </h3>
                <p className="fohat-lead mt-5 max-w-[520px]">{s.lead}</p>

                <ul className="mt-7 flex flex-wrap gap-2">
                  {s.possibilities.map((p) => (
                    <li
                      key={p}
                      className="fohat-mono rounded-full border border-line px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-blue"
                    >
                      {p}
                    </li>
                  ))}
                </ul>

                <Link
                  to={s.cta.to}
                  hash={s.cta.hash}
                  className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-navy px-6 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 hover:bg-blue"
                >
                  {s.cta.label}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE / TABLET — sequencial */}
      <div className="fohat-shell mt-10 flex flex-col gap-12 pb-16 lg:hidden">
        {SERVICES.map((s, i) => {
          const media = FRENTES.find((f) => f.slug === s.slug)!.media;
          const highlighted = s.slug === "engenharia-de-presenca";
          return (
            <SectionReveal
              as="article"
              key={s.slug}
              className={cn(
                "overflow-hidden rounded-[28px] border",
                highlighted
                  ? "border-navy/20 bg-navy text-white"
                  : "border-line bg-white",
              )}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={media}
                  alt={s.title}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-cover"
                  style={{ filter: "saturate(0.85) contrast(1.05)" }}
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: highlighted
                      ? "linear-gradient(180deg, oklch(0.22 0.023 250 / 0.1), oklch(0.22 0.023 250 / 0.8))"
                      : "linear-gradient(180deg, transparent 55%, oklch(0.22 0.023 250 / 0.35))",
                  }}
                />
                <span
                  className={cn(
                    "fohat-mono absolute left-4 top-4 rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] backdrop-blur-md",
                    highlighted
                      ? "border-white/40 bg-black/25 text-white"
                      : "border-white/60 bg-black/25 text-white",
                  )}
                >
                  Frente {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-col gap-5 p-7">
                <div>
                  <span
                    className={cn(
                      "fohat-mono text-[10px] uppercase tracking-[0.2em]",
                      highlighted ? "text-cyan" : "text-blue",
                    )}
                  >
                    {s.eyebrow}
                  </span>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight">
                    {s.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 text-base",
                      highlighted
                        ? "text-[oklch(0.85_0.02_250)]"
                        : "text-muted-foreground",
                    )}
                  >
                    {s.lead}
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {s.possibilities.map((p) => (
                    <li
                      key={p}
                      className={cn(
                        "fohat-mono rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.14em]",
                        highlighted
                          ? "border-white/25 text-white/80"
                          : "border-line text-blue",
                      )}
                    >
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  to={s.cta.to}
                  hash={s.cta.hash}
                  className={cn(
                    "group inline-flex h-12 w-fit items-center gap-2 rounded-full px-5 text-sm font-bold transition-transform hover:-translate-y-0.5",
                    highlighted
                      ? "bg-white text-navy hover:bg-cyan"
                      : "bg-navy text-primary-foreground hover:bg-blue",
                  )}
                >
                  {s.cta.label}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </SectionReveal>
          );
        })}
      </div>
    </section>
  );
}
