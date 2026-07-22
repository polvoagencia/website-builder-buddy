import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView } from "motion/react";

import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Parceiros como rede colaborativa.
 *
 * SVG com nó central "FOHAT" e nós satélites representando tipos de
 * parceiros. motion/react anima aparecimento coordenado (nós + arestas)
 * quando a seção entra em viewport, com pulso sutil no núcleo.
 *
 * Justificativa motion: aparecimento sequencial de elementos SVG
 * dependentes entre si (arestas só depois dos nós) — impossível de
 * coordenar cleanly só com CSS.
 *
 * prefers-reduced-motion: nós/arestas aparecem estáticos, sem pulso.
 */

const NODES = [
  { label: "Agências", angle: 0 },
  { label: "Produtoras", angle: 60 },
  { label: "Criativos", angle: 120 },
  { label: "Instituições", angle: 180 },
  { label: "Marcas", angle: 240 },
  { label: "Cultura", angle: 300 },
];

const RADIUS = 170;
const CENTER = { x: 260, y: 220 };

function polar(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CENTER.x + r * Math.cos(rad), y: CENTER.y + r * Math.sin(rad) };
}

export function PartnersNetwork() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <section
      id="parceiros"
      className="relative overflow-hidden py-24 lg:py-32"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.97 0.008 250), oklch(0.93 0.015 250))",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-60"
      />
      <div className="fohat-shell relative grid items-center gap-14 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
        <SectionReveal>
          <span className="fohat-eyebrow">Para Parceiros</span>
          <h2 className="fohat-h2 mt-5">
            Uma rede que amplia o que criativos, agências e produtoras já
            constroem.
          </h2>
          <p className="fohat-lead mt-5">
            A FOHAT pode atuar como braço de tecnologia, desenvolvimento,
            integração e operação de parceiros criativos — em qualquer uma
            das três frentes.
          </p>
          <p className="mt-4 text-muted-foreground">
            Engenharia de Presença, Sistemas e Aplicativos ou Locação de
            Equipamentos — combinados ou independentes.
          </p>
          <div className="mt-8">
            <Link
              to="/parceiros"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-navy px-6 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 hover:bg-blue"
            >
              Conheça o modelo de parceria
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </SectionReveal>

        {/* Rede SVG */}
        <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[520px]">
          <svg
            viewBox="0 0 520 440"
            className="h-full w-full"
            role="img"
            aria-label="Rede de tipos de parceiros conectados à FOHAT"
          >
            <defs>
              <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--color-cyan)" stopOpacity="0.55" />
                <stop offset="70%" stopColor="var(--color-cyan)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="edge" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="var(--color-blue)" stopOpacity="0.85" />
                <stop offset="100%" stopColor="var(--color-blue-2)" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* halo do núcleo */}
            <circle cx={CENTER.x} cy={CENTER.y} r="120" fill="url(#core-glow)" />

            {/* Arestas — animam depois dos nós */}
            {NODES.map((n, i) => {
              const p = polar(n.angle, RADIUS);
              return (
                <motion.line
                  key={`edge-${i}`}
                  x1={CENTER.x}
                  y1={CENTER.y}
                  x2={p.x}
                  y2={p.y}
                  stroke="url(#edge)"
                  strokeWidth={1.2}
                  strokeDasharray="4 6"
                  initial={reduce ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
                  animate={
                    inView
                      ? { pathLength: 1, opacity: 0.7 }
                      : reduce
                        ? { pathLength: 1, opacity: 0.6 }
                        : { pathLength: 0, opacity: 0 }
                  }
                  transition={{
                    duration: reduce ? 0 : 0.7,
                    delay: reduce ? 0 : 0.35 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              );
            })}

            {/* Núcleo FOHAT */}
            <motion.g
              initial={reduce ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
            >
              {!reduce && (
                <motion.circle
                  cx={CENTER.x}
                  cy={CENTER.y}
                  r="46"
                  fill="none"
                  stroke="var(--color-cyan)"
                  strokeWidth="1"
                  animate={{ r: [46, 60, 46], opacity: [0.6, 0, 0.6] }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
              <circle cx={CENTER.x} cy={CENTER.y} r="42" fill="var(--color-navy)" />
              <circle
                cx={CENTER.x}
                cy={CENTER.y}
                r="42"
                fill="none"
                stroke="var(--color-cyan)"
                strokeWidth="1.2"
              />
              <text
                x={CENTER.x}
                y={CENTER.y + 5}
                textAnchor="middle"
                className="fohat-mono"
                fill="oklch(0.98 0 0)"
                fontSize="13"
                fontWeight="700"
                letterSpacing="2"
              >
                FOHAT
              </text>
            </motion.g>

            {/* Nós satélites */}
            {NODES.map((n, i) => {
              const p = polar(n.angle, RADIUS);
              return (
                <motion.g
                  key={n.label}
                  initial={
                    reduce
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.6 }
                  }
                  animate={
                    inView
                      ? { opacity: 1, scale: 1 }
                      : reduce
                        ? { opacity: 1, scale: 1 }
                        : {}
                  }
                  transition={{
                    duration: reduce ? 0 : 0.45,
                    delay: reduce ? 0 : 0.15 + i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                >
                  <circle cx={p.x} cy={p.y} r="7" fill="var(--color-blue)" />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="7"
                    fill="none"
                    stroke="var(--color-cyan)"
                    strokeOpacity="0.5"
                    strokeWidth="1"
                  />
                  <text
                    x={p.x}
                    y={p.y - 16}
                    textAnchor="middle"
                    className="fohat-mono"
                    fill="var(--color-navy)"
                    fontSize="11"
                    fontWeight="700"
                    letterSpacing="1.4"
                  >
                    {n.label.toUpperCase()}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
