/**
 * Conteúdo centralizado das três páginas-território da Engenharia de Presença.
 * As rotas leem daqui; nenhum texto é inventado.
 * Preserva ordem, terminologia e significado do conteúdo original.
 */

export type TerritorySlug = "marcas" | "cultura" | "eventos-e-espacos";

/* -------------------------------------------------------------- */
/*  MARCAS                                                        */
/* -------------------------------------------------------------- */

export const BRANDS = {
  eyebrow: "Engenharia de Presença · Marcas",
  breadcrumb: [
    { label: "Início", to: "/" },
    { label: "Engenharia de Presença", to: "/engenharia-de-presenca" },
    { label: "Marcas" },
  ],
  hero: {
    titleLead: "Marcas podem ser vistas.",
    titleAccent: "Também podem ser vividas.",
    lead: "Criamos experiências tecnológicas que transformam mensagens em participação e interação em memória.",
    cta: "Crie uma experiência para sua marca",
    diagram: ["Mensagem", "Participação", "Personalização", "Memória"],
  },
  challenge: {
    passive: "Campanhas são vistas por alguns segundos.",
    active: "Experiências podem permanecer associadas à marca.",
  },
  shift: {
    title: "Da mensagem recebida à experiência compartilhada.",
    body: "A FOHAT coloca o público dentro da narrativa da marca. Cada escolha, gesto ou participação passa a interferir no que acontece e pode gerar um resultado pessoal, físico ou compartilhável.",
    loop: [
      "Mensagem",
      "Convite",
      "Participação",
      "Resposta",
      "Resultado",
      "Compartilhamento",
      "Memória",
    ],
    pillars: ["Participação", "Personalização", "Conteúdo", "Relacionamento", "Memória de marca"],
  },
  possibilities: [
    {
      key: "ativacoes",
      title: "Ativações interativas",
      desc: "Experiências para campanhas, patrocínios, feiras e pontos de contato.",
    },
    {
      key: "ia",
      title: "IA personalizada",
      desc: "Imagens, narrativas e conteúdos que respondem a cada participante.",
    },
    {
      key: "lancamentos",
      title: "Lançamentos",
      desc: "Ambientes e jornadas que tornam a apresentação de uma novidade participativa.",
    },
    {
      key: "conteudo",
      title: "Conteúdo do público",
      desc: "Experiências capazes de gerar registros pessoais e compartilhamento espontâneo.",
    },
    {
      key: "gamificacao",
      title: "Gamificação",
      desc: "Desafios, escolhas e progressões conectados ao universo da marca.",
    },
    {
      key: "fisica",
      title: "Personalização física",
      desc: "Brindes, impressões ou entregas criadas em tempo real a partir da interação.",
    },
  ],
  journey: {
    message: "Não basta chamar atenção. É preciso criar um motivo para participar.",
    steps: [
      { title: "Intenção", desc: "Definimos a relação que a marca deseja construir." },
      { title: "Narrativa", desc: "Transformamos mensagem em uma jornada que convida à ação." },
      {
        title: "Tecnologia",
        desc: "Escolhemos as capacidades que tornam cada participação única.",
      },
      { title: "Memória", desc: "Projetamos o que o público leva, compartilha e associa à marca." },
    ],
  },
  formats: [
    {
      tag: "Entrada",
      title: "Diagnóstico de Presença",
      desc: "Organizamos objetivo, público, contexto e oportunidades.",
    },
    {
      tag: "Validação",
      title: "Protótipo de Presença",
      desc: "Testamos interação, tecnologia e viabilidade antes da escala.",
    },
    {
      tag: "Principal",
      title: "Projeto Completo",
      desc: "Concebemos, desenvolvemos, integramos e colocamos a experiência no mundo.",
    },
  ],
  contactCTA: {
    title: "O que sua marca gostaria que as pessoas vivessem, e não apenas vissem?",
    button: "Crie uma experiência para sua marca",
  },
} as const;

/* -------------------------------------------------------------- */
/*  CULTURA                                                       */
/* -------------------------------------------------------------- */

