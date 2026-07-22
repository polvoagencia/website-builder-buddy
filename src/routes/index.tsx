import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import heroAsset from "@/assets/hero.jpg.asset.json";
import portalAsset from "@/assets/portal.jpg.asset.json";
import labAsset from "@/assets/lab.jpg.asset.json";
import marcasAsset from "@/assets/marcas.jpg.asset.json";
import culturaAsset from "@/assets/cultura.jpg.asset.json";
import eventosAsset from "@/assets/eventos.jpg.asset.json";
import parceirosImg from "@/assets/parceiros.jpg";
import markAsset from "@/assets/mark-fohat.png.asset.json";

import { Header } from "@/components/fohat/Header";
import { Footer } from "@/components/fohat/Footer";
import { ContactDialog } from "@/components/fohat/ContactDialog";
import { Reveal } from "@/components/fohat/Reveal";
import { Parallax } from "@/components/fohat/Parallax";
import { ScrollProgress } from "@/components/fohat/ScrollProgress";
import { Marquee } from "@/components/fohat/Subpage";
import { RentalEquipmentCard } from "@/components/fohat/RentalEquipmentCard";
import { RentalRequestDialog } from "@/components/fohat/RentalRequestDialog";
import { RENTAL_CATALOG_ITEMS } from "@/data/rental-equipment";

export const Route = createFileRoute("/")({
  component: Home,
});

const FORMULA = [
  { label: "Entrada", value: "Tecnologia + narrativa" },
  { label: "Ambiente", value: "Espaço + interação" },
  { label: "Experiência", value: "Presença + conexão" },
  { label: "Resultado", value: "Memória + significado" },
];

const TERRITORIES = [
  {
    idx: "01",
    title: "Marcas",
    desc: "Experiências que transformam comunicação em participação.",
    img: marcasAsset.url,
    to: "/experiencias/marcas",
    alt: "Público interagindo com painéis digitais em uma ativação de marca",
  },
  {
    idx: "02",
    title: "Cultura",
    desc: "Tecnologia que aproxima pessoas de histórias, identidades e patrimônios.",
    img: culturaAsset.url,
    to: "/experiencias/cultura",
    alt: "Visitante interagindo com uma narrativa cultural em tela sensível ao toque",
  },
  {
    idx: "03",
    title: "Eventos e espaços",
    desc: "Ambientes que deixam de ser apenas ocupados e passam a ser vividos.",
    img: eventosAsset.url,
    to: "/experiencias/eventos",
    alt: "Pessoas em instalação de luz durante evento imersivo",
  },
  {
    idx: "04",
    title: "Parceiros",
    desc: "Braço tecnológico para agências, produtoras, cenógrafos e equipes criativas.",
    img: parceirosImg,
    to: "/parceiros",
    alt: "Equipe multidisciplinar em laboratório desenvolvendo experiência tecnológica",
  },
];

const METHOD = [
  { letter: "F", title: "Fundamento da Presença", desc: "Definimos o que o público precisa viver, sentir e lembrar." },
  { letter: "O", title: "Orquestração de Mundos", desc: "Conectamos narrativa, tecnologia, espaço e conhecimentos." },
  { letter: "H", title: "Humanização da Tecnologia", desc: "Desenhamos a interação a partir das pessoas." },
  { letter: "A", title: "Ativação no Mundo Real", desc: "Desenvolvemos, integramos, testamos e implantamos." },
  { letter: "T", title: "Transformação em Memória", desc: "Projetamos o que deve permanecer depois da interação." },
];

const PROJECT_META = [
  { label: "Concepção", value: "Estratégia e narrativa" },
  { label: "Desenvolvimento", value: "IA, software e interfaces" },
  { label: "Integração", value: "Hardware, espaço e operação" },
  { label: "Entrega", value: "Teste, implantação e suporte" },
];

const PRINCIPLES = [
  { n: "01", title: "Presença no centro", desc: "Não projetamos apenas para que o público veja. Projetamos para que ele esteja." },
  { n: "02", title: "Tecnologia com intenção", desc: "Cada ferramenta precisa criar significado, não apenas efeito visual." },
  { n: "03", title: "Conexão entre mundos", desc: "Criamos pontes entre o físico, o digital e o humano." },
  { n: "04", title: "Inteligência multidisciplinar", desc: "Orquestramos diferentes conhecimentos como uma única experiência." },
  { n: "05", title: "Memória como resultado", desc: "O projeto termina quando a interação acaba. Seu valor começa quando a experiência permanece." },
];

