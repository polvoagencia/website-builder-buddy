import { useEffect, useRef, useState } from "react";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { PARTNERS_ENTRY } from "@/data/partners-content";
import { cn } from "@/lib/utils";

export function PartnershipEntryPoints() {
  const { eyebrow, title, intro, points } = PARTNERS_ENTRY;
  const [active, setActive] = useState(0);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const safeActive = Math.min(Math.max(active, 0), points.length - 1);
  const activePoint = points[safeActive];

  const focusTab = (i: number) => {
    const next = (i + points.length) % points.length;
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
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
        focusTab(points.length - 1);
        break;
    }
  };

  return (
    <section id="entradas" className="bg-white py-20 lg:py-28">
      <div className="fohat-shell">
        <SectionReveal className="max-w-3xl">
          <span className="fohat-eyebrow text-blue">{eyebrow}</span>
          <h2 className="fohat-h2 mt-4 text-navy">{title}</h2>
          <p className="mt-5 text-lg text-muted-foreground">{intro}</p>
        </SectionReveal>

        <SectionReveal className="mt-12" delay={100}>
          {/* Desktop: map with independent points */}
          <div className="hidden lg:block">
            <div
              role="tablist"
              aria-label="Pontos de entrada da parceria"
              className="relative overflow-hidden rounded-[32px] border border-line bg-mist p-8"
            >
              <EntryMap
                points={points}
                activeIndex={safeActive}
                onSelect={setActive}
                onKey={onKey}
                registerRef={(el, i) => (tabsRef.current[i] = el)}
              />
              <div
                role="tabpanel"
                id="entries-panel"
                aria-labelledby={`entry-tab-${activePoint.id}`}
                className="relative mt-10 grid gap-4 rounded-3xl border border-line bg-white p-8 sm:grid-cols-[auto_1fr] sm:items-baseline"
              >
                <span className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-blue">
                  Ponto ativo
                </span>
                <div>
                  <h3 className="fohat-h3 text-navy">{activePoint.label}</h3>
                  <p className="mt-3 text-base text-muted-foreground">
                    {activePoint.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile / tablet: vertical accordion-like list */}
          <div className="lg:hidden" role="tablist" aria-orientation="vertical" aria-label="Pontos de entrada da parceria">
            <ul className="space-y-3">
              {points.map((p, i) => {
                const isActive = i === safeActive;
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      role="tab"
                      id={`entry-tab-m-${p.id}`}
                      aria-selected={isActive}
                      aria-controls={`entry-panel-m-${p.id}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActive(i)}
                      onKeyDown={(e) => onKey(e, i)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-colors",
                        isActive
                          ? "border-navy bg-navy text-white"
                          : "border-line bg-white text-navy",
                      )}
                    >
                      <span className="text-sm font-semibold">{p.label}</span>
                      <span className="fohat-mono text-[10px] uppercase tracking-[0.18em] opacity-70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </button>
                    {isActive && (
                      <div
                        role="tabpanel"
                        id={`entry-panel-m-${p.id}`}
                        aria-labelledby={`entry-tab-m-${p.id}`}
                        className="mt-2 rounded-2xl border border-line bg-mist px-4 py-3 text-sm text-muted-foreground"
                      >
                        {p.desc}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function EntryMap({
  points,
  activeIndex,
  onSelect,
  onKey,
  registerRef,
}: {
  points: typeof PARTNERS_ENTRY.points;
  activeIndex: number;
  onSelect: (i: number) => void;
  onKey: (e: React.KeyboardEvent, i: number) => void;
  registerRef: (el: HTMLButtonElement | null, i: number) => void;
}) {
  const [width, setWidth] = useState(960);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setWidth(e.contentRect.width);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const positions = points.map((_, i) => {
    const step = (width - 80) / (points.length - 1);
    return { x: 40 + step * i, y: i % 2 === 0 ? 70 : 130 };
  });

  return (
    <div ref={ref} className="relative">
      <svg viewBox={`0 0 ${width} 200`} className="w-full" aria-hidden>
        <line
          x1="40"
          y1="100"
          x2={width - 40}
          y2="100"
          stroke="oklch(0.55 0.14 245)"
          strokeOpacity="0.25"
          strokeWidth="1"
        />
        {positions.map((pos, i) => (
          <line
            key={i}
            x1={pos.x}
            y1="100"
            x2={pos.x}
            y2={pos.y}
            stroke="oklch(0.55 0.14 245)"
            strokeOpacity="0.35"
            strokeDasharray="2 3"
          />
        ))}
      </svg>
      <div className="absolute inset-0">
        {points.map((p, i) => {
          const pos = positions[i];
          const isActive = i === activeIndex;
          return (
            <button
              key={p.id}
              ref={(el) => registerRef(el, i)}
              type="button"
              role="tab"
              id={`entry-tab-${p.id}`}
              aria-selected={isActive}
              aria-controls="entries-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSelect(i)}
              onKeyDown={(e) => onKey(e, i)}
              style={{
                left: `${(pos.x / width) * 100}%`,
                top: `${(pos.y / 200) * 100}%`,
              }}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-mist",
                isActive
                  ? "border-navy bg-navy text-white shadow-[0_10px_30px_oklch(0_0_0_/_0.18)]"
                  : "border-line bg-white text-navy hover:border-blue/50",
              )}
            >
              {p.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
