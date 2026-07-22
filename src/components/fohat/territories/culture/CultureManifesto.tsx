import { CULTURE } from "@/data/presence-territories-content";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { TextReveal } from "@/components/fohat/motion/TextReveal";

/**
 * Cultura · Manifesto — grande pausa visual. A obra ao centro, a tecnologia
 * como mediação em órbita. Sem QuoteBand.
 */
export function CultureManifesto() {
  const { quote, mediators } = CULTURE.manifesto;
  const size = 380;
  const cx = size / 2;
  const cy = size / 2;
  const r = 150;

  return (
    <section
      id="manifesto"
      aria-labelledby="culture-manifesto-title"
      className="relative overflow-hidden bg-white py-32 lg:py-44"
    >
      <div className="fohat-shell">
        <SectionReveal className="mx-auto max-w-[900px] text-center">
          <span className="fohat-eyebrow justify-center">Manifesto</span>
          <blockquote
            id="culture-manifesto-title"
            className="mt-10 text-navy [font-size:clamp(1.8rem,3.6vw,3.2rem)] [line-height:1.15] [letter-spacing:-0.035em] font-semibold"
          >
            <TextReveal as="span" text={quote} stagger={140} />
          </blockquote>

          <div
            aria-hidden
            className="mx-auto mt-14 h-px w-24 bg-gradient-to-r from-transparent via-blue to-transparent"
          />
        </SectionReveal>

        {/* Órbita: obra no centro, mediadores em volta */}
        <SectionReveal delay={200} className="mt-20">
          <div className="mx-auto w-full max-w-[440px]">
            <svg
              role="img"
              aria-label="Diagrama: a obra permanece no centro; a tecnologia atua como mediação, contexto, acesso, tradução, convite e continuidade."
              viewBox={`0 0 ${size} ${size}`}
              className="h-auto w-full"
            >
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="oklch(0.46 0.055 253 / 0.2)"
                strokeDasharray="2 6"
              />
              <circle cx={cx} cy={cy} r="58" fill="oklch(0.97 0.008 250)" stroke="oklch(0.46 0.055 253 / 0.5)" />
              <text
                x={cx}
                y={cy - 4}
                textAnchor="middle"
                fontSize="12"
                fill="oklch(0.22 0.023 250)"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="700"
                letterSpacing="2"
              >
                OBRA
              </text>
              <text
                x={cx}
                y={cy + 12}
                textAnchor="middle"
                fontSize="9"
                fill="oklch(0.42 0.02 250)"
                fontFamily="JetBrains Mono, monospace"
                letterSpacing="1.5"
              >
                história · patrimônio
              </text>

              {mediators.map((m, i) => {
                const a = (i / mediators.length) * Math.PI * 2 - Math.PI / 2;
                const x = cx + Math.cos(a) * r;
                const y = cy + Math.sin(a) * r;
                const lx = cx + Math.cos(a) * (r + 26);
                const ly = cy + Math.sin(a) * (r + 26);
                const anchor = lx < cx - 4 ? "end" : lx > cx + 4 ? "start" : "middle";
                return (
                  <g key={m}>
                    <circle cx={x} cy={y} r="4" fill="oklch(0.46 0.055 253)" />
                    <text
                      x={lx}
                      y={ly + 3}
                      textAnchor={anchor}
                      fontSize="10"
                      fill="oklch(0.22 0.023 250)"
                      fontFamily="Inter, sans-serif"
                      fontWeight="600"
                    >
                      {m}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
