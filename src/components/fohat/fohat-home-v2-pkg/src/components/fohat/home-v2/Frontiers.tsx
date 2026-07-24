import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

import { SERVICES } from "@/data/fohat-services";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Chapter 3 — The Three Frontiers, told as one continuous scene.
 *
 * A tall wrapper (~340vh) contains a single 100vh sticky stage. As the
 * user scrolls, one motion value (progress) drives everything on stage:
 *   - the big index number swaps (01 → 02 → 03)
 *   - the title, description and possibility chips slide/fade
 *   - the CTA text and destination update
 *   - the ambient scene shifts hue and rotates a large ring
 *   - the horizontal progress rail fills
 *
 * There is no crossfade of separate scenes — it is one composition being
 * transformed. This is what gives the section its Apple-launch feel: a
 * pinned "chapter" with staged reveals synchronized to scroll.
 *
 * On mobile (<lg) we fall back to a clean sequential list because pinning
 * a full-viewport stage on small screens fights the operating system.
 */
export function Frontiers() {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const total = SERVICES.length;

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  // Discrete "active" index derived from progress, quantized to 0..total-1.
  // Each front owns a 1/total slice of the progress range.
  const activeIndex = useTransform(scrollYProgress, (p) => {
    const clamped = Math.min(0.999, Math.max(0, p));
    return Math.min(total - 1, Math.floor(clamped * total));
  });

  // Ambient hue shift — visualizes progress even during transition zones.
  const hueShift = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <>
      <SectionHeader />

      {/* DESKTOP — pinned scroll stage */}
      <section
        id="frentes"
        className="relative hidden bg-navy text-white lg:block"
      >
        <div
          ref={stageRef}
          className="relative"
          style={{ height: `${total * 120}vh` }}
        >
          <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
            <StageBackground
              progress={scrollYProgress}
              hueShift={hueShift}
              ringRotate={ringRotate}
              reduce={reduce}
            />

            <div className="fohat-shell relative z-10 grid w-full grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-16">
              <BigIndex progress={scrollYProgress} activeIndex={activeIndex} total={total} reduce={reduce} />
              <FrontPanel
                progress={scrollYProgress}
                total={total}
                reduce={reduce}
              />
            </div>

            <ProgressRail progress={scrollYProgress} total={total} />
          </div>
        </div>
      </section>

      {/* MOBILE — clean sequential fallback */}
      <MobileFrontiers />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                             */
/* ------------------------------------------------------------------ */

function SectionHeader() {
  return (
    <section className="bg-navy pb-24 pt-24 text-white lg:pt-32">
      <div className="fohat-shell">
        <div className="max-w-[860px]">
          <span className="fohat-eyebrow" style={{ color: "var(--color-cyan)" }}>
            Como podemos atuar
          </span>
          <h2 className="fohat-h2 mt-5 text-white">
            Três frentes. Uma engenharia.
          </h2>
          <p className="fohat-lead mt-6 text-white/60">
            A FOHAT pode ser contratada por qualquer uma destas frentes —
            separadamente ou combinadas dentro de um mesmo projeto.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Stage background                                                   */
/* ------------------------------------------------------------------ */

function StageBackground({
  progress,
  hueShift,
  ringRotate,
  reduce,
}: {
  progress: MotionValue<number>;
  hueShift: MotionValue<number>;
  ringRotate: MotionValue<number>;
  reduce: boolean;
}) {
  // Slowly shift the glow color from blue → cyan through progress.
  const glowFilter = useTransform(hueShift, (h) => `hue-rotate(${h}deg)`);
  const glowScale = useTransform(progress, [0, 1], [1, 1.25]);
  const gridOpacity = useTransform(progress, [0, 0.5, 1], [0.05, 0.1, 0.05]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-[15%] top-[8%] h-[80%] w-[80%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.46 0.09 253 / 0.55), transparent 60%)",
          filter: reduce ? undefined : glowFilter,
          scale: reduce ? 1 : glowScale,
        }}
      />
      <motion.div
        className="absolute -right-[10%] bottom-[8%] h-[70%] w-[70%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.85 0.11 220 / 0.4), transparent 65%)",
          filter: reduce ? undefined : glowFilter,
          scale: reduce ? 1 : glowScale,
        }}
      />
      {/* Rotating ring — the "engine" behind the composition */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[110vmin] w-[110vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/12"
        style={{ rotate: reduce ? 0 : ringRotate }}
      >
        <div
          className="absolute inset-6 rounded-full border border-cyan/8"
          style={{
            borderStyle: "dashed",
          }}
        />
        <div
          className="absolute inset-16 rounded-full border border-white/5"
        />
      </motion.div>
      {/* Blueprint grid mask */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: reduce ? 0.07 : gridOpacity,
          backgroundImage:
            "linear-gradient(oklch(0.85 0.055 245) 1px, transparent 1px), linear-gradient(90deg, oklch(0.85 0.055 245) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Big animated index on the left                                     */
/* ------------------------------------------------------------------ */

function BigIndex({
  progress,
  activeIndex,
  total,
  reduce,
}: {
  progress: MotionValue<number>;
  activeIndex: MotionValue<number>;
  total: number;
  reduce: boolean;
}) {
  return (
    <div className="relative flex flex-col items-start gap-6 select-none">
      <span
        className="fohat-mono text-[10px] uppercase tracking-[0.28em]"
        style={{ color: "var(--color-cyan)" }}
      >
        Frente
      </span>

      <div className="relative h-[16vw] w-full max-w-[380px] overflow-hidden">
        {SERVICES.map((_, i) => (
          <StageNumber
            key={i}
            index={i}
            total={total}
            progress={progress}
            reduce={reduce}
          />
        ))}
      </div>

      <div className="fohat-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/40">
        <span>Índice</span>
        <IndexReadout active={activeIndex} total={total} />
      </div>
    </div>
  );
}

/**
 * A giant numeral that fades and slides based on where the whole
 * section's scroll progress is relative to its own 1/total slice.
 * Uses smooth interpolation so transitions between numerals are
 * continuous (not stepped like quantized index would produce).
 */
function StageNumber({
  index,
  total,
  progress,
  reduce,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const enterMid = start + (end - start) * 0.15;
  const exitMid = start + (end - start) * 0.85;
  // Input ranges must stay inside [0, 1] because motion's WAAPI backend
  // rejects offsets outside that domain.
  const inStart = Math.max(0, start);
  const inEnd = Math.min(1, end);

  const opacity = useTransform(
    progress,
    [inStart, enterMid, exitMid, inEnd],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [inStart, enterMid, exitMid, inEnd],
    ["25%", "0%", "0%", "-25%"],
  );

  return (
    <motion.span
      aria-hidden
      style={{
        opacity: reduce ? (index === 0 ? 1 : 0) : opacity,
        y: reduce ? "0%" : y,
      }}
      className="absolute inset-0 block font-bold leading-[0.8] text-white/95"
    >
      <span
        style={{
          fontSize: "clamp(9rem, 16vw, 15rem)",
          letterSpacing: "-0.06em",
          lineHeight: 0.8,
          backgroundImage:
            "linear-gradient(180deg, oklch(0.98 0 0) 0%, oklch(0.85 0.055 245) 60%, oklch(0.55 0.09 240 / 0.6) 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          display: "block",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.span>
  );
}

function IndexReadout({
  active,
  total,
}: {
  active: MotionValue<number>;
  total: number;
}) {
  const display = useTransform(
    active,
    (a) => `${String(a + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
  );
  return <motion.span>{display}</motion.span>;
}

/* ------------------------------------------------------------------ */
/* Panel on the right                                                 */
/* ------------------------------------------------------------------ */

function FrontPanel({
  progress,
  total,
  reduce,
}: {
  progress: MotionValue<number>;
  total: number;
  reduce: boolean;
}) {
  return (
    <div className="relative min-h-[60vh]">
      {SERVICES.map((s, i) => (
        <FrontContent
          key={s.slug}
          service={s}
          index={i}
          total={total}
          progress={progress}
          reduce={reduce}
        />
      ))}
    </div>
  );
}

function FrontContent({
  service,
  index,
  total,
  progress,
  reduce,
}: {
  service: (typeof SERVICES)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const enter = start + (end - start) * 0.15;
  const exit = start + (end - start) * 0.85;

  const opacity = useTransform(
    progress,
    [start, enter, exit, end],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [start, enter, exit, end],
    [24, 0, 0, -24],
  );
  // Pointer events must be a string, not a MotionValue<boolean>.
  const pointerEvents = useTransform(progress, (p) =>
    p >= start && p < end ? "auto" : "none",
  );

  return (
    <motion.article
      style={{
        opacity: reduce ? (index === 0 ? 1 : 0) : opacity,
        y: reduce ? 0 : y,
        pointerEvents: reduce
          ? index === 0
            ? "auto"
            : "none"
          : (pointerEvents as unknown as "auto" | "none"),
      }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <span
        className="fohat-mono text-[11px] uppercase tracking-[0.28em]"
        style={{ color: "var(--color-cyan)" }}
      >
        {service.eyebrow}
      </span>

      <h3
        className="mt-4 font-bold text-white"
        style={{
          fontSize: "clamp(2.25rem, 4.4vw, 4rem)",
          letterSpacing: "-0.045em",
          lineHeight: 1.02,
        }}
      >
        {service.title}
      </h3>

      <p className="mt-6 max-w-[560px] text-lg text-white/60 lg:text-xl">
        {service.lead}
      </p>

      <ul className="mt-8 flex flex-wrap gap-2">
        {service.possibilities.map((p) => (
          <li
            key={p}
            className="fohat-mono rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/75 backdrop-blur-sm"
          >
            {p}
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <Link
          to={service.cta.to}
          hash={service.cta.hash}
          className="group inline-flex h-13 items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-6 py-3 text-sm font-bold text-cyan transition-colors hover:bg-cyan/20"
        >
          {service.cta.label}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Progress rail                                                      */
/* ------------------------------------------------------------------ */

function ProgressRail({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  return (
    <div className="absolute inset-x-0 bottom-10 z-10">
      <div className="fohat-shell">
        <div className="relative h-px w-full bg-white/10">
          <motion.div
            className="absolute inset-y-0 left-0 origin-left bg-cyan"
            style={{
              scaleX: progress,
              boxShadow: "0 0 12px oklch(0.85 0.11 220 / 0.7)",
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 -top-1 flex justify-between">
            {Array.from({ length: total + 1 }).map((_, i) => (
              <span
                key={i}
                className="block h-2 w-px bg-white/20"
                aria-hidden
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile version                                                     */
/* ------------------------------------------------------------------ */

function MobileFrontiers() {
  return (
    <section className="bg-navy pb-20 text-white lg:hidden">
      <div className="fohat-shell space-y-8">
        {SERVICES.map((s, i) => (
          <motion.article
            key={s.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm"
          >
            <div className="flex items-baseline justify-between">
              <span
                className="fohat-mono text-[10px] uppercase tracking-[0.24em]"
                style={{ color: "var(--color-cyan)" }}
              >
                Frente {String(i + 1).padStart(2, "0")} · {s.eyebrow}
              </span>
              <span
                className="font-bold leading-none text-white/15"
                style={{ fontSize: "3rem", letterSpacing: "-0.05em" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-white">
              {s.title}
            </h3>
            <p className="mt-3 text-base text-white/60">{s.lead}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {s.possibilities.map((p) => (
                <li
                  key={p}
                  className="fohat-mono rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white/70"
                >
                  {p}
                </li>
              ))}
            </ul>

            <Link
              to={s.cta.to}
              hash={s.cta.hash}
              className="group mt-6 inline-flex h-11 items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-5 text-sm font-bold text-cyan transition-colors hover:bg-cyan/20"
            >
              {s.cta.label}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
