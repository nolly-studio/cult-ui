"use client"

import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

// const shapeSvgClass = "w-full fill-background/35 text-foreground/15";
const shapeSvgClass = "w-full  text-foreground/70 stroke-2"

const flipClasses = {
  none: "",
  /** Center origin keeps flips inside the viewBox; edge origins mirror the path out of shape. */
  vertical: "origin-center -scale-y-100",
  horizontal: "origin-center -scale-x-100",
  both: "origin-center -scale-x-100 -scale-y-100",
} as const

export type ShapeShapeFlip = keyof typeof flipClasses

export interface ShapeSvgProps {
  className?: string
  flip?: ShapeShapeFlip
}

function frameSvgClassName(
  flip: ShapeShapeFlip | undefined,
  className: string | undefined
) {
  return cn(shapeSvgClass, flip ? flipClasses[flip] : null, className)
}

/** Line-art frames: no fill tint (stroke-only reads correctly). */
function lineArtShapeSvgClassName(
  flip: ShapeShapeFlip | undefined,
  className: string | undefined
) {
  return cn(
    "w-full fill-none text-foreground/70 stroke-2",
    flip ? flipClasses[flip] : null,
    className
  )
}

const SACRED_DRAW_EASE = [0.22, 1, 0.36, 1] as const

/** When ~25% of each stroked shape intersects the viewport, draw runs once (re-run if remounted). */
const SACRED_IN_VIEW = { amount: 0.25, once: true } as const

function sacredStrokeTransition(
  reduceMotion: boolean | null,
  staggerIndex: number,
  duration = 0.72
) {
  if (reduceMotion) {
    return { pathLength: { duration: 0 } as const }
  }
  return {
    pathLength: {
      duration,
      delay: staggerIndex * 0.009,
      ease: SACRED_DRAW_EASE,
    },
  }
}

function strokeDrawProps(
  reduceMotion: boolean | null,
  staggerIndex: number,
  duration = 0.72
) {
  return {
    initial: { pathLength: reduceMotion ? 1 : 0 } as const,
    transition: sacredStrokeTransition(reduceMotion, staggerIndex, duration),
    viewport: SACRED_IN_VIEW,
    whileInView: { pathLength: 1 } as const,
  }
}

export interface CrosshairReticleSvgProps extends ShapeSvgProps {
  /** When true, draws the 50px-radius center ring. Default true. */
  showCenterCircle?: boolean
}

/* ------------------------------------------------------------------ */
/*  BASIC GEOMETRY                                                  */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  FUNDAMENTAL POLYGONS                                              */
/* ------------------------------------------------------------------ */

/**
 * Shape: equilateral triangle — point at top center, flat base.
 */
export function TriangleShapeSvg({ className, flip = "none" }: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Equilateral triangle shape</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d="M1200 2L2398 998H2Z"
        stroke="currentColor"
      />
    </svg>
  )
}

/**
 * Shape: circle.
 */
export function CircleShapeSvg({ className, flip = "none" }: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Circular shape</title>
      <motion.circle
        {...strokeDrawProps(reduceMotion, 0)}
        cx={1200}
        cy={500}
        r={498}
        stroke="currentColor"
      />
    </svg>
  )
}

/**
 * Shape: horizontal ellipse / oval.
 */
export function EllipseShapeSvg({ className, flip = "none" }: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 800"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Horizontal ellipse shape</title>
      <motion.ellipse
        {...strokeDrawProps(reduceMotion, 0)}
        cx={1200}
        cy={400}
        rx={1000}
        ry={398}
        stroke="currentColor"
      />
    </svg>
  )
}

/**
 * Panel: semicircle / D-shape — flat left side, arc on the right. Flip horizontally for the opposite.
 */
export function SemicircleShapeSvg({
  className,
  flip = "none",
}: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Semicircle D-shape with flat left edge</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d="M1 2H1200A498 498 0 0 1 1200 998H1Z"
        stroke="currentColor"
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  TRIANGLE VARIANTS                                                 */
/* ------------------------------------------------------------------ */

/**
 * Shape: right triangle — right angle at bottom-left, hypotenuse from top-left to bottom-right.
 */
export function RightTriangleShapeSvg({
  className,
  flip = "none",
}: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Right triangle shape</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d="M2 2L2398 998H2Z"
        stroke="currentColor"
      />
    </svg>
  )
}

/**
 * Shape: kite — diamond variant, taller above center than below.
 * Top vertex at y=2, bottom at y=750, left/right at y=350.
 */
export function KiteShapeSvg({ className, flip = "none" }: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Kite shape</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d="M1200 2L1700 400L1200 998L700 400Z"
        stroke="currentColor"
      />
    </svg>
  )
}

/**
 * Shape: pennant / tapered flag — rectangle on the left that tapers to a point on the right.
 */
export function PennantShapeSvg({ className, flip = "none" }: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Pennant flag shape tapering to a point</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d="M1 1H1800L2399 300L1800 599H1Z"
        stroke="currentColor"
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  ROUNDED VARIANTS                                                  */
/* ------------------------------------------------------------------ */

/**
 * Shape: rounded square — uniform large corner radius (rx=80).
 */
export function RoundedSquareShapeSvg({
  className,
  flip = "none",
}: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 900"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Rounded square shape</title>
      <motion.rect
        {...strokeDrawProps(reduceMotion, 0)}
        fill="none"
        height={898}
        rx={80}
        stroke="currentColor"
        width={2398}
        x={1}
        y={1}
      />
    </svg>
  )
}

/**
 * Shape: rounded triangle — equilateral triangle with heavily rounded corners (~60px radius beziers).
 */
