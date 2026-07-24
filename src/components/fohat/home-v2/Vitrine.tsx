import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

import { RentalEquipmentCard } from "@/components/fohat/RentalEquipmentCard";
import { RENTAL_CATALOG_ITEMS } from "@/data/rental-equipment";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Magnetic } from "@/components/fohat/home-v2/primitives/Magnetic";


/**
 * Chapter 5 — The Vitrine (horizontal scroll).
 *
 * A tall wrapper contains a 100vh sticky viewport. Vertical scroll drives
 * horizontal card motion (translateX). Classic Apple product-page trick
 * — turns the section into a "scroller within a scroller" and lets the
 * user experience the catalog as a filmstrip rather than a static grid.
 *
 * On mobile, the section falls back to a snap-x carousel because pinning
 * horizontal scroll on touch conflicts with native gestures.
 */
export function Vitrine() {
  const reduce = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const items = RENTAL_CATALOG_ITEMS.filter((it) => it.featured);
  const total = items.length;

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Move the strip by (total - visibleColumns) * 100% relative to the
  // container width. We assume ~2 cards visible at once on desktop.
  const visible = 2.1;
  const translate = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((total - visible) / total) * 100}%`],
  );

  return (
    <section id="locacao" className="relative bg-mist">
      {/* Header block */}
      <div className="fohat-shell pb-10 pt-16 lg:pb-12 lg:pt-20">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="fohat-eyebrow">Frente 03 · Vitrine</span>
            <h2 className="fohat-h2 mt-5 max-w-[720px]">
              Uma amostra da infraestrutura disponível.
            </h2>
          </div>
          <p className="max-w-[440px] text-muted-foreground">
            Equipamentos, quantidades, logística e suporte são confirmados
            conforme a necessidade de cada projeto.
          </p>
        </div>
      </div>

      {/* DESKTOP — pinned horizontal filmstrip */}
      <div
        ref={wrapperRef}
        className="relative hidden lg:block"
        style={{ height: `${total * 42}vh` }}
      >
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-mist to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-mist to-transparent" />

          <motion.div
            className="flex gap-6 pl-[calc((100vw-1240px)/2+24px)] pr-[calc((100vw-1240px)/2+24px)]"
            style={{
              x: reduce ? "0%" : translate,
              width: `${total * (100 / visible)}%`,
            }}
          >
            {items.map((item, i) => (
              <VitrineCard key={item.slug} item={item} index={i} total={total} />
            ))}
          </motion.div>

          {/* Progress + counter overlay */}
          <div className="absolute inset-x-0 bottom-8 z-20">
            <div className="fohat-shell flex items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <span className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-blue">
                  Role para percorrer
                </span>
                <span aria-hidden className="block h-px w-8 bg-navy/30" />
              </div>
              <Magnetic radius={80} strength={0.3} glowColor="oklch(0.46 0.09 253 / 0.35)">
                <Link
                  to="/locacao-de-equipamentos"
                  hash="catalogo"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-navy px-6 text-sm font-bold text-primary-foreground shadow-[var(--shadow-cta)] transition-colors hover:bg-blue"
                >
                  Ver catálogo completo
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Magnetic>

            </div>
            <div className="fohat-shell mt-3">
              <div className="relative h-px w-full bg-navy/10">
                <motion.div
                  className="absolute inset-y-0 left-0 origin-left bg-navy"
                  style={{ scaleX: scrollYProgress }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE — snap-x carousel */}
      <div className="lg:hidden">
        <div
          className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-8"
          style={{ scrollbarWidth: "thin" }}
        >
          {items.map((item, i) => (
            <div
              key={item.slug}
              className="w-[82%] shrink-0 snap-start"
            >
              <RentalEquipmentCard
                item={item}
                variant="compact"
                eager={i === 0}
                sourcePage="/"
              />
            </div>
          ))}
        </div>
        <div className="fohat-shell pb-16">
          <Link
            to="/locacao-de-equipamentos"
            hash="catalogo"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-navy px-6 text-sm font-bold text-primary-foreground shadow-[var(--shadow-cta)] transition-transform hover:-translate-y-0.5 hover:bg-blue"
          >
            Ver catálogo completo
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * Card sized for the horizontal filmstrip. Uses the existing
 * RentalEquipmentCard for a consistent visual, but wraps it in a
 * fixed-width column and adds a stage index label.
 */
function VitrineCard({
  item,
  index,
  total,
}: {
  item: (typeof RENTAL_CATALOG_ITEMS)[number];
  index: number;
  total: number;
}) {
  return (
    <div
      className="relative shrink-0"
      style={{ width: "clamp(360px, 40vw, 560px)" }}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="fohat-mono text-[10px] uppercase tracking-[0.24em] text-blue">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span
          aria-hidden
          className="block h-px flex-1 origin-left bg-navy/10"
          style={{ marginLeft: 12 }}
        />
      </div>
      <RentalEquipmentCard
        item={item}
        variant="full"
        eager={index === 0}
        sourcePage="/"
      />
    </div>
  );
}
