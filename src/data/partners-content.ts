/**
 * Conteúdo centralizado da página /parceiros.
 * Preserva integralmente os textos oficiais.
 */

export const PARTNERS_HERO = {
  eyebrow: "FOHAT para Parceiros",
  breadcrumb: [{ label: "Início", to: "/" as const }, { label: "Parceiros" }],
  title: "Grandes ideias criativas precisam de um caminho tecnológico.",
  lead: "Atuamos ao lado de agências, produtoras, cenógrafos, arquitetos e equipes criativas para transformar conceitos em experiências executáveis.",
  ctaLabel: "Construa essa experiência com a FOHAT",
  stages: [
    { label: "Ideia criativa", side: "creation" as const },
    { label: "Viabilidade", side: "bridge" as const },
    { label: "Arquitetura", side: "bridge" as const },
    { label: "Desenvolvimento", side: "tech" as const },
    { label: "Integração", side: "tech" as const },
    { label: "Operação", side: "tech" as const },
  ],
  disciplines: [
    "criação",
    "narrativa",
    "cenografia",
    "arquitetura",
    "tecnologia",
    "conteúdo",
    "equipamentos",
    "operação",
  ],
};

export const PARTNERS_PRINCIPLE = {
  eyebrow: "Princípio da parceria",
  headline: "Assumimos a complexidade tecnológica sem perder a intenção criativa.",
  partner: {
    label: "Parceiro",
    items: ["Ideia", "Conceito", "Direção criativa", "Narrativa", "Relação com o cliente"],
  },
  fohat: {
    label: "FOHAT",
    items: [
      "Viabilidade",
      "Arquitetura tecnológica",
      "Desenvolvimento",
      "Integração",
      "Implantação",
      "Operação",
    ],
  },
  note: "O desenho de responsabilidades é definido conforme cada projeto. Estas listas são uma representação de responsabilidades possíveis, não uma divisão contratual obrigatória.",
};

export const PARTNERS_ENTRY = {
  eyebrow: "Pontos de entrada",
  title: "Do primeiro estudo técnico à operação diante do público.",
  intro:
    "A parceria pode começar na concorrência, no detalhamento de uma ideia, na prova de conceito ou em uma demanda de desenvolvimento já definida.",
  points: [
    {
      id: "white-label",
      label: "White label",
      desc: "A FOHAT atua como braço tecnológico da entrega do parceiro.",
    },
    {
      id: "coproducao",
      label: "Coprodução",
      desc: "As equipes constroem e apresentam juntas a solução.",
    },
    {
      id: "prototipagem",
      label: "Prototipagem",
      desc: "As partes críticas da ideia são testadas antes da produção completa.",
    },
    {
      id: "integracao",
      label: "Integração",
      desc: "Sistemas, equipamentos, conteúdos e fornecedores passam a funcionar em conjunto.",
    },
    {
      id: "operacao",
      label: "Operação",
      desc: "A solução é implantada, testada e acompanhada no mundo real.",
    },
  ],
};

export const PARTNERS_CAPABILITIES = {
  eyebrow: "Capacidades de parceria",
  title: "Uma arquitetura de colaboração ao redor do projeto executável.",
  intro:
    "As capacidades são combinadas conforme o conceito, o escopo, o prazo e as condições de operação.",
  center: "Projeto executável",
  items: [
    {
      id: "consultoria",
      label: "Consultoria tecnológica",
      desc: "Traduzimos o conceito em arquitetura, escopo e decisões técnicas.",
      links: ["prova", "desenvolvimento"],
    },
    {
      id: "prova",
      label: "Provas de conceito",
      desc: "Validamos as partes mais críticas antes da produção completa.",
      links: ["consultoria", "desenvolvimento", "integracao"],
    },
    {
      id: "desenvolvimento",
      label: "Desenvolvimento",
      desc: "Criamos software, IA e interfaces sob medida para a experiência.",
      links: ["prova", "integracao"],
    },
    {
      id: "integracao",
      label: "Integração",
      desc: "Conectamos sistemas, equipamentos, conteúdos e fornecedores.",
      links: ["desenvolvimento", "implantacao"],
    },
    {
      id: "implantacao",
      label: "Implantação",
      desc: "Testamos no espaço, treinamos a operação e acompanhamos a abertura.",
      links: ["integracao", "suporte"],
    },
    {
      id: "suporte",
      label: "Suporte",
      desc: "Monitoramento, contingência e evolução durante e depois da entrega.",
      links: ["implantacao"],
    },
  ],
};

