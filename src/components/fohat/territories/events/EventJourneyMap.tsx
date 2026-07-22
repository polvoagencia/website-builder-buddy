import { EVENTS } from "@/data/presence-territories-content";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";

/**
 * Eventos · Jornada — representação espacial: chegada → memória.
 * Diagrama de trajetos + pilares como legenda.
 */
export function EventJourneyMap() {
  const { title, body, pillars, steps, note } = EVENTS.journeyMap;
  return (
    <section
      id="jornada"
      aria-labelledby="events-journey-title"
      className="relative overflow-hidden bg-white py-24 lg:py-32"
    >
      <div className="fohat-shell">
        <SectionReveal className="max-w-[820px]">
          <span className="fohat-eyebrow">Jornada espacial</span>
          <h2 id="events-journey-title" className="fohat-h2 mt-5">
            {title}
          </h2>
          <p className="fohat-lead mt-5 max-w-[620px]">{body}</p>
        </SectionReveal>

        {/* Trajeto */}
        <SectionReveal delay={140} className="mt-14 overflow-x-auto">
          <div className="min-w-[820px]">
            <ol
              aria-label="Etapas possíveis de uma jornada espacial"
              className="relative grid grid-cols-6 gap-4"
            >
              {steps.map((s, i) => (
                <li key={s} className="relative flex flex-col items-center">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-blue/40 bg-mist">
                    <span className="fohat-mono text-[10px] uppercase tracking-[0.18em] text-blue">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mt-4 text-center text-sm font-bold text-navy">
                    {s}
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      aria-hidden
                      className="absolute left-[calc(50%+28px)] top-7 h-px w-[calc(100%-56px)] bg-gradient-to-r from-blue/50 to-blue/10"
                    />
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {note}
            </p>
          </div>
        </SectionReveal>

        {/* Pilares como legenda */}
        <SectionReveal delay={200} className="mt-16 rounded-3xl border border-line bg-mist p-8">
          <div className="fohat-mono mb-5 text-[10px] uppercase tracking-[0.22em] text-blue">
            Camadas presentes na jornada
          </div>
          <ul className="flex flex-wrap gap-2">
            {pillars.map((p) => (
              <li
                key={p}
                className="fohat-tag"
              >
                {p}
              </li>
            ))}
          </ul>
        </SectionReveal>
      </div>
    </section>
  );
}
