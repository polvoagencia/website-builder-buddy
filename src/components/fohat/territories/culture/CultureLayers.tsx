import { CULTURE } from "@/data/presence-territories-content";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";

/**
 * Cultura · Camadas — composição de camadas empilhadas.
 * Cada camada revela um modo diferente de relação com o conteúdo.
 */
export function CultureLayers() {
  const { title, body, items } = CULTURE.layers;

  return (
    <section
      id="camadas"
      aria-labelledby="culture-layers-title"
      className="relative overflow-hidden bg-mist py-24 lg:py-32"
    >
      <div className="fohat-shell grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <SectionReveal>
          <span className="fohat-eyebrow">Camadas</span>
          <h2 id="culture-layers-title" className="fohat-h2 mt-5">
            {title}
          </h2>
          <p className="fohat-lead mt-6 max-w-[520px]">{body}</p>
        </SectionReveal>

        <SectionReveal delay={140}>
          <ul aria-label="Modos de relação com o conteúdo cultural" className="relative space-y-3">
            {items.map((it, i) => (
              <li
                key={it.label}
                className="group relative overflow-hidden rounded-2xl border border-navy/10 bg-white p-6 shadow-[0_10px_30px_oklch(0.22_0.023_250_/_0.05)] transition-all hover:-translate-y-0.5"
                style={{ marginLeft: `${i * 14}px` }}
              >
                <div className="flex items-baseline gap-5">
                  <span className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-blue">
                    Camada {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xl font-bold tracking-[-0.02em] text-navy">{it.label}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{it.note}</p>
                <div
                  aria-hidden
                  className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-blue/50 to-cyan/50 opacity-70"
                />
              </li>
            ))}
          </ul>
        </SectionReveal>
      </div>
    </section>
  );
}
