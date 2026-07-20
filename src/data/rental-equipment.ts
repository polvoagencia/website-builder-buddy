/**
 * Catálogo modular de equipamentos para locação.
 * Novos equipamentos e categorias podem ser adicionados aqui sem alterar
 * componentes. Preparado para futura integração com CMS/banco de dados.
 */

export type RentalCategorySlug =
  | "impressoras"
  | "televisoes"
  | "totens"
  | "computadores"
  | "tablets"
  | "acessorios";

export interface RentalItem {
  /** Descrição genérica — não inventar marca/modelo/spec. */
  title: string;
  /** Rótulo curto (ex.: "Sujeito a disponibilidade"). */
  note?: string;
}

export interface RentalCategory {
  slug: RentalCategorySlug;
  label: string;
  description: string;
  uses: string[];
  /** Itens são exemplos genéricos, sempre marcados como sujeitos a disponibilidade. */
  items?: RentalItem[];
}

export const RENTAL_CATEGORIES: RentalCategory[] = [
  {
    slug: "impressoras",
    label: "Impressoras profissionais",
    description:
      "Equipamentos para impressão rápida de fotografias e materiais personalizados durante eventos e ativações.",
    uses: [
      "Impressão instantânea",
      "Experiências fotográficas",
      "Ativações com inteligência artificial",
      "Lembranças personalizadas",
      "Impressão durante eventos",
    ],
  },
  {
    slug: "televisoes",
    label: "Televisões e monitores",
    description:
      "Telas para exibição de vídeos, conteúdos, apresentações, experiências interativas e ambientes de evento.",
    uses: [
      "Exibição audiovisual",
      "Sinalização",
      "Exposições",
      "Eventos",
      "Estandes",
      "Experiências culturais",
      "Distribuição para múltiplos pontos",
    ],
  },
  {
    slug: "totens",
    label: "Totens tecnológicos",
    description:
      "Estruturas para interfaces interativas, cadastros, quizzes, inteligência artificial, captura de imagens, jogos e experiências personalizadas.",
    uses: [
      "Ativações",
      "Experiências interativas",
      "Credenciamento",
      "Pesquisas",
      "Geração de conteúdo",
      "Inteligência artificial",
      "Jornadas digitais",
    ],
  },
  {
    slug: "computadores",
    label: "Computadores e notebooks",
    description:
      "Equipamentos para processamento, operação, exibição, controle e suporte de experiências tecnológicas.",
    uses: [
      "Operação de sistemas",
      "Processamento de imagens",
      "Controle audiovisual",
      "Dashboards",
      "Apresentações",
      "Suporte técnico",
      "Estações de trabalho temporárias",
    ],
  },
  {
    slug: "tablets",
    label: "Tablets",
    description:
      "Dispositivos para interação, formulários, quizzes, recomendações, atendimento, credenciamento e controle de experiências.",
    uses: [
      "Pesquisas",
      "Quizzes",
      "Cadastros",
      "Recomendação de conteúdo",
      "Controle de operação",
      "Ativações itinerantes",
      "Apoio a equipes",
    ],
  },
  {
    slug: "acessorios",
    label: "Equipamentos e acessórios complementares",
    description:
      "A FOHAT também pode disponibilizar acessórios, conexões, sistemas de distribuição, periféricos e outros componentes necessários para a operação.",
    uses: [
      "Fones de ouvido",
      "Sistemas de distribuição de áudio",
      "Suportes",
      "Cabos",
      "Conexões",
      "Periféricos",
      "Roteadores",
      "Equipamentos auxiliares",
      "Câmeras",
      "Acessórios de montagem",
    ],
  },
];

/** Opções da seleção múltipla no formulário de solicitação. */
export const RENTAL_EQUIPMENT_OPTIONS = [
  "Impressoras",
  "Televisões",
  "Totens",
  "Computadores ou notebooks",
  "Tablets",
  "Fones de ouvido",
  "Câmeras",
  "Acessórios",
  "Outros",
] as const;
