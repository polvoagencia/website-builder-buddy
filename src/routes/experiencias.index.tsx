import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/experiencias/")({
  beforeLoad: () => {
    throw redirect({ to: "/engenharia-de-presenca", replace: true });
  },
});
