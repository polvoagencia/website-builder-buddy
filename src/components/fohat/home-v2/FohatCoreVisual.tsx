import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";

import type { CoreState } from "@/data/home-content";

/**
 * Núcleo visual proprietário FOHAT.
 *
 * SVG puro — três camadas concêntricas representando material, dados e
 * espaço. Cada estado (`presenca`, `sistemas`, `infraestrutura`) altera
 * ênfase, rotação e conexões destacadas, sem trocar de identidade.
 *
 * Sem canvas, sem partículas contínuas. Respeita reduced motion via
 * estado final estático.
 */

interface Props {
  state?: CoreState;
  /** 0..1 — abertura das camadas para o segundo ato (WorldActivation). */
  openness?: number;
  className?: string;
  ariaLabel?: string;
}

const STATE_META: Record<
  CoreState,
  { rotate: number; emphasis: [number, number, number]; accent: string }
> = {
  presenca: { rotate: -6, emphasis: [1, 0.55, 0.4], accent: "var(--color-cyan)" },
  sistemas: { rotate: 4, emphasis: [0.4, 1, 0.55], accent: "var(--color-blue-2)" },
  infraestrutura: {
    rotate: 12,
    emphasis: [0.45, 0.55, 1],
    accent: "var(--color-ice)",
  },
};

export function FohatCoreVisual({ state = "presenca", openness = 0, className, ariaLabel }: Props) {
  const reduce = useReducedMotion();
  const meta = STATE_META[state];
  const o = reduce ? 0.5 : Math.max(0, Math.min(1, openness));

  // Pontos de presença fixos (determinísticos, sem randomização).
  const nodes = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        return { x: Math.cos(angle) * 220, y: Math.sin(angle) * 220, i };
      }),
    [],
  );

  return (
    <div
      className={className}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      <motion.svg
        viewBox="-320 -320 640 640"
        className="h-full w-full"
        initial={false}
        animate={{ rotate: reduce ? 0 : meta.rotate }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <defs>
          <radialGradient id="fohatCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={meta.accent} stopOpacity="0.9" />
            <stop offset="55%" stopColor="var(--color-blue)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-navy)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="fohatCoreSurface" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-blue-2)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--color-navy)" stopOpacity="0.85" />
          </linearGradient>
          <filter id="fohatSoftBlur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        {/* Luz volumétrica interna */}
        <circle r="260" fill="url(#fohatCoreGlow)" filter="url(#fohatSoftBlur)" />

        {/* Camada espacial — pontos de presença */}
        <motion.g
          animate={{ opacity: 0.35 + meta.emphasis[0] * 0.55, scale: 1 + o * 0.18 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {nodes.map((n) => (
            <g key={n.i}>
              <line
                x1="0"
                y1="0"
                x2={n.x}
                y2={n.y}
                stroke="var(--color-blue-2)"
                strokeOpacity={0.18 + o * 0.25}
                strokeWidth="0.6"
              />
              <circle cx={n.x} cy={n.y} r={2.4} fill={meta.accent} />
            </g>
          ))}
        </motion.g>

        {/* Camada de dados — anéis com fatias tipo interface */}
        <motion.g
          animate={{
            opacity: 0.4 + meta.emphasis[1] * 0.55,
            rotate: reduce ? 0 : o * 30,
          }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "center" }}
        >
          <circle
            r="170"
            fill="none"
            stroke="var(--color-blue-2)"
            strokeOpacity="0.5"
            strokeWidth="1"
            strokeDasharray="6 8"
          />
          <circle
            r="140"
            fill="none"
            stroke="var(--color-ice)"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
          {/* Marcadores de segmento */}
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = Math.cos(rad) * 155;
            const y1 = Math.sin(rad) * 155;
            const x2 = Math.cos(rad) * 185;
            const y2 = Math.sin(rad) * 185;
            return (
              <line
                key={deg}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={meta.accent}
                strokeOpacity="0.8"
                strokeWidth="2"
                strokeLinecap="round"
              />
            );
          })}
        </motion.g>

        {/* Camada material — núcleo translúcido com placas */}
        <motion.g
          animate={{
            opacity: 0.55 + meta.emphasis[2] * 0.45,
            scale: 1 - o * 0.08,
          }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "center" }}
        >
          <circle
            r="108"
            fill="url(#fohatCoreSurface)"
            stroke="var(--color-blue-2)"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
          {/* Placas / módulos internos */}
          <g stroke="var(--color-ice)" strokeOpacity="0.35" fill="none">
            <rect x="-58" y="-58" width="116" height="116" rx="14" />
            <rect x="-38" y="-38" width="76" height="76" rx="10" />
            <line x1="-58" y1="0" x2="58" y2="0" strokeOpacity="0.2" />
            <line x1="0" y1="-58" x2="0" y2="58" strokeOpacity="0.2" />
          </g>
          {/* Ponto de intenção */}
          <circle r="8" fill={meta.accent} />
          <circle r="14" fill="none" stroke={meta.accent} strokeOpacity="0.5" />
        </motion.g>
      </motion.svg>
    </div>
  );
}
