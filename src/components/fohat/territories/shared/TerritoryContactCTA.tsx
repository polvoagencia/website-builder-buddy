import { type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { ContactDialog } from "@/components/fohat/ContactDialog";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";

/**
 * CTA final compartilhado entre os três territórios.
 * A composição visual (background) muda por prop `tone` para refletir
 * a temperatura de cada território, mas o fluxo de contato é único.
 */
type Tone = "brands" | "culture" | "events";

export function TerritoryContactCTA({
  id = "contato",
  title,
  buttonLabel,
  tone,
  visual,
  sourcePage,
}: {
  id?: string;
  title: ReactNode;
  buttonLabel: string;
  tone: Tone;
  visual?: ReactNode;
  sourcePage?: string;
}) {
  const backgrounds: Record<Tone, string> = {
    brands:
      "linear-gradient(135deg, oklch(0.22 0.023 250) 0%, oklch(0.28 0.05 260) 55%, oklch(0.34 0.07 268) 100%)",
    culture:
      "linear-gradient(135deg, oklch(0.22 0.023 250) 0%, oklch(0.26 0.02 245) 55%, oklch(0.3 0.028 240) 100%)",
    events:
      "linear-gradient(135deg, oklch(0.22 0.023 250) 0%, oklch(0.26 0.028 250) 50%, oklch(0.24 0.04 210) 100%)",
  };

  return (
    <section id={id} className="overflow-hidden bg-white py-20 lg:py-28">
      <div className="fohat-shell">
        <SectionReveal className="relative overflow-hidden rounded-[38px] p-10 text-white sm:p-16">
          <div aria-hidden className="absolute inset-0" style={{ background: backgrounds[tone] }} />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-50"
          />
          {visual}
          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
                Vamos conversar
              </span>
              <h2 className="fohat-h2 mt-5 max-w-[720px] text-white">{title}</h2>
            </div>
            <div className="flex lg:justify-end">
              <ContactDialog sourcePage={sourcePage} sourceCta={buttonLabel}>
                <button
                  type="button"
                  className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-navy shadow-[0_14px_40px_oklch(0_0_0_/_0.28)] transition-all hover:-translate-y-0.5 hover:bg-cyan"
                >
                  {buttonLabel}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </ContactDialog>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
