import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { SubpageShell } from "@/components/fohat/SubpageShell";
import { Reveal } from "@/components/fohat/Reveal";
import { Parallax } from "@/components/fohat/Parallax";
import { CASES, CASE_CATEGORIES, type CaseSummary } from "@/data/cases";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projetos/")({
  head: () => ({
    meta: [
      { title: "Projetos | Cases de Engenharia de Presença — FOHAT" },
      {
        name: "description",
        content:
          "Cases da FOHAT em cultura, marcas e eventos, unindo tecnologia, inteligência artificial e participação para transformar experiências em memória.",
      },
      { property: "og:title", content: "Projetos | FOHAT" },
      {
        property: "og:description",
        content:
          "Cases de Engenharia de Presença: tecnologia, narrativa e participação em projetos reais entregues pela FOHAT.",
      },
      { property: "og:url", content: "/projetos" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/projetos" }],
  }),
  component: ProjetosIndex,
});

function ProjetosIndex() {
  const [filter, setFilter] = useState<(typeof CASE_CATEGORIES)[number]>("Todos");

  const filtered = useMemo(() => {
    if (filter === "Todos") return CASES;
    return CASES.filter((c) => c.categories.includes(filter));
  }, [filter]);

  return (
    <SubpageShell>
      {/* Editorial opener */}
      <section className="relative overflow-hidden pt-36 pb-16 text-white lg:pt-44 lg:pb-24 fohat-inner-hero">
        <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg-dark" />
        <div aria-hidden className="fohat-scanline" style={{ top: "18%" }} />
        <div className="fohat-shell relative">
          <Reveal>
            <nav
              aria-label="Você está aqui"
              className="fohat-mono mb-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-cyan/90"
            >
              <Link to="/" className="text-cyan hover:text-white">
                Início
              </Link>
              <span className="opacity-50">/</span>
              <span className="text-white/70">Projetos</span>
            </nav>
            <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
              Cases
            </span>
            <h1 className="fohat-h1 mt-6 max-w-[900px] text-white [font-size:clamp(2.4rem,4.8vw,4.75rem)]">
              Cases de <span className="text-cyan">Engenharia de Presença</span>
            </h1>
            <p className="fohat-lead mt-6 max-w-[720px] text-[oklch(0.85_0.02_250)]">
              Conheça projetos em que tecnologia, narrativa, espaço físico e participação
              humana se encontraram diante do público.
            </p>
            <p className="mt-4 max-w-[720px] text-sm text-[oklch(0.78_0.02_250)]">
              Cada experiência parte de uma intenção diferente. O que conecta todas
              elas é a capacidade de transformar tecnologia em presença, interação e
              memória.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-20 border-y border-line bg-mist/90 backdrop-blur">
        <div className="fohat-shell flex items-center gap-2 overflow-x-auto py-4">
          {CASE_CATEGORIES.map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={cn(
                  "fohat-mono shrink-0 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.14em] transition-all",
                  active
                    ? "border-navy bg-navy text-white"
                    : "border-line bg-white text-navy hover:border-blue/40",
                )}
              >
                {c}
              </button>
            );
          })}
        </div>
      </section>

      {/* Cases grid */}
      <section className="bg-white py-16 lg:py-24">
        <div className="fohat-shell">
          {filtered.length === 0 ? (
            <Reveal className="rounded-3xl border border-dashed border-line bg-mist p-12 text-center">
              <div className="fohat-mono text-[11px] uppercase tracking-[0.2em] text-blue">
                Em breve
              </div>
              <p className="mt-4 text-lg text-navy">
                Novos cases nesta categoria serão publicados em breve.
              </p>
            </Reveal>
          ) : (
            <div className="grid gap-8 lg:gap-10">
              {filtered.map((c, i) => (
                <CaseCard key={c.slug} data={c} featured={c.featured} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </SubpageShell>
  );
}

function CaseCard({
  data,
  featured,
  index,
}: {
  data: CaseSummary;
  featured?: boolean;
  index: number;
}) {
  return (
    <Reveal
      as="article"
      delay={index * 80}
      className={cn(
        "group relative overflow-hidden rounded-[32px] border border-line bg-white shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]",
        featured && "lg:grid lg:grid-cols-[1.15fr_.85fr]",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          featured ? "aspect-[16/10] lg:aspect-auto" : "aspect-[16/9]",
        )}
      >
        <Parallax strength={30}>
          <img
            src={data.cover.src}
            alt={data.cover.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            style={{ filter: "saturate(0.9) contrast(1.05)" }}
          />
        </Parallax>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, oklch(0.22 0.023 250 / 0.55), transparent 55%)",
          }}
        />
        <div className="fohat-mono absolute left-5 top-5 rounded-full border border-white/30 bg-black/25 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
          {featured ? "Case em destaque" : "Case"}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-6 p-8 lg:p-12">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {data.categories.slice(0, 3).map((c) => (
              <span key={c} className="fohat-tag">
                {c}
              </span>
            ))}
          </div>
          <h2 className="fohat-h2 mt-6 [font-size:clamp(1.75rem,3vw,2.75rem)]">
            {data.title}
          </h2>
          <p className="mt-3 text-lg font-semibold text-blue">{data.tagline}</p>
          <p className="mt-4 text-base text-muted-foreground">{data.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {data.tags.map((t) => (
              <span
                key={t}
                className="fohat-mono rounded-full border border-line px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-blue"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <Link
            to="/projetos/$slug"
            params={{ slug: data.slug }}
            className="group/link inline-flex h-14 items-center gap-3 rounded-full bg-navy px-7 text-sm font-bold text-primary-foreground shadow-[var(--shadow-cta)] transition-all hover:-translate-y-0.5 hover:bg-blue"
          >
            Conheça o projeto
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
