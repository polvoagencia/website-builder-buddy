import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronRight } from "lucide-react";

import { SubpageShell } from "@/components/fohat/SubpageShell";
import { Reveal } from "@/components/fohat/Reveal";
import { ContactDialog } from "@/components/fohat/ContactDialog";
import { RentalRequestDialog } from "@/components/fohat/RentalRequestDialog";
import { RentalEquipmentCard } from "@/components/fohat/RentalEquipmentCard";
import {
  RENTAL_CATALOG_ITEMS,
  RENTAL_FILTERS,
  type RentalFilterSlug,
} from "@/data/rental-equipment";

export const Route = createFileRoute("/locacao-de-equipamentos")({
  head: () => ({
    meta: [
      { title: "Locação de Equipamentos Tecnológicos | FOHAT" },
      {
        name: "description",
        content:
          "Locação de impressoras, televisões, totens, computadores, notebooks, tablets e equipamentos tecnológicos para eventos, ativações, exposições e projetos especiais.",
      },
      {
        property: "og:title",
        content: "Locação de Equipamentos Tecnológicos | FOHAT",
      },
      {
        property: "og:description",
        content:
          "Infraestrutura tecnológica para eventos, ativações, feiras, exposições e experiências interativas.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/locacao-de-equipamentos" },
    ],
    links: [{ rel: "canonical", href: "/locacao-de-equipamentos" }],
  }),
  component: LocacaoPage,
});

