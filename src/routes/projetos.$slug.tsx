import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/projetos/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/engenharia-de-presenca/projetos/$slug",
      params: { slug: params.slug },
      replace: true,
    });
  },
});
