import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/experiencias/marcas")({
  beforeLoad: () => {
    throw redirect({ to: "/engenharia-de-presenca/marcas", replace: true });
  },
});
