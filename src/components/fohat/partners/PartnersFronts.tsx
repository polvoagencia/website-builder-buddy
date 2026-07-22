import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { PARTNERS_FRONTS, PARTNERS_FLOW } from "@/data/partners-content";

export function PartnersFronts() {
  const { eyebrow, title, intro, fronts } = PARTNERS_FRONTS;
  return (
    <section id="frentes" className="bg-white py-20 lg:py-28">
      <div className="fohat-shell">
        <SectionReveal className="max-w-3xl">
          <span className="fohat-eyebrow text-blue">{eyebrow}</span>
          <h2 className="fohat-h2 mt-4 text-navy">{title}</h2>
          <p className="mt-5 text-lg text-muted-foreground">{intro}</p>
        </SectionReveal>

        <SectionReveal className="mt-12" delay={80}>
          <ul className="grid gap-4 md:grid-cols-3">
            {fronts.map((f, i) => (
              <li key={f.id}>
                <Link
                  to={f.to}
                  className="group flex h-full flex-col justify-between rounded-3xl border border-line bg-mist p-6 transition-all hover:-translate-y-1 hover:border-blue/60 hover:bg-white"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-blue">
                        Frente {String(i + 1).padStart(2, "0")}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-navy transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-navy">{f.label}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </SectionReveal>
      </div>
    </section>
  );
}

export function CollaborationFlow() {
  const { eyebrow, title, steps, note } = PARTNERS_FLOW;

  return (
    <section id="colaboracao" className="bg-mist py-20 lg:py-28">
      <div className="fohat-shell">
        <SectionReveal className="max-w-3xl">
          <span className="fohat-eyebrow text-blue">{eyebrow}</span>
          <h2 className="fohat-h2 mt-4 text-navy">{title}</h2>
        </SectionReveal>

        <SectionReveal className="mt-12" delay={80}>
          {/* Desktop horizontal flow */}
          <ol className="hidden lg:grid lg:grid-cols-5 lg:gap-4">
            {steps.map((s, i) => (
              <li key={s.title} className="relative">
                <div className="rounded-3xl border border-line bg-white p-5">
                  <span className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-blue">
                    Etapa {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <span aria-hidden className="absolute -right-2 top-8 h-px w-4 bg-blue/40" />
                )}
              </li>
            ))}
          </ol>

          {/* Mobile vertical timeline */}
          <ol className="relative space-y-4 border-l border-line pl-6 lg:hidden">
            {steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[29px] top-2 h-2.5 w-2.5 rounded-full border border-blue bg-white"
                />
                <div className="rounded-2xl border border-line bg-white p-5">
                  <span className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-blue">
                    Etapa {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-8 max-w-3xl text-sm text-muted-foreground">{note}</p>
        </SectionReveal>
      </div>
    </section>
  );
}
