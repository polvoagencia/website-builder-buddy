import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type Chapter = {
  /** anchor id present on the page (without #) */
  id: string;
  label: string;
};

type Props = {
  chapters?: Chapter[];
  /** page or section title shown in the compact top indicator */
  contextLabel?: string;
  className?: string;
};

/**
 * Contextual scroll progress indicator.
 *
 * Two surfaces, one shared listener:
 *  1. A thin top rail (gradient) that always shows page progress.
 *  2. A vertical rail on the right (desktop only) listing chapters,
 *     highlighting the current section and offering click-to-scroll.
 *
 * Falls back gracefully when no chapters are provided or when the
 * viewport is narrow — only the top rail renders.
 *
 * Respects prefers-reduced-motion: no smooth-scroll override, no
 * animated fills; the current section is simply marked.
 */
export function ProgressRail({ chapters, contextLabel, className }: Props) {
  const fillRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(
    chapters?.[0]?.id ?? null,
  );

  // Page progress + active section (single rAF loop)
  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    const items =
      chapters
        ?.map((c) => ({ id: c.id, el: document.getElementById(c.id) }))
        .filter((c): c is { id: string; el: HTMLElement } => !!c.el) ?? [];

    const tick = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0;
      setProgress(p);
      if (fillRef.current) {
        fillRef.current.style.setProperty("--fohat-progress", String(p));
      }

      if (items.length) {
        // active section = last section whose top is above 40% of viewport
        const trigger = window.innerHeight * 0.4;
        let current = items[0].id;
        for (const it of items) {
          const rect = it.el.getBoundingClientRect();
          if (rect.top <= trigger) current = it.id;
        }
        setActiveId((prev) => (prev === current ? prev : current));
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [chapters]);

  return (
    <>
      {/* Top rail — always visible */}
      <div className="fohat-progress" aria-hidden>
        <div ref={fillRef} className="fohat-progress-fill" />
      </div>

      {chapters && chapters.length > 0 && (
        <nav
          aria-label="Capítulos da página"
          className={cn(
            "pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block",
            className,
          )}
        >
          <div className="pointer-events-auto flex flex-col items-end gap-3 rounded-full border border-line/60 bg-mist/70 px-3 py-4 backdrop-blur-md shadow-[0_10px_40px_oklch(0.22_0.023_250_/_0.08)]">
            {contextLabel && (
              <div className="fohat-mono text-[9px] uppercase tracking-[0.24em] text-steel">
                {contextLabel}
              </div>
            )}
            <ul className="flex flex-col items-end gap-2">
              {chapters.map((c, i) => {
                const active = c.id === activeId;
                return (
                  <li key={c.id}>
                    <a
                      href={`#${c.id}`}
                      className="group flex items-center gap-2"
                      aria-current={active ? "true" : undefined}
                    >
                      <span
                        className={cn(
                          "fohat-mono text-[10px] uppercase tracking-[0.18em] transition-all",
                          active
                            ? "text-navy"
                            : "text-steel opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")} · {c.label}
                      </span>
                      <span
                        className={cn(
                          "block h-[2px] rounded-full bg-navy transition-all",
                          active ? "w-6 opacity-100" : "w-3 opacity-40 group-hover:opacity-80",
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="fohat-mono text-[9px] tabular-nums text-steel">
              {Math.round(progress * 100)}%
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
