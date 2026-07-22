import { createFileRoute } from "@tanstack/react-router";

import culturaAsset from "@/assets/cultura.jpg.asset.json";
import portalAsset from "@/assets/portal.jpg.asset.json";

import { SubpageShell } from "@/components/fohat/SubpageShell";
import { InnerHero, InnerCTA } from "@/components/fohat/InnerHero";
import {
  QuoteBand,
  SplitMedia,
  ContentList,
  ProcessLine,
  SubpageCTA,
} from "@/components/fohat/Subpage";
import { MethodReference } from "./engenharia-de-presenca.marcas";

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
        content:
          "A cultura não precisa ser apenas observada. Ela pode ser vivida.",
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
      <InnerHero
        eyebrow="Engenharia de Presença · Cultura"
        breadcrumb={[
          { label: "Início", to: "/" },
          { label: "Engenharia de Presença", to: "/engenharia-de-presenca" },
          { label: "Cultura" },
        ]}
        title={
          <>
            A cultura não precisa ser apenas observada.{" "}
            <span className="text-cyan">Ela pode ser vivida.</span>
          </>
        }
        lead="Criamos novas formas de aproximação entre pessoas, histórias, obras, memórias e territórios."
        image={{ src: culturaAsset.url, alt: "Visitante interagindo com conteúdo cultural" }}
        actions={
          <InnerCTA to="/" hash="contato">
            Transforme uma história em experiência
          </InnerCTA>
        }
      />

      <MethodReference />

      <QuoteBand
        eyebrow="Nossa visão"
        quote={
          <>
            A tecnologia não substitui a obra, a história ou o patrimônio. Ela
            abre novas portas de entrada.
          </>
        }
      />

      <SplitMedia
        eyebrow="O que transformamos"
        title="Conteúdo em presença. Acervo em relação. Memória em participação."
        lead="A experiência cultural ganha camadas de interação sem perder a profundidade do conteúdo. O digital aproxima, contextualiza e convida o visitante a explorar."
        tags={["História", "Identidade", "Patrimônio", "Educação", "Pertencimento"]}
        image={{
          src: portalAsset.url,
          alt: "Experiência imersiva em ambiente cultural",
          caption:
            "O visitante deixa de apenas conhecer a história e passa a estabelecer uma relação com ela.",
        }}
      />

      <ContentList
        eyebrow="Possibilidades"
        title="Novas portas para histórias que precisam permanecer vivas"
        intro="Cada projeto respeita o conteúdo, o território e o público ao qual pertence."
        items={[
          { title: "Exposições interativas", desc: "Jornadas em que o visitante explora, escolhe e interfere na narrativa." },
          { title: "Museus e acervos", desc: "Interfaces que conectam peças, documentos e contextos sem competir com eles." },
          { title: "Cinema e audiovisual", desc: "Experiências que colocam o público dentro de cenas, gêneros e universos." },
          { title: "Memória e patrimônio", desc: "Tecnologia para tornar histórias locais acessíveis, próximas e participativas." },
          { title: "Educação cultural", desc: "Interações que transformam conhecimento em descoberta ativa." },
          { title: "Turismo e território", desc: "Jornadas digitais integradas ao espaço e à identidade do lugar." },
        ]}
      />

      <ProcessLine
        eyebrow="Desafios específicos"
        title="A tecnologia entra para aproximar o público da cultura, não para ficar entre eles."
        steps={[
          { title: "Escuta", desc: "Compreendemos o conteúdo, seus guardiões e sua responsabilidade cultural." },
          { title: "Mediação", desc: "Criamos caminhos de acesso para diferentes públicos e repertórios." },
          { title: "Participação", desc: "Transformamos o visitante em agente da descoberta." },
          { title: "Permanência", desc: "Projetamos vínculo, aprendizado e vontade de continuar explorando." },
        ]}
      />

      <SubpageCTA
        title="Que história precisa encontrar novas formas de chegar às pessoas?"
        buttonLabel="Transforme uma história em experiência"
      />
    </SubpageShell>
  );
}
