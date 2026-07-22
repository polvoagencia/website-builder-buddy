/**
 * Conteúdo centralizado da página de Locação (formatos, processo,
 * diferenciais e capítulos do ProgressRail). Consumido pelos
 * componentes em `src/components/fohat/rental/`.
 */

export interface RentalMode {
  slug: string;
  title: string;
  short: string;
  description: string;
}

export const RENTAL_MODES: RentalMode[] = [
  {
    slug: "simples",
    title: "Locação simples",
    short: "Somente equipamentos.",
    description:
      "Entrega dos equipamentos para operação pela equipe do cliente. Sem instalação ou suporte técnico incluídos.",
  },
  {
    slug: "instalacao",
    title: "Locação com instalação",
    short: "Instalados e configurados.",
    description:
      "Equipamentos entregues, instalados, configurados e testados pela equipe técnica da FOHAT antes do início da operação.",
  },
  {
    slug: "suporte",
    title: "Locação com suporte técnico",
    short: "Profissional durante o uso.",
    description:
      "Presença de profissional técnico durante o período contratado para acompanhamento, ajustes e resolução de intercorrências.",
  },
  {
    slug: "integrada",
    title: "Locação integrada a um projeto",
    short: "Hardware + software.",
    description:
      "Equipamentos combinados com desenvolvimento tecnológico ou Engenharia de Presença, formando uma operação única.",
  },
  {
    slug: "itinerante",
    title: "Locação itinerante",
    short: "Multi-cidades e etapas.",
    description:
      "Estruturas utilizadas em diferentes cidades ou etapas do projeto, com logística coordenada entre localidades.",
  },
];

export interface RentalStep {
  title: string;
  desc: string;
  keyword: string;
}

export const RENTAL_PROCESS: RentalStep[] = [
  {
    keyword: "Demanda",
    title: "Entendimento da demanda",
    desc: "Identificamos tipo de evento, local, período, público, finalidade e estrutura necessária.",
  },
  {
    keyword: "Seleção",
    title: "Definição dos equipamentos",
    desc: "Selecionamos equipamentos e acessórios adequados ao escopo do projeto.",
  },
  {
    keyword: "Confirmação",
    title: "Confirmação de disponibilidade",
    desc: "Validamos datas, quantidades, logística e formato de contratação.",
  },
  {
    keyword: "Preparação",
    title: "Entrega e configuração",
    desc: "Quando contratado, realizamos instalação, configuração, testes e integração no local.",
  },
  {
    keyword: "Operação",
    title: "Operação e retirada",
    desc: "Suporte técnico durante o uso e retirada após o encerramento, conforme o escopo aprovado.",
  },
];

export interface RentalDifferential {
  title: string;
  desc: string;
}

export const RENTAL_DIFFERENTIALS: RentalDifferential[] = [
  {
    title: "Integração ao projeto",
    desc: "A FOHAT entende a função de cada equipamento dentro da experiência.",
  },
  {
    title: "Configuração técnica",
    desc: "Equipamentos preparados de acordo com sistema, conteúdo ou jornada.",
  },
  {
    title: "Suporte especializado",
    desc: "Acompanhamento técnico durante instalação, testes e execução.",
  },
  {
    title: "Hardware + software",
    desc: "Capacidade de conectar equipamentos, interfaces, sistemas e infraestrutura.",
  },
  {
    title: "Operação multi-cidade",
    desc: "Experiência em estruturas itinerantes e operações em mais de uma localidade.",
  },
  {
    title: "Tecnologia com intenção",
    desc: "Equipamentos existem para que a experiência funcione, não como fim em si.",
  },
];
