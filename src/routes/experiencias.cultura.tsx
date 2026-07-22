import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/experiencias/cultura")({
  beforeLoad: () => {
    throw redirect({ to: "/engenharia-de-presenca/cultura", replace: true });
  },
});
