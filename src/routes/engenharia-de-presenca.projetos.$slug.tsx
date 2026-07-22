import { createFileRoute, notFound } from "@tanstack/react-router";
import { getCase } from "@/data/cases";
import { TelaBrasilCase } from "@/components/fohat/cases/TelaBrasilCase";

export const Route = createFileRoute("/engenharia-de-presenca/projetos/$slug")({
  loader: ({ params }) => {
    const data = getCase(params.slug);
    if (!data) throw notFound();
    return { data };
  },
  head: ({ params }) => {
    if (params.slug === "tela-brasil") {
      return {
        meta: [
          { title: "Tela Brasil | Projeto de Engenharia de Presença da FOHAT" },
          {
            name: "description",
            content:
              "Conheça o projeto Tela Brasil: uma operação tecnológica da FOHAT realizada em seis capitais, com experiências interativas, inteligência artificial, impressão em tempo real, monitoramento por dashboards e projeção mapeada.",
          },
          { property: "og:title", content: "Tela Brasil | FOHAT" },
          {
            property: "og:description",
            content:
              "Cinema brasileiro vivido no espaço público por meio de experiências interativas, inteligência artificial, impressão instantânea e projeção mapeada.",
          },
          { property: "og:url", content: "/engenharia-de-presenca/projetos/tela-brasil" },
          { property: "og:type", content: "article" },
        ],
        links: [
          {
            rel: "canonical",
            href: "/engenharia-de-presenca/projetos/tela-brasil",
          },
        ],
      };
    }
    return { meta: [{ title: "Case | FOHAT" }] };
  },
  component: CaseRoute,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-mist px-4 text-navy">
      <div className="text-center">
        <div className="fohat-mono text-[11px] uppercase tracking-[0.2em] text-blue">
          404 · Case
        </div>
        <h1 className="fohat-h2 mt-4">Este projeto ainda não está publicado.</h1>
      </div>
    </div>
  ),
});

function CaseRoute() {
  const { data } = Route.useLoaderData();
  if (data.slug === "tela-brasil") return <TelaBrasilCase />;
  return null;
}
