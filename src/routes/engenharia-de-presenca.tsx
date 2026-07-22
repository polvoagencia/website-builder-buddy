import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import portalAsset from "@/assets/portal.jpg.asset.json";
import labAsset from "@/assets/lab.jpg.asset.json";

import { SubpageShell } from "@/components/fohat/SubpageShell";
import { InnerHero, InnerCTA } from "@/components/fohat/InnerHero";
import { Reveal } from "@/components/fohat/Reveal";
import { Parallax } from "@/components/fohat/Parallax";
import {
  QuoteBand,
  SplitMedia,
  ProcessLine,
  SubpageCTA,
  Marquee,
} from "@/components/fohat/Subpage";

export const Route = createFileRoute("/engenharia-de-presenca")({
  head: () => ({
    meta: [
      { title: "Engenharia de Presença — FOHAT" },
      {
        name: "description",
        content:
          "O mecanismo que a FOHAT desenvolveu para transformar tecnologia, narrativa, espaço e participação humana em experiências vividas.",
      },
      { property: "og:title", content: "Engenharia de Presença — FOHAT" },
      {
        property: "og:description",
        content:
          "Como projetamos experiências em que o público percebe, participa, interfere e leva algo consigo.",
      },
    ],
  }),
  component: EngenhariaDePresenca,
});

const FORMULA = [
  {
    label: "Entrada",
    value: "Tecnologia + narrativa",
    desc: "Definimos o quê será oferecido ao público e a intenção por trás.",
  },
  {
    label: "Ambiente",
    value: "Espaço + interação",
    desc: "Projetamos o contexto físico e digital em que a experiência acontece.",
  },
  {
    label: "Experiência",
    value: "Presença + conexão",
    desc: "O público entra na jornada, participa, interfere e é reconhecido.",
  },
  {
    label: "Resultado",
    value: "Memória + significado",
    desc: "A experiência permanece depois que a interação termina.",
  },
];

const PRINCIPLES = [
  {
    n: "01",
    title: "Presença no centro",
    desc: "Não projetamos apenas para que o público veja. Projetamos para que ele esteja.",
  },
  {
    n: "02",
    title: "Tecnologia com intenção",
    desc: "Cada ferramenta precisa criar significado, não apenas efeito visual.",
  },
  {
    n: "03",
    title: "Conexão entre mundos",
    desc: "Criamos pontes entre o físico, o digital e o humano.",
  },
  {
    n: "04",
    title: "Inteligência multidisciplinar",
    desc: "Orquestramos diferentes conhecimentos como uma única experiência.",
  },
  {
    n: "05",
    title: "Memória como resultado",
    desc: "O projeto termina quando a interação acaba. Seu valor começa quando ela permanece.",
  },
];

function EngenhariaDePresenca() {
  return (
    <SubpageShell>
      <InnerHero
        eyebrow="O mecanismo FOHAT"
        breadcrumb={[{ label: "Início", to: "/" }, { label: "Engenharia de Presença" }]}
        title={
          <>
            A tecnologia deixa de ocupar o centro.{" "}
            <span className="text-cyan">A presença ocupa.</span>
          </>
        }
        lead="Engenharia de Presença é o método que a FOHAT desenvolveu para transformar tecnologia, narrativa, espaço e participação humana em uma experiência única — vivida, sentida e lembrada."
        image={{ src: portalAsset.url, alt: "Instalação imersiva tecnológica" }}
        actions={
          <>
            <InnerCTA to="/engenharia-de-presenca" hash="metodo">Ver o método aplicado</InnerCTA>
            <InnerCTA to="/experiencias" variant="ghost">
              Onde aplicamos
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

      {/* Fórmula em quatro camadas */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-70" />
        <div className="fohat-shell relative">
          <Reveal className="mb-14 max-w-[820px]">
            <span className="fohat-eyebrow">Fórmula</span>
            <h2 className="fohat-h2 mt-5">
              A engenharia por trás da presença.
            </h2>
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

      <ProcessLine
        eyebrow="A experiência que projetamos"
        title="O público percebe, participa, interfere e leva algo consigo."
        steps={[
          {
            title: "Percebe",
            desc: "O ambiente convida antes mesmo da explicação.",
          },
          {
            title: "Participa",
            desc: "Cada gesto ou escolha entra na jornada.",
          },
          {
            title: "Interfere",
            desc: "A experiência responde ao que o público faz.",
          },
          {
            title: "Leva consigo",
            desc: "Memória, conteúdo ou entrega física permanecem.",
          },
        ]}
      />

      {/* Princípios */}
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

      {/* Bridge to method + territories */}
      <section className="relative overflow-hidden bg-mist py-20 lg:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-60" />
        <div className="fohat-shell relative grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <span className="fohat-eyebrow">Continue explorando</span>
            <h2 className="fohat-h2 mt-5">
              A Engenharia de Presença se aplica em três territórios.
            </h2>
            <p className="fohat-lead mt-5 max-w-[560px]">
              O método é o mesmo. O contexto muda. Marcas, cultura, eventos e
              espaços chegam com desafios distintos — cada um resolvido com a
              mesma lógica de engenharia.
            </p>
          </Reveal>
          <Reveal delay={100} className="flex flex-col gap-3">
            <BridgeLink to="/experiencias/marcas" label="FOHAT para Marcas" desc="Comunicação vira participação e memória." />
            <BridgeLink to="/experiencias/cultura" label="FOHAT para Cultura" desc="Histórias e patrimônios vividos." />
            <BridgeLink to="/experiencias/eventos" label="Eventos e Espaços" desc="Ambientes que reagem ao público." />
            <BridgeLink to="/tecnologia" label="Tecnologia de Experiência" desc="A capacidade transversal que sustenta tudo." />
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
