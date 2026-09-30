"use client"

/**
 * Animated search field with gradient border polish — tuned for both light and
 * dark themes using design tokens (`card`, `border`, `foreground`, etc.).
 */
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentProps,
  type InputHTMLAttributes,
} from "react"
import { Warp, type WarpProps } from "@paper-design/shaders-react"
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react"

import { cn } from "@/lib/utils"

/** Placeholder line: snappy stagger. */
const PLACEHOLDER_STAGGER_SEC = 0.018
const PLACEHOLDER_CHAR_DURATION_SEC = 0.16

/** Loading line: longer, more deliberate reveal (parent can override). */
const DEFAULT_LOADING_STAGGER_SEC = 0.038
const DEFAULT_LOADING_CHAR_DURATION_SEC = 0.36

/** Clear control ↔ spinner crossfade / shared layout (ease-out ~200ms). */
const TRAILING_ACTION_DURATION_SEC = 0.2

/** Caps right-to-left deletion stagger so long clears stay snappy and teardown stays in sync. */
const DELETION_MAX_STAGGER_SPAN_SEC = 0.85

/**
 * Per-glyph blur timing for `DeletedTextBlurReveal` and `scheduleDeletionEnd`.
 * Compresses delay steps when `(staggerGlyphCount - 1) * step` would exceed the cap.
 */
function getDeletionGlyphTiming(args: {
  sweepDurationMs: number
  /** Drives speed curve (same as count of glyphs that participate in the effect). */
  animatedCount: number
  /** Full string length used for stagger delays (max index is `length - 1`). */
  staggerGlyphCount: number
}) {
  const sweepDurationSec = args.sweepDurationMs / 1000
  const animatedCount = Math.max(1, args.animatedCount)
  const staggerCount = Math.max(1, args.staggerGlyphCount)

  const normalizedLength = Math.min(1, Math.max(0, (animatedCount - 1) / 60))
  const easeOutLength = 1 - (1 - normalizedLength) ** 3
  const speedFactor = 1 - 0.6 * easeOutLength

  const glyphDurationSec = Math.max(
    0.12,
    Math.max(0.22, sweepDurationSec * 0.45) * speedFactor
  )
  let glyphDelayStepSec = Math.max(
    0.004,
    Math.max(0.012, sweepDurationSec * 0.03) * speedFactor
  )

  const gapCount = Math.max(0, staggerCount - 1)
  const uncappedStaggerSpan = gapCount * glyphDelayStepSec
  if (
    uncappedStaggerSpan > DELETION_MAX_STAGGER_SPAN_SEC &&
    uncappedStaggerSpan > 0
  ) {
    glyphDelayStepSec *= DELETION_MAX_STAGGER_SPAN_SEC / uncappedStaggerSpan
  }

  const staggerSpanSec = gapCount * glyphDelayStepSec
  return { glyphDurationSec, glyphDelayStepSec, staggerSpanSec }
}

interface AnimatedSearchInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void
  /**
   * Frosted, semi-transparent fill so animated gradient blobs show through more clearly.
   * Also applied automatically while `isLoading` (e.g. after submit until the request finishes).
   */
  blobTranslucent?: boolean
  /**
   * When true, query text is hidden and staggered loading copy is shown (same motion as
   * the placeholder). Parent typically toggles this during async submit.
   */
  isLoading?: boolean
  /** Copy shown while `isLoading`; defaults to “Searching…”. */
  loadingText?: string
  /** Delay between each loading character’s fade-in (seconds). Default 0.038. */
  loadingStaggerSec?: number
  /** Duration of each loading character’s fade-in (seconds). Default 0.36. */
  loadingCharDurationSec?: number
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

