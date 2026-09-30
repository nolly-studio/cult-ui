"use client"

/**
 * Composable card matching `AnimatedSearchInput` / `AnimatedButtonPolished`:
 * animated gradient rim, frosted fill, layered shadow, fine-hover polish.
 *
 * @example
 * <AnimatedCard aria-label="Example">
 *   <AnimatedCardHeader>
 *     <AnimatedCardTitle>Title</AnimatedCardTitle>
 *     <AnimatedCardDescription>Body copy.</AnimatedCardDescription>
 *   </AnimatedCardHeader>
 *   <AnimatedCardContent>Optional main area.</AnimatedCardContent>
 *   <AnimatedCardFooter>
 *     <AnimatedCardButton variant="secondary">Cancel</AnimatedCardButton>
 *     <AnimatedCardButton variant="primary">Continue</AnimatedCardButton>
 *   </AnimatedCardFooter>
 * </AnimatedCard>
 */
import {
  forwardRef,
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
  type HTMLAttributes,
  type ReactNode,
} from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react"

import { cn } from "@/lib/utils"

const paddingClass = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const

const BORDER_TRAIL_LOOP_MS = 5250

/** Moving rim highlight along the card edge (mask = border band only). Phase persists when hover/focus stops. */
function AnimatedCardBorderTrail({ active }: { active: boolean }) {
  const progress = useMotionValue(0)
  const offsetDistance = useTransform(progress, (v: number) => {
    const wrapped = ((v % 100) + 100) % 100
    return `${wrapped}%`
  })

  useEffect(() => {
    if (!active) {
      return
    }
    let rafId = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = now - last
      last = now
      const next = progress.get() + (dt / BORDER_TRAIL_LOOP_MS) * 100
      progress.set(((next % 100) + 100) % 100)
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [active, progress])

  const pathCornerRadiusPx = 16
  const trailLengthPx = 184
  const trailThicknessPx = 32

  const trailBox = {
    height: trailThicknessPx,
    offsetPath: `rect(0 auto auto 0 round ${pathCornerRadiusPx}px)`,
    width: trailLengthPx,
  } as const

  /** Feathered ends + same hue family as `borderGlowConfig` so it reads as one rim system. */
  const ambientGradient =
    "linear-gradient(90deg, transparent 0%, rgba(255,0,128,0) 6%, rgba(255,0,128,0.38) 24%, rgba(121,40,202,0.5) 50%, rgba(0,212,255,0.42) 76%, rgba(0,212,255,0) 94%, transparent 100%)"

  const coreGradient =
    "linear-gradient(90deg, transparent 0%, rgba(255,0,128,0.72) 20%, rgba(200,140,255,0.92) 50%, rgba(0,212,255,0.78) 80%, transparent 100%)"

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]",
        active ? "visible opacity-100" : "invisible opacity-0"
      )}
    >
      {/* Wide soft bloom — ties into frosted card edge */}
      <motion.div
        className="absolute opacity-95 dark:opacity-[0.98]"
        style={{
          ...trailBox,
          filter: "blur(12px)",
          offsetDistance,
        }}
      >
        <div
          className="size-full rounded-[999px]"
          style={{
            background: ambientGradient,
            boxShadow:
              "0 0 22px rgba(121,40,202,0.28), 0 0 44px rgba(0,212,255,0.18), 0 0 2px rgba(255,255,255,0.12)",
          }}
        />
      </motion.div>
      {/* Brighter core — higher-opacity read without a hard capsule edge */}
      <motion.div
        className="absolute dark:opacity-[0.94]"
        style={{
          ...trailBox,
          filter: "blur(4px)",
          offsetDistance,
        }}
      >
        <div
          className="size-full rounded-[999px]"
          style={{
            background: coreGradient,
            boxShadow:
              "0 0 14px rgba(255,0,128,0.35), 0 0 28px rgba(0,212,255,0.32), inset 0 0 1px rgba(255,255,255,0.22)",
          }}
        />
      </motion.div>
    </div>
  )
}

function borderGlowConfig(translucent: boolean, rimEmphasis: boolean) {
  let idleOpacity: number
  if (translucent) {
    idleOpacity = rimEmphasis ? 0.92 : 0.72
  } else {
    idleOpacity = rimEmphasis ? 0.78 : 0.5
  }
  return {
    opacityIdle: idleOpacity,
    primaryBg: "linear-gradient(90deg, #ff0080, #7928ca, #00d4ff, #0070f3)",
    secondaryBg: "linear-gradient(90deg, #ff4d4d, #f9cb28, #ff0080)",
    tertiaryBg: "linear-gradient(90deg, #0070f3, #00d4ff, #7928ca)",
    primaryLeft: ["-5%", "75%", "-5%"],
    secondaryLeft: ["65%", "10%", "65%"],
    tertiaryLeft: ["25%", "55%", "25%"],
    durationMain: 6,
    durationSec: 5,
    durationTer: 4,
  }
}

