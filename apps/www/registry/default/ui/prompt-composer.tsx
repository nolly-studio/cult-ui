"use client"

/**
 * Multiline prompt field matching `HaloSearchInput` polish: animated gradient
 * rim blobs (inlined; no `halo-card` import), soft ambient backdrop orbs, frosted
 * fill, `AiBlobWarpAvatar` + Paper `Warp` shader (inlined; no `halo-search` import),
 * staggered
 * placeholder / loading line, trailing attach + send with the same layout + crossfade
 * as search (send ↔ spinner).
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
  type KeyboardEvent,
  type TextareaHTMLAttributes,
} from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { Warp, type WarpProps } from "@paper-design/shaders-react"
import { Paperclip, Send } from "lucide-react"
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react"

import { cn } from "@/lib/utils"

/* ─── Rim blobs (self-contained; no halo-card import) ─── */

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

function composerBorderGlowConfig(
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

type ComposerBorderGlowState = ReturnType<typeof composerBorderGlowConfig>

function ComposerCardRimBlobs({
  borderGlow,
  reduceMotion,
}: {
  borderGlow: ComposerBorderGlowState
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

/* ─── Shader avatar (inlined; no halo-search import) ─── */

const DEFAULT_WARP: Partial<WarpProps> = {
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
  pulseDurationSec?: number
  warpProps?: Partial<WarpProps>
}

export const AiBlobWarpAvatar = forwardRef<
  HTMLDivElement,
  AiBlobWarpAvatarProps
>(function AiBlobWarpAvatarImpl(
  { className, pulseDurationSec = 5.2, warpProps, ...props },
  forwardedRef
) {
  const {
    className: _warpClassName,
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

AiBlobWarpAvatar.displayName = "AiBlobWarpAvatar"

/** Placeholder line: snappy stagger (matches search). */
const PLACEHOLDER_STAGGER_SEC = 0.018
const PLACEHOLDER_CHAR_DURATION_SEC = 0.16

const DEFAULT_LOADING_STAGGER_SEC = 0.038
const DEFAULT_LOADING_CHAR_DURATION_SEC = 0.36

const TRAILING_ACTION_DURATION_SEC = 0.2

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

function FieldSpinner({
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
        className="h-4 w-4"
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

function AnimatedPlaceholder({
  text,
  animateKey,
  reduceMotion,
  staggerSec = PLACEHOLDER_STAGGER_SEC,
  charDurationSec = PLACEHOLDER_CHAR_DURATION_SEC,
  className,
  alignTop,
}: {
  text: string
  animateKey: number
  reduceMotion: boolean
  staggerSec?: number
  charDurationSec?: number
  className?: string
  alignTop?: boolean
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
      className={cn(
        "pointer-events-none absolute inset-x-0 text-pretty text-muted-foreground",
        alignTop
          ? "top-0 flex flex-wrap content-start gap-x-0"
          : "inset-y-0 flex items-center",
        className
      )}
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
          className="inline-block whitespace-pre-wrap"
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
      key="composer-trailing-loading"
      layoutId="prompt-composer-trailing"
      transition={trailingMotionTransition(reduceMotion)}
    >
      <FieldSpinner reduceMotion={reduceMotion} />
    </motion.div>
  )
}

function TrailingSendSlot({
  reduceMotion,
  disabled,
  onClick,
}: {
  reduceMotion: boolean
  disabled: boolean
  onClick: () => void
}) {
  const cross = trailingCrossfade(reduceMotion)
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0"
      exit={cross.exit}
      initial={cross.initial}
      key="composer-trailing-send"
      layoutId="prompt-composer-trailing"
      transition={trailingMotionTransition(reduceMotion)}
    >
      <ButtonPrimitive
        className={cn(
          "flex size-full min-h-10 min-w-10 select-none items-center justify-center rounded-full outline-none",
          "shadow-foreground/10 shadow-sm ring-1 ring-foreground/10 transition-[background-color,color,transform] duration-150 ease-out",
          "focus-visible:ring-2 focus-visible:ring-ring/35",
          "fine-hover:enabled:hover:bg-accent fine-hover:enabled:hover:text-accent-foreground",
          "enabled:active:scale-[0.96] motion-reduce:enabled:active:scale-100",
          disabled
            ? "pointer-events-none bg-muted/80 text-muted-foreground opacity-50"
            : "bg-primary text-primary-foreground fine-hover:hover:bg-primary/90"
        )}
        disabled={disabled}
        onClick={onClick}
        type="button"
      >
        <Send aria-hidden className="size-4 shrink-0" />
        <span className="sr-only">Send message</span>
      </ButtonPrimitive>
    </motion.div>
  )
}

/** Large, soft aurora behind the rim — balances the tall textarea without fighting the bottom blobs. */
function AmbientComposerBackdrop({
  reduceMotion,
  emphasis,
}: {
  reduceMotion: boolean
  emphasis: boolean
}) {
  const drift = reduceMotion
    ? { duration: 0 }
    : {
        duration: 18,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut" as const,
      }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      <motion.div
        animate={
          reduceMotion
            ? { opacity: emphasis ? 0.11 : 0.07 }
            : {
                opacity: emphasis ? [0.08, 0.14, 0.08] : [0.05, 0.1, 0.05],
                x: ["-4%", "5%", "-4%"],
                y: ["-2%", "3%", "-2%"],
              }
        }
        className="-top-32 -left-20 absolute size-88 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 35% 35%, rgba(255, 0, 128, 0.28) 0%, rgba(121, 40, 202, 0.14) 45%, transparent 72%)",
        }}
        transition={drift}
      />
      <motion.div
        animate={
          reduceMotion
            ? { opacity: emphasis ? 0.1 : 0.06 }
            : {
                opacity: emphasis ? [0.07, 0.12, 0.07] : [0.04, 0.09, 0.04],
                x: ["5%", "-4%", "5%"],
                y: ["2%", "-2%", "2%"],
              }
        }
        className="-top-28 -right-16 absolute size-80 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 75% 68% at 65% 40%, rgba(0, 212, 255, 0.22) 0%, rgba(0, 112, 243, 0.12) 48%, transparent 70%)",
        }}
        transition={{
          ...drift,
          duration: reduceMotion ? 0 : 22,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_100%,transparent_0%,color-mix(in_oklch,var(--background)_88%,transparent)_55%,transparent_100%)] opacity-70"
      />
    </div>
  )
}

export interface PromptComposerProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "onResize" | "children"
  > {
  /**
   * Frosted fill so animated gradient blobs read through more clearly.
   * Also applied automatically while `isLoading`.
   */
  blobTranslucent?: boolean
  isLoading?: boolean
  loadingText?: string
  loadingStaggerSec?: number
  loadingCharDurationSec?: number
  /** Fires when the user clicks Send or presses ⌘/Ctrl+Enter (unless `disabled` / loading / empty). */
  onSend?: () => void
  /** When set, an attach control is shown (unless `showAttach` is false). */
  onAttach?: () => void
  showAttach?: boolean
  /** Grow height with content up to `maxAutoGrowPx`. */
  autoGrow?: boolean
  maxAutoGrowPx?: number
}

export const PromptComposer = forwardRef<
  HTMLTextAreaElement,
  PromptComposerProps
>(
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: mirrors search/composer surface; splitting would obscure the single-field API.
  function PromptComposerImpl(
    {
      className,
      value,
      onChange,
      placeholder = "Write a prompt…",
      blobTranslucent = false,
      isLoading = false,
      loadingText = "Sending…",
      loadingStaggerSec = DEFAULT_LOADING_STAGGER_SEC,
      loadingCharDurationSec = DEFAULT_LOADING_CHAR_DURATION_SEC,
      disabled,
      readOnly,
      onSend,
      onAttach,
      showAttach,
      autoGrow = true,
      maxAutoGrowPx = 280,
      onKeyDown,
      ...props
    },
    forwardedRef
  ) {
    const showBlobTranslucent = blobTranslucent || isLoading
    const [internalValue, setInternalValue] = useState("")
    const [isFocused, setIsFocused] = useState(false)
    const [placeholderAnimKey, setPlaceholderAnimKey] = useState(0)
    const [loadingAnimKey, setLoadingAnimKey] = useState(0)
    const [isTypingBurst, setIsTypingBurst] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const typingIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
      null
    )
    const wasLoadingRef = useRef(isLoading)
    const reduceMotion = useReducedMotion() ?? false
    const fieldId = useId()

    useEffect(() => {
      if (isLoading && !wasLoadingRef.current) {
        setLoadingAnimKey((k) => k + 1)
      }
      wasLoadingRef.current = isLoading
    }, [isLoading])

    const setRefs = useCallback(
      (node: HTMLTextAreaElement | null) => {
        textareaRef.current = node
        if (typeof forwardedRef === "function") {
          forwardedRef(node)
        } else if (forwardedRef) {
          forwardedRef.current = node
        }
      },
      [forwardedRef]
    )

    const currentValue = value === undefined ? internalValue : value
    const hasValue = String(currentValue).trim().length > 0
    const canSend = hasValue && !isLoading && !disabled && !readOnly

    const showAttachControl = (showAttach ?? !!onAttach) && !!onAttach

    useEffect(() => {
      return () => {
        if (typingIdleTimerRef.current) {
          clearTimeout(typingIdleTimerRef.current)
        }
      }
    }, [])

    const adjustHeight = useCallback(() => {
      const el = textareaRef.current
      if (!(el && autoGrow)) {
        return
      }
      el.style.height = "auto"
      const next = Math.min(el.scrollHeight, maxAutoGrowPx)
      el.style.height = `${next}px`
    }, [autoGrow, maxAutoGrowPx])

    // biome-ignore lint/correctness/useExhaustiveDependencies: rerun when controlled `value` changes from parent (not only via onChange).
    useEffect(() => {
      adjustHeight()
    }, [adjustHeight, currentValue])

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const prevLen = String(currentValue).length
      const nextLen = e.target.value.length
      if (nextLen === 0 && prevLen > 0) {
        setPlaceholderAnimKey((k) => k + 1)
      }

      if (onChange) {
        onChange(e)
      } else {
        setInternalValue(e.target.value)
      }

      if (!reduceMotion) {
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

    const fireSend = useCallback(() => {
      if (!canSend) {
        return
      }
      onSend?.()
    }, [canSend, onSend])

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      onKeyDown?.(e)
      if (e.defaultPrevented) {
        return
      }
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        fireSend()
      }
    }

    const borderGlow = useMemo(
      () => composerBorderGlowConfig(showBlobTranslucent, isFocused),
      [showBlobTranslucent, isFocused]
    )

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
        <div className="relative rounded-2xl p-px">
          <AmbientComposerBackdrop
            emphasis={isFocused || showBlobTranslucent}
            reduceMotion={reduceMotion}
          />
          <ComposerCardRimBlobs
            borderGlow={borderGlow}
            reduceMotion={reduceMotion}
          />

          <div
            aria-busy={isLoading || undefined}
            className={cn(
              "relative z-10 flex flex-col gap-2 rounded-2xl px-4 py-3",
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
            <div className="flex min-h-0 gap-3">
              <AiBlobWarpAvatar
                className="mt-0.5 shrink-0"
                pulseDurationSec={avatarPulseSec}
                warpProps={{ speed: avatarWarpSpeed }}
              />

              <div className="relative min-h-[7.5rem] min-w-0 flex-1">
                <textarea
                  {...props}
                  aria-label={props["aria-label"] ?? "Message"}
                  className={cn(
                    "w-full resize-none bg-transparent text-base text-foreground leading-relaxed antialiased outline-none",
                    "caret-foreground placeholder:text-muted-foreground",
                    (isLoading || disabled) &&
                      "text-transparent caret-transparent"
                  )}
                  disabled={disabled}
                  id={props.id ?? fieldId}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => {
                    handleChange(e)
                    queueMicrotask(adjustHeight)
                  }}
                  onFocus={() => setIsFocused(true)}
                  onKeyDown={handleKeyDown}
                  placeholder=""
                  readOnly={readOnly || isLoading}
                  ref={setRefs}
                  rows={props.rows ?? 4}
                  value={currentValue}
                />
                {isLoading && (
                  <AnimatedPlaceholder
                    alignTop
                    animateKey={loadingAnimKey}
                    charDurationSec={loadingCharDurationSec}
                    className="pr-1"
                    reduceMotion={reduceMotion}
                    staggerSec={loadingStaggerSec}
                    text={loadingText}
                  />
                )}
                {!(hasValue || isLoading) && (
                  <AnimatedPlaceholder
                    alignTop
                    animateKey={placeholderAnimKey}
                    className="pr-1"
                    reduceMotion={reduceMotion}
                    text={placeholder}
                  />
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-border/50 border-t pt-2">
              {showAttachControl ? (
                <ButtonPrimitive
                  className={cn(
                    "flex min-h-10 min-w-10 shrink-0 select-none items-center justify-center rounded-full outline-none",
                    "bg-muted text-muted-foreground shadow-foreground/10 shadow-sm ring-1 ring-foreground/10",
                    "transition-[background-color,color,transform] duration-150 ease-out",
                    "fine-hover:hover:bg-accent fine-hover:hover:text-accent-foreground",
                    "focus-visible:ring-2 focus-visible:ring-ring/35",
                    "enabled:active:scale-[0.96] motion-reduce:enabled:active:scale-100",
                    (disabled || isLoading) && "pointer-events-none opacity-40"
                  )}
                  disabled={disabled || isLoading}
                  onClick={onAttach}
                  type="button"
                >
                  <Paperclip aria-hidden className="size-4 shrink-0" />
                  <span className="sr-only">Attach file</span>
                </ButtonPrimitive>
              ) : null}

              <div className="relative size-10 shrink-0">
                <AnimatePresence initial={false} mode="popLayout">
                  {isLoading ? (
                    <TrailingLoadingSlot reduceMotion={reduceMotion} />
                  ) : (
                    <TrailingSendSlot
                      disabled={!canSend}
                      onClick={fireSend}
                      reduceMotion={reduceMotion}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

export type PromptTextareaProps = PromptComposerProps

/** Alias for consumers that think of this surface as a textarea first. */
export { PromptComposer as PromptTextarea }
