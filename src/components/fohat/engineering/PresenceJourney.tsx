import { SectionReveal } from "@/components/fohat/motion/SectionReveal";

/**
 * Jornada do público representada como quatro anéis concêntricos:
 * a relação se aprofunda a cada passo. Desktop: composição radial;
 * mobile: sequência vertical.
 */
const STEPS = [
  { title: "Percebe", desc: "O ambiente convida antes mesmo da explicação." },
  { title: "Participa", desc: "Cada gesto ou escolha entra na jornada." },
  { title: "Interfere", desc: "A experiência responde ao que o público faz." },
  { title: "Leva consigo", desc: "Memória, conteúdo ou entrega física permanecem." },
];

export function PresenceJourney() {
  return (
    <section
      id="jornada"
      aria-labelledby="jornada-heading"
      className="relative overflow-hidden bg-mist py-24 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-40" />

      <div className="fohat-shell relative">
        <SectionReveal className="mb-14 max-w-[820px]">
          <span className="fohat-eyebrow">Jornada do público</span>
          <h2 id="jornada-heading" className="fohat-h2 mt-5">
            A relação se aprofunda a cada passo.
          </h2>
          <p className="fohat-lead mt-5">
            O público não assiste — atravessa camadas até se tornar parte da experiência.
          </p>
        </SectionReveal>

        <div className="grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-20">
          {/* Composição radial */}
          <SectionReveal className="relative mx-auto aspect-square w-full max-w-[520px]">
            <svg viewBox="0 0 520 520" aria-hidden className="h-full w-full">
              <defs>
                <radialGradient id="pj-core" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="oklch(0.85 0.055 245)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="oklch(0.85 0.055 245)" stopOpacity="0" />
                </radialGradient>
              </defs>
              {[240, 180, 120, 60].map((r, i) => (
                <circle
                  key={r}
                  cx="260"
                  cy="260"
                  r={r}
                  fill="none"
                  stroke="oklch(0.46 0.055 253 / 0.35)"
                  strokeWidth={i === 3 ? 1.2 : 0.8}
                  strokeDasharray={i === 3 ? undefined : "3 6"}
                />
              ))}
              <circle cx="260" cy="260" r="60" fill="url(#pj-core)" />
              <circle cx="260" cy="260" r="6" fill="oklch(0.22 0.023 250)" />

              {STEPS.map((s, i) => {
                const radii = [240, 180, 120, 60];
                const r = radii[i];
                const y = 260 - r;
                return (
                  <g key={s.title}>
                    <circle cx="260" cy={y} r="6" fill="oklch(0.22 0.023 250)" />
                    <text
                      x="272"
                      y={y + 4}
                      className="fohat-mono"
                      fontSize="10"
                      fill="oklch(0.46 0.055 253)"
                      letterSpacing="1.5"
                    >
                      {String(i + 1).padStart(2, "0")} · {s.title.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </svg>
          </SectionReveal>

          {/* Descrições */}
          <ol className="relative">
            {STEPS.map((s, i) => (
              <SectionReveal
                as="li"
                key={s.title}
                delay={i * 90}
                className="relative border-l border-line py-6 pl-8"
              >
                <span
                  aria-hidden
                  className="absolute -left-[7px] top-8 h-3 w-3 rounded-full bg-navy ring-4 ring-mist"
                />
                <div className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-blue">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-1 text-xl font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">{s.desc}</p>
              </SectionReveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
