import { InnerCTA } from "@/components/fohat/InnerHero";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { TextReveal } from "@/components/fohat/motion/TextReveal";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

/**
 * PresenceHero — abertura autoral da página de Engenharia de Presença.
 * Composição procedural em 4 camadas (tecnologia, narrativa, espaço,
 * participação humana) que se integram visualmente. Sem fotografia genérica.
 */
export function PresenceHero() {
  const layers = [
    { key: "tec", label: "Tecnologia", desc: "Sistemas, IA, sensores, integrações." },
    { key: "nar", label: "Narrativa", desc: "Intenção, roteiro, sentido." },
    { key: "esp", label: "Espaço", desc: "Físico, digital, cenografia." },
    { key: "pub", label: "Participação humana", desc: "Gesto, escolha, presença." },
  ];

  return (
    <section
      id="visao-geral"
      className="fohat-inner-hero relative pt-36 pb-24 lg:pt-44 lg:pb-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg-dark" />
      <div aria-hidden className="fohat-scanline" style={{ top: "18%" }} />
      <div aria-hidden className="fohat-scanline" style={{ top: "62%", animationDelay: "6s" }} />

      <div className="fohat-shell relative">
        <nav
          aria-label="Você está aqui"
          className="fohat-mono mb-8 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-cyan/90"
        >
          <Link to="/" className="text-cyan hover:text-white">Início</Link>
          <ChevronRight aria-hidden className="h-3 w-3 opacity-50" />
          <span className="text-white/70">Engenharia de Presença</span>
        </nav>

        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <div>
            <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
              Frente autoral · FOHAT
            </span>
            <h1 className="fohat-h1 mt-6 max-w-[820px] text-white [font-size:clamp(2.5rem,5.2vw,5rem)]">
              <TextReveal
                as="span"
                text={"A tecnologia deixa de\nocupar o centro."}
                stagger={110}
              />
              <span className="mt-3 block text-cyan">
                <TextReveal as="span" text="A presença ocupa." delay={280} />
              </span>
            </h1>
            <p className="fohat-lead mt-8 max-w-[560px] text-[oklch(0.85_0.02_250)]">
              Engenharia de Presença é o método que a FOHAT desenvolveu para
              transformar tecnologia, narrativa, espaço e participação humana em
              uma experiência única — vivida, sentida e lembrada.
            </p>
            <SectionReveal delay={180} className="mt-10 flex flex-wrap gap-3">
              <InnerCTA to="/engenharia-de-presenca" hash="metodo">
                Ver o método aplicado
              </InnerCTA>
              <InnerCTA
                to="/engenharia-de-presenca/projetos"
                variant="ghost"
              >
                Projetos de Engenharia de Presença
              </InnerCTA>
            </SectionReveal>
          </div>

          {/* Composição procedural: quatro camadas + centro humano */}
          <SectionReveal delay={140} className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-[520px]">
              <svg
                viewBox="0 0 520 520"
                aria-hidden
                className="absolute inset-0 h-full w-full"
              >
                <defs>
                  <radialGradient id="ph-core" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="oklch(0.85 0.055 245)" stopOpacity="0.9" />
                    <stop offset="80%" stopColor="oklch(0.85 0.055 245)" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="ph-edge" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(0.85 0.055 245)" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="oklch(0.58 0.048 253)" stopOpacity="0.15" />
                  </linearGradient>
                </defs>

                {/* concentric layer rings */}
                {[240, 190, 140, 90].map((r, i) => (
                  <circle
                    key={r}
                    cx="260"
                    cy="260"
                    r={r}
                    fill="none"
                    stroke="oklch(0.85 0.055 245 / 0.28)"
                    strokeWidth={i === 0 ? 0.8 : 0.6}
                    strokeDasharray={i % 2 === 0 ? "2 6" : undefined}
                  />
                ))}

                {/* connective lines between the 4 layer anchors */}
                {[
                  [260, 20, 260, 500],
                  [20, 260, 500, 260],
                  [70, 70, 450, 450],
                  [450, 70, 70, 450],
                ].map(([x1, y1, x2, y2], i) => (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="url(#ph-edge)"
                    strokeWidth="0.7"
                  />
                ))}

                {/* central core = presença */}
                <circle cx="260" cy="260" r="120" fill="url(#ph-core)" />
                <circle
                  cx="260"
                  cy="260"
                  r="42"
                  fill="oklch(0.98 0 0 / 0.06)"
                  stroke="oklch(0.98 0 0 / 0.45)"
                  strokeWidth="0.7"
                />

                {/* silhueta humana abstrata: apenas círculo (cabeça) + arco (ombros) */}
                <circle cx="260" cy="242" r="12" fill="oklch(0.98 0 0 / 0.85)" />
                <path
                  d="M 232 292 Q 260 264 288 292"
                  fill="none"
                  stroke="oklch(0.98 0 0 / 0.75)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* layer anchors */}
                {[
                  { x: 260, y: 20, key: "tec" },
                  { x: 500, y: 260, key: "nar" },
                  { x: 260, y: 500, key: "esp" },
                  { x: 20, y: 260, key: "pub" },
                ].map((p) => (
                  <circle
                    key={p.key}
                    cx={p.x}
                    cy={p.y}
                    r="5"
                    fill="oklch(0.85 0.055 245)"
                  />
                ))}
              </svg>

              {/* Rótulos das camadas, absolute-positioned em torno do círculo */}
              <ul className="pointer-events-none absolute inset-0">
                {layers.map((l, i) => {
                  const pos = [
                    "top-[2%] left-1/2 -translate-x-1/2 text-center",
                    "right-[2%] top-1/2 -translate-y-1/2 text-right",
                    "bottom-[2%] left-1/2 -translate-x-1/2 text-center",
                    "left-[2%] top-1/2 -translate-y-1/2 text-left",
                  ][i];
                  return (
                    <li
                      key={l.key}
                      className={`absolute w-[42%] max-w-[180px] ${pos}`}
                    >
                      <span className="fohat-mono block text-[10px] uppercase tracking-[0.22em] text-cyan">
                        0{i + 1}
                      </span>
                      <span className="mt-1 block text-sm font-bold text-white">
                        {l.label}
                      </span>
                      <span className="mt-1 block text-[11px] leading-snug text-white/60">
                        {l.desc}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
