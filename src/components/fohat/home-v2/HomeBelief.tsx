import { HOME_BELIEF } from "@/data/home-content";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";

/**
 * Momento de pausa. Tipografia em escala, muito espaço, sem CTA.
 */
export function HomeBelief() {
  return (
    <section className="bg-white py-32 lg:py-48">
      <div className="fohat-shell">
        <SectionReveal className="mx-auto max-w-[1000px] text-center">
          <h2
            className="font-bold tracking-[-0.05em] text-navy"
            style={{
              fontSize: "clamp(2.25rem, 5.8vw, 5rem)",
              lineHeight: 1.05,
            }}
          >
            {HOME_BELIEF.titleLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-10 max-w-[620px] text-lg text-muted-foreground lg:text-xl">
            {HOME_BELIEF.support}
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