type BorderGlowState = ReturnType<typeof borderGlowConfig>

function GradientRimPillBlobs({
  borderGlow,
  reduceMotion,
}: {
  borderGlow: BorderGlowState
  reduceMotion: boolean
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
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
          className="-bottom-5 absolute h-20 w-56 blur-2xl"
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
          className="-bottom-4 absolute h-16 w-40 blur-xl"
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
          className="-bottom-3 absolute h-14 w-32 blur-lg"
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

function fillBackgroundFor(
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

export interface AnimatedCardProps extends ComponentProps<"div"> {
  children: ReactNode
  /** Frosted inner surface so gradient blobs read through. */
  translucent?: boolean
  /** Hover + rim emphasis on the animated edge. */
  interactive?: boolean
  /** Padding inside the card surface. */
  padding?: keyof typeof paddingClass
}

const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  function AnimatedCard(
    {
      children,
      className,
      translucent = true,
      interactive = true,
      padding = "md",
      "aria-label": ariaLabel = "Card",
      onBlur,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) {
    const [isHovered, setIsHovered] = useState(false)
    const [isFocusedWithin, setIsFocusedWithin] = useState(false)
    const reduceMotion = useReducedMotion() ?? false

    const rimEmphasis = interactive && (isHovered || isFocusedWithin)

    const borderGlow = useMemo(
      () => borderGlowConfig(translucent, rimEmphasis),
      [translucent, rimEmphasis]
    )

    const fillBackground = useMemo(
      () => fillBackgroundFor(translucent, interactive, rimEmphasis),
      [translucent, interactive, rimEmphasis]
    )

    const showTrailChrome = interactive && !reduceMotion
    const trailActive = isHovered || isFocusedWithin

    return (
      // biome-ignore lint/a11y/noNoninteractiveElementInteractions: hover drives animated rim; focusable controls render in children.
      // biome-ignore lint/a11y/useSemanticElements: not a form group; fieldset would be incorrect for layout chrome.
      <div
        aria-label={ariaLabel}
        className={cn("relative w-full max-w-full", className)}
        data-slot="animated-card"
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setIsFocusedWithin(false)
          }
          onBlur?.(e)
        }}
        onFocus={(e) => {
          if (interactive) {
            setIsFocusedWithin(true)
          }
          onFocus?.(e)
        }}
        onMouseEnter={(e) => {
          if (interactive) {
            setIsHovered(true)
          }
          onMouseEnter?.(e)
        }}
        onMouseLeave={(e) => {
          setIsHovered(false)
          onMouseLeave?.(e)
        }}
        ref={ref}
        role="group"
        {...props}
      >
        <div className="relative rounded-2xl p-px">
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl">
            <motion.div
              animate={{
                opacity: reduceMotion
                  ? borderGlow.opacityIdle * 0.82
                  : borderGlow.opacityIdle,
              }}
              className="absolute inset-x-0 bottom-0 h-[58%]"
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <motion.div
                animate={{
                  left: borderGlow.primaryLeft,
                }}
                className="-bottom-10 absolute h-32 w-88 blur-2xl"
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
                className="-bottom-7 absolute h-24 w-52 blur-2xl"
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
                className="-bottom-5 absolute h-20 w-44 blur-xl"
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

          <div
            className={cn(
              "relative z-0 flex flex-col gap-6 rounded-[15px] border border-border/90",
              "shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_1px_2px_rgba(0,0,0,0.04),0_4px_14px_rgba(0,0,0,0.05)]",
              "dark:border-border dark:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_1px_2px_rgba(0,0,0,0.35),0_4px_20px_rgba(0,0,0,0.35)]",
              "outline-none transition-[background-color,backdrop-filter,border-color,box-shadow] duration-200 ease-out",
              interactive &&
                "fine-hover:hover:border-ring/50 fine-hover:hover:shadow-[0_1px_0_rgba(255,255,255,0.14)_inset,0_1px_2px_rgba(0,0,0,0.09),0_4px_14px_rgba(0,0,0,0.11)]",
              interactive &&
                "dark:fine-hover:hover:border-zinc-500/60 dark:fine-hover:hover:shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_1px_2px_rgba(0,0,0,0.42),0_4px_20px_rgba(0,0,0,0.48)]",
              interactive &&
                "focus-within:border-ring/70 focus-within:shadow-[0_1px_0_rgba(255,255,255,0.14)_inset,0_1px_2px_rgba(0,0,0,0.09),0_4px_14px_rgba(0,0,0,0.11)]",
              interactive &&
                "dark:focus-within:border-zinc-500/55 dark:focus-within:shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_1px_2px_rgba(0,0,0,0.42),0_4px_20px_rgba(0,0,0,0.48)]",
              translucent && "backdrop-blur-xl backdrop-saturate-150",
              padding !== "none" && paddingClass[padding]
            )}
            data-slot="animated-card-surface"
            style={{ background: fillBackground }}
          >
            {children}
          </div>

          {showTrailChrome ? (
            <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl">
              <AnimatedCardBorderTrail active={trailActive} />
            </div>
          ) : null}
        </div>
      </div>
    )
  }
)

