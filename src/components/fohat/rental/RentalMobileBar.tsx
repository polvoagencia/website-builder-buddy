import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { RentalRequestDialog } from "@/components/fohat/RentalRequestDialog";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Barra contextual mobile. Aparece somente quando o usuário está entre
 * o catálogo e o CTA final — nunca sobre o hero, nunca sobre o
 * bloco de solicitação. Respeita safe-area do dispositivo.
 */
export function RentalMobileBar() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const catalogo = document.getElementById("catalogo");
    const solicitar = document.getElementById("solicitar");
    if (!catalogo || !solicitar) return;

    let show = false;
    let showSolicitar = false;

    const catObs = new IntersectionObserver(
      ([entry]) => {
        // once user has entered the catalog area, keep it enabled
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          show = true;
          setVisible(show && !showSolicitar);
        }
      },
      { rootMargin: "0px 0px -70% 0px" },
    );
    const solObs = new IntersectionObserver(
      ([entry]) => {
        showSolicitar = entry.isIntersecting;
        setVisible(show && !showSolicitar);
      },
      { rootMargin: "0px 0px -20% 0px" },
    );

    catObs.observe(catalogo);
    solObs.observe(solicitar);
    return () => {
      catObs.disconnect();
      solObs.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: reduced ? 0 : 0.22, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          role="region"
          aria-label="Ações de locação"
        >
          <div className="mx-3 mb-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-navy/95 p-3 shadow-[0_20px_50px_oklch(0_0_0_/_0.35)] backdrop-blur-md">
            <div className="min-w-0 flex-1">
              <div className="fohat-mono text-[9px] uppercase tracking-[0.18em] text-cyan/90">
                Locação · Catálogo
              </div>
              <div className="truncate text-xs font-bold text-white">
                Sujeito a disponibilidade
              </div>
            </div>
            <RentalRequestDialog sourcePage="/locacao-de-equipamentos">
              <button className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-white px-4 text-[11px] font-bold uppercase tracking-[0.14em] text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan">
                Solicitar
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </RentalRequestDialog>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
