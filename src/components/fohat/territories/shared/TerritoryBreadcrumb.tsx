import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; to?: string };

/**
 * Breadcrumb técnico reutilizado nos três heros de território.
 * Fica visualmente coerente com o eyebrow monoespaçado da marca.
 */
export function TerritoryBreadcrumb({
  items,
  tone = "light",
}: {
  items: readonly Crumb[];
  tone?: "light" | "dark";
}) {
  const linkTone = tone === "dark" ? "text-cyan hover:text-white" : "text-blue hover:text-navy";
  const currentTone = tone === "dark" ? "text-white/75" : "text-navy/70";
  return (
    <nav
      aria-label="Você está aqui"
      className="fohat-mono flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em]"
    >
      {items.map((c, i) => (
        <span key={`${c.label}-${i}`} className="inline-flex items-center gap-2">
          {c.to ? (
            <Link to={c.to} className={`transition-colors ${linkTone}`}>
              {c.label}
            </Link>
          ) : (
            <span className={currentTone}>{c.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight className="h-3 w-3 opacity-50" />}
        </span>
      ))}
    </nav>
  );
}
