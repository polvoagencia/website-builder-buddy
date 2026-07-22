import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

import labAsset from "@/assets/lab.jpg.asset.json";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Tela Brasil — tratamento cinematográfico dos três ciclos operacionais.
 *
 * Comportamento:
 *  - Mídia parallax de fundo (scrollYProgress → translateY).
 *  - Três "ciclos" alinhados horizontalmente no desktop, empilhados
 *    verticalmente no mobile. Cada ciclo revela suas duas capitais.
 *  - Barra timeline com progresso animado por scroll.
 *
 * motion/react é usado por: (1) parallax coordenado do backdrop, (2)
 * timeline sincronizada com scrollYProgress da própria seção.
 *
 * Correção factual: seis capitais em três ciclos de duas simultâneas.
 */

const CICLOS = [
  {
    n: 1,
    capitais: ["Recife", "Fortaleza"],
    foco: "Abertura do circuito no Nordeste",
  },
  {
    n: 2,
    capitais: ["Belo Horizonte", "Salvador"],
    foco: "Deslocamento para o eixo central",
  },
  {
    n: 3,
    capitais: ["Rio de Janeiro", "São Paulo"],
    foco: "Encerramento no Sudeste",
  },
] as const;

export function TelaBrasilCinematic() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = reduce
    ? "0%"
    : useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const bgScale = reduce
    ? 1
    : useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);
  const timelineScale = reduce
    ? 1
    : useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);

  return (
    <section
      ref={ref}
      id="tela-brasil"
      className="relative overflow-hidden bg-navy py-28 text-white lg:py-36"
    >
      {/* BACKDROP com parallax */}
      <motion.div
        aria-hidden
        style={{ y: bgY, scale: bgScale }}
        className="pointer-events-none absolute inset-0"
      >
        <img
          src={labAsset.url}
          alt=""
          className="h-full w-full object-cover opacity-[0.28]"
          style={{ filter: "grayscale(0.35) contrast(1.1)" }}
          loading="lazy"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/85 to-navy"
      />
      <div
        aria-hidden
        className="fohat-grid-bg-dark pointer-events-none absolute inset-0 opacity-70"
      />

      <div className="fohat-shell relative">
        <SectionReveal className="max-w-[820px]">
          <span
            className="fohat-eyebrow"
            style={{ color: "var(--color-cyan)" }}
          >
            Prova em funcionamento
          </span>
          <h2 className="fohat-h2 mt-5 text-white">
            Tela Brasil — cinema brasileiro em seis capitais, em três ciclos
            operacionais.
          </h2>
          <p className="fohat-lead mt-6 text-[oklch(0.85_0.02_250)]">
            Software, inteligência artificial, impressão em tempo real,
            equipamentos, dashboards e suporte técnico presencial integrados
            em uma operação nacional organizada em três ciclos de duas
            capitais simultâneas.
          </p>
        </SectionReveal>

        {/* Timeline */}
        <div className="mt-14">
          <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-white/15">
            <motion.div
              style={{ scaleX: timelineScale, transformOrigin: "left center" }}
              className="absolute inset-0 h-full origin-left bg-gradient-to-r from-blue via-cyan to-cyan"
            />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3 lg:gap-8">
            {CICLOS.map((c, i) => (
              <SectionReveal
                as="article"
                key={c.n}
                delay={i * 120}
                className="group relative overflow-hidden rounded-[24px] border border-white/12 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors hover:border-cyan/60"
              >
                <div className="flex items-baseline justify-between">
                  <span className="fohat-mono text-[10px] uppercase tracking-[0.24em] text-cyan">
                    Ciclo {String(c.n).padStart(2, "0")}
                  </span>
                  <span className="fohat-mono text-[10px] tabular-nums text-white/40">
                    02 capitais
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-bold leading-tight tracking-tight text-white">
                  {c.capitais.join(" + ")}
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  {c.capitais.map((cap) => (
                    <span
                      key={cap}
                      className="rounded-full border border-white/20 bg-white/[0.03] px-3 py-1 text-xs text-white/85"
                    >
                      {cap}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-sm text-white/70">{c.foco}</p>

                {/* linha de conexão animada — só no hover, ~ dashed */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-6 bottom-4 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </SectionReveal>
            ))}
          </div>
        </div>

        <SectionReveal className="mt-14 flex flex-wrap gap-3">
          <Link
            to="/engenharia-de-presenca/projetos/$slug"
            params={{ slug: "tela-brasil" }}
            className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-navy shadow-[0_14px_40px_oklch(0_0_0_/_0.24)] transition-transform hover:-translate-y-0.5 hover:bg-cyan"
          >
            Conheça o case Tela Brasil
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            to="/engenharia-de-presenca/projetos"
            className="group inline-flex h-14 items-center gap-3 rounded-full border border-white/28 bg-white/[0.06] px-7 text-sm font-bold text-white backdrop-blur-md transition-colors hover:border-cyan hover:text-cyan"
          >
            Ver todos os projetos
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
