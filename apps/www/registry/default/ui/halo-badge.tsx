"use client"

/**
 * Badge with optional layout animation on content changes (`tabular-nums` for counts),
 * a “live” status dot (opacity-only pulse), and the same frosted fill + animated
 * gradient rim + layered shadow language as `HaloButton` / `HaloCard`.
 */
import { useMemo, useState, type ComponentProps, type ReactNode } from "react"
import type { VariantProps } from "class-variance-authority"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { badgeVariants } from "@/components/ui/badge"

/* ─── Rim + fill (self-contained; no halo-card import) ─── */

type RimVariant = "default" | "success" | "destructive"

const RIM_BLOB_GRADIENTS: Record<
  RimVariant,
  { primaryBg: string; secondaryBg: string; tertiaryBg: string }
> = {
  default: {
    primaryBg: "linear-gradient(90deg, #ff0080, #7928ca, #00d4ff, #0070f3)",
    secondaryBg: "linear-gradient(90deg, #ff4d4d, #f9cb28, #ff0080)",
    tertiaryBg: "linear-gradient(90deg, #0070f3, #00d4ff, #7928ca)",
  },
  success: {
    primaryBg:
      "linear-gradient(90deg, #047857, #059669, #10b981, #14b8a6, #0d9488)",
    secondaryBg: "linear-gradient(90deg, #34d399, #6ee7b7, #2dd4bf, #5eead4)",
    tertiaryBg: "linear-gradient(90deg, #065f46, #047857, #0f766e)",
  },
  destructive: {
    primaryBg:
      "linear-gradient(90deg, #991b1b, #dc2626, #e11d48, #f43f5e, #be123c)",
    secondaryBg: "linear-gradient(90deg, #fb7185, #fda4af, #f87171, #fecdd3)",
    tertiaryBg: "linear-gradient(90deg, #7f1d1d, #b91c1c, #dc2626)",
  },
}

function badgeBorderGlowConfig(
  translucent: boolean,
  rimEmphasis: boolean,
  rimVariant: RimVariant = "default"
) {
  let idleOpacity: number
  if (translucent) {
    idleOpacity = rimEmphasis ? 0.92 : 0.72
  } else {
    idleOpacity = rimEmphasis ? 0.78 : 0.5
  }
  const gradients = RIM_BLOB_GRADIENTS[rimVariant]
  return {
    opacityIdle: idleOpacity,
    primaryBg: gradients.primaryBg,
    secondaryBg: gradients.secondaryBg,
    tertiaryBg: gradients.tertiaryBg,
    primaryLeft: ["-5%", "75%", "-5%"],
    secondaryLeft: ["65%", "10%", "65%"],
    tertiaryLeft: ["25%", "55%", "25%"],
    durationMain: 6,
    durationSec: 5,
    durationTer: 4,
  }
}

function badgeFillBackgroundFor(
  translucent: boolean,
  interactive: boolean,
  rimEmphasis: boolean
) {
  if (translucent) {
    if (interactive && rimEmphasis) {
      return "linear-gradient(to bottom, color-mix(in oklch, var(--card) 88%, transparent) 0%, color-mix(in oklch, var(--card) 74%, transparent) 100%)"
    }
    return "linear-gradient(to bottom, color-mix(in oklch, var(--card) 82%, transparent) 0%, color-mix(in oklch, var(--card) 70%, transparent) 100%)"
  }
  if (interactive && rimEmphasis) {
    return "linear-gradient(to bottom, var(--card) 0%, color-mix(in oklch, var(--card) 90%, var(--muted)) 100%)"
  }
  return "linear-gradient(to bottom, var(--card) 0%, color-mix(in oklch, var(--card) 94%, var(--muted)) 100%)"
}

const layoutTransition = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.32,
}

/** Variants that use gradient rim + frosted surface (ghost/link stay minimal). */
const CHROMED_BADGE_VARIANTS = new Set<
  NonNullable<VariantProps<typeof badgeVariants>["variant"]>
>(["default", "secondary", "destructive", "outline"])

function badgeRimVariant(
  variant: NonNullable<VariantProps<typeof badgeVariants>["variant"]>
): RimVariant {
  if (variant === "destructive") {
    return "destructive"
  }
  return "default"
}

