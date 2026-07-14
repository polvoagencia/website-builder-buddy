import logoAsset from "@/assets/logo-fohat.png.asset.json";

export function Footer() {
  return (
    <footer className="bg-[oklch(0.18_0.02_250)] py-16 text-[oklch(0.78_0.03_250)]">
      <div className="fohat-shell">
        <div className="grid gap-12 md:grid-cols-[1.3fr_.7fr_.7fr]">
          <div>
            <img
              src={logoAsset.url}
              alt="FOHAT"
              className="mb-6 h-10 w-auto brightness-0 invert opacity-90"
            />
            <p className="max-w-md text-lg leading-relaxed text-white">
              Criamos experiências tecnológicas imersivas que reconectam pessoas ao mundo.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#presenca" className="hover:text-white">Engenharia de Presença</a></li>
              <li><a href="#experiencias" className="hover:text-white">Experiências</a></li>
              <li><a href="#metodo" className="hover:text-white">Método</a></li>
              <li><a href="#projetos" className="hover:text-white">Projetos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white">
              Contato
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#contato" className="hover:text-white">Conte sua ideia</a></li>
              <li><a href="#" className="hover:text-white">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white">Instagram</a></li>
              <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/60">
          © {new Date().getFullYear()} FOHAT — Tecnologia Aplicada, Serviços e Eventos.
        </div>
      </div>
    </footer>
  );
}
