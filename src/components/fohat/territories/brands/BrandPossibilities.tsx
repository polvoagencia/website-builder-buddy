import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { BRANDS } from "@/data/presence-territories-content";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { cn } from "@/lib/utils";

/**
 * Marcas · Possibilidades — painel interativo (tabs) representando
 * seis formas diferentes de participação. Navegação por clique e teclado.
 * Desktop: seletor lateral + painel visual dinâmico.
 * Mobile: accordion vertical.
 */
export function BrandPossibilities() {
  const items = BRANDS.possibilities;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (active < 0 || active >= items.length) setActive(0);
  }, [active, items.length]);

  const focusTab = (i: number) => {
    const idx = (i + items.length) % items.length;
    setActive(idx);
    tabRefs.current[idx]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        focusTab(i + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        focusTab(i - 1);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(items.length - 1);
        break;
    }
  };

  const current = items[active];

  return (
    <section
      id="possibilidades"
      aria-labelledby="brands-poss-title"
      className="relative overflow-hidden bg-white py-24 lg:py-32"
    >
      <div className="fohat-shell">
        <SectionReveal className="mb-14 max-w-[720px]">
          <span className="fohat-eyebrow">Possibilidades</span>
          <h2 id="brands-poss-title" className="fohat-h2 mt-5">
            Cada possibilidade é uma forma diferente de participação.
          </h2>
          <p className="fohat-lead mt-5">
            As soluções abaixo são pontos de partida, não produtos fechados.
          </p>
        </SectionReveal>

        {/* Desktop: tablist + panel */}
        <div className="hidden gap-10 lg:grid lg:grid-cols-[minmax(280px,340px)_1fr]">
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Formas de participação"
            className="flex flex-col gap-1 border-l border-line"
          >
            {items.map((it, i) => (
              <button
                key={it.key}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`brands-tab-${it.key}`}
                role="tab"
                type="button"
                aria-selected={active === i}
                aria-controls="brands-poss-panel"
                tabIndex={active === i ? 0 : -1}
                onKeyDown={(e) => onKey(e, i)}
                onClick={() => setActive(i)}
                className={cn(
                  "group -ml-px flex items-start gap-4 border-l-2 py-5 pl-6 text-left transition-all",
                  active === i
                    ? "border-blue bg-mist"
                    : "border-transparent hover:border-blue/40 hover:bg-mist/60",
                )}
              >
                <span
                  className={cn(
                    "fohat-mono mt-0.5 text-[10px] uppercase tracking-[0.2em]",
                    active === i ? "text-blue" : "text-steel",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span
                    className={cn(
                      "block text-base font-bold tracking-tight",
                      active === i ? "text-navy" : "text-navy/75",
                    )}
                  >
                    {it.title}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div
            id="brands-poss-panel"
            role="tabpanel"
            aria-labelledby={`brands-tab-${current.key}`}
            className="relative overflow-hidden rounded-[28px] border border-line bg-mist p-10"
          >
            <PossibilityVisual index={active} />
            <div className="relative">
              <span className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-blue">
                Possibilidade · {String(active + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-navy">
                {current.title}
              </h3>
              <p className="mt-4 max-w-[520px] text-base text-muted-foreground">
                {current.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: accordion */}
        <ul className="flex flex-col gap-2 lg:hidden">
          {items.map((it, i) => {
            const open = active === i;
            return (
              <li key={it.key} className="overflow-hidden rounded-2xl border border-line bg-mist">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`brands-acc-${it.key}`}
                  onClick={() => setActive(open ? -1 : i)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left"
                >
                  <span className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-blue">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-base font-bold text-navy">
                    {it.title}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "h-2 w-2 rounded-full bg-blue transition-transform",
                      open && "scale-150",
                    )}
                  />
                </button>
                {open && (
                  <div
                    id={`brands-acc-${it.key}`}
                    className="border-t border-line px-5 py-4 text-sm text-muted-foreground"
                  >
                    {it.desc}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Visual procedural distinto para cada possibilidade. */
function PossibilityVisual({ index }: { index: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 220"
      className="pointer-events-none absolute inset-x-0 top-0 h-40 w-full opacity-90"
    >
      <defs>
        <linearGradient id="pv-grad" x1="0" x2="1">
          <stop offset="0%" stopColor="oklch(0.46 0.055 253)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="oklch(0.85 0.055 245)" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {Array.from({ length: 12 }).map((_, i) => (
        <rect
          key={i}
          x={40 + i * 42}
          y={40 + ((i + index) % 5) * 10}
          width="2"
          height={40 + ((i * 7 + index * 11) % 80)}
          fill="url(#pv-grad)"
        />
      ))}
    </svg>
  );
}
