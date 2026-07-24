import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface Chapter {
  id: string;
  label: string;
}

interface ChapterDotsProps {
  chapters: Chapter[];
}

/**
 * Fixed right-side "chapter dots" navigation.
 * Uses IntersectionObserver to track which section is dominantly visible,
 * fades in only after the user scrolls past the hero, and lets the user
 * click a dot to smooth-scroll to that section.
 */
export function ChapterDots({ chapters }: ChapterDotsProps) {
  const [activeId, setActiveId] = useState<string>(chapters[0]?.id ?? "");
  const [visible, setVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the vertical center of the viewport.
        let bestId = activeId;
        let bestRatio = 0;
        for (const e of entries) {
          if (e.intersectionRatio > bestRatio) {
            bestRatio = e.intersectionRatio;
            bestId = e.target.id;
          }
        }
        if (bestRatio > 0) setActiveId(bestId);
      },
      { threshold: [0.2, 0.4, 0.6, 0.8], rootMargin: "-20% 0px -20% 0px" },
    );
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [chapters, activeId]);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      aria-label="Capítulos"
      className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 12 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <ul className="pointer-events-auto flex flex-col gap-3">
        {chapters.map((c) => {
          const isActive = c.id === activeId;
          const isHovered = c.id === hoveredId;
          return (
            <li key={c.id} className="relative flex items-center justify-end gap-3">
              <AnimatePresence>
                {(isActive || isHovered) && (
                  <motion.span
                    key="label"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="fohat-mono rounded-full border border-navy/10 bg-white/85 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-navy shadow-sm backdrop-blur"
                  >
                    {c.label}
                  </motion.span>
                )}
              </AnimatePresence>
              <button
                type="button"
                aria-label={`Ir para ${c.label}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => goTo(c.id)}
                onMouseEnter={() => setHoveredId(c.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(c.id)}
                onBlur={() => setHoveredId(null)}
                className={cn(
                  "relative grid h-3 w-3 place-items-center rounded-full transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-mist",
                  isActive ? "scale-100" : "scale-90 hover:scale-100",
                )}
              >
                <span
                  className={cn(
                    "block h-2 w-2 rounded-full transition-all",
                    isActive
                      ? "bg-navy shadow-[0_0_0_4px_oklch(0.85_0.11_220_/_0.28)]"
                      : "bg-navy/30",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
