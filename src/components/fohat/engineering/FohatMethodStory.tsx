import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { METHOD } from "@/data/engineering-presence";
import { cn } from "@/lib/utils";

/**
 * FohatMethodStory — seção sticky do Método FOHAT.
 * Desktop: painel sticky com letra gigante, metáfora visual e indicador
 * lateral F O H A T navegável por clique e teclado.
 * Mobile: sequência vertical simples, sem sticky, cada etapa acessível.
 */
export function FohatMethodStory() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Detecta o passo ativo via IntersectionObserver (sem listener global de scroll)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof IntersectionObserver === "undefined") return;
    const els = stepRefs.current.filter((el): el is HTMLDivElement => !!el);
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => ({
            i: stepRefs.current.indexOf(e.target as HTMLDivElement),
            ratio: e.intersectionRatio,
          }))
          .filter((v) => v.i >= 0)
          .sort((a, b) => b.ratio - a.ratio);
        if (visible.length > 0) {
          const next = visible[0].i;
          setActive((prev) => (prev === next ? prev : next));
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.5, 1] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = (i: number) => {
    setActive(i);
    stepRefs.current[i]?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
    });
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = Math.min(METHOD.length - 1, i + 1);
      tabRefs.current[next]?.focus();
      goTo(next);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = Math.max(0, i - 1);
      tabRefs.current[prev]?.focus();
      goTo(prev);
    } else if (e.key === "Home") {
      e.preventDefault();
      tabRefs.current[0]?.focus();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      tabRefs.current[METHOD.length - 1]?.focus();
      goTo(METHOD.length - 1);
    }
  };

  return (
    <section
      id="metodo"
      aria-labelledby="metodo-heading"
      className="relative overflow-hidden bg-white py-24 lg:py-32"
    >
      <div className="fohat-shell">
        <SectionReveal className="mb-16 max-w-[820px]">
          <span className="fohat-eyebrow">Método FOHAT</span>
          <h2 id="metodo-heading" className="fohat-h2 mt-5">
            A presença não acontece por acaso. Ela é projetada.
          </h2>
          <p className="fohat-lead mt-5">
            Cinco etapas conectam intenção, tecnologia e execução até a experiência encontrar o
            público.
          </p>
        </SectionReveal>

        <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* Indicador FOHAT — desktop sticky */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <div
                role="tablist"
                aria-label="Etapas do Método FOHAT"
                aria-orientation="vertical"
                className="flex flex-col gap-2"
              >
                {METHOD.map((s, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={s.letter}
                      ref={(el) => {
                        tabRefs.current[i] = el;
                      }}
                      id={`method-tab-${s.letter}`}
                      role="tab"
                      type="button"
                      aria-selected={isActive}
                      aria-controls="method-tabpanel"
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => goTo(i)}
                      onKeyDown={(e) => onKeyDown(e, i)}
                      className={cn(
                        "group flex items-center gap-4 rounded-2xl border px-4 py-3 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2",
                        isActive ? "border-blue/40 bg-ice" : "border-transparent hover:border-line",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-xl text-lg font-extrabold transition-colors",
                          isActive ? "bg-navy text-white" : "bg-mist text-blue",
                        )}
                      >
                        {s.letter}
                      </span>
                      <span className="text-sm font-bold tracking-tight">{s.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Corpo — desktop: painel sticky com metáfora + steps invisíveis medindo scroll */}
          <div className="relative">
            {/* Painel sticky visível apenas em desktop */}
            <div className="hidden lg:block">
              <div className="sticky top-32">
                <div
                  role="tabpanel"
                  id="method-tabpanel"
                  aria-labelledby={`method-tab-${METHOD[active].letter}`}
                  className="relative overflow-hidden rounded-[28px] border border-line bg-mist p-10 min-h-[420px]"
                >
                  <MethodMetaphor index={active} />
                  <div className="relative">
                    <div className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-blue">
                      Etapa {String(active + 1).padStart(2, "0")} · {METHOD[active].letter}
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active}
                        initial={reduce ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                      >
                        <h3 className="mt-4 text-3xl font-bold tracking-tight text-navy">
                          {METHOD[active].title}
                        </h3>
                        <p className="mt-4 max-w-lg text-base text-muted-foreground">
                          {METHOD[active].desc}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              {/* âncoras invisíveis para dirigir o scroll */}
              <div aria-hidden="true">
                {METHOD.map((_, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      stepRefs.current[i] = el;
                    }}
                    className="h-[70vh]"
                  />
                ))}
              </div>
            </div>

            {/* Mobile / tablet — sequência vertical clara, sem sticky */}
            <ol className="space-y-6 lg:hidden">
              {METHOD.map((s, i) => (
                <li
                  key={s.letter}
                  className="relative overflow-hidden rounded-2xl border border-line bg-mist p-6"
                >
                  <div className="flex items-start gap-5">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-navy text-2xl font-extrabold text-white">
                      {s.letter}
                    </span>
                    <div>
                      <div className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-blue">
                        Etapa {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="mt-1 text-lg font-bold tracking-tight">{s.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- Metáforas visuais por etapa (SVG procedural) -------- */
function MethodMetaphor({ index }: { index: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 200"
      className="pointer-events-none absolute right-6 top-6 h-40 w-64 opacity-60"
    >
      <defs>
        <linearGradient id="mm-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.46 0.055 253)" />
          <stop offset="100%" stopColor="oklch(0.85 0.055 245)" />
        </linearGradient>
      </defs>
      {index === 0 && (
        <g stroke="url(#mm-g)" strokeWidth="1" fill="none">
          <circle cx="200" cy="100" r="4" fill="oklch(0.46 0.055 253)" />
          <line x1="200" y1="100" x2="60" y2="30" />
          <line x1="200" y1="100" x2="340" y2="30" />
          <line x1="200" y1="100" x2="60" y2="170" />
          <line x1="200" y1="100" x2="340" y2="170" />
        </g>
      )}
      {index === 1 && (
        <g stroke="url(#mm-g)" strokeWidth="1" fill="none">
          {[40, 80, 120, 160].map((y) => (
            <path key={y} d={`M20 ${y} Q200 ${y - 30} 380 ${y}`} />
          ))}
        </g>
      )}
      {index === 2 && (
        <g stroke="url(#mm-g)" strokeWidth="1" fill="none">
          <rect x="30" y="30" width="140" height="140" rx="12" />
          <circle cx="280" cy="100" r="42" />
          <line x1="170" y1="100" x2="238" y2="100" strokeDasharray="4 4" />
        </g>
      )}
      {index === 3 && (
        <g stroke="url(#mm-g)" strokeWidth="1" fill="none">
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1={40 + i * 44} y1="30" x2={40 + i * 44} y2="170" />
          ))}
          <path d="M20 100 Q200 60 380 100" strokeWidth="1.5" />
        </g>
      )}
      {index === 4 && (
        <g stroke="url(#mm-g)" strokeWidth="1" fill="none">
          {[0, 30, 60, 90, 120].map((o) => (
            <circle key={o} cx="200" cy="100" r={20 + o} opacity={1 - o / 200} />
          ))}
        </g>
      )}
    </svg>
  );
}
