import { createFileRoute } from "@tanstack/react-router";

import { SubpageShell } from "@/components/fohat/SubpageShell";


import { CULTURE } from "@/data/presence-territories-content";
import { TerritoryMethodReference } from "@/components/fohat/territories/shared/TerritoryMethodReference";
import { TerritoryContactCTA } from "@/components/fohat/territories/shared/TerritoryContactCTA";
import { CultureHero } from "@/components/fohat/territories/culture/CultureHero";
import { CultureManifesto } from "@/components/fohat/territories/culture/CultureManifesto";
import { CultureLayers } from "@/components/fohat/territories/culture/CultureLayers";
import { CulturePossibilities } from "@/components/fohat/territories/culture/CulturePossibilities";
import { CultureMediationJourney } from "@/components/fohat/territories/culture/CultureMediationJourney";

export const Route = createFileRoute("/engenharia-de-presenca/cultura")({
  head: () => ({
    meta: [
      { title: "Engenharia de Presença para Cultura | FOHAT" },
      {
        name: "description",
        content:
          "Tecnologia para exposições, museus, cinema, memória, educação e turismo cultural. A obra permanece no centro; a interação amplia acesso e pertencimento.",
      },
      { property: "og:title", content: "Engenharia de Presença para Cultura | FOHAT" },
      {
        property: "og:description",
        content: "A cultura não precisa ser apenas observada. Ela pode ser vivida.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/engenharia-de-presenca/cultura" },
    ],
    links: [{ rel: "canonical", href: "/engenharia-de-presenca/cultura" }],
  }),
  component: Cultura,
});

function Cultura() {
  return (
    <SubpageShell>
      
      <CultureHero />
      <TerritoryMethodReference />
      <CultureManifesto />
      <CultureLayers />
      <CulturePossibilities />
      <CultureMediationJourney />
      <TerritoryContactCTA
        tone="culture"
        sourcePage="/engenharia-de-presenca/cultura"
        title={CULTURE.contactCTA.title}
        buttonLabel={CULTURE.contactCTA.button}
      />
    </SubpageShell>
  );
}
