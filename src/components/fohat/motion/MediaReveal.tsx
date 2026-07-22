import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** aspect ratio in "w / h", e.g. "16 / 10". Reserves space to avoid layout shift. */
  ratio?: string;
  /** enter direction */
  from?: "bottom" | "left" | "right";
};

/**
 * Reveals a media element with a mask-clip wipe and subtle scale.
 * Uses only transform, clip-path and opacity. GPU-friendly.
 */
export function MediaReveal({ children, className, ratio, from = "bottom" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible={visible ? "true" : "false"}
      data-from={from}
      className={cn("fohat-media-reveal", className)}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {children}
    </div>
  );
}
