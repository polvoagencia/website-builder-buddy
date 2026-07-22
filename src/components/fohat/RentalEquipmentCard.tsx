import { useState } from "react";
import { ArrowUpRight, Check, Eye } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RentalRequestDialog } from "@/components/fohat/RentalRequestDialog";
import type { RentalCatalogItem } from "@/data/rental-equipment";

interface RentalEquipmentCardProps {
  item: RentalCatalogItem;
  eager?: boolean;
  variant?: "full" | "compact";
  anchorId?: string;
  sourcePage?: string;
}

export function RentalEquipmentCard({
  item,
  eager = false,
  variant = "full",
  anchorId,
  sourcePage,
}: RentalEquipmentCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const usesPreview = item.uses.slice(0, 3);
  const sourceCta = `Consultar disponibilidade · ${item.name}`;

  return (
    <article
      id={anchorId}
      className="group/card scroll-mt-28 flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue/40 hover:shadow-[var(--shadow-card)] focus-within:ring-2 focus-within:ring-blue/40"
    >
      {/* Imagem */}
      <button
        type="button"
        onClick={() => setDetailsOpen(true)}
        aria-label={`Ver detalhes de ${item.name}`}
        className="relative block w-full overflow-hidden bg-mist focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
        style={{ aspectRatio: "4 / 3" }}
      >
        <img
          src={item.image}
          alt={item.imageAlt}
          width={1200}
          height={900}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.03] motion-reduce:transform-none"
        />
        {item.illustrativeImage && (
          <span className="fohat-mono absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-navy backdrop-blur-sm">
            Imagem ilustrativa
          </span>
        )}
        <span className="fohat-mono absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-navy/90 px-3 py-1 text-[9px] uppercase tracking-[0.16em] text-white opacity-0 transition-opacity group-hover/card:opacity-100">
          <Eye className="h-3 w-3" /> Ver detalhes
        </span>
      </button>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col p-6">
        <div className="fohat-mono text-[10px] uppercase tracking-[0.18em] text-blue">
          {item.category}
        </div>
        <h3 className="mt-3 text-lg font-bold tracking-tight text-navy">{item.name}</h3>
        <p className="mt-3 text-sm text-muted-foreground">{item.shortDescription}</p>

        {variant === "full" && (
          <ul className="mt-5 space-y-1.5">
            {usesPreview.map((u) => (
              <li key={u} className="flex items-start gap-2 text-sm text-navy">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue" />
                <span>{u}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-6">
          <div className="mb-4 flex items-center justify-between border-t border-line pt-4">
            <span className="fohat-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Sujeito a disponibilidade
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setDetailsOpen(true)}
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-navy/15 bg-white px-4 text-xs font-bold uppercase tracking-[0.14em] text-navy transition-colors hover:border-blue hover:text-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
            >
              Ver detalhes
            </button>
            <RentalRequestDialog
              defaultEquipment={item.defaultFormOption}
              sourcePage={sourcePage}
              sourceCta={sourceCta}
            >
              <button
                type="button"
                className="group/btn inline-flex h-10 items-center gap-1.5 rounded-full bg-navy px-4 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-all hover:bg-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
              >
                Consultar disponibilidade
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </RentalRequestDialog>
          </div>
        </div>
      </div>

      {/* Detalhes */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent
          className="max-h-[92vh] overflow-y-auto rounded-3xl border-line bg-card p-0 sm:max-w-3xl"
          aria-describedby={`rental-desc-${item.slug}`}
        >
          <div
            className="relative w-full overflow-hidden bg-mist"
            style={{ aspectRatio: "16 / 9" }}
          >
            <img
              src={item.image}
              alt={item.imageAlt}
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            {item.illustrativeImage && (
              <span className="fohat-mono absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-navy backdrop-blur-sm">
                Imagem ilustrativa
              </span>
            )}
          </div>

          <div className="p-6 sm:p-10">
            <DialogHeader className="space-y-3 text-left">
              <span className="fohat-eyebrow">{item.category}</span>
              <DialogTitle className="fohat-h2 text-3xl sm:text-4xl">{item.name}</DialogTitle>
              <DialogDescription
                id={`rental-desc-${item.slug}`}
                className="text-base text-muted-foreground"
              >
                {item.fullDescription}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-8">
              <div className="fohat-mono mb-3 text-[11px] uppercase tracking-[0.18em] text-blue">
                Possibilidades de uso
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {item.uses.map((u) => (
                  <li key={u} className="flex items-start gap-2 text-sm text-navy">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <RentalRequestDialog
                defaultEquipment={item.defaultFormOption}
                sourcePage={sourcePage}
                sourceCta={sourceCta}
              >
                <button
                  type="button"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-navy px-6 text-sm font-bold text-primary-foreground shadow-[var(--shadow-cta)] transition-all hover:-translate-y-0.5 hover:bg-blue"
                >
                  Consultar disponibilidade
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </RentalRequestDialog>
              <span className="fohat-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Sujeito a disponibilidade
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}
