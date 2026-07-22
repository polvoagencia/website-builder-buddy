import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { EVENTS } from "@/data/presence-territories-content";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Eventos · Resposta do ambiente — um espaço abstrato que muda conforme
 * o estado ativo. Cinco estados: vazio, aproximação, reconhecimento,
 * ativação, continuidade. Navegação acessível por clique e teclado.
 */
export function ResponsiveSpace() {
  const { quote, states } = EVENTS.responsive;
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (active < 0 || active >= states.length) setActive(0);
  }, [active, states.length]);

  const focusIdx = (i: number) => {
    const idx = (i + states.length) % states.length;
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
        focusIdx(states.length - 1);
        break;
    }
  };

  const intensity = active / (states.length - 1);

  return (
    <section
      id="resposta"
      aria-labelledby="events-responsive-title"
      className="relative overflow-hidden bg-mist py-24 lg:py-32"
    >
      <div className="fohat-shell">
        <SectionReveal className="max-w-[840px]">
          <span className="fohat-eyebrow">Resposta do ambiente</span>
          <h2
            id="events-responsive-title"
            className="fohat-h2 mt-5 text-navy [font-size:clamp(1.8rem,3.4vw,3rem)]"
          >
            {quote}
          </h2>
        </SectionReveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-stretch">
          {/* Visualização do ambiente */}
          <div
            id="events-responsive-panel"
            role="tabpanel"
            aria-labelledby={`events-state-tab-${active}`}
            className="relative aspect-[16/10] overflow-hidden rounded-[28px] border border-navy/10 bg-navy p-6 text-white"
            style={{
              background: `radial-gradient(circle at ${20 + intensity * 60}% ${50}%, oklch(0.5 0.12 220 / ${0.15 + intensity * 0.45}), oklch(0.22 0.023 250))`,
              transition: reduced ? "none" : "background 700ms var(--ease-reveal)",
            }}
          >
            <div aria-hidden className="absolute inset-0 fohat-grid-bg-dark opacity-40" />
            <svg aria-hidden viewBox="0 0 400 250" className="relative h-full w-full">
              {/* piso */}
              <rect
                x="10"
                y="10"
                width="380"
                height="230"
                fill="none"
                stroke="oklch(0.85 0.055 245 / 0.3)"
                strokeWidth="1"
                rx="8"
              />
              {/* pontos de interação */}
              {[[80, 80], [200, 60], [320, 100], [140, 180], [280, 180]].map(
                ([x, y], i) => {
                  const on = i / 5 <= intensity;
                  return (
                    <g key={i}>
                      <circle
                        cx={x}
                        cy={y}
                        r={on ? 14 : 6}
                        fill={on ? "oklch(0.85 0.055 245 / 0.25)" : "transparent"}
                        stroke="oklch(0.85 0.055 245)"
                        strokeWidth="1"
                        style={{
                          transition: reduced
                            ? "none"
                            : "r 400ms var(--ease-reveal), fill 400ms",
                        }}
                      />
                      <circle cx={x} cy={y} r="2" fill="oklch(0.85 0.055 245)" />
                    </g>
                  );
                },
              )}
              {/* trajetos ativos */}
              <path
                d="M 20 220 Q 100 190 200 60 T 380 100"
                fill="none"
                stroke="oklch(0.85 0.055 245)"
                strokeWidth="1"
                strokeDasharray="3 5"
                opacity={0.3 + intensity * 0.6}
              />
            </svg>
            <div className="fohat-mono absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.22em] text-cyan">
              Estado · {String(active + 1).padStart(2, "0")} · {states[active].label}
            </div>
          </div>

          {/* Tablist de estados */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Estados do ambiente"
            className="flex flex-col gap-1"
          >
            {states.map((s, i) => {
              const open = active === i;
              return (
                <button
                  key={s.label}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  id={`events-state-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={open}
                  aria-controls="events-responsive-panel"
                  tabIndex={open ? 0 : -1}
                  onKeyDown={(e) => onKey(e, i)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group flex flex-col items-start gap-1 rounded-2xl border p-5 text-left transition-all",
                    open
                      ? "border-navy bg-white shadow-[var(--shadow-card)]"
                      : "border-line bg-white/50 hover:border-blue/40",
                  )}
                >
                  <span
                    className={cn(
                      "fohat-mono text-[10px] uppercase tracking-[0.22em]",
                      open ? "text-blue" : "text-steel",
                    )}
                  >
                    Estado {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "text-lg font-bold tracking-[-0.02em]",
                      open ? "text-navy" : "text-navy/75",
                    )}
                  >
                    {s.label}
                  </span>
                  <span className="text-sm text-muted-foreground">{s.desc}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
