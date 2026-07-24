import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

import { ContactDialog } from "@/components/fohat/ContactDialog";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Magnetic } from "@/components/fohat/home-v2/primitives/Magnetic";


/**
 * Chapter 6 — Projects gateway.
 *
 * A procedural network diagram whose edges *draw themselves* and whose
 * nodes light up sequentially, driven by scroll progress. Reads as a
 * "system coming online" — an abstract representation of FOHAT's method
 * without depending on any specific case study.
 */

interface Node {
  id: string;
  x: number;
  y: number;
  r: number;
  label?: string;
  /** When this node lights up in the sequence, 0..1 */
  activation: number;
}

const NODES: Node[] = [
  { id: "a", x: 120, y: 140, r: 4, label: "intenção", activation: 0.05 },
  { id: "b", x: 280, y: 90, r: 3, activation: 0.1 },
  { id: "c", x: 440, y: 170, r: 6, label: "estratégia", activation: 0.18 },
  { id: "d", x: 600, y: 110, r: 3, activation: 0.24 },
  { id: "e", x: 760, y: 190, r: 5, label: "sistema", activation: 0.32 },
  { id: "f", x: 920, y: 130, r: 3, activation: 0.4 },
  { id: "g", x: 1080, y: 210, r: 6, label: "IA", activation: 0.48 },
  { id: "h", x: 200, y: 290, r: 3, activation: 0.35 },
  { id: "i", x: 360, y: 360, r: 5, label: "integração", activation: 0.45 },
  { id: "j", x: 520, y: 320, r: 3, activation: 0.5 },
  { id: "k", x: 680, y: 380, r: 5, label: "equipamento", activation: 0.6 },
  { id: "l", x: 840, y: 340, r: 3, activation: 0.65 },
  { id: "m", x: 1000, y: 400, r: 4, activation: 0.7 },
  { id: "n", x: 300, y: 480, r: 4, activation: 0.75 },
  { id: "o", x: 480, y: 530, r: 5, label: "implantação", activation: 0.82 },
  { id: "p", x: 660, y: 490, r: 3, activation: 0.86 },
  { id: "q", x: 820, y: 540, r: 6, label: "operação", activation: 0.94 },
  { id: "r", x: 980, y: 500, r: 3, activation: 0.98 },
];

const EDGES: [string, string][] = [
  ["a", "b"], ["b", "c"], ["c", "d"], ["d", "e"], ["e", "f"], ["f", "g"],
  ["a", "h"], ["c", "i"], ["e", "k"], ["g", "m"],
  ["h", "i"], ["i", "j"], ["j", "k"], ["k", "l"], ["l", "m"],
  ["h", "n"], ["i", "o"], ["k", "p"], ["m", "r"],
  ["n", "o"], ["o", "p"], ["p", "q"], ["q", "r"],
  ["c", "e"], ["e", "g"], ["i", "k"], ["o", "q"],
];

const CAPABILITIES = [
  "intenção",
  "estratégia",
  "desenvolvimento",
  "sistemas",
  "inteligência artificial",
  "equipamentos",
  "integração",
  "implantação",
  "operação",
  "monitoramento",
];

