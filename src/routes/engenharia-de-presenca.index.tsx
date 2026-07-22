import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import portalAsset from "@/assets/portal.jpg.asset.json";
import labAsset from "@/assets/lab.jpg.asset.json";

import { SubpageShell } from "@/components/fohat/SubpageShell";
import { InnerHero, InnerCTA } from "@/components/fohat/InnerHero";
import { Reveal } from "@/components/fohat/Reveal";
import {
  QuoteBand,
  SplitMedia,
  ProcessLine,
  SubpageCTA,
  Marquee,
} from "@/components/fohat/Subpage";
import {
  FORMULA,
  METHOD,
  PRINCIPLES,
} from "@/data/engineering-presence";
import { PRESENCE_TERRITORIES } from "@/data/fohat-services";

export const Route = createFileRoute("/engenharia-de-presenca/")({
  head: () => ({
    meta: [
      { title: "Engenharia de Presença | FOHAT" },
      {
        name: "description",
        content:
          "O método autoral da FOHAT para transformar tecnologia, narrativa, espaço e participação humana em experiências vividas, sentidas e lembradas.",
      },
      { property: "og:title", content: "Engenharia de Presença | FOHAT" },
      {
        property: "og:description",
        content:
          "Método, fórmula, pilares, territórios de aplicação e projetos da frente autoral da FOHAT.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/engenharia-de-presenca" },
    ],
    links: [{ rel: "canonical", href: "/engenharia-de-presenca" }],
  }),
  component: EngenhariaDePresenca,
});

