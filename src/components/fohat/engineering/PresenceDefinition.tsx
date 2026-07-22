import { TextReveal } from "@/components/fohat/motion/TextReveal";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";

/**
 * Pausa narrativa em tela cheia, com a definição de Engenharia de Presença
 * revelada linha a linha. Fundo silencioso, alto contraste, muito respiro.
 */
export function PresenceDefinition() {
  return (
    <section
      aria-labelledby="definicao-heading"
      className="relative overflow-hidden bg-white py-32 lg:py-44"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.85 0.055 245 / 0.35), transparent 65%)",
        }}
      />

      <div className="fohat-shell relative">
        <SectionReveal className="mx-auto max-w-[960px] text-center">
          <span className="fohat-eyebrow justify-center">A definição</span>
          <h2
            id="definicao-heading"
            className="mt-10 text-navy [font-size:clamp(2rem,4.4vw,4rem)] [line-height:1.08] [letter-spacing:-0.04em] font-bold"
          >
            <TextReveal
              as="span"
              text={
                "Engenharia de Presença\né o desenho preciso das condições\nem que uma experiência\ndeixa de ser observada —\ne passa a ser vivida."
              }
              stagger={140}
            />
          </h2>
          <div
            aria-hidden
            className="mx-auto mt-14 h-px w-24 bg-gradient-to-r from-transparent via-blue to-transparent"
          />
        </SectionReveal>
      </div>
    </section>
  );
}
