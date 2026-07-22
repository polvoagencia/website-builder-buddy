import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { MediaReveal } from "@/components/fohat/motion/MediaReveal";
import { PRESENCE_TERRITORIES } from "@/data/fohat-services";
import marcasAsset from "@/assets/marcas.jpg.asset.json";
import culturaAsset from "@/assets/cultura.jpg.asset.json";
import eventosAsset from "@/assets/eventos.jpg.asset.json";

/**
 * Três previews visuais dos territórios em que a Engenharia de Presença é
 * aplicada. Cada território possui imagem própria (não reutilizada em outra
 * seção desta página) e indicação de que é uma aplicação do método.
 */
const TERRITORY_MEDIA: Record<
  (typeof PRESENCE_TERRITORIES)[number]["slug"],
  { src: string; alt: string; tags: string[] }
> = {
  marcas: {
    src: marcasAsset.url,
    alt: "Ativação de marca com participação do público",
    tags: ["Participação", "Personalização", "Ativação", "Interação"],
  },
  cultura: {
    src: culturaAsset.url,
    alt: "Ambiente cultural com narrativa e acervo",
    tags: ["Memória", "Narrativa", "Acervo", "Contemplação"],
  },
  "eventos-e-espacos": {
    src: eventosAsset.url,
    alt: "Ambiente de evento em escala com público em circulação",
    tags: ["Escala", "Circulação", "Implantação", "Ambientes"],
  },
};

export function PresenceTerritories() {
  return (
    <section
      id="territorios"
      aria-labelledby="territorios-heading"
      className="bg-mist py-24 lg:py-32"
    >
      <div className="fohat-shell">
        <SectionReveal className="mb-14 max-w-[820px]">
          <span className="fohat-eyebrow">Territórios de aplicação</span>
          <h2 id="territorios-heading" className="fohat-h2 mt-5">
            O mesmo método. Contextos diferentes.
          </h2>
          <p className="fohat-lead mt-5">
            Marcas, cultura, eventos e espaços chegam com desafios distintos — cada um resolvido com
            a mesma lógica de engenharia.
          </p>
        </SectionReveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {PRESENCE_TERRITORIES.map((t, i) => {
            const media = TERRITORY_MEDIA[t.slug];
            return (
              <SectionReveal
                key={t.slug}
                delay={i * 90}
                className="group relative overflow-hidden rounded-[28px] border border-line bg-white shadow-[var(--shadow-card)]"
              >
                <Link
                  to={t.to}
                  className="flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <MediaReveal ratio="4 / 3">
                      <img
                        src={media.src}
                        alt={media.alt}
                        loading="lazy"
                        width={800}
                        height={600}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </MediaReveal>
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 55%, oklch(0.22 0.023 250 / 0.55))",
                      }}
                    />
                    <div className="fohat-mono absolute left-4 top-4 rounded-full border border-white/40 bg-black/25 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
                      Aplicação · Engenharia de Presença
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-7">
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight">{t.label}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>
                    </div>
                    <ul className="flex flex-wrap gap-1.5">
                      {media.tags.map((tag) => (
                        <li
                          key={tag}
                          className="fohat-mono rounded-full bg-ice px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-blue"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-navy">
                      Ver aplicação
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