AnimatedCard.displayName = "AnimatedCard"

function AnimatedCardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid auto-rows-min items-start gap-x-4 gap-y-1.5",
        "has-[>[data-slot=animated-card-action]]:grid-cols-[1fr_auto]",
        "has-[>[data-slot=animated-card-description]]:grid-rows-[auto_auto]",
        className
      )}
      data-slot="animated-card-header"
      {...props}
    />
  )
}
AnimatedCardHeader.displayName = "AnimatedCardHeader"

const AnimatedCardTitle = forwardRef<HTMLHeadingElement, ComponentProps<"h3">>(
  function AnimatedCardTitle({ className, ...props }, ref) {
    return (
      <h3
        className={cn(
          "col-start-1 row-start-1 text-balance font-semibold text-foreground text-lg leading-tight tracking-tight antialiased",
          className
        )}
        data-slot="animated-card-title"
        ref={ref}
        {...props}
      />
    )
  }
)
AnimatedCardTitle.displayName = "AnimatedCardTitle"

const AnimatedCardDescription = forwardRef<
  HTMLParagraphElement,
  ComponentProps<"p">
>(function AnimatedCardDescription({ className, ...props }, ref) {
  return (
    <p
      className={cn(
        "col-start-1 row-start-2 text-pretty text-muted-foreground text-sm leading-relaxed",
        className
      )}
      data-slot="animated-card-description"
      ref={ref}
      {...props}
    />
  )
})
AnimatedCardDescription.displayName = "AnimatedCardDescription"

function AnimatedCardAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      data-slot="animated-card-action"
      {...props}
    />
  )
}
AnimatedCardAction.displayName = "AnimatedCardAction"

function AnimatedCardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex min-h-0 flex-col gap-3", className)}
      data-slot="animated-card-content"
      {...props}
    />
  )
}
AnimatedCardContent.displayName = "AnimatedCardContent"

function AnimatedCardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-wrap items-center justify-end gap-2", className)}
      data-slot="animated-card-footer"
      {...props}
    />
  )
}
AnimatedCardFooter.displayName = "AnimatedCardFooter"

export interface AnimatedCardButtonProps
  extends Omit<ComponentProps<typeof ButtonPrimitive>, "children"> {
  children: ReactNode
  /**
   * `primary` — animated gradient rim + frosted fill (matches card chrome).
   * `secondary` — muted surface, high-contrast `text-foreground`, subtle gradient ring (e.g. Cancel).
   */
  variant?: "primary" | "secondary"
  size?: "default" | "icon"
}

const AnimatedCardButton = forwardRef<
  HTMLButtonElement,
  AnimatedCardButtonProps
