import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { RentalFilterSlug } from "@/data/rental-equipment";

type Filter = { slug: RentalFilterSlug; label: string };

interface Props {
  filters: Filter[];
  active: RentalFilterSlug;
  onChange: (slug: RentalFilterSlug) => void;
  count: number;
}

/**
 * Barra de filtros sticky do catálogo. Tabs com roving tabIndex,
 * navegação por setas / Home / End, rolagem horizontal no mobile.
 */
export function RentalFilterBar({ filters, active, onChange, count }: Props) {
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndex = Math.max(
    0,
    filters.findIndex((f) => f.slug === active),
  );

  useEffect(() => {
    btnRefs.current = btnRefs.current.slice(0, filters.length);
  }, [filters.length]);

  const focusAt = (idx: number) => {
    const n = filters.length;
    const i = ((idx % n) + n) % n;
    onChange(filters[i].slug);
    // move DOM focus so keyboard users track the active tab
    requestAnimationFrame(() => btnRefs.current[i]?.focus());
  };

  return (
    <div
      className={cn(
        "sticky top-[76px] z-30 -mx-4 px-4 py-3 sm:mx-0 sm:px-0",
      )}
    >
      <div className="rounded-2xl border border-line/70 bg-white/85 px-3 py-2 shadow-[0_8px_30px_oklch(0.22_0.023_250_/_0.08)] backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div
            role="tablist"
            aria-label="Filtrar equipamentos por categoria"
            className="-mx-1 flex flex-1 items-center gap-1.5 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ scrollSnapType: "x proximity" }}
          >
            {filters.map((f, i) => {
              const isActive = f.slug === active;
              return (
                <button
                  key={f.slug}
                  ref={(el) => {
                    btnRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`rental-filter-${f.slug}`}
                  aria-selected={isActive}
                  aria-controls="rental-catalog-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => onChange(f.slug)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") {
                      e.preventDefault();
                      focusAt(activeIndex + 1);
                    } else if (e.key === "ArrowLeft") {
                      e.preventDefault();
                      focusAt(activeIndex - 1);
                    } else if (e.key === "Home") {
                      e.preventDefault();
                      focusAt(0);
                    } else if (e.key === "End") {
                      e.preventDefault();
                      focusAt(filters.length - 1);
                    }
                  }}
                  style={{ scrollSnapAlign: "start" }}
                  className={cn(
                    "fohat-mono h-9 shrink-0 rounded-full border px-4 text-[11px] uppercase tracking-[0.16em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue",
                    isActive
                      ? "border-navy bg-navy text-white"
                      : "border-line bg-white text-navy hover:border-blue hover:text-blue",
                  )}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <div
            aria-live="polite"
            className="fohat-mono hidden shrink-0 whitespace-nowrap rounded-full border border-line px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-steel sm:block"
          >
            {count} {count === 1 ? "item" : "itens"}
          </div>
        </div>
      </div>
    </div>
  );
}
