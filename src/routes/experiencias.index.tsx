import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import portalAsset from "@/assets/portal.jpg.asset.json";
import marcasAsset from "@/assets/marcas.jpg.asset.json";
import culturaAsset from "@/assets/cultura.jpg.asset.json";
import eventosAsset from "@/assets/eventos.jpg.asset.json";
import labAsset from "@/assets/lab.jpg.asset.json";

import { SubpageShell } from "@/components/fohat/SubpageShell";
import { InnerHero, InnerCTA } from "@/components/fohat/InnerHero";
import { Reveal } from "@/components/fohat/Reveal";
import { SubpageCTA, Marquee } from "@/components/fohat/Subpage";

export const Route = createFileRoute("/experiencias/")({
  head: () => ({
    meta: [
      { title: "Experiências FOHAT — Marcas, Cultura, Eventos e Parceiros" },
      {
        name: "description",
        content:
          "Os territórios em que a Engenharia de Presença acontece: marcas, cultura, eventos e parcerias tecnológicas.",
      },
      { property: "og:title", content: "Experiências FOHAT" },
      {
        property: "og:description",
        content:
          "Marcas, cultura, eventos e parceiros: os territórios em que a FOHAT projeta presença.",
      },
    ],
  }),
  component: Experiencias,
});

const TERRITORIES = [
  {
    idx: "01",
    to: "/experiencias/marcas",
    title: "FOHAT para Marcas",
    lead: "Comunicação que deixa de apenas falar e começa a ser vivida.",
    img: marcasAsset.url,
    alt: "Público em ativação de marca imersiva",
  },
  {
    idx: "02",
    to: "/experiencias/cultura",
    title: "FOHAT para Cultura",
    lead: "Histórias, identidades e patrimônios transformados em participação.",
    img: culturaAsset.url,
    alt: "Visitante interagindo com narrativa cultural",
  },
  {
    idx: "03",
    to: "/experiencias/eventos",
    title: "Eventos e Espaços",
    lead: "Ambientes que reconhecem, envolvem e respondem ao público.",
    img: eventosAsset.url,
    alt: "Ambiente imersivo de evento",
  },
  {
    idx: "04",
    to: "/parceiros",
    title: "FOHAT para Parceiros",
    lead: "A capacidade tecnológica que transforma conceitos em experiências.",
    img: labAsset.url,
    alt: "Equipe multidisciplinar em laboratório",
  },
];

function Experiencias() {
  return (
    <SubpageShell>
      <InnerHero
        eyebrow="Territórios de atuação"
        breadcrumb={[{ label: "Início", to: "/" }, { label: "Experiências" }]}
        title={
          <>
            A experiência muda. <span className="text-cyan">A Engenharia de Presença permanece.</span>
          </>
        }
        lead="Marcas, cultura, eventos e parceiros chegam com desafios diferentes. A FOHAT conecta cada contexto à tecnologia necessária para criar presença, participação e memória."
        image={{ src: portalAsset.url, alt: "Jornada imersiva conectando público e espaço" }}
        actions={
          <>
            <InnerCTA to="/engenharia-de-presenca" variant="ghost">
              Como funciona o método
            </InnerCTA>
          </>
        }
      />

      <Marquee
        items={[
          "Marcas",
          "Cultura",
          "Eventos",
          "Espaços",
          "Parceiros",
          "Tecnologia",
          "Marcas",
          "Cultura",
          "Eventos",
          "Espaços",
          "Parceiros",
          "Tecnologia",
        ]}
      />

      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-60" />
        <div className="fohat-shell relative">
          <Reveal className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="fohat-eyebrow">Escolha um caminho</span>
              <h2 className="fohat-h2 mt-5">
                Onde sua ideia precisa encontrar o público?
              </h2>
            </div>
            <p className="max-w-[520px] text-muted-foreground">
              Os territórios organizam a conversa comercial sem limitar a solução.
              Cada experiência continua sendo desenhada a partir da intenção.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {TERRITORIES.map((t, i) => (
              <Reveal
                key={t.title}
                as="article"
                delay={i * 100}
                className="group relative min-h-[380px] overflow-hidden rounded-[28px] bg-navy shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-2"
              >
                <Link
                  to={t.to}
                  className="absolute inset-0 z-20"
                  aria-label={t.title}
                />
                <img
                  src={t.img}
                  alt={t.alt}
                  className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.035]"
                />
                <span className="fohat-mono absolute left-6 top-6 z-10 rounded-full border border-white/45 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white">
                  {t.idx}
                </span>
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, oklch(0.22 0.023 250 / 0.02), oklch(0.22 0.023 250 / 0.88) 85%)",
                  }}
                />
                <div className="absolute inset-x-7 bottom-7 z-10 text-white">
                  <h3 className="text-2xl font-bold tracking-tight">{t.title}</h3>
                  <p className="mt-2 text-[oklch(0.88_0.015_250)]">{t.lead}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold">
                    Explorar território
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SubpageCTA
        title="Seu projeto atravessa mais de um território? Ótimo. A FOHAT nasceu para conectar mundos."
        buttonLabel="Conte o desafio"
      />
    </SubpageShell>
  );
}
