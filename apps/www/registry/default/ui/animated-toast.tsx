"use client"

/**
 * Standalone Sonner-backed polished toasts: self-contained {@link AnimatedCard},
 * rim variants, glyph stagger, and Sonner helpers (no imports from `animated-card.tsx`).
 * Mount {@link PolishedToaster} once in the root layout.
 *
 * For `toast.promise` etc., import `toast` from `"sonner"` and use `toast.custom`
 * with {@link PolishedToastSurface} the same way as {@link showPolishedToast}.
 * Pass the custom callback’s `id` as `toastId` and set `closeButton` when you want
 * an explicit dismiss control (Sonner’s host close button does not render inside
 * custom JSX).
 */
import {
  forwardRef,
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react"
import type { ExternalToast } from "sonner"
import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner"

import "sonner/dist/styles.css"

import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/* ─── Rim + card chrome (duplicated from animated-card for this module) ─── */

const paddingClass = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const

const BORDER_TRAIL_LOOP_MS = 5250

export type RimVariant = "default" | "success" | "destructive"

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

interface BorderTrailChrome {
  ambientGradient: string
  ambientGlow: string
  coreGradient: string
  coreGlow: string
}

const RIM_BORDER_TRAIL: Record<RimVariant, BorderTrailChrome> = {
  default: {
    ambientGradient:
      "linear-gradient(90deg, transparent 0%, rgba(255,0,128,0) 6%, rgba(255,0,128,0.38) 24%, rgba(121,40,202,0.5) 50%, rgba(0,212,255,0.42) 76%, rgba(0,212,255,0) 94%, transparent 100%)",
    coreGradient:
      "linear-gradient(90deg, transparent 0%, rgba(255,0,128,0.72) 20%, rgba(200,140,255,0.92) 50%, rgba(0,212,255,0.78) 80%, transparent 100%)",
    ambientGlow:
      "0 0 22px rgba(121,40,202,0.28), 0 0 44px rgba(0,212,255,0.18), 0 0 2px rgba(255,255,255,0.12)",
    coreGlow:
      "0 0 14px rgba(255,0,128,0.35), 0 0 28px rgba(0,212,255,0.32), inset 0 0 1px rgba(255,255,255,0.22)",
  },
  success: {
    ambientGradient:
      "linear-gradient(90deg, transparent 0%, rgba(5,150,105,0) 6%, rgba(16,185,129,0.36) 24%, rgba(20,184,166,0.48) 50%, rgba(13,148,136,0.4) 76%, rgba(13,148,136,0) 94%, transparent 100%)",
    coreGradient:
      "linear-gradient(90deg, transparent 0%, rgba(5,150,105,0.68) 20%, rgba(52,211,153,0.88) 50%, rgba(20,184,166,0.8) 80%, transparent 100%)",
    ambientGlow:
      "0 0 22px rgba(16,185,129,0.32), 0 0 44px rgba(13,148,136,0.22), 0 0 2px rgba(255,255,255,0.1)",
    coreGlow:
      "0 0 14px rgba(5,150,105,0.42), 0 0 28px rgba(20,184,166,0.4), inset 0 0 1px rgba(255,255,255,0.2)",
  },
  destructive: {
    ambientGradient:
      "linear-gradient(90deg, transparent 0%, rgba(220,38,38,0) 6%, rgba(220,38,38,0.4) 24%, rgba(244,63,94,0.52) 50%, rgba(190,18,60,0.44) 76%, rgba(190,18,60,0) 94%, transparent 100%)",
    coreGradient:
      "linear-gradient(90deg, transparent 0%, rgba(220,38,38,0.75) 20%, rgba(251,113,133,0.9) 50%, rgba(244,63,94,0.82) 80%, transparent 100%)",
    ambientGlow:
      "0 0 22px rgba(220,38,38,0.35), 0 0 44px rgba(244,63,94,0.24), 0 0 2px rgba(255,255,255,0.08)",
    coreGlow:
      "0 0 14px rgba(220,38,38,0.48), 0 0 28px rgba(244,63,94,0.4), inset 0 0 1px rgba(255,255,255,0.16)",
  },
}

function ToastCardBorderTrail({
  active,
  rimVariant = "default",
}: {
  active: boolean
  rimVariant?: RimVariant
}) {
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

  const trail = RIM_BORDER_TRAIL[rimVariant]

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]",
        active ? "visible opacity-100" : "invisible opacity-0"
      )}
    >
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
            background: trail.ambientGradient,
            boxShadow: trail.ambientGlow,
          }}
        />
      </motion.div>
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
            background: trail.coreGradient,
            boxShadow: trail.coreGlow,
          }}
        />
      </motion.div>
    </div>
  )
}

