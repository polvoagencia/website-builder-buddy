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
  SubpageCTA,
} from "@/components/fohat/Subpage";

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
    ],
  }),
  component: Parceiros,
});

function Parceiros() {
  return (
    <SubpageShell>
      <InnerHero
        eyebrow="FOHAT para Parceiros"
        breadcrumb={[{ label: "Início", to: "/" }, { label: "Parceiros" }]}
        title={
          <>
            Grandes ideias criativas precisam de{" "}
            <span className="text-cyan">um caminho tecnológico.</span>
          </>
        }
        lead="Atuamos ao lado de agências, produtoras, cenógrafos, arquitetos e equipes criativas para transformar conceitos em experiências executáveis."
        image={{
          src: labAsset.url,
          alt: "Equipe colaborando sobre projeto de experiência",
        }}
        actions={
          <InnerCTA to="/" hash="contato">
            Construa essa experiência com a FOHAT
          </InnerCTA>
        }
      />

      <QuoteBand
        eyebrow="Parceria"
        quote={<>Assumimos a complexidade tecnológica sem perder a intenção criativa.</>}
      />

      <SplitMedia
        eyebrow="Como podemos entrar"
        title="Do primeiro estudo técnico à operação diante do público."
        lead="A parceria pode começar na concorrência, no detalhamento de uma ideia, na prova de conceito ou em uma demanda de desenvolvimento já definida."
        tags={["White label", "Coprodução", "Prototipagem", "Integração", "Operação"]}
        image={{
          src: portalAsset.url,
          alt: "Equipe multidisciplinar em laboratório tecnológico",
          caption:
            "A ideia do parceiro permanece no centro. A FOHAT constrói a infraestrutura que a torna possível.",
        }}
      />

      <ContentList
        eyebrow="Capacidades de parceria"
        title="Uma extensão tecnológica da equipe criativa"
        intro="Atuamos com transparência sobre limites, riscos e caminhos de execução."
        items={[
          { title: "Consultoria tecnológica", desc: "Traduzimos o conceito em arquitetura, escopo e decisões técnicas." },
          { title: "Provas de conceito", desc: "Validamos as partes mais críticas antes da produção completa." },
          { title: "Desenvolvimento", desc: "Criamos software, IA e interfaces sob medida para a experiência." },
          { title: "Integração", desc: "Conectamos sistemas, equipamentos, conteúdos e fornecedores." },
          { title: "Implantação", desc: "Testamos no espaço, treinamos a operação e acompanhamos a abertura." },
          { title: "Suporte", desc: "Monitoramento, contingência e evolução durante e depois da entrega." },
        ]}
      />

      <ProcessLine
        eyebrow="Modelos de atuação"
        title="A FOHAT pode aparecer ao lado da sua marca ou trabalhar nos bastidores."
        steps={[
          { title: "Parceria aberta", desc: "As empresas assinam juntas a construção da experiência." },
          { title: "White label", desc: "A FOHAT atua como braço tecnológico da entrega do parceiro." },
          { title: "Concorrências", desc: "Apoiamos viabilidade, escopo, narrativa técnica e orçamento." },
          { title: "Recorrência", desc: "Construímos uma relação contínua para diferentes clientes e projetos." },
        ]}
      />

      <SubpageCTA
        title="Você tem a ideia. Nós ajudamos a construir o caminho até o público."
        buttonLabel="Construa com a FOHAT"
      />
    </SubpageShell>
  );
}
