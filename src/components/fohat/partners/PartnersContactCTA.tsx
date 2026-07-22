import { ArrowUpRight } from "lucide-react";
import { ContactDialog } from "@/components/fohat/ContactDialog";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { PARTNERS_CTA } from "@/data/partners-content";

export function PartnersContactCTA() {
  const { title, intro, buttonLabel } = PARTNERS_CTA;

  return (
    <section id="contato" className="overflow-hidden bg-white py-20 lg:py-28">
      <div className="fohat-shell">
        <SectionReveal className="relative overflow-hidden rounded-[38px] p-10 text-white sm:p-16">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.22 0.023 250) 0%, oklch(0.26 0.04 240) 55%, oklch(0.3 0.06 220) 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-50"
          />
          {/* decorative bridge */}
          <svg
            aria-hidden
            viewBox="0 0 800 200"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full opacity-40"
          >
            <path
              d="M0 160 C 200 120, 300 60, 400 60 C 500 60, 600 120, 800 160"
              fill="none"
              stroke="oklch(0.85 0.12 200)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
          </svg>

          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <span
                className="fohat-eyebrow"
                style={{ color: "var(--color-cyan)" }}
              >
                Vamos conversar
              </span>
              <h2 className="fohat-h2 mt-5 max-w-[720px] text-white">{title}</h2>
              <p className="mt-5 max-w-xl text-base text-white/75">{intro}</p>
            </div>
            <div className="flex lg:justify-end">
              <ContactDialog sourcePage="/parceiros" sourceCta={buttonLabel}>
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
