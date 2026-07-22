import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { EVENTS } from "@/data/presence-territories-content";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { cn } from "@/lib/utils";

/**
 * Eventos · Possibilidades — mapa de zonas dentro de um espaço abstrato.
 * Cada possibilidade ocupa uma região do diagrama.
 * Desktop: mapa clicável + painel de detalhe.
 * Mobile: lista vertical acessível (o mapa fica oculto para não virar miniatura).
 */
export function EventPossibilities() {
  const items = EVENTS.possibilities;
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

  // Coordenadas dentro do "espaço" 100x100 (percentual) — zonas distribuídas.
  const zones = [
    { x: 12, y: 65, w: 22, h: 22 }, // estandes
    { x: 40, y: 20, w: 30, h: 28 }, // ambientes imersivos
    { x: 78, y: 60, w: 16, h: 18 }, // totens
    { x: 6, y: 15, w: 20, h: 20 }, // credenciamento
    { x: 44, y: 66, w: 22, h: 22 }, // votação
    { x: 74, y: 22, w: 22, h: 22 }, // entrega
  ];

  return (
    <section
      id="possibilidades"
      aria-labelledby="events-poss-title"
      className="relative overflow-hidden bg-mist py-24 lg:py-32"
    >
      <div className="fohat-shell">
        <SectionReveal className="mb-14 max-w-[720px]">
          <span className="fohat-eyebrow">Possibilidades</span>
          <h2 id="events-poss-title" className="fohat-h2 mt-5">
            Módulos e zonas dentro de um espaço
          </h2>
          <p className="fohat-lead mt-5">
            As experiências podem ser temporárias, itinerantes ou permanentes.
          </p>
        </SectionReveal>

        {/* Desktop: mapa + detalhe */}
        <div className="hidden gap-8 lg:grid lg:grid-cols-[1.2fr_1fr]">
          <div
            aria-hidden="false"
            role="tablist"
            aria-label="Zonas de possibilidades em um espaço"
            aria-orientation="horizontal"
            className="relative aspect-[5/4] overflow-hidden rounded-[28px] border border-navy/10 bg-white p-4"
          >
            {/* grid de fundo */}
            <div className="absolute inset-0 fohat-grid-bg opacity-70" aria-hidden />
            {items.map((it, i) => {
              const z = zones[i];
              const open = active === i;
              return (
                <button
                  key={it.key}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`events-poss-tab-${it.key}`}
                  aria-selected={open}
                  aria-controls="events-poss-panel"
                  tabIndex={open ? 0 : -1}
                  onKeyDown={(e) => onKey(e, i)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "absolute rounded-md border text-left transition-all focus:outline-none",
                    open
                      ? "z-10 border-navy bg-navy text-white shadow-[var(--shadow-card)]"
                      : "border-blue/30 bg-white/80 text-navy hover:border-blue focus-visible:border-blue",
                  )}
                  style={{
                    left: `${z.x}%`,
                    top: `${z.y}%`,
                    width: `${z.w}%`,
                    height: `${z.h}%`,
                  }}
                >
                  <div className="flex h-full flex-col justify-between p-3">
                    <span
                      className={cn(
                        "fohat-mono text-[9px] uppercase tracking-[0.2em]",
                        open ? "text-cyan" : "text-blue",
                      )}
                    >
                      Zona {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[13px] font-bold leading-tight">{it.title}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div
            id="events-poss-panel"
            role="tabpanel"
            aria-labelledby={`events-poss-tab-${items[active].key}`}
            className="rounded-[28px] border border-line bg-white p-8 md:p-10"
          >
            <span className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-blue">
              Zona · {String(active + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-navy">
              {items[active].title}
            </h3>
            <p className="mt-4 text-base text-muted-foreground">{items[active].desc}</p>
          </div>
        </div>

        {/* Mobile: lista vertical */}
        <ul className="flex flex-col gap-2 lg:hidden">
          {items.map((it, i) => (
            <li key={it.key} className="rounded-2xl border border-navy/10 bg-white p-5">
              <div className="flex items-baseline gap-3">
                <span className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-blue">
                  Zona {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-bold text-navy">{it.title}</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
