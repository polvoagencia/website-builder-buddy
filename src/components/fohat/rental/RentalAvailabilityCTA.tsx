import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/fohat/Reveal";
import { RentalRequestDialog } from "@/components/fohat/RentalRequestDialog";
import { ContactDialog } from "@/components/fohat/ContactDialog";

/**
 * Único fechamento da página. Consolida o antigo bloco inline
 * `#solicitar` e o CTA final.
 */
export function RentalAvailabilityCTA() {
  return (
    <section id="solicitar" className="bg-white py-20 lg:py-28">
      <div className="fohat-shell">
        <Reveal className="relative mx-auto max-w-[1000px] overflow-hidden rounded-[38px] bg-navy p-10 text-white sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-40"
          />
          <div className="relative">
            <span
              className="fohat-eyebrow"
              style={{ color: "var(--color-cyan)" }}
            >
              Solicite disponibilidade
            </span>
            <h2 className="fohat-h2 mt-5 max-w-[820px] text-white">
              Conte quais equipamentos você precisa e como será o projeto.
            </h2>
            <p className="mt-5 max-w-[720px] text-[oklch(0.85_0.02_250)]">
              A equipe da FOHAT avaliará disponibilidade, configuração,
              período, logística e suporte necessário.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <RentalRequestDialog sourcePage="/locacao-de-equipamentos">
                <button className="group inline-flex h-13 items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-bold text-navy shadow-[0_14px_40px_oklch(0_0_0_/_0.2)] transition-all hover:-translate-y-0.5 hover:bg-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan">
                  Abrir solicitação de locação
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </RentalRequestDialog>
              <ContactDialog>
                <button className="group inline-flex h-13 items-center gap-3 rounded-full border border-white/28 bg-white/[0.06] px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition-all hover:border-cyan hover:text-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan">
                  Falar com a FOHAT
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </ContactDialog>
            </div>

            <p className="fohat-mono mt-10 max-w-[720px] text-[11px] uppercase leading-relaxed tracking-[0.16em] text-white/60">
              O envio da solicitação não confirma reserva. Disponibilidade,
              valores, logística e escopo técnico serão confirmados pela
              equipe da FOHAT.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
