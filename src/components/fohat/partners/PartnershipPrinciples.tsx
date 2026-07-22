import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { PARTNERS_TRANSPARENCY } from "@/data/partners-content";

export function PartnershipPrinciples() {
  const { eyebrow, title, commitments } = PARTNERS_TRANSPARENCY;

  return (
    <section id="transparencia" className="bg-white py-20 lg:py-28">
      <div className="fohat-shell">
        <SectionReveal className="max-w-3xl">
          <span className="fohat-eyebrow text-blue">{eyebrow}</span>
          <h2 className="fohat-h2 mt-4 text-navy">{title}</h2>
        </SectionReveal>

        <SectionReveal className="mt-12" delay={80}>
          <ol className="grid gap-4 sm:grid-cols-2">
            {commitments.map((c, i) => (
              <li key={c.title} className="rounded-3xl border border-line bg-mist p-6">
                <div className="flex items-baseline justify-between">
                  <span className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-blue">
                    Compromisso
                  </span>
                  <span className="fohat-mono text-[10px] tabular-nums text-steel">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-navy">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </li>
            ))}
          </ol>
        </SectionReveal>
      </div>
    </section>
  );
}
