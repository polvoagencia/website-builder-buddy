import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { PARTNERS_PRINCIPLE } from "@/data/partners-content";

export function CreativeTechnologyBridge() {
  const { eyebrow, headline, partner, fohat, note } = PARTNERS_PRINCIPLE;

  return (
    <section id="principio" className="bg-mist py-20 lg:py-28">
      <div className="fohat-shell">
        <SectionReveal className="max-w-3xl">
          <span className="fohat-eyebrow text-blue">{eyebrow}</span>
          <h2 className="fohat-h2 mt-4 text-navy">{headline}</h2>
        </SectionReveal>

        <SectionReveal className="mt-12 lg:mt-16" delay={100}>
          <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
            <ResponsibilityCard side="partner" label={partner.label} items={partner.items} />
            <Bridge />
            <ResponsibilityCard side="fohat" label={fohat.label} items={fohat.items} />
          </div>

          <p className="mt-8 max-w-3xl text-sm text-muted-foreground">{note}</p>
        </SectionReveal>
      </div>
    </section>
  );
}

function ResponsibilityCard({
  side,
  label,
  items,
}: {
  side: "partner" | "fohat";
  label: string;
  items: readonly string[];
}) {
  const isFohat = side === "fohat";
  return (
    <div
      className={
        isFohat
          ? "rounded-3xl border border-navy/20 bg-navy p-8 text-white"
          : "rounded-3xl border border-line bg-white p-8 text-navy"
      }
    >
      <div
        className={`fohat-mono text-[10px] uppercase tracking-[0.22em] ${isFohat ? "text-cyan" : "text-blue"}`}
      >
        {label}
      </div>
      <ul className="mt-6 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex items-baseline gap-3 text-sm">
            <span
              aria-hidden
              className={`mt-1 inline-block h-1.5 w-1.5 rounded-full ${isFohat ? "bg-cyan" : "bg-blue"}`}
            />
            <span className={isFohat ? "text-white/90" : "text-navy/85"}>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Bridge() {
  return (
    <div aria-hidden className="hidden items-center justify-center lg:flex">
      <svg viewBox="0 0 120 320" className="h-full w-24">
        <defs>
          <linearGradient id="bridge-vert" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="oklch(0.55 0.14 245)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="oklch(0.7 0.15 210)" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path
          d="M10 30 C 70 30, 50 290, 110 290"
          fill="none"
          stroke="url(#bridge-vert)"
          strokeWidth="1.6"
        />
        <path
          d="M10 60 C 70 60, 50 260, 110 260"
          fill="none"
          stroke="url(#bridge-vert)"
          strokeOpacity="0.5"
          strokeWidth="1.2"
        />
        <circle cx="10" cy="30" r="4" fill="oklch(0.55 0.14 245)" />
        <circle cx="110" cy="290" r="4" fill="oklch(0.7 0.15 210)" />
      </svg>
    </div>
  );
}
