import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/fohat/Header";
import { Footer } from "@/components/fohat/Footer";

import { HomeLaunchHero } from "@/components/fohat/home-v2/HomeLaunchHero";
import { WorldActivation } from "@/components/fohat/home-v2/WorldActivation";
import { HomeFrontsStory } from "@/components/fohat/home-v2/HomeFrontsStory";
import { HomeProjectsGateway } from "@/components/fohat/home-v2/HomeProjectsGateway";
import { HomeBelief } from "@/components/fohat/home-v2/HomeBelief";
import { HomeFinalCTA } from "@/components/fohat/home-v2/HomeFinalCTA";

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

function Home() {
  return (
    <div className="min-h-screen bg-mist text-navy">
      <Header />
      <main>
        <HomeLaunchHero />
        <WorldActivation />
        <HomeFrontsStory />
        <HomeProjectsGateway />
        <HomeBelief />
        <HomeFinalCTA />
      </main>
      <Footer />
    </div>
  );
}