function toastBorderGlowConfig(
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

type ToastBorderGlowState = ReturnType<typeof toastBorderGlowConfig>

function ToastCardRimBlobs({
  borderGlow,
  reduceMotion,
}: {
  borderGlow: ToastBorderGlowState
  reduceMotion: boolean
}) {
  return (
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
  )
}

function toastFillBackgroundFor(
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

interface ToastAnimatedCardProps extends ComponentProps<"div"> {
  children: ReactNode
  translucent?: boolean
  interactive?: boolean
  padding?: keyof typeof paddingClass
  rimVariant?: RimVariant
}

const AnimatedCard = forwardRef<HTMLDivElement, ToastAnimatedCardProps>(
  function AnimatedCard(
    {
      children,
      className,
      translucent = true,
      interactive = true,
      padding = "md",
      rimVariant = "default",
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
      () => toastBorderGlowConfig(translucent, rimEmphasis, rimVariant),
      [translucent, rimEmphasis, rimVariant]
    )

    const fillBackground = useMemo(
      () => toastFillBackgroundFor(translucent, interactive, rimEmphasis),
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
        data-slot="toast-animated-card"
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
          <ToastCardRimBlobs
            borderGlow={borderGlow}
            reduceMotion={reduceMotion}
          />

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
            data-slot="toast-animated-card-surface"
            style={{ background: fillBackground }}
          >
            {children}
          </div>

          {showTrailChrome ? (
            <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl">
              <ToastCardBorderTrail
                active={trailActive}
                rimVariant={rimVariant}
              />
            </div>
          ) : null}
        </div>
      </div>
    )
  }
)

AnimatedCard.displayName = "AnimatedCard"

/* ─── Toast copy + Sonner ─── */

const GLYPH_STAGGER_SEC = 0.018
const GLYPH_DURATION_SEC = 0.16

function StaggeredGlyphLine({
  as: Tag = "span",
  className,
  delayChildrenSec = 0,
  messageKey,
  reduceMotion,
  text,
}: {
  as?: "span" | "p"
  className?: string
  delayChildrenSec?: number
  messageKey: string
  reduceMotion: boolean
  text: string
}) {
  const chars = useMemo(() => {
    const counts = new Map<string, number>()
    return Array.from(text, (char) => {
      const count = counts.get(char) ?? 0
      counts.set(char, count + 1)
      return { char, key: `${char}-${count}` }
    })
  }, [text])

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>
  }

  const MotionOuter = Tag === "p" ? motion.p : motion.span

  return (
    <MotionOuter
      animate="visible"
      className={cn(Tag === "p" && "block", className)}
      initial="hidden"
      key={`${messageKey}-${text}`}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delayChildrenSec,
            staggerChildren: GLYPH_STAGGER_SEC,
          },
        },
      }}
    >
      {chars.map((glyph) => (
        <motion.span
          className="inline"
          key={glyph.key}
          transition={{
            duration: GLYPH_DURATION_SEC,
            ease: "easeOut",
          }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          {glyph.char}
        </motion.span>
      ))}
    </MotionOuter>
  )
}

function approximatePriorLineStaggerEndSec(
  text: string,
  reduceMotion: boolean
) {
  if (reduceMotion || text.length === 0) {
    return 0
  }
  const n = text.length
  const gapCount = Math.max(0, n - 1)
  return gapCount * GLYPH_STAGGER_SEC + GLYPH_DURATION_SEC
}

export interface PolishedToastSurfaceProps {
  title: string
  description?: string
  messageKey?: string
  politeness?: "status" | "alert"
  translucent?: boolean
  rimVariant?: RimVariant
  /** Sonner toast id from `toast.custom((id) => …)`; required for the dismiss control. */
  toastId?: number | string
  /** When true (default with {@link showPolishedToast}), renders a Dismiss control. */
  closeButton?: boolean
  className?: string
}

/**
 * Card + staggered title/body — for Sonner `toast.custom`. For a close control,
 * pass `toastId` from the custom renderer and `closeButton` (see {@link showPolishedToast}).
 */
