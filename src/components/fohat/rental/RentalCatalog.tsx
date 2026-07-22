import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { Reveal } from "@/components/fohat/Reveal";
import { RentalEquipmentCard } from "@/components/fohat/RentalEquipmentCard";
import { RentalFilterBar } from "./RentalFilterBar";
import {
  RENTAL_CATALOG_ITEMS,
  RENTAL_FILTERS,
  type RentalFilterSlug,
} from "@/data/rental-equipment";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Bloco central da página. Abertura clara + barra sticky de filtros +
 * grid responsivo (1/2/3 colunas). Transição curta entre filtros;
 * sob reduced motion a troca é imediata.
 */
export function RentalCatalog() {
  const [filter, setFilter] = useState<RentalFilterSlug>("todos");
  const reduced = useReducedMotion();

  const availableFilters = useMemo(() => {
    const active = new Set(RENTAL_CATALOG_ITEMS.map((it) => it.filter));
    return RENTAL_FILTERS.filter((f) => f.slug === "todos" || active.has(f.slug as never));
  }, []);

  const items = useMemo(() => {
    if (filter === "todos") return RENTAL_CATALOG_ITEMS;
    return RENTAL_CATALOG_ITEMS.filter((it) => it.filter === filter);
  }, [filter]);

  return (
    <section
      id="catalogo"
      className="relative overflow-hidden py-20 lg:py-28"
      style={{
        background: "linear-gradient(180deg, oklch(0.97 0.008 250), oklch(0.94 0.014 250))",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-70" />

      <div className="fohat-shell relative">
        <Reveal className="mb-8 max-w-[900px]">
          <span className="fohat-eyebrow">Catálogo</span>
          <h2 className="fohat-h2 mt-5">Equipamentos disponíveis para locação</h2>
          <p className="mt-5 text-muted-foreground">
            Conheça as categorias de equipamentos que podem compor sua operação. Modelos,
            quantidades, configurações e disponibilidade são confirmados conforme cada projeto.
          </p>
        </Reveal>

        <RentalFilterBar
          filters={availableFilters}
          active={filter}
          onChange={setFilter}
          count={items.length}
        />

        <p aria-live="polite" className="sr-only">
          {`Exibindo ${items.length} ${items.length === 1 ? "equipamento" : "equipamentos"}.`}
        </p>

        <div
          id="rental-catalog-panel"
          role="tabpanel"
          aria-labelledby={`rental-filter-${filter}`}
          className="mt-6"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={filter}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: reduced ? 0 : 0.22, ease: "easeOut" }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {items.map((item, i) => (
                <RentalEquipmentCard
                  key={item.slug}
                  item={item}
                  anchorId={item.slug}
                  eager={i === 0}
                  sourcePage="/locacao-de-equipamentos"
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="fohat-mono mt-10 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Nenhum item é apresentado como disponível em estoque sem confirmação. Marcas, modelos e
          especificações são confirmados pela equipe comercial.
        </p>
      </div>
    </section>
  );
}
