import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronRight } from "lucide-react";

import { Reveal } from "@/components/fohat/Reveal";
import { RentalRequestDialog } from "@/components/fohat/RentalRequestDialog";
import { RENTAL_CATALOG_ITEMS } from "@/data/rental-equipment";

/**
 * Hero da página de Locação.
 * Composição visual usando as imagens reais do catálogo — um equipamento
 * principal em destaque e módulos menores representando o restante,
 * conectados por linhas técnicas com etiquetas de estado ("configuração",
 * "integração", "operação"). Nenhuma animação pesada; sem parallax.
 */
export function RentalHero() {
  const main = RENTAL_CATALOG_ITEMS.find((i) => i.slug === "totens")!;
  const modules = RENTAL_CATALOG_ITEMS.filter(
    (i) => i.slug !== "totens" && i.slug !== "acessorios",
  );

  return (
    <section
      id="visao-geral"
      className="relative overflow-hidden pt-32 pb-16 text-white lg:pt-40 lg:pb-24 fohat-inner-hero"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 fohat-grid-bg-dark"
      />

      <div className="fohat-shell relative">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
          {/* Texto */}
          <Reveal>
            <nav
              aria-label="Você está aqui"
              className="fohat-mono mb-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-cyan/90"
            >
              <Link to="/" className="text-cyan hover:text-white">
                Início
              </Link>
              <ChevronRight className="h-3 w-3 opacity-50" aria-hidden />
              <span className="text-white/70">Locação de Equipamentos</span>
            </nav>

            <span
              className="fohat-eyebrow"
              style={{ color: "var(--color-cyan)" }}
            >
              Frente de infraestrutura · FOHAT
            </span>

            <h1 className="fohat-h1 mt-6 max-w-[720px] text-white [font-size:clamp(2.2rem,4.6vw,4.4rem)]">
              Locação de{" "}
              <span className="text-cyan">Equipamentos Tecnológicos</span>
            </h1>

            <p className="fohat-lead mt-6 max-w-[620px] text-[oklch(0.9_0.02_250)]">
              A infraestrutura certa para sua experiência acontecer no mundo
              real.
            </p>

            <p className="mt-4 max-w-[620px] text-base text-[oklch(0.82_0.02_250)]">
              Equipamentos tecnológicos para eventos, ativações, exposições,
              produções e operações especiais, com possibilidade de
              configuração, instalação, integração e suporte técnico.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <RentalRequestDialog sourcePage="/locacao-de-equipamentos">
                <button className="group inline-flex h-13 items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-bold text-navy shadow-[0_14px_40px_oklch(0_0_0_/_0.2)] transition-all hover:-translate-y-0.5 hover:bg-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan">
                  Solicitar disponibilidade
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </RentalRequestDialog>
              <a
                href="#catalogo"
                className="group inline-flex h-13 items-center gap-3 rounded-full border border-white/28 bg-white/[0.06] px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition-all hover:border-cyan hover:text-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              >
                Ver catálogo
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          {/* Composição visual */}
          <Reveal delay={150} className="relative">
            <div className="relative aspect-[5/4] w-full">
              {/* linhas técnicas */}
              <svg
                aria-hidden
                viewBox="0 0 500 400"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <defs>
                  <linearGradient id="rh-line" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="var(--color-cyan)" stopOpacity="0" />
                    <stop offset="50%" stopColor="var(--color-cyan)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="var(--color-cyan)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <g stroke="url(#rh-line)" strokeWidth="1" fill="none">
                  <path d="M 250 200 L 90 90" />
                  <path d="M 250 200 L 410 90" />
                  <path d="M 250 200 L 90 310" />
                  <path d="M 250 200 L 410 310" />
                </g>
              </svg>

              {/* módulo principal (centro) */}
              <div className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-cyan/40 bg-navy/40 shadow-[0_20px_60px_oklch(0_0_0_/_0.4)]">
                <img
                  src={main.image}
                  alt={main.imageAlt}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/95 to-transparent p-3">
                  <div className="fohat-mono text-[9px] uppercase tracking-[0.18em] text-cyan">
                    Módulo principal
                  </div>
                  <div className="text-xs font-bold text-white">
                    {main.name}
                  </div>
                </div>
              </div>

              {/* módulos periféricos */}
              {modules.slice(0, 4).map((m, i) => {
                const pos = [
                  { top: "0%", left: "0%" },
                  { top: "0%", right: "0%" },
                  { bottom: "0%", left: "0%" },
                  { bottom: "0%", right: "0%" },
                ][i];
                const state = ["Configuração", "Integração", "Operação", "Suporte"][i];
                return (
                  <div
                    key={m.slug}
                    className="absolute h-[30%] w-[30%] overflow-hidden rounded-xl border border-white/15 bg-navy/60 shadow-[0_10px_30px_oklch(0_0_0_/_0.35)]"
                    style={pos}
                  >
                    <img
                      src={m.image}
                      alt={m.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover opacity-90"
                    />
                    <span className="fohat-mono absolute left-1.5 top-1.5 rounded-sm bg-navy/90 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.14em] text-cyan">
                      {state}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="fohat-mono mt-4 text-center text-[10px] uppercase tracking-[0.18em] text-white/50">
              Composição ilustrativa · Imagens de catálogo
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
