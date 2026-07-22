import { Reveal } from "@/components/fohat/Reveal";
import { RENTAL_DIFFERENTIALS } from "@/data/rental-content";

/**
 * Diferenciais consolidados em duas áreas:
 *  - área principal com a tese "hardware + software + operação";
 *  - módulos de apoio conectados à tese central.
 */
export function RentalDifferentials() {
  return (
    <section
      id="diferenciais"
      className="relative overflow-hidden py-20 lg:py-28"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.97 0.008 250), oklch(0.93 0.015 250))",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-70"
      />
      <div className="fohat-shell relative">
        <Reveal className="max-w-[880px]">
          <span className="fohat-eyebrow">Diferenciais</span>
          <h2 className="fohat-h2 mt-5">
            Mais do que entregar equipamentos
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-10">
          {/* Área principal — tese */}
          <Reveal className="relative rounded-3xl border border-navy/15 bg-navy p-8 text-white sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-40"
            />
            <div className="relative">
              <span
                className="fohat-eyebrow"
                style={{ color: "var(--color-cyan)" }}
              >
                Tese
              </span>
              <div className="fohat-mono mt-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-cyan/80">
                <span className="rounded-full border border-cyan/40 px-3 py-1">
                  Hardware
                </span>
                <span aria-hidden>+</span>
                <span className="rounded-full border border-cyan/40 px-3 py-1">
                  Software
                </span>
                <span aria-hidden>+</span>
                <span className="rounded-full border border-cyan/40 px-3 py-1">
                  Operação
                </span>
              </div>
              <p className="mt-6 text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl">
                A FOHAT não apenas entrega equipamentos. Ela entende como eles
                precisam funcionar dentro da operação.
              </p>
              <p className="mt-4 text-sm text-[oklch(0.85_0.02_250)]">
                Cada equipamento é pensado como parte de um sistema: conteúdo,
                integração, presença técnica e logística fazem parte do
                escopo.
              </p>
            </div>
          </Reveal>

          {/* Módulos de apoio */}
          <div className="grid gap-3 sm:grid-cols-2">
            {RENTAL_DIFFERENTIALS.map((d, i) => (
              <Reveal
                as="article"
                key={d.title}
                delay={i * 60}
                className="rounded-2xl border border-line bg-white p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="fohat-mono mt-0.5 text-[10px] tabular-nums tracking-[0.16em] text-blue">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold tracking-tight text-navy">
                      {d.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {d.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
