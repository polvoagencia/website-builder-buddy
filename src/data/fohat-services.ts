/**
 * Fonte única de verdade sobre as três frentes comerciais da FOHAT.
 * A Home consome versões resumidas; páginas dedicadas trazem a versão completa.
 */

export type ServiceSlug =
  | "engenharia-de-presenca"
  | "sistemas-e-aplicativos"
  | "locacao-de-equipamentos";

export interface ServiceFront {
  slug: ServiceSlug;
  eyebrow: string;
  title: string;
  lead: string;
  possibilities: string[];
  cta: { label: string; to: string; hash?: string };
}

export const SERVICES: ServiceFront[] = [
  {
    slug: "engenharia-de-presenca",
    eyebrow: "Frente autoral",
    title: "Engenharia de Presença",
    lead: "Projetos que integram tecnologia, narrativa, espaço físico e participação humana para criar experiências vividas, sentidas e lembradas.",
    possibilities: [
      "Ativações interativas",
      "Experiências culturais",
      "Ambientes imersivos",
      "Inteligência artificial",
      "Projeção mapeada",
      "Personalização em tempo real",
    ],
    cta: {
      label: "Conheça a Engenharia de Presença",
      to: "/engenharia-de-presenca",
    },
  },
  {
    slug: "sistemas-e-aplicativos",
    eyebrow: "Frente digital",
    title: "Sistemas e Aplicativos",
    lead: "Desenvolvimento de soluções digitais sob medida para organizar operações, conectar informações e transformar ideias em ferramentas utilizáveis.",
    possibilities: [
      "Sistemas web",
      "Aplicativos",
      "Dashboards",
      "Plataformas operacionais",
      "Automações",
      "Integrações",
      "Soluções com inteligência artificial",
    ],
    cta: {
      label: "Conheça nossas soluções digitais",
      to: "/sistemas-e-aplicativos",
    },
  },
  {
    slug: "locacao-de-equipamentos",
    eyebrow: "Frente de infraestrutura",
    title: "Locação de Equipamentos",
    lead: "Equipamentos tecnológicos para eventos, ativações, exposições, produções e estruturas temporárias.",
    possibilities: [
      "Impressoras",
      "Televisões",
      "Totens",
      "Computadores",
      "Notebooks",
      "Tablets",
      "Acessórios",
    ],
    cta: {
      label: "Conheça os equipamentos",
      to: "/locacao-de-equipamentos",
      hash: "catalogo",
    },
  },
];

/**
 * Territórios em que a Engenharia de Presença é aplicada.
 * Cada território é uma aplicação, não uma frente comercial autônoma.
 */
export interface PresenceTerritory {
  slug: "marcas" | "cultura" | "eventos-e-espacos";
  label: string;
  to: string;
  description: string;
}

export const PRESENCE_TERRITORIES: PresenceTerritory[] = [
  {
    slug: "marcas",
    label: "Marcas",
    to: "/engenharia-de-presenca/marcas",
    description: "Comunicação vira participação e memória.",
  },
  {
    slug: "cultura",
    label: "Cultura",
    to: "/engenharia-de-presenca/cultura",
    description: "Histórias, patrimônios e acervos vividos.",
  },
  {
    slug: "eventos-e-espacos",
    label: "Eventos e Espaços",
    to: "/engenharia-de-presenca/eventos-e-espacos",
    description: "Ambientes que reagem à presença do público.",
  },
];
