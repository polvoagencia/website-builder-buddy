import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { PRINCIPLES } from "@/data/engineering-presence";

/**
 * Composição editorial variada dos cinco pilares.
 * Não é uma grade uniforme: cada pilar recebe um tratamento distinto,
 * mas todos permanecem legíveis e equivalentes em importância.
 */
export function PresencePrinciples() {
  const [p1, p2, p3, p4, p5] = PRINCIPLES;

  return (
    <section id="pilares" aria-labelledby="pilares-heading" className="bg-white py-24 lg:py-32">
      <div className="fohat-shell">
        <SectionReveal className="mb-14 max-w-[820px]">
          <span className="fohat-eyebrow">Pilares</span>
          <h2 id="pilares-heading" className="fohat-h2 mt-5">
            Cinco princípios orientam cada projeto.
          </h2>
        </SectionReveal>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* 01 — bloco horizontal amplo */}
          <SectionReveal
            as="article"
            className="relative overflow-hidden rounded-[28px] border border-line bg-mist p-10 lg:col-span-8"
          >
            <PillarNumber n={p1.n} />
            <div className="grid gap-6 md:grid-cols-[1fr_140px] md:items-center">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">{p1.title}</h3>
                <p className="mt-3 max-w-md text-muted-foreground">{p1.desc}</p>
              </div>
              <svg viewBox="0 0 140 140" aria-hidden className="hidden md:block">
                <circle cx="70" cy="60" r="16" fill="oklch(0.46 0.055 253)" />
                <path
                  d="M40 110 Q70 82 100 110"
                  stroke="oklch(0.46 0.055 253)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="60"
                  fill="none"
                  stroke="oklch(0.46 0.055 253 / 0.25)"
                  strokeDasharray="3 5"
                />
              </svg>
            </div>
          </SectionReveal>

          {/* 02 — bloco quadrado com diagrama ferramenta/intenção */}
          <SectionReveal
            as="article"
            delay={60}
            className="relative overflow-hidden rounded-[28px] border border-line bg-white p-8 lg:col-span-4"
          >
            <PillarNumber n={p2.n} />
            <h3 className="text-xl font-bold tracking-tight">{p2.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p2.desc}</p>
            <svg viewBox="0 0 200 80" aria-hidden className="mt-6 h-16 w-full">
              <rect x="10" y="30" width="60" height="20" rx="4" fill="oklch(0.9 0.02 250)" />
              <text
                x="40"
                y="45"
                fontSize="9"
                textAnchor="middle"
                fill="oklch(0.46 0.055 253)"
                className="fohat-mono"
              >
                FERRAMENTA
              </text>
              <path d="M75 40 L125 40" stroke="oklch(0.46 0.055 253)" strokeDasharray="3 3" />
              <rect x="130" y="30" width="60" height="20" rx="4" fill="oklch(0.85 0.055 245)" />
              <text
                x="160"
                y="45"
                fontSize="9"
                textAnchor="middle"
                fill="oklch(0.22 0.023 250)"
                className="fohat-mono"
              >
                INTENÇÃO
              </text>
            </svg>
          </SectionReveal>

          {/* 03 — três círculos sobrepostos (físico, digital, humano) */}
          <SectionReveal
            as="article"
            delay={80}
            className="relative overflow-hidden rounded-[28px] border border-line bg-white p-8 lg:col-span-5"
          >
            <PillarNumber n={p3.n} />
            <h3 className="text-xl font-bold tracking-tight">{p3.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p3.desc}</p>
            <svg viewBox="0 0 220 120" aria-hidden className="mt-6 h-24 w-full">
              <circle cx="70" cy="60" r="38" fill="oklch(0.46 0.055 253 / 0.25)" />
              <circle cx="110" cy="60" r="38" fill="oklch(0.85 0.055 245 / 0.35)" />
              <circle cx="150" cy="60" r="38" fill="oklch(0.22 0.023 250 / 0.2)" />
              <text
                x="70"
                y="115"
                fontSize="9"
                textAnchor="middle"
                className="fohat-mono"
                fill="oklch(0.46 0.055 253)"
              >
                FÍSICO
              </text>
              <text
                x="110"
                y="115"
                fontSize="9"
                textAnchor="middle"
                className="fohat-mono"
                fill="oklch(0.46 0.055 253)"
              >
                DIGITAL
              </text>
              <text
                x="150"
                y="115"
                fontSize="9"
                textAnchor="middle"
                className="fohat-mono"
                fill="oklch(0.46 0.055 253)"
              >
                HUMANO
              </text>
            </svg>
          </SectionReveal>

          {/* 04 — rede de conhecimentos */}
          <SectionReveal
            as="article"
            delay={100}
            className="relative overflow-hidden rounded-[28px] border border-line bg-mist p-8 lg:col-span-7"
          >
            <PillarNumber n={p4.n} />
            <h3 className="text-xl font-bold tracking-tight">{p4.title}</h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">{p4.desc}</p>
            <svg viewBox="0 0 320 120" aria-hidden className="mt-6 h-24 w-full">
              {[
                [30, 60],
                [90, 30],
                [90, 90],
                [160, 60],
                [230, 30],
                [230, 90],
                [290, 60],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="6" fill="oklch(0.46 0.055 253)" />
              ))}
              {[
                [30, 60, 90, 30],
                [30, 60, 90, 90],
                [90, 30, 160, 60],
                [90, 90, 160, 60],
                [160, 60, 230, 30],
                [160, 60, 230, 90],
                [230, 30, 290, 60],
                [230, 90, 290, 60],
              ].map(([x1, y1, x2, y2], i) => (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="oklch(0.46 0.055 253 / 0.5)"
                  strokeWidth="1"
                />
              ))}
            </svg>
          </SectionReveal>

          {/* 05 — fechamento em tela cheia representando permanência */}
          <SectionReveal
            as="article"
            delay={140}
            className="relative overflow-hidden rounded-[28px] p-10 text-white lg:col-span-12 lg:p-14"
          >
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                background: "linear-gradient(135deg, oklch(0.22 0.023 250), oklch(0.32 0.035 250))",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-40"
            />
            <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <PillarNumber n={p5.n} dark />
                <h3 className="mt-6 text-3xl font-bold tracking-tight text-white lg:text-4xl">
                  {p5.title}
                </h3>
                <p className="mt-4 max-w-2xl text-[oklch(0.85_0.02_250)]">{p5.desc}</p>
              </div>
              <svg viewBox="0 0 180 120" aria-hidden className="hidden h-24 md:block">
                {[10, 30, 50, 70, 90].map((o, i) => (
                  <path
                    key={i}
                    d={`M0 ${o + 20} Q90 ${o} 180 ${o + 20}`}
                    stroke="oklch(0.85 0.055 245)"
                    strokeOpacity={0.2 + i * 0.15}
                    fill="none"
                  />
                ))}
              </svg>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

function PillarNumber({ n, dark = false }: { n: string; dark?: boolean }) {
  return (
    <div
      className={
        "mb-6 inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-extrabold " +
        (dark ? "bg-white/12 text-white" : "bg-ice text-blue")
      }
    >
      {n}
    </div>
  );
}
