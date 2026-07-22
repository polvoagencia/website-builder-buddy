import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import heroAsset from "@/assets/hero.jpg.asset.json";
import portalAsset from "@/assets/portal.jpg.asset.json";
import labAsset from "@/assets/lab.jpg.asset.json";
import markAsset from "@/assets/mark-fohat.png.asset.json";

import { Header } from "@/components/fohat/Header";
import { Footer } from "@/components/fohat/Footer";
import { ContactDialog } from "@/components/fohat/ContactDialog";
import { Reveal } from "@/components/fohat/Reveal";
import { Parallax } from "@/components/fohat/Parallax";
import { ProgressRail } from "@/components/fohat/motion/ProgressRail";
import { Marquee } from "@/components/fohat/Subpage";
import { RentalEquipmentCard } from "@/components/fohat/RentalEquipmentCard";
import { RENTAL_CATALOG_ITEMS } from "@/data/rental-equipment";
import { SERVICES } from "@/data/fohat-services";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FOHAT | Tecnologia aplicada, do conceito à operação" },
      {
        name: "description",
        content:
          "A FOHAT atua na criação de experiências tecnológicas, no desenvolvimento de sistemas e aplicativos e na locação de equipamentos para eventos, projetos e operações especiais.",
      },
      {
        property: "og:title",
        content: "FOHAT | Tecnologia aplicada, do conceito à operação",
      },
      {
        property: "og:description",
        content:
          "Engenharia de Presença, Sistemas e Aplicativos e Locação de Equipamentos Tecnológicos.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const MARQUEE_WORDS = [
  "Inteligência Artificial",
  "Sistemas web",
  "Aplicativos",
  "Dashboards",
  "Projeção mapeada",
  "Integrações",
  "Interfaces multitoque",
  "Locação de equipamentos",
];

const SERVICE_IMAGES: Record<string, { src: string; alt: string }> = {
  "engenharia-de-presenca": {
    src: portalAsset.url,
    alt: "Experiência imersiva de Engenharia de Presença",
  },
  "sistemas-e-aplicativos": {
    src: labAsset.url,
    alt: "Equipe desenvolvendo sistemas e aplicativos",
  },
  "locacao-de-equipamentos": {
    src: heroAsset.url,
    alt: "Equipamentos tecnológicos em operação em evento",
  },
};

