import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import markAsset from "@/assets/mark-fohat.png.asset.json";

import { Header } from "@/components/fohat/Header";
import { Footer } from "@/components/fohat/Footer";
import { ContactDialog } from "@/components/fohat/ContactDialog";
import { ProgressRail } from "@/components/fohat/motion/ProgressRail";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { Marquee } from "@/components/fohat/Subpage";
import { RentalEquipmentCard } from "@/components/fohat/RentalEquipmentCard";
import { RENTAL_CATALOG_ITEMS } from "@/data/rental-equipment";

import { HeroLayered } from "@/components/fohat/home/HeroLayered";
import { StickyFronts } from "@/components/fohat/home/StickyFronts";
import { ProjectsGateway } from "@/components/fohat/home/ProjectsGateway";
import { PartnersNetwork } from "@/components/fohat/home/PartnersNetwork";
import { MagneticCTA } from "@/components/fohat/home/MagneticCTA";

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

function Home() {
  return (
    <div className="min-h-screen bg-mist text-navy">
      <ProgressRail
        contextLabel="Home · FOHAT"
        chapters={[
          { id: "inicio", label: "Início" },
          { id: "frentes", label: "Frentes" },
          { id: "locacao", label: "Vitrine" },
          { id: "projetos", label: "Projetos" },
          { id: "posicionamento", label: "Posicionamento" },
          { id: "parceiros", label: "Parceiros" },
          { id: "contato", label: "Contato" },
        ]}
      />
      <Header />

      <main>
        {/* ============ HERO EM CAMADAS ============ */}
        <HeroLayered />

        <Marquee items={MARQUEE_WORDS} />

        {/* ============ TRÊS FRENTES (sticky no desktop) ============ */}
        <StickyFronts />

        {/* ============ VITRINE DE EQUIPAMENTOS ============ */}
        <section id="locacao" className="relative overflow-hidden bg-mist py-20 lg:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-60"
          />
          <div className="fohat-shell relative">
            <SectionReveal className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="fohat-eyebrow">Vitrine · Locação</span>
                <h2 className="fohat-h2 mt-4">Uma amostra do que está disponível</h2>
              </div>
              <p className="max-w-[520px] text-muted-foreground">
                Equipamentos, quantidades, logística e suporte são confirmados conforme a
                necessidade de cada projeto.
              </p>
            </SectionReveal>

            <div
              className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-4 md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4"
              style={{ scrollbarWidth: "thin" }}
            >
              {RENTAL_CATALOG_ITEMS.filter((it) => it.featured).map((item, i) => (
                <div key={item.slug} className="w-[82%] shrink-0 snap-start md:w-auto md:shrink">
                  <RentalEquipmentCard
                    item={item}
                    variant="compact"
                    eager={i === 0}
                    sourcePage="/"
                  />
                </div>
              ))}
            </div>

            <SectionReveal className="mt-10">
              <Link
                to="/locacao-de-equipamentos"
                hash="catalogo"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-navy px-6 text-sm font-bold text-primary-foreground shadow-[var(--shadow-cta)] transition-transform hover:-translate-y-0.5 hover:bg-blue"
              >
                Ver catálogo completo
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </SectionReveal>
          </div>
        </section>

        {/* ============ PROJETOS (gateway geral) ============ */}
        <ProjectsGateway />

        {/* ============ POSICIONAMENTO ============ */}
        <section id="posicionamento" className="bg-white py-24 lg:py-32">
          <div className="fohat-shell grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
            <SectionReveal>
              <span className="fohat-eyebrow">Nossa crença</span>
              <h2 className="fohat-h2 mt-5 max-w-[540px]">
                A tecnologia não precisa afastar as pessoas do mundo. Ela pode devolvê-las a ele.
              </h2>
              <p className="mt-6 text-muted-foreground">
                Projetamos tecnologia com intenção, integração e foco no que permanece para o
                público.
              </p>
            </SectionReveal>

            <SectionReveal
              delay={100}
              className="rounded-3xl border border-line bg-mist p-8 lg:p-10"
            >
              <span className="fohat-eyebrow">Nosso método</span>
              <h3 className="fohat-h2 mt-4 [font-size:clamp(1.5rem,2.4vw,2rem)]">
                A presença é projetada, não improvisada.
              </h3>
              <p className="mt-5 text-muted-foreground">
                A FOHAT conecta intenção, narrativa, tecnologia, espaço e execução por meio de um
                método próprio.
              </p>
              <Link
                to="/engenharia-de-presenca"
                hash="metodo"
                className="group mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-navy px-6 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 hover:bg-blue"
              >
                Conheça o Método FOHAT
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </SectionReveal>
          </div>
        </section>

        {/* ============ PARCEIROS — REDE ============ */}
        <PartnersNetwork />

        {/* ============ CTA FINAL — magnético ============ */}
        <section
          id="contato"
          className="overflow-hidden py-20"
          style={{
            background: "linear-gradient(135deg, oklch(0.88 0.018 250), oklch(0.98 0.006 250))",
          }}
        >
          <div className="fohat-shell">
            <SectionReveal className="relative overflow-hidden rounded-[38px] bg-navy p-10 text-white sm:p-16 lg:p-[70px]">
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
                Presença, sistema ou infraestrutura — conte o que você precisa colocar em
                funcionamento.
              </h2>
              <p className="mt-6 max-w-[700px] text-lg text-[oklch(0.85_0.02_250)] lg:text-xl">
                A ideia não precisa estar pronta. A FOHAT ajuda a encontrar o caminho entre a
                intenção e a execução.
              </p>
              <div className="relative z-10 mt-8">
                <MagneticCTA strength={12}>
                  <ContactDialog>
                    <button className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-navy shadow-[0_14px_40px_oklch(0_0_0_/_0.2)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cyan">
                      Conte sua ideia
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </ContactDialog>
                </MagneticCTA>
              </div>
            </SectionReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
