import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { HOME_FINAL_CTA, HOME_PARTNERS_NOTE } from "@/data/home-content";
import { ContactDialog } from "@/components/fohat/ContactDialog";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";

/**
 * Fechamento: nota curta sobre parceria + CTA principal.
 * Sem MagneticCTA — resposta visual simples e previsível.
 */
export function HomeFinalCTA() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden py-24 lg:py-32"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 20% 0%, oklch(0.30 0.04 250), transparent 60%), linear-gradient(180deg, oklch(0.22 0.023 250), oklch(0.18 0.023 250))",
        color: "white",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-50" />

      <div className="fohat-shell relative">
        {/* Nota parceiros */}
        <SectionReveal className="mx-auto mb-16 max-w-[720px] text-center">
          <p className="text-base leading-relaxed" style={{ color: "oklch(0.82 0.02 250)" }}>
            {HOME_PARTNERS_NOTE.text}{" "}
            <Link
              to={HOME_PARTNERS_NOTE.to}
              className="fohat-mono ml-1 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.22em] text-cyan underline-offset-4 hover:underline"
            >
              {HOME_PARTNERS_NOTE.linkLabel}
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </p>
        </SectionReveal>

        <SectionReveal className="mx-auto max-w-[880px] text-center">
          <span
            className="fohat-mono text-[11px] uppercase tracking-[0.24em]"
            style={{ color: "var(--color-cyan)" }}
          >
            {HOME_FINAL_CTA.eyebrow}
          </span>
          <h2
            className="mx-auto mt-6 max-w-[820px] font-bold tracking-[-0.05em] text-white"
            style={{ fontSize: "clamp(2rem, 4.8vw, 4rem)", lineHeight: 1.02 }}
          >
            {HOME_FINAL_CTA.title}
          </h2>
          <p
            className="mx-auto mt-6 max-w-[620px] text-lg leading-relaxed"
            style={{ color: "oklch(0.86 0.02 250)" }}
          >
            {HOME_FINAL_CTA.lead}
          </p>

          <div className="mt-10 flex justify-center">
            <ContactDialog sourcePage="/" sourceCta={HOME_FINAL_CTA.cta.label}>
              <button className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-8 text-sm font-bold text-navy transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cyan">
                {HOME_FINAL_CTA.cta.label}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </ContactDialog>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
