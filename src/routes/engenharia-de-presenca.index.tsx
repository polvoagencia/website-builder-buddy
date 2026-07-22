import { createFileRoute } from "@tanstack/react-router";

import { SubpageShell } from "@/components/fohat/SubpageShell";
import { ProgressRail } from "@/components/fohat/motion/ProgressRail";
import { SubpageCTA } from "@/components/fohat/Subpage";

import { PresenceHero } from "@/components/fohat/engineering/PresenceHero";
import { PresenceDefinition } from "@/components/fohat/engineering/PresenceDefinition";
import { PresenceFormula } from "@/components/fohat/engineering/PresenceFormula";
import { FohatMethodStory } from "@/components/fohat/engineering/FohatMethodStory";
import { PresenceJourney } from "@/components/fohat/engineering/PresenceJourney";
import { PresencePrinciples } from "@/components/fohat/engineering/PresencePrinciples";
import { PresenceTerritories } from "@/components/fohat/engineering/PresenceTerritories";
import { PresenceProjects } from "@/components/fohat/engineering/PresenceProjects";

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
      <ProgressRail
        contextLabel="Engenharia · FOHAT"
        chapters={[
          { id: "visao-geral", label: "Visão geral" },
          { id: "formula", label: "Fórmula" },
          { id: "metodo", label: "Método" },
          { id: "jornada", label: "Jornada" },
          { id: "pilares", label: "Pilares" },
          { id: "territorios", label: "Territórios" },
          { id: "projetos", label: "Projetos" },
          { id: "contato", label: "Contato" },
        ]}
      />

      <PresenceHero />
      <PresenceDefinition />
      <PresenceFormula />
      <FohatMethodStory />
      <PresenceJourney />
      <PresencePrinciples />
      <PresenceTerritories />
      <PresenceProjects />

      <div id="contato">
        <SubpageCTA
          eyebrow="Comece pela intenção"
          title="O que você gostaria que o público vivesse, sentisse ou lembrasse?"
          buttonLabel="Conte sua ideia"
        />
      </div>
    </SubpageShell>
  );
}
