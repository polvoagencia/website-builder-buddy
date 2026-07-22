import { useRef, useState, type KeyboardEvent } from "react";
import { BRANDS } from "@/data/presence-territories-content";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { cn } from "@/lib/utils";

const PANEL_ID = "brands-formats-panel";

/**
 * Marcas · Formatos — três portas de entrada.
 * Seletor com painel expansível. Deixa claro que não são etapas obrigatórias.
 */
export function BrandDeliveryModels() {
  const formats = BRANDS.formats;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (i: number) => {
    const idx = (i + formats.length) % formats.length;
    setActive(idx);
    tabRefs.current[idx]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        focusTab(i + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        focusTab(i - 1);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(formats.length - 1);
        break;
    }
  };

  return (
    <section
      id="formatos"
      aria-labelledby="brands-formats-title"
      className="relative overflow-hidden bg-white py-24 lg:py-32"
    >
      <div className="fohat-shell">
        <SectionReveal className="mb-14 max-w-[820px]">
          <span className="fohat-eyebrow">Formatos</span>
          <h2 id="brands-formats-title" className="fohat-h2 mt-5">
            Três portas de entrada possíveis
          </h2>
          <p className="fohat-lead mt-5">
            Cada formato é uma forma independente de começar. A contratação não precisa passar
            obrigatoriamente pelos três.
          </p>
        </SectionReveal>

        <div
          role="tablist"
          aria-label="Formatos de contratação"
          className="grid gap-3 md:grid-cols-3"
        >
          {formats.map((f, i) => {
            const open = active === i;
            return (
              <button
                key={f.title}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`brands-format-tab-${i}`}
                role="tab"
                aria-selected={open}
                aria-controls={PANEL_ID}
                tabIndex={open ? 0 : -1}
                onKeyDown={(e) => onKey(e, i)}
                onClick={() => setActive(i)}
                type="button"
                className={cn(
                  "group rounded-3xl border p-6 text-left transition-all",
                  open
                    ? "border-navy bg-navy text-white shadow-[var(--shadow-card)]"
                    : "border-line bg-mist hover:border-blue/40 hover:-translate-y-0.5",
                )}
              >
                <span
                  className={cn(
                    "fohat-mono text-[10px] uppercase tracking-[0.22em]",
                    open ? "text-cyan" : "text-blue",
                  )}
                >
                  Porta {String(i + 1).padStart(2, "0")} · {f.tag}
                </span>
                <h3
                  className={cn(
                    "mt-4 text-xl font-bold tracking-tight",
                    open ? "text-white" : "text-navy",
                  )}
                >
                  {f.title}
                </h3>
                <div
                  aria-hidden
                  className={cn(
                    "mt-5 h-1 rounded-full transition-all",
                    open ? "bg-cyan" : "bg-blue/30 group-hover:bg-blue/60",
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Painel único de detalhe */}
        <div
          id={PANEL_ID}
          role="tabpanel"
          aria-labelledby={`brands-format-tab-${active}`}
          className="mt-6 rounded-3xl border border-line bg-mist p-8 md:p-10"
        >
          <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:items-center">
            <div>
              <span className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-blue">
                {formats[active].tag}
              </span>
              <h3 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-navy">
                {formats[active].title}
              </h3>
            </div>
            <p className="text-base text-muted-foreground">{formats[active].desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
