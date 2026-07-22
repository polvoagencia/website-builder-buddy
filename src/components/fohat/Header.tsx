import { useEffect, useId, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import logoAsset from "@/assets/logo-fohat.png.asset.json";
import { ContactDialog } from "./ContactDialog";
import { cn } from "@/lib/utils";

type SubItem = { label: string; to: string; description: string };
type NavItem = {
  label: string;
  to?: string;
  submenu?: { title: string; items: SubItem[] };
};

const NAV: NavItem[] = [
  { label: "Início", to: "/" },
  {
    label: "Engenharia de Presença",
    to: "/engenharia-de-presenca",
    submenu: {
      title: "Frente autoral · aplicações e projetos",
      items: [
        {
          label: "Visão geral",
          to: "/engenharia-de-presenca",
          description: "Método, fórmula e pilares da frente autoral da FOHAT.",
        },
        {
          label: "Para Marcas",
          to: "/engenharia-de-presenca/marcas",
          description: "Comunicação vira participação e memória.",
        },
        {
          label: "Para Cultura",
          to: "/engenharia-de-presenca/cultura",
          description: "Histórias, patrimônios e acervos vividos.",
        },
        {
          label: "Para Eventos e Espaços",
          to: "/engenharia-de-presenca/eventos-e-espacos",
          description: "Ambientes que reagem à presença do público.",
        },
        {
          label: "Projetos de Engenharia de Presença",
          to: "/engenharia-de-presenca/projetos",
          description: "Cases entregues pela FOHAT diante do público.",
        },
        {
          label: "Tela Brasil",
          to: "/engenharia-de-presenca/projetos/tela-brasil",
          description: "Cinema brasileiro em seis capitais com IA, impressão e projeção.",
        },
      ],
    },
  },
  { label: "Sistemas e Aplicativos", to: "/sistemas-e-aplicativos" },
  { label: "Locação de Equipamentos", to: "/locacao-de-equipamentos" },
  { label: "Para Parceiros", to: "/parceiros" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const desktopNavRef = useRef<HTMLDivElement | null>(null);
  const megaBaseId = useId();
  const mobileBaseId = useId();

  const locationHref = useRouterState({ select: (s) => s.location.href });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setExpandedMobile(null);
    setOpenMega(null);
  }, [locationHref]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openMega) setOpenMega(null);
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMega, menuOpen]);

  useEffect(() => {
    if (!openMega) return;
    const onDown = (e: MouseEvent) => {
      if (!desktopNavRef.current) return;
      if (!desktopNavRef.current.contains(e.target as Node)) setOpenMega(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [openMega]);

  const megaPanelId = (label: string) =>
    `${megaBaseId}-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const mobilePanelId = (label: string) =>
    `${mobileBaseId}-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className={cn(
        "fohat-header fixed inset-x-0 top-0 z-50 transition-[padding,background-color,border-color,backdrop-filter] duration-[var(--motion-base)] ease-[var(--ease-fohat)]",
        scrolled
          ? "border-b border-line/70 bg-mist/80 py-2 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent py-4",
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
            ref={desktopNavRef}
            className="hidden items-center gap-1 text-sm font-semibold lg:flex"
            onMouseLeave={() => setOpenMega(null)}
          >
            {NAV.map((item) => {
              const hasMega = !!item.submenu;
              const active = openMega === item.label;
              const panelId = hasMega ? megaPanelId(item.label) : undefined;

              const openThis = () => setOpenMega(item.label);
              const closeThis = () => setOpenMega(null);
              const toggleThis = () =>
                setOpenMega((cur) => (cur === item.label ? null : item.label));

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasMega && openThis()}
                  onFocus={() => hasMega && openThis()}
                  onBlur={(e) => {
                    if (hasMega && !e.currentTarget.contains(e.relatedTarget as Node | null)) {
                      closeThis();
                    }
                  }}
                >
                  {item.to ? (
                    <Link
                      to={item.to}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-3 py-2 transition-all outline-none",
                        "opacity-70 hover:opacity-100 hover:text-blue",
                        "focus-visible:opacity-100 focus-visible:text-blue focus-visible:ring-2 focus-visible:ring-blue/50",
                        active && "opacity-100 text-blue",
                      )}
                      activeProps={{ className: "opacity-100 text-blue" }}
                      activeOptions={{ exact: item.to === "/" }}
                      aria-haspopup={hasMega ? "menu" : undefined}
                      aria-expanded={hasMega ? active : undefined}
                      aria-controls={panelId}
                      onKeyDown={(e) => {
                        if (!hasMega) return;
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          openThis();
                          const panel = document.getElementById(panelId!);
                          const first = panel?.querySelector<HTMLElement>("a[href]");
                          first?.focus();
                        }
                      }}
                    >
                      {item.label}
                      {hasMega && (
                        <ChevronDown
                          className={cn("h-3.5 w-3.5 transition-transform", active && "rotate-180")}
                        />
                      )}
                    </Link>
                  ) : null}

                  {hasMega && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleThis();
                      }}
                      aria-haspopup="menu"
                      aria-expanded={active}
                      aria-controls={panelId}
                      aria-label={
                        active ? `Recolher submenu ${item.label}` : `Expandir submenu ${item.label}`
                      }
                      className="sr-only focus:not-sr-only focus:absolute focus:left-0 focus:top-full focus:mt-1 focus:rounded-md focus:bg-navy focus:px-2 focus:py-1 focus:text-xs focus:text-white"
                    >
                      {active ? "Recolher" : "Expandir"} {item.label}
                    </button>
                  )}

                  {hasMega && active && (
                    <div
                      id={panelId}
                      role="menu"
                      aria-label={item.submenu!.title}
                      className="absolute left-1/2 top-full z-40 mt-3 w-[560px] -translate-x-1/2 fohat-mega-enter"
                      onMouseEnter={openThis}
                    >
                      <div className="h-3" />
                      <div className="relative overflow-hidden rounded-3xl border border-line bg-card/95 shadow-[var(--shadow-elegant)] backdrop-blur-xl">
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 fohat-grid-bg opacity-40"
                        />
                        <div className="relative border-b border-line bg-mist/70 px-6 py-4">
                          <span className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-blue">
                            {item.label}
                          </span>
                          <p className="mt-1 text-sm font-semibold text-navy">
                            {item.submenu!.title}
                          </p>
                        </div>
                        <ul className="relative p-3">
                          {item.submenu!.items.map((s) => (
                            <li key={s.to} role="none">
                              <MegaLink item={s} onNavigate={closeThis} />
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
            aria-expanded={menuOpen}
            aria-controls="fohat-mobile-drawer"
            onClick={() =>
              setMenuOpen((o) => {
                const next = !o;
                if (!next) setExpandedMobile(null);
                return next;
              })
            }
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-navy lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {menuOpen && (
          <div
            id="fohat-mobile-drawer"
            className="mt-3 max-h-[75vh] overflow-auto rounded-3xl border border-line bg-card p-5 shadow-[var(--shadow-card)] lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV.map((item) => {
                const expanded = expandedMobile === item.label;
                const panelId = item.submenu ? mobilePanelId(item.label) : undefined;
                return (
                  <li key={item.label} className="border-b border-line/60 last:border-0">
                    <div className="flex items-center justify-between">
                      {item.to ? (
                        <Link
                          to={item.to}
                          onClick={() => {
                            setMenuOpen(false);
                            setExpandedMobile(null);
                          }}
                          className="flex-1 py-3 text-base font-semibold text-navy"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="py-3 text-base font-semibold text-navy">{item.label}</span>
                      )}
                      {item.submenu && (
                        <button
                          type="button"
                          aria-label={
                            expanded
                              ? `Recolher submenu ${item.label}`
                              : `Expandir submenu ${item.label}`
                          }
                          aria-expanded={expanded}
                          aria-controls={panelId}
                          onClick={() =>
                            setExpandedMobile((e) => (e === item.label ? null : item.label))
                          }
                          className="p-2 text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/50 rounded-md"
                        >
                          <ChevronDown
                            className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
                          />
                        </button>
                      )}
                    </div>
                    {item.submenu && expanded && (
                      <ul id={panelId} className="mb-3 space-y-1 rounded-2xl bg-mist p-2">
                        {item.submenu.items.map((s) => (
                          <li key={s.to}>
                            <MegaLink
                              item={s}
                              onNavigate={() => {
                                setMenuOpen(false);
                                setExpandedMobile(null);
                              }}
                              compact
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
            <ContactDialog>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setExpandedMobile(null);
                }}
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
  const [pathname, hash] = item.to.split("#");
  return (
    <Link
      to={pathname || "/"}
      hash={hash}
      onClick={onNavigate}
      role="menuitem"
      className={cn(
        "group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-mist focus-visible:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/50",
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
