import { useRef, useState } from "react";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { PARTNERS_MODELS } from "@/data/partners-content";
import { cn } from "@/lib/utils";

export function CollaborationModels() {
  const { eyebrow, title, axes, models, note } = PARTNERS_MODELS;
  const [active, setActive] = useState(0);
  const safe = Math.min(Math.max(active, 0), models.length - 1);
  const activeModel = models[safe];
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusIdx = (i: number) => {
    const next = (i + models.length) % models.length;
    setActive(next);
    btnRefs.current[next]?.focus();
  };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const map: Record<string, number> = {
      ArrowRight: i + 1,
      ArrowDown: i + 1,
      ArrowLeft: i - 1,
      ArrowUp: i - 1,
      Home: 0,
      End: models.length - 1,
    };
    if (e.key in map) {
      e.preventDefault();
      focusIdx(map[e.key]);
    }
  };

  return (
    <section id="modelos" className="bg-mist py-20 lg:py-28">
      <div className="fohat-shell">
        <SectionReveal className="max-w-3xl">
          <span className="fohat-eyebrow text-blue">{eyebrow}</span>
          <h2 className="fohat-h2 mt-4 text-navy">{title}</h2>
        </SectionReveal>

        <SectionReveal className="mt-12" delay={100}>
          {/* Desktop matrix */}
          <div className="hidden lg:grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div
              className="relative rounded-[32px] border border-line bg-white p-8"
              role="tablist"
              aria-label="Modelos de atuação"
            >
              <div className="flex items-center justify-between">
                <span className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-steel">
                  {axes.y.label}: {axes.y.max}
                </span>
              </div>
              <div className="relative mx-auto mt-4 aspect-square w-full max-w-[420px]">
                {/* axes */}
                <div className="absolute inset-x-6 top-1/2 h-px bg-line" aria-hidden />
                <div className="absolute inset-y-6 left-1/2 w-px bg-line" aria-hidden />
                {/* quadrant labels */}
                <div className="absolute inset-0">
                  {models.map((m, i) => {
                    const isActive = i === safe;
                    return (
                      <button
                        key={m.id}
                        ref={(el) => { btnRefs.current[i] = el; }}
                        type="button"
                        role="tab"
                        id={`model-tab-${m.id}`}
                        aria-selected={isActive}
                        aria-controls="model-panel"
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => setActive(i)}
                        onKeyDown={(e) => onKey(e, i)}
                        style={{
                          left: `${m.x * 100}%`,
                          top: `${(1 - m.y) * 100}%`,
                        }}
                        className={cn(
                          "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                          isActive
                            ? "border-navy bg-navy text-white shadow-[0_10px_30px_oklch(0_0_0_/_0.18)]"
                            : "border-line bg-white text-navy hover:border-blue/60",
                        )}
                      >
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-steel">
                  {axes.x.min}
                </span>
                <span className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-steel">
                  {axes.x.label}: {axes.x.max}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-steel">
                  {axes.y.min}
                </span>
                <span />
              </div>
            </div>

            <div
              role="tabpanel"
              id="model-panel"
              aria-labelledby={`model-tab-${activeModel.id}`}
              className="rounded-3xl border border-line bg-white p-8"
            >
              <span className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-blue">
                Modelo ativo
              </span>
              <h3 className="fohat-h3 mt-3 text-navy">{activeModel.label}</h3>
              <p className="mt-4 text-base text-muted-foreground">
                {activeModel.desc}
              </p>
            </div>
          </div>

          {/* Mobile: sequential list */}
          <ul className="grid gap-3 lg:hidden">
            {models.map((m) => (
              <li
                key={m.id}
                className="rounded-3xl border border-line bg-white p-5"
              >
                <h3 className="text-base font-semibold text-navy">{m.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.desc}</p>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-3xl text-sm text-muted-foreground">{note}</p>
        </SectionReveal>
      </div>
    </section>
  );
}
