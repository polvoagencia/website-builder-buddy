import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { RentalRequestDialog } from "@/components/fohat/RentalRequestDialog";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Barra contextual mobile. Aparece somente entre o início do catálogo e
 * o início do bloco de solicitação — nos dois sentidos de rolagem.
 * Some enquanto o formulário estiver aberto. Respeita safe-area.
 */
const HEADER_OFFSET = 96;

export function RentalMobileBar() {
  const [pastCatalog, setPastCatalog] = useState(false);
  const [pastSolicitar, setPastSolicitar] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const catalogo = document.getElementById("catalogo");
    const solicitar = document.getElementById("solicitar");
    if (!catalogo || !solicitar) return;

    const catObs = new IntersectionObserver(
      ([entry]) => {
        setPastCatalog(
          entry.isIntersecting || entry.boundingClientRect.top <= HEADER_OFFSET,
        );
      },
      { rootMargin: `-${HEADER_OFFSET}px 0px 0px 0px`, threshold: [0, 1] },
    );
    const solObs = new IntersectionObserver(
      ([entry]) => {
        setPastSolicitar(
          entry.isIntersecting || entry.boundingClientRect.top <= HEADER_OFFSET,
        );
      },
      { rootMargin: `-${HEADER_OFFSET}px 0px 0px 0px`, threshold: [0, 1] },
    );

    catObs.observe(catalogo);
    solObs.observe(solicitar);
    return () => {
      catObs.disconnect();
      solObs.disconnect();
    };
  }, []);

  const visible = pastCatalog && !pastSolicitar && !dialogOpen;

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
            <RentalRequestDialog
              sourcePage="/locacao-de-equipamentos"
              onOpenChange={setDialogOpen}
            >
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

{/* Mount RentalRequestDialog even when bar hidden so the dialog can stay open?
    Not needed — dialog closes before bar unmounts (dialogOpen=false first). */}