export function Projects() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Slice within the section during which the network animates.
  const netProgress = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);

  return (
    <section
      id="projetos"
      ref={ref}
      className="relative overflow-hidden bg-navy py-24 text-white lg:py-28"
    >
      {/* Top bridge — soft mist→navy handoff from Vitrine */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-24 -translate-y-1/2"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--color-navy) 55%, transparent) 55%, var(--color-navy) 100%)",
        }}
      />
      {/* Backdrop glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-[20%] left-[10%] h-[70%] w-[70%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.46 0.09 253 / 0.4), transparent 65%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute bottom-[10%] right-[5%] h-[55%] w-[55%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.85 0.11 220 / 0.28), transparent 65%)",
            filter: "blur(130px)",
          }}
        />
      </div>

      <div className="fohat-shell relative">
        <div className="max-w-[820px]">
          <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
            Projetos em funcionamento
          </span>
          <h2 className="fohat-h2 mt-5 text-white">
            Tecnologia que sai do conceito e entra em operação no mundo real.
          </h2>
          <p className="fohat-lead mt-6 text-white/60">
            Conheça projetos em que a FOHAT integrou estratégia,
            desenvolvimento, inteligência artificial, equipamentos e operação
            para criar experiências e soluções em diferentes contextos.
          </p>
        </div>

        {/* Capability pills */}
        <ul className="mt-10 flex flex-wrap gap-2">
          {CAPABILITIES.map((c) => (
            <li
              key={c}
              className="fohat-mono rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/75"
            >
              {c}
            </li>
          ))}
        </ul>

        {/* Network */}
        <div className="mt-14 overflow-hidden rounded-[32px] border border-white/8 bg-white/[0.02] p-6 backdrop-blur-sm lg:p-10">
          <NetworkSVG progress={netProgress} reduce={reduce} />
          <p className="fohat-mono mt-6 text-[10px] uppercase tracking-[0.28em] text-white/40">
            Fluxo · conceito → construção → operação
          </p>
        </div>

        {/* Layers card row */}
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {LAYERS.map((l, i) => (
            <motion.div
              key={l.title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm"
            >
              <span
                className="fohat-mono text-[10px] uppercase tracking-[0.24em]"
                style={{ color: "var(--color-cyan)" }}
              >
                Camada {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-xl font-bold text-white">{l.title}</h3>
              <p className="mt-2 text-sm text-white/60">{l.body}</p>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-wrap gap-3">
          <Magnetic radius={80} strength={0.3}>
            <Link
              to="/engenharia-de-presenca/projetos"
              className="group inline-flex h-13 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-cyan"
            >
              Conheça nossos projetos
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Magnetic>
          <Magnetic radius={70} strength={0.25} glow={false}>
            <ContactDialog>
              <button className="group inline-flex h-13 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition-colors hover:border-cyan hover:text-cyan">
                Conte sua ideia
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </ContactDialog>
          </Magnetic>

        </div>
      </div>
    </section>
  );
}

const LAYERS = [
  { title: "Conceito", body: "Intenção, contexto e arquitetura da solução." },
  {
    title: "Construção",
    body: "Software, IA, equipamentos e integrações.",
  },
  {
    title: "Operação",
    body: "Implantação, suporte presencial e monitoramento.",
  },
];

/**
 * The SVG network. Edges draw via stroke-dashoffset interpolation and
 * nodes light up when the section progress crosses their activation
 * threshold. All motion values are cheap transforms of one scroll signal.
 */
function NetworkSVG({
  progress,
  reduce,
}: {
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const nodeById = Object.fromEntries(NODES.map((n) => [n.id, n]));

  return (
    <svg
      viewBox="0 0 1200 640"
      className="h-auto w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="edge-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="oklch(0.46 0.09 253 / 0.9)" />
          <stop offset="1" stopColor="oklch(0.85 0.11 220 / 0.9)" />
        </linearGradient>
        <radialGradient id="node-glow">
          <stop offset="0" stopColor="oklch(0.85 0.11 220 / 0.9)" />
          <stop offset="1" stopColor="oklch(0.85 0.11 220 / 0)" />
        </radialGradient>
      </defs>

      {/* Edges */}
      <g>
        {EDGES.map(([a, b], i) => {
          const na = nodeById[a];
          const nb = nodeById[b];
          if (!na || !nb) return null;
          const activation = Math.max(na.activation, nb.activation);
          return (
            <Edge
              key={`${a}-${b}-${i}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              activation={activation}
              progress={progress}
              reduce={reduce}
            />
          );
        })}
      </g>

      {/* Nodes */}
      <g>
        {NODES.map((n) => (
          <NodeDot
            key={n.id}
            node={n}
            progress={progress}
            reduce={reduce}
          />
        ))}
      </g>
    </svg>
  );
}

function Edge({
  x1,
  y1,
  x2,
  y2,
  activation,
  progress,
  reduce,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  activation: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const length = Math.hypot(x2 - x1, y2 - y1);
  const start = Math.max(0, activation - 0.08);
  const end = Math.min(1, activation + 0.06);

  const offset = useTransform(progress, [start, end], [length, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="url(#edge-gradient)"
      strokeWidth={1}
      strokeLinecap="round"
      strokeDasharray={length}
      style={{
        strokeDashoffset: reduce ? 0 : offset,
        opacity: reduce ? 0.55 : opacity,
      }}
    />
  );
}

function NodeDot({
  node,
  progress,
  reduce,
}: {
  node: Node;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  // Clamp to [0, 1] so motion's WAAPI backend accepts the offsets.
  const a0 = Math.max(0, node.activation - 0.04);
  const a1 = Math.min(1, node.activation + 0.02);
  const a2 = Math.min(1, node.activation + 0.15);
  const opacity = useTransform(progress, [a0, a1], [0, 1]);
  const scale = useTransform(progress, [a0, a1, a2], [0.6, 1.35, 1]);

  return (
    <g>
      {/* Glow behind big nodes */}
      {node.r >= 5 && (
        <motion.circle
          cx={node.x}
          cy={node.y}
          r={node.r * 4}
          fill="url(#node-glow)"
          style={{ opacity: reduce ? 0.35 : opacity }}
        />
      )}
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={node.r}
        fill="oklch(0.85 0.11 220)"
        style={{
          opacity: reduce ? 0.9 : opacity,
          scale: reduce ? 1 : scale,
          transformOrigin: `${node.x}px ${node.y}px`,
        }}
      />
      {node.label && (
        <motion.text
          x={node.x + node.r + 8}
          y={node.y + 3}
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          letterSpacing="1.6"
          fill="oklch(0.85 0.055 245 / 0.85)"
          style={{ opacity: reduce ? 0.85 : opacity }}
        >
          {node.label.toUpperCase()}
        </motion.text>
      )}
    </g>
  );
}
