import { createFileRoute } from "@tanstack/react-router";

import marcasAsset from "@/assets/marcas.jpg.asset.json";
import heroAsset from "@/assets/hero.jpg.asset.json";

import { SubpageShell } from "@/components/fohat/SubpageShell";
import { InnerHero, InnerCTA } from "@/components/fohat/InnerHero";
import {
  QuoteBand,
  SplitMedia,
  ContentList,
  ProcessLine,
  FormatGrid,
  SubpageCTA,
} from "@/components/fohat/Subpage";

export const Route = createFileRoute("/experiencias/marcas")({
  head: () => ({
    meta: [
      { title: "FOHAT para Marcas — Experiências que viram memória" },
      {
        name: "description",
        content:
          "Ativações e experiências tecnológicas que transformam comunicação de marca em participação, personalização e memória compartilhável.",
      },
      { property: "og:title", content: "FOHAT para Marcas" },
      {
        property: "og:description",
        content:
          "Marcas podem ser vistas. Também podem ser vividas. Experiências tecnológicas com IA, gamificação e personalização.",
      },
    ],
  }),
  component: Marcas,
});

function Marcas() {
  return (
    <SubpageShell>
      <InnerHero
        eyebrow="FOHAT para Marcas"
        breadcrumb={[
          { label: "Início", to: "/" },
          { label: "Experiências", to: "/experiencias" },
          { label: "Marcas" },
        ]}
        title={
          <>
            Marcas podem ser vistas.{" "}
            <span className="text-cyan">Também podem ser vividas.</span>
          </>
        }
        lead="Criamos experiências tecnológicas que transformam mensagens em participação e interação em memória."
        image={{ src: marcasAsset.url, alt: "Público em ativação tecnológica de marca" }}
        actions={
          <>
            <InnerCTA to="/" hash="contato">
              Crie uma experiência para sua marca
            </InnerCTA>
            <InnerCTA to="/tecnologia" variant="ghost">
              Ver capacidades tecnológicas
            </InnerCTA>
          </>
        }
      />

      <QuoteBand
        eyebrow="O desafio"
        quote={
          <>
            Campanhas são vistas por alguns segundos. Experiências podem
            permanecer associadas à marca.
          </>
        }
      />

      <SplitMedia
        eyebrow="O que transformamos"
        title="Da mensagem recebida à experiência compartilhada."
        lead="A FOHAT coloca o público dentro da narrativa da marca. Cada escolha, gesto ou participação passa a interferir no que acontece e pode gerar um resultado pessoal, físico ou compartilhável."
        tags={[
          "Participação",
          "Personalização",
          "Conteúdo",
          "Relacionamento",
          "Memória de marca",
        ]}
        image={{
          src: heroAsset.url,
          alt: "Interação em evento de marca premium",
          caption:
            "A marca deixa de falar sozinha e começa a construir a experiência com as pessoas.",
        }}
        reverse
      />

      <ContentList
        eyebrow="Possibilidades"
        title="Experiências desenhadas para cada intenção"
        intro="As soluções abaixo são pontos de partida, não produtos fechados."
        items={[
          { title: "Ativações interativas", desc: "Experiências para campanhas, patrocínios, feiras e pontos de contato." },
          { title: "IA personalizada", desc: "Imagens, narrativas e conteúdos que respondem a cada participante." },
          { title: "Lançamentos", desc: "Ambientes e jornadas que tornam a apresentação de uma novidade participativa." },
          { title: "Conteúdo do público", desc: "Experiências capazes de gerar registros pessoais e compartilhamento espontâneo." },
          { title: "Gamificação", desc: "Desafios, escolhas e progressões conectados ao universo da marca." },
          { title: "Personalização física", desc: "Brindes, impressões ou entregas criadas em tempo real a partir da interação." },
        ]}
      />

      <ProcessLine
        eyebrow="Engenharia de Presença aplicada"
        title="Não basta chamar atenção. É preciso criar um motivo para participar."
        steps={[
          { title: "Intenção", desc: "Definimos a relação que a marca deseja construir." },
          { title: "Narrativa", desc: "Transformamos mensagem em uma jornada que convida à ação." },
          { title: "Tecnologia", desc: "Escolhemos as capacidades que tornam cada participação única." },
          { title: "Memória", desc: "Projetamos o que o público leva, compartilha e associa à marca." },
        ]}
      />

      <FormatGrid
        eyebrow="Formatos de contratação"
        title="Do diagnóstico à ativação completa"
        items={[
          { tag: "Entrada", title: "Diagnóstico de Presença", desc: "Organizamos objetivo, público, contexto e oportunidades." },
          { tag: "Validação", title: "Protótipo de Presença", desc: "Testamos interação, tecnologia e viabilidade antes da escala." },
          { tag: "Principal", title: "Projeto Completo", desc: "Concebemos, desenvolvemos, integramos e colocamos a experiência no mundo." },
        ]}
      />

      <SubpageCTA
        title="O que sua marca gostaria que as pessoas vivessem, e não apenas vissem?"
        buttonLabel="Crie uma experiência para sua marca"
      />
    </SubpageShell>
  );
}
