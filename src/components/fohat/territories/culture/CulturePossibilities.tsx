import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { CULTURE } from "@/data/presence-territories-content";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { cn } from "@/lib/utils";

/**
 * Cultura · Possibilidades — mosaico editorial.
 * Desktop: variação de escala em uma composição semelhante a acervo,
 *          seleção acessível por teclado.
 * Mobile: sequência vertical confortável.
 */
export function CulturePossibilities() {
  const items = CULTURE.possibilities;
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (active < 0 || active >= items.length) setActive(0);
  }, [active, items.length]);

  const focusIdx = (i: number) => {
    const idx = (i + items.length) % items.length;
    setActive(idx);
    refs.current[idx]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        focusIdx(i + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        focusIdx(i - 1);
        break;
      case "Home":
        e.preventDefault();
        focusIdx(0);
        break;
      case "End":
        e.preventDefault();
        focusIdx(items.length - 1);
        break;
    }
  };

  // Layout de acervo com variação de escala (row/col span) — apenas visual.
  const spans = [
    "md:col-span-3 md:row-span-2",
    "md:col-span-3",
    "md:col-span-2",
    "md:col-span-2 md:row-span-2",
    "md:col-span-2",
    "md:col-span-2",
  ];

  return (
    <section
      id="possibilidades"
      aria-labelledby="culture-poss-title"
      className="relative overflow-hidden bg-white py-24 lg:py-32"
    >
      <div className="fohat-shell">
        <SectionReveal className="mb-14 max-w-[720px]">
          <span className="fohat-eyebrow">Possibilidades</span>
          <h2 id="culture-poss-title" className="fohat-h2 mt-5">
            Novas portas para histórias que precisam permanecer vivas
          </h2>
          <p className="fohat-lead mt-5">
            Cada projeto respeita o conteúdo, o território e o público ao qual pertence.
          </p>
        </SectionReveal>

        <div
          role="tablist"
          aria-label="Possibilidades culturais"
          aria-orientation="horizontal"
          className="grid grid-cols-1 gap-3 md:auto-rows-[140px] md:grid-cols-6"
        >
          {items.map((it, i) => {
            const open = active === i;
            return (
              <button
                key={it.key}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                role="tab"
                type="button"
                aria-selected={open}
                aria-controls="culture-poss-panel"
                id={`culture-poss-tab-${it.key}`}
                tabIndex={open ? 0 : -1}
                onKeyDown={(e) => onKey(e, i)}
                onClick={() => setActive(i)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border p-5 text-left transition-all",
                  spans[i],
                  open
                    ? "border-navy bg-navy text-white shadow-[var(--shadow-card)]"
                    : "border-navy/10 bg-mist hover:border-blue/40",
                )}
              >
                <span
                  className={cn(
                    "fohat-mono text-[10px] uppercase tracking-[0.22em]",
                    open ? "text-cyan" : "text-blue",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className={cn(
                    "mt-3 text-lg font-bold tracking-[-0.02em]",
                    open ? "text-white" : "text-navy",
                  )}
                >
                  {it.title}
                </h3>
                {/* linhas decorativas */}
                <svg
                  aria-hidden
                  viewBox="0 0 100 40"
                  className={cn(
                    "absolute bottom-3 right-3 h-8 w-24 opacity-40 transition-opacity",
                    open ? "opacity-70" : "opacity-30",
                  )}
                >
                  {[0, 8, 16, 24, 32].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="100"
                      y2={y}
                      stroke={open ? "oklch(0.85 0.055 245)" : "oklch(0.46 0.055 253)"}
                      strokeWidth="0.5"
                      strokeDasharray={`${i + 2} ${i + 4}`}
                    />
                  ))}
                </svg>
              </button>
            );
          })}
        </div>

        <div
          id="culture-poss-panel"
          role="tabpanel"
          aria-labelledby={`culture-poss-tab-${items[active].key}`}
          className="mt-6 rounded-2xl border border-line bg-mist p-8 md:p-10"
        >
          <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:items-center">
            <div>
              <span className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-blue">
                Possibilidade · {String(active + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-navy">
                {items[active].title}
              </h3>
            </div>
            <p className="text-base text-muted-foreground">{items[active].desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