/** Small indeterminate ring; Tailwind `animate-spin` avoids fighting parent `layoutId` transforms. */
function SearchFieldSpinner({
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

const trailingMotionTransition = (reduceMotion: boolean) => ({
  duration: reduceMotion ? 0 : TRAILING_ACTION_DURATION_SEC,
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

function TrailingLoadingSlot({ reduceMotion }: { reduceMotion: boolean }) {
  const cross = trailingCrossfade(reduceMotion)
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      aria-hidden
      className={cn(
        "absolute inset-0 flex items-center justify-center rounded-full",
        "pointer-events-none bg-muted text-muted-foreground shadow-foreground/10 shadow-sm ring-1 ring-foreground/10"
      )}
      exit={cross.exit}
      initial={cross.initial}
      key="trailing-loading"
      layoutId="animated-search-trailing"
      transition={trailingMotionTransition(reduceMotion)}
    >
      <SearchFieldSpinner reduceMotion={reduceMotion} />
    </motion.div>
  )
}

function TrailingClearSlot({
  reduceMotion,
  onClear,
}: {
  reduceMotion: boolean
  onClear: () => void
}) {
  const cross = trailingCrossfade(reduceMotion)
  return (
    <motion.button
      animate={{ opacity: 1, scale: 1 }}
      aria-label="Clear search"
      className={cn(
        "absolute inset-0 flex items-center justify-center rounded-full",
        "bg-muted text-muted-foreground",
        "shadow-foreground/10 shadow-sm ring-1 ring-foreground/10",
        "hover:bg-accent hover:text-accent-foreground",
        "transition-[background-color,color] duration-150 ease-out"
      )}
      exit={cross.exit}
      initial={cross.initial}
      key="trailing-clear"
      layoutId="animated-search-trailing"
      onClick={onClear}
      transition={trailingMotionTransition(reduceMotion)}
      type="button"
    >
      <XIcon className="h-3.5 w-3.5" />
    </motion.button>
  )
}

function SearchTrailingAction({
  hasValue,
  isLoading,
  reduceMotion,
  onClear,
}: {
  hasValue: boolean
  isLoading: boolean
  reduceMotion: boolean
  onClear: () => void
}) {
  if (!(hasValue || isLoading)) {
    return null
  }

  return (
    <div className="relative size-6 shrink-0">
      <AnimatePresence initial={false} mode="popLayout">
        {isLoading ? (
          <TrailingLoadingSlot reduceMotion={reduceMotion} />
        ) : (
          <TrailingClearSlot onClear={onClear} reduceMotion={reduceMotion} />
        )}
      </AnimatePresence>
    </div>
  )
}

/** Overlay placeholder: each character fades in with a short stagger (re-mounted via `animateKey`). */
function AnimatedPlaceholder({
  text,
  animateKey,
  reduceMotion,
  staggerSec = PLACEHOLDER_STAGGER_SEC,
  charDurationSec = PLACEHOLDER_CHAR_DURATION_SEC,
}: {
  text: string
  animateKey: number
  reduceMotion: boolean
  /** Seconds between starting each child’s entrance. */
  staggerSec?: number
  /** Seconds for each glyph’s opacity fade-in. */
  charDurationSec?: number
}) {
  // Keys like `a-0`, `a-1` so duplicate letters animate independently and remount cleanly.
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
      className="pointer-events-none absolute inset-y-0 left-0 flex items-center text-muted-foreground"
      initial="hidden"
      key={animateKey}
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

export function AnimatedSearchInput({
  className,
  value,
  onChange,
  onClear,
  placeholder = "Ask anything or search",
  blobTranslucent = false,
  isLoading = false,
  loadingText = "Searching…",
  loadingStaggerSec = DEFAULT_LOADING_STAGGER_SEC,
  loadingCharDurationSec = DEFAULT_LOADING_CHAR_DURATION_SEC,
  disabled,
  readOnly,
  ...props
}: AnimatedSearchInputProps) {
  const showBlobTranslucent = blobTranslucent || isLoading
  const [internalValue, setInternalValue] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  // While true, real input text is hidden and `DeletedTextBlurReveal` shows the last string.
  const [isDeleting, setIsDeleting] = useState(false)
  const [deletionGhostText, setDeletionGhostText] = useState<string | null>(
    null
  )
  // Which code units animate (here: entire string); could be a subset for partial effects.
  const [deletionIndexes, setDeletionIndexes] = useState<number[]>([])
  const [deletionKey, setDeletionKey] = useState(0)
  // Bumps `AnimatedPlaceholder`’s React key so the stagger runs again after a clear.
  const [placeholderAnimKey, setPlaceholderAnimKey] = useState(0)
  const [loadingAnimKey, setLoadingAnimKey] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const deletionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const typingIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isTypingBurst, setIsTypingBurst] = useState(false)
  const wasDeletingRef = useRef(false)
  const wasLoadingRef = useRef(false)
  const reduceMotion = useReducedMotion() ?? false
  const deleteClipDurationMs = 340
  const deleteSweepDurationMs = deleteClipDurationMs + deleteClipDurationMs / 2

  // Controlled when `value` is passed; otherwise internal state mirrors the input.
  const currentValue = value === undefined ? internalValue : value
  const hasValue = String(currentValue).length > 0

  useEffect(() => {
    return () => {
      if (deletionTimerRef.current) {
        clearTimeout(deletionTimerRef.current)
      }
      if (typingIdleTimerRef.current) {
        clearTimeout(typingIdleTimerRef.current)
      }
    }
  }, [])

  // After deletion teardown, replay placeholder entrance once the field is empty again.
  useEffect(() => {
    if (wasDeletingRef.current && !isDeleting && !hasValue) {
      setPlaceholderAnimKey((k) => k + 1)
    }
    wasDeletingRef.current = isDeleting
  }, [hasValue, isDeleting])

  // Replay loading line stagger each time loading starts (same timing as placeholder).
  useEffect(() => {
    if (isLoading && !wasLoadingRef.current) {
      setLoadingAnimKey((k) => k + 1)
    }
    wasLoadingRef.current = isLoading
  }, [isLoading])

  // Tear down overlay only after glyph timings finish (matches `DeletedTextBlurReveal` stagger).
  const scheduleDeletionEnd = useCallback(
    (deletedCount: number) => {
      if (deletionTimerRef.current) {
        clearTimeout(deletionTimerRef.current)
      }

      const { glyphDurationSec, staggerSpanSec } = getDeletionGlyphTiming({
        sweepDurationMs: deleteSweepDurationMs,
        animatedCount: deletedCount,
        staggerGlyphCount: deletedCount,
      })
      const totalGlyphRunMs = (staggerSpanSec + glyphDurationSec) * 1000
      const teardownDelayMs =
        Math.max(deleteSweepDurationMs, totalGlyphRunMs) + 160

      deletionTimerRef.current = setTimeout(() => {
        setIsDeleting(false)
        setDeletionGhostText(null)
        setDeletionIndexes([])
        deletionTimerRef.current = null
      }, teardownDelayMs)
    },
    [deleteSweepDurationMs]
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const prevValue = String(currentValue)
    const newLength = e.target.value.length
    const prevLen = prevValue.length

    // Full clear (e.g. select-all + delete): play exit animation, then restore empty field.
    if (newLength === 0 && prevLen > 0 && !reduceMotion) {
      const fullDeletionIndexes = Array.from(
        { length: prevLen },
        (_, idx) => idx
      )
      setDeletionIndexes(fullDeletionIndexes)
      setDeletionGhostText(prevValue)
      setDeletionKey((k) => k + 1)
      setIsDeleting(true)
      scheduleDeletionEnd(prevLen)
    }

    if (onChange) {
      onChange(e)
    } else {
      setInternalValue(e.target.value)
    }

    const isAnimatedFullClear = newLength === 0 && prevLen > 0 && !reduceMotion
    if (!(reduceMotion || isAnimatedFullClear)) {
      if (typingIdleTimerRef.current) {
        clearTimeout(typingIdleTimerRef.current)
      }
      setIsTypingBurst(true)
      typingIdleTimerRef.current = setTimeout(() => {
        setIsTypingBurst(false)
        typingIdleTimerRef.current = null
      }, 420)
    }
  }

  // Mirrors the “clear to empty” path in `handleChange`, then focuses the input.
  const handleClear = () => {
    if (typingIdleTimerRef.current) {
      clearTimeout(typingIdleTimerRef.current)
      typingIdleTimerRef.current = null
    }
    setIsTypingBurst(false)
    if (hasValue && !reduceMotion) {
      const fullDeletionIndexes = Array.from(
        { length: String(currentValue).length },
        (_, idx) => idx
      )
      setDeletionIndexes(fullDeletionIndexes)
      setDeletionGhostText(String(currentValue))
      setDeletionKey((k) => k + 1)
      setIsDeleting(true)
      scheduleDeletionEnd(String(currentValue).length)
    }

    if (onClear) {
      onClear()
    } else {
      setInternalValue("")
    }
    inputRef.current?.focus()
  }

  // Border glow: warmer, faster sweep while text deletion plays (ease-out aligned with exit).
  const borderGlow = useMemo(() => {
    if (isDeleting) {
      return {
        opacityIdle: 0.88,
        primaryBg:
          "linear-gradient(90deg, #fb7185, #f43f5e, #f97316, #ec4899, #a855f7)",
        secondaryBg:
          "linear-gradient(90deg, #fda4af, #fb923c, #f472b6, #fb7185)",
        tertiaryBg:
          "linear-gradient(90deg, #e11d48, #db2777, #c026d3, #9333ea)",
        primaryLeft: ["-8%", "92%", "-8%"],
        secondaryLeft: ["72%", "-2%", "72%"],
        tertiaryLeft: ["35%", "62%", "35%"],
        durationMain: 2.35,
        durationSec: 2,
        durationTer: 1.65,
      }
    }
    let idleOpacity: number
    if (showBlobTranslucent) {
      idleOpacity = isFocused ? 0.92 : 0.72
    } else {
      idleOpacity = isFocused ? 0.78 : 0.5
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
  }, [showBlobTranslucent, isDeleting, isFocused])

  // Avatar: faster pulse + shader while loading (“thinking”) vs typing burst vs idle.
  const { avatarPulseSec, avatarWarpSpeed } = useMemo(() => {
    if (isLoading) {
      return { avatarPulseSec: 1.65, avatarWarpSpeed: 3.45 }
    }
    if (isTypingBurst) {
      return { avatarPulseSec: 2.65, avatarWarpSpeed: 2.65 }
    }
    return { avatarPulseSec: 5.2, avatarWarpSpeed: 1.15 }
  }, [isLoading, isTypingBurst])

  return (
    <div className={cn("relative w-full max-w-2xl", className)}>
      {/* Outer container for gradient border effect */}
      <div className="relative rounded-full p-px">
        {/* Animated gradient glow layer - sits behind the input */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          {/* Gradient container positioned at the bottom */}
          <motion.div
            animate={{
              opacity: borderGlow.opacityIdle,
            }}
            className="absolute inset-x-0 bottom-0 h-1/2"
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Main flowing gradient blob */}
            <motion.div
              animate={{
                left: borderGlow.primaryLeft,
              }}
              className="-bottom-4 absolute h-16 w-48 blur-xl"
              key={`g-primary-${isDeleting ? "del" : "idle"}`}
              style={{
                background: borderGlow.primaryBg,
              }}
              transition={{
                duration: borderGlow.durationMain,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            {/* Secondary warm accent */}
            <motion.div
              animate={{
                left: borderGlow.secondaryLeft,
              }}
              className="-bottom-3 absolute h-12 w-32 blur-lg"
              key={`g-secondary-${isDeleting ? "del" : "idle"}`}
              style={{
                background: borderGlow.secondaryBg,
              }}
              transition={{
                duration: borderGlow.durationSec,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            {/* Tertiary cool accent */}
            <motion.div
              animate={{
                left: borderGlow.tertiaryLeft,
              }}
              className="-bottom-2 absolute h-10 w-24 blur-lg"
              key={`g-tertiary-${isDeleting ? "del" : "idle"}`}
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

        {/* Input container — solid or frosted glass so gradient blobs read through */}
        <div
          aria-busy={isLoading || undefined}
          className={cn(
            "relative flex items-center gap-3 rounded-full px-4 py-3",
            "border border-border",
            "shadow-black/5 shadow-sm dark:shadow-black/30",
            "transition-[background,backdrop-filter,border-color,box-shadow] duration-200",
            isFocused && "border-ring/70 dark:border-zinc-500/45",
            showBlobTranslucent && "backdrop-blur-xl backdrop-saturate-150"
          )}
          style={{
            background: showBlobTranslucent
              ? "linear-gradient(to bottom, color-mix(in oklch, var(--card) 82%, transparent) 0%, color-mix(in oklch, var(--card) 70%, transparent) 100%)"
              : "linear-gradient(to bottom, var(--card) 0%, color-mix(in oklch, var(--card) 94%, var(--muted)) 100%)",
          }}
        >
          <AiBlobWarpAvatar
            pulseDurationSec={avatarPulseSec}
            warpProps={{ speed: avatarWarpSpeed }}
          />

          {/* Input + animated placeholder overlay; empty `placeholder` — label text is custom. */}
          <div className="relative flex-1">
            <input
              {...props}
              className={cn(
                "w-full bg-transparent text-base text-foreground outline-none",
                "caret-foreground",
                "placeholder:text-muted-foreground",
                (isDeleting || isLoading) &&
                  "text-transparent caret-transparent"
              )}
              disabled={disabled}
              onBlur={() => setIsFocused(false)}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              placeholder=""
              readOnly={readOnly || isLoading}
              ref={inputRef}
              type="text"
              value={currentValue}
            />
            {isLoading && (
              <AnimatedPlaceholder
                animateKey={loadingAnimKey}
                charDurationSec={loadingCharDurationSec}
                reduceMotion={reduceMotion}
                staggerSec={loadingStaggerSec}
                text={loadingText}
              />
            )}
            {!(hasValue || isDeleting || isLoading) && (
              <AnimatedPlaceholder
                animateKey={placeholderAnimKey}
                reduceMotion={reduceMotion}
                text={placeholder}
              />
            )}
            {/* Deletion animation - blur reveal sweep over deleted text */}
            <AnimatePresence>
              {isDeleting && deletionGhostText !== null && (
                <DeletedTextBlurReveal
                  animatedIndexes={deletionIndexes}
                  clipDurationMs={deleteClipDurationMs}
                  key={deletionKey}
                  reduceMotion={reduceMotion}
                  showSweep={false}
                  text={deletionGhostText}
                  textClassName="text-foreground"
                />
              )}
            </AnimatePresence>
          </div>

          <SearchTrailingAction
            hasValue={hasValue}
            isLoading={isLoading}
            onClear={handleClear}
            reduceMotion={reduceMotion}
          />
        </div>
      </div>
    </div>
  )
}

interface DeletedTextBlurRevealProps {
  text: string
  animatedIndexes?: number[]
  reduceMotion?: boolean
  className?: string
  textClassName?: string
  clipDurationMs?: number
  blurPx?: number
  saturatePercent?: number
  /** Optional diagonal blur “wiper” (disabled in the search field for a simpler exit). */
  showSweep?: boolean
}

/**
 * Absolute overlay: clones the string as per-glyph spans, blurs/fades them on a delay
 * (right-to-left), optionally with a masked backdrop-blur sweep and soft-light noise strip.
 */
export function DeletedTextBlurReveal({
  text,
  animatedIndexes,
  reduceMotion = false,
  className,
  textClassName,
  clipDurationMs = 340,
  blurPx = 10,
  saturatePercent = 220,
  showSweep = true,
}: DeletedTextBlurRevealProps) {
  const noiseFilterId = useId()
  const sweepDurationMs = clipDurationMs + clipDurationMs / 2
  // Per character + stable key; `order` is index for stagger math.
  const glyphs = useMemo(() => {
    const counts = new Map<string, number>()
    let order = 0

    return Array.from(text, (char) => {
      const count = counts.get(char) ?? 0
      counts.set(char, count + 1)

      const glyph = {
        char,
        key: `${char}-${count}`,
        order,
        index: order,
      }

      order += 1
      return glyph
    })
  }, [text])
  // `null` set means animate every glyph; otherwise only indices in the set animate to blurred state.
  const animatedIndexSet = useMemo(() => {
    if (!animatedIndexes || animatedIndexes.length === 0) {
      return null
    }
    return new Set(animatedIndexes)
  }, [animatedIndexes])
  const animatedCount =
    animatedIndexes && animatedIndexes.length > 0
      ? animatedIndexes.length
      : glyphs.length
  const { glyphDurationSec, glyphDelayStepSec } = getDeletionGlyphTiming({
    sweepDurationMs,
    animatedCount,
    staggerGlyphCount: glyphs.length,
  })

  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 isolate", className)}
      exit={{
        opacity: 0,
        transition: {
          duration: reduceMotion ? 0 : 0.12,
          delay: reduceMotion ? 0 : 0.22,
          ease: "easeOut",
        },
      }}
      initial={{
        opacity: 1,
      }}
      style={{
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      <div className="absolute inset-y-0 left-0 flex w-fit max-w-full overflow-hidden">
        <motion.div
          animate={{ clipPath: "inset(0 0 0 0 round 9999px)" }}
          className="relative h-full w-fit max-w-full overflow-hidden"
          initial={{ clipPath: "inset(0 0 0 0 round 9999px)" }}
          transition={{
            duration: 0,
            ease: "easeOut",
          }}
        >
          <span
            className={cn(
              "relative z-10 block min-w-0 select-none text-base text-current",
              textClassName
            )}
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              whiteSpace: "pre",
            }}
          >
            {glyphs.map((glyph) => (
              <motion.span
                animate={
                  animatedIndexSet === null || animatedIndexSet.has(glyph.index)
                    ? {
                        opacity: 0.04,
                        filter: "blur(10px)",
                        y: -1,
                      }
                    : {
                        opacity: 1,
                        filter: "blur(0px)",
                        y: 0,
                      }
                }
                className="inline-block"
                initial={{
                  opacity: 1,
                  filter: "blur(0px)",
                  y: 0,
                }}
                key={glyph.key}
                transition={{
                  duration:
                    reduceMotion ||
                    (animatedIndexSet && !animatedIndexSet.has(glyph.index))
                      ? 0
                      : glyphDurationSec,
                  ease: "easeOut",
                  // End of string animates first (higher `order` → smaller delay expression).
                  delay: reduceMotion
                    ? 0
                    : (glyphs.length - 1 - glyph.order) * glyphDelayStepSec,
                }}
              >
                {glyph.char === " " ? "\u00A0" : glyph.char}
              </motion.span>
            ))}
          </span>

          {/* Moving soft mask + backdrop blur; gradient mask feathers the strip edges. */}
          {showSweep && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div
                animate={{ x: "-125%" }}
                className="-right-8 absolute inset-y-0 w-24"
                initial={{ x: "125%" }}
                style={{
                  backdropFilter: `blur(${blurPx}px) saturate(${saturatePercent}%)`,
                  WebkitBackdropFilter: `blur(${blurPx}px) saturate(${saturatePercent}%)`,
                  maskImage:
                    "linear-gradient(to right, rgb(0 0 0 / 1) 70%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, rgb(0 0 0 / 1) 70%, transparent)",
                }}
                transition={{
                  duration: reduceMotion ? 0 : sweepDurationMs / 1000,
                  ease: "easeOut",
                }}
              />

              {/* Fractal noise rect adds grain along the sweep (soft-light blend). */}
              <motion.svg
                animate={{ x: "-125%", opacity: 0 }}
                aria-hidden="true"
                className="-right-8 absolute inset-y-0 h-full w-24 mix-blend-soft-light"
                focusable="false"
                initial={{ x: "125%", opacity: 0.08 }}
                style={{
                  maskImage:
                    "linear-gradient(to right, rgb(0 0 0 / 1) 72%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, rgb(0 0 0 / 1) 72%, transparent)",
                }}
                transition={{
                  duration: reduceMotion ? 0 : sweepDurationMs / 1000,
                  ease: "easeOut",
                }}
              >
                <filter id={noiseFilterId}>
                  <feTurbulence
                    baseFrequency="0.85"
                    numOctaves="2"
                    stitchTiles="stitch"
                    type="fractalNoise"
                  />
                  <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect
                  filter={`url(#${noiseFilterId})`}
                  height="100%"
                  width="100%"
                />
              </motion.svg>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

const DEFAULT_WARP: Partial<WarpProps> = {
  /** Matches idle `borderGlow` blobs: primary, secondary, tertiary gradient leading stops. */
  // colors: ["#ff0080", "#ff4d4d", "#0070f3", "#00d4ff", "#7928ca"],
  // colors: ["#ff0080", "#7928ca", "#00d4ff", "#0070f3"],
  colors: ["#fda4af", "#0070f3", "#fb923c", "#f472b6", "#00d4ff"],
  distortion: 0.25,
  height: 720,
  proportion: 0.54,
  scale: 0.2,
  shape: "checks",
  shapeScale: 1,
  softness: 1,
  speed: 0.1,
  swirl: 0.8,
  swirlIterations: 10,
  width: 1280,
}

export type AiBlobWarpAvatarProps = Omit<ComponentProps<"div">, "children"> & {
  /** Scale / rotate loop length in seconds. Default 5.2. */
  pulseDurationSec?: number
  /** Props forwarded to the Paper `Warp` shader (merged after defaults). */
  warpProps?: Partial<WarpProps>
}

/**
 * Circular avatar frame with an animated Warp shader inside.
 * Motion uses transforms only; shader speed pauses off-screen and when `prefers-reduced-motion` is set.
 */
export const AiBlobWarpAvatar = forwardRef<
  HTMLDivElement,
  AiBlobWarpAvatarProps
>(function AiBlobWarpAvatarImpl(
  { className, pulseDurationSec = 5.2, warpProps, ...props },
  forwardedRef
) {
  const {
    className: warpClassName,
    speed: warpSpeed,
    ...restWarpProps
  } = warpProps ?? {}
  const rootRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const inView = useInView(rootRef, {
    amount: 0.2,
    margin: "0px 0px -10% 0px",
  })
  const live = inView && !reduceMotion

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node
      if (typeof forwardedRef === "function") {
        forwardedRef(node)
      } else if (forwardedRef) {
        forwardedRef.current = node
      }
    },
    [forwardedRef]
  )

  const baseSpeed = warpSpeed ?? DEFAULT_WARP.speed ?? 1

  return (
    <div
      className={cn(
        "relative isolate size-8 overflow-hidden rounded-full bg-muted shadow-foreground/10 shadow-sm ring-1 ring-foreground/10",
        className
      )}
      ref={setRefs}
      {...props}
    >
      <motion.div
        animate={
          live
            ? {
                scale: [1, 1.055, 0.99, 1],
                rotate: [0, 2, -1.5, 0],
              }
            : { scale: 1, rotate: 0 }
        }
        aria-hidden
        className="pointer-events-none absolute inset-0 origin-center rounded-full"
        transition={{
          duration: pulseDurationSec,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        <Warp
          {...DEFAULT_WARP}
          {...restWarpProps}
          speed={live ? baseSpeed : 0}
        />
      </motion.div>
    </div>
  )
})
