"use client"

/**
 * Primary action button matching `HaloSearchInput` polish: animated gradient
 * rim, frosted fill, staggered label, loading text + trailing spinner crossfade.
 */
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

const LABEL_STAGGER_SEC = 0.018
const LABEL_CHAR_DURATION_SEC = 0.16
const DEFAULT_LOADING_STAGGER_SEC = 0.038
const DEFAULT_LOADING_CHAR_DURATION_SEC = 0.36
const TRAILING_EXIT_DURATION_SEC = 0.2

/** Layout spring: smooth width when label/spinner changes; bounce kept low per motion skill. */
const layoutSpring = {
  type: "spring" as const,
  bounce: 0.12,
  damping: 34,
  stiffness: 420,
}

const trailingExitTransition = (reduceMotion: boolean) => ({
  duration: reduceMotion ? 0 : TRAILING_EXIT_DURATION_SEC,
  ease: "easeOut" as const,
})

const trailingCrossfade = (reduceMotion: boolean) => ({
  exit: {
    opacity: reduceMotion ? 1 : 0,
    scale: reduceMotion ? 1 : 0.88,
  },
  initial: {
    opacity: reduceMotion ? 1 : 0,
    scale: reduceMotion ? 1 : 0.88,
  },
})

function ButtonSpinner({
  className,
  reduceMotion,
}: {
  className?: string
  reduceMotion: boolean
}) {
  return (
    <span
      className={cn(
        "inline-flex origin-center text-muted-foreground",
        !reduceMotion && "animate-spin",
        className
      )}
    >
      <svg
        aria-hidden="true"
        className="h-3.5 w-3.5"
        focusable="false"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-[0.22]"
          cx="12"
          cy="12"
          fill="none"
          r="9"
          stroke="currentColor"
          strokeWidth="2.25"
        />
        <circle
          cx="12"
          cy="12"
          fill="none"
          r="9"
          stroke="currentColor"
          strokeDasharray="14 42"
          strokeLinecap="round"
          strokeWidth="2.25"
        />
      </svg>
    </span>
  )
}

function StaggeredTextLabel({
  text,
  reduceMotion,
  staggerSec = LABEL_STAGGER_SEC,
  charDurationSec = LABEL_CHAR_DURATION_SEC,
}: {
  text: string
  reduceMotion: boolean
  staggerSec?: number
  charDurationSec?: number
}) {
  const chars = useMemo(() => {
    const counts = new Map<string, number>()
    return Array.from(text, (char) => {
      const count = counts.get(char) ?? 0
      counts.set(char, count + 1)
      return { char, key: `${char}-${count}` }
    })
  }, [text])

  return (
    <motion.span
      animate="visible"
      className="inline-flex items-center font-medium text-foreground text-sm tracking-tight antialiased"
      initial="hidden"
      key={text}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduceMotion ? 0 : staggerSec,
          },
        },
      }}
    >
      {chars.map((glyph) => (
        <motion.span
          className="inline-block whitespace-pre"
          key={glyph.key}
          transition={{
            duration: reduceMotion ? 0 : charDurationSec,
            ease: "easeOut",
          }}
          variants={{
            hidden: { opacity: reduceMotion ? 1 : 0 },
            visible: { opacity: 1 },
          }}
        >
          {glyph.char}
        </motion.span>
      ))}
    </motion.span>
  )
}

function TrailingLoadingSlot({
  reduceMotion,
  reveal,
}: {
  reduceMotion: boolean
  reveal: boolean
}) {
  const cross = trailingCrossfade(reduceMotion)
  return (
    <motion.div
      animate={
        reveal
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: reduceMotion ? 1 : 0.88 }
      }
      aria-hidden
      className={cn(
        "absolute inset-0 flex items-center justify-center rounded-full",
        "pointer-events-none bg-muted text-muted-foreground shadow-foreground/10 shadow-sm ring-1 ring-foreground/10"
      )}
      exit={{ ...cross.exit, transition: trailingExitTransition(reduceMotion) }}
      initial={cross.initial}
      key="trailing-loading"
      transition={
        reduceMotion
          ? { duration: 0 }
          : reveal
            ? { ...layoutSpring }
            : { duration: 0 }
      }
    >
      <ButtonSpinner reduceMotion={reduceMotion} />
    </motion.div>
  )
}

