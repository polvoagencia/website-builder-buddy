import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/tecnologia")({
  beforeLoad: () => {
    throw redirect({ to: "/sistemas-e-aplicativos", replace: true });
  },
});
