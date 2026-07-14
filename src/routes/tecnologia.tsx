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

export const Route = createFileRoute("/tecnologia")({
  head: () => ({
    meta: [
      { title: "Tecnologia de Experiência — FOHAT" },
      {
        name: "description",
        content:
          "IA, software, visão computacional, hardware, dados e infraestrutura combinados a partir da intenção da experiência.",
      },
      { property: "og:title", content: "Tecnologia de Experiência — FOHAT" },
      {
        property: "og:description",
        content:
          "A tecnologia sustenta a experiência. Ela não compete com ela.",
      },
    ],
  }),
  component: Tecnologia,
});

function Tecnologia() {
  return (
    <SubpageShell>
      <InnerHero
        eyebrow="Capacidade transversal"
        breadcrumb={[
          { label: "Início", to: "/" },
          { label: "Tecnologia de Experiência" },
        ]}
        title={
          <>
            A tecnologia sustenta a experiência.{" "}
            <span className="text-cyan">Ela não compete com ela.</span>
          </>
        }
        lead="Desenvolvemos e integramos as capacidades necessárias para que a Engenharia de Presença funcione no mundo real."
        image={{
          src: labAsset.url,
          alt: "Tecnologia conectando pessoas e espaço",
        }}
        actions={
          <InnerCTA to="/" hash="contato">
            Apresente seu desafio tecnológico
          </InnerCTA>
        }
      />

      <Marquee
        items={[
          "IA",
          "Visão computacional",
          "Interfaces multitoque",
          "Projeção",
          "Sensores",
          "Dados",
          "Realidade estendida",
          "Áudio espacial",
          "Cloud edge",
          "IoT",
        ]}
      />

      <QuoteBand
        eyebrow="Nossa lógica"
        quote={
          <>
            Não começamos pela ferramenta. Escolhemos e desenvolvemos a
            tecnologia a partir da experiência que precisa ser criada.
          </>
        }
      />

      <SplitMedia
        eyebrow="Tecnologia de Experiência"
        title="O complexo fica nos bastidores."
        lead="Para o público, a interação precisa ser natural. Nos bastidores, software, IA, equipamentos, dados, infraestrutura e operação precisam trabalhar como uma única engrenagem."
        tags={[
          "Inteligência artificial",
          "Software",
          "Hardware",
          "Dados",
          "Infraestrutura",
        ]}
        image={{
          src: portalAsset.url,
          alt: "Interação humana com tecnologia sensível ao toque",
          caption:
            "A melhor tecnologia da experiência é aquela que ajuda a conexão a acontecer sem exigir atenção para si.",
        }}
      />

      <ContentList
        eyebrow="Capacidades"
        title="O que podemos desenvolver e integrar"
        intro="Estas capacidades nunca são apresentadas como um cardápio isolado. Elas são combinadas a partir da intenção."
        items={[
          { title: "Inteligência artificial", desc: "Geração, transformação e personalização de imagens, textos, áudios e jornadas." },
          { title: "Aplicações e interfaces", desc: "Sistemas web, totens, tablets, painéis e experiências multi-dispositivo." },
          { title: "Visão computacional", desc: "Captura, reconhecimento e resposta a movimentos, objetos e presença." },
          { title: "Integração de hardware", desc: "Câmeras, sensores, impressoras, iluminação, projeção e dispositivos especiais." },
          { title: "Dados e personalização", desc: "Escolhas e informações do participante transformadas em respostas únicas." },
          { title: "Infraestrutura e monitoramento", desc: "Hospedagem, filas de processamento, estabilidade, contingência e suporte." },
        ]}
      />

      <ProcessLine
        eyebrow="Princípios técnicos"
        title="Uma experiência tecnológica precisa sobreviver ao mundo real."
        steps={[
          { title: "Intuitiva", desc: "O público entende o que fazer sem precisar de um manual." },
          { title: "Estável", desc: "A solução é projetada para volume, tempo e condições reais." },
          { title: "Integrada", desc: "Os componentes funcionam como partes de uma única experiência." },
          { title: "Evolutiva", desc: "A arquitetura permite ajustes, novas edições e continuidade." },
        ]}
      />

      <FormatGrid
        eyebrow="Formas de atuação"
        title="Da arquitetura ao suporte contínuo"
        items={[
          { tag: "Exploração", title: "Conceito e Viabilidade", desc: "Definição de caminho técnico, riscos, equipamentos e escopo." },
          { tag: "Validação", title: "Protótipo de Presença", desc: "Prova de conceito funcional para testar as partes críticas." },
          { tag: "Execução", title: "Tecnologia e Integração", desc: "Desenvolvimento, implantação, monitoramento e suporte." },
        ]}
      />

      <SubpageCTA
        title="Existe uma experiência na sua cabeça, mas ainda não existe uma tecnologia pronta para ela?"
        buttonLabel="Apresente o desafio"
      />
    </SubpageShell>
  );
}
