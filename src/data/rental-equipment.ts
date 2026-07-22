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

/* ----------------------------------------------------------
 * Catálogo visual reutilizável — Home + página de locação.
 * Enquanto as fotografias reais do estoque FOHAT não forem
 * fornecidas, cada item usa uma imagem ilustrativa marcada
 * com `illustrativeImage: true`.
 * -------------------------------------------------------- */

import impressorasImg from "@/assets/rental/impressoras.jpg";
import televisoesImg from "@/assets/rental/televisoes.jpg";
import totensImg from "@/assets/rental/totens.jpg";
import computadoresImg from "@/assets/rental/computadores.jpg";
import tabletsImg from "@/assets/rental/tablets.jpg";
import acessoriosImg from "@/assets/rental/acessorios.jpg";

export type RentalFilterSlug =
  | "todos"
  | "impressao"
  | "exibicao"
  | "interacao"
  | "processamento"
  | "mobilidade"
  | "acessorios";

export interface RentalCatalogItem {
  slug: RentalCategorySlug;
  name: string;
  category: string;
  filter: Exclude<RentalFilterSlug, "todos">;
  shortDescription: string;
  fullDescription: string;
  image: string;
  imageAlt: string;
  uses: string[];
  featured: boolean;
  illustrativeImage: boolean;
  defaultFormOption: (typeof RENTAL_EQUIPMENT_OPTIONS)[number];
}

export const RENTAL_CATALOG_ITEMS: RentalCatalogItem[] = [
  {
    slug: "impressoras",
    name: "Impressoras profissionais",
    category: "Impressão",
    filter: "impressao",
    shortDescription:
      "Impressão rápida de fotografias e materiais personalizados durante eventos e ativações.",
    fullDescription:
      "Equipamentos preparados para impressão rápida durante eventos, ativações e experiências. Podem compor fluxos de impressão instantânea, lembranças personalizadas e ativações com inteligência artificial. Modelos, quantidades e insumos são confirmados conforme a disponibilidade e o escopo do projeto.",
    image: impressorasImg,
    imageAlt:
      "Impressora compacta sobre fundo neutro em enquadramento de catálogo",
    uses: [
      "Impressão instantânea",
      "Experiências fotográficas",
      "Lembranças personalizadas",
      "Ativações com inteligência artificial",
      "Impressão em eventos",
    ],
    featured: true,
    illustrativeImage: true,
    defaultFormOption: "Impressoras",
  },
  {
    slug: "televisoes",
    name: "Televisões e monitores",
    category: "Exibição",
    filter: "exibicao",
    shortDescription:
      "Telas para conteúdos audiovisuais, apresentações, exposições e experiências em diferentes ambientes.",
    fullDescription:
      "Telas para exibição de conteúdos audiovisuais, sinalização, apresentações, experiências interativas e ambientação de espaços. Utilizadas em estandes, exposições, eventos e distribuição para múltiplos pontos, conforme a configuração aprovada.",
    image: televisoesImg,
    imageAlt: "Monitor de tela plana centralizado em fundo neutro de estúdio",
    uses: [
      "Exibição de vídeos",
      "Sinalização",
      "Estandes",
      "Exposições",
      "Eventos",
      "Distribuição para múltiplos pontos",
    ],
    featured: true,
    illustrativeImage: true,
    defaultFormOption: "Televisões",
  },
  {
    slug: "totens",
    name: "Totens tecnológicos",
    category: "Interação",
    filter: "interacao",
    shortDescription:
      "Estruturas preparadas para interfaces, cadastros, quizzes, captura de imagens e experiências interativas.",
    fullDescription:
      "Estruturas para receber interfaces interativas, cadastros, quizzes, inteligência artificial, captura de imagens, jogos e jornadas digitais. Configuração, conteúdo e integração são definidos junto do escopo de cada projeto.",
    image: totensImg,
    imageAlt: "Totem vertical com tela touch em fundo neutro de estúdio",
    uses: [
      "Ativações interativas",
      "Inteligência artificial",
      "Credenciamento",
      "Pesquisas",
      "Geração de conteúdo",
      "Jornadas digitais",
    ],
    featured: true,
    illustrativeImage: true,
    defaultFormOption: "Totens",
  },
  {
    slug: "computadores",
    name: "Computadores e notebooks",
    category: "Processamento",
    filter: "processamento",
    shortDescription:
      "Equipamentos para processamento, operação, controle audiovisual e suporte de sistemas tecnológicos.",
    fullDescription:
      "Máquinas para operação, processamento de imagens, controle audiovisual, dashboards, apresentações e estações temporárias de trabalho. Especificações e volumes definidos conforme a operação técnica do projeto.",
    image: computadoresImg,
    imageAlt:
      "Notebook aberto centralizado sobre fundo neutro em enquadramento de catálogo",
    uses: [
      "Operação de sistemas",
      "Processamento de imagens",
      "Controle audiovisual",
      "Dashboards",
      "Apresentações",
      "Estações temporárias de trabalho",
    ],
    featured: true,
    illustrativeImage: true,
    defaultFormOption: "Computadores ou notebooks",
  },
  {
    slug: "tablets",
    name: "Tablets",
    category: "Mobilidade",
    filter: "mobilidade",
    shortDescription:
      "Dispositivos para formulários, quizzes, atendimento, credenciamento e interação com o público.",
    fullDescription:
      "Dispositivos móveis para cadastros, pesquisas, quizzes, recomendação de conteúdo, credenciamento e apoio a equipes em campo. Podem compor jornadas itinerantes ou pontos fixos de atendimento.",
    image: tabletsImg,
    imageAlt: "Tablet moderno centralizado sobre fundo neutro de estúdio",
    uses: [
      "Cadastros",
      "Pesquisas",
      "Quizzes",
      "Recomendação de conteúdo",
      "Credenciamento",
      "Apoio a equipes",
    ],
    featured: false,
    illustrativeImage: true,
    defaultFormOption: "Tablets",
  },
  {
    slug: "acessorios",
    name: "Equipamentos e acessórios complementares",
    category: "Acessórios",
    filter: "acessorios",
    shortDescription:
      "Componentes que completam a estrutura tecnológica e ajudam a manter toda a operação conectada.",
    fullDescription:
      "Fones de ouvido, sistemas de distribuição de áudio, câmeras, roteadores, cabos, conexões, suportes e periféricos que apoiam a operação técnica das experiências. Composição definida conforme cada projeto.",
    image: acessoriosImg,
    imageAlt:
      "Conjunto de acessórios de tecnologia — fones, cabos e adaptadores — em composição de estúdio",
    uses: [
      "Fones de ouvido",
      "Sistemas de distribuição de áudio",
      "Câmeras",
      "Roteadores",
      "Cabos e conexões",
      "Suportes",
      "Periféricos",
    ],
    featured: false,
    illustrativeImage: true,
    defaultFormOption: "Acessórios",
  },
];

export const RENTAL_FILTERS: { slug: RentalFilterSlug; label: string }[] = [
  { slug: "todos", label: "Todos" },
  { slug: "impressao", label: "Impressão" },
  { slug: "exibicao", label: "Exibição" },
  { slug: "interacao", label: "Interação" },
  { slug: "processamento", label: "Processamento" },
  { slug: "mobilidade", label: "Mobilidade" },
  { slug: "acessorios", label: "Acessórios" },
];
