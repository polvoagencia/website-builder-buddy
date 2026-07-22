import { SectionReveal } from "@/components/fohat/motion/SectionReveal";

/**
 * ProductFlow — representações conceituais e neutras de superfícies de produto.
 * Nenhum dado real, nenhum nome de cliente, nenhuma métrica. Cada peça é
 * marcada como "Representação visual".
 */
export function ProductFlow() {
  return (
    <section
      id="interfaces"
      aria-labelledby="interfaces-heading"
      className="relative overflow-hidden bg-navy py-24 text-white lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-40" />
      <div className="fohat-shell relative">
        <SectionReveal className="mb-14 max-w-[820px]">
          <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
            Superfícies de produto
          </span>
          <h2 id="interfaces-heading" className="fohat-h2 mt-5 text-white">
            Cada camada da operação ganha uma interface própria.
          </h2>
          <p className="fohat-lead mt-5 text-[oklch(0.85_0.02_250)]">
            Painéis, aplicativos, integrações e automações — representados aqui
            em estado neutro, sem números fictícios.
          </p>
        </SectionReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Panel title="Dashboard" state="operacional">
            <svg viewBox="0 0 200 120" aria-hidden className="mt-3 h-24 w-full">
              <rect x="0" y="0" width="60" height="30" rx="4" fill="oklch(1 0 0 / 0.08)" />
              <rect x="70" y="0" width="60" height="30" rx="4" fill="oklch(1 0 0 / 0.08)" />
              <rect x="140" y="0" width="60" height="30" rx="4" fill="oklch(1 0 0 / 0.08)" />
              <polyline
                points="0,100 30,80 60,90 90,60 120,72 150,40 180,55 200,32"
                fill="none"
                stroke="oklch(0.85 0.14 210)"
                strokeWidth="1.6"
              />
              <polyline
                points="0,110 30,100 60,102 90,90 120,94 150,80 180,84 200,72"
                fill="none"
                stroke="oklch(0.7 0.15 250)"
                strokeWidth="1.2"
                strokeDasharray="2 3"
              />
            </svg>
          </Panel>

          <Panel title="Aplicativo" state="sincronizando">
            <div className="mx-auto mt-3 w-24 overflow-hidden rounded-xl border border-white/15 bg-white/[0.04]">
              <div className="border-b border-white/10 py-1">
                <div className="mx-auto h-1 w-6 rounded-full bg-white/30" />
              </div>
              <div className="space-y-1.5 p-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded bg-cyan/40" />
                    <div className="flex-1 space-y-0.5">
                      <div className="h-0.5 w-full rounded-full bg-white/40" />
                      <div className="h-0.5 w-2/3 rounded-full bg-white/20" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          <Panel title="Integração" state="ativa">
            <svg viewBox="0 0 200 120" aria-hidden className="mt-3 h-24 w-full">
              <rect x="10" y="30" width="50" height="30" rx="4" fill="oklch(1 0 0 / 0.08)" stroke="oklch(1 0 0 / 0.15)" />
              <rect x="140" y="30" width="50" height="30" rx="4" fill="oklch(1 0 0 / 0.08)" stroke="oklch(1 0 0 / 0.15)" />
              <rect x="75" y="70" width="50" height="30" rx="4" fill="oklch(1 0 0 / 0.08)" stroke="oklch(1 0 0 / 0.15)" />
              <path d="M60 45 L140 45" stroke="oklch(0.85 0.14 210)" strokeDasharray="3 3" />
              <path d="M35 60 L100 70" stroke="oklch(0.85 0.14 210)" strokeDasharray="3 3" />
              <path d="M165 60 L125 70" stroke="oklch(0.85 0.14 210)" strokeDasharray="3 3" />
              <circle cx="100" cy="45" r="3" fill="oklch(0.85 0.14 210)">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </Panel>

          <Panel title="Automação" state="processando">
            <svg viewBox="0 0 200 120" aria-hidden className="mt-3 h-24 w-full">
              {[0, 1, 2, 3].map((i) => (
                <g key={i}>
                  <circle cx={30 + i * 45} cy="60" r="7" fill="oklch(1 0 0 / 0.08)" stroke="oklch(0.85 0.14 210 / 0.6)" />
                  <text x={30 + i * 45} y="63" fontSize="6" textAnchor="middle" fill="oklch(0.85 0.14 210)" className="fohat-mono">
                    {String(i + 1).padStart(2, "0")}
                  </text>
                  {i < 3 && (
                    <path d={`M${37 + i * 45} 60 L${68 + i * 45} 60`} stroke="oklch(0.85 0.14 210 / 0.6)" strokeDasharray="2 2" />
                  )}
                </g>
              ))}
              <text x="100" y="30" fontSize="7" textAnchor="middle" fill="oklch(1 0 0 / 0.6)" className="fohat-mono">
                FLUXO EM EXECUÇÃO
              </text>
            </svg>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function Panel({
  title,
  state,
  children,
}: {
  title: string;
  state: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-2xl border border-white/12 bg-white/[0.03] p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-bold tracking-tight text-white">{title}</div>
        <span className="fohat-mono inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.06] px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-cyan">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
          {state}
        </span>
      </div>
      {children}
      <div className="fohat-mono mt-3 text-[9px] uppercase tracking-[0.22em] text-white/40">
        Representação visual
      </div>
    </div>
  );
}
