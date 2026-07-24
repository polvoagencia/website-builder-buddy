import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollLinkedTextProps {
  text: string;
  className?: string;
  /** ScrollYProgress range within which words assemble (default [0.05, 0.65]) */
  range?: [number, number];
  /** Extra style applied to each word */
  wordStyle?: CSSProperties;
  /** Optional element to render as (default h2) */
  as?: "h1" | "h2" | "h3" | "p";
}

/**
 * Renders a phrase where each word's opacity+blur+y is driven by an
 * external scroll-progress motion value. Words assemble left-to-right,
 * top-to-bottom as the user rolls through the section.
 *
 * Use with a wrapping <section ref={...} className="relative"> whose
 * scroll progress feeds this component. Or pass externalProgress.
 */
export function ScrollLinkedText({
  text,
  className,
  range = [0.05, 0.65],
  wordStyle,
  as: Tag = "h2",
}: ScrollLinkedTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const words = text.split(/\s+/);

  return (
    <Tag ref={ref as never} className={className} style={{ display: "block" }}>
      {words.map((w, i) => (
        <Word
          key={`${w}-${i}`}
          progress={scrollYProgress}
          index={i}
          total={words.length}
          reduce={reduce}
          range={range}
          style={wordStyle}
        >
          {w}
        </Word>
      ))}
    </Tag>
  );
}

function Word({
  progress,
  index,
  total,
  reduce,
  range,
  style,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  reduce: boolean;
  range: [number, number];
  style?: CSSProperties;
  children: string;
}) {
  const [rStart, rEnd] = range;
  const span = (rEnd - rStart) / total;
  const start = rStart + span * index;
  const end = start + span * 1.6; // overlap ~40% between adjacent words

  const opacity = useTransform(progress, [start, end], [reduce ? 1 : 0.08, 1]);
  const y = useTransform(progress, [start, end], [reduce ? 0 : 14, 0]);
  const blur = useTransform(progress, [start, end], [reduce ? 0 : 6, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <>
      <motion.span
        style={{
          display: "inline-block",
          opacity: reduce ? 1 : opacity,
          y: reduce ? 0 : y,
          filter: reduce ? "none" : filter,
          willChange: "opacity, transform, filter",
          ...style,
        }}
      >
        {children}
      </motion.span>
      {" "}
    </>
  );
}
