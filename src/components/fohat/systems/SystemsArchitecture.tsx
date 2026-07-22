import { SectionReveal } from "@/components/fohat/motion/SectionReveal";

const LAYERS = [
  {
    n: "01",
    tag: "Problema real",
    title: "O que precisa funcionar",
    desc: "Mapeamento do processo, das pessoas e do contexto operacional.",
  },
  {
    n: "02",
    tag: "Arquitetura",
    title: "Como o sistema é organizado",
    desc: "Stack, dados, integrações e caminhos de evolução.",
  },
  {
    n: "03",
    tag: "Desenvolvimento",
    title: "Construção em ciclos",
    desc: "Interfaces, serviços e regras de negócio validados em ciclos curtos.",
  },
  {
    n: "04",
    tag: "Integrações",
    title: "Conexão com o entorno",
    desc: "APIs, bancos, equipamentos, serviços externos e canais.",
  },
  {
    n: "05",
    tag: "Operação",
    title: "Funciona no mundo real",
    desc: "Implantação, monitoramento, suporte e evolução contínua.",
  },
];

/**
 * SystemsArchitecture — visualiza um sistema como estrutura viva e conectada.
 * Diagrama de camadas com nó central e ramificações, com bloco de detalhes
 * por camada. Sem parágrafos longos.
 */
export function SystemsArchitecture() {
  return (
    <section
      id="arquitetura"
      aria-labelledby="arquitetura-heading"
      className="relative overflow-hidden bg-mist py-24 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-60" />

      <div className="fohat-shell relative">
        <SectionReveal className="mb-14 max-w-[820px]">
          <span className="fohat-eyebrow">Arquitetura</span>
          <h2 id="arquitetura-heading" className="fohat-h2 mt-5">
            Um sistema é uma estrutura conectada — não uma tela.
          </h2>
          <p className="fohat-lead mt-5">
            Cada camada resolve uma parte específica do problema e conversa com
            as demais.
          </p>
        </SectionReveal>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
          {/* Diagrama */}
          <SectionReveal className="relative">
            <div className="relative aspect-square w-full max-w-[520px]">
              <svg viewBox="0 0 520 520" aria-hidden className="h-full w-full">
                <defs>
                  <linearGradient id="sa-line" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(0.46 0.055 253)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="oklch(0.85 0.055 245)" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {/* eixo central vertical (pipeline) */}
                <line x1="260" y1="60" x2="260" y2="460" stroke="oklch(0.46 0.055 253 / 0.35)" strokeDasharray="4 6" />

                {/* nós das 5 camadas */}
                {LAYERS.map((_, i) => {
                  const y = 60 + i * 100;
                  const side = i % 2 === 0 ? -1 : 1;
                  const bx = 260 + side * 160;
                  return (
                    <g key={i}>
                      <line x1="260" y1={y} x2={bx} y2={y} stroke="url(#sa-line)" strokeWidth="0.8" />
                      <rect
                        x={bx - 50}
                        y={y - 18}
                        width="100"
                        height="36"
                        rx="8"
                        fill="oklch(1 0 0)"
                        stroke="oklch(0.46 0.055 253 / 0.35)"
                      />
                      <text
                        x={bx}
                        y={y + 4}
                        fontSize="10"
                        textAnchor="middle"
                        fill="oklch(0.46 0.055 253)"
                        className="fohat-mono"
                      >
                        {LAYERS[i].tag.toUpperCase()}
                      </text>
                      <circle cx="260" cy={y} r="6" fill="oklch(0.22 0.023 250)" />
                      <circle cx="260" cy={y} r="10" fill="none" stroke="oklch(0.85 0.055 245 / 0.6)" />
                    </g>
                  );
                })}

                {/* dispositivos e serviços conectados nas pontas */}
                <g stroke="oklch(0.46 0.055 253 / 0.25)" fill="none">
                  <rect x="20" y="20" width="60" height="24" rx="4" />
                  <rect x="440" y="20" width="60" height="24" rx="4" />
                  <rect x="20" y="476" width="60" height="24" rx="4" />
                  <rect x="440" y="476" width="60" height="24" rx="4" />
                </g>
                {[
                  { x1: 80, y1: 32, x2: 210, y2: 60 },
                  { x1: 440, y1: 32, x2: 310, y2: 60 },
                  { x1: 80, y1: 488, x2: 210, y2: 460 },
                  { x1: 440, y1: 488, x2: 310, y2: 460 },
                ].map((l, i) => (
                  <line
                    key={i}
                    {...l}
                    stroke="oklch(0.46 0.055 253 / 0.35)"
                    strokeDasharray="3 5"
                  />
                ))}
              </svg>
            </div>
          </SectionReveal>

          {/* Camadas detalhadas */}
          <ol className="space-y-3">
            {LAYERS.map((l, i) => (
              <SectionReveal
                as="li"
                key={l.n}
                delay={i * 60}
                className="grid grid-cols-[auto_1fr] items-start gap-4 rounded-2xl border border-line bg-white p-5"
              >
                <span className="fohat-mono flex h-10 w-10 items-center justify-center rounded-lg bg-ice text-[11px] font-bold text-blue">
                  {l.n}
                </span>
                <div>
                  <div className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-blue">
                    {l.tag}
                  </div>
                  <div className="mt-1 text-base font-bold tracking-tight">
                    {l.title}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{l.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
