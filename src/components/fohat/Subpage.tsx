import { type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { Parallax } from "./Parallax";
import { ContactDialog } from "./ContactDialog";

/* ---------- QuoteBand ---------- */
export function QuoteBand({ eyebrow, quote }: { eyebrow: string; quote: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white lg:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-60" />
      <div className="fohat-shell relative">
        <Reveal>
          <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
            {eyebrow}
          </span>
          <blockquote className="mt-6 max-w-[1000px] text-[clamp(1.6rem,3.6vw,3rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-white">
            {quote}
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- SplitMedia ---------- */
interface SplitMediaProps {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  tags?: string[];
  image: { src: string; alt: string; caption?: string };
  reverse?: boolean;
  variant?: "light" | "soft";
}

export function SplitMedia({
  eyebrow,
  title,
  lead,
  tags,
  image,
  reverse,
  variant = "light",
}: SplitMediaProps) {
  const bg =
    variant === "soft"
      ? "bg-[oklch(0.96_0.01_250)]"
      : "bg-white";
  return (
    <section className={`${bg} py-20 lg:py-28`}>
      <div className="fohat-shell grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div className={reverse ? "lg:order-2" : ""}>
          <Reveal className="relative h-[400px] overflow-hidden rounded-[var(--radius)] shadow-[var(--shadow-elegant)] lg:h-[560px]">
            <Parallax strength={50}>
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
              />
            </Parallax>
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, oklch(0.22 0.023 250 / 0.62), transparent 55%)",
              }}
            />
            {image.caption && (
              <div className="absolute inset-x-8 bottom-7 z-10 text-lg font-semibold text-white">
                {image.caption}
              </div>
            )}
          </Reveal>
        </div>
        <Reveal delay={120} className={reverse ? "lg:order-1" : ""}>
          <span className="fohat-eyebrow">{eyebrow}</span>
          <h2 className="fohat-h2 mt-5">{title}</h2>
          <p className="fohat-lead mt-5 max-w-[560px]">{lead}</p>
          {tags && (
            <div className="mt-8 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t} className="fohat-tag">
                  {t}
                </span>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- ContentList (possibilities grid) ---------- */
interface Item {
  title: string;
  desc: string;
}
export function ContentList({
  eyebrow,
  title,
  intro,
  items,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  items: Item[];
}) {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.97 0.008 250), oklch(0.93 0.015 250))",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-70" />
      <div className="fohat-shell relative">
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="fohat-eyebrow">{eyebrow}</span>
            <h2 className="fohat-h2 mt-5">{title}</h2>
          </div>
          {intro && (
            <p className="max-w-[520px] text-muted-foreground">{intro}</p>
          )}
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal
              key={it.title}
              as="article"
              delay={i * 70}
              className="group relative overflow-hidden rounded-3xl border border-line bg-white p-7 transition-all hover:-translate-y-1 hover:border-blue/40 hover:shadow-[var(--shadow-card)]"
            >
              <div className="fohat-mono mb-4 text-[10px] uppercase tracking-[0.18em] text-blue">
                {String(i + 1).padStart(2, "0")} · Possibilidade
              </div>
              <h3 className="text-xl font-bold tracking-tight">{it.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{it.desc}</p>
              <ArrowUpRight className="absolute right-6 top-6 h-4 w-4 text-blue opacity-0 transition-all group-hover:opacity-100" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- ProcessLine (dark) ---------- */
export function ProcessLine({
  eyebrow,
  title,
  steps,
}: {
  eyebrow: string;
  title: ReactNode;
  steps: { title: string; desc: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white lg:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-60" />
      <div className="fohat-shell relative">
        <Reveal className="max-w-[880px]">
          <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
            {eyebrow}
          </span>
          <h2 className="fohat-h2 mt-5 text-white">{title}</h2>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal
              key={s.title}
              as="article"
              delay={i * 100}
              className="relative rounded-b-2xl border-t-2 border-cyan/70 bg-white/[0.04] p-6 backdrop-blur-sm"
            >
              <div className="fohat-mono mb-5 text-xs uppercase tracking-[0.18em] text-cyan">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-lg font-bold tracking-tight text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-[oklch(0.8_0.02_250)]">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Format Grid ---------- */
export function FormatGrid({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: ReactNode;
  items: { tag: string; title: string; desc: string }[];
}) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="fohat-shell">
        <Reveal className="max-w-[860px]">
          <span className="fohat-eyebrow">{eyebrow}</span>
          <h2 className="fohat-h2 mt-5">{title}</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {items.map((f, i) => (
            <Reveal
              key={f.title}
              as="article"
              delay={i * 90}
              className="rounded-3xl border border-line bg-mist p-7 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
            >
              <span className="fohat-mono block text-[10px] uppercase tracking-[0.2em] text-blue">
                {f.tag}
              </span>
              <h3 className="mt-5 text-xl font-bold tracking-tight">{f.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{f.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA on subpages ---------- */
export function SubpageCTA({
  eyebrow,
  title,
  buttonLabel,
}: {
  eyebrow?: string;
  title: ReactNode;
  buttonLabel: string;
}) {
  return (
    <section
      className="overflow-hidden py-20"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.88 0.018 250), oklch(0.98 0.006 250))",
      }}
    >
      <div className="fohat-shell">
        <Reveal className="relative overflow-hidden rounded-[38px] bg-navy p-10 text-white sm:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-40"
          />
          {eyebrow && (
            <span
              className="fohat-eyebrow relative"
              style={{ color: "var(--color-cyan)" }}
            >
              {eyebrow}
            </span>
          )}
          <h2 className="fohat-h2 relative mt-5 max-w-[840px] text-white">
            {title}
          </h2>
          <div className="relative mt-8">
            <ContactDialog>
              <button className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-navy shadow-[0_14px_40px_oklch(0_0_0_/_0.2)] transition-all hover:-translate-y-0.5 hover:bg-cyan">
                {buttonLabel}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </ContactDialog>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Marquee band (tech feel) ---------- */
export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line bg-mist py-6">
      <div className="fohat-marquee flex w-[200%] items-center gap-12 whitespace-nowrap">
        {doubled.map((w, i) => (
          <span
            key={i}
            className="fohat-mono flex items-center gap-4 text-sm uppercase tracking-[0.18em] text-blue"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue/70" />
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
