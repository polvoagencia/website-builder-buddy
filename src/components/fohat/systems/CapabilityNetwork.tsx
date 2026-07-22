import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * CapabilityNetwork — rede de capacidades da FOHAT.
 * Desktop: 6 nós ao redor de um centro "Operação digital"; o nó selecionado
 * (clique ou teclado) atualiza um painel de detalhe.
 * Mobile: converte para lista de tabs verticais (accordion-like).
 */
const CAPS = [
  {
    key: "web",
    label: "Sistemas web",
    problem: "Organizar operações acessíveis pelo navegador.",
    context: "Gestão, atendimento, operação e acompanhamento.",
    relation: "Conecta-se a dashboards, integrações e plataformas.",
  },
  {
    key: "app",
    label: "Aplicativos",
    problem: "Colocar a solução no bolso do público ou da equipe.",
    context: "Uso presencial, campo, participantes e operadores.",
    relation: "Consome APIs e conversa com equipamentos e IA.",
  },
  {
    key: "dash",
    label: "Dashboards",
    problem: "Enxergar o que está acontecendo em tempo real.",
    context: "Indicadores, utilização, fluxo e operação.",
    relation: "Lê dados de sistemas, integrações e automações.",
  },
  {
    key: "ia",
    label: "IA e automações",
    problem: "Gerar, processar, personalizar e automatizar tarefas.",
    context: "Geração de conteúdo, decisão assistida, resposta rápida.",
    relation: "Atravessa web, apps, integrações e experiências.",
  },
  {
    key: "int",
    label: "Integrações",
    problem: "Fazer sistemas diferentes falarem a mesma língua.",
    context: "APIs, bancos, serviços externos e equipamentos.",
    relation: "Sustenta dashboards, IA e plataformas.",
  },
  {
    key: "plat",
    label: "Plataformas para experiências",
    problem: "Rodar software em totens, tablets e estações interativas.",
    context: "Operações presenciais, ativações e ambientes.",
    relation: "Conecta hardware locado, integrações e apps.",
  },
];

const POSITIONS = [
  { x: 50, y: 8 },
  { x: 88, y: 30 },
  { x: 88, y: 70 },
  { x: 50, y: 92 },
  { x: 12, y: 70 },
  { x: 12, y: 30 },
];

export function CapabilityNetwork() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % CAPS.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + CAPS.length) % CAPS.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(CAPS.length - 1);
    }
  };

  const cap = CAPS[active];

  return (
    <section
      id="capacidades"
      aria-labelledby="capacidades-heading"
      className="relative overflow-hidden bg-white py-24 lg:py-32"
    >
      <div className="fohat-shell">
        <SectionReveal className="mb-14 max-w-[820px]">
          <span className="fohat-eyebrow">Capacidades</span>
          <h2 id="capacidades-heading" className="fohat-h2 mt-5">
            Uma rede que se combina conforme o problema.
          </h2>
          <p className="fohat-lead mt-5">
            Cada capacidade é um nó. Nenhum projeto usa todos — mas quase todos precisam de mais de
            um.
          </p>
        </SectionReveal>

        {/* Desktop: rede + painel */}
        <div className="hidden lg:grid lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
          <div
            role="tablist"
            aria-label="Capacidades da FOHAT"
            aria-orientation="horizontal"
            onKeyDown={onKeyDown}
            className="relative aspect-square w-full max-w-[560px]"
          >
            <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 h-full w-full">
              <circle
                cx="50"
                cy="50"
                r="34"
                fill="none"
                stroke="oklch(0.46 0.055 253 / 0.2)"
                strokeDasharray="1 2"
              />
              {POSITIONS.map((p, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={p.x}
                  y2={p.y}
                  stroke={
                    i === active ? "oklch(0.46 0.055 253 / 0.9)" : "oklch(0.46 0.055 253 / 0.25)"
                  }
                  strokeWidth={i === active ? 0.6 : 0.3}
                />
              ))}
              <circle cx="50" cy="50" r="6" fill="oklch(0.22 0.023 250)" />
              <text
                x="50"
                y="52"
                fontSize="2.4"
                textAnchor="middle"
                fill="oklch(1 0 0)"
                className="fohat-mono"
              >
                OPERAÇÃO
              </text>
            </svg>

            {CAPS.map((c, i) => {
              const p = POSITIONS[i];
              const isActive = i === active;
              return (
                <button
                  key={c.key}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1.5 text-xs font-bold transition-all outline-none",
                    "focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2",
                    isActive
                      ? "border-navy bg-navy text-white shadow-[var(--shadow-card)] scale-105"
                      : "border-line bg-white text-navy hover:border-blue/40",
                  )}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          <div className="relative rounded-[28px] border border-line bg-mist p-8">
            <div className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-blue">
              Capacidade {String(active + 1).padStart(2, "0")}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={cap.key}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <h3 className="mt-3 text-3xl font-bold tracking-tight">{cap.label}</h3>
                <dl className="mt-6 space-y-4">
                  <Row term="Problema que resolve" desc={cap.problem} />
                  <Row term="Contexto de uso" desc={cap.context} />
                  <Row term="Relação com o restante" desc={cap.relation} />
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: tabs verticais legíveis */}
        <div className="lg:hidden">
          <div role="tablist" aria-label="Capacidades da FOHAT" className="space-y-3">
            {CAPS.map((c, i) => {
              const open = i === active;
              return (
                <div
                  key={c.key}
                  className={cn(
                    "overflow-hidden rounded-2xl border transition-colors",
                    open ? "border-blue/40 bg-mist" : "border-line bg-white",
                  )}
                >
                  <button
                    role="tab"
                    type="button"
                    aria-selected={open}
                    aria-expanded={open}
                    aria-controls={`cap-panel-${c.key}`}
                    onClick={() => setActive(open ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
                  >
                    <span className="text-sm font-bold tracking-tight">{c.label}</span>
                    <span className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-blue">
                      {open ? "—" : "+"}
                    </span>
                  </button>
                  {open && (
                    <div id={`cap-panel-${c.key}`} className="space-y-3 px-5 pb-5">
                      <Row term="Problema" desc={c.problem} />
                      <Row term="Contexto" desc={c.context} />
                      <Row term="Relação" desc={c.relation} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ term, desc }: { term: string; desc: string }) {
  return (
    <div>
      <dt className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-blue">{term}</dt>
      <dd className="mt-1 text-sm text-navy">{desc}</dd>
    </div>
  );
}
