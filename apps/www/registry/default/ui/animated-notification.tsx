"use client"

/**
 * Polished notification surface (`AnimatedPolishedToastSurface`) and
 * {@link AnimatedPolishedNotification} — slide + fade shell for local
 * `<AnimatePresence>` use. Self-contained {@link AnimatedCard}, rim variants, and
 * glyph stagger (no imports from `animated-card.tsx`). App-wide Sonner toasts:
 * `@/components/cult-pro/animated-toast`.
 */
import {
  forwardRef,
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { XIcon } from "lucide-react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react"

import { cn } from "@/lib/utils"

/* ─── Rim + card chrome (self-contained; no animated-card import) ─── */

const paddingClass = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const

const BORDER_TRAIL_LOOP_MS = 5250

/** Inner corner radius for content inside `rounded-2xl` + `p-px` (concentric nested radii). */
const CARD_INNER_RADIUS_CLASS = "rounded-[calc(1rem-1px)]"

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

function NotificationCardBorderTrail({
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

function notificationBorderGlowConfig(
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

type NotificationBorderGlowState = ReturnType<
  typeof notificationBorderGlowConfig
>

function NotificationCardRimBlobs({
  borderGlow,
  reduceMotion,
}: {
  borderGlow: NotificationBorderGlowState
  reduceMotion: boolean
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        CARD_INNER_RADIUS_CLASS
      )}
    >
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

function notificationFillBackgroundFor(
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

interface NotificationAnimatedCardProps extends ComponentProps<"div"> {
  children: ReactNode
  translucent?: boolean
  interactive?: boolean
  padding?: keyof typeof paddingClass
  rimVariant?: RimVariant
}

const AnimatedCard = forwardRef<HTMLDivElement, NotificationAnimatedCardProps>(
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
      () => notificationBorderGlowConfig(translucent, rimEmphasis, rimVariant),
      [translucent, rimEmphasis, rimVariant]
    )

    const fillBackground = useMemo(
      () =>
        notificationFillBackgroundFor(translucent, interactive, rimEmphasis),
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
        data-slot="notification-animated-card"
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
          <NotificationCardRimBlobs
            borderGlow={borderGlow}
            reduceMotion={reduceMotion}
          />

          <div
            className={cn(
              "relative z-0 flex flex-col gap-6 border border-border/90",
              CARD_INNER_RADIUS_CLASS,
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
            data-slot="notification-animated-card-surface"
            style={{ background: fillBackground }}
          >
            {children}
          </div>

          {showTrailChrome ? (
            <div
              className={cn(
                "pointer-events-none absolute inset-0 z-10",
                CARD_INNER_RADIUS_CLASS
              )}
            >
              <NotificationCardBorderTrail
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

/* ─── Notification surface ─── */

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
  /** Bump when the message identity changes so stagger replays. */
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

export interface AnimatedPolishedToastSurfaceProps {
  title: string
  description?: string
  /**
   * Change when the notification shows a new message so title/body stagger replay.
   * Defaults to `title` + `description` (stable for identical copy).
   */
  messageKey?: string
  /** `status` for non-urgent updates; `alert` for urgent/interruptive content. */
  politeness?: "status" | "alert"
  onDismiss?: () => void
  /** Forwarded to the local `AnimatedCard`. */
  translucent?: boolean
  /** Rim blob + border-trail palette (success / error vs default). */
  rimVariant?: RimVariant
  className?: string
}

/**
 * Card + staggered text + optional dismiss — use inside Sonner `toast.custom`, or wrap with
 * `AnimatedPolishedNotification` for local AnimatePresence.
 */
export function AnimatedPolishedToastSurface({
  title,
  description,
  messageKey: messageKeyProp,
  politeness = "status",
  onDismiss,
  translucent = true,
  rimVariant = "default",
  className,
}: AnimatedPolishedToastSurfaceProps) {
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
        interactive={Boolean(onDismiss)}
        padding="sm"
        rimVariant={rimVariant}
        translucent={translucent}
      >
        <div className="flex gap-3">
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
          {onDismiss ? (
            <ButtonPrimitive
              aria-label="Dismiss notification"
              className={cn(
                "-mt-1 -mr-1 relative inline-flex size-8 shrink-0 items-center justify-center rounded-full",
                "text-muted-foreground transition-colors",
                "fine-hover:hover:bg-muted/80 fine-hover:hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
              onClick={onDismiss}
              type="button"
            >
              <XIcon aria-hidden className="size-4" />
            </ButtonPrimitive>
          ) : null}
        </div>
      </AnimatedCard>
    </div>
  )
}

const ENTER_EXIT_SEC = 0.2
const ENTER_EXIT_SEC_REDUCED = 0.12

const slideOffsetPx = 12

export interface AnimatedPolishedNotificationProps
  extends AnimatedPolishedToastSurfaceProps,
    Omit<ComponentProps<typeof motion.div>, "children" | "title"> {
  /** Slide direction for enter/exit (`transform: translateY`). */
  slideFrom?: "top" | "bottom"
}

export const AnimatedPolishedNotification = forwardRef<
  HTMLDivElement,
  AnimatedPolishedNotificationProps
>(function AnimatedPolishedNotification(
  {
    title,
    description,
    messageKey,
    politeness,
    onDismiss,
    slideFrom = "bottom",
    translucent,
    rimVariant,
    className,
    ...motionProps
  },
  ref
) {
  const reduceMotion = useReducedMotion() ?? false
  const travelY = slideFrom === "top" ? -slideOffsetPx : slideOffsetPx
  const duration = reduceMotion ? ENTER_EXIT_SEC_REDUCED : ENTER_EXIT_SEC
  const { animate, exit, initial, transition, ...restMotionProps } = motionProps

  return (
    <motion.div
      animate={animate ?? { opacity: 1, y: 0 }}
      exit={exit ?? { opacity: 0, y: travelY }}
      initial={initial ?? { opacity: 0, y: travelY }}
      ref={ref}
      transition={transition ?? { duration, ease: "easeOut" }}
      {...restMotionProps}
    >
      <AnimatedPolishedToastSurface
        className={className}
        description={description}
        messageKey={messageKey}
        onDismiss={onDismiss}
        politeness={politeness}
        rimVariant={rimVariant}
        title={title}
        translucent={translucent}
      />
    </motion.div>
  )
})

AnimatedPolishedNotification.displayName = "AnimatedPolishedNotification"
