import { createFileRoute } from "@tanstack/react-router";

import labAsset from "@/assets/lab.jpg.asset.json";
import portalAsset from "@/assets/portal.jpg.asset.json";

import { SubpageShell } from "@/components/fohat/SubpageShell";
import { InnerHero, InnerCTA } from "@/components/fohat/InnerHero";
import {
  QuoteBand,
  SplitMedia,
  ContentList,
  ProcessLine,
  FormatGrid,
  SubpageCTA,
  Marquee,
} from "@/components/fohat/Subpage";

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
      <InnerHero
        eyebrow="Frente digital · FOHAT"
        breadcrumb={[
          { label: "Início", to: "/" },
          { label: "Sistemas e Aplicativos" },
        ]}
        title={
          <>
            Sistemas e aplicativos desenvolvidos para{" "}
            <span className="text-cyan">
              colocar ideias e operações em funcionamento.
            </span>
          </>
        }
        lead="A FOHAT desenvolve soluções digitais sob medida para empresas, projetos, eventos e operações que precisam organizar processos, conectar informações e criar novas formas de interação."
        image={{
          src: labAsset.url,
          alt: "Equipe desenvolvendo sistemas e aplicativos",
        }}
        actions={
          <InnerCTA to="/" hash="contato">
            Conte o sistema que você precisa desenvolver
          </InnerCTA>
        }
      />

      <Marquee
        items={[
          "Sistemas web",
          "Aplicativos",
          "Dashboards",
          "Integrações",
          "Automações",
          "Inteligência artificial",
          "Plataformas operacionais",
          "APIs",
        ]}
      />

      <QuoteBand
        eyebrow="Nossa lógica"
        quote={
          <>
            O software começa pela operação real que precisa funcionar. A
            tecnologia entra para servir o processo, não o contrário.
          </>
        }
      />

      <SplitMedia
        eyebrow="O que desenvolvemos"
        title="Do primeiro protótipo à operação em produção."
        lead="Concebemos, desenvolvemos e evoluímos sistemas e aplicativos que organizam informações, conectam pessoas e sustentam operações no mundo real."
        tags={[
          "Web",
          "Mobile",
          "Dashboards",
          "APIs",
          "IA",
          "Integrações",
        ]}
        image={{
          src: portalAsset.url,
          alt: "Interfaces digitais em uso operacional",
          caption:
            "Um bom sistema desaparece dentro da operação. Ele só é lembrado quando funciona.",
        }}
      />

      <ContentList
        eyebrow="Capacidades"
        title="O que a FOHAT pode desenvolver"
        intro="Cada capacidade é combinada de acordo com o problema real do cliente. Não é um cardápio fechado."
        items={[
          {
            title: "Sistemas web",
            desc: "Plataformas acessíveis pelo navegador para gestão, operação, atendimento, organização e acompanhamento.",
          },
          {
            title: "Aplicativos",
            desc: "Soluções digitais para uso do público, equipes, participantes ou operadores.",
          },
          {
            title: "Dashboards",
            desc: "Painéis para acompanhamento de indicadores, utilização, fluxo e operação.",
          },
          {
            title: "Inteligência artificial e automações",
            desc: "Soluções para geração, processamento, personalização e automação de tarefas.",
          },
          {
            title: "Integrações",
            desc: "Conexão entre sistemas, APIs, equipamentos, bancos de dados e serviços externos.",
          },
          {
            title: "Plataformas para experiências",
            desc: "Sistemas utilizados em totens, tablets, estações interativas e operações presenciais.",
          },
        ]}
      />

      <ProcessLine
        eyebrow="Como trabalhamos"
        title="Um caminho técnico transparente, do problema à operação."
        steps={[
          { title: "Entendimento", desc: "Mapeamos o problema, os usuários e o contexto de operação." },
          { title: "Arquitetura", desc: "Definimos stack, integrações, dados e caminhos de evolução." },
          { title: "Desenvolvimento", desc: "Construímos em ciclos curtos, com validação contínua." },
          { title: "Operação", desc: "Colocamos em produção com monitoramento, suporte e evolução." },
        ]}
      />

      <FormatGrid
        eyebrow="Formas de contratação"
        title="Do MVP à evolução contínua"
        items={[
          {
            tag: "Entrada",
            title: "Discovery técnico",
            desc: "Estudo de viabilidade, arquitetura e escopo antes do desenvolvimento.",
          },
          {
            tag: "Validação",
            title: "MVP funcional",
            desc: "Primeira versão utilizável para validar hipóteses e valor real.",
          },
          {
            tag: "Principal",
            title: "Produto e evolução",
            desc: "Desenvolvimento contínuo, suporte, monitoramento e novas funcionalidades.",
          },
        ]}
      />

      <SubpageCTA
        eyebrow="Sistemas e Aplicativos"
        title="Existe um sistema ou aplicativo que a sua operação precisa, mas ainda não existe pronto no mercado?"
        buttonLabel="Conte o sistema que você precisa desenvolver"
      />
    </SubpageShell>
  );
}
