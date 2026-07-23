import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { MotionProvider } from "@/components/fohat/motion/MotionProvider";
import { RouteTransition } from "@/components/fohat/motion/RouteTransition";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-blue"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Algo deu errado</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Não foi possível carregar esta página. Tente novamente ou volte ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-blue"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FOHAT | Tecnologia aplicada, do conceito à operação" },
      {
        name: "description",
        content:
          "A FOHAT atua na criação de experiências tecnológicas, no desenvolvimento de sistemas e aplicativos e na locação de equipamentos para eventos, projetos e operações especiais.",
      },
      { name: "author", content: "FOHAT" },
      { property: "og:title", content: "FOHAT | Tecnologia aplicada, do conceito à operação" },
      {
        property: "og:description",
        content:
          "A FOHAT atua na criação de experiências tecnológicas, no desenvolvimento de sistemas e aplicativos e na locação de equipamentos para eventos, projetos e operações especiais.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "FOHAT | Tecnologia aplicada, do conceito à operação" },
      {
        name: "twitter:description",
        content: "A FOHAT atua na criação de experiências tecnológicas, no desenvolvimento de sistemas e aplicativos e na locação de equipamentos para eventos, projetos e operações especiais.",
      },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3e255c47-c79d-4938-8520-7a58cd0b4667/id-preview-ee5382a2--c62f4a9e-71a5-4d88-8a3e-3d2ed15b95af.lovable.app-1784818821446.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3e255c47-c79d-4938-8520-7a58cd0b4667/id-preview-ee5382a2--c62f4a9e-71a5-4d88-8a3e-3d2ed15b95af.lovable.app-1784818821446.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    // Capture UTMs from the current URL into sessionStorage so they persist across navigation.
    import("../lib/lead-tracking").then((m) => m.captureUtmsFromLocation());
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <MotionProvider>
        <RouteTransition>
          <Outlet />
        </RouteTransition>
      </MotionProvider>
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
