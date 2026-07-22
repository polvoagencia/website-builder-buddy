import { createFileRoute } from "@tanstack/react-router";

import { SubpageShell } from "@/components/fohat/SubpageShell";
import { ProgressRail } from "@/components/fohat/motion/ProgressRail";

import { RentalHero } from "@/components/fohat/rental/RentalHero";
import { RentalModes } from "@/components/fohat/rental/RentalModes";
import { RentalCatalog } from "@/components/fohat/rental/RentalCatalog";
import { RentalProcess } from "@/components/fohat/rental/RentalProcess";
import { RentalDifferentials } from "@/components/fohat/rental/RentalDifferentials";
import { RentalOperationProof } from "@/components/fohat/rental/RentalOperationProof";
import { RentalAvailabilityCTA } from "@/components/fohat/rental/RentalAvailabilityCTA";
import { RentalMobileBar } from "@/components/fohat/rental/RentalMobileBar";

export const Route = createFileRoute("/locacao-de-equipamentos")({
  head: () => ({
    meta: [
      { title: "Locação de Equipamentos Tecnológicos | FOHAT" },
      {
        name: "description",
        content:
          "Locação de impressoras, televisões, totens, computadores, notebooks, tablets e equipamentos tecnológicos para eventos, ativações, exposições e projetos especiais.",
      },
      {
        property: "og:title",
        content: "Locação de Equipamentos Tecnológicos | FOHAT",
      },
      {
        property: "og:description",
        content:
          "Infraestrutura tecnológica para eventos, ativações, feiras, exposições e experiências interativas.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/locacao-de-equipamentos" },
    ],
    links: [{ rel: "canonical", href: "/locacao-de-equipamentos" }],
  }),
  component: LocacaoPage,
});

function LocacaoPage() {
  return (
    <SubpageShell>
      <ProgressRail
        contextLabel="Locação · FOHAT"
        chapters={[
          { id: "visao-geral", label: "Visão geral" },
          { id: "formatos", label: "Formatos" },
          { id: "catalogo", label: "Catálogo" },
          { id: "processo", label: "Processo" },
          { id: "diferenciais", label: "Diferenciais" },
          { id: "capacidade", label: "Capacidade" },
          { id: "solicitar", label: "Solicitar" },
        ]}
      />

      <RentalHero />
      <RentalModes />
      <RentalCatalog />
      <RentalProcess />
      <RentalDifferentials />
      <RentalOperationProof />
      <RentalAvailabilityCTA />

      <RentalMobileBar />
    </SubpageShell>
  );
}