function Home() {
  return (
    <div className="min-h-screen bg-mist text-navy">
      <ProgressRail
        contextLabel="Home · FOHAT"
        chapters={[
          { id: "inicio", label: "Início" },
          { id: "solucoes", label: "Soluções" },
          { id: "locacao", label: "Locação" },
          { id: "prova", label: "Prova" },
          { id: "posicionamento", label: "Posicionamento" },
          { id: "parceiros", label: "Parceiros" },
          { id: "contato", label: "Contato" },
        ]}
      />
      <Header />

      <main>
        {/* ============ HERO ============ */}
        <section
          id="inicio"
          className="fohat-hero-bg relative flex min-h-screen items-center overflow-hidden pb-20 pt-36 lg:pt-40"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(30deg, transparent 0 48%, oklch(0.46 0.055 253 / 0.06) 49% 51%, transparent 52%), linear-gradient(150deg, transparent 0 48%, oklch(0.46 0.055 253 / 0.04) 49% 51%, transparent 52%)",
              backgroundSize: "150px 150px",
            }}
          />
          <div className="fohat-shell relative z-10 grid items-center gap-16 lg:grid-cols-[1.04fr_.96fr] lg:gap-[70px]">
            <Reveal>
              <span className="fohat-eyebrow">
                Tecnologia aplicada, do conceito à operação
              </span>
              <h1 className="fohat-h1 mt-6 max-w-[900px]">
                Tecnologia para criar presença, desenvolver soluções e colocar
                operações em funcionamento.
              </h1>
              <p className="fohat-lead mt-7 max-w-[680px]">
                A FOHAT atua na criação de experiências tecnológicas, no
                desenvolvimento de sistemas e aplicativos e na locação de
                equipamentos para eventos, projetos e operações especiais.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ContactDialog>
                  <button className="group inline-flex h-14 items-center gap-3 rounded-full bg-navy px-7 text-sm font-bold text-primary-foreground shadow-[var(--shadow-cta)] transition-all hover:-translate-y-0.5 hover:bg-blue">
                    Conte sua ideia
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </ContactDialog>
                <a
                  href="#solucoes"
                  className="inline-flex h-14 items-center gap-2 rounded-full border border-navy/15 bg-white/70 px-7 text-sm font-bold text-navy backdrop-blur-md transition-all hover:border-blue hover:text-blue"
                >
                  Conheça nossas soluções
                </a>
              </div>
            </Reveal>

            <Reveal delay={120} className="relative min-h-[520px] lg:min-h-[590px]">
              <div
                aria-hidden
                className="absolute -right-16 top-14 h-72 w-72 rotate-[28deg] border border-blue/20 lg:-right-32 lg:h-[360px] lg:w-[360px]"
                style={{ borderRadius: "40% 60% 50% 45%" }}
              />
              <div className="fohat-image-frame absolute inset-x-0 bottom-5 top-0 lg:left-10">
                <Parallax strength={30} className="h-full w-full">
                  <img
                    src={heroAsset.url}
                    alt="Pessoas vivendo uma experiência imersiva em ambiente de projeção"
                    className="h-full w-full object-cover"
                    style={{ filter: "saturate(0.78) contrast(1.06)" }}
                  />
                </Parallax>
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 45%, oklch(0.22 0.023 250 / 0.55))",
                  }}
                />
              </div>
              <div className="absolute bottom-0 left-0 w-[260px] rounded-3xl border border-white/70 bg-white/85 p-6 shadow-[0_16px_50px_oklch(0.22_0.023_250_/_0.16)] backdrop-blur-lg sm:w-[290px]">
                <strong className="mb-1.5 block text-[17px] leading-tight tracking-tight">
                  Do conceito à operação.
                </strong>
                <p className="m-0 text-sm leading-relaxed text-muted-foreground">
                  Três frentes de contratação, uma única lógica de engenharia.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="fohat-mono absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.24em] text-steel">
            Conheça as soluções ↓
          </div>
        </section>

        <Marquee items={MARQUEE_WORDS} />

        {/* ============ TRÊS FRENTES ============ */}
        <section id="solucoes" className="bg-white py-24 lg:py-32">
          <div className="fohat-shell">
            <Reveal className="mb-14 max-w-[860px]">
              <span className="fohat-eyebrow">Como podemos atuar</span>
              <h2 className="fohat-h2 mt-5">
                Três caminhos para colocar tecnologia em funcionamento.
              </h2>
              <p className="fohat-lead mt-5">
                A FOHAT pode ser contratada por qualquer uma destas frentes —
                separadamente ou combinadas dentro de um mesmo projeto.
              </p>
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-3">
              {SERVICES.map((s, i) => {
                const image = SERVICE_IMAGES[s.slug];
                const highlighted = s.slug === "engenharia-de-presenca";
                return (
                  <Reveal
                    as="article"
                    key={s.slug}
                    delay={i * 100}
                    className={
                      "group relative flex flex-col overflow-hidden rounded-[28px] border transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)] " +
                      (highlighted
                        ? "border-navy/20 bg-navy text-white"
                        : "border-line bg-white")
                    }
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading={i === 0 ? "eager" : "lazy"}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        style={{ filter: "saturate(0.85) contrast(1.05)" }}
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background: highlighted
                            ? "linear-gradient(180deg, oklch(0.22 0.023 250 / 0.1), oklch(0.22 0.023 250 / 0.85))"
                            : "linear-gradient(180deg, transparent 55%, oklch(0.22 0.023 250 / 0.35))",
                        }}
                      />
                      <span
                        className={
                          "fohat-mono absolute left-5 top-5 rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] backdrop-blur-md " +
                          (highlighted
                            ? "border-white/40 bg-black/25 text-white"
                            : "border-white/60 bg-black/25 text-white")
                        }
                      >
                        Frente {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col gap-5 p-8">
                      <div>
                        <span
                          className={
                            "fohat-mono text-[10px] uppercase tracking-[0.2em] " +
                            (highlighted ? "text-cyan" : "text-blue")
                          }
                        >
                          {s.eyebrow}
                        </span>
                        <h3 className="mt-3 text-2xl font-bold tracking-tight">
                          {s.title}
                        </h3>
                        <p
                          className={
                            "mt-3 text-base " +
                            (highlighted
                              ? "text-[oklch(0.85_0.02_250)]"
                              : "text-muted-foreground")
                          }
                        >
                          {s.lead}
                        </p>
                      </div>

                      <ul className="flex flex-wrap gap-2">
                        {s.possibilities.map((p) => (
                          <li
                            key={p}
                            className={
                              "fohat-mono rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.14em] " +
                              (highlighted
                                ? "border-white/25 text-white/80"
                                : "border-line text-blue")
                            }
                          >
                            {p}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto pt-2">
                        <Link
                          to={s.cta.to}
                          hash={s.cta.hash}
                          className={
                            "group/link inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-bold transition-all " +
                            (highlighted
                              ? "bg-white text-navy hover:-translate-y-0.5 hover:bg-cyan"
                              : "bg-navy text-primary-foreground hover:-translate-y-0.5 hover:bg-blue")
                          }
                        >
                          {s.cta.label}
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ VITRINE DE EQUIPAMENTOS (integrada à frente de Locação) ============ */}
        <section
          id="locacao"
          className="relative overflow-hidden bg-mist py-20 lg:py-24"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-60"
          />
          <div className="fohat-shell relative">
            <Reveal className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="fohat-eyebrow">Vitrine · Locação</span>
                <h2 className="fohat-h2 mt-4">Uma amostra do que está disponível</h2>
              </div>
              <p className="max-w-[520px] text-muted-foreground">
                Equipamentos, quantidades, logística e suporte são confirmados
                conforme a necessidade de cada projeto.
              </p>
            </Reveal>

            <div
              className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-4 md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4"
              style={{ scrollbarWidth: "thin" }}
            >
              {RENTAL_CATALOG_ITEMS.filter((it) => it.featured).map((item, i) => (
                <div
                  key={item.slug}
                  className="w-[82%] shrink-0 snap-start md:w-auto md:shrink"
                >
                  <RentalEquipmentCard
                    item={item}
                    variant="compact"
                    eager={i === 0}
                    sourcePage="/"
                  />
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                to="/locacao-de-equipamentos"
                hash="catalogo"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-navy px-6 text-sm font-bold text-primary-foreground shadow-[var(--shadow-cta)] transition-all hover:-translate-y-0.5 hover:bg-blue"
              >
                Ver catálogo completo
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ============ PROVA EM FUNCIONAMENTO ============ */}
        <section id="prova" className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-60"
          />
          <div className="fohat-shell relative grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-[70px]">
            <Reveal className="h-[440px] overflow-hidden rounded-[var(--radius)] shadow-[0_32px_80px_oklch(0_0_0_/_0.24)] lg:h-[560px]">
              <Parallax strength={45}>
                <img
                  src={labAsset.url}
                  alt="Equipe multidisciplinar operando um projeto tecnológico"
                  className="h-full w-full object-cover"
                />
              </Parallax>
            </Reveal>
            <Reveal delay={120}>
              <span
                className="fohat-eyebrow"
                style={{ color: "var(--color-cyan)" }}
              >
                Prova em funcionamento
              </span>
              <h2 className="fohat-h2 mt-5 text-white">
                Da primeira intenção à operação diante do público.
              </h2>
              <p className="fohat-lead mt-6 text-[oklch(0.85_0.02_250)]">
                No projeto Tela Brasil, a FOHAT integrou software,
                inteligência artificial, impressão em tempo real,
                equipamentos, dashboards e suporte técnico presencial em
                uma operação nacional realizada em seis capitais,
                organizada em três ciclos de duas capitais simultâneas.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/engenharia-de-presenca/projetos/$slug"
                  params={{ slug: "tela-brasil" }}
                  className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-navy shadow-[0_14px_40px_oklch(0_0_0_/_0.2)] transition-all hover:-translate-y-0.5 hover:bg-cyan"
                >
                  Conheça o case Tela Brasil
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  to="/engenharia-de-presenca/projetos"
                  className="group inline-flex h-14 items-center gap-3 rounded-full border border-white/28 bg-white/[0.06] px-7 text-sm font-bold text-white backdrop-blur-md transition-all hover:border-cyan hover:text-cyan"
                >
                  Ver projetos
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ POSICIONAMENTO FOHAT ============ */}
        <section id="posicionamento" className="bg-white py-24 lg:py-32">
          <div className="fohat-shell grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
            {/* Assinatura institucional */}
            <Reveal>
              <span className="fohat-eyebrow">Nossa crença</span>
              <h2 className="fohat-h2 mt-5 max-w-[540px]">
                A tecnologia não precisa afastar as pessoas do mundo. Ela pode
                devolvê-las a ele.
              </h2>
              <p className="mt-6 text-muted-foreground">
                Projetamos tecnologia com intenção, integração e foco no que
                permanece para o público.
              </p>
            </Reveal>

            {/* Teaser Método FOHAT — versão completa vive em /engenharia-de-presenca#metodo */}
            <Reveal delay={100} className="rounded-3xl border border-line bg-mist p-8 lg:p-10">
              <span className="fohat-eyebrow">Nosso método</span>
              <h3 className="fohat-h2 mt-4 [font-size:clamp(1.5rem,2.4vw,2rem)]">
                A presença é projetada, não improvisada.
              </h3>
              <p className="mt-5 text-muted-foreground">
                A FOHAT conecta intenção, narrativa, tecnologia, espaço e
                execução por meio de um método próprio.
              </p>
              <Link
                to="/engenharia-de-presenca"
                hash="metodo"
                className="group mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-navy px-6 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-blue"
              >
                Conheça o Método FOHAT
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ============ PARA PARCEIROS ============ */}
        <section
          id="parceiros"
          className="relative overflow-hidden py-24 lg:py-32"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.97 0.008 250), oklch(0.93 0.015 250))",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-60"
          />
          <div className="fohat-shell relative">
            <Reveal className="max-w-[860px]">
              <span className="fohat-eyebrow">Para Parceiros</span>
              <h2 className="fohat-h2 mt-5">
                Para agências, produtoras e equipes criativas.
              </h2>
              <p className="fohat-lead mt-5">
                A FOHAT pode atuar como braço de tecnologia, desenvolvimento,
                integração e operação de parceiros criativos.
              </p>
              <p className="mt-4 text-muted-foreground">
                A parceria pode envolver qualquer uma das três frentes:
                Engenharia de Presença, Sistemas e Aplicativos ou Locação de
                Equipamentos.
              </p>
              <div className="mt-8">
                <Link
                  to="/parceiros"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-navy px-6 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-blue"
                >
                  Conheça o modelo de parceria
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ CTA FINAL ============ */}
        <section id="contato" className="overflow-hidden py-20"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.88 0.018 250), oklch(0.98 0.006 250))",
          }}
        >
          <div className="fohat-shell">
            <Reveal className="relative overflow-hidden rounded-[38px] bg-navy p-10 text-white sm:p-16 lg:p-[70px]">
              <img
                src={markAsset.url}
                alt=""
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -right-20 w-72 opacity-[0.085] sm:w-96"
                style={{ filter: "grayscale(1) brightness(4)" }}
              />
              <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
                Comece pela intenção
              </span>
              <h2 className="fohat-h2 mt-5 max-w-[840px] text-white">
                Presença, sistema ou infraestrutura — conte o que você precisa
                colocar em funcionamento.
              </h2>
              <p className="mt-6 max-w-[700px] text-lg text-[oklch(0.85_0.02_250)] lg:text-xl">
                A ideia não precisa estar pronta. A FOHAT ajuda a encontrar o
                caminho entre a intenção e a execução.
              </p>
              <div className="relative z-10 mt-8">
                <ContactDialog>
                  <button className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-navy shadow-[0_14px_40px_oklch(0_0_0_/_0.2)] transition-all hover:-translate-y-0.5 hover:bg-cyan">
                    Conte sua ideia
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </ContactDialog>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