function EngenhariaDePresenca() {
  return (
    <SubpageShell>
      <InnerHero
        eyebrow="Frente autoral · FOHAT"
        breadcrumb={[
          { label: "Início", to: "/" },
          { label: "Engenharia de Presença" },
        ]}
        title={
          <>
            A tecnologia deixa de ocupar o centro.{" "}
            <span className="text-cyan">A presença ocupa.</span>
          </>
        }
        lead="Engenharia de Presença é o método que a FOHAT desenvolveu para transformar tecnologia, narrativa, espaço e participação humana em uma experiência única — vivida, sentida e lembrada."
        image={{
          src: portalAsset.url,
          alt: "Instalação imersiva tecnológica",
        }}
        actions={
          <>
            <InnerCTA to="/engenharia-de-presenca" hash="metodo">
              Ver o método aplicado
            </InnerCTA>
            <InnerCTA to="/engenharia-de-presenca/projetos" variant="ghost">
              Projetos de Engenharia de Presença
            </InnerCTA>
          </>
        }
      />

      <Marquee
        items={[
          "Perceber",
          "Participar",
          "Interferir",
          "Levar consigo",
          "Perceber",
          "Participar",
          "Interferir",
          "Levar consigo",
        ]}
      />

      <QuoteBand
        eyebrow="A definição"
        quote={
          <>
            Engenharia de Presença é o desenho preciso das condições em que uma
            experiência deixa de ser observada — e passa a ser vivida.
          </>
        }
      />

      <SplitMedia
        eyebrow="Como funciona"
        title="Quatro camadas que precisam operar como uma só."
        lead="Uma experiência de presença não é a soma de tecnologia + narrativa + espaço. É a orquestração dessas camadas para que o público se torne parte do que acontece."
        image={{
          src: labAsset.url,
          alt: "Equipe integrando as camadas de uma experiência",
          caption: "A ferramenta desaparece. A conexão fica.",
        }}
      />

      {/* Fórmula */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-70"
        />
        <div className="fohat-shell relative">
          <Reveal className="mb-14 max-w-[820px]">
            <span className="fohat-eyebrow">Fórmula</span>
            <h2 className="fohat-h2 mt-5">A engenharia por trás da presença.</h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {FORMULA.map((f, i) => (
              <Reveal
                key={f.label}
                delay={i * 100}
                className="group relative overflow-hidden rounded-3xl border border-line bg-mist p-7 transition-all hover:-translate-y-1 hover:border-blue/40 hover:shadow-[var(--shadow-card)]"
              >
                <div className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-blue">
                  0{i + 1} · {f.label}
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-tight">
                  {f.value}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{f.desc}</p>
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-10 -right-8 h-24 w-24 rotate-45 rounded-2xl border border-blue/15 transition-transform duration-500 group-hover:rotate-[60deg]"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MÉTODO FOHAT — versão completa (única do site) */}
      <section id="metodo" className="overflow-hidden bg-white py-20 lg:py-28">
        <div className="fohat-shell">
          <Reveal className="mb-14 max-w-[820px]">
            <span className="fohat-eyebrow">Método FOHAT</span>
            <h2 className="fohat-h2 mt-5">
              A presença não acontece por acaso. Ela é projetada.
            </h2>
            <p className="fohat-lead mt-5">
              Cinco etapas conectam intenção, tecnologia e execução até a
              experiência encontrar o público.
            </p>
          </Reveal>

          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
            {METHOD.map((s, i) => (
              <Reveal
                key={s.letter}
                delay={i * 80}
                className="relative min-h-[280px] overflow-hidden rounded-3xl border border-blue/12 p-6 transition-all hover:-translate-y-1 hover:border-blue/40"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(0.98 0.006 250), oklch(0.93 0.015 250))",
                }}
              >
                <div className="mb-7 text-[68px] font-extrabold leading-none text-blue/20">
                  {s.letter}
                </div>
                <h3 className="text-lg font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <div
                  aria-hidden
                  className="absolute -bottom-14 -right-11 h-32 w-32 rotate-45 rounded-3xl border border-blue/15"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessLine
        eyebrow="A experiência que projetamos"
        title="O público percebe, participa, interfere e leva algo consigo."
        steps={[
          { title: "Percebe", desc: "O ambiente convida antes mesmo da explicação." },
          { title: "Participa", desc: "Cada gesto ou escolha entra na jornada." },
          { title: "Interfere", desc: "A experiência responde ao que o público faz." },
          { title: "Leva consigo", desc: "Memória, conteúdo ou entrega física permanecem." },
        ]}
      />

      {/* Pilares — versão completa (única do site) */}
      <section id="principios" className="bg-white py-20 lg:py-28">
        <div className="fohat-shell">
          <Reveal className="mb-12 max-w-[820px]">
            <span className="fohat-eyebrow">Pilares</span>
            <h2 className="fohat-h2 mt-5">
              Cinco princípios orientam cada projeto.
            </h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {PRINCIPLES.map((p, i) => {
              const isLast = i === PRINCIPLES.length - 1;
              return (
                <Reveal
                  key={p.n}
                  as="article"
                  delay={i * 70}
                  className={
                    isLast
                      ? "rounded-3xl p-8 text-white md:col-span-2"
                      : "rounded-3xl border border-line bg-[oklch(0.99_0.004_250)] p-8"
                  }
                  style={
                    isLast
                      ? {
                          background:
                            "linear-gradient(135deg, oklch(0.22 0.023 250), oklch(0.32 0.035 250))",
                        }
                      : undefined
                  }
                >
                  <div
                    className={
                      "mb-7 inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-extrabold " +
                      (isLast ? "bg-white/12 text-white" : "bg-ice text-blue")
                    }
                  >
                    {p.n}
                  </div>
                  <h3
                    className={
                      "text-2xl font-bold tracking-tight " +
                      (isLast ? "text-white" : "")
                    }
                  >
                    {p.title}
                  </h3>
                  <p
                    className={
                      "mt-3 " +
                      (isLast
                        ? "text-[oklch(0.85_0.02_250)]"
                        : "text-muted-foreground")
                    }
                  >
                    {p.desc}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Territórios de aplicação */}
      <section className="relative overflow-hidden bg-mist py-20 lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-60"
        />
        <div className="fohat-shell relative grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <span className="fohat-eyebrow">Territórios de aplicação</span>
            <h2 className="fohat-h2 mt-5">
              O mesmo método. Contextos diferentes.
            </h2>
            <p className="fohat-lead mt-5 max-w-[560px]">
              Marcas, cultura, eventos e espaços chegam com desafios distintos —
              cada um resolvido com a mesma lógica de engenharia.
            </p>
          </Reveal>
          <Reveal delay={100} className="flex flex-col gap-3">
            {PRESENCE_TERRITORIES.map((t) => (
              <BridgeLink
                key={t.slug}
                to={t.to}
                label={t.label}
                desc={t.description}
              />
            ))}
          </Reveal>
        </div>
      </section>

      {/* Projetos de Engenharia de Presença */}
      <section className="bg-navy py-20 text-white lg:py-28">
        <div className="fohat-shell grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <Reveal>
            <span
              className="fohat-eyebrow"
              style={{ color: "var(--color-cyan)" }}
            >
              Projetos de Engenharia de Presença
            </span>
            <h2 className="fohat-h2 mt-5 text-white">
              Do conceito ao funcionamento diante do público.
            </h2>
            <p className="fohat-lead mt-6 text-[oklch(0.85_0.02_250)]">
              Conheça projetos em que a metodologia saiu do conceito e entrou em
              funcionamento diante do público.
            </p>
            <div className="mt-8">
              <Link
                to="/engenharia-de-presenca/projetos"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-navy shadow-[0_14px_40px_oklch(0_0_0_/_0.2)] transition-all hover:-translate-y-0.5 hover:bg-cyan"
              >
                Ver projetos de Engenharia de Presença
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Link
              to="/engenharia-de-presenca/projetos/$slug"
              params={{ slug: "tela-brasil" }}
              className="group block overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.04] p-8 transition-all hover:-translate-y-1 hover:border-cyan/40"
            >
              <div
                className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-cyan"
              >
                Case em destaque
              </div>
              <h3 className="mt-5 text-2xl font-bold tracking-tight text-white">
                Tela Brasil
              </h3>
              <p className="mt-3 text-[oklch(0.85_0.02_250)]">
                Cinema brasileiro vivido no espaço público em seis capitais, com
                inteligência artificial, impressão em tempo real, dashboards e
                projeção mapeada.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white">
                Conheça o case
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <SubpageCTA
        eyebrow="Comece pela intenção"
        title="O que você gostaria que o público vivesse, sentisse ou lembrasse?"
        buttonLabel="Conte sua ideia"
      />
    </SubpageShell>
  );
}

function BridgeLink({
  to,
  label,
  desc,
}: {
  to: string;
  label: string;
  desc: string;
}) {
  return (
    <Link
      to={to}
      className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-[var(--shadow-card)]"
    >
      <div>
        <div className="text-base font-bold tracking-tight">{label}</div>
        <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      </div>
      <ArrowUpRight className="h-5 w-5 text-blue transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
