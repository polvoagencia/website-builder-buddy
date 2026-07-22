import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/experiencias/eventos")({
  beforeLoad: () => {
    throw redirect({
      to: "/engenharia-de-presenca/eventos-e-espacos",
      replace: true,
    });
  },
});
