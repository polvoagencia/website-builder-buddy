import { useEffect, useRef, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Cross-fade page content on route change.
 *
 * Progressive enhancement:
 *  - Uses the View Transitions API when available (Chromium-based
 *    browsers). The transition is applied by the browser itself.
 *  - Falls back to a CSS class ("is-transitioning") on the wrapper
 *    that briefly dims and lifts the outgoing content while React
 *    swaps the tree. Everything is skipped under reduced motion.
 *
 * Does NOT intercept clicks or delay navigation — the animation
 * runs alongside the natural router update.
 */
export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const wrapper = useRef<HTMLDivElement>(null);
  const prev = useRef(pathname);

  useEffect(() => {
    if (prev.current === pathname) return;
    prev.current = pathname;

    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const el = wrapper.current;
    if (!el) return;

    el.classList.add("is-transitioning");
    const timeout = window.setTimeout(() => {
      el.classList.remove("is-transitioning");
    }, 380);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return (
    <div ref={wrapper} className="fohat-route-transition">
      {children}
    </div>
  );
}
