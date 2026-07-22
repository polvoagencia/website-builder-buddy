import { useRef, useState } from "react";
import { SectionReveal } from "@/components/fohat/motion/SectionReveal";
import { PARTNERS_CAPABILITIES } from "@/data/partners-content";
import { cn } from "@/lib/utils";

type Item = (typeof PARTNERS_CAPABILITIES.items)[number];

function CapabilityPanel({
  id,
  labelledBy,
  activeItem,
  items,
  onSelectById,
}: {
  id: string;
  labelledBy: string;
  activeItem: Item;
  items: readonly Item[];
  onSelectById: (id: string) => void;
}) {
  return (
    <div
      role="tabpanel"
      id={id}
      aria-labelledby={labelledBy}
      className="rounded-3xl border border-line bg-white p-8"
    >
      <span className="fohat-mono text-[10px] uppercase tracking-[0.22em] text-blue">
        Capacidade ativa
      </span>
      <h3 className="fohat-h3 mt-3 text-navy">{activeItem.label}</h3>
      <p className="mt-4 text-base text-muted-foreground">{activeItem.desc}</p>
      <div className="mt-6 border-t border-line pt-6">
        <div className="fohat-mono text-[10px] uppercase tracking-[0.2em] text-steel">
          Conecta-se com
        </div>
        <ul className="mt-3 flex flex-wrap gap-2">
          {activeItem.links.map((linkId) => {
            const linked = items.find((x) => x.id === linkId);
            if (!linked) return null;
            return (
              <li key={linkId}>
                <button
                  type="button"
                  onClick={() => onSelectById(linkId)}
                  className="rounded-full border border-line px-3 py-1 text-xs text-navy transition-colors hover:border-blue/60 hover:bg-mist"
                >
                  {linked.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function PartnershipCapabilities() {
  const { eyebrow, title, intro, items } = PARTNERS_CAPABILITIES;
  const [active, setActive] = useState(0);
  const safe = Math.min(Math.max(active, 0), items.length - 1);
  const activeItem = items[safe];
  const desktopTabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const mobileTabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const makeOnKey =
    (refs: React.MutableRefObject<Array<HTMLButtonElement | null>>) =>
    (e: React.KeyboardEvent, i: number) => {
      const keys: Record<string, number> = {
        ArrowRight: i + 1,
        ArrowDown: i + 1,
        ArrowLeft: i - 1,
        ArrowUp: i - 1,
        Home: 0,
        End: items.length - 1,
      };
      if (e.key in keys) {
        e.preventDefault();
        const next = (keys[e.key] + items.length) % items.length;
        setActive(next);
        refs.current[next]?.focus();
      }
    };

  const onKeyDesktop = makeOnKey(desktopTabRefs);
  const onKeyMobile = makeOnKey(mobileTabRefs);

  const selectById = (id: string) => {
    const idx = items.findIndex((x) => x.id === id);
    if (idx >= 0) setActive(idx);
  };

  const radius = 160;
  const positions = items.map((_, i) => {
    const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, angle };
  });

  return (
    <section id="capacidades" className="bg-mist py-20 lg:py-28">
      <div className="fohat-shell">
        <SectionReveal className="max-w-3xl">
          <span className="fohat-eyebrow text-blue">{eyebrow}</span>
          <h2 className="fohat-h2 mt-4 text-navy">{title}</h2>
          <p className="mt-5 text-lg text-muted-foreground">{intro}</p>
        </SectionReveal>

        <SectionReveal className="mt-14" delay={100}>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            {/* Desktop network */}
            <div
              className="relative hidden lg:block"
              role="tablist"
              aria-label="Capacidades de parceria"
              aria-orientation="horizontal"
            >
              <div className="relative mx-auto aspect-square w-full max-w-[440px]">
                <svg
                  viewBox="-220 -220 440 440"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden
                >
                  {items.map((it, i) =>
                    it.links.map((linkId) => {
                      const j = items.findIndex((x) => x.id === linkId);
                      if (j < 0) return null;
                      const a = positions[i];
                      const b = positions[j];
                      const isRelated = i === safe || j === safe;
                      return (
                        <line
                          key={`${i}-${linkId}`}
                          x1={a.x}
                          y1={a.y}
                          x2={b.x}
                          y2={b.y}
                          stroke="oklch(0.55 0.14 245)"
                          strokeOpacity={isRelated ? 0.6 : 0.15}
                          strokeWidth={isRelated ? 1.4 : 1}
                        />
                      );
                    }),
                  )}
                  <circle cx="0" cy="0" r="52" fill="oklch(0.22 0.023 250)" />
                  <text
                    x="0"
                    y="-4"
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="ui-monospace, SFMono-Regular, monospace"
                    fill="oklch(0.85 0.05 200)"
                    style={{ letterSpacing: "0.16em", textTransform: "uppercase" }}
                  >
                    Projeto
                  </text>
                  <text
                    x="0"
                    y="12"
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="ui-monospace, SFMono-Regular, monospace"
                    fill="oklch(0.85 0.05 200)"
                    style={{ letterSpacing: "0.16em", textTransform: "uppercase" }}
                  >
                    executável
                  </text>
                </svg>
                <div className="absolute inset-0">
                  {items.map((it, i) => {
                    const pos = positions[i];
                    const isActive = i === safe;
                    const isRelated = activeItem.links.includes(it.id);
                    return (
                      <button
                        key={it.id}
                        ref={(el) => {
                          desktopTabRefs.current[i] = el;
                        }}
                        type="button"
                        role="tab"
                        id={`cap-tab-${it.id}`}
                        aria-selected={isActive}
                        aria-controls="cap-panel-desktop"
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => setActive(i)}
                        onKeyDown={(e) => onKeyDesktop(e, i)}
                        style={{
                          left: `calc(50% + ${pos.x}px)`,
                          top: `calc(50% + ${pos.y}px)`,
                        }}
                        className={cn(
                          "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-mist",
                          isActive
                            ? "border-navy bg-navy text-white shadow-[0_10px_30px_oklch(0_0_0_/_0.18)]"
                            : isRelated
                              ? "border-blue/60 bg-white text-navy"
                              : "border-line bg-white text-navy/70 hover:border-blue/50",
                        )}
                      >
                        {it.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Desktop panel */}
            <div className="hidden lg:block">
              <CapabilityPanel
                id="cap-panel-desktop"
                labelledBy={`cap-tab-${activeItem.id}`}
                activeItem={activeItem}
                items={items}
                onSelectById={selectById}
              />
            </div>

            {/* Mobile tabs + panel */}
            <div className="lg:hidden">
              <div role="tablist" aria-orientation="vertical" aria-label="Capacidades de parceria">
                <ul className="grid gap-2 sm:grid-cols-2">
                  {items.map((it, i) => {
                    const isActive = i === safe;
                    return (
                      <li key={it.id}>
                        <button
                          ref={(el) => {
                            mobileTabRefs.current[i] = el;
                          }}
                          type="button"
                          role="tab"
                          id={`cap-tab-m-${it.id}`}
                          aria-selected={isActive}
                          aria-controls="cap-panel-mobile"
                          tabIndex={isActive ? 0 : -1}
                          onClick={() => setActive(i)}
                          onKeyDown={(e) => onKeyMobile(e, i)}
                          className={cn(
                            "w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-colors",
                            isActive
                              ? "border-navy bg-navy text-white"
                              : "border-line bg-white text-navy",
                          )}
                        >
                          {it.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mt-4">
                <CapabilityPanel
                  id="cap-panel-mobile"
                  labelledBy={`cap-tab-m-${activeItem.id}`}
                  activeItem={activeItem}
                  items={items}
                  onSelectById={selectById}
                />
              </div>
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-sm text-muted-foreground">
            Nem todo projeto utiliza todas as capacidades. A combinação é desenhada conforme o
            conceito, o escopo, o prazo e as condições de operação.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