/**
 * Same ambient underglow as {@link HaloSwitch} — radial brand ramps clipped to the pill
 * so it reads as depth, not a second misaligned rim.
 */
function BadgeAmbientUnderglow({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[9999px]">
      <div
        className={cn(
          "absolute inset-0",
          reduceMotion ? "opacity-[0.38]" : "opacity-50"
        )}
      >
        <div
          className="absolute inset-0 blur-2xl"
          style={{
            background:
              "radial-gradient(90% 70% at 50% 100%, rgba(255,0,128,0.28), rgba(121,40,202,0.12) 48%, transparent 62%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-70 blur-xl dark:opacity-50"
          style={{
            background:
              "radial-gradient(70% 55% at 30% 0%, rgba(0,212,255,0.22), rgba(0,112,243,0.08) 45%, transparent 58%)",
          }}
        />
      </div>
    </div>
  )
}

/** Scaled pill blobs for `h-5` badges — same motion keys as `GradientRimPillBlobs`. */
function BadgeRimPillBlobs({
  borderGlow,
  reduceMotion,
}: {
  borderGlow: ReturnType<typeof badgeBorderGlowConfig>
  reduceMotion: boolean
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-full">
      <motion.div
        animate={{
          opacity: reduceMotion
            ? borderGlow.opacityIdle * 0.82
            : borderGlow.opacityIdle,
        }}
        className="absolute inset-x-0 bottom-0 h-1/2"
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <motion.div
          animate={{
            left: borderGlow.primaryLeft,
          }}
          className="-bottom-2 absolute h-10 w-28 blur-xl"
          style={{
            background: borderGlow.primaryBg,
          }}
          transition={{
            duration: reduceMotion ? 0.01 : borderGlow.durationMain,
            repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          animate={{
            left: borderGlow.secondaryLeft,
          }}
          className="-bottom-1.5 absolute h-8 w-20 blur-lg"
          style={{
            background: borderGlow.secondaryBg,
          }}
          transition={{
            duration: reduceMotion ? 0.01 : borderGlow.durationSec,
            repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          animate={{
            left: borderGlow.tertiaryLeft,
          }}
          className="-bottom-1 absolute h-6 w-16 blur-md"
          style={{
            background: borderGlow.tertiaryBg,
          }}
          transition={{
            duration: reduceMotion ? 0.01 : borderGlow.durationTer,
            repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  )
}

const chromedLabelClasses: Record<
  "default" | "secondary" | "destructive" | "outline",
  string
> = {
  default: "text-primary",
  secondary: "text-muted-foreground",
  destructive:
    "text-destructive aria-invalid:text-destructive dark:aria-invalid:text-destructive",
  outline: "text-foreground",
}

/** Border tints (same `color-mix` system as `HaloSwitch` shell). */
const chromedBorderClasses: Record<
  "default" | "secondary" | "destructive" | "outline",
  string
> = {
  default:
    "border-[color-mix(in_oklch,var(--border)_72%,oklch(0.88_0.06_300))]",
  secondary:
    "border-[color-mix(in_oklch,var(--border)_72%,oklch(0.88_0.06_300))]",
  destructive:
    "border-[color-mix(in_oklch,var(--border)_65%,oklch(0.86_0.09_22))]",
  outline:
    "border-[color-mix(in_oklch,var(--border)_72%,oklch(0.88_0.06_300))]",
}

/** Plain string/number children only — used to pick a perfect circle for single-digit counts. */
function plainChildLength(children: ReactNode): number | null {
  if (typeof children === "string" || typeof children === "number") {
    return String(children).length
  }
  return null
}

/** Explicit transform in transition (never `transition: all`). Easing matches cross-fade polish in the design skill. */
const chromedSurfaceBase =
  "relative z-[1] flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-full px-2 font-medium text-[0.625rem] leading-none tracking-tight antialiased outline-none transition-[background-color,backdrop-filter,border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.2,0,0,1)] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-2.5"

function chromedShapeClasses(
  singleDigitCircle: boolean,
  multiDigitTabular: boolean
): string {
  if (singleDigitCircle) {
    return "size-5 px-0"
  }
  if (multiDigitTabular) {
    return "h-5 min-w-5 px-1.5"
  }
  return "h-5 px-2"
}

export interface HaloBadgeProps
  extends Omit<ComponentProps<typeof motion.span>, "children">,
    VariantProps<typeof badgeVariants> {
  children?: ReactNode
  /** Leading “live” dot — opacity pulse only (respects reduced motion). */
  live?: boolean
  /**
   * Animate width when label/children change. Prefer off for badges that update very frequently.
   * @default true
   */
  layout?: boolean
  /** Avoids digit shift when children are numeric strings. */
  tabularNums?: boolean
  /** Frosted inner surface so gradient blobs read through (matches other animated components). */
  translucent?: boolean
  /** Stronger rim + fill on hover (matches `HaloCard` / pill buttons). */
  interactive?: boolean
  /**
   * Subtle `scale(0.96)` on press when `interactive` (interruptible CSS transition).
   * @default true
   */
  pressScale?: boolean
}

function HaloBadgeChrome({
  borderGlow,
  body,
  chromedKey,
  className,
  enableLayout,
  fillBackground,
  interactive,
  live,
  onMouseEnter,
  onMouseLeave,
  pressScale,
  pulseTransition,
  reduceMotion,
  singleDigitCircle,
  multiDigitTabular,
  translucent,
  ...props
}: {
  borderGlow: ReturnType<typeof badgeBorderGlowConfig>
  body: ReactNode
  chromedKey: keyof typeof chromedLabelClasses
  className?: string
  enableLayout: boolean
  fillBackground: string
  interactive: boolean
  live: boolean
  onMouseEnter?: ComponentProps<typeof motion.span>["onMouseEnter"]
  onMouseLeave?: ComponentProps<typeof motion.span>["onMouseLeave"]
  pressScale: boolean
  pulseTransition: { duration: number; ease: "easeInOut"; repeat: number }
  reduceMotion: boolean
  singleDigitCircle: boolean
  multiDigitTabular: boolean
  translucent: boolean
} & Omit<ComponentProps<typeof motion.span>, "children">) {
  const shapeClasses = chromedShapeClasses(singleDigitCircle, multiDigitTabular)

  return (
    <motion.span
      className={cn(
        "relative inline-flex max-w-full items-center self-center leading-none",
        className
      )}
      data-slot="halo-badge"
      layout={enableLayout}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      transition={layoutTransition}
      {...props}
    >
      {translucent ? (
        <BadgeAmbientUnderglow reduceMotion={reduceMotion} />
      ) : null}
      {/*
        Inline baseline/line-height on the rim wrapper skews the inner pill inside `p-px`.
        `inline-flex` + `leading-none` + `text-[0]` keeps the ring concentric; text size is set on the inner surface.
      */}
      {/*
        Concentric radii: outer `rounded-full` + `p-px` (1px) with inner `rounded-full`
        reads as a pill ring; both use full rounding so caps stay semicircular.
      */}
      <span className="relative z-[1] inline-flex items-center justify-center rounded-full p-px text-[0] leading-none">
        <BadgeRimPillBlobs
          borderGlow={borderGlow}
          reduceMotion={reduceMotion}
        />
        <span
          className={cn(
            chromedSurfaceBase,
            chromedLabelClasses[chromedKey],
            shapeClasses,
            interactive && "touch-manipulation",
            interactive &&
              pressScale &&
              !reduceMotion &&
              "active:scale-[0.96] motion-reduce:active:scale-100",
            /* Shell border + shadows aligned with `HaloSwitch` outer shell */
            "border",
            chromedBorderClasses[chromedKey],
            "shadow-[0_1px_0_rgba(255,255,255,0.55)_inset,0_1px_2px_rgba(0,0,0,0.03),0_6px_18px_rgba(0,0,0,0.04)]",
            "dark:border-border/80 dark:shadow-[0_1px_0_rgba(255,255,255,0.05)_inset,0_1px_2px_rgba(0,0,0,0.28),0_6px_22px_rgba(0,0,0,0.32)]",
            interactive &&
              "fine-hover:hover:border-ring/50 fine-hover:hover:shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_1px_3px_rgba(0,0,0,0.05),0_8px_22px_rgba(0,0,0,0.06)]",
            interactive &&
              "dark:fine-hover:hover:border-zinc-500/60 dark:fine-hover:hover:shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_2px_4px_rgba(0,0,0,0.38),0_10px_28px_rgba(0,0,0,0.42)]",
            translucent && "backdrop-blur-xl backdrop-saturate-150"
          )}
          style={{ background: fillBackground }}
        >
          {live ? (
            <motion.span
              animate={
                reduceMotion ? { opacity: 1 } : { opacity: [0.35, 1, 0.35] }
              }
              aria-hidden
              className="size-1.5 shrink-0 translate-y-[0.5px] self-center rounded-full bg-current opacity-90"
              transition={pulseTransition}
            />
          ) : null}
          {body}
        </span>
      </span>
    </motion.span>
  )
}

export function HaloBadge({
  variant = "default",
  className,
  children,
  live = false,
  layout = true,
  tabularNums = false,
  translucent = true,
  interactive = true,
  pressScale = true,
  onMouseEnter,
  onMouseLeave,
  ...props
}: HaloBadgeProps) {
  const reduceMotion = useReducedMotion() ?? false
  const enableLayout = layout && !reduceMotion
  const [isHovered, setIsHovered] = useState(false)

  const pulseTransition = useMemo(
    () => ({
      duration: reduceMotion ? 0 : 1.15,
      ease: "easeInOut" as const,
      repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
    }),
    [reduceMotion]
  )

  const body =
    tabularNums || live ? (
      <span
        className={cn(
          "inline-flex items-center leading-none",
          tabularNums && "font-variant-numeric tabular-nums tracking-tight",
          live && "min-w-[1ch]"
        )}
      >
        {children}
      </span>
    ) : (
      <span className="inline-flex items-center leading-none">{children}</span>
    )

  const resolvedVariant = variant ?? ("default" as NonNullable<typeof variant>)
  const useChrome = CHROMED_BADGE_VARIANTS.has(resolvedVariant)
  const rimVariant = badgeRimVariant(resolvedVariant)
  const rimEmphasis = interactive && isHovered

  const digitLen = plainChildLength(children)
  const singleDigitCircle = Boolean(tabularNums) && digitLen === 1 && !live
  const multiDigitTabular =
    Boolean(tabularNums) && !live && digitLen !== null && digitLen > 1

  const borderGlow = useMemo(
    () => badgeBorderGlowConfig(translucent, rimEmphasis, rimVariant),
    [translucent, rimEmphasis, rimVariant]
  )

  const fillBackground = useMemo(
    () => badgeFillBackgroundFor(translucent, interactive, rimEmphasis),
    [translucent, interactive, rimEmphasis]
  )

  if (!useChrome) {
    return (
      <motion.span
        className={cn(badgeVariants({ variant }), "relative", className)}
        layout={enableLayout}
        transition={layoutTransition}
        {...props}
      >
        {live ? (
          <motion.span
            animate={
              reduceMotion ? { opacity: 1 } : { opacity: [0.35, 1, 0.35] }
            }
            aria-hidden
            className="size-1.5 shrink-0 translate-y-[0.5px] self-center rounded-full bg-current opacity-90"
            transition={pulseTransition}
          />
        ) : null}
        {body}
      </motion.span>
    )
  }

  const chromedKey = resolvedVariant as keyof typeof chromedLabelClasses

  return (
    <HaloBadgeChrome
      body={body}
      borderGlow={borderGlow}
      chromedKey={chromedKey}
      className={className}
      enableLayout={enableLayout}
      fillBackground={fillBackground}
      interactive={interactive}
      live={live}
      multiDigitTabular={multiDigitTabular}
      onMouseEnter={(e) => {
        setIsHovered(true)
        onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        setIsHovered(false)
        onMouseLeave?.(e)
      }}
      pressScale={pressScale}
      pulseTransition={pulseTransition}
      reduceMotion={reduceMotion}
      singleDigitCircle={singleDigitCircle}
      translucent={translucent}
      {...props}
    />
  )
}
