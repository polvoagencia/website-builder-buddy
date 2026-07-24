import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/fohat/Header";
import { Footer } from "@/components/fohat/Footer";

import { CinematicHero } from "@/components/fohat/home-v2/CinematicHero";
import { Numbers } from "@/components/fohat/home-v2/Numbers";
import { Frontiers } from "@/components/fohat/home-v2/Frontiers";
import { Belief } from "@/components/fohat/home-v2/Belief";
import { Vitrine } from "@/components/fohat/home-v2/Vitrine";
import { Projects } from "@/components/fohat/home-v2/Projects";
import { Partners } from "@/components/fohat/home-v2/Partners";
import { FinalCTA } from "@/components/fohat/home-v2/FinalCTA";
import { ChapterDots } from "@/components/fohat/home-v2/ChapterDots";
import { ScrollProgressBar } from "@/components/fohat/home-v2/ScrollProgressBar";

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

/**
 * Home v2 — a scroll-driven cinematic narrative in 8 chapters.
 *
 *   01 · Cold open              CinematicHero
 *   02 · The numbers            Numbers
 *   03 · The three frontiers    Frontiers   (pinned storytelling)
 *   04 · The belief             Belief       (bg interpolates navy → mist)
 *   05 · The vitrine            Vitrine      (pinned horizontal scroll)
 *   06 · The projects           Projects     (SVG network draws itself)
 *   07 · The partners           Partners     (radial diagram)
 *   08 · Final CTA              FinalCTA     (magnetic button)
 *
 * ChapterDots and ScrollProgressBar are global overlays that read the
 * page scroll to orient the visitor within the narrative.
 *
 * Design principles applied throughout:
 *   · One motion signal per section (useScroll on a section ref) is
 *     preferred over multiple parallel animations for narrative clarity.
 *   · Every scroll-driven animation has a prefers-reduced-motion fallback.
 *   · Mobile falls back to sequential layouts where pinning would fight
 *     the OS gesture stack.
 *   · Existing design tokens and utilities are reused (`fohat-shell`,
 *     `fohat-h1`, `fohat-mono`, `--color-cyan`, etc.). This keeps the
 *     rewrite consistent with the rest of the site and pages that link
 *     into it (subpages, dialogs).
 */
function Home() {
  const chapters = [
    { id: "inicio", label: "Início" },
    { id: "numeros", label: "Engenharia" },
    { id: "frentes", label: "Frentes" },
    { id: "crenca", label: "Crença" },
    { id: "locacao", label: "Locação" },
    { id: "projetos", label: "Projetos" },
    { id: "parceiros", label: "Parceiros" },
    { id: "contato", label: "Contato" },
  ];

  return (
    <div className="min-h-screen bg-mist text-navy">
      <ScrollProgressBar />
      <ChapterDots chapters={chapters} />
      <Header />

      <main>
        <CinematicHero />
        <Numbers />
        <Frontiers />
        <Belief />
        <Vitrine />
        <Projects />
        <Partners />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
