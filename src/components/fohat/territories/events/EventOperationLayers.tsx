import { EVENTS } from "@/data/presence-territories-content";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";

/**
 * Eventos · Operação — quatro camadas que precisam funcionar juntas.
 * Representação empilhada, sem inventar SLA nem quantidades.
 */
export function EventOperationLayers() {
  const { message, layers } = EVENTS.operation;
  return (
    <section
      id="operacao"
      aria-labelledby="events-op-title"
      className="relative overflow-hidden bg-navy py-24 text-white lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-50"
      />
      <div className="fohat-shell relative">
        <SectionReveal className="max-w-[820px]">
          <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
            Operação
          </span>
          <h2 id="events-op-title" className="fohat-h2 mt-5 text-white">
            {message}
          </h2>
        </SectionReveal>

        <ol aria-label="Camadas de operação" className="mt-14 flex flex-col gap-3">
          {layers.map((l, i) => (
            <SectionReveal
              key={l.title}
              as="li"
              delay={i * 100}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
            >
              <div className="grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-center">
                <span className="fohat-mono flex h-10 w-10 items-center justify-center rounded-full border border-cyan/40 text-[11px] tracking-[0.14em] text-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-cyan">
                    Camada · {l.pillar}
                  </div>
                  <h3 className="mt-2 text-xl font-bold tracking-tight text-white">{l.title}</h3>
                  <p className="mt-2 max-w-[720px] text-sm text-[oklch(0.82_0.02_250)]">{l.desc}</p>
                </div>
                <div
                  aria-hidden
                  className="hidden h-16 w-1 rounded-full bg-gradient-to-b from-cyan/60 to-cyan/10 md:block"
                />
              </div>
            </SectionReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
