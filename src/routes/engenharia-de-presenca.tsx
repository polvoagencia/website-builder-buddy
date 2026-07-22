import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * Layout da frente autoral. As páginas filhas (visão geral, territórios,
 * projetos e case) montam em cima deste Outlet.
 */
export const Route = createFileRoute("/engenharia-de-presenca")({
  component: () => <Outlet />,
});
