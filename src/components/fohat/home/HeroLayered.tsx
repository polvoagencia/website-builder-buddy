import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import heroAsset from "@/assets/hero.jpg.asset.json";
import portalAsset from "@/assets/portal.jpg.asset.json";
import labAsset from "@/assets/lab.jpg.asset.json";

import { ContactDialog } from "@/components/fohat/ContactDialog";
import { SERVICES } from "@/data/fohat-services";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Hero em camadas — três frentes comunicadas simultaneamente.
 *
 * Estrutura:
 *  - Copy institucional à esquerda (título único da FOHAT).
 *  - À direita, três camadas (frentes) empilhadas em profundidade.
 *    A camada ativa avança, se ilumina e mostra sua mídia.
 *  - Controles acessíveis: tabs com role="tablist" + setas ← → e Home/End,
 *    reflete estado ativo com aria-selected e foco visível.
 *
 * motion/react é usado para transição coordenada de mídia (crossfade
 * + escala) e reordenação suave das camadas — interações que dependem
 * de layout coordenado. Micro-interações continuam em CSS.
 */

type Layer = {
  slug: string;
  index: number;
  eyebrow: string;
  title: string;
  short: string;
  media: { src: string; alt: string };
  accent: string;
  href: string;
};

const LAYERS: Layer[] = [
  {
    slug: "engenharia-de-presenca",
    index: 1,
    eyebrow: "Frente autoral",
    title: "Engenharia de Presença",
    short:
      "Ativações, ambientes e experiências que integram tecnologia, narrativa e presença humana.",
    media: {
      src: portalAsset.url,
      alt: "Experiência imersiva de Engenharia de Presença",
    },
    accent: "var(--color-cyan)",
    href: "/engenharia-de-presenca",
  },
  {
    slug: "sistemas-e-aplicativos",
    index: 2,
    eyebrow: "Produto e engenharia",
    title: "Sistemas e Aplicativos",
    short: "Software sob medida — interfaces, integrações, dashboards e inteligência aplicada.",
    media: {
      src: labAsset.url,
      alt: "Equipe desenvolvendo sistemas e aplicativos",
    },
    accent: "var(--color-blue-2)",
    href: "/sistemas-e-aplicativos",
  },
  {
    slug: "locacao-de-equipamentos",
    index: 3,
    eyebrow: "Operação",
    title: "Locação de Equipamentos",
    short:
      "Infraestrutura tecnológica para eventos, projetos e operações — com suporte técnico e logística.",
    media: {
      src: heroAsset.url,
      alt: "Equipamentos tecnológicos em operação",
    },
    accent: "var(--color-blue)",
    href: "/locacao-de-equipamentos",
  },
];

