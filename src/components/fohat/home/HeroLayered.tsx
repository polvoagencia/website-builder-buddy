import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Boxes, Cpu, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { ContactDialog } from "@/components/fohat/ContactDialog";
import { SERVICES } from "@/data/fohat-services";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Hero cinematográfica — modo "keynote".
 *
 * Palco escuro em tela cheia com um "produto flutuante" à direita que troca
 * conforme a frente selecionada. Camadas de luz (glows radiais), linha do
 * horizonte, grid sutil e vidro (backdrop-blur) compõem a profundidade.
 * Preserva identidade FOHAT: navy, blue e cyan como acento — sem neon roxo.
 *
 * A/11y: tabs com role="tablist", setas ←/→, Home/End, aria-selected,
 * foco visível e legendas persistentes. Reduced motion desliga transições
 * de escala/opacidade e mantém o conteúdo estático.
 */

type Front = {
  slug: string;
  index: number;
  eyebrow: string;
  title: string;
  short: string;
  href: string;
  icon: typeof Sparkles;
  metrics: { label: string; value: string }[];
};

const FRONTS: Front[] = [
  {
    slug: "engenharia-de-presenca",
    index: 1,
    eyebrow: "Frente autoral",
    title: "Engenharia de Presença",
    short:
      "Ativações, ambientes e experiências que integram tecnologia, narrativa e presença humana.",
    href: "/engenharia-de-presenca",
    icon: Sparkles,
    metrics: [
      { label: "Territórios", value: "Marcas · Cultura · Eventos" },
      { label: "Método", value: "F · O · H · A · T" },
    ],
  },
  {
    slug: "sistemas-e-aplicativos",
    index: 2,
    eyebrow: "Produto e engenharia",
    title: "Sistemas e Aplicativos",
    short: "Software sob medida — interfaces, integrações, dashboards e inteligência aplicada.",
    href: "/sistemas-e-aplicativos",
    icon: Cpu,
    metrics: [
      { label: "Camadas", value: "Web · Mobile · API · IA" },
      { label: "Entrega", value: "Discovery → operação" },
    ],
  },
  {
    slug: "locacao-de-equipamentos",
    index: 3,
    eyebrow: "Operação",
    title: "Locação de Equipamentos",
    short:
      "Infraestrutura tecnológica para eventos, projetos e operações — com suporte técnico e logística.",
    href: "/locacao-de-equipamentos",
    icon: Boxes,
    metrics: [
      { label: "Escopo", value: "Vídeo · Áudio · Interação" },
      { label: "Suporte", value: "Técnico + logística" },
    ],
  },
];

