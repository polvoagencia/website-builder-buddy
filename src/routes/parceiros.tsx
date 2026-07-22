import { createFileRoute } from "@tanstack/react-router";

import { SubpageShell } from "@/components/fohat/SubpageShell";

import { PartnersHero } from "@/components/fohat/partners/PartnersHero";
import { CreativeTechnologyBridge } from "@/components/fohat/partners/CreativeTechnologyBridge";
import { PartnershipEntryPoints } from "@/components/fohat/partners/PartnershipEntryPoints";
import { PartnershipCapabilities } from "@/components/fohat/partners/PartnershipCapabilities";
import { PartnershipPrinciples } from "@/components/fohat/partners/PartnershipPrinciples";
import { CollaborationModels } from "@/components/fohat/partners/CollaborationModels";
import { PartnersFronts, CollaborationFlow } from "@/components/fohat/partners/PartnersFronts";
import { PartnersContactCTA } from "@/components/fohat/partners/PartnersContactCTA";

export const Route = createFileRoute("/parceiros")({
  head: () => ({
    meta: [
      { title: "FOHAT para Parceiros — Braço tecnológico da experiência" },
      {
        name: "description",
        content:
          "Atuamos ao lado de agências, produtoras, cenógrafos e equipes criativas. White label, coprodução, prototipagem, integração e operação.",
      },
      { property: "og:title", content: "FOHAT para Parceiros" },
      {
        property: "og:description",
        content:
          "Grandes ideias criativas precisam de um caminho tecnológico. A FOHAT constrói esse caminho.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/parceiros" },
    ],
    links: [{ rel: "canonical", href: "/parceiros" }],
  }),
  component: Parceiros,
});

function Parceiros() {
  return (
    <SubpageShell>
      <PartnersHero />
      <CreativeTechnologyBridge />
      <PartnershipEntryPoints />
      <PartnershipCapabilities />
      <PartnershipPrinciples />
      <CollaborationModels />
      <PartnersFronts />
      <CollaborationFlow />
      <PartnersContactCTA />
    </SubpageShell>
  );
}
