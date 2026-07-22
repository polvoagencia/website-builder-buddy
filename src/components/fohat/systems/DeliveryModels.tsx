import { SectionReveal } from "@/components/fohat/motion/SectionReveal";

/**
 * DeliveryModels — três níveis de profundidade de contratação.
 * Progressão visual (não obrigatoriedade). Cada nível ganha um tratamento
 * gráfico distinto para não parecer 3 cards iguais.
 */
const MODELS = [
  {
    depth: 1,
    tag: "Entrada",
    title: "Discovery técnico",
    desc: "Estudo de viabilidade, arquitetura e escopo antes do desenvolvimento.",
    items: ["Entendimento do problema", "Viabilidade técnica", "Arquitetura preliminar", "Escopo"],
  },
  {
    depth: 2,
    tag: "Validação",
    title: "MVP funcional",
    desc: "Primeira versão utilizável para validar hipóteses e valor real.",
    items: [
      "Primeira versão utilizável",
      "Validação com usuários",
      "Aprendizado técnico",
      "Direção para o produto",
    ],
  },
  {
    depth: 3,
    tag: "Contínuo",
    title: "Produto e evolução",
    desc: "Desenvolvimento contínuo, suporte, monitoramento e novas funcionalidades.",
    items: ["Novas funcionalidades", "Suporte", "Monitoramento", "Evolução contínua"],
  },
];

export function DeliveryModels() {
  return (
    <section
      id="formas"
      aria-labelledby="formas-heading"
      className="relative overflow-hidden bg-mist py-24 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-50" />
      <div className="fohat-shell relative">
        <SectionReveal className="mb-14 max-w-[820px]">
          <span className="fohat-eyebrow">Formas de contratação</span>
          <h2 id="formas-heading" className="fohat-h2 mt-5">
            Três profundidades — não uma escada obrigatória.
          </h2>
          <p className="fohat-lead mt-5">
            Cada projeto começa onde faz sentido. Nem todos passam por todas as camadas.
          </p>
        </SectionReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {MODELS.map((m, i) => (
            <SectionReveal
              as="article"
              key={m.title}
              delay={i * 80}
              className="relative overflow-hidden rounded-[28px] border border-line bg-white p-8"
            >
              {/* Indicador visual de profundidade */}
              <div className="mb-6 flex items-center gap-1.5" aria-hidden>
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className={
                      "block h-1.5 rounded-full transition-all " +
                      (d < m.depth ? "w-8 bg-blue" : "w-4 bg-line")
                    }
                  />
                ))}
                <span className="fohat-mono ml-2 text-[10px] uppercase tracking-[0.22em] text-blue">
                  Profundidade {m.depth} · {m.tag}
                </span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight">{m.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{m.desc}</p>

              <ul className="mt-6 space-y-2">
                {m.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-sm text-navy">
                    <span
                      aria-hidden
                      className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-blue"
                    />
                    {it}
                  </li>
                ))}
              </ul>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
