import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { Parallax } from "./Parallax";

interface Crumb {
  label: string;
  to?: string;
}

interface InnerHeroProps {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  breadcrumb: Crumb[];
  image: { src: string; alt: string };
  actions?: ReactNode;
}

/**
 * Subpage hero — visually distinct from home:
 * dark navy gradient, blueprint grid, tight composition, mono breadcrumb.
 */
export function InnerHero({
  eyebrow,
  title,
  lead,
  breadcrumb,
  image,
  actions,
}: InnerHeroProps) {
  return (
    <section
      className="relative overflow-hidden pt-36 pb-20 text-white lg:pt-44 lg:pb-28"
      style={{
        background:
          "radial-gradient(ellipse 90% 60% at 15% 0%, oklch(0.46 0.055 253 / 0.25), transparent 60%), radial-gradient(ellipse 70% 60% at 100% 100%, oklch(0.85 0.055 245 / 0.18), transparent 60%), linear-gradient(180deg, oklch(0.22 0.023 250) 0%, oklch(0.26 0.028 250) 100%)",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg-dark" />
      <div aria-hidden className="fohat-scanline" style={{ top: "10%" }} />
      <div aria-hidden className="fohat-scanline" style={{ top: "40%", animationDelay: "5s" }} />

      <div className="fohat-shell relative grid items-center gap-14 lg:grid-cols-[1.03fr_.97fr] lg:gap-16">
        <Reveal>
          <nav
            aria-label="Você está aqui"
            className="fohat-mono mb-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-cyan/90"
          >
            {breadcrumb.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-2">
                {c.to ? (
                  <Link
                    to={c.to}
                    className="text-cyan transition-colors hover:text-white"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white/70">{c.label}</span>
                )}
                {i < breadcrumb.length - 1 && (
                  <ChevronRight className="h-3 w-3 opacity-50" />
                )}
              </span>
            ))}
          </nav>

          <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
            {eyebrow}
          </span>
          <h1 className="fohat-h1 mt-6 max-w-[820px] text-white [font-size:clamp(2.5rem,5.2vw,5rem)]">
            {title}
          </h1>
          <p className="fohat-lead mt-6 max-w-[620px] text-[oklch(0.85_0.02_250)]">
            {lead}
          </p>
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </Reveal>

        <Reveal delay={140} className="relative">
          <Parallax strength={40}>
            <div className="relative h-[380px] overflow-hidden rounded-[32px_120px_32px_120px] shadow-[var(--shadow-elegant)] lg:h-[520px]">
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
                style={{ filter: "saturate(0.82) contrast(1.06)" }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 55%, oklch(0.22 0.023 250 / 0.6))",
                }}
              />
              {/* Corner tech tag */}
              <div className="fohat-mono absolute left-5 top-5 rounded-full border border-white/30 bg-black/25 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
                FOHAT · {String(new Date().getFullYear())}
              </div>
            </div>
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}

interface CTAActionProps {
  href?: string;
  to?: string;
  hash?: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  onClick?: () => void;
}

export function InnerCTA({
  href,
  to,
  hash,
  children,
  variant = "primary",
  onClick,
}: CTAActionProps) {
  const base =
    "group inline-flex h-14 items-center gap-3 rounded-full px-7 text-sm font-bold transition-all";
  const styles =
    variant === "primary"
      ? "bg-white text-navy shadow-[0_14px_40px_oklch(0_0_0_/_0.2)] hover:-translate-y-0.5 hover:bg-cyan"
      : "border border-white/28 bg-white/6 text-white backdrop-blur-md hover:border-cyan hover:text-cyan";
  const content = (
    <>
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );
  if (to) {
    return (
      <Link to={to} hash={hash} onClick={onClick} className={`${base} ${styles}`}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} onClick={onClick} className={`${base} ${styles}`}>
      {content}
    </a>
  );
}
