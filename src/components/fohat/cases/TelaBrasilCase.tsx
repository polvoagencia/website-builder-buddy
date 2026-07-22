import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronRight } from "lucide-react";

import { SubpageShell } from "@/components/fohat/SubpageShell";
import { Reveal } from "@/components/fohat/Reveal";
import { ContactDialog } from "@/components/fohat/ContactDialog";
import { Marquee } from "@/components/fohat/Subpage";
import {
  CaseSection,
  CaseSectionNav,
  DashboardPlaceholder,
  InfraGrid,
  JourneyDiagram,
  MediaPlaceholder,
  PillarsList,
  ResponsibilityGrid,
  ResultsPlaceholder,
  type SectionAnchor,
} from "@/components/fohat/CaseBlocks";

const SECTIONS: SectionAnchor[] = [
  { id: "visao-geral", label: "Visão geral" },
  { id: "desafio", label: "O desafio" },
  { id: "papel-fohat", label: "Papel da FOHAT" },
  { id: "estacao", label: "Estação Tela Brasil" },
  { id: "pipoca-cena", label: "Pipoca & Cena" },
  { id: "de-um-match", label: "Dê um Match" },
  { id: "curta-tela", label: "Curta Tela Brasil" },
  { id: "projecao", label: "Projeção Mapeada" },
  { id: "infra", label: "Infraestrutura" },
  { id: "operacao", label: "Operação" },
  { id: "dashboards", label: "Dashboards" },
  { id: "engenharia", label: "Engenharia de Presença" },
  { id: "galeria", label: "Galeria" },
  { id: "resultados", label: "Resultados" },
];

const TAGS = [
  "Cultura",
  "Inteligência Artificial",
  "Experiência Interativa",
  "Projeção Mapeada",
  "Operação Nacional",
];