export function PolishedToastSurface({
  title,
  description,
  messageKey: messageKeyProp,
  politeness = "status",
  translucent = true,
  rimVariant = "default",
  toastId,
  closeButton = false,
  className,
}: PolishedToastSurfaceProps) {
  const reduceMotion = useReducedMotion() ?? false
  const messageKey = messageKeyProp ?? `${title}\0${description ?? ""}`

  const bodyDelaySec = useMemo(
    () => approximatePriorLineStaggerEndSec(title, reduceMotion) * 0.35,
    [title, reduceMotion]
  )

  const ariaLive = politeness === "alert" ? "assertive" : "polite"

  return (
    <div
      aria-live={ariaLive}
      className={cn("w-full", className)}
      role={politeness === "alert" ? "alert" : "status"}
    >
      <AnimatedCard
        aria-label={politeness === "alert" ? "Alert" : "Notification"}
        className="text-left"
        interactive
        padding="sm"
        rimVariant={rimVariant}
        translucent={translucent}
      >
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1 space-y-1.5">
            <StaggeredGlyphLine
              as="p"
              className="text-balance font-semibold text-foreground text-sm leading-snug antialiased"
              messageKey={messageKey}
              reduceMotion={reduceMotion}
              text={title}
            />
            {description ? (
              <StaggeredGlyphLine
                as="p"
                className="text-pretty text-muted-foreground text-sm leading-relaxed"
                delayChildrenSec={bodyDelaySec}
                messageKey={messageKey}
                reduceMotion={reduceMotion}
                text={description}
              />
            ) : null}
          </div>
          {closeButton && toastId != null ? (
            <Button
              className="-mt-1 size-8 rounded-full border border-border bg-card/30 p-0"
              onClick={() => {
                sonnerToast.dismiss(toastId)
              }}
              size="icon"
              type="button"
              variant="ghost"
            >
              <XIcon className="size-4" />
            </Button>
          ) : null}
        </div>
      </AnimatedCard>
    </div>
  )
}

export type PolishedToastOptions = Omit<ExternalToast, "description"> & {
  title: string
  description?: string
  messageKey?: string
  politeness?: "status" | "alert"
  rimVariant?: RimVariant
}

function buildMessageKey(o: PolishedToastOptions) {
  return o.messageKey ?? `${o.title}\0${o.description ?? ""}`
}

export function showPolishedToast(options: PolishedToastOptions) {
  const {
    title,
    description,
    messageKey,
    politeness = "status",
    rimVariant = "default",
    duration,
    closeButton = true,
    className: toastClassName,
    ...rest
  } = options

  const mk = buildMessageKey({ ...options, messageKey })

  return sonnerToast.custom(
    (id) => (
      <PolishedToastSurface
        closeButton={closeButton}
        description={description}
        messageKey={mk}
        politeness={politeness}
        rimVariant={rimVariant}
        title={title}
        toastId={id}
      />
    ),
    {
      duration: duration ?? 4000,
      ...rest,
      className: cn(
        "flex w-full max-w-md border-none bg-transparent p-0 shadow-none",
        "[&_[data-content]]:w-full [&_[data-title]]:w-full",
        toastClassName
      ),
    }
  )
}

/**
 * Sonner host for polished custom toasts and standard `toast()` calls.
 * Transparent host chrome for {@link showPolishedToast} is applied per toast in
 * {@link showPolishedToast} so default success/error toasts keep normal styling.
 */
export function PolishedToaster({
  className,
  ...props
}: ComponentProps<typeof SonnerToaster>) {
  return (
    <>
      <SonnerToaster
        className={cn("toaster group polished-sonner", className)}
        closeButton
        gap={12}
        position="bottom-right"
        theme="system"
        {...props}
      />
      <style global jsx>{`
        /*
         * Contained Sonner overrides for polished custom toasts.
         * Keep slide/height animation, disable host opacity premultiply flash.
         */
        [data-sonner-toaster].polished-sonner [data-sonner-toast] {
          transition:
            transform 400ms,
            height 400ms,
            box-shadow 200ms;
        }
        [data-sonner-toaster].polished-sonner
          [data-sonner-toast][data-mounted="true"]:not([data-removed="true"]) {
          opacity: 1 !important;
        }
        [data-sonner-toaster].polished-sonner
          [data-sonner-toast][data-removed="true"][data-front="true"] {
          transition:
            transform 400ms,
            opacity 200ms;
        }
        [data-sonner-toaster].polished-sonner [data-sonner-toast] > * {
          transition: none !important;
        }
      `}</style>
    </>
  )
}