export const CULTURE = {
  eyebrow: "Engenharia de Presença · Cultura",
  breadcrumb: [
    { label: "Início", to: "/" },
    { label: "Engenharia de Presença", to: "/engenharia-de-presenca" },
    { label: "Cultura" },
  ],
  hero: {
    titleLead: "A cultura não precisa ser apenas observada.",
    titleAccent: "Ela pode ser vivida.",
    lead: "Criamos novas formas de aproximação entre pessoas, histórias, obras, memórias e territórios.",
    cta: "Transforme uma história em experiência",
    fragments: ["História", "Acervo", "Território", "Memória", "Patrimônio"],
  },
  manifesto: {
    quote:
      "A tecnologia não substitui a obra, a história ou o patrimônio. Ela abre novas portas de entrada.",
    mediators: ["Mediação", "Contexto", "Acesso", "Tradução", "Convite", "Continuidade"],
  },
  layers: {
    title: "Conteúdo em presença. Acervo em relação. Memória em participação.",
    body: "A experiência cultural ganha camadas de interação sem perder a profundidade do conteúdo. O digital aproxima, contextualiza e convida o visitante a explorar.",
    items: [
      { label: "História", note: "linhas de tempo e narrativa" },
      { label: "Identidade", note: "reconhecimento e pertencimento" },
      { label: "Patrimônio", note: "obras, documentos, lugares" },
      { label: "Educação", note: "descoberta ativa e repertório" },
      { label: "Pertencimento", note: "vínculo com território e comunidade" },
    ],
  },
  possibilities: [
    {
      key: "exposicoes",
      title: "Exposições interativas",
      desc: "Jornadas em que o visitante explora, escolhe e interfere na narrativa.",
    },
    {
      key: "museus",
      title: "Museus e acervos",
      desc: "Interfaces que conectam peças, documentos e contextos sem competir com eles.",
    },
    {
      key: "cinema",
      title: "Cinema e audiovisual",
      desc: "Experiências que colocam o público dentro de cenas, gêneros e universos.",
    },
    {
      key: "memoria",
      title: "Memória e patrimônio",
      desc: "Tecnologia para tornar histórias locais acessíveis, próximas e participativas.",
    },
    {
      key: "educacao",
      title: "Educação cultural",
      desc: "Interações que transformam conhecimento em descoberta ativa.",
    },
    {
      key: "turismo",
      title: "Turismo e território",
      desc: "Jornadas digitais integradas ao espaço e à identidade do lugar.",
    },
  ],
  mediation: {
    message: "A tecnologia entra para aproximar o público da cultura, não para ficar entre eles.",
    steps: [
      {
        title: "Escuta",
        desc: "Compreendemos o conteúdo, seus guardiões e sua responsabilidade cultural.",
      },
      {
        title: "Mediação",
        desc: "Criamos caminhos de acesso para diferentes públicos e repertórios.",
      },
      { title: "Participação", desc: "Transformamos o visitante em agente da descoberta." },
      {
        title: "Permanência",
        desc: "Projetamos vínculo, aprendizado e vontade de continuar explorando.",
      },
    ],
  },
  contactCTA: {
    title: "Que história precisa encontrar novas formas de chegar às pessoas?",
    button: "Transforme uma história em experiência",
  },
} as const;

/* -------------------------------------------------------------- */
/*  EVENTOS E ESPAÇOS                                             */
/* -------------------------------------------------------------- */

export const EVENTS = {
  eyebrow: "Engenharia de Presença · Eventos e Espaços",
  breadcrumb: [
    { label: "Início", to: "/" },
    { label: "Engenharia de Presença", to: "/engenharia-de-presenca" },
    { label: "Eventos e Espaços" },
  ],
  hero: {
    titleLead: "Um espaço pode receber pessoas.",
    titleAccent: "Ou pode reagir à presença delas.",
    lead: "Transformamos feiras, congressos, festivais, estandes e ambientes em jornadas participativas.",
    cta: "Transforme seu espaço em experiência",
    zones: ["Entrada", "Circulação", "Interação", "Ambiente", "Entrega"],
  },
  responsive: {
    quote:
      "O ambiente deixa de ser apenas cenário quando reconhece, envolve e responde ao público.",
    states: [
      { label: "Vazio", desc: "O espaço aguarda em repouso." },
      { label: "Aproximação", desc: "A presença começa a ser reconhecida." },
      { label: "Reconhecimento", desc: "O ambiente identifica o público." },
      { label: "Ativação", desc: "Luz, som e sistema respondem." },
      { label: "Continuidade", desc: "A jornada segue além do ponto de contato." },
    ],
  },
  journeyMap: {
    title: "Fluxo em jornada. Circulação em participação. Espaço em experiência.",
    body: "A FOHAT pode criar um ponto de interação ou conectar diferentes momentos do evento, da chegada à memória levada para casa.",
    pillars: ["Fluxo", "Interação", "Ambiente", "Personalização", "Operação"],
    steps: ["Chegada", "Descoberta", "Interação", "Participação", "Entrega", "Memória"],
    note: "A jornada não precisa conter todas as etapas em todos os projetos. É uma possibilidade de integração.",
  },
  possibilities: [
    {
      key: "estandes",
      title: "Estandes interativos",
      desc: "Experiências que criam motivo para entrar, permanecer e compartilhar.",
    },
    {
      key: "ambientes",
      title: "Ambientes imersivos",
      desc: "Projeções, luz, som, interfaces e participação integrados ao espaço.",
    },
    {
      key: "totens",
      title: "Totens com intenção",
      desc: "Pontos de interação que fazem parte da jornada, em vez de apenas ocupar área.",
    },
    {
      key: "credenciamento",
      title: "Credenciamento criativo",
      desc: "A chegada como primeiro capítulo da experiência.",
    },
    {
      key: "votacao",
      title: "Votação e participação",
      desc: "O público interfere em conteúdos, decisões e resultados em tempo real.",
    },
    {
      key: "entrega",
      title: "Entrega personalizada",
      desc: "Conteúdos, imagens e objetos gerados a partir da participação.",
    },
  ],
  operation: {
    message: "No mundo real, conceito, tecnologia e operação precisam funcionar juntos.",
    layers: [
      {
        title: "Condições físicas",
        desc: "Analisamos ambiente, fluxo, tempo, infraestrutura e contexto.",
        pillar: "Espaço",
      },
      {
        title: "Experiência do público",
        desc: "Definimos o que acontece antes, durante e depois da interação.",
        pillar: "Jornada",
      },
      {
        title: "Infraestrutura e sistemas",
        desc: "Software, equipamentos e equipe operam como um único sistema.",
        pillar: "Integração",
      },
      {
        title: "Preparação operacional",
        desc: "Testamos condições reais e preparamos caminhos de segurança.",
        pillar: "Contingência",
      },
    ],
  },
  contactCTA: {
    title: "Como o seu espaço pode reconhecer e responder à presença do público?",
    button: "Transforme seu espaço em experiência",
  },
} as const;