export function TelaBrasilCase() {
  return (
    <SubpageShell>
      {/* ============ CINEMATIC OPENING ============ */}
      <section className="relative overflow-hidden pt-36 pb-16 text-white lg:pt-44 lg:pb-24 fohat-inner-hero">
        <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg-dark" />
        <div aria-hidden className="fohat-scanline" style={{ top: "15%" }} />
        <div aria-hidden className="fohat-scanline" style={{ top: "55%", animationDelay: "6s" }} />

        <div className="fohat-shell relative grid items-end gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <Reveal>
            <nav
              aria-label="Você está aqui"
              className="fohat-mono mb-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-cyan/90"
            >
              <Link to="/" className="text-cyan hover:text-white">
                Início
              </Link>
              <ChevronRight className="h-3 w-3 opacity-50" />
              <Link to="/engenharia-de-presenca" className="text-cyan hover:text-white">
                Engenharia de Presença
              </Link>
              <ChevronRight className="h-3 w-3 opacity-50" />
              <Link to="/engenharia-de-presenca/projetos" className="text-cyan hover:text-white">
                Projetos
              </Link>
              <ChevronRight className="h-3 w-3 opacity-50" />
              <span className="text-white/70">Tela Brasil</span>
            </nav>
            <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
              Case · Cultura
            </span>
            <h1 className="fohat-h1 mt-6 max-w-[820px] text-white [font-size:clamp(2.6rem,5.4vw,5.25rem)]">
              Tela Brasil
            </h1>
            <p className="fohat-lead mt-6 max-w-[640px] text-cyan">
              Cinema brasileiro vivido no espaço público.
            </p>
            <p className="mt-5 max-w-[640px] text-base text-[oklch(0.85_0.02_250)]">
              Tecnologia, inteligência artificial e conteúdo audiovisual conectando pessoas ao
              cinema nacional em seis capitais brasileiras.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <span
                  key={t}
                  className="fohat-mono rounded-full border border-white/25 bg-white/[0.06] px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white/85"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="relative h-[380px] overflow-hidden rounded-[32px_120px_32px_120px] border border-white/10 bg-navy shadow-[var(--shadow-elegant)] lg:h-[520px]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-60"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 50% at 30% 25%, oklch(0.4 0.1 240 / 0.55), transparent 60%), radial-gradient(50% 45% at 75% 80%, oklch(0.5 0.12 210 / 0.4), transparent 65%)",
                }}
              />
              {/* Procedural map — six capitals + three cycles */}
              <svg
                viewBox="0 0 600 780"
                preserveAspectRatio="xMidYMid slice"
                className="absolute inset-0 h-full w-full"
                aria-hidden
              >
                <defs>
                  <linearGradient id="tb-line" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(0.85 0.14 210)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="oklch(0.7 0.15 250)" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                {/* Cycle 01 — Brasília + Goiânia */}
                <line x1="320" y1="200" x2="270" y2="260" stroke="url(#tb-line)" strokeWidth="1" />
                <circle cx="320" cy="200" r="6" fill="oklch(0.9 0.12 210)" />
                <circle cx="270" cy="260" r="6" fill="oklch(0.9 0.12 210)" />
                <text
                  x="340"
                  y="196"
                  fill="oklch(0.95 0.02 250)"
                  fontSize="14"
                  fontFamily="ui-monospace,monospace"
                >
                  Brasília
                </text>
                <text
                  x="150"
                  y="264"
                  fill="oklch(0.95 0.02 250)"
                  fontSize="14"
                  fontFamily="ui-monospace,monospace"
                  textAnchor="end"
                >
                  Goiânia
                </text>
                {/* Cycle 02 — BH + Salvador */}
                <line x1="360" y1="360" x2="470" y2="330" stroke="url(#tb-line)" strokeWidth="1" />
                <circle cx="360" cy="360" r="6" fill="oklch(0.9 0.12 210)" />
                <circle cx="470" cy="330" r="6" fill="oklch(0.9 0.12 210)" />
                <text
                  x="340"
                  y="384"
                  fill="oklch(0.95 0.02 250)"
                  fontSize="14"
                  fontFamily="ui-monospace,monospace"
                  textAnchor="end"
                >
                  Belo Horizonte
                </text>
                <text
                  x="490"
                  y="326"
                  fill="oklch(0.95 0.02 250)"
                  fontSize="14"
                  fontFamily="ui-monospace,monospace"
                >
                  Salvador
                </text>
                {/* Cycle 03 — SP + POA */}
                <line x1="330" y1="500" x2="290" y2="640" stroke="url(#tb-line)" strokeWidth="1" />
                <circle cx="330" cy="500" r="6" fill="oklch(0.9 0.12 210)" />
                <circle cx="290" cy="640" r="6" fill="oklch(0.9 0.12 210)" />
                <text
                  x="350"
                  y="504"
                  fill="oklch(0.95 0.02 250)"
                  fontSize="14"
                  fontFamily="ui-monospace,monospace"
                >
                  São Paulo
                </text>
                <text
                  x="270"
                  y="664"
                  fill="oklch(0.95 0.02 250)"
                  fontSize="14"
                  fontFamily="ui-monospace,monospace"
                  textAnchor="end"
                >
                  Porto Alegre
                </text>

                {/* Cycle brackets */}
                {[
                  { y: 230, label: "Ciclo 01 · 18–20 jun" },
                  { y: 345, label: "Ciclo 02 · 25–27 jun" },
                  { y: 570, label: "Ciclo 03 · 01–03 jul" },
                ].map((c) => (
                  <g key={c.label}>
                    <line
                      x1="40"
                      y1={c.y}
                      x2="90"
                      y2={c.y}
                      stroke="oklch(0.85 0.14 210)"
                      strokeWidth="0.8"
                      opacity="0.6"
                    />
                    <text
                      x="40"
                      y={c.y - 8}
                      fill="oklch(0.85 0.14 210)"
                      fontSize="10"
                      fontFamily="ui-monospace,monospace"
                      letterSpacing="1"
                    >
                      {c.label.toUpperCase()}
                    </text>
                  </g>
                ))}
              </svg>
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 45%, oklch(0.22 0.023 250 / 0.6))",
                }}
              />
              <div className="fohat-mono absolute left-5 top-5 rounded-full border border-white/30 bg-black/25 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
                6 capitais · 3 ciclos
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee
        items={[
          "Brasília",
          "São Paulo",
          "Belo Horizonte",
          "Goiânia",
          "Salvador",
          "Porto Alegre",
          "Inteligência Artificial",
          "Impressão em tempo real",
          "Projeção Mapeada",
        ]}
      />

      <CaseSectionNav items={SECTIONS} />

      {/* ============ VISÃO GERAL ============ */}
      <CaseSection
        id="visao-geral"
        eyebrow="Visão geral"
        title="Uma operação nacional em duas grandes frentes."
        lead="O Tela Brasil levou o cinema brasileiro para espaços de grande circulação em Brasília, São Paulo, Belo Horizonte, Goiânia, Salvador e Porto Alegre."
        variant="light"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-3xl border border-line bg-mist p-8">
            <div className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-blue">
              Frente 01
            </div>
            <h3 className="mt-4 text-2xl font-bold tracking-tight">Estação Tela Brasil</h3>
            <p className="mt-3 text-muted-foreground">
              Um ambiente interativo composto por três experiências: Pipoca & Cena, Dê um Match com
              o Cinema Brasileiro e Curta Tela Brasil.
            </p>
          </Reveal>
          <Reveal delay={100} className="rounded-3xl border border-line bg-mist p-8">
            <div className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-blue">
              Frente 02
            </div>
            <h3 className="mt-4 text-2xl font-bold tracking-tight">Projeção Mapeada</h3>
            <p className="mt-3 text-muted-foreground">
              Conteúdos audiovisuais projetados em prédios e fachadas urbanas, transformando a
              arquitetura das cidades em grandes telas para o cinema nacional.
            </p>
          </Reveal>
        </div>
        <Reveal delay={200} className="mt-8 rounded-3xl border border-line bg-white p-8">
          <p className="text-base text-navy">
            A FOHAT foi responsável pela criação e pelo desenvolvimento das soluções tecnológicas da
            estação, pelo fornecimento da infraestrutura necessária à operação e pelo
            desenvolvimento do conteúdo audiovisual utilizado na projeção mapeada.
          </p>
        </Reveal>
      </CaseSection>

      {/* ============ DESAFIO ============ */}
      <CaseSection
        id="desafio"
        eyebrow="O desafio"
        title="Como transformar o lançamento de uma plataforma de streaming em uma experiência física, participativa e memorável?"
        variant="soft"
      >
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <p className="fohat-lead">Não bastava apenas apresentar o catálogo do Tela Brasil.</p>
            <p className="mt-4 text-muted-foreground">
              A tecnologia precisava funcionar em ambientes de grande circulação, ser intuitiva para
              diferentes públicos e manter o mesmo padrão de experiência em seis capitais.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="mb-4 fohat-mono text-[11px] uppercase tracking-[0.18em] text-blue">
              O público precisava
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {[
                "Assistir",
                "Descobrir",
                "Escolher",
                "Responder",
                "Participar",
                "Aparecer dentro da narrativa",
                "Levar uma lembrança da experiência consigo",
              ].map((s) => (
                <li
                  key={s}
                  className="rounded-2xl border border-line bg-white px-5 py-4 text-sm font-semibold text-navy"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </CaseSection>

      {/* ============ PAPEL DA FOHAT ============ */}
      <CaseSection
        id="papel-fohat"
        eyebrow="Papel da FOHAT"
        title="O que a FOHAT entregou, do software ao suporte presencial."
        lead="A FOHAT foi responsável pela criação e pelo desenvolvimento das soluções tecnológicas da Estação Tela Brasil, pelo fornecimento e integração dos equipamentos e acessórios necessários, pela impressão em tempo real das imagens personalizadas do Pipoca & Cena, pelo monitoramento de fluxo com inteligência artificial, pela criação dos dashboards de acompanhamento operacional, pelo suporte técnico presencial em cada capital e pelo desenvolvimento do conteúdo audiovisual da projeção mapeada."
        variant="light"
      >
        <ResponsibilityGrid
          items={[
            {
              title: "Desenvolvimento tecnológico",
              desc: "Criação dos sistemas, interfaces, jornadas e integrações utilizados nos totens, tablets e demais dispositivos.",
            },
            {
              title: "Inteligência artificial",
              desc: "Aplicação de IA para geração das imagens personalizadas do Pipoca & Cena e para a contagem de pessoas nas estações.",
            },
            {
              title: "Equipamentos e acessórios",
              desc: "Fornecimento e integração dos equipamentos necessários para colocar as experiências em funcionamento.",
            },
            {
              title: "Impressão em tempo real",
              desc: "Estrutura profissional para imprimir durante a ativação as imagens geradas no Pipoca & Cena.",
            },
            {
              title: "Dashboards operacionais",
              desc: "Monitoramento centralizado e em tempo real dos principais indicadores de cada capital.",
            },
            {
              title: "Suporte presencial",
              desc: "Disponibilização de um técnico de TI em cada capital durante a execução.",
            },
            {
              title: "Conteúdo audiovisual",
              desc: "Desenvolvimento do conteúdo utilizado nas projeções mapeadas.",
            },
          ]}
        />
      </CaseSection>

      {/* ============ ARQUITETURA DA EXPERIÊNCIA ============ */}
      <CaseSection
        id="estacao"
        eyebrow="Estação Tela Brasil"
        title="A jornada do público, do descobrir ao levar consigo."
        variant="soft"
      >
        <JourneyDiagram
          steps={[
            {
              label: "Descobrir",
              title: "Curta Tela Brasil",
              desc: "O público entrava em contato com produções nacionais por meio de televisões e fones individuais.",
            },
            {
              label: "Encontrar",
              title: "Dê um Match",
              desc: "O participante respondia ao quiz e recebia recomendações compatíveis com seus interesses.",
            },
            {
              label: "Fazer parte",
              title: "Pipoca & Cena",
              desc: "A pessoa escolhia uma obra, registrava sua imagem e entrava visualmente no universo do cinema brasileiro.",
            },
            {
              label: "Levar consigo",
              title: "Lembrança impressa",
              desc: "A imagem criada era impressa na hora e entregue ao participante como lembrança física.",
            },
            {
              label: "Cidade",
              title: "Projeção Mapeada",
              desc: "As fachadas se transformavam em grandes telas para conteúdos relacionados ao cinema nacional.",
            },
          ]}
        />
      </CaseSection>

      {/* ============ PIPOCA & CENA ============ */}
      <CaseSection
        id="pipoca-cena"
        eyebrow="Pipoca & Cena"
        title="O público deixou de apenas assistir ao cinema brasileiro e passou a fazer parte dele."
        variant="light"
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="text-muted-foreground">
              A experiência começava nos totens. O visitante escolhia uma obra, registrava sua
              fotografia e aguardava enquanto o sistema processava sua participação com inteligência
              artificial.
            </p>
            <p className="mt-4 text-muted-foreground">
              A imagem final colocava a pessoa em uma ambientação visual inspirada no filme
              escolhido. O resultado era disponibilizado digitalmente e também impresso no local por
              meio de uma impressora profissional KODAK 6900.
            </p>
            <blockquote className="mt-8 border-l-2 border-cyan pl-6 text-xl font-semibold tracking-tight text-navy">
              A experiência começava no digital e terminava nas mãos do participante.
            </blockquote>
          </Reveal>
          <Reveal delay={120}>
            <MediaPlaceholder label="Totens, captura e impressão em tempo real" aspect="4/5" />
          </Reveal>
        </div>

        <div className="mt-14">
          <div className="fohat-mono mb-6 text-[11px] uppercase tracking-[0.18em] text-blue">
            Jornada da experiência
          </div>
          <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-7">
            {[
              "Escolha do filme",
              "Captura da fotografia",
              "Processamento por IA",
              "Imagem personalizada",
              "Disponibilização digital",
              "Impressão na hora",
              "Entrega da lembrança",
            ].map((step, i) => (
              <Reveal
                as="li"
                key={step}
                delay={i * 60}
                className="rounded-2xl border border-line bg-mist p-4"
              >
                <div className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-blue">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 text-sm font-semibold text-navy">{step}</div>
              </Reveal>
            ))}
          </ol>
        </div>
      </CaseSection>

      {/* ============ DÊ UM MATCH ============ */}
      <CaseSection
        id="de-um-match"
        eyebrow="Dê um Match com o Cinema Brasileiro"
        title="Uma nova forma de descobrir qual história brasileira combina com cada pessoa."
        variant="soft"
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <p className="text-muted-foreground">
              O participante respondia a um quiz utilizando um dos tablets disponíveis. A partir das
              respostas, o sistema apresentava uma recomendação personalizada de filmes do catálogo
              Tela Brasil.
            </p>
            <p className="mt-4 text-muted-foreground">
              A solução foi desenvolvida para transformar a descoberta do catálogo em uma
              experiência simples, lúdica e individual.
            </p>
            <div className="mt-8">
              <div className="fohat-mono mb-4 text-[11px] uppercase tracking-[0.18em] text-blue">
                A FOHAT desenvolveu
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {[
                  "Estrutura do quiz",
                  "Interface para tablets",
                  "Lógica das respostas",
                  "Sistema de recomendação",
                  "Apresentação dos resultados",
                  "Monitoramento das participações",
                  "Acesso ao resultado por QR Code",
                ].map((s) => (
                  <li
                    key={s}
                    className="rounded-xl border border-line bg-white px-4 py-3 text-sm text-navy"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <MediaPlaceholder label="Quiz nos tablets e recomendação personalizada" />
          </Reveal>
        </div>
      </CaseSection>

      {/* ============ CURTA TELA BRASIL ============ */}
      <CaseSection
        id="curta-tela"
        eyebrow="Curta Tela Brasil"
        title="Em meio ao fluxo da cidade, um convite para parar e assistir."
        variant="light"
      >
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <MediaPlaceholder label="Três televisões, áudio individual por fone" />
          </Reveal>
          <Reveal delay={120}>
            <p className="text-muted-foreground">
              A experiência foi estruturada com três televisões por capital, cada uma conectada a um
              sistema capaz de distribuir áudio para múltiplos fones de ouvido. Isso permitia que
              diferentes pessoas assistissem simultaneamente aos conteúdos, com autonomia e
              conforto.
            </p>
            <div className="mt-8">
              <div className="fohat-mono mb-4 text-[11px] uppercase tracking-[0.18em] text-blue">
                A FOHAT forneceu e integrou
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Televisões",
                  "Distribuição de áudio",
                  "Fones de ouvido",
                  "Notebooks",
                  "Conexões",
                  "Cabos",
                  "Periféricos",
                  "Configuração técnica",
                ].map((t) => (
                  <span key={t} className="fohat-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </CaseSection>

      {/* ============ PROJEÇÃO MAPEADA ============ */}
      <CaseSection
        id="projecao"
        eyebrow="Projeção Mapeada"
        title="Por algumas noites, os prédios deixaram de ser cenário e se transformaram em telas."
        variant="dark"
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <p className="text-[oklch(0.85_0.02_250)]">
              A FOHAT desenvolveu o conteúdo audiovisual utilizado nas projeções mapeadas realizadas
              nas seis capitais. O trabalho envolveu a construção da narrativa visual e a preparação
              do conteúdo para diferentes edifícios e superfícies.
            </p>
            <p className="mt-4 text-[oklch(0.85_0.02_250)]">
              A projeção ampliava a presença do cinema brasileiro no espaço urbano e fazia a
              experiência ultrapassar os limites físicos da estação.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <MediaPlaceholder
              label="Fachadas transformadas em telas de cinema"
              tone="dark"
              aspect="4/3"
            />
          </Reveal>
        </div>
      </CaseSection>

      {/* ============ INFRAESTRUTURA ============ */}
      <CaseSection
        id="infra"
        eyebrow="Infraestrutura por capital"
        title="A estrutura tecnológica utilizada em cada capital ativa."
        variant="light"
      >
        <InfraGrid
          items={[
            { qty: "1", label: "Impressora KODAK 6900" },
            { qty: "2", label: "Notebooks" },
            { qty: "4", label: "Totens interativos" },
            {
              qty: "3",
              label: "Televisões",
              note: "com sistema de distribuição para múltiplos fones",
            },
            { qty: "4", label: "Tablets" },
            {
              qty: "1",
              label: "Câmera de contagem",
              note: "com inteligência artificial",
            },
            { qty: "1", label: "Técnico de TI presencial" },
          ]}
        />
      </CaseSection>

      {/* ============ OPERAÇÃO ============ */}
      <CaseSection
        id="operacao"
        eyebrow="Escala e ciclos operacionais"
        title="Três ciclos, duas capitais por semana, dois kits reutilizados."
        lead="A operação nacional foi organizada em três ciclos. A cada semana, duas capitais funcionavam simultaneamente. Para isso, a FOHAT estruturou dois kits tecnológicos completos, capazes de operar em paralelo e ser reutilizados nas etapas seguintes do projeto."
        variant="dark"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { qty: "6", label: "Capitais" },
            { qty: "3", label: "Ciclos operacionais" },
            { qty: "2", label: "Capitais simultâneas / semana" },
            { qty: "2", label: "Kits tecnológicos completos" },
            { qty: "1", label: "Técnico de TI por capital" },
          ].map((it, i) => (
            <Reveal
              key={it.label}
              delay={i * 60}
              className="rounded-2xl border border-white/12 bg-white/[0.04] p-6"
            >
              <div className="text-4xl font-bold tracking-tight text-white">{it.qty}</div>
              <div className="mt-2 text-sm text-[oklch(0.82_0.02_250)]">{it.label}</div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12">
          <div className="fohat-mono mb-5 text-[11px] uppercase tracking-[0.18em] text-cyan">
            Ciclos e capitais
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { n: "01", capitais: ["Brasília", "Goiânia"], data: "18, 19 e 20 de junho" },
              { n: "02", capitais: ["Belo Horizonte", "Salvador"], data: "25, 26 e 27 de junho" },
              { n: "03", capitais: ["São Paulo", "Porto Alegre"], data: "1, 2 e 3 de julho" },
            ].map((c) => (
              <Reveal key={c.n} className="rounded-2xl border border-white/12 bg-white/[0.04] p-6">
                <div className="flex items-baseline justify-between">
                  <span className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-cyan">
                    Ciclo {c.n}
                  </span>
                  <span className="fohat-mono text-[10px] tabular-nums text-white/50">
                    02 capitais
                  </span>
                </div>
                <div className="mt-4 text-xl font-bold tracking-tight text-white">
                  {c.capitais.join(" + ")}
                </div>
                <div className="mt-3 fohat-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
                  {c.data}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <div className="fohat-mono mb-5 text-[11px] uppercase tracking-[0.18em] text-cyan">
            Estrutura total mobilizada simultaneamente
          </div>
          <InfraGrid
            tone="dark"
            items={[
              { qty: "2", label: "Impressoras KODAK 6900" },
              { qty: "4", label: "Notebooks" },
              { qty: "8", label: "Totens" },
              { qty: "6", label: "Televisões" },
              { qty: "8", label: "Tablets" },
              { qty: "2", label: "Câmeras de contagem com IA" },
              { qty: "2", label: "Técnicos de TI" },
            ]}
          />
        </div>
      </CaseSection>

      {/* ============ DASHBOARDS ============ */}
      <CaseSection
        id="dashboards"
        eyebrow="Monitoramento em tempo real"
        title="A experiência acontecia diante do público. A operação era acompanhada em tempo real."
        lead="A FOHAT desenvolveu dashboards para monitorar o funcionamento das duas capitais ativas em cada ciclo. A equipe conseguia visualizar os dados separadamente por cidade."
        variant="dark"
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <DashboardPlaceholder
            title="Dê um Match"
            metrics={[
              "Quizzes iniciados",
              "Quizzes concluídos",
              "Volume de respostas",
              "Recomendações geradas",
            ]}
          />
          <DashboardPlaceholder
            title="Pipoca & Cena"
            metrics={[
              "Fotos capturadas",
              "Imagens processadas",
              "Imagens geradas",
              "Fotos impressas",
            ]}
          />
          <DashboardPlaceholder
            title="Fluxo da estação"
            metrics={[
              "Pessoas contabilizadas",
              "Movimentação captada",
              "Volume de público por capital",
            ]}
          />
        </div>
      </CaseSection>

      {/* ============ ENGENHARIA DE PRESENÇA ============ */}
      <CaseSection
        id="engenharia"
        eyebrow="Engenharia de Presença em funcionamento"
        title="Como o projeto materializou os cinco pilares da FOHAT."
        variant="dark"
      >
        <PillarsList
          items={[
            {
              title: "Presença no centro",
              desc: "O público podia assistir, escolher, responder, criar e levar parte da experiência consigo.",
            },
            {
              title: "Tecnologia com intenção",
              desc: "IA, totens, tablets, televisões e sistemas de monitoramento possuíam funções claras dentro da jornada.",
            },
            {
              title: "Conexão entre mundos",
              desc: "O projeto conectava cinema e cidade, físico e digital, conteúdo e participação, tela e lembrança impressa.",
            },
            {
              title: "Inteligência multidisciplinar",
              desc: "Software, equipamentos, audiovisual, IA, impressão, logística e suporte técnico funcionavam como uma única experiência.",
            },
            {
              title: "Memória como resultado",
              desc: "A recomendação de filme e a fotografia personalizada continuavam com o participante depois da ativação.",
            },
          ]}
        />
      </CaseSection>

      {/* ============ RAIO-X / GALERIA ============ */}
      <CaseSection
        id="galeria"
        eyebrow="Galeria e registros"
        title="Registros da experiência em seis capitais."
        variant="light"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Estação Tela Brasil",
            "Pipoca & Cena",
            "Dê um Match",
            "Curta Tela Brasil",
            "Projeção Mapeada",
            "Operação e bastidores",
            "Dashboards",
            "Repercussão",
          ].map((label, i) => (
            <Reveal key={label} delay={i * 50}>
              <MediaPlaceholder label={label} aspect={i % 3 === 0 ? "4/5" : "4/3"} />
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Vídeos e publicações de influenciadores aparecem como registros da experiência e
          repercussão, não como entregas executadas pela FOHAT.
        </p>
      </CaseSection>

      {/* ============ RESULTADOS ============ */}
      <CaseSection
        id="resultados"
        eyebrow="Resultados"
        title="Uma operação orientada por dados."
        lead="Os dashboards permitiram acompanhar em tempo real a participação, a geração de conteúdo, a impressão e o fluxo de público em cada capital."
        variant="soft"
      >
        <ResultsPlaceholder
          fields={[
            "Total de visitantes",
            "Pessoas contabilizadas",
            "Quizzes respondidos",
            "Recomendações geradas",
            "Fotos capturadas",
            "Imagens geradas",
            "Fotos impressas",
            "Leituras de QR Code",
            "Publicações",
            "Alcance digital",
            "Repercussão na imprensa",
          ]}
        />
      </CaseSection>

      {/* ============ ENCERRAMENTO ============ */}
      <section className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-60"
        />
        <div aria-hidden className="fohat-scanline" style={{ top: "30%" }} />
        <div className="fohat-shell relative">
          <Reveal className="max-w-[960px]">
            <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
              Encerramento
            </span>
            <h2 className="fohat-h2 mt-6 text-white">
              O cinema brasileiro saiu da tela para ocupar a cidade, a participação e a memória do
              público.
            </h2>
            <p className="mt-6 text-lg text-[oklch(0.85_0.02_250)]">
              Em seis capitais, a FOHAT integrou experiências, equipamentos, impressão, inteligência
              artificial, conteúdo audiovisual, técnicos presenciais e monitoramento em tempo real.
              A operação foi executada em três ciclos, com duas capitais funcionando simultaneamente
              por semana.
            </p>
            <p className="mt-4 text-lg text-[oklch(0.85_0.02_250)]">
              Mais do que colocar tecnologia no espaço, o projeto demonstrou como ela pode aproximar
              pessoas da cultura e transformar participação em lembrança.
            </p>
            <blockquote className="mt-10 border-l-2 border-cyan pl-6 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              A tecnologia não precisa afastar as pessoas do mundo. Ela pode devolvê-las a ele.
            </blockquote>
            <div className="mt-10 flex flex-wrap gap-3">
              <ContactDialog>
                <button className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-navy shadow-[0_14px_40px_oklch(0_0_0_/_0.2)] transition-all hover:-translate-y-0.5 hover:bg-cyan">
                  Leve a Engenharia de Presença ao seu projeto
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </ContactDialog>
              <Link
                to="/engenharia-de-presenca/projetos"
                className="group inline-flex h-14 items-center gap-3 rounded-full border border-white/28 bg-white/[0.06] px-7 text-sm font-bold text-white backdrop-blur-md transition-all hover:border-cyan hover:text-cyan"
              >
                Ver todos os projetos
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SubpageShell>
  );
}