export function HeroLayered() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const activeLayer = LAYERS[active];

  // Encontra CTA da frente ativa a partir do arquivo centralizado
  const activeCta = SERVICES.find((s) => s.slug === activeLayer.slug)?.cta ?? {
    label: "Saiba mais",
    to: activeLayer.href,
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActive((a) => (a + 1) % LAYERS.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((a) => (a - 1 + LAYERS.length) % LAYERS.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(LAYERS.length - 1);
    }
  };

  return (
    <section
      id="inicio"
      className="fohat-hero-bg relative flex min-h-screen items-center overflow-hidden pb-24 pt-36 lg:pt-40"
    >
      {/* Grid geométrico sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(30deg, transparent 0 48%, oklch(0.46 0.055 253 / 0.06) 49% 51%, transparent 52%), linear-gradient(150deg, transparent 0 48%, oklch(0.46 0.055 253 / 0.04) 49% 51%, transparent 52%)",
          backgroundSize: "150px 150px",
        }}
      />

      <div className="fohat-shell relative z-10 grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-[70px]">
        {/* Coluna esquerda — copy institucional */}
        <div>
          <span className="fohat-eyebrow">Tecnologia aplicada, do conceito à operação</span>
          <h1 className="fohat-h1 mt-6 max-w-[900px]">
            Tecnologia para criar presença, desenvolver soluções e colocar operações em
            funcionamento.
          </h1>
          <p className="fohat-lead mt-7 max-w-[640px]">
            Três frentes de contratação, uma única lógica de engenharia. A FOHAT integra
            experiências, software e infraestrutura em projetos que acontecem de verdade — diante do
            público.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ContactDialog>
              <button className="group inline-flex h-14 items-center gap-3 rounded-full bg-navy px-7 text-sm font-bold text-primary-foreground shadow-[var(--shadow-cta)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-blue">
                Conte sua ideia
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </ContactDialog>
            <a
              href="#frentes"
              className="inline-flex h-14 items-center gap-2 rounded-full border border-navy/15 bg-white/70 px-7 text-sm font-bold text-navy backdrop-blur-md transition-colors hover:border-blue hover:text-blue"
            >
              Conheça nossas frentes
            </a>
          </div>
        </div>

        {/* Coluna direita — três camadas */}
        <div className="relative">
          {/* Contorno geométrico decorativo */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-6 h-72 w-72 rotate-[26deg] border border-blue/20 lg:h-[360px] lg:w-[360px]"
            style={{ borderRadius: "40% 60% 50% 45%" }}
          />

          {/* Placa de mídia — recebe a camada ativa */}
          <div className="fohat-image-frame relative aspect-[4/5] w-full max-w-[520px] overflow-hidden lg:ml-auto">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={activeLayer.slug}
                src={activeLayer.media.src}
                alt={activeLayer.media.alt}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ filter: "saturate(0.82) contrast(1.06)" }}
                initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
                transition={{
                  duration: reduce ? 0 : 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                loading="eager"
                fetchPriority="high"
              />
            </AnimatePresence>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 45%, oklch(0.22 0.023 250 / 0.78))",
              }}
            />
            <div aria-hidden className="fohat-scanline" style={{ top: "10%" }} />

            {/* Legenda da camada ativa */}
            <div className="absolute inset-x-6 bottom-6 text-white">
              <span
                className="fohat-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: activeLayer.accent }}
              >
                Frente {String(activeLayer.index).padStart(2, "0")} · {activeLayer.eyebrow}
              </span>
              <div className="mt-2 text-2xl font-bold leading-tight tracking-tight">
                {activeLayer.title}
              </div>
              <p className="mt-2 max-w-[380px] text-sm text-[oklch(0.9_0.015_250)]">
                {activeLayer.short}
              </p>
              <Link
                to={activeCta.to}
                hash={activeCta.hash}
                className="group mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-white/90 hover:text-cyan"
              >
                {activeCta.label}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Tabs de camadas — acessível */}
          <div
            role="tablist"
            aria-label="Frentes FOHAT"
            aria-orientation="horizontal"
            onKeyDown={onKeyDown}
            className="mt-5 grid grid-cols-3 gap-2 lg:absolute lg:-left-6 lg:top-1/2 lg:mt-0 lg:w-14 lg:-translate-y-1/2 lg:grid-cols-1 lg:gap-3"
          >
            {LAYERS.map((l, i) => {
              const isActive = i === active;
              return (
                <button
                  key={l.slug}
                  role="tab"
                  id={`hero-tab-${l.slug}`}
                  aria-selected={isActive}
                  aria-controls="hero-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group relative flex min-h-[52px] items-center gap-2 rounded-full border px-3 py-2 text-left backdrop-blur-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-mist",
                    isActive
                      ? "border-navy/30 bg-white text-navy shadow-[var(--shadow-card)]"
                      : "border-navy/12 bg-white/60 text-steel hover:border-navy/25 hover:text-navy",
                  )}
                >
                  <span
                    className={cn(
                      "fohat-mono grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10px] font-bold tabular-nums transition-colors",
                      isActive ? "bg-navy text-white" : "bg-mist text-steel group-hover:bg-ice",
                    )}
                  >
                    {String(l.index).padStart(2, "0")}
                  </span>
                  <span className="fohat-mono truncate text-[10px] uppercase tracking-[0.16em] lg:hidden">
                    {l.title.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="fohat-mono absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.24em] text-steel">
        Conheça as três frentes ↓
      </div>
    </section>
  );
}
