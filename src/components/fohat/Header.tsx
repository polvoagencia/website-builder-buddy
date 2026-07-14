import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import logoAsset from "@/assets/logo-fohat.png.asset.json";
import { ContactDialog } from "./ContactDialog";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#presenca", label: "Engenharia de Presença" },
  { href: "#experiencias", label: "Experiências" },
  { href: "#metodo", label: "Método" },
  { href: "#projetos", label: "Projetos" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
          <a href="#inicio" aria-label="FOHAT — início" className="shrink-0">
            <img
              src={logoAsset.url}
              alt="FOHAT — Tecnologia Aplicada, Serviços e Eventos"
              className="h-10 w-auto max-w-[40vw] object-contain md:h-11"
            />
          </a>

          <div className="hidden items-center gap-7 text-sm font-semibold lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="opacity-70 transition-all hover:text-blue hover:opacity-100"
              >
                {l.label}
              </a>
            ))}
            <ContactDialog>
              <button className="group inline-flex h-12 items-center gap-2 rounded-full bg-navy px-5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-cta)] transition-all hover:-translate-y-0.5 hover:bg-blue">
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

        {menuOpen && (
          <div className="mt-3 rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-card)] lg:hidden">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-semibold text-navy/80 hover:text-blue"
                >
                  {l.label}
                </a>
              ))}
              <ContactDialog>
                <button className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-navy px-5 text-sm font-bold text-primary-foreground">
                  Conte sua ideia <ArrowUpRight className="h-4 w-4" />
                </button>
              </ContactDialog>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