export interface HaloButtonProps
  extends Omit<ComponentProps<typeof ButtonPrimitive>, "children"> {
  children: ReactNode
  /** Frosted inner surface so gradient blobs read through (matches search translucent mode). */
  translucent?: boolean
  /** Shows trailing spinner and sets `aria-busy`; label switches to `loadingText`. */
  isLoading?: boolean
  /** Copy shown while `isLoading` (staggered when `staggerLabel` is true). */
  loadingText?: string
  /** Stagger between loading glyphs (seconds). */
  loadingStaggerSec?: number
  /** Duration of each loading glyph fade-in (seconds). */
  loadingCharDurationSec?: number
  /**
   * When `children` is a string, replay character stagger on change.
   * Ignored for non-string children.
   */
  staggerLabel?: boolean
  className?: string
}

export function HaloButton({
  children,
  className,
  translucent = true,
  isLoading = false,
  loadingText = "Working…",
  loadingStaggerSec = DEFAULT_LOADING_STAGGER_SEC,
  loadingCharDurationSec = DEFAULT_LOADING_CHAR_DURATION_SEC,
  staggerLabel = true,
  disabled,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  style,
  ...props
}: HaloButtonProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  /** Spinner fades in only after outer `layout` width animation finishes (avoids leading the expansion). */
  const [trailingRevealReady, setTrailingRevealReady] = useState(false)
  const reduceMotion = useReducedMotion() ?? false
  const isLoadingRef = useRef(isLoading)
  isLoadingRef.current = isLoading

  useEffect(() => {
    if (!isLoading) {
      setTrailingRevealReady(false)
      return
    }
    if (reduceMotion) {
      setTrailingRevealReady(true)
    }
  }, [isLoading, reduceMotion])

  /** If layout completion never fires (e.g. zero delta), still reveal the spinner. */
  useEffect(() => {
    if (!isLoading || reduceMotion) {
      return
    }
    const id = window.setTimeout(() => {
      setTrailingRevealReady(true)
    }, 480)
    return () => window.clearTimeout(id)
  }, [isLoading, reduceMotion])

  /** `disabled` + `pointer-events-none` while loading can strand `isHovered`; ignore hover then. */
  const hoverAllowed = !(disabled || isLoading)
  const rimEmphasis = isFocused || (isHovered && hoverAllowed)

  const borderGlow = useMemo(() => {
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
  }, [translucent, rimEmphasis])

  const labelIsString = typeof children === "string"
  const showTrailing = isLoading

  const labelContent = (() => {
    if (isLoading) {
      if (staggerLabel) {
        return (
          <StaggeredTextLabel
            charDurationSec={loadingCharDurationSec}
            reduceMotion={reduceMotion}
            staggerSec={loadingStaggerSec}
            text={loadingText}
          />
        )
      }
      return (
        <span className="font-medium text-foreground text-sm tracking-tight antialiased">
          {loadingText}
        </span>
      )
    }
    if (labelIsString && staggerLabel) {
      return <StaggeredTextLabel reduceMotion={reduceMotion} text={children} />
    }
    return (
      <span className="font-medium text-foreground text-sm tracking-tight antialiased">
        {children}
      </span>
    )
  })()

  let fillBackground: string
  if (translucent) {
    if (isHovered && hoverAllowed) {
      fillBackground =
        "linear-gradient(to bottom, color-mix(in oklch, var(--card) 88%, transparent) 0%, color-mix(in oklch, var(--card) 74%, transparent) 100%)"
    } else {
      fillBackground =
        "linear-gradient(to bottom, color-mix(in oklch, var(--card) 82%, transparent) 0%, color-mix(in oklch, var(--card) 70%, transparent) 100%)"
    }
  } else if (isHovered && hoverAllowed) {
    fillBackground =
      "linear-gradient(to bottom, var(--card) 0%, color-mix(in oklch, var(--card) 90%, var(--muted)) 100%)"
  } else {
    fillBackground =
      "linear-gradient(to bottom, var(--card) 0%, color-mix(in oklch, var(--card) 94%, var(--muted)) 100%)"
  }

  return (
    <motion.div
      className={cn("relative inline-flex max-w-full", className)}
      layout={!reduceMotion}
      transition={reduceMotion ? undefined : { layout: layoutSpring }}
      onLayoutAnimationComplete={() => {
        if (isLoadingRef.current && !reduceMotion) {
          setTrailingRevealReady(true)
        }
      }}
    >
      <div className="relative rounded-full p-px">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <motion.div
            animate={{
              opacity: borderGlow.opacityIdle,
            }}
            className="absolute inset-x-0 bottom-0 h-1/2"
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <motion.div
              animate={{
                left: borderGlow.primaryLeft,
              }}
              className="-bottom-4 absolute h-16 w-48 blur-xl"
              style={{
                background: borderGlow.primaryBg,
              }}
              transition={{
                duration: borderGlow.durationMain,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              animate={{
                left: borderGlow.secondaryLeft,
              }}
              className="-bottom-3 absolute h-12 w-32 blur-lg"
              style={{
                background: borderGlow.secondaryBg,
              }}
              transition={{
                duration: borderGlow.durationSec,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              animate={{
                left: borderGlow.tertiaryLeft,
              }}
              className="-bottom-2 absolute h-10 w-24 blur-lg"
              style={{
                background: borderGlow.tertiaryBg,
              }}
              transition={{
                duration: borderGlow.durationTer,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        <ButtonPrimitive
          aria-busy={isLoading || undefined}
          className={cn(
            "relative flex min-h-11 min-w-0 select-none items-center gap-2.5 rounded-full px-6 py-2.5",
            "border border-border/90",
            "shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_1px_2px_rgba(0,0,0,0.04),0_4px_14px_rgba(0,0,0,0.05)]",
            "dark:border-border dark:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_1px_2px_rgba(0,0,0,0.35),0_4px_20px_rgba(0,0,0,0.35)]",
            "outline-none focus-visible:border-ring/70 focus-visible:ring-2 focus-visible:ring-ring/30 dark:focus-visible:border-zinc-500/45",
            "transition-[transform,background-color,backdrop-filter,border-color,box-shadow] duration-200 ease-out",
            "fine-hover:hover:border-ring/50 fine-hover:hover:shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_2px_6px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]",
            "dark:fine-hover:hover:border-zinc-500/60 dark:fine-hover:hover:shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_4px_12px_rgba(0,0,0,0.45),0_12px_32px_rgba(0,0,0,0.45)]",
            "enabled:active:scale-[0.96] motion-reduce:enabled:active:scale-100",
            "disabled:pointer-events-none disabled:opacity-50",
            translucent && "backdrop-blur-xl backdrop-saturate-150"
          )}
          disabled={disabled || isLoading}
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
          style={{
            ...style,
            background: fillBackground,
          }}
          {...props}
        >
          <span className="flex min-w-0 flex-1 items-center justify-center gap-2">
            {labelContent}
          </span>

          {showTrailing ? (
            <div className="relative size-7 shrink-0">
              <AnimatePresence initial={false} mode="popLayout">
                <TrailingLoadingSlot
                  reduceMotion={reduceMotion}
                  reveal={trailingRevealReady}
                />
              </AnimatePresence>
            </div>
          ) : null}
        </ButtonPrimitive>
      </div>
    </motion.div>
  )
}
