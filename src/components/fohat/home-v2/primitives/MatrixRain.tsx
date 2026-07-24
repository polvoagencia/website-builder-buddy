import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Ambient "code rain" canvas — falling glyphs + occasional connecting
 * lines that suggest something being built. Sits behind the hero content
 * with low opacity and mask fade so it never fights the headline.
 *
 * Fully skipped under prefers-reduced-motion (renders nothing).
 */
export function MatrixRain({
  className,
  color = "oklch(0.85 0.11 220)",
  density = 1,
}: {
  className?: string;
  color?: string;
  density?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (reduce) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let cols = 0;
    const fontSize = 14;
    let drops: number[] = [];
    const chars =
      "01{}<>/*[]=+-#$アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEF0123456789";

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor((width / fontSize) * density);
      drops = new Array(cols)
        .fill(0)
        .map(() => Math.random() * (height / fontSize));
    };

    setup();
    const onResize = () => setup();
    window.addEventListener("resize", onResize);

    const step = () => {
      // trail — semi-transparent navy paint each frame
      ctx.fillStyle = "oklch(0.19 0.03 250 / 0.09)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      for (let i = 0; i < cols; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = (i * width) / cols;
        const y = drops[i] * fontSize;
        // head — brighter cyan
        ctx.fillStyle = Math.random() > 0.975 ? "#ffffff" : color;
        ctx.globalAlpha = 0.55;
        ctx.fillText(text, x, y);
        ctx.globalAlpha = 1;

        if (y > height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [reduce, color, density]);

  if (reduce) return null;

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className}
      style={{
        maskImage:
          "radial-gradient(ellipse at 50% 45%, black 20%, transparent 78%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at 50% 45%, black 20%, transparent 78%)",
      }}
    />
  );
}
