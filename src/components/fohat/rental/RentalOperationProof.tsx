import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/fohat/Reveal";

/**
 * Prova compacta de capacidade operacional usando dados confirmados
 * do case Tela Brasil. Nenhum número novo, nenhuma fotografia.
 */
export function RentalOperationProof() {
  const stack = [
    "Impressoras",
    "Notebooks",
    "Totens",
    "Televisões",
    "Tablets",
    "Câmeras com IA",
    "Suporte técnico",
  ];

  return (
    <section id="capacidade" className="bg-white py-20 lg:py-28">
      <div className="fohat-shell">
        <Reveal className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <span className="fohat-eyebrow">Infraestrutura em funcionamento</span>
            <h2 className="fohat-h2 mt-5 max-w-[640px]">
              Dois kits tecnológicos operando simultaneamente em uma operação nacional.
            </h2>
            <p className="mt-6 max-w-[620px] text-muted-foreground">
              No Tela Brasil, a FOHAT estruturou equipamentos, sistemas, impressão, monitoramento e
              suporte técnico para duas capitais simultâneas em cada ciclo operacional.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {stack.map((s) => (
                <span
                  key={s}
                  className="fohat-mono rounded-full border border-line bg-mist px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-navy"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <Link
                to="/engenharia-de-presenca/projetos/$slug"
                params={{ slug: "tela-brasil" }}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-navy px-5 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
              >
                Conheça o case
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Diagrama procedural: 2 kits simultâneos */}
          <div aria-hidden className="relative rounded-3xl border border-line bg-mist p-6 sm:p-8">
            <div className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-blue">
              Kits simultâneos · Diagrama
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[1, 2].map((k) => (
                <div key={k} className="rounded-2xl border border-navy/15 bg-white p-4">
                  <div className="fohat-mono text-[9px] uppercase tracking-[0.18em] text-steel">
                    Kit {String(k).padStart(2, "0")}
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-1.5">
                    {Array.from({ length: 9 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="aspect-square rounded-sm border border-navy/10 bg-mist"
                        style={{
                          background:
                            idx % 3 === 0
                              ? "var(--color-navy)"
                              : idx % 4 === 0
                                ? "var(--color-cyan)"
                                : undefined,
                          opacity: idx % 3 === 0 ? 0.9 : 1,
                        }}
                      />
                    ))}
                  </div>
                  <div className="fohat-mono mt-3 text-[9px] uppercase tracking-[0.16em] text-navy">
                    Capital simultânea
                  </div>
                </div>
              ))}
            </div>
            <div className="fohat-mono mt-6 text-center text-[10px] uppercase tracking-[0.18em] text-steel">
              Estrutura replicada em cada ciclo operacional
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
