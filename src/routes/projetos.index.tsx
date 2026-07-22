import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/projetos/")({
  beforeLoad: () => {
    throw redirect({
      to: "/engenharia-de-presenca/projetos",
      replace: true,
    });
  },
});