function LocacaoPage() {
  return (
    <SubpageShell>
      {/* ============ OPENING ============ */}
      <section className="relative overflow-hidden pt-36 pb-20 text-white lg:pt-44 lg:pb-28 fohat-inner-hero">
        <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg-dark" />
        <div aria-hidden className="fohat-scanline" style={{ top: "18%" }} />
        <div aria-hidden className="fohat-scanline" style={{ top: "58%", animationDelay: "5s" }} />

        <div className="fohat-shell relative">
          <Reveal>
            <nav
              aria-label="Você está aqui"
              className="fohat-mono mb-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-cyan/90"
            >
              <Link to="/" className="text-cyan hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 opacity-50" />
              <span className="text-white/70">Locação de Equipamentos</span>
            </nav>
            <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
              Frente complementar · FOHAT
            </span>
            <h1 className="fohat-h1 mt-6 max-w-[900px] text-white [font-size:clamp(2.4rem,5vw,5rem)]">
              Locação de <span className="text-cyan">Equipamentos Tecnológicos</span>
            </h1>
            <p className="fohat-lead mt-6 max-w-[720px] text-[oklch(0.9_0.02_250)]">
              A infraestrutura certa para sua experiência acontecer no mundo real.
            </p>
            <p className="mt-4 max-w-[720px] text-base text-[oklch(0.82_0.02_250)]">
              Além de desenvolver projetos completos de Engenharia de Presença,
              a FOHAT também disponibiliza equipamentos tecnológicos para
              locação. Atendemos eventos, ativações, feiras, congressos,
              projetos culturais, exposições, produções e operações que
              precisam de equipamentos confiáveis, configurados e prontos
              para uso.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <RentalRequestDialog>
                <button className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-navy shadow-[0_14px_40px_oklch(0_0_0_/_0.2)] transition-all hover:-translate-y-0.5 hover:bg-cyan">
                  Solicitar disponibilidade
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </RentalRequestDialog>
              <ContactDialog>
                <button className="group inline-flex h-14 items-center gap-3 rounded-full border border-white/28 bg-white/[0.06] px-7 text-sm font-bold text-white backdrop-blur-md transition-all hover:border-cyan hover:text-cyan">
                  Falar com a FOHAT
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </ContactDialog>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ POSICIONAMENTO ============ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="fohat-shell grid gap-14 lg:grid-cols-[.95fr_1.05fr] lg:gap-20">
          <Reveal>
            <span className="fohat-eyebrow">Posicionamento</span>
            <h2 className="fohat-h2 mt-5">
              Você pode contratar o projeto completo ou apenas a estrutura
              tecnológica.
            </h2>
            <p className="fohat-lead mt-6">
              Nem toda demanda precisa começar com o desenvolvimento de uma
              experiência completa.
            </p>
            <p className="mt-4 text-muted-foreground">
              Em alguns projetos, o cliente já possui o conceito, a equipe ou a
              operação definida e precisa apenas dos equipamentos necessários
              para colocar tudo em funcionamento.
            </p>
            <p className="mt-4 text-muted-foreground">
              A FOHAT oferece locação de equipamentos tecnológicos com
              possibilidade de configuração, instalação, integração e suporte
              técnico, conforme a necessidade de cada projeto.
            </p>
          </Reveal>

          <div className="grid gap-4">
            <Reveal
              as="article"
              className="rounded-3xl border border-line bg-mist p-8"
            >
              <div className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-blue">
                Formato 01
              </div>
              <h3 className="mt-4 text-2xl font-bold tracking-tight">
                Apenas equipamentos
              </h3>
              <p className="mt-3 text-muted-foreground">
                Locação dos equipamentos selecionados para utilização pela
                equipe do cliente.
              </p>
            </Reveal>
            <Reveal
              as="article"
              delay={100}
              className="rounded-3xl border border-line bg-mist p-8"
            >
              <div className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-blue">
                Formato 02
              </div>
              <h3 className="mt-4 text-2xl font-bold tracking-tight">
                Equipamentos com suporte
              </h3>
              <p className="mt-3 text-muted-foreground">
                Locação acompanhada de instalação, configuração, testes,
                integração e apoio técnico.
              </p>
            </Reveal>
            <p className="fohat-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Formatos de contratação sujeitos ao escopo aprovado.
            </p>
          </div>
        </div>
      </section>

      {/* ============ CATÁLOGO ============ */}
      <CatalogSection />


      {/* ============ COMO FUNCIONA ============ */}
      <section className="relative overflow-hidden bg-navy py-20 text-white lg:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-60" />
        <div className="fohat-shell relative">
          <Reveal className="max-w-[900px]">
            <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
              Como funciona
            </span>
            <h2 className="fohat-h2 mt-5 text-white">
              Da necessidade à operação
            </h2>
          </Reveal>

          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                title: "Entendimento da demanda",
                desc: "Identificamos o tipo de evento, local, período, público, finalidade e estrutura necessária.",
              },
              {
                title: "Definição dos equipamentos",
                desc: "Selecionamos os equipamentos e acessórios adequados ao projeto.",
              },
              {
                title: "Confirmação de disponibilidade",
                desc: "Validamos datas, quantidades, logística e formato da locação.",
              },
              {
                title: "Entrega e configuração",
                desc: "Quando contratado, realizamos instalação, configuração, testes e integração.",
              },
              {
                title: "Operação e retirada",
                desc: "A locação pode incluir suporte durante o uso e retirada após o encerramento, conforme o escopo.",
              },
            ].map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                delay={i * 90}
                className="rounded-b-2xl border-t-2 border-cyan/70 bg-white/[0.04] p-6 backdrop-blur-sm"
              >
                <div className="fohat-mono mb-5 text-xs uppercase tracking-[0.18em] text-cyan">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-bold tracking-tight text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-[oklch(0.82_0.02_250)]">
                  {s.desc}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ FORMATOS ============ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="fohat-shell">
          <Reveal className="max-w-[880px]">
            <span className="fohat-eyebrow">Formatos de locação</span>
            <h2 className="fohat-h2 mt-5">
              Formatos possíveis conforme a necessidade do projeto
            </h2>
            <p className="mt-4 text-muted-foreground">
              Apresentados como possibilidades. Nem todos estão disponíveis para
              qualquer equipamento ou localidade.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Locação simples",
                desc: "Entrega dos equipamentos para operação pela equipe do cliente.",
              },
              {
                title: "Locação com instalação",
                desc: "Equipamentos entregues, instalados e configurados pela FOHAT.",
              },
              {
                title: "Locação com suporte técnico",
                desc: "Presença de profissional técnico durante o período contratado.",
              },
              {
                title: "Locação integrada a um projeto",
                desc: "Equipamentos combinados com desenvolvimento tecnológico ou Engenharia de Presença.",
              },
              {
                title: "Locação itinerante",
                desc: "Estruturas que precisam ser utilizadas em diferentes cidades ou etapas do projeto.",
              },
            ].map((f, i) => (
              <Reveal
                as="article"
                key={f.title}
                delay={i * 70}
                className="rounded-3xl border border-line bg-mist p-7 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
              >
                <div className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-blue">
                  Formato {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{f.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DIFERENCIAIS ============ */}
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.97 0.008 250), oklch(0.93 0.015 250))",
        }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-70" />
        <div className="fohat-shell relative">
          <Reveal className="max-w-[880px]">
            <span className="fohat-eyebrow">Diferenciais</span>
            <h2 className="fohat-h2 mt-5">
              Mais do que entregar equipamentos
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Equipamentos integrados ao projeto",
                desc: "A FOHAT entende a função de cada equipamento dentro da experiência e da operação.",
              },
              {
                title: "Configuração técnica",
                desc: "Os equipamentos podem ser preparados de acordo com o sistema, conteúdo ou jornada do projeto.",
              },
              {
                title: "Suporte especializado",
                desc: "Possibilidade de acompanhamento técnico durante instalação, testes e execução.",
              },
              {
                title: "Integração hardware e software",
                desc: "Capacidade de conectar equipamentos, interfaces, sistemas e infraestrutura.",
              },
              {
                title: "Operação em diferentes cidades",
                desc: "Experiência em estruturas itinerantes e operações realizadas em mais de uma localidade.",
              },
              {
                title: "Tecnologia com intenção",
                desc: "Os equipamentos não são apresentados como fim. Eles existem para permitir que a experiência funcione.",
              },
            ].map((d, i) => (
              <Reveal
                as="article"
                key={d.title}
                delay={i * 60}
                className="rounded-3xl border border-line bg-white p-7"
              >
                <div className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-blue">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight">
                  {d.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{d.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROVA DE CAPACIDADE ============ */}
      <section className="bg-navy py-20 text-white lg:py-28">
        <div className="fohat-shell">
          <Reveal className="max-w-[960px]">
            <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
              Prova de capacidade
            </span>
            <h2 className="fohat-h2 mt-5 text-white">
              Infraestrutura tecnológica em operação nacional
            </h2>
            <p className="fohat-lead mt-6 text-[oklch(0.9_0.02_250)]">
              No projeto Tela Brasil, a FOHAT estruturou dois kits tecnológicos
              completos para operar simultaneamente em duas capitais por semana.
            </p>
            <p className="mt-4 text-[oklch(0.82_0.02_250)]">
              A operação utilizou impressoras profissionais, notebooks, totens,
              televisões, tablets, câmeras com inteligência artificial, sistemas
              de áudio, dashboards e suporte técnico presencial.
            </p>
            <div className="mt-8">
              <Link
                to="/engenharia-de-presenca/projetos/$slug"
                params={{ slug: "tela-brasil" }}
                className="group inline-flex h-14 items-center gap-3 rounded-full border border-white/28 bg-white/[0.06] px-7 text-sm font-bold text-white backdrop-blur-md transition-all hover:border-cyan hover:text-cyan"
              >
                Conheça o case Tela Brasil
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FORMULÁRIO INLINE (âncora) ============ */}
      <section id="solicitar" className="bg-white py-20 lg:py-28">
        <div className="fohat-shell">
          <Reveal className="mx-auto max-w-[900px] rounded-[38px] border border-line bg-mist p-10 sm:p-14">
            <span className="fohat-eyebrow">Solicite disponibilidade</span>
            <h2 className="fohat-h2 mt-5">
              Conte quais equipamentos você precisa e como será o projeto.
            </h2>
            <p className="mt-4 text-muted-foreground">
              A equipe da FOHAT avaliará disponibilidade, configuração,
              logística e suporte necessário.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <RentalRequestDialog>
                <button className="group inline-flex h-14 items-center gap-3 rounded-full bg-navy px-7 text-sm font-bold text-primary-foreground shadow-[var(--shadow-cta)] transition-all hover:-translate-y-0.5 hover:bg-blue">
                  Abrir formulário de solicitação
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </RentalRequestDialog>
              <ContactDialog>
                <button className="group inline-flex h-14 items-center gap-3 rounded-full border border-line bg-white px-7 text-sm font-bold text-navy transition-all hover:border-blue/40 hover:text-blue">
                  Falar com a FOHAT
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </ContactDialog>
            </div>

            <p className="fohat-mono mt-8 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              O envio da solicitação não confirma reserva. Disponibilidade,
              valores, logística e escopo técnico serão confirmados pela equipe
              da FOHAT.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section
        className="overflow-hidden py-20"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.88 0.018 250), oklch(0.98 0.006 250))",
        }}
      >
        <div className="fohat-shell">
          <Reveal className="relative overflow-hidden rounded-[38px] bg-navy p-10 text-white sm:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 fohat-grid-bg-dark opacity-40"
            />
            <span
              className="fohat-eyebrow relative"
              style={{ color: "var(--color-cyan)" }}
            >
              Vamos operar juntos
            </span>
            <h2 className="fohat-h2 relative mt-5 max-w-[840px] text-white">
              Já sabe quais equipamentos precisa?
            </h2>
            <p className="relative mt-4 max-w-[720px] text-[oklch(0.85_0.02_250)]">
              Envie as informações do projeto para verificarmos disponibilidade,
              configuração e logística.
            </p>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <RentalRequestDialog>
                <button className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-navy shadow-[0_14px_40px_oklch(0_0_0_/_0.2)] transition-all hover:-translate-y-0.5 hover:bg-cyan">
                  Solicitar locação
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </RentalRequestDialog>
              <ContactDialog>
                <button className="group inline-flex h-14 items-center gap-3 rounded-full border border-white/28 bg-white/[0.06] px-7 text-sm font-bold text-white backdrop-blur-md transition-all hover:border-cyan hover:text-cyan">
                  Falar com um especialista
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </ContactDialog>
            </div>
          </Reveal>
        </div>
      </section>
    </SubpageShell>
  );
}