export const PARTNERS_TRANSPARENCY = {
  eyebrow: "Transparência e viabilidade",
  title: "Atuamos com transparência sobre limites, riscos e caminhos de execução.",
  commitments: [
    {
      title: "Viabilidade antes da promessa",
      desc: "Antes de comprometer entrega, mapeamos o que é possível fazer nas condições do projeto.",
    },
    {
      title: "Riscos apresentados com clareza",
      desc: "Dependências, incertezas e pontos frágeis aparecem cedo, não no meio da execução.",
    },
    {
      title: "Escopo construído em conjunto",
      desc: "As decisões de escopo são tomadas junto com o parceiro, com base no que o projeto precisa.",
    },
    {
      title: "Decisões técnicas conectadas à intenção criativa",
      desc: "Cada escolha de tecnologia responde ao que a ideia precisa dizer diante do público.",
    },
  ],
};

export const PARTNERS_MODELS = {
  eyebrow: "Modelos de atuação",
  title: "A FOHAT pode aparecer ao lado da sua marca ou trabalhar nos bastidores.",
  axes: {
    x: { min: "Bastidores", max: "Assinado em conjunto", label: "Visibilidade" },
    y: {
      min: "Projeto pontual",
      max: "Relação contínua",
      label: "Momento da relação",
    },
  },
  models: [
    {
      id: "parceria-aberta",
      label: "Parceria aberta",
      desc: "As empresas assinam juntas a construção da experiência.",
      // matrix position 0..1 (x = visibility, y = duration)
      x: 0.82,
      y: 0.28,
    },
    {
      id: "white-label",
      label: "White label",
      desc: "A FOHAT atua como braço tecnológico da entrega do parceiro.",
      x: 0.18,
      y: 0.3,
    },
    {
      id: "concorrencias",
      label: "Concorrências",
      desc: "Apoiamos viabilidade, escopo, narrativa técnica e orçamento.",
      x: 0.52,
      y: 0.2,
    },
    {
      id: "recorrencia",
      label: "Recorrência",
      desc: "Construímos uma relação contínua para diferentes clientes e projetos.",
      x: 0.6,
      y: 0.82,
    },
  ],
  note: "Formatos possíveis de colaboração. Não são planos, hierarquias ou condições comerciais.",
};

export const PARTNERS_FRONTS = {
  eyebrow: "Capacidades que podem entrar na parceria",
  title: "Três frentes oficiais mobilizadas conforme o projeto.",
  intro:
    "Parceiros é uma forma de trabalhar com a FOHAT. As capacidades que entram em cada parceria vêm das três frentes oficiais.",
  fronts: [
    {
      id: "engenharia",
      label: "Engenharia de Presença",
      desc: "Para conceber e colocar experiências tecnológicas em funcionamento diante do público.",
      to: "/engenharia-de-presenca" as const,
    },
    {
      id: "sistemas",
      label: "Sistemas e Aplicativos",
      desc: "Para desenvolver software, interfaces, plataformas, integrações e automações.",
      to: "/sistemas-e-aplicativos" as const,
    },
    {
      id: "locacao",
      label: "Locação de Equipamentos",
      desc: "Para fornecer infraestrutura tecnológica, configuração, instalação e suporte conforme disponibilidade.",
      to: "/locacao-de-equipamentos" as const,
    },
  ],
};

export const PARTNERS_FLOW = {
  eyebrow: "Fluxo de colaboração",
  title: "Como uma conversa entre parceiros pode evoluir.",
  steps: [
    {
      title: "Ideia ou demanda",
      desc: "O parceiro apresenta o conceito, contexto ou desafio.",
    },
    {
      title: "Leitura técnica",
      desc: "A FOHAT identifica possibilidades, dependências e riscos.",
    },
    {
      title: "Desenho da atuação",
      desc: "As equipes definem responsabilidades, escopo e forma de colaboração.",
    },
    {
      title: "Construção",
      desc: "Tecnologia, conteúdo, equipamentos e operação são integrados.",
    },
    {
      title: "Entrega",
      desc: "A solução é testada e colocada em funcionamento conforme o projeto.",
    },
  ],
  note: "O ponto de entrada e o desenho da colaboração variam conforme cada projeto.",
};

export const PARTNERS_CTA = {
  title: "Você tem a ideia. Nós ajudamos a construir o caminho até o público.",
  intro: "Conte em que etapa o projeto está e onde a tecnologia precisa entrar.",
  buttonLabel: "Construa com a FOHAT",
};

