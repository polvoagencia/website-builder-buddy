import { createFileRoute } from "@tanstack/react-router";

import eventosAsset from "@/assets/eventos.jpg.asset.json";
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

export const Route = createFileRoute("/experiencias/eventos")({
  head: () => ({
    meta: [
      { title: "FOHAT para Eventos e Espaços — Ambientes que reagem" },
      {
        name: "description",
        content:
          "Feiras, congressos, festivais, estandes e ambientes transformados em jornadas participativas com projeção, sensores, IA e integração.",
      },
      { property: "og:title", content: "FOHAT para Eventos e Espaços" },
      {
        property: "og:description",
        content:
          "Um espaço pode receber pessoas. Ou pode reagir à presença delas.",
      },
    ],
  }),
  component: Eventos,
});

function Eventos() {
  return (
    <SubpageShell>
      <InnerHero
        eyebrow="FOHAT para Eventos e Espaços"
        breadcrumb={[
          { label: "Início", to: "/" },
          { label: "Experiências", to: "/experiencias" },
          { label: "Eventos e Espaços" },
        ]}
        title={
          <>
            Um espaço pode receber pessoas.{" "}
            <span className="text-cyan">Ou pode reagir à presença delas.</span>
          </>
        }
        lead="Transformamos feiras, congressos, festivais, estandes e ambientes em jornadas participativas."
        image={{ src: eventosAsset.url, alt: "Pessoas em instalação imersiva de evento" }}
        actions={
          <InnerCTA to="/" hash="contato">
            Transforme seu espaço em experiência
          </InnerCTA>
        }
      />

      <QuoteBand
        eyebrow="O desafio"
        quote={
          <>
            O ambiente deixa de ser apenas cenário quando reconhece, envolve e
            responde ao público.
          </>
        }
      />

      <SplitMedia
        eyebrow="O que transformamos"
        title="Fluxo em jornada. Circulação em participação. Espaço em experiência."
        lead="A FOHAT pode criar um ponto de interação ou conectar diferentes momentos do evento, da chegada à memória levada para casa."
        tags={["Fluxo", "Interação", "Ambiente", "Personalização", "Operação"]}
        image={{
          src: portalAsset.url,
          alt: "Ambiente imersivo de luz e tecnologia",
          caption:
            "O espaço se torna parte ativa da narrativa e da participação.",
        }}
        reverse
      />

      <ContentList
        eyebrow="Possibilidades"
        title="Da recepção ao conteúdo que permanece"
        intro="As experiências podem ser temporárias, itinerantes ou permanentes."
        items={[
          { title: "Estandes interativos", desc: "Experiências que criam motivo para entrar, permanecer e compartilhar." },
          { title: "Ambientes imersivos", desc: "Projeções, luz, som, interfaces e participação integrados ao espaço." },
          { title: "Totens com intenção", desc: "Pontos de interação que fazem parte da jornada, em vez de apenas ocupar área." },
          { title: "Credenciamento criativo", desc: "A chegada como primeiro capítulo da experiência." },
          { title: "Votação e participação", desc: "O público interfere em conteúdos, decisões e resultados em tempo real." },
          { title: "Entrega personalizada", desc: "Conteúdos, imagens e objetos gerados a partir da participação." },
        ]}
      />

      <ProcessLine
        eyebrow="Engenharia de Presença aplicada"
        title="No mundo real, conceito, tecnologia e operação precisam funcionar juntos."
        steps={[
          { title: "Espaço", desc: "Analisamos ambiente, fluxo, tempo, infraestrutura e contexto." },
          { title: "Jornada", desc: "Definimos o que acontece antes, durante e depois da interação." },
          { title: "Integração", desc: "Software, equipamentos e equipe operam como um único sistema." },
          { title: "Contingência", desc: "Testamos condições reais e preparamos caminhos de segurança." },
        ]}
      />

      <SubpageCTA
        title="Como o seu espaço pode reconhecer e responder à presença do público?"
        buttonLabel="Transforme seu espaço em experiência"
      />
    </SubpageShell>
  );
}
