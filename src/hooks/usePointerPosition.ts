import { useEffect, useRef, type RefObject } from "react";

/**
 * Tracks pointer position relative to a container and writes it to
 * CSS custom properties (`--px`, `--py`) on that container. No React state,
 * no re-renders. Skipped on touch devices and when reduced motion is on.
 *
 * Consume in CSS like:
 *   background: radial-gradient(circle at calc(var(--px, 50) * 1%) calc(var(--py, 50) * 1%), ...);
 */
export function usePointerPosition(
  ref: RefObject<HTMLElement | null>,
  opts: { disabled?: boolean } = {},
) {
  const raf = useRef(0);
  useEffect(() => {
    if (opts.disabled) return;
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia?.("(hover: none)").matches) return;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const px = ((e.clientX - rect.left) / rect.width) * 100;
        const py = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty("--px", px.toFixed(2));
        el.style.setProperty("--py", py.toFixed(2));
      });
    };
    const onLeave = () => {
      el.style.setProperty("--px", "50");
      el.style.setProperty("--py", "50");
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf.current);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [ref, opts.disabled]);
}
