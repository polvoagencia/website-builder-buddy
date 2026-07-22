import { type ReactNode, useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/* ---------------- Section Nav (fixed contextual TOC) ---------------- */
export interface SectionAnchor {
  id: string;
  label: string;
}

export function CaseSectionNav({ items }: { items: SectionAnchor[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <>
      {/* Desktop rail */}
      <nav
        aria-label="Seções do case"
        className="pointer-events-none fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
      >
        <ul className="pointer-events-auto space-y-1 rounded-2xl border border-line bg-card/85 p-2 shadow-[var(--shadow-card)] backdrop-blur-xl">
          {items.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors",
                  active === it.id ? "bg-navy text-white" : "text-muted-foreground hover:text-navy",
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    active === it.id ? "bg-cyan" : "bg-blue/50",
                  )}
                />
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile horizontal scroll */}
      <nav
        aria-label="Seções do case"
        className="sticky top-16 z-30 border-y border-line bg-mist/90 backdrop-blur xl:hidden"
      >
        <div className="fohat-shell flex items-center gap-3 py-3">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="fohat-mono shrink-0 rounded-full border border-line bg-white px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-navy"
          >
            {open ? "Fechar índice" : "Índice do case"}
          </button>
          <div className="fohat-mono truncate text-[11px] uppercase tracking-[0.16em] text-blue">
            {items.find((i) => i.id === active)?.label}
          </div>
        </div>
        {open && (
          <ul className="fohat-shell grid gap-1 pb-4">
            {items.map((it) => (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-xl px-3 py-2 text-sm font-semibold",
                    active === it.id ? "bg-navy text-white" : "bg-white text-navy",
                  )}
                >
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </>
  );
}

/* ---------------- Section wrapper with anchor ---------------- */
export function CaseSection({
  id,
  eyebrow,
  title,
  lead,
  children,
  variant = "light",
  className,
}: {
  id: string;
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  variant?: "light" | "soft" | "dark";
  className?: string;
}) {
  const bg =
    variant === "dark"
      ? "bg-navy text-white"
      : variant === "soft"
        ? "bg-[oklch(0.96_0.01_250)]"
        : "bg-white";
  return (
    <section id={id} className={cn("relative overflow-hidden py-20 lg:py-28", bg, className)}>
      {variant === "dark" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-50"
        />
      )}
      <div className="fohat-shell relative">
        {(eyebrow || title || lead) && (
          <Reveal className="mb-10 max-w-[900px]">
            {eyebrow && (
              <span
                className="fohat-eyebrow"
                style={variant === "dark" ? { color: "var(--color-cyan)" } : undefined}
              >
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className={cn("fohat-h2 mt-5", variant === "dark" && "text-white")}>{title}</h2>
            )}
            {lead && (
              <p
                className={cn(
                  "fohat-lead mt-5",
                  variant === "dark" && "text-[oklch(0.85_0.02_250)]",
                )}
              >
                {lead}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

/* ---------------- MediaPlaceholder (registro pendente) ---------------- */
export function MediaPlaceholder({
  label,
  aspect = "16/9",
  tone = "light",
  className,
}: {
  label: string;
  aspect?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (!import.meta.env.DEV) return null;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border",
        tone === "dark" ? "border-white/12 bg-white/[0.04]" : "border-line bg-mist",
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0",
          tone === "dark" ? "fohat-grid-bg-dark opacity-60" : "fohat-grid-bg opacity-60",
        )}
      />
      <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
        <div>
          <div
            className={cn(
              "fohat-mono text-[10px] uppercase tracking-[0.22em]",
              tone === "dark" ? "text-cyan" : "text-blue",
            )}
          >
            Registro visual
          </div>
          <div
            className={cn(
              "mt-2 text-sm font-semibold",
              tone === "dark" ? "text-white/85" : "text-navy",
            )}
          >
            {label}
          </div>
          <div
            className={cn(
              "fohat-mono mt-2 text-[10px] uppercase tracking-[0.18em]",
              tone === "dark" ? "text-white/50" : "text-muted-foreground",
            )}
          >
            Em consolidação
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- ResponsibilityGrid ---------------- */
export function ResponsibilityGrid({ items }: { items: { title: string; desc: string }[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <Reveal
          key={it.title}
          as="article"
          delay={i * 60}
          className="group relative overflow-hidden rounded-3xl border border-line bg-white p-7 transition-all hover:-translate-y-1 hover:border-blue/40 hover:shadow-[var(--shadow-card)]"
        >
          <div className="fohat-mono mb-4 text-[10px] uppercase tracking-[0.18em] text-blue">
            {String(i + 1).padStart(2, "0")} · Responsabilidade
          </div>
          <h3 className="text-lg font-bold tracking-tight">{it.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------------- InfraGrid ---------------- */
export function InfraGrid({
  items,
  tone = "light",
}: {
  items: { qty: string; label: string; note?: string }[];
  tone?: "light" | "dark";
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <Reveal
          key={it.label}
          delay={i * 50}
          className={cn(
            "rounded-2xl border p-6",
            tone === "dark" ? "border-white/12 bg-white/[0.04]" : "border-line bg-mist",
          )}
        >
          <div
            className={cn(
              "fohat-mono text-[10px] uppercase tracking-[0.2em]",
              tone === "dark" ? "text-cyan" : "text-blue",
            )}
          >
            Item {String(i + 1).padStart(2, "0")}
          </div>
          <div
            className={cn(
              "mt-3 text-4xl font-bold tracking-tight",
              tone === "dark" ? "text-white" : "text-navy",
            )}
          >
            {it.qty}
          </div>
          <div
            className={cn(
              "mt-1 text-sm font-semibold",
              tone === "dark" ? "text-white/85" : "text-navy",
            )}
          >
            {it.label}
          </div>
          {it.note && (
            <div
              className={cn(
                "mt-2 text-xs",
                tone === "dark" ? "text-white/55" : "text-muted-foreground",
              )}
            >
              {it.note}
            </div>
          )}
        </Reveal>
      ))}
    </div>
  );
}

/* ---------------- DashboardPlaceholder ---------------- */
export function DashboardPlaceholder({ title, metrics }: { title: string; metrics: string[] }) {
  if (!import.meta.env.DEV) return null;
  return (
    <Reveal
      as="article"
      className="overflow-hidden rounded-3xl border border-white/12 bg-white/[0.04] p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-cyan">Dashboard</div>
        <div className="fohat-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
          Dados em consolidação
        </div>
      </div>
      <h3 className="text-lg font-bold tracking-tight text-white">{title}</h3>
      <ul className="mt-5 space-y-2">
        {metrics.map((m) => (
          <li
            key={m}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-navy/50 px-4 py-3 text-sm text-white/85"
          >
            <span>{m}</span>
            <span className="fohat-mono text-[10px] uppercase tracking-[0.18em] text-cyan">
              — · —
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

/* ---------------- JourneyDiagram ---------------- */
export function JourneyDiagram({
  steps,
}: {
  steps: { label: string; title: string; desc: string }[];
}) {
  return (
    <ol className="relative grid gap-4 lg:grid-cols-5">
      {steps.map((s, i) => (
        <Reveal
          as="li"
          key={s.title}
          delay={i * 80}
          className="relative rounded-3xl border border-line bg-white p-6"
        >
          <div className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-blue">
            {s.label} · {String(i + 1).padStart(2, "0")}
          </div>
          <h3 className="mt-4 text-lg font-bold tracking-tight">{s.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
        </Reveal>
      ))}
    </ol>
  );
}

/* ---------------- PillarsList ---------------- */
export function PillarsList({ items }: { items: { title: string; desc: string }[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {items.map((it, i) => (
        <Reveal
          as="li"
          key={it.title}
          delay={i * 60}
          className="rounded-3xl border border-white/12 bg-white/[0.04] p-7"
        >
          <div className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
            Pilar {String(i + 1).padStart(2, "0")}
          </div>
          <h3 className="mt-4 text-xl font-bold tracking-tight text-white">{it.title}</h3>
          <p className="mt-2 text-sm text-[oklch(0.82_0.02_250)]">{it.desc}</p>
        </Reveal>
      ))}
    </ul>
  );
}

/* ---------------- ResultsPlaceholder ---------------- */
export function ResultsPlaceholder({ fields }: { fields: string[] }) {
  if (!import.meta.env.DEV) return null;
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {fields.map((f, i) => (
        <Reveal
          key={f}
          delay={i * 40}
          className="rounded-2xl border border-dashed border-line bg-mist p-6"
        >
          <div className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-blue">
            Indicador
          </div>
          <div className="mt-3 text-2xl font-bold tracking-tight text-navy/40">— · —</div>
          <div className="mt-1 text-sm font-semibold text-navy">{f}</div>
          <div className="fohat-mono mt-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Dados finais em consolidação
          </div>
        </Reveal>
      ))}
    </div>
  );
}
