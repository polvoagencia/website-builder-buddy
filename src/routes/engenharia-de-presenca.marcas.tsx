import { createFileRoute } from "@tanstack/react-router";

import { SubpageShell } from "@/components/fohat/SubpageShell";

import { BRANDS } from "@/data/presence-territories-content";
import { TerritoryMethodReference } from "@/components/fohat/territories/shared/TerritoryMethodReference";
import { TerritoryContactCTA } from "@/components/fohat/territories/shared/TerritoryContactCTA";
import { BrandsHero } from "@/components/fohat/territories/brands/BrandsHero";
import { BrandParticipationShift } from "@/components/fohat/territories/brands/BrandParticipationShift";
import { BrandEngagementCircuit } from "@/components/fohat/territories/brands/BrandEngagementCircuit";
import { BrandPossibilities } from "@/components/fohat/territories/brands/BrandPossibilities";
import { BrandEngagementJourney } from "@/components/fohat/territories/brands/BrandEngagementJourney";
import { BrandDeliveryModels } from "@/components/fohat/territories/brands/BrandDeliveryModels";

export const Route = createFileRoute("/engenharia-de-presenca/marcas")({
  head: () => ({
    meta: [
      { title: "Engenharia de Presença para Marcas | FOHAT" },
      {
        name: "description",
        content:
          "Ativações e experiências tecnológicas que transformam comunicação de marca em participação, personalização e memória compartilhável.",
      },
      { property: "og:title", content: "Engenharia de Presença para Marcas | FOHAT" },
      {
        property: "og:description",
        content:
          "Marcas podem ser vistas. Também podem ser vividas. Experiências tecnológicas com IA, gamificação e personalização.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/engenharia-de-presenca/marcas" },
    ],
    links: [{ rel: "canonical", href: "/engenharia-de-presenca/marcas" }],
  }),
  component: Marcas,
});

function Marcas() {
  return (
    <SubpageShell>
      <BrandsHero />
      <TerritoryMethodReference />
      <BrandParticipationShift />
      <BrandEngagementCircuit />
      <BrandPossibilities />
      <BrandEngagementJourney />
      <BrandDeliveryModels />
      <TerritoryContactCTA
        tone="brands"
        sourcePage="/engenharia-de-presenca/marcas"
        title={BRANDS.contactCTA.title}
        buttonLabel={BRANDS.contactCTA.button}
      />
    </SubpageShell>
  );
}
