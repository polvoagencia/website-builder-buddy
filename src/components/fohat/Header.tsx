import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import logoAsset from "@/assets/logo-fohat.png.asset.json";
import { ContactDialog } from "./ContactDialog";
import { cn } from "@/lib/utils";

/**
 * Menu structure with hoverable submenus.
 * Primary items may open a mega-menu of secondary destinations.
 */
type SubItem = { label: string; to: string; description: string };
type NavItem = {
  label: string;
  to?: string;
  hash?: string;
  submenu?: { title: string; items: SubItem[] };
};

const NAV: NavItem[] = [
  { label: "Início", to: "/" },
  {
    label: "Engenharia de Presença",
    to: "/engenharia-de-presenca",
    submenu: {
      title: "O mecanismo por trás de cada projeto",
      items: [
        {
          label: "O que é",
          to: "/engenharia-de-presenca",
          description: "Como integramos tecnologia, narrativa, espaço e participação.",
        },
        {
          label: "Método FOHAT",
          to: "/#metodo",
          description: "Cinco etapas: Fundamento, Orquestração, Humanização, Ativação, Transformação.",
        },
        {
          label: "Princípios",
          to: "/engenharia-de-presenca#principios",
          description: "Cinco pilares que orientam cada experiência.",
        },
      ],
    },
  },
  {
    label: "Experiências",
    to: "/experiencias",
    submenu: {
      title: "Territórios de atuação",
      items: [
        {
          label: "Marcas",
          to: "/experiencias/marcas",
          description: "Comunicação que vira participação e memória.",
        },
        {
          label: "Cultura",
          to: "/experiencias/cultura",
          description: "Histórias, patrimônios e acervos vividos.",
        },
        {
          label: "Eventos e Espaços",
          to: "/experiencias/eventos",
          description: "Ambientes que reagem à presença do público.",
        },
        {
          label: "Parceiros",
          to: "/parceiros",
          description: "Braço tecnológico de agências, produtoras e cenografia.",
        },
      ],
    },
  },
  { label: "Projetos", to: "/projetos" },
  { label: "Tecnologia", to: "/tecnologia" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-mist/85 py-2 backdrop-blur-xl"
          : "border-b border-transparent py-4",
      )}
    >
      <div className="fohat-shell">
        <nav aria-label="Navegação principal" className="flex items-center justify-between gap-6">
          <Link to="/" aria-label="FOHAT — início" className="shrink-0">
            <img
              src={logoAsset.url}
              alt="FOHAT — Tecnologia Aplicada, Serviços e Eventos"
              className="h-10 w-auto max-w-[40vw] object-contain md:h-11"
            />
          </Link>

          <div
            className="hidden items-center gap-1 text-sm font-semibold lg:flex"
            onMouseLeave={() => setOpenMega(null)}
          >
            {NAV.map((item) => {
              const hasMega = !!item.submenu;
              const active = openMega === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMega(hasMega ? item.label : null)}
                >
                  {item.to ? (
                    <Link
                      to={item.to}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-3 py-2 transition-all",
                        "opacity-70 hover:opacity-100 hover:text-blue",
                        active && "opacity-100 text-blue",
                      )}
                      activeProps={{ className: "opacity-100 text-blue" }}
                      activeOptions={{ exact: item.to === "/" }}
                    >
                      {item.label}
                      {hasMega && (
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-transform",
                            active && "rotate-180",
                          )}
                        />
                      )}
                    </Link>
                  ) : null}

                  {/* Mega menu */}
                  {hasMega && active && (
                    <div
                      className="absolute left-1/2 top-full z-40 mt-3 w-[520px] -translate-x-1/2 animate-in fade-in slide-in-from-top-2"
                      onMouseEnter={() => setOpenMega(item.label)}
                    >
                      {/* Hover safety bridge */}
                      <div className="h-3" />
                      <div className="overflow-hidden rounded-3xl border border-line bg-card/95 shadow-[var(--shadow-elegant)] backdrop-blur-xl">
                        <div className="border-b border-line bg-mist/70 px-6 py-4">
                          <span className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-blue">
                            {item.label}
                          </span>
                          <p className="mt-1 text-sm font-semibold text-navy">
                            {item.submenu!.title}
                          </p>
                        </div>
                        <ul className="p-3">
                          {item.submenu!.items.map((s) => (
                            <li key={s.to}>
                              <MegaLink item={s} onNavigate={() => setOpenMega(null)} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <ContactDialog>
              <button className="group ml-2 inline-flex h-11 items-center gap-2 rounded-full bg-navy px-5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-cta)] transition-all hover:-translate-y-0.5 hover:bg-blue">
                Conte sua ideia
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </ContactDialog>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-navy lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="mt-3 max-h-[75vh] overflow-auto rounded-3xl border border-line bg-card p-5 shadow-[var(--shadow-card)] lg:hidden">
            <ul className="flex flex-col gap-1">
              {NAV.map((item) => (
                <li key={item.label} className="border-b border-line/60 last:border-0">
                  <div className="flex items-center justify-between">
                    {item.to ? (
                      <Link
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className="flex-1 py-3 text-base font-semibold text-navy"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="py-3 text-base font-semibold text-navy">
                        {item.label}
                      </span>
                    )}
                    {item.submenu && (
                      <button
                        type="button"
                        aria-label="Expandir"
                        onClick={() =>
                          setExpandedMobile((e) =>
                            e === item.label ? null : item.label,
                          )
                        }
                        className="p-2 text-blue"
                      >
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            expandedMobile === item.label && "rotate-180",
                          )}
                        />
                      </button>
                    )}
                  </div>
                  {item.submenu && expandedMobile === item.label && (
                    <ul className="mb-3 space-y-1 rounded-2xl bg-mist p-2">
                      {item.submenu.items.map((s) => (
                        <li key={s.to}>
                          <MegaLink
                            item={s}
                            onNavigate={() => setMenuOpen(false)}
                            compact
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <ContactDialog>
              <button
                onClick={() => setMenuOpen(false)}
                className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-navy px-5 text-sm font-bold text-primary-foreground"
              >
                Conte sua ideia <ArrowUpRight className="h-4 w-4" />
              </button>
            </ContactDialog>
          </div>
        )}
      </div>
    </header>
  );
}

function MegaLink({
  item,
  onNavigate,
  compact,
}: {
  item: SubItem;
  onNavigate: () => void;
  compact?: boolean;
}) {
  // Split hash target like "/#metodo" into pathname + hash for TanStack Link
  const [pathname, hash] = item.to.split("#");
  return (
    <Link
      to={pathname || "/"}
      hash={hash}
      onClick={onNavigate}
      className={cn(
        "group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-mist",
        compact && "p-2",
      )}
    >
      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue transition-all group-hover:bg-cyan group-hover:ring-4 group-hover:ring-cyan/25" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1 text-sm font-bold text-navy">
          {item.label}
          <ArrowUpRight className="h-3.5 w-3.5 -translate-y-0.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
      </div>
    </Link>
  );
}