function CatalogSection() {
  const [filter, setFilter] = useState<RentalFilterSlug>("todos");

  const availableFilters = useMemo(() => {
    const active = new Set(RENTAL_CATALOG_ITEMS.map((it) => it.filter));
    return RENTAL_FILTERS.filter(
      (f) => f.slug === "todos" || active.has(f.slug as never),
    );
  }, []);

  const items = useMemo(() => {
    if (filter === "todos") return RENTAL_CATALOG_ITEMS;
    return RENTAL_CATALOG_ITEMS.filter((it) => it.filter === filter);
  }, [filter]);

  return (
    <section
      id="catalogo"
      className="relative overflow-hidden py-20 lg:py-28"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.97 0.008 250), oklch(0.93 0.015 250))",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-70"
      />
      <div className="fohat-shell relative">
        <Reveal className="mb-10 max-w-[900px]">
          <span className="fohat-eyebrow">Catálogo</span>
          <h2 className="fohat-h2 mt-5">
            Equipamentos disponíveis para locação
          </h2>
          <p className="mt-5 text-muted-foreground">
            Conheça as principais categorias de equipamentos que podem compor
            sua operação. Modelos, quantidades e configurações são confirmados
            de acordo com a disponibilidade e as necessidades do projeto.
          </p>
        </Reveal>

        {/* Filtros */}
        <div
          role="tablist"
          aria-label="Filtrar equipamentos por categoria"
          className="mb-8 flex flex-wrap gap-2"
        >
          {availableFilters.map((f) => {
            const active = filter === f.slug;
            return (
              <button
                key={f.slug}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.slug)}
                className={`fohat-mono h-9 rounded-full border px-4 text-[11px] uppercase tracking-[0.16em] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue ${
                  active
                    ? "border-navy bg-navy text-white"
                    : "border-line bg-white text-navy hover:border-blue hover:text-blue"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="sr-only">
          {`Exibindo ${items.length} ${items.length === 1 ? "equipamento" : "equipamentos"}.`}
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <RentalEquipmentCard
              key={item.slug}
              item={item}
              anchorId={item.slug}
              eager={i === 0}
              sourcePage="/locacao-de-equipamentos"
            />
          ))}
        </div>

        <p className="fohat-mono mt-10 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Nenhum item apresentado como disponível em estoque sem confirmação.
          Marcas, modelos e especificações confirmados pela equipe comercial.
        </p>
      </div>
    </section>
  );
}