export function RoundedTriangleShapeSvg({
  className,
  flip = "none",
}: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()
  // Equilateral triangle vertices: top center, bottom-left, bottom-right
  // With corner softening via cubic beziers (radius ~80px)
  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Rounded triangle shape</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d="M1200 42
         C1210 22 1220 12 1240 32
         L2340 940
         C2360 970 2355 988 2330 988
         H70
         C45 988 40 970 60 940
         L1160 32
         C1180 12 1190 22 1200 42Z"
        stroke="currentColor"
      />
    </svg>
  )
}

/**
 * Shape: squircle / superellipse — the iOS icon shape, between a circle and a rounded square.
 * Uses cubic beziers to approximate a superellipse (n≈4).
 */
export function SquircleShapeSvg({ className, flip = "none" }: ShapeSvgProps) {
  // Centered at 1200,450 with ~440px half-width and ~440px half-height
  // Superellipse approximation: control points at ~85% of the half-dimension
  const cx = 1200
  const cy = 450
  const hw = 440 // half width
  const hh = 440 // half height
  const k = 0.85 // control point ratio (higher = more square)

  const t = cy - hh
  const b = cy + hh
  const l = cx - hw
  const r = cx + hw
  const kw = hw * k
  const kh = hh * k
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 900"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Squircle superellipse shape</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d={`M${cx} ${t}
            C${cx + kw} ${t} ${r} ${cy - kh} ${r} ${cy}
            C${r} ${cy + kh} ${cx + kw} ${b} ${cx} ${b}
            C${cx - kw} ${b} ${l} ${cy + kh} ${l} ${cy}
            C${l} ${cy - kh} ${cx - kw} ${t} ${cx} ${t}Z`}
        stroke="currentColor"
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  ARCHITECTURAL                                                     */
/* ------------------------------------------------------------------ */

/**
 * Panel: gothic / pointed arch — rectangular body with a pointed arch top (two curved sides meeting at a peak).
 */
export function GothicArchPanelSvg({
  className,
  flip = "none",
}: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Gothic pointed arch panel</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d="M1 1199V500
         C1 200 600 2 1200 2
         C1800 2 2399 200 2399 500
         V1199H1Z"
        stroke="currentColor"
      />
    </svg>
  )
}

/**
 * Shape: quarter circle / fan — a 90° wedge anchored at bottom-left corner.
 */
export function QuarterCircleShapeSvg({
  className,
  flip = "none",
}: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Quarter circle fan wedge</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d="M2 998V2A996 996 0 0 1 998 998Z"
        stroke="currentColor"
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  COMPOUND                                                          */
/* ------------------------------------------------------------------ */

/**
 * Shape: arrow / pentagon — flat left edge, pointed right edge. Like a flowchart arrow block.
 */
export function ArrowPentagonShapeSvg({
  className,
  flip = "none",
}: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Arrow pentagon shape</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d="M1 1H2000L2399 300L2000 599H1Z"
        stroke="currentColor"
      />
    </svg>
  )
}

/**
 * Shape: diamond / rhombus — all four sides diagonal, vertices at edge midpoints.
 */
export function DiamondShapeSvg({ className, flip = "none" }: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Diamond rhombus shape</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d="M1200 2L2398 500L1200 998L2 500Z"
        stroke="currentColor"
      />
    </svg>
  )
}

/**
 * Shape: trapezoid — wider at base, narrower at top. Symmetric inset of 300px per side.
 */
export function TrapezoidShapeSvg({ className, flip = "none" }: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 900"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Trapezoid shape wider at base</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d="M1 899H2399L2099 1H301Z"
        stroke="currentColor"
      />
    </svg>
  )
}

/**
 * Shape: regular octagon — all eight corners clipped equally (200px legs).
 */
export function OctagonShapeSvg({ className, flip = "none" }: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Octagonal shape</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d="M201 2H2199L2398 201V799L2199 998H201L2 799V201Z"
        stroke="currentColor"
      />
    </svg>
  )
}

/**
 * Shape: parallelogram — sheared rectangle, offset 200px at top.
 */
export function ParallelogramShapeSvg({
  className,
  flip = "none",
}: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 800"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Parallelogram shape with softened corners</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d="M1 799L195 7C197 4 199 2 203 2H2393C2396 2 2398 4 2399 7L2205 793C2203 796 2201 799 2197 799H7C4 799 2 797 1 793Z"
        stroke="currentColor"
      />
    </svg>
  )
}

/**
 * Panel: ribbon / banner — flat top and bottom with inward V-notches on both short ends (100px depth).
 */
export function RibbonBannerShapeSvg({
  className,
  flip = "none",
}: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Ribbon banner with softened end notches</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d="M1 1H2399L2294 194C2292 197 2292 200 2292 200C2292 200 2292 203 2294 206L2399 399H1L106 206C108 203 108 200 108 200C108 200 108 197 106 194L1 1Z"
        stroke="currentColor"
      />
    </svg>
  )
}

/**
 * Panel: hourglass / bowtie — full width at top and bottom, pinched waist at center (800px wide).
 */
export function HourglassBowtiePanelSvg({
  className,
  flip = "none",
}: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Hourglass panel with softened waist</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d="M1 1H2399L1606 494C1603 497 1601 500 1603 503L2399 999H1L797 503C800 500 798 497 797 494L1 1Z"
        stroke="currentColor"
      />
    </svg>
  )
}

/**
 * Panel: scalloped top — twelve semicircular bumps along the top edge (r=100), flat bottom.
 */
export function ScallopedTopPanelSvg({
  className,
  flip = "none",
}: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 900"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Rectangular panel with scalloped top edge</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d="M1 899V101A100 100 0 0 1 200 101A100 100 0 0 1 400 101A100 100 0 0 1 600 101A100 100 0 0 1 800 101A100 100 0 0 1 1000 101A100 100 0 0 1 1200 101A100 100 0 0 1 1400 101A100 100 0 0 1 1600 101A100 100 0 0 1 1800 101A100 100 0 0 1 2000 101A100 100 0 0 1 2200 101A100 100 0 0 1 2399 101V899H1Z"
        stroke="currentColor"
      />
    </svg>
  )
}

/**
 * Shape: rounded rectangle with a large concave quarter-circle bite at the bottom-right (badge cutout).
 */
export function RoundedRectCornerBiteShapeSvg({
  className,
  flip = "none",
}: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 900"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Rounded rectangle with bottom-right circular bite</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d="M31 1H2369C2386 1 2399 14 2399 31V699A200 200 0 0 0 2199 899H31C14 899 1 886 1 869V31C1 14 14 1 31 1Z"
        stroke="currentColor"
      />
    </svg>
  )
}

/**
 * Shape: HUD-style outer rectangle with twin softened V-notches on the top and stepped side walls.
 */
export function DoubleNotchTechShapeSvg({
  className,
  flip = "none",
}: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Tech shape with double top notches and side steps</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d="M6 1H556C558 1 560 2 561 4L596 46C598 49 602 49 604 46L639 4C640 2 642 1 644 1H1756C1758 1 1760 2 1761 4L1796 46C1798 49 1802 49 1804 46L1839 4C1840 2 1842 1 1844 1H2394C2397 1 2399 3 2399 6V244C2399 247 2397 250 2394 250H2366C2363 250 2361 252 2361 255V745C2361 748 2363 750 2366 750H2394C2397 750 2399 752 2399 756V994C2399 997 2397 999 2394 999H6C3 999 1 997 1 994V756C1 752 3 750 6 750H34C37 750 39 748 39 745V255C39 252 37 250 34 250H6C3 250 1 247 1 244V6C1 3 3 1 6 1Z"
        stroke="currentColor"
      />
    </svg>
  )
}

/**
 * Panel: ogee / onion dome — rectangular body plus mirrored S-curved arch to a top peak.
 */
export function OgeeOnionDomePanelSvg({
  className,
  flip = "none",
}: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Ogee arch panel with pointed crest</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d="M1 1199V400C1 280 300 180 600 80C900 -20 1100 2 1200 2C1300 2 1500 -20 1800 80C2100 180 2399 280 2399 400V1199H1Z"
        stroke="currentColor"
      />
    </svg>
  )
}

/**
 * Shape: chevron / arrow — horizontal band with pointed right end and notched left end.
 */
export function ChevronShapeSvg({ className, flip = "none" }: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Chevron arrow shape</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d="M1 1H2100L2399 300L2100 599H1L300 300Z"
        stroke="currentColor"
      />
    </svg>
  )
}

/**
 * Shape: cross / plus — equal-armed cross shape, arms 33% of total width/height.
 */
export function CrossShapeSvg({ className, flip = "none" }: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Cross plus shape</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d="M800 2H1600V333H2398V667H1600V998H800V667H2V333H800Z"
        stroke="currentColor"
      />
    </svg>
  )
}

/**
 * Panel: pill / stadium — fully rounded rectangle with semicircular ends on left and right.
 */
export function PillShapeSvg({ className, flip = "none" }: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 800"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Pill or stadium rounded rectangle shape</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d="M400 2H2000A398 398 0 0 1 2000 798H400A398 398 0 0 1 400 2Z"
        stroke="currentColor"
      />
    </svg>
  )
}

/**
 * Panel: inverted arch — flat top, concave arc on bottom edge.
 */
export function InvertedArchPanelSvg({
  className,
  flip = "none",
}: ShapeSvgProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={frameSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Inverted arch panel with concave bottom</title>
      <motion.path
        {...strokeDrawProps(reduceMotion, 0)}
        d="M1 1H2399V700A1200 300 0 0 1 1 700Z"
        stroke="currentColor"
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  SACRED GEOMETRY                                                  */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  1. Vesica Piscis                                                  */
/*  Two overlapping circles whose intersection forms an almond shape. */
/* ------------------------------------------------------------------ */

export function VesicaPiscisSvg({ className, flip = "none" }: ShapeSvgProps) {
  const cx = 1200
  const cy = 500
  const r = 300
  const offset = r / 2 // circles overlap by one radius
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={lineArtShapeSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Vesica Piscis — two overlapping circles</title>
      <motion.circle
        cx={cx - offset}
        cy={cy}
        initial={{ pathLength: reduceMotion ? 1 : 0 }}
        r={r}
        stroke="currentColor"
        transition={sacredStrokeTransition(reduceMotion, 0)}
        viewport={SACRED_IN_VIEW}
        whileInView={{ pathLength: 1 }}
      />
      <motion.circle
        cx={cx + offset}
        cy={cy}
        initial={{ pathLength: reduceMotion ? 1 : 0 }}
        r={r}
        stroke="currentColor"
        transition={sacredStrokeTransition(reduceMotion, 1)}
        viewport={SACRED_IN_VIEW}
        whileInView={{ pathLength: 1 }}
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  2. Seed of Life                                                   */
/*  Seven circles: one center + six surrounding at 60° intervals.     */
/* ------------------------------------------------------------------ */

export function SeedOfLifeSvg({ className, flip = "none" }: ShapeSvgProps) {
  const cx = 1200
  const cy = 500
  const r = 200
  const reduceMotion = useReducedMotion()

  const petals = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 * Math.PI) / 180
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  })

  return (
    <svg
      className={lineArtShapeSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Seed of Life — seven overlapping circles</title>
      <motion.circle
        cx={cx}
        cy={cy}
        initial={{ pathLength: reduceMotion ? 1 : 0 }}
        r={r}
        stroke="currentColor"
        transition={sacredStrokeTransition(reduceMotion, 0)}
        viewport={SACRED_IN_VIEW}
        whileInView={{ pathLength: 1 }}
      />
      {petals.map((p, i) => (
        <motion.circle
          cx={p.x}
          cy={p.y}
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          key={`seed-petal-${p.x}-${p.y}`}
          r={r}
          stroke="currentColor"
          transition={sacredStrokeTransition(reduceMotion, i + 1)}
          viewport={SACRED_IN_VIEW}
          whileInView={{ pathLength: 1 }}
        />
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  3. Flower of Life                                                 */
/*  19 circles: Seed of Life + 12 outer petals on second ring.        */
/* ------------------------------------------------------------------ */

export function FlowerOfLifeSvg({ className, flip = "none" }: ShapeSvgProps) {
  const cx = 1200
  const cy = 500
  const r = 150

  // Ring 1: 6 circles at distance r
  const ring1 = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 * Math.PI) / 180
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  })

  // Ring 2: 6 circles at distance 2r (aligned) + 6 at distance r√3 (offset 30°)
  const ring2a = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 * Math.PI) / 180
    return { x: cx + 2 * r * Math.cos(angle), y: cy + 2 * r * Math.sin(angle) }
  })
  const ring2b = Array.from({ length: 6 }, (_, i) => {
    const angle = ((i * 60 + 30) * Math.PI) / 180
    const d = r * Math.sqrt(3)
    return { x: cx + d * Math.cos(angle), y: cy + d * Math.sin(angle) }
  })

  const allCircles = [{ x: cx, y: cy }, ...ring1, ...ring2a, ...ring2b]

  // Bounding circle
  const outerR = 2 * r + r * 0.15
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={lineArtShapeSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Flower of Life — 19 overlapping circles</title>
      <motion.circle
        cx={cx}
        cy={cy}
        initial={{ pathLength: reduceMotion ? 1 : 0 }}
        r={outerR}
        stroke="currentColor"
        transition={sacredStrokeTransition(reduceMotion, 0)}
        viewport={SACRED_IN_VIEW}
        whileInView={{ pathLength: 1 }}
      />
      {allCircles.map((p, i) => (
        <motion.circle
          cx={p.x}
          cy={p.y}
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          key={`fol-${p.x}-${p.y}`}
          r={r}
          stroke="currentColor"
          transition={sacredStrokeTransition(reduceMotion, i + 1)}
          viewport={SACRED_IN_VIEW}
          whileInView={{ pathLength: 1 }}
        />
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  4. Metatron's Cube                                                */
/*  13 circles (Fruit of Life) connected by straight lines.           */
/* ------------------------------------------------------------------ */

export function MetatronsCubeSvg({ className, flip = "none" }: ShapeSvgProps) {
  const cx = 1200
  const cy = 500
  const r = 60
  const ringR = 200

  // Center + ring 1 (6) + ring 2 (6)
  const center = { x: cx, y: cy }
  const ring1 = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 * Math.PI) / 180 - Math.PI / 2
    return { x: cx + ringR * Math.cos(angle), y: cy + ringR * Math.sin(angle) }
  })
  const ring2 = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 * Math.PI) / 180 - Math.PI / 2
    return {
      x: cx + 2 * ringR * Math.cos(angle),
      y: cy + 2 * ringR * Math.sin(angle),
    }
  })

  const nodes = [center, ...ring1, ...ring2]

  // Connect every node to every other node
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      lines.push({
        x1: nodes[i].x,
        y1: nodes[i].y,
        x2: nodes[j].x,
        y2: nodes[j].y,
      })
    }
  }

  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={lineArtShapeSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Metatron&apos;s Cube — 13 circles connected by lines</title>
      {lines.map((l, i) => (
        <motion.line
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          key={`mline-${l.x1}-${l.y1}-${l.x2}-${l.y2}`}
          stroke="currentColor"
          strokeOpacity={0.5}
          transition={sacredStrokeTransition(reduceMotion, i, 0.45)}
          viewport={SACRED_IN_VIEW}
          whileInView={{ pathLength: 1 }}
          x1={l.x1}
          x2={l.x2}
          y1={l.y1}
          y2={l.y2}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          cx={n.x}
          cy={n.y}
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          key={`mnode-${n.x}-${n.y}`}
          r={r}
          stroke="currentColor"
          transition={sacredStrokeTransition(
            reduceMotion,
            lines.length + i,
            0.55
          )}
          viewport={SACRED_IN_VIEW}
          whileInView={{ pathLength: 1 }}
        />
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  5. Sri Yantra                                                     */
/*  9 interlocking triangles (4 up, 5 down) inside concentric rings.  */
/* ------------------------------------------------------------------ */

export function SriYantraSvg({ className, flip = "none" }: ShapeSvgProps) {
  const cx = 1200
  const cy = 500

  // Simplified Sri Yantra: 4 upward triangles + 5 downward triangles
  // Heights are canonical proportions (normalized to outer radius 320)
  const outerR = 320

  // Upward-pointing triangles (apex at top): base y, apex y
  const upTriangles = [
    { baseY: cy + 280, apexY: cy - 310, halfW: 310 },
    { baseY: cy + 220, apexY: cy - 240, halfW: 250 },
    { baseY: cy + 140, apexY: cy - 160, halfW: 175 },
    { baseY: cy + 70, apexY: cy - 80, halfW: 100 },
  ]

  // Downward-pointing triangles (apex at bottom)
  const downTriangles = [
    { baseY: cy - 280, apexY: cy + 310, halfW: 310 },
    { baseY: cy - 230, apexY: cy + 250, halfW: 260 },
    { baseY: cy - 170, apexY: cy + 180, halfW: 195 },
    { baseY: cy - 110, apexY: cy + 110, halfW: 135 },
    { baseY: cy - 50, apexY: cy + 50, halfW: 70 },
  ]

  const reduceMotion = useReducedMotion()
  let sriStagger = 0

  return (
    <svg
      className={lineArtShapeSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Sri Yantra — nine interlocking triangles</title>
      {/* Outer circles */}
      <motion.circle
        cx={cx}
        cy={cy}
        initial={{ pathLength: reduceMotion ? 1 : 0 }}
        r={outerR + 20}
        stroke="currentColor"
        transition={sacredStrokeTransition(reduceMotion, sriStagger++)}
        viewport={SACRED_IN_VIEW}
        whileInView={{ pathLength: 1 }}
      />
      <motion.circle
        cx={cx}
        cy={cy}
        initial={{ pathLength: reduceMotion ? 1 : 0 }}
        r={outerR + 35}
        stroke="currentColor"
        transition={sacredStrokeTransition(reduceMotion, sriStagger++)}
        viewport={SACRED_IN_VIEW}
        whileInView={{ pathLength: 1 }}
      />

      {/* Upward triangles */}
      {upTriangles.map((t) => (
        <motion.polygon
          fill="none"
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          key={`sri-up-${t.baseY}-${t.apexY}-${t.halfW}`}
          points={`${cx},${t.apexY} ${cx - t.halfW},${t.baseY} ${cx + t.halfW},${t.baseY}`}
          stroke="currentColor"
          transition={sacredStrokeTransition(reduceMotion, sriStagger++)}
          viewport={SACRED_IN_VIEW}
          whileInView={{ pathLength: 1 }}
        />
      ))}

      {/* Downward triangles */}
      {downTriangles.map((t) => (
        <motion.polygon
          fill="none"
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          key={`sri-down-${t.baseY}-${t.apexY}-${t.halfW}`}
          points={`${cx},${t.apexY} ${cx - t.halfW},${t.baseY} ${cx + t.halfW},${t.baseY}`}
          stroke="currentColor"
          transition={sacredStrokeTransition(reduceMotion, sriStagger++)}
          viewport={SACRED_IN_VIEW}
          whileInView={{ pathLength: 1 }}
        />
      ))}

      {/* Bindu (center dot) */}
      <motion.circle
        cx={cx}
        cy={cy}
        fill="currentColor"
        initial={{ opacity: reduceMotion ? 1 : 0 }}
        r={4}
        stroke="none"
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                delay: sriStagger * 0.009,
                duration: 0.28,
                ease: SACRED_DRAW_EASE,
              }
        }
        viewport={SACRED_IN_VIEW}
        whileInView={{ opacity: 1 }}
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  6. Platonic Solids — Wireframe 2D Projections                     */
/*  All five solids as flat orthographic projections.                  */
/* ------------------------------------------------------------------ */

/** Tetrahedron — 4 vertices, 6 edges. Projected as triangle with center. */
export function TetrahedronWireframeSvg({
  className,
  flip = "none",
}: ShapeSvgProps) {
  const cx = 1200
  const cy = 500
  const r = 280

  // 3 outer vertices (equilateral triangle) + 1 center
  const verts = Array.from({ length: 3 }, (_, i) => {
    const angle = (i * 120 * Math.PI) / 180 - Math.PI / 2
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  })
  const center = { x: cx, y: cy }
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={lineArtShapeSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Tetrahedron wireframe projection</title>
      {/* Outer triangle */}
      <motion.polygon
        fill="none"
        initial={{ pathLength: reduceMotion ? 1 : 0 }}
        points={verts.map((v) => `${v.x},${v.y}`).join(" ")}
        stroke="currentColor"
        transition={sacredStrokeTransition(reduceMotion, 0)}
        viewport={SACRED_IN_VIEW}
        whileInView={{ pathLength: 1 }}
      />
      {/* Lines from center to each vertex */}
      {verts.map((v, i) => (
        <motion.line
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          key={`tetra-spoke-${v.x}-${v.y}`}
          stroke="currentColor"
          transition={sacredStrokeTransition(reduceMotion, i + 1)}
          viewport={SACRED_IN_VIEW}
          whileInView={{ pathLength: 1 }}
          x1={center.x}
          x2={v.x}
          y1={center.y}
          y2={v.y}
        />
      ))}
    </svg>
  )
}

/** Cube (Hexahedron) — projected as nested squares rotated 45°. */
export function CubeWireframeSvg({ className, flip = "none" }: ShapeSvgProps) {
  const cx = 1200
  const cy = 500
  const outer = 260
  const inner = 150

  const outerVerts = Array.from({ length: 4 }, (_, i) => {
    const angle = (i * 90 * Math.PI) / 180 - Math.PI / 4
    return { x: cx + outer * Math.cos(angle), y: cy + outer * Math.sin(angle) }
  })
  const innerVerts = Array.from({ length: 4 }, (_, i) => {
    const angle = (i * 90 * Math.PI) / 180
    return { x: cx + inner * Math.cos(angle), y: cy + inner * Math.sin(angle) }
  })

  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={lineArtShapeSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Cube wireframe projection</title>
      <motion.polygon
        fill="none"
        initial={{ pathLength: reduceMotion ? 1 : 0 }}
        points={outerVerts.map((v) => `${v.x},${v.y}`).join(" ")}
        stroke="currentColor"
        transition={sacredStrokeTransition(reduceMotion, 0)}
        viewport={SACRED_IN_VIEW}
        whileInView={{ pathLength: 1 }}
      />
      <motion.polygon
        fill="none"
        initial={{ pathLength: reduceMotion ? 1 : 0 }}
        points={innerVerts.map((v) => `${v.x},${v.y}`).join(" ")}
        stroke="currentColor"
        transition={sacredStrokeTransition(reduceMotion, 1)}
        viewport={SACRED_IN_VIEW}
        whileInView={{ pathLength: 1 }}
      />
      {outerVerts.map((v, i) => (
        <motion.line
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          key={`cube-${v.x}-${v.y}-${innerVerts[i].x}-${innerVerts[i].y}`}
          stroke="currentColor"
          transition={sacredStrokeTransition(reduceMotion, i + 2)}
          viewport={SACRED_IN_VIEW}
          whileInView={{ pathLength: 1 }}
          x1={v.x}
          x2={innerVerts[i].x}
          y1={v.y}
          y2={innerVerts[i].y}
        />
      ))}
    </svg>
  )
}

/** Octahedron — 6 vertices, projected as a square with both diagonals and a center diamond. */
export function OctahedronWireframeSvg({
  className,
  flip = "none",
}: ShapeSvgProps) {
  const cx = 1200
  const cy = 500
  const r = 280

  // 4 equatorial vertices (square) + top + bottom
  const eq = Array.from({ length: 4 }, (_, i) => {
    const angle = (i * 90 * Math.PI) / 180
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  })
  const top = { x: cx, y: cy - r }
  const bottom = { x: cx, y: cy + r }
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={lineArtShapeSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Octahedron wireframe projection</title>
      {/* Equatorial square */}
      <motion.polygon
        fill="none"
        initial={{ pathLength: reduceMotion ? 1 : 0 }}
        points={eq.map((v) => `${v.x},${v.y}`).join(" ")}
        stroke="currentColor"
        transition={sacredStrokeTransition(reduceMotion, 0)}
        viewport={SACRED_IN_VIEW}
        whileInView={{ pathLength: 1 }}
      />
      {/* Edges from top and bottom to each equatorial vertex */}
      {eq.map((v, i) => (
        <g key={`oct-eq-${v.x}-${v.y}`}>
          <motion.line
            initial={{ pathLength: reduceMotion ? 1 : 0 }}
            stroke="currentColor"
            transition={sacredStrokeTransition(reduceMotion, 1 + i * 2)}
            viewport={SACRED_IN_VIEW}
            whileInView={{ pathLength: 1 }}
            x1={top.x}
            x2={v.x}
            y1={top.y}
            y2={v.y}
          />
          <motion.line
            initial={{ pathLength: reduceMotion ? 1 : 0 }}
            stroke="currentColor"
            transition={sacredStrokeTransition(reduceMotion, 2 + i * 2)}
            viewport={SACRED_IN_VIEW}
            whileInView={{ pathLength: 1 }}
            x1={bottom.x}
            x2={v.x}
            y1={bottom.y}
            y2={v.y}
          />
        </g>
      ))}
    </svg>
  )
}

/** Icosahedron — 12 vertices, 30 edges. Simplified front-face projection. */
export function IcosahedronWireframeSvg({
  className,
  flip = "none",
}: ShapeSvgProps) {
  const cx = 1200
  const cy = 500
  const outerR = 280
  const innerR = 130

  // Outer ring of 5 vertices + inner ring of 5 (rotated 36°) + top + bottom
  const outer = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 72 * Math.PI) / 180 - Math.PI / 2
    return {
      x: cx + outerR * Math.cos(angle),
      y: cy + outerR * Math.sin(angle),
    }
  })
  const inner = Array.from({ length: 5 }, (_, i) => {
    const angle = ((i * 72 + 36) * Math.PI) / 180 - Math.PI / 2
    return {
      x: cx + innerR * Math.cos(angle),
      y: cy + innerR * Math.sin(angle),
    }
  })
  const top = { x: cx, y: cy - outerR - 20 }
  const bottom = { x: cx, y: cy + outerR + 20 }
  const reduceMotion = useReducedMotion()
  let icoStagger = 0

  return (
    <svg
      className={lineArtShapeSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Icosahedron wireframe projection</title>
      {/* Outer pentagon */}
      <motion.polygon
        fill="none"
        initial={{ pathLength: reduceMotion ? 1 : 0 }}
        points={outer.map((v) => `${v.x},${v.y}`).join(" ")}
        stroke="currentColor"
        transition={sacredStrokeTransition(reduceMotion, icoStagger++)}
        viewport={SACRED_IN_VIEW}
        whileInView={{ pathLength: 1 }}
      />
      {/* Inner pentagon */}
      <motion.polygon
        fill="none"
        initial={{ pathLength: reduceMotion ? 1 : 0 }}
        points={inner.map((v) => `${v.x},${v.y}`).join(" ")}
        stroke="currentColor"
        transition={sacredStrokeTransition(reduceMotion, icoStagger++)}
        viewport={SACRED_IN_VIEW}
        whileInView={{ pathLength: 1 }}
      />
      {/* Connections outer ↔ inner */}
      {outer.map((v, i) => (
        <g key={`ico-pair-${v.x}-${v.y}-${inner[i].x}-${inner[i].y}`}>
          <motion.line
            initial={{ pathLength: reduceMotion ? 1 : 0 }}
            stroke="currentColor"
            transition={sacredStrokeTransition(reduceMotion, icoStagger++)}
            viewport={SACRED_IN_VIEW}
            whileInView={{ pathLength: 1 }}
            x1={v.x}
            x2={inner[i].x}
            y1={v.y}
            y2={inner[i].y}
          />
          <motion.line
            initial={{ pathLength: reduceMotion ? 1 : 0 }}
            stroke="currentColor"
            transition={sacredStrokeTransition(reduceMotion, icoStagger++)}
            viewport={SACRED_IN_VIEW}
            whileInView={{ pathLength: 1 }}
            x1={v.x}
            x2={inner[(i + 4) % 5].x}
            y1={v.y}
            y2={inner[(i + 4) % 5].y}
          />
        </g>
      ))}
      {/* Top/bottom poles to outer ring */}
      {outer.map((v, i) =>
        i < 3 ? (
          <motion.line
            initial={{ pathLength: reduceMotion ? 1 : 0 }}
            key={`ico-top-${v.x}-${v.y}`}
            stroke="currentColor"
            transition={sacredStrokeTransition(reduceMotion, icoStagger++)}
            viewport={SACRED_IN_VIEW}
            whileInView={{ pathLength: 1 }}
            x1={top.x}
            x2={v.x}
            y1={top.y}
            y2={v.y}
          />
        ) : (
          <motion.line
            initial={{ pathLength: reduceMotion ? 1 : 0 }}
            key={`ico-bot-${v.x}-${v.y}`}
            stroke="currentColor"
            transition={sacredStrokeTransition(reduceMotion, icoStagger++)}
            viewport={SACRED_IN_VIEW}
            whileInView={{ pathLength: 1 }}
            x1={bottom.x}
            x2={v.x}
            y1={bottom.y}
            y2={v.y}
          />
        )
      )}
    </svg>
  )
}

/** Dodecahedron — 20 vertices, 30 edges. Projected as nested pentagons. */
export function DodecahedronWireframeSvg({
  className,
  flip = "none",
}: ShapeSvgProps) {
  const cx = 1200
  const cy = 500
  const r1 = 280
  const r2 = 180
  const r3 = 110

  const ring = (r: number, offsetDeg = 0) =>
    Array.from({ length: 5 }, (_, i) => {
      const angle = ((i * 72 + offsetDeg) * Math.PI) / 180 - Math.PI / 2
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
    })

  const outerRing = ring(r1, 0)
  const midRing = ring(r2, 36)
  const innerRing = ring(r3, 0)
  const reduceMotion = useReducedMotion()
  let dodeStagger = 0

  return (
    <svg
      className={lineArtShapeSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Dodecahedron wireframe projection</title>
      {/* Three concentric pentagons */}
      <motion.polygon
        fill="none"
        initial={{ pathLength: reduceMotion ? 1 : 0 }}
        points={outerRing.map((v) => `${v.x},${v.y}`).join(" ")}
        stroke="currentColor"
        transition={sacredStrokeTransition(reduceMotion, dodeStagger++)}
        viewport={SACRED_IN_VIEW}
        whileInView={{ pathLength: 1 }}
      />
      <motion.polygon
        fill="none"
        initial={{ pathLength: reduceMotion ? 1 : 0 }}
        points={midRing.map((v) => `${v.x},${v.y}`).join(" ")}
        stroke="currentColor"
        transition={sacredStrokeTransition(reduceMotion, dodeStagger++)}
        viewport={SACRED_IN_VIEW}
        whileInView={{ pathLength: 1 }}
      />
      <motion.polygon
        fill="none"
        initial={{ pathLength: reduceMotion ? 1 : 0 }}
        points={innerRing.map((v) => `${v.x},${v.y}`).join(" ")}
        stroke="currentColor"
        transition={sacredStrokeTransition(reduceMotion, dodeStagger++)}
        viewport={SACRED_IN_VIEW}
        whileInView={{ pathLength: 1 }}
      />
      {/* Connections between rings */}
      {outerRing.map((v, i) => (
        <g key={`dode-${v.x}-${v.y}-${midRing[i].x}-${innerRing[i].x}`}>
          <motion.line
            initial={{ pathLength: reduceMotion ? 1 : 0 }}
            stroke="currentColor"
            transition={sacredStrokeTransition(reduceMotion, dodeStagger++)}
            viewport={SACRED_IN_VIEW}
            whileInView={{ pathLength: 1 }}
            x1={v.x}
            x2={midRing[i].x}
            y1={v.y}
            y2={midRing[i].y}
          />
          <motion.line
            initial={{ pathLength: reduceMotion ? 1 : 0 }}
            stroke="currentColor"
            transition={sacredStrokeTransition(reduceMotion, dodeStagger++)}
            viewport={SACRED_IN_VIEW}
            whileInView={{ pathLength: 1 }}
            x1={v.x}
            x2={midRing[(i + 4) % 5].x}
            y1={v.y}
            y2={midRing[(i + 4) % 5].y}
          />
          <motion.line
            initial={{ pathLength: reduceMotion ? 1 : 0 }}
            stroke="currentColor"
            transition={sacredStrokeTransition(reduceMotion, dodeStagger++)}
            viewport={SACRED_IN_VIEW}
            whileInView={{ pathLength: 1 }}
            x1={midRing[i].x}
            x2={innerRing[i].x}
            y1={midRing[i].y}
            y2={innerRing[i].y}
          />
        </g>
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  7. Golden Spiral / Golden Rectangle                               */
/*  Nested golden rectangles with quarter-circle arcs.                */
/* ------------------------------------------------------------------ */

export function GoldenSpiralSvg({ className, flip = "none" }: ShapeSvgProps) {
  const phi = (1 + Math.sqrt(5)) / 2

  // Build rectangles from largest to smallest, 8 subdivisions
  // Start: full rectangle 800×494 centered at (1200,500)
  const totalW = 800
  const totalH = totalW / phi
  const startX = 1200 - totalW / 2
  const startY = 500 - totalH / 2

  // Iteratively subdivide; each step cuts a square off and the remainder is a new golden rect
  const rects: { x: number; y: number; w: number; h: number }[] = []
  const arcs: string[] = []

  let rx = startX
  let ry = startY
  let rw = totalW
  let rh = totalH

  for (let i = 0; i < 9; i++) {
    rects.push({ x: rx, y: ry, w: rw, h: rh })
    const side = Math.min(rw, rh)
    const dir = i % 4

    // Arc goes from one corner of the square to the opposite via quarter circle
    switch (dir) {
      case 0: // cut square from right
        arcs.push(
          `M${rx + rw},${ry} A${side},${side} 0 0,1 ${rx + rw - side},${ry + side}`
        )
        rw -= side
        break
      case 1: // cut from bottom
        arcs.push(
          `M${rx + rw},${ry + rh} A${side},${side} 0 0,1 ${rx},${ry + rh - side}`
        )
        rh -= side
        break
      case 2: // cut from left
        arcs.push(`M${rx},${ry + rh} A${side},${side} 0 0,1 ${rx + side},${ry}`)
        rx += side
        rw -= side
        break
      case 3: // cut from top
        arcs.push(`M${rx},${ry} A${side},${side} 0 0,1 ${rx + rw},${ry + side}`)
        ry += side
        rh -= side
        break
      default: {
        break
      }
    }
  }

  const reduceMotion = useReducedMotion()
  const spiralPathD = arcs.join(" ")

  return (
    <svg
      className={lineArtShapeSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Golden spiral within nested golden rectangles</title>
      {/* Subdivision lines */}
      {rects.map((rect, i) => (
        <motion.rect
          fill="none"
          height={rect.h}
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          key={`golden-rect-${rect.x}-${rect.y}-${rect.w}-${rect.h}`}
          stroke="currentColor"
          strokeOpacity={0.4}
          transition={sacredStrokeTransition(reduceMotion, i, 0.5)}
          viewport={SACRED_IN_VIEW}
          whileInView={{ pathLength: 1 }}
          width={rect.w}
          x={rect.x}
          y={rect.y}
        />
      ))}
      {/* Spiral arcs */}
      <motion.path
        d={spiralPathD}
        initial={{ pathLength: reduceMotion ? 1 : 0 }}
        stroke="currentColor"
        strokeWidth={1.5}
        transition={sacredStrokeTransition(reduceMotion, rects.length, 1.35)}
        viewport={SACRED_IN_VIEW}
        whileInView={{ pathLength: 1 }}
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  8. Torus / Tube Torus                                             */
/*  Concentric elliptical rings creating a donut cross-section feel.  */
/* ------------------------------------------------------------------ */

export function TorusTubeSvg({ className, flip = "none" }: ShapeSvgProps) {
  const cx = 1200
  const cy = 500
  const majorR = 280 // distance from center to tube center
  const tubeR = 100 // radius of the tube
  const ringCount = 24

  // Draw circles along the major ring, creating a tube torus effect
  const circles = Array.from({ length: ringCount }, (_, i) => {
    const angle = (i * 360 * Math.PI) / (180 * ringCount)
    const x = cx + majorR * Math.cos(angle)
    const y = cy + majorR * 0.35 * Math.sin(angle) // foreshortened for 3/4 view
    // Scale radius for depth
    const scale = 0.6 + 0.4 * Math.sin(angle)
    return { x, y, r: tubeR * scale, opacity: 0.3 + 0.7 * scale }
  })

  const reduceMotion = useReducedMotion()
  let torusStagger = 0

  return (
    <svg
      className={lineArtShapeSvgClassName(flip, className)}
      fill="none"
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Tube torus — overlapping rings</title>
      {/* Outer boundary ellipse */}
      <motion.ellipse
        cx={cx}
        cy={cy}
        initial={{ pathLength: reduceMotion ? 1 : 0 }}
        rx={majorR + tubeR}
        ry={(majorR + tubeR) * 0.4}
        stroke="currentColor"
        strokeOpacity={0.3}
        transition={sacredStrokeTransition(reduceMotion, torusStagger++)}
        viewport={SACRED_IN_VIEW}
        whileInView={{ pathLength: 1 }}
      />
      {/* Inner hole ellipse */}
      <motion.ellipse
        cx={cx}
        cy={cy}
        initial={{ pathLength: reduceMotion ? 1 : 0 }}
        rx={majorR - tubeR}
        ry={(majorR - tubeR) * 0.4}
        stroke="currentColor"
        strokeOpacity={0.3}
        transition={sacredStrokeTransition(reduceMotion, torusStagger++)}
        viewport={SACRED_IN_VIEW}
        whileInView={{ pathLength: 1 }}
      />
      {/* Tube section circles */}
      {circles.map((c) => (
        <motion.circle
          cx={c.x}
          cy={c.y}
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          key={`torus-${c.x}-${c.y}-${c.r}-${c.opacity}`}
          r={c.r}
          stroke="currentColor"
          strokeOpacity={c.opacity}
          transition={sacredStrokeTransition(
            reduceMotion,
            torusStagger++,
            0.55
          )}
          viewport={SACRED_IN_VIEW}
          whileInView={{ pathLength: 1 }}
        />
      ))}
    </svg>
  )
}
