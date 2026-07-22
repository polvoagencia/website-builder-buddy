import { createFileRoute } from "@tanstack/react-router";

import { SubpageShell } from "@/components/fohat/SubpageShell";

import { EVENTS } from "@/data/presence-territories-content";
import { TerritoryMethodReference } from "@/components/fohat/territories/shared/TerritoryMethodReference";
import { TerritoryContactCTA } from "@/components/fohat/territories/shared/TerritoryContactCTA";
import { EventsHero } from "@/components/fohat/territories/events/EventsHero";
import { ResponsiveSpace } from "@/components/fohat/territories/events/ResponsiveSpace";
import { EventJourneyMap } from "@/components/fohat/territories/events/EventJourneyMap";
import { EventPossibilities } from "@/components/fohat/territories/events/EventPossibilities";
import { EventOperationLayers } from "@/components/fohat/territories/events/EventOperationLayers";

export const Route = createFileRoute("/engenharia-de-presenca/eventos-e-espacos")({
  head: () => ({
    meta: [
      { title: "Engenharia de Presença para Eventos e Espaços | FOHAT" },
      {
        name: "description",
        content:
          "Feiras, congressos, festivais, estandes e ambientes transformados em jornadas participativas com projeção, sensores, IA e integração.",
      },
      {
        property: "og:title",
        content: "Engenharia de Presença para Eventos e Espaços | FOHAT",
      },
      {
        property: "og:description",
        content: "Um espaço pode receber pessoas. Ou pode reagir à presença delas.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/engenharia-de-presenca/eventos-e-espacos" },
    ],
    links: [{ rel: "canonical", href: "/engenharia-de-presenca/eventos-e-espacos" }],
  }),
  component: Eventos,
});

function Eventos() {
  return (
    <SubpageShell>
      <EventsHero />
      <TerritoryMethodReference />
      <ResponsiveSpace />
      <EventJourneyMap />
      <EventPossibilities />
      <EventOperationLayers />
      <TerritoryContactCTA
        tone="events"
        sourcePage="/engenharia-de-presenca/eventos-e-espacos"
        title={EVENTS.contactCTA.title}
        buttonLabel={EVENTS.contactCTA.button}
      />
    </SubpageShell>
  );
}