export function HeroLayered() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const front = FRONTS[active];
  const Icon = front.icon;

  const activeCta = SERVICES.find((s) => s.slug === front.slug)?.cta ?? {
    label: "Saiba mais",
    to: front.href,
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % FRONTS.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + FRONTS.length) % FRONTS.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(FRONTS.length - 1);
    }
  };

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-screen flex-col overflow-hidden bg-navy pt-32 text-white lg:pt-36"
    >
      {/* ==== Camadas de luz cinematográficas ==== */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* glow superior azul */}
        <div
          className="absolute -top-[20%] -left-[15%] h-[70%] w-[70%] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.46 0.09 253 / 0.55), transparent 65%)",
            filter: "blur(120px)",
          }}
        />
        {/* glow inferior cyan */}
        <div
          className="absolute top-[35%] -right-[10%] h-[65%] w-[65%] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.78 0.11 220 / 0.35), transparent 65%)",
            filter: "blur(140px)",
          }}
        />
        {/* mesh grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.85 0.055 245) 1px, transparent 1px), linear-gradient(90deg, oklch(0.85 0.055 245) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse at 50% 40%, black 40%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 40%, black 40%, transparent 80%)",
          }}
        />
        {/* linha do horizonte cyan */}
        <div
          className="absolute bottom-[18%] left-0 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.85 0.11 220 / 0.7), transparent)",
            boxShadow: "0 0 24px oklch(0.85 0.11 220 / 0.5)",
          }}
        />
        {/* lens flare horizontal */}
        <div
          className="absolute top-[22%] left-0 h-px w-full opacity-40"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.85 0.055 245 / 0.6), transparent)",
            filter: "blur(1.5px)",
          }}
        />
      </div>

      {/* ==== Conteúdo ==== */}
      <div className="fohat-shell relative z-10 flex flex-1 items-center py-10 lg:py-16">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Copy */}
          <div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
              </span>
              <span
                className="fohat-mono text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ color: "var(--color-cyan)" }}
              >
                Tecnologia aplicada · do conceito à operação
              </span>
            </motion.div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="fohat-h1 mt-7 max-w-[820px] text-white [font-size:clamp(2.6rem,5.4vw,5.5rem)] [line-height:0.95]"
            >
              Tecnologia para criar{" "}
              <span
                className="italic"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, #ffffff 0%, oklch(0.85 0.055 245) 60%, oklch(0.65 0.09 240 / 0.65) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                presença
              </span>
              , desenvolver soluções e colocar operações em funcionamento.
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[560px] text-lg text-white/60 lg:text-xl"
            >
              Três frentes de contratação, uma única lógica de engenharia. A FOHAT integra
              experiências, software e infraestrutura em projetos que acontecem de verdade — diante
              do público.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <ContactDialog>
                <button className="group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-white px-7 text-sm font-bold text-navy shadow-[0_14px_44px_oklch(0.78_0.11_220_/_0.35)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cyan">
                  Conte sua ideia
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </ContactDialog>
              <a
                href="#frentes"
                className="inline-flex h-14 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 text-sm font-bold text-white backdrop-blur-md transition-colors hover:border-cyan hover:text-cyan"
              >
                Conheça nossas frentes
              </a>
            </motion.div>
          </div>

          {/* Palco — "produto flutuante" */}
          <div className="relative mx-auto flex h-[520px] w-full max-w-[520px] items-center justify-center lg:h-[600px]">
            {/* halo de fundo */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, oklch(0.78 0.11 220 / 0.35), transparent 65%)",
                filter: "blur(40px)",
              }}
            />
            {/* placa traseira inclinada */}
            <div
              aria-hidden
              className="absolute h-[420px] w-[280px] rotate-[10deg] rounded-[40px] border border-white/10 backdrop-blur-2xl lg:h-[500px] lg:w-[320px]"
              style={{
                background:
                  "linear-gradient(155deg, oklch(0.46 0.055 253 / 0.28), oklch(0.85 0.11 220 / 0.05))",
              }}
            />

            {/* painel principal (glass) */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={front.slug}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: reduce ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex h-[440px] w-[290px] flex-col overflow-hidden rounded-[32px] border border-white/15 p-6 shadow-[0_40px_120px_oklch(0.85_0.11_220_/_0.28)] backdrop-blur-2xl lg:h-[520px] lg:w-[340px]"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(0.22 0.03 250 / 0.85), oklch(0.16 0.03 250 / 0.9))",
                }}
              >
                {/* topo — chip da frente */}
                <div className="flex items-center justify-between">
                  <span
                    className="fohat-mono text-[10px] font-bold uppercase tracking-[0.24em]"
                    style={{ color: "var(--color-cyan)" }}
                  >
                    {String(front.index).padStart(2, "0")} / {String(FRONTS.length).padStart(2, "0")}
                  </span>
                  <span className="fohat-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
                    {front.eyebrow}
                  </span>
                </div>

                {/* visor com pulso */}
                <div className="relative mt-5 h-40 w-full overflow-hidden rounded-2xl border border-cyan/20 bg-white/[0.03]">
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 55%, oklch(0.85 0.11 220 / 0.35), transparent 65%)",
                    }}
                  />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/20 bg-white/[0.06] backdrop-blur-xl">
                      <Icon className="h-7 w-7 text-cyan" strokeWidth={1.4} aria-hidden />
                    </div>
                  </div>
                  {/* varreduras finas */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-[30%] h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, oklch(0.85 0.11 220 / 0.6), transparent)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-[70%] h-px opacity-60"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, oklch(0.85 0.055 245 / 0.5), transparent)",
                    }}
                  />
                </div>

                {/* título e descrição */}
                <h2 className="mt-5 text-xl font-bold leading-tight tracking-tight text-white lg:text-2xl">
                  {front.title}
                </h2>
                <p className="mt-2 text-sm text-white/55">{front.short}</p>

                {/* métricas */}
                <div className="mt-5 space-y-2">
                  {front.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="flex items-center justify-between border-t border-white/8 pt-2 first:border-t-0 first:pt-0"
                    >
                      <span className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                        {m.label}
                      </span>
                      <span className="text-[11px] font-semibold text-white/85">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* CTA da frente */}
                <div className="mt-auto pt-6">
                  <Link
                    to={activeCta.to}
                    hash={activeCta.hash}
                    className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-cyan/30 bg-cyan/10 text-sm font-bold text-cyan transition-colors hover:bg-cyan/20"
                  >
                    {activeCta.label}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* card lateral flutuante */}
            <div
              aria-hidden
              className="absolute -right-4 top-16 hidden h-24 w-24 rotate-[-8deg] items-center justify-center rounded-2xl border border-white/25 bg-white/[0.06] shadow-2xl backdrop-blur-xl lg:flex"
            >
              <div className="h-2 w-8 rounded-full bg-cyan/70" />
            </div>
            <div
              aria-hidden
              className="absolute -left-6 bottom-16 hidden h-16 w-16 rotate-[12deg] items-center justify-center rounded-xl border border-white/20 bg-white/[0.04] backdrop-blur-xl lg:flex"
            >
              <div className="h-1.5 w-6 rounded-full bg-white/60" />
            </div>
          </div>
        </div>
      </div>

      {/* ==== Rodapé da hero — tablist de frentes ==== */}
      <div className="fohat-shell relative z-10 pb-10">
        <div
          role="tablist"
          aria-label="Frentes FOHAT"
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className="grid gap-3 border-t border-white/10 pt-6 md:grid-cols-3"
        >
          {FRONTS.map((f, i) => {
            const isActive = i === active;
            return (
              <button
                key={f.slug}
                role="tab"
                id={`hero-tab-${f.slug}`}
                aria-selected={isActive}
                aria-controls="hero-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "group relative flex items-start gap-4 rounded-2xl border px-4 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
                  isActive
                    ? "border-cyan/40 bg-white/[0.06] backdrop-blur-md"
                    : "border-white/8 bg-transparent hover:border-white/20 hover:bg-white/[0.03]",
                )}
              >
                <span
                  className={cn(
                    "fohat-mono mt-0.5 text-[10px] font-bold uppercase tracking-[0.22em] transition-colors",
                    isActive ? "text-cyan" : "text-white/40 group-hover:text-white/70",
                  )}
                >
                  {String(f.index).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span
                    className={cn(
                      "block text-sm font-bold tracking-tight transition-colors",
                      isActive ? "text-white" : "text-white/70 group-hover:text-white",
                    )}
                  >
                    {f.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-white/45">{f.eyebrow}</span>
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-1 h-1.5 w-1.5 rounded-full transition-all",
                    isActive ? "bg-cyan shadow-[0_0_12px_var(--color-cyan)]" : "bg-white/20",
                  )}
                />
              </button>
            );
          })}
        </div>

        <div className="fohat-mono mt-6 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white/40">
          <span>Role para explorar</span>
          <span aria-hidden className="inline-block h-4 w-px animate-pulse bg-white/40" />
        </div>
      </div>

      {/* Transição suave para a seção clara seguinte */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{
          background:
            "linear-gradient(180deg, transparent, oklch(0.22 0.023 250 / 0.6) 40%, var(--color-mist))",
        }}
      />
    </section>
  );
}
