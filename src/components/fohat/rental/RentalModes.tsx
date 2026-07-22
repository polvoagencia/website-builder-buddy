import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";

import { Reveal } from "@/components/fohat/Reveal";
import { RENTAL_MODES } from "@/data/rental-content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const PANEL_ID = "rental-modes-panel";

/**
 * Cinco formatos de contratação, consolidados em uma única seção.
 * Desktop: lista vertical com painel de detalhe animado.
 * Mobile: accordion sempre com um item ativo.
 * Sem sugerir que todos os formatos estejam disponíveis para todos
 * os equipamentos.
 */
export function RentalModes() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const current = RENTAL_MODES[active];
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (index: number) => {
    setActive(index);
    tabRefs.current[index]?.focus();
  };

  return (
    <section id="formatos" className="bg-white py-20 lg:py-28">
      <div className="fohat-shell">
        <Reveal className="max-w-[880px]">
          <span className="fohat-eyebrow">Formatos de contratação</span>
          <h2 className="fohat-h2 mt-5">
            Como a FOHAT pode participar da operação
          </h2>
          <p className="mt-5 text-muted-foreground">
            Cinco possibilidades combinadas de acordo com o equipamento,
            localidade, período e escopo aprovado. Elas não representam uma
            progressão obrigatória.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-10">
          {/* Seletor */}
          <div
            role="tablist"
            aria-label="Formatos de contratação"
            className="flex flex-col divide-y divide-line rounded-2xl border border-line bg-mist"
          >
            {RENTAL_MODES.map((m, i) => {
              const isActive = i === active;
              return (
                <button
                  key={m.slug}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`mode-tab-${m.slug}`}
                  aria-selected={isActive}
                  aria-controls={PANEL_ID}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                      e.preventDefault();
                      focusTab((i + 1) % RENTAL_MODES.length);
                    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                      e.preventDefault();
                      focusTab(
                        (i - 1 + RENTAL_MODES.length) % RENTAL_MODES.length,
                      );
                    } else if (e.key === "Home") {
                      e.preventDefault();
                      focusTab(0);
                    } else if (e.key === "End") {
                      e.preventDefault();
                      focusTab(RENTAL_MODES.length - 1);
                    }
                  }}
                  className={`group flex items-start gap-4 px-5 py-4 text-left transition-colors focus:outline-none focus-visible:bg-white ${
                    isActive ? "bg-white" : "hover:bg-white/60"
                  }`}
                >
                  <span
                    className={`fohat-mono mt-1 text-[10px] tabular-nums tracking-[0.16em] transition-colors ${
                      isActive ? "text-blue" : "text-steel"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span
                      className={`block text-sm font-bold tracking-tight transition-colors ${
                        isActive ? "text-navy" : "text-navy/80"
                      }`}
                    >
                      {m.title}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {m.short}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={`mt-1 block h-[2px] rounded-full bg-navy transition-all ${
                      isActive ? "w-8 opacity-100" : "w-3 opacity-30"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Painel */}
          <div
            role="tabpanel"
            id={PANEL_ID}
            aria-labelledby={`mode-tab-${current.slug}`}
            className="relative min-h-[280px] rounded-2xl border border-line bg-mist p-8 sm:p-10"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.slug}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: reduced ? 0 : 0.28, ease: "easeOut" }}
              >
                <div className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-blue">
                  Formato {String(active + 1).padStart(2, "0")} de{" "}
                  {String(RENTAL_MODES.length).padStart(2, "0")}
                </div>
                <h3 className="mt-4 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                  {current.title}
                </h3>
                <p className="mt-4 text-base text-muted-foreground">
                  {current.description}
                </p>

                <div className="mt-8 flex items-start gap-3 rounded-xl border border-line bg-white/70 p-4">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" aria-hidden />
                  <p className="fohat-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-steel">
                    Formatos sujeitos ao equipamento, localidade, período,
                    logística e escopo aprovado.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
