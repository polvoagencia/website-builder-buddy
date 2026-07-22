import { useEffect, useRef, useState, type ElementType } from "react";
import { cn } from "@/lib/utils";

type Props = {
  as?: ElementType;
  text: string;
  className?: string;
  /** stagger per line, in ms */
  stagger?: number;
  /** initial delay, ms */
  delay?: number;
};

/**
 * Reveals text by lines. Splits by whitespace-preserving line breaks in the
 * source string using `\n`. For automatic word-based reveal, pass a single
 * line and it will animate as one.
 *
 * Uses transform + clip-path (mask) for a cinematic slide-up per line.
 * Falls back to a plain reveal under reduced motion.
 */
export function TextReveal({ as: Tag = "span", text, className, stagger = 90, delay = 0 }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const lines = text.split("\n");

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
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-visible={visible ? "true" : "false"}
      className={cn("fohat-text-reveal", className)}
    >
      {lines.map((line, i) => (
        <span key={i} className="fohat-text-reveal-line">
          <span
            className="fohat-text-reveal-inner"
            style={{ transitionDelay: `${delay + i * stagger}ms` }}
          >
            {line}
            {i < lines.length - 1 ? <br /> : null}
          </span>
        </span>
      ))}
    </Tag>
  );
}
