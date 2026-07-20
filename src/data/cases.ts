import eventosAsset from "@/assets/eventos.jpg.asset.json";

/**
 * Estrutura reutilizável para cases da FOHAT.
 * Novos projetos podem ser adicionados a este array sem alterar componentes.
 */
export type CaseCategory =
  | "Cultura"
  | "Marcas"
  | "Eventos e Espaços"
  | "Inteligência Artificial"
  | "Experiências Interativas"
  | "Projeção Mapeada";

export interface CaseSummary {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  tags: string[];
  categories: CaseCategory[];
  cover: { src: string; alt: string };
  featured?: boolean;
}

export const CASE_CATEGORIES: ("Todos" | CaseCategory)[] = [
  "Todos",
  "Cultura",
  "Marcas",
  "Eventos e Espaços",
  "Inteligência Artificial",
  "Experiências Interativas",
  "Projeção Mapeada",
];

export const CASES: CaseSummary[] = [
  {
    slug: "tela-brasil",
    title: "Tela Brasil",
    tagline: "Cinema brasileiro vivido no espaço público.",
    summary:
      "Experiências interativas, inteligência artificial, impressão em tempo real e projeção mapeada em uma operação nacional realizada em seis capitais brasileiras.",
    tags: [
      "Cultura",
      "Inteligência Artificial",
      "Experiência Interativa",
      "Projeção Mapeada",
      "Operação Nacional",
    ],
    categories: [
      "Cultura",
      "Inteligência Artificial",
      "Experiências Interativas",
      "Projeção Mapeada",
    ],
    cover: {
      src: eventosAsset.url,
      alt: "Estação Tela Brasil em espaço público urbano",
    },
    featured: true,
  },
];

export function getCase(slug: string): CaseSummary | undefined {
  return CASES.find((c) => c.slug === slug);
}