>(function AnimatedCardButton(
  {
    children,
    className,
    variant = "primary",
    size = "default",
    disabled,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    style,
    type,
    ...props
  },
  ref
) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const reduceMotion = useReducedMotion() ?? false

  const rimEmphasis = isHovered || isFocused

  const borderGlow = useMemo(
    () => borderGlowConfig(true, rimEmphasis),
    [rimEmphasis]
  )

  const fillBackground = useMemo(
    () => fillBackgroundFor(true, true, rimEmphasis),
    [rimEmphasis]
  )

  if (variant === "secondary") {
    return (
      <div
        className={cn("relative inline-flex max-w-full", className)}
        data-slot="animated-card-button"
        data-variant="secondary"
      >
        <div
          className={cn(
            "rounded-full p-px transition-opacity duration-200 ease-out",
            "fine-hover:opacity-100 opacity-95",
            "[background:linear-gradient(135deg,rgba(255,0,128,0.42),rgba(121,40,202,0.32),rgba(0,212,255,0.38))]",
            "dark:[background:linear-gradient(135deg,rgba(232,121,249,0.32),rgba(167,139,250,0.28),rgba(34,211,238,0.35))]"
          )}
        >
          <ButtonPrimitive
            className={cn(
              "relative flex min-w-0 select-none items-center justify-center rounded-full",
              "border border-border/90 bg-muted font-medium text-foreground text-sm tracking-tight antialiased",
              "shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_1px_2px_rgba(0,0,0,0.06)]",
              "dark:border-border dark:bg-muted dark:text-foreground",
              "fine-hover:hover:border-ring/50 fine-hover:hover:bg-accent fine-hover:hover:text-accent-foreground",
              "outline-none transition-[background-color,border-color,box-shadow,color,transform] duration-200 ease-out",
              "focus-visible:border-ring/70 focus-visible:ring-2 focus-visible:ring-ring/30 dark:focus-visible:border-zinc-500/45",
              "enabled:active:scale-[0.96] motion-reduce:enabled:active:scale-100",
              "disabled:pointer-events-none disabled:opacity-50",
              size === "icon"
                ? "size-11 p-0 [&_svg]:shrink-0"
                : "min-h-11 px-6 py-2.5"
            )}
            disabled={disabled}
            onBlur={(e) => {
              setIsFocused(false)
              onBlur?.(e)
            }}
            onFocus={(e) => {
              setIsFocused(true)
              onFocus?.(e)
            }}
            onMouseEnter={(e) => {
              setIsHovered(true)
              onMouseEnter?.(e)
            }}
            onMouseLeave={(e) => {
              setIsHovered(false)
              onMouseLeave?.(e)
            }}
            ref={ref}
            type={type ?? "button"}
            {...props}
          >
            {children}
          </ButtonPrimitive>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn("relative inline-flex max-w-full", className)}
      data-slot="animated-card-button"
      data-variant="primary"
    >
      <div className="relative rounded-full p-px">
        <GradientRimPillBlobs
          borderGlow={borderGlow}
          reduceMotion={reduceMotion}
        />
        <ButtonPrimitive
          className={cn(
            "relative flex min-w-0 select-none items-center justify-center rounded-full",
            "border border-border/90",
            "shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_1px_2px_rgba(0,0,0,0.04),0_4px_14px_rgba(0,0,0,0.05)]",
            "dark:border-border dark:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_1px_2px_rgba(0,0,0,0.35),0_4px_20px_rgba(0,0,0,0.35)]",
            "outline-none transition-[transform,background-color,backdrop-filter,border-color,box-shadow] duration-200 ease-out",
            "fine-hover:hover:border-ring/50 fine-hover:hover:shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_2px_6px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]",
            "dark:fine-hover:hover:border-zinc-500/60 dark:fine-hover:hover:shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_4px_12px_rgba(0,0,0,0.45),0_12px_32px_rgba(0,0,0,0.45)]",
            "focus-visible:border-ring/70 focus-visible:ring-2 focus-visible:ring-ring/30 dark:focus-visible:border-zinc-500/45",
            "enabled:active:scale-[0.96] motion-reduce:enabled:active:scale-100",
            "disabled:pointer-events-none disabled:opacity-50",
            "backdrop-blur-xl backdrop-saturate-150",
            "font-medium text-foreground text-sm tracking-tight antialiased",
            size === "icon"
              ? "size-11 p-0 [&_svg]:shrink-0"
              : "min-h-11 gap-2 px-6 py-2.5"
          )}
          disabled={disabled}
          onBlur={(e) => {
            setIsFocused(false)
            onBlur?.(e)
          }}
          onFocus={(e) => {
            setIsFocused(true)
            onFocus?.(e)
          }}
          onMouseEnter={(e) => {
            setIsHovered(true)
            onMouseEnter?.(e)
          }}
          onMouseLeave={(e) => {
            setIsHovered(false)
            onMouseLeave?.(e)
          }}
          ref={ref}
          style={{
            ...style,
            background: fillBackground,
          }}
          type={type ?? "button"}
          {...props}
        >
          {children}
        </ButtonPrimitive>
      </div>
    </div>
  )
})

AnimatedCardButton.displayName = "AnimatedCardButton"

/** @deprecated Use `AnimatedCard` — alias kept for existing imports. */
const AnimatedCardPolished = AnimatedCard

/** @deprecated Use `AnimatedCardProps` */
export type AnimatedCardPolishedProps = AnimatedCardProps

export {
  AnimatedCard,
  AnimatedCardAction,
  AnimatedCardButton,
  AnimatedCardContent,
  AnimatedCardDescription,
  AnimatedCardFooter,
  AnimatedCardHeader,
  /** @deprecated Use `AnimatedCard` */
  AnimatedCardPolished,
  AnimatedCardTitle,
}
