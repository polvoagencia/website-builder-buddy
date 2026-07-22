/**
 * Fase 8 — Copy e conteúdo estruturado da nova Home.
 * A rota consome apenas este arquivo para textos, CTAs e capítulos.
 */

export type CoreState = "presenca" | "sistemas" | "infraestrutura";

export const HOME_HERO = {
  eyebrow: "FOHAT · Engenharia de Experiências Tecnológicas",
  titleLines: ["A tecnologia sai da tela.", "Entra no mundo."],
  lead: "Criamos experiências, sistemas e infraestruturas que transformam ideias em presença, interação e operação real.",
  primaryCta: { label: "Conte sua ideia" },
  secondaryCta: { label: "Conheça a FOHAT", targetId: "ativacao" },
} as const;

export const HOME_ACTIVATION = {
  eyebrow: "A tecnologia entra no mundo",
  title: ["Tecnologia não é o destino.", "É o que faz a experiência acontecer."],
  lead: "A FOHAT combina criação, desenvolvimento, equipamentos e operação para construir soluções que deixam o conceito e passam a funcionar no mundo real.",
  arc: ["Conceito", "Sistema", "Interação", "Operação", "Memória"],
} as const;

export interface HomeFront {
  id: string;
  state: CoreState;
  index: string;
  titleLines: string[];
  lead: string;
  cta: { label: string; to: string };
}

export const HOME_FRONTS: HomeFront[] = [
  {
    id: "frente-presenca",
    state: "presenca",
    index: "01",
    titleLines: ["Tecnologia que deixa de ser observada", "e passa a ser vivida."],
    lead: "Criamos experiências em que narrativa, espaço, interação e tecnologia funcionam como uma única presença.",
    cta: { label: "Conheça a Engenharia de Presença", to: "/engenharia-de-presenca" },
  },
  {
    id: "frente-sistemas",
    state: "sistemas",
    index: "02",
    titleLines: ["Ideias transformadas em sistemas", "que organizam, conectam e operam."],
    lead: "Desenvolvemos software, interfaces, integrações e automações sob medida para colocar processos e operações em funcionamento.",
    cta: { label: "Conheça Sistemas e Aplicativos", to: "/sistemas-e-aplicativos" },
  },
  {
    id: "frente-infraestrutura",
    state: "infraestrutura",
    index: "03",
    titleLines: [
      "Infraestrutura preparada para a tecnologia",
      "funcionar no mundo real.",
    ],
    lead: "Equipamentos, configuração, instalação, integração e suporte conforme a necessidade de cada projeto.",
    cta: { label: "Conheça a Locação de Equipamentos", to: "/locacao-de-equipamentos" },
  },
];

export const HOME_PROJECTS = {
  eyebrow: "Projetos em funcionamento",
  title: "Ideias ganham valor quando entram em operação.",
  lead: "Conheça projetos em que estratégia, tecnologia, equipamentos e execução passaram a funcionar como um único sistema.",
  cta: { label: "Conheça nossos projetos", to: "/engenharia-de-presenca/projetos" },
} as const;

export const HOME_BELIEF = {
  titleLines: [
    "A tecnologia não precisa afastar",
    "as pessoas do mundo.",
    "Ela pode devolvê-las a ele.",
  ],
  support: "Projetamos tecnologia para ampliar presença, participação e conexão.",
} as const;

export const HOME_PARTNERS_NOTE = {
  text: "Também atuamos como braço tecnológico de agências, produtoras, cenógrafos, arquitetos e equipes criativas.",
  linkLabel: "Conheça o modelo de parceria",
  to: "/parceiros",
} as const;

export const HOME_FINAL_CTA = {
  eyebrow: "Do conceito à operação",
  title: "O que você precisa colocar em funcionamento?",
  lead: "A ideia não precisa estar pronta. Conte o contexto, o desafio ou a experiência que deseja construir.",
  cta: { label: "Conte sua ideia" },
} as const;
