import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

/**
 * Referência curta e compartilhada para a página-mãe da Engenharia de Presença.
 * Substitui a duplicação de Método FOHAT, pilares e fórmula em cada território.
 */
export function TerritoryMethodReference() {
  return (
    <section
      aria-label="Referência à Engenharia de Presença"
      className="border-y border-line bg-mist py-8"
    >
      <div className="fohat-shell flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[640px] text-sm text-muted-foreground">
          <span className="fohat-mono mr-2 text-[10px] uppercase tracking-[0.18em] text-blue">
            Referência
          </span>
          Este território é atendido por meio da Engenharia de Presença da FOHAT.
        </p>
        <Link
          to="/engenharia-de-presenca"
          className="group inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-blue"
        >
          Entenda como funciona
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
}
