import { BRANDS } from "@/data/presence-territories-content";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";

/**
 * Marcas · Transformação — ciclo visual conectando mensagem → memória.
 * Anel radial acessível: cada nó é uma etapa do ciclo. Pilares aparecem
 * como legenda associada, não como tags soltas.
 */
export function BrandEngagementCircuit() {
  const { title, body, loop, pillars } = BRANDS.shift;
  const size = 360;
  const cx = size / 2;
  const cy = size / 2;
  const r = 145;

  const nodes = loop.map((label, i) => {
    const angle = (i / loop.length) * Math.PI * 2 - Math.PI / 2;
    return {
      label,
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    };
  });

  return (
    <section
      id="transformacao"
      aria-labelledby="brands-circuit-title"
      className="relative overflow-hidden bg-mist py-24 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-70" />
      <div className="fohat-shell relative grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <SectionReveal>
          <span className="fohat-eyebrow">Transformação</span>
          <h2 id="brands-circuit-title" className="fohat-h2 mt-5">
            {title}
          </h2>
          <p className="fohat-lead mt-5 max-w-[520px]">{body}</p>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4">
            {pillars.map((p, i) => (
              <div key={p} className="border-l-2 border-blue/70 pl-4">
                <dt className="fohat-mono text-[10px] uppercase tracking-[0.18em] text-blue">
                  Pilar 0{i + 1}
                </dt>
                <dd className="mt-1 text-sm font-bold text-navy">{p}</dd>
              </div>
            ))}
          </dl>
        </SectionReveal>

        <SectionReveal delay={120} className="relative mx-auto w-full max-w-[440px]">
          <svg
            role="img"
            aria-label={`Ciclo de participação: ${loop.join(" → ")} — retornando à marca como memória`}
            viewBox={`0 0 ${size} ${size}`}
            className="h-auto w-full"
          >
            {/* Ring */}
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="oklch(0.46 0.055 253 / 0.25)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
            {/* Center brand mark */}
            <circle cx={cx} cy={cy} r="46" fill="oklch(0.22 0.023 250)" />
            <text
              x={cx}
              y={cy - 4}
              textAnchor="middle"
              fontSize="11"
              fill="oklch(0.85 0.055 245)"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="2"
            >
              MARCA
            </text>
            <text
              x={cx}
              y={cy + 12}
              textAnchor="middle"
              fontSize="8"
              fill="oklch(0.85 0.055 245 / 0.7)"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="1.5"
            >
              memória
            </text>

            {/* Connectors from center to each node */}
            {nodes.map((n, i) => (
              <line
                key={`l-${i}`}
                x1={cx}
                y1={cy}
                x2={n.x}
                y2={n.y}
                stroke="oklch(0.46 0.055 253 / 0.2)"
                strokeWidth="1"
              />
            ))}

            {/* Nodes */}
            {nodes.map((n, i) => (
              <g key={n.label}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="20"
                  fill="white"
                  stroke="oklch(0.46 0.055 253 / 0.5)"
                  strokeWidth="1.2"
                />
                <text
                  x={n.x}
                  y={n.y + 3}
                  textAnchor="middle"
                  fontSize="8"
                  fill="oklch(0.22 0.023 250)"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="700"
                  letterSpacing="1"
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
              </g>
            ))}

            {/* Labels around the ring */}
            {nodes.map((n) => {
              const dx = n.x - cx;
              const dy = n.y - cy;
              const len = Math.sqrt(dx * dx + dy * dy);
              const lx = cx + (dx / len) * (r + 40);
              const ly = cy + (dy / len) * (r + 40);
              const anchor = lx < cx - 4 ? "end" : lx > cx + 4 ? "start" : "middle";
              return (
                <text
                  key={`t-${n.label}`}
                  x={lx}
                  y={ly + 3}
                  textAnchor={anchor}
                  fontSize="10"
                  fill="oklch(0.22 0.023 250)"
                  fontFamily="Inter, sans-serif"
                  fontWeight="600"
                >
                  {n.label}
                </text>
              );
            })}
          </svg>
        </SectionReveal>
      </div>
    </section>
  );
}
