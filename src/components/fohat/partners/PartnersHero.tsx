import { ArrowUpRight } from "lucide-react";
import { ContactDialog } from "@/components/fohat/ContactDialog";
import { TerritoryBreadcrumb } from "@/components/fohat/territories/shared/TerritoryBreadcrumb";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { PARTNERS_HERO } from "@/data/partners-content";

export function PartnersHero() {
  const { eyebrow, breadcrumb, title, lead, ctaLabel, stages, disciplines } =
    PARTNERS_HERO;

  return (
    <section
      id="visao-geral"
      className="relative overflow-hidden bg-white pb-20 pt-28 lg:pb-28 lg:pt-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-40"
      />
      <div className="fohat-shell relative">
        <SectionReveal className="max-w-3xl">
          <TerritoryBreadcrumb items={breadcrumb} />
          <span className="fohat-eyebrow mt-6 block text-blue">{eyebrow}</span>
          <h1 className="fohat-h1 mt-5 text-navy">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{lead}</p>
          <div className="mt-8">
            <ContactDialog sourcePage="/parceiros" sourceCta={ctaLabel}>
              <button
                type="button"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-navy px-7 text-sm font-bold text-primary-foreground shadow-[var(--shadow-cta)] transition-all hover:-translate-y-0.5 hover:bg-blue"
              >
                {ctaLabel}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </ContactDialog>
          </div>
        </SectionReveal>

        <SectionReveal className="mt-14 lg:mt-20" delay={120}>
          <HeroBridge stages={stages} disciplines={disciplines} />
        </SectionReveal>
      </div>
    </section>
  );
}

function HeroBridge({
  stages,
  disciplines,
}: {
  stages: typeof PARTNERS_HERO.stages;
  disciplines: readonly string[];
}) {
  return (
    <div
      className="relative overflow-hidden rounded-[32px] border border-line bg-mist/70 p-6 sm:p-10"
      role="img"
      aria-label="Ponte entre criação e tecnologia: ideia criativa, viabilidade, arquitetura, desenvolvimento, integração e operação."
    >
      {/* disciplines chips top */}
      <ul className="flex flex-wrap gap-2">
        {disciplines.map((d) => (
          <li
            key={d}
            className="fohat-mono rounded-full border border-line bg-white px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-steel"
          >
            {d}
          </li>
        ))}
      </ul>

      {/* Desktop bridge diagram */}
      <div className="mt-10 hidden lg:block">
        <div className="grid grid-cols-6 gap-3">
          <div className="fohat-mono col-span-2 text-[10px] uppercase tracking-[0.2em] text-blue">
            Criação
          </div>
          <div className="fohat-mono col-span-2 text-center text-[10px] uppercase tracking-[0.2em] text-steel">
            Tradução
          </div>
          <div className="fohat-mono col-span-2 text-right text-[10px] uppercase tracking-[0.2em] text-blue">
            Tecnologia
          </div>
        </div>
        <svg viewBox="0 0 1000 220" className="mt-4 w-full" aria-hidden>
          <defs>
            <linearGradient id="bridge-line" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="oklch(0.55 0.14 245)" stopOpacity="0.15" />
              <stop offset="50%" stopColor="oklch(0.55 0.14 245)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="oklch(0.7 0.15 210)" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {/* baseline */}
          <line
            x1="40"
            y1="110"
            x2="960"
            y2="110"
            stroke="url(#bridge-line)"
            strokeWidth="1.5"
          />
          {stages.map((s, i) => {
            const x = 40 + (920 / (stages.length - 1)) * i;
            const isBridge = s.side === "bridge";
            const isTech = s.side === "tech";
            const color = isTech
              ? "oklch(0.7 0.15 210)"
              : isBridge
                ? "oklch(0.55 0.14 245)"
                : "oklch(0.22 0.023 250)";
            return (
              <g key={s.label}>
                <circle cx={x} cy={110} r="6" fill={color} />
                <line
                  x1={x}
                  y1={110}
                  x2={x}
                  y2={i % 2 === 0 ? 68 : 152}
                  stroke={color}
                  strokeOpacity="0.4"
                  strokeDasharray="2 3"
                />
                <text
                  x={x}
                  y={i % 2 === 0 ? 56 : 180}
                  textAnchor="middle"
                  fontSize="12"
                  fontFamily="ui-monospace, SFMono-Regular, monospace"
                  fill="oklch(0.22 0.023 250)"
                >
                  {s.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mobile / tablet: simple sequence */}
      <ol className="mt-10 space-y-3 lg:hidden">
        {stages.map((s, i) => (
          <li
            key={s.label}
            className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3"
          >
            <span className="fohat-mono text-[10px] uppercase tracking-[0.18em] text-blue">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-medium text-navy">{s.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
