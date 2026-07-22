import { createFileRoute } from "@tanstack/react-router";

import { SubpageShell } from "@/components/fohat/SubpageShell";

import { SubpageCTA } from "@/components/fohat/Subpage";

import { SystemsHero } from "@/components/fohat/systems/SystemsHero";
import { SystemsArchitecture } from "@/components/fohat/systems/SystemsArchitecture";
import { CapabilityNetwork } from "@/components/fohat/systems/CapabilityNetwork";
import { ProductFlow } from "@/components/fohat/systems/ProductFlow";
import { ProductPipeline } from "@/components/fohat/systems/ProductPipeline";
import { DeliveryModels } from "@/components/fohat/systems/DeliveryModels";

export const Route = createFileRoute("/sistemas-e-aplicativos")({
  head: () => ({
    meta: [
      { title: "Desenvolvimento de Sistemas e Aplicativos | FOHAT" },
      {
        name: "description",
        content:
          "Sistemas web, aplicativos, dashboards, plataformas, integrações e inteligência artificial desenvolvidos pela FOHAT para colocar ideias e operações em funcionamento.",
      },
      {
        property: "og:title",
        content: "Desenvolvimento de Sistemas e Aplicativos | FOHAT",
      },
      {
        property: "og:description",
        content:
          "Soluções digitais sob medida para empresas, projetos, eventos e operações que precisam organizar processos e criar novas formas de interação.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/sistemas-e-aplicativos" },
    ],
    links: [{ rel: "canonical", href: "/sistemas-e-aplicativos" }],
  }),
  component: SistemasEAplicativos,
});

function SistemasEAplicativos() {
  return (
    <SubpageShell>

      <SystemsHero />
      <SystemsArchitecture />
      <CapabilityNetwork />
      <ProductFlow />
      <ProductPipeline />
      <DeliveryModels />

      <div id="contato">
        <SubpageCTA
          eyebrow="Sistemas e Aplicativos"
          title="Existe um sistema ou aplicativo que a sua operação precisa, mas ainda não existe pronto no mercado?"
          buttonLabel="Conte o sistema que você precisa desenvolver"
        />
      </div>
    </SubpageShell>
  );
}
