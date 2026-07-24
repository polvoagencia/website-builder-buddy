import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

import markAsset from "@/assets/mark-fohat.png.asset.json";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Magnetic } from "@/components/fohat/home-v2/primitives/Magnetic";


/**
 * Chapter 7 — Partners network.
 *
 * A radial diagram with FOHAT at the center, connected via animated
 * links to six partner archetypes. The whole graph draws itself as the
 * section enters the viewport. Kept intentionally minimal — this is a
 * "here is what a partnership looks like" schematic, not a marketing wall.
 */

interface Petal {
  label: string;
  angle: number; // deg, 0 = right, 90 = down
  activation: number; // 0..1 within the section progress
}

const PETALS: Petal[] = [
  { label: "Agências", angle: -75, activation: 0.15 },
  { label: "Produtoras", angle: -30, activation: 0.28 },
  { label: "Criativos", angle: 20, activation: 0.4 },
  { label: "Instituições", angle: 75, activation: 0.52 },
  { label: "Marcas", angle: 145, activation: 0.65 },
  { label: "Cultura", angle: 210, activation: 0.78 },
];

export function Partners() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="parceiros"
      ref={ref}
      className="relative overflow-hidden bg-mist py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="fohat-grid-bg pointer-events-none absolute inset-0 opacity-60"
      />
      {/* Bottom bridge — soft mist→navy handoff into FinalCTA */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 translate-y-1/2"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--color-navy) 55%, transparent) 55%, var(--color-navy) 100%)",
        }}
      />

      <div className="fohat-shell relative grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
        {/* Copy */}
        <div>
          <span className="fohat-eyebrow">Para parceiros</span>
          <h2 className="fohat-h2 mt-5 max-w-[520px]">
            A rede que amplia o que criativos, agências e produtoras já
            constroem.
          </h2>
          <p className="mt-6 max-w-[520px] text-muted-foreground">
            A FOHAT pode atuar como braço de tecnologia, desenvolvimento,
            integração e operação de parceiros criativos — em qualquer uma das
            três frentes.
          </p>
          <p className="fohat-mono mt-4 max-w-[460px] text-[11px] uppercase tracking-[0.22em] text-blue">
            Engenharia de Presença · Sistemas · Locação — combinados ou
            independentes
          </p>
          <Link
            to="/parceiros"
            className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-navy px-6 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 hover:bg-blue"
          >
            Conheça o modelo de parceria
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Radial graph */}
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <RadialGraph progress={scrollYProgress} reduce={reduce} />
        </div>
      </div>
    </section>
  );
}

function RadialGraph({
  progress,
  reduce,
}: {
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const CENTER = 260;
  const RADIUS = 200;

  return (
    <svg
      viewBox="0 0 520 520"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <radialGradient id="fohat-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="oklch(0.32 0.045 250)" />
          <stop offset="1" stopColor="oklch(0.22 0.023 250)" />
        </radialGradient>
        <radialGradient id="fohat-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="oklch(0.85 0.11 220 / 0.55)" />
          <stop offset="1" stopColor="oklch(0.85 0.11 220 / 0)" />
        </radialGradient>
      </defs>

      {/* Halo behind core (scale is cheaper + safer than animating r) */}
      <motion.circle
        cx={CENTER}
        cy={CENTER}
        r={95}
        fill="url(#fohat-halo)"
        style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        animate={reduce ? undefined : { scale: [1, 1.14, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Guide circles */}
      <circle
        cx={CENTER}
        cy={CENTER}
        r={RADIUS}
        fill="none"
        stroke="oklch(0.22 0.023 250 / 0.12)"
        strokeDasharray="2 5"
      />
      <circle
        cx={CENTER}
        cy={CENTER}
        r={RADIUS * 0.62}
        fill="none"
        stroke="oklch(0.22 0.023 250 / 0.08)"
        strokeDasharray="2 5"
      />

      {/* Petals: line + label + dot */}
      {PETALS.map((p) => (
        <PetalItem
          key={p.label}
          petal={p}
          center={CENTER}
          radius={RADIUS}
          progress={progress}
          reduce={reduce}
        />
      ))}

      {/* Core */}
      <circle cx={CENTER} cy={CENTER} r={68} fill="url(#fohat-core)" />
      <circle
        cx={CENTER}
        cy={CENTER}
        r={68}
        fill="none"
        stroke="oklch(0.85 0.11 220 / 0.5)"
        strokeWidth={1.5}
      />
      <image
        href={markAsset.url}
        x={CENTER - 32}
        y={CENTER - 32}
        width={64}
        height={64}
        style={{ filter: "grayscale(1) brightness(4)" }}
      />
      <text
        x={CENTER}
        y={CENTER + 50}
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
        letterSpacing="2"
        fill="oklch(0.85 0.055 245 / 0.85)"
      >
        FOHAT
      </text>
    </svg>
  );
}

function PetalItem({
  petal,
  center,
  radius,
  progress,
  reduce,
}: {
  petal: Petal;
  center: number;
  radius: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const rad = (petal.angle * Math.PI) / 180;
  const x2 = center + Math.cos(rad) * radius;
  const y2 = center + Math.sin(rad) * radius;

  // Line originates just outside the core (r=76).
  const x1 = center + Math.cos(rad) * 76;
  const y1 = center + Math.sin(rad) * 76;

  const length = Math.hypot(x2 - x1, y2 - y1);
  const start = petal.activation - 0.08;
  const end = petal.activation + 0.04;

  const offset = useTransform(progress, [start, end], [length, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const dotScale = useTransform(
    progress,
    [end - 0.02, end + 0.05, end + 0.15],
    [0.4, 1.4, 1],
  );

  // Label offset outward from the dot along the same angle.
  const labelX = center + Math.cos(rad) * (radius + 22);
  const labelY = center + Math.sin(rad) * (radius + 22);

  return (
    <g>
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="oklch(0.46 0.055 253 / 0.6)"
        strokeWidth={1.2}
        strokeDasharray={length}
        style={{
          strokeDashoffset: reduce ? 0 : offset,
          opacity: reduce ? 0.7 : opacity,
        }}
      />
      <motion.circle
        cx={x2}
        cy={y2}
        r={7}
        fill="oklch(0.22 0.023 250)"
        stroke="oklch(0.85 0.11 220)"
        strokeWidth={1.5}
        style={{
          opacity: reduce ? 1 : opacity,
          scale: reduce ? 1 : dotScale,
          transformOrigin: `${x2}px ${y2}px`,
        }}
      />
      <motion.text
        x={labelX}
        y={labelY + 3}
        textAnchor={Math.cos(rad) > 0.15 ? "start" : Math.cos(rad) < -0.15 ? "end" : "middle"}
        fontFamily="JetBrains Mono, monospace"
        fontSize="10"
        letterSpacing="1.8"
        fill="oklch(0.22 0.023 250)"
        style={{ opacity: reduce ? 1 : opacity }}
      >
        {petal.label.toUpperCase()}
      </motion.text>
    </g>
  );
}
