import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo-fohat.png.asset.json";

export function Footer() {
  return (
    <footer className="bg-[oklch(0.18_0.02_250)] py-16 text-[oklch(0.78_0.03_250)]">
      <div className="fohat-shell">
        <div className="grid gap-12 md:grid-cols-[1.3fr_.7fr_.7fr_.7fr]">
          <div>
            <img
              src={logoAsset.url}
              alt="FOHAT"
              className="mb-6 h-10 w-auto brightness-0 invert opacity-90"
            />
            <p className="max-w-md text-lg leading-relaxed text-white">
              Criamos experiências tecnológicas imersivas que reconectam pessoas ao mundo.
            </p>
            <p className="mt-3 fohat-mono text-xs uppercase tracking-[0.18em] text-white/50">
              Engenharia de Experiências Tecnológicas
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white">
              Experiências
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/experiencias" className="hover:text-white">Todos os territórios</Link></li>
              <li><Link to="/experiencias/marcas" className="hover:text-white">Marcas</Link></li>
              <li><Link to="/experiencias/cultura" className="hover:text-white">Cultura</Link></li>
              <li><Link to="/experiencias/eventos" className="hover:text-white">Eventos e Espaços</Link></li>
              <li><Link to="/parceiros" className="hover:text-white">Parceiros</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white">
              FOHAT
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/engenharia-de-presenca" className="hover:text-white">Engenharia de Presença</Link></li>
              <li><Link to="/tecnologia" className="hover:text-white">Tecnologia de Experiência</Link></li>
              <li><Link to="/" hash="metodo" className="hover:text-white">Método</Link></li>
              <li><Link to="/" hash="projetos" className="hover:text-white">Projetos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white">
              Contato
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" hash="contato" className="hover:text-white">Conte sua ideia</Link></li>
              <li><a href="#" className="hover:text-white">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} FOHAT — Tecnologia Aplicada, Serviços e Eventos.</span>
          <span className="fohat-mono uppercase tracking-[0.16em]">
            Presença projetada · São Paulo, BR
          </span>
        </div>
      </div>
    </footer>
  );
}