const MARQUEE_WORDS = [
  "Inteligência Artificial",
  "Visão computacional",
  "Projeção mapeada",
  "IoT sensorial",
  "Interfaces multitoque",
  "Realidade estendida",
  "Áudio espacial",
  "Fabricação em tempo real",
];

function Home() {
  return (
    <div className="min-h-screen bg-mist text-navy">
      <ScrollProgress />
      <Header />

      <main>
        {/* HERO */}
        <section id="inicio" className="fohat-hero-bg relative flex min-h-screen items-center overflow-hidden pb-20 pt-36 lg:pt-40">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(30deg, transparent 0 48%, oklch(0.46 0.055 253 / 0.06) 49% 51%, transparent 52%), linear-gradient(150deg, transparent 0 48%, oklch(0.46 0.055 253 / 0.04) 49% 51%, transparent 52%)",
              backgroundSize: "150px 150px",
            }}
          />
          <div className="fohat-shell relative z-10 grid items-center gap-16 lg:grid-cols-[1.04fr_.96fr] lg:gap-[70px]">
            <Reveal>
              <span className="fohat-eyebrow">Engenharia de Experiências Tecnológicas</span>
              <h1 className="fohat-h1 mt-6 max-w-[900px]">
                Criamos experiências que reconectam pessoas ao mundo.
              </h1>
              <p className="fohat-lead mt-7 max-w-[680px]">
                Integramos tecnologia, inteligência artificial, narrativa, espaço físico e
                participação humana para criar vivências que podem ser sentidas e lembradas.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ContactDialog>
                  <button className="group inline-flex h-14 items-center gap-3 rounded-full bg-navy px-7 text-sm font-bold text-primary-foreground shadow-[var(--shadow-cta)] transition-all hover:-translate-y-0.5 hover:bg-blue">
                    Comece uma conversa
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </ContactDialog>
                <a
                  href="#presenca"
                  className="inline-flex h-14 items-center gap-2 rounded-full border border-navy/15 bg-white/70 px-7 text-sm font-bold text-navy backdrop-blur-md transition-all hover:border-blue hover:text-blue"
                >
                  Conheça a Engenharia de Presença
                </a>
              </div>
            </Reveal>

            <Reveal delay={120} className="relative min-h-[520px] lg:min-h-[590px]">
              <div
                aria-hidden
                className="absolute -right-16 top-14 h-72 w-72 rotate-[28deg] border border-blue/20 lg:-right-32 lg:h-[360px] lg:w-[360px]"
                style={{ borderRadius: "40% 60% 50% 45%" }}
              />
              <div className="fohat-image-frame absolute inset-x-0 bottom-5 top-0 lg:left-10">
                <Parallax strength={30} className="h-full w-full">
                  <img
                    src={heroAsset.url}
                    alt="Pessoas vivendo uma experiência imersiva em ambiente de projeção"
                    className="h-full w-full object-cover"
                    style={{ filter: "saturate(0.78) contrast(1.06)" }}
                  />
                </Parallax>
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 45%, oklch(0.22 0.023 250 / 0.55))",
                  }}
                />
              </div>
              <div className="absolute bottom-0 left-0 w-[260px] rounded-3xl border border-white/70 bg-white/85 p-6 shadow-[0_16px_50px_oklch(0.22_0.023_250_/_0.16)] backdrop-blur-lg sm:w-[290px]">
                <strong className="mb-1.5 block text-[17px] leading-tight tracking-tight">
                  Presença também pode ser projetada.
                </strong>
                <p className="m-0 text-sm leading-relaxed text-muted-foreground">
                  A tecnologia deixa de ocupar o centro e passa a criar condições para a
                  conexão acontecer.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="fohat-mono absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.24em] text-steel">
            Explore a experiência ↓
          </div>
        </section>

        <Marquee items={MARQUEE_WORDS} />

        {/* MANIFESTO */}
        <section className="relative overflow-hidden bg-navy py-28 text-white lg:py-32">
          <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-70" />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -right-24 h-[520px] w-[520px] rounded-full opacity-[0.10]"
            style={{
              background:
                "radial-gradient(closest-side, var(--color-cyan), transparent 70%)",
            }}
          />
          <div className="fohat-shell relative grid items-start gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <Reveal>
              <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
                Nossa crença
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="fohat-h2 max-w-[820px] text-white">
                A tecnologia não precisa afastar as pessoas do mundo. Ela pode devolvê-las a ele.
              </h2>
              <p className="mt-6 max-w-[720px] text-lg text-[oklch(0.82_0.02_250)] lg:text-xl">
                Ela pode aproximar pessoas de histórias, culturas, marcas, espaços e umas das
                outras. Na FOHAT, desenvolvemos tecnologia para ampliar a experiência humana no
                mundo real.
              </p>
            </Reveal>
          </div>
        </section>

        {/* PRESENÇA — teaser com CTA "saber mais" para a subpágina dedicada */}
        <section id="presenca" className="bg-white py-24 lg:py-32">
          <div className="fohat-shell grid items-center gap-16 lg:grid-cols-2 lg:gap-[70px]">
            <Reveal className="relative h-[440px] overflow-hidden rounded-[var(--radius)] shadow-[var(--shadow-elegant)] lg:h-[600px]">
              <Parallax strength={45}>
                <img
                  src={portalAsset.url}
                  alt="Visitantes atravessando uma instalação tecnológica imersiva"
                  className="h-full w-full object-cover"
                />
              </Parallax>
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, oklch(0.22 0.023 250 / 0.65), transparent 55%)",
                }}
              />
              <div className="absolute inset-x-8 bottom-7 z-10 text-lg font-semibold text-white">
                O público deixa de apenas observar e passa a fazer parte do que acontece.
              </div>
            </Reveal>

            <Reveal delay={120}>
              <span className="fohat-eyebrow">Mecanismo único</span>
              <h2 className="fohat-h2 mt-5">Engenharia de Presença</h2>
              <p className="fohat-lead mt-5 max-w-[560px]">
                Integramos tecnologia, narrativa, espaço físico e participação humana para
                criar experiências em que o público percebe, participa, interfere e leva algo
                consigo.
              </p>
              <div className="mt-8 grid gap-3.5 sm:grid-cols-2">
                {FORMULA.map((f) => (
                  <div
                    key={f.label}
                    className="rounded-2xl border border-line bg-mist p-5 font-semibold"
                  >
                    <span className="fohat-mono mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-blue">
                      {f.label}
                    </span>
                    {f.value}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/engenharia-de-presenca"
                  className="group inline-flex h-14 items-center gap-3 rounded-full bg-navy px-7 text-sm font-bold text-primary-foreground shadow-[var(--shadow-cta)] transition-all hover:-translate-y-0.5 hover:bg-blue"
                >
                  Saber mais
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* TERRITÓRIOS */}
        <section
          id="experiencias"
          className="relative overflow-hidden py-24 lg:py-32"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.97 0.008 250), oklch(0.93 0.015 250))",
          }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-70" />
          <div className="fohat-shell relative">
            <Reveal className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="fohat-eyebrow">Territórios de atuação</span>
                <h2 className="fohat-h2 mt-5">Onde a presença pode ser transformada</h2>
              </div>
              <p className="max-w-[520px] text-muted-foreground">
                Não vendemos um cardápio de tecnologias. Projetamos a experiência e integramos
                as capacidades necessárias para fazê-la acontecer.
              </p>
            </Reveal>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {TERRITORIES.map((t, i) => (
                <Reveal
                  key={t.title}
                  as="article"
                  delay={i * 100}
                  className="group relative min-h-[430px] overflow-hidden rounded-[28px] bg-navy shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-2 lg:min-h-[520px]"
                >
                  <Link to={t.to} className="absolute inset-0 z-20" aria-label={t.title} />
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
                    <p className="mt-2 text-[oklch(0.88_0.015_250)]">{t.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold">
                      Conheça este território
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/experiencias"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-navy/15 bg-white px-6 text-sm font-bold text-navy transition-all hover:border-blue hover:text-blue"
              >
                Explore todos os caminhos <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/tecnologia"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-navy/15 bg-white px-6 text-sm font-bold text-navy transition-all hover:border-blue hover:text-blue"
              >
                Nossa capacidade tecnológica <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* LOCAÇÃO — frente complementar */}
        <section
          id="locacao"
          className="relative overflow-hidden bg-mist py-24 lg:py-32"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-60"
          />
          <div className="fohat-shell relative">
            <Reveal className="mb-12 max-w-[900px]">
              <span className="fohat-eyebrow">Locação de equipamentos</span>
              <h2 className="fohat-h2 mt-5">
                A infraestrutura certa para sua experiência acontecer no
                mundo real.
              </h2>
              <p className="fohat-lead mt-5">
                Além de desenvolver projetos completos de Engenharia de
                Presença, a FOHAT também disponibiliza equipamentos
                tecnológicos para eventos, ativações, exposições, produções
                e operações especiais.
              </p>
              <p className="mt-4 text-muted-foreground">
                Você pode contratar apenas os equipamentos ou combinar a
                locação com instalação, configuração, integração e suporte
                técnico.
              </p>
            </Reveal>

            <div
              className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-4 md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4"
              style={{ scrollbarWidth: "thin" }}
            >
              {RENTAL_CATALOG_ITEMS.filter((it) => it.featured).map(
                (item, i) => (
                  <div
                    key={item.slug}
                    className="w-[82%] shrink-0 snap-start md:w-auto md:shrink"
                  >
                    <RentalEquipmentCard
                      item={item}
                      variant="compact"
                      eager={i === 0}
                      sourcePage="/"
                    />
                  </div>
                ),
              )}
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-3">
              <Link
                to="/locacao-de-equipamentos"
                hash="catalogo"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-navy px-6 text-sm font-bold text-primary-foreground shadow-[var(--shadow-cta)] transition-all hover:-translate-y-0.5 hover:bg-blue"
              >
                Conheça os equipamentos
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <RentalRequestDialog sourcePage="/" sourceCta="Consultar disponibilidade · Home">
                <button className="group inline-flex h-12 items-center gap-2 rounded-full border border-navy/15 bg-white px-6 text-sm font-bold text-navy transition-all hover:border-blue hover:text-blue">
                  Consultar disponibilidade
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </RentalRequestDialog>
            </div>

            <p className="fohat-mono mt-8 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Equipamentos, quantidades, logística e suporte são confirmados
              conforme a necessidade de cada projeto.
            </p>
          </div>
        </section>

        {/* MÉTODO */}
        <section id="metodo" className="overflow-hidden bg-white py-24 lg:py-32">
          <div className="fohat-shell">
            <Reveal className="mb-14 max-w-[820px]">
              <span className="fohat-eyebrow">Método FOHAT</span>
              <h2 className="fohat-h2 mt-5">
                A presença não acontece por acaso. Ela é projetada.
              </h2>
              <p className="fohat-lead mt-5">
                Cinco etapas conectam intenção, tecnologia e execução até a experiência
                encontrar o público.
              </p>
            </Reveal>

            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
              {METHOD.map((s, i) => (
                <Reveal
                  key={s.letter}
                  delay={i * 80}
                  className="relative min-h-[280px] overflow-hidden rounded-3xl border border-blue/12 p-6 transition-all hover:-translate-y-1 hover:border-blue/40"
                  style={{
                    background:
                      "linear-gradient(180deg, oklch(0.98 0.006 250), oklch(0.93 0.015 250))",
                  }}
                >
                  <div className="mb-7 text-[68px] font-extrabold leading-none text-blue/20">
                    {s.letter}
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  <div
                    aria-hidden
                    className="absolute -bottom-14 -right-11 h-32 w-32 rotate-45 rounded-3xl border border-blue/15"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROJETO / BASTIDORES */}
        <section id="projetos" className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
          <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-60" />
          <div className="fohat-shell relative grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-[70px]">
            <Reveal className="h-[440px] overflow-hidden rounded-[var(--radius)] shadow-[0_32px_80px_oklch(0_0_0_/_0.24)] lg:h-[620px]">
              <Parallax strength={50}>
                <img
                  src={labAsset.url}
                  alt="Equipe multidisciplinar desenvolvendo uma experiência tecnológica"
                  className="h-full w-full object-cover"
                />
              </Parallax>
            </Reveal>
            <Reveal delay={120}>
              <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
                Engenharia em funcionamento
              </span>
              <h2 className="fohat-h2 mt-5 text-white">
                Da primeira intenção à experiência diante do público.
              </h2>
              <p className="fohat-lead mt-5 text-[oklch(0.82_0.02_250)]">
                A FOHAT assume a complexidade nos bastidores para que, diante das pessoas,
                a experiência aconteça com naturalidade.
              </p>
              <div className="my-8 grid gap-3 sm:grid-cols-2">
                {PROJECT_META.map((m) => (
                  <div key={m.label} className="border-t border-white/20 pt-3.5">
                    <span className="fohat-mono mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-[oklch(0.72_0.03_250)]">
                      {m.label}
                    </span>
                    <span className="font-semibold">{m.value}</span>
                  </div>
                ))}
              </div>
              <ContactDialog>
                <button className="inline-flex h-14 items-center gap-3 rounded-full border border-white/28 bg-white/6 px-7 text-sm font-bold text-white backdrop-blur-md transition-all hover:border-cyan hover:text-cyan">
                  Veja como podemos atuar
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </ContactDialog>
            </Reveal>
          </div>
        </section>

        {/* PRINCÍPIOS */}
        <section className="bg-white py-24 lg:py-32">
          <div className="fohat-shell">
            <Reveal className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="fohat-eyebrow">Pilares</span>
                <h2 className="fohat-h2 mt-5">O que orienta cada experiência</h2>
              </div>
              <p className="max-w-[520px] text-muted-foreground">
                A Engenharia de Presença precisa aparecer no conceito, na tecnologia, na forma
                de executar e na memória construída.
              </p>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-2">
              {PRINCIPLES.map((p, i) => {
                const isLast = i === PRINCIPLES.length - 1;
                return (
                  <Reveal
                    key={p.n}
                    as="article"
                    delay={i * 70}
                    className={
                      isLast
                        ? "rounded-3xl p-8 text-white md:col-span-2"
                        : "rounded-3xl border border-line bg-[oklch(0.99_0.004_250)] p-8"
                    }
                    style={
                      isLast
                        ? {
                            background:
                              "linear-gradient(135deg, oklch(0.22 0.023 250), oklch(0.32 0.035 250))",
                          }
                        : undefined
                    }
                  >
                    <div
                      className={
                        "mb-7 inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-extrabold " +
                        (isLast ? "bg-white/12 text-white" : "bg-ice text-blue")
                      }
                    >
                      {p.n}
                    </div>
                    <h3 className={"text-2xl font-bold tracking-tight " + (isLast ? "text-white" : "")}>
                      {p.title}
                    </h3>
                    <p className={"mt-3 " + (isLast ? "text-[oklch(0.85_0.02_250)]" : "text-muted-foreground")}>
                      {p.desc}
                    </p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          id="contato"
          className="overflow-hidden py-20"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.88 0.018 250), oklch(0.98 0.006 250))",
          }}
        >
          <div className="fohat-shell">
            <Reveal className="relative overflow-hidden rounded-[38px] bg-navy p-10 text-white sm:p-16 lg:p-[70px]">
              <img
                src={markAsset.url}
                alt=""
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -right-20 w-72 opacity-[0.085] sm:w-96"
                style={{ filter: "grayscale(1) brightness(4)" }}
              />
              <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
                Comece pela intenção
              </span>
              <h2 className="fohat-h2 mt-5 max-w-[840px] text-white">
                O que você gostaria que o público vivesse, sentisse ou lembrasse?
              </h2>
              <p className="mt-6 max-w-[700px] text-lg text-[oklch(0.85_0.02_250)] lg:text-xl">
                A ideia não precisa estar pronta. A FOHAT ajuda a encontrar o caminho entre a
                intenção e a experiência.
              </p>
              <div className="relative z-10 mt-8">
                <ContactDialog>
                  <button className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-navy shadow-[0_14px_40px_oklch(0_0_0_/_0.2)] transition-all hover:-translate-y-0.5 hover:bg-cyan">
                    Conte sua ideia
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </ContactDialog>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
