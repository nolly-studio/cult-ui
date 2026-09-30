"use client"

/**
 * Composable animated select (gradient rim, frosted fill, staggered label, trailing
 * chevron / check / spinner). API mirrors `components/ui/select.tsx`: `AnimatedSelect`
 * (root), `AnimatedSelectTrigger`, `AnimatedSelectValue`, `AnimatedSelectContent`,
 * `AnimatedSelectItem`, plus group/label/scroll/separator aliases.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react"
import {
  Select as SelectPrimitive,
  type SelectRoot,
} from "@base-ui/react/select"
import { Check, ChevronDown } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import {
  Select,
  SelectGroup,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectContent as UiSelectContent,
} from "@/registry/default/ui/base-select"

const LABEL_STAGGER_SEC = 0.018
const LABEL_CHAR_DURATION_SEC = 0.16
const TRAILING_ACTION_DURATION_SEC = 0.2
const LIST_STAGGER_STEP_SEC = 0.055
const LIST_STAGGER_CAP = 9
const SELECTION_FLASH_MS = 560

interface BorderGlowConfig {
  opacityIdle: number
  primaryBg: string
  secondaryBg: string
  tertiaryBg: string
  primaryLeft: string[]
  secondaryLeft: string[]
  tertiaryLeft: string[]
  durationMain: number
  durationSec: number
  durationTer: number
}

export interface PolishedSelectItem {
  value: string
  label: string
  disabled?: boolean
}

type SelectValueChangeDetails = Parameters<
  NonNullable<SelectRoot.Props<PolishedSelectItem>["onValueChange"]>
>[1]

interface AnimatedSelectContextValue {
  translucent: boolean
  isLoading: boolean
  showSelectionFlash: boolean
  reduceMotion: boolean
  open: boolean
  setOpen: (open: boolean) => void
  isFocused: boolean
  setIsFocused: (focused: boolean) => void
  listBurst: number
  labelStagger: { key: number; text: string }
  showStaggerOverlay: boolean
  placeholder: string
  borderGlow: BorderGlowConfig
  trailingMode: "spinner" | "check" | "chevron"
  fieldId: string
}

const AnimatedSelectContext = createContext<AnimatedSelectContextValue | null>(
  null
)

function useAnimatedSelect() {
  const ctx = useContext(AnimatedSelectContext)
  if (!ctx) {
    throw new Error(
      "Animated select components must be used within <AnimatedSelect>."
    )
  }
  return ctx
}

function SelectStaggeredGlyphLine({
  text,
  animateKey,
  reduceMotion,
  className,
}: {
  text: string
  animateKey: number
  reduceMotion: boolean
  className?: string
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
      className={className}
      initial="hidden"
      key={animateKey}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduceMotion ? 0 : LABEL_STAGGER_SEC,
          },
        },
      }}
    >
      {chars.map((glyph) => (
        <motion.span
          className="inline-block whitespace-pre"
          key={glyph.key}
          transition={{
            duration: reduceMotion ? 0 : LABEL_CHAR_DURATION_SEC,
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

function TrailingSpinner({
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
    scale: reduceMotion ? 1 : 0.25,
    filter: reduceMotion ? "none" : "blur(4px)",
  },
  initial: {
    opacity: reduceMotion ? 1 : 0,
    scale: reduceMotion ? 1 : 0.25,
    filter: reduceMotion ? "none" : "blur(4px)",
  },
})

const trailingEnter = (reduceMotion: boolean) => ({
  opacity: 1,
  scale: 1,
  filter: reduceMotion ? "none" : "blur(0px)",
})

/** Raised “thumb” surface — radius = trigger inner (~10px) − inset so corners don’t crowd the rim */
const trailingThumbSurface = cn(
  "rounded-[6px] bg-background",
  "shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_1px_2px_rgba(0,0,0,0.07),0_2px_10px_rgba(0,0,0,0.05)]",
  "ring-1 ring-black/8 dark:ring-white/12",
  "dark:shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_1px_3px_rgba(0,0,0,0.45),0_2px_12px_rgba(0,0,0,0.35)]",
  "fine-hover:group-hover/select:ring-2 fine-hover:group-hover/select:ring-ring/20"
)

function resolveTrailingMode(
  isLoading: boolean,
  selectionFlash: boolean,
  showSelectionFlash: boolean,
  reduceMotion: boolean
): "spinner" | "check" | "chevron" {
  if (isLoading) {
    return "spinner"
  }
  if (selectionFlash && showSelectionFlash && !reduceMotion) {
    return "check"
  }
  return "chevron"
}

/** Inset 1px inside `rounded-xl` shell → inner radius 12px − 1px = 11px (concentric with trigger). */
function SelectGradientUnderlay({
  borderGlow,
  translucent,
  reduceMotion,
}: {
  borderGlow: BorderGlowConfig
  translucent: boolean
  reduceMotion: boolean
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[11px]">
      {translucent ? (
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
      ) : null}
      <motion.div
        animate={{
          opacity: borderGlow.opacityIdle * (translucent ? 0.72 : 1),
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
  )
}

export type AnimatedSelectProps = Omit<
  ComponentProps<typeof Select>,
  "children" | "onValueChange"
> & {
  children: ReactNode
  /** Frosted glass style on the trigger track */
  translucent?: boolean
  isLoading?: boolean
  showSelectionFlash?: boolean
  /** Shown when no value is selected; also forwarded to `AnimatedSelectValue` via context */
  placeholder?: string
  className?: string
  onValueChange?: (
    value: unknown,
    eventDetails: SelectValueChangeDetails
  ) => void
}

function staggerDurationMs(text: string, reduceMotion: boolean): number {
  if (reduceMotion || text.length === 0) {
    return 0
  }
  const n = text.length
  const runSec = (n - 1) * LABEL_STAGGER_SEC + LABEL_CHAR_DURATION_SEC
  return runSec * 1000 + 80
}

/**
 * Root: Base UI `Select` plus internal context for stagger, rim, and trailing indicator.
 * Compose with `AnimatedSelectTrigger`, `AnimatedSelectContent`, and items — same idea as
 * [`Select`](components/ui/select.tsx) + `SelectTrigger` + `SelectContent`.
 */
export function AnimatedSelect({
  children,
  translucent = false,
  isLoading = false,
  showSelectionFlash = true,
  placeholder = "Select an option",
  className,
  value: valueProp,
  defaultValue,
  onValueChange,
  onOpenChange: onOpenChangeUser,
  ...selectProps
}: AnimatedSelectProps) {
  const reduceMotion = useReducedMotion() ?? false
  const generatedId = useId()
  const fieldId = selectProps.id ?? generatedId
  const [open, setOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [listBurst, setListBurst] = useState(0)
  const [labelStagger, setLabelStagger] = useState({ key: 0, text: "" })
  const [isStaggering, setIsStaggering] = useState(false)
  const [selectionFlash, setSelectionFlash] = useState(false)
  const flashTimerRef = useRef<number | null>(null)

  const isControlled = valueProp !== undefined
  const isActive = isFocused || open
  const showBlobTranslucent = translucent

  const borderGlow = useMemo((): BorderGlowConfig => {
    let idleOpacity: number
    if (showBlobTranslucent) {
      idleOpacity = isActive ? 0.92 : 0.76
    } else {
      idleOpacity = isActive ? 0.82 : 0.58
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
  }, [showBlobTranslucent, isActive])

  useEffect(() => {
    if (open) {
      setListBurst((b) => b + 1)
    }
  }, [open])

  useEffect(() => {
    return () => {
      if (flashTimerRef.current) {
        window.clearTimeout(flashTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const text = labelStagger.text
    if (reduceMotion || !text || open) {
      setIsStaggering(false)
      return
    }
    setIsStaggering(true)
    const ms = staggerDurationMs(text, reduceMotion)
    const t = window.setTimeout(() => setIsStaggering(false), ms)
    return () => window.clearTimeout(t)
  }, [labelStagger, open, reduceMotion])

  const handleValueChange = useCallback(
    (next: unknown, eventDetails: SelectValueChangeDetails) => {
      onValueChange?.(next, eventDetails)
      if (
        next &&
        typeof next === "object" &&
        "label" in next &&
        typeof (next as PolishedSelectItem).label === "string"
      ) {
        setLabelStagger((s) => ({
          key: s.key + 1,
          text: (next as PolishedSelectItem).label,
        }))
        if (showSelectionFlash && !reduceMotion) {
          if (flashTimerRef.current) {
            window.clearTimeout(flashTimerRef.current)
          }
          setSelectionFlash(true)
          flashTimerRef.current = window.setTimeout(() => {
            setSelectionFlash(false)
            flashTimerRef.current = null
          }, SELECTION_FLASH_MS)
        }
      } else {
        setLabelStagger({ key: 0, text: "" })
      }
    },
    [onValueChange, reduceMotion, showSelectionFlash]
  )

  const showStaggerOverlay =
    Boolean(labelStagger.text) && isStaggering && !open && !reduceMotion

  const trailingMode = resolveTrailingMode(
    isLoading,
    selectionFlash,
    showSelectionFlash,
    reduceMotion
  )

  const contextValue = useMemo(
    (): AnimatedSelectContextValue => ({
      translucent: showBlobTranslucent,
      isLoading,
      showSelectionFlash,
      reduceMotion,
      open,
      setOpen,
      isFocused,
      setIsFocused,
      listBurst,
      labelStagger,
      showStaggerOverlay,
      placeholder,
      borderGlow,
      trailingMode,
      fieldId,
    }),
    [
      showBlobTranslucent,
      isLoading,
      showSelectionFlash,
      reduceMotion,
      open,
      isFocused,
      listBurst,
      labelStagger,
      showStaggerOverlay,
      placeholder,
      borderGlow,
      trailingMode,
      fieldId,
    ]
  )

  return (
    <AnimatedSelectContext.Provider value={contextValue}>
      <div
        className={cn(
          "relative inline-block w-max min-w-0 max-w-full",
          className
        )}
      >
        <Select
          {...selectProps}
          defaultValue={
            isControlled
              ? undefined
              : (defaultValue as PolishedSelectItem | undefined)
          }
          disabled={selectProps.disabled || isLoading}
          onOpenChange={(nextOpen, eventDetails) => {
            setOpen(nextOpen)
            onOpenChangeUser?.(nextOpen, eventDetails)
          }}
          onValueChange={handleValueChange}
          open={open}
          value={isControlled ? (valueProp ?? null) : undefined}
        >
          {children}
        </Select>
      </div>
    </AnimatedSelectContext.Provider>
  )
}

export type AnimatedSelectTriggerProps = SelectPrimitive.Trigger.Props

/**
 * Gradient rim + pill trigger shell. Place `AnimatedSelectValue` and
 * `AnimatedSelectTrailingIndicator` inside (same role as `SelectTrigger` + value + icon).
 */
export function AnimatedSelectTrigger({
  className,
  children,
  onBlur,
  onFocus,
  ...props
}: AnimatedSelectTriggerProps) {
  const {
    translucent,
    isLoading,
    open,
    reduceMotion,
    isFocused,
    setIsFocused,
    borderGlow,
    fieldId,
  } = useAnimatedSelect()

  const ringActive = isFocused || open

  return (
    <div className="relative w-fit max-w-full rounded-xl p-px">
      <SelectGradientUnderlay
        borderGlow={borderGlow}
        reduceMotion={reduceMotion}
        translucent={translucent}
      />
      <SelectPrimitive.Trigger
        aria-busy={isLoading || props["aria-busy"]}
        className={cn(
          "relative inline-flex min-h-11 min-w-34 max-w-[min(100%,20rem)] items-center gap-2 rounded-[11px] py-2 pr-2 pl-3 text-left",
          "whitespace-nowrap antialiased",
          "border border-[color-mix(in_oklch,var(--border)_72%,oklch(0.88_0.06_300))] bg-transparent",
          /* Shell stack: top inset highlight + contact shadow + soft lift — aligned with AnimatedSwitch / AnimatedBadge */
          "shadow-[0_1px_0_rgba(255,255,255,0.55)_inset,0_1px_2px_rgba(0,0,0,0.03),0_6px_18px_rgba(0,0,0,0.04)]",
          "dark:border-border/80 dark:shadow-[0_1px_0_rgba(255,255,255,0.05)_inset,0_1px_2px_rgba(0,0,0,0.28),0_6px_22px_rgba(0,0,0,0.32)]",
          "group/select outline-none transition-[background-color,backdrop-filter,border-color,box-shadow] duration-200 ease-out",
          "fine-hover:hover:border-ring/50 fine-hover:hover:shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_1px_3px_rgba(0,0,0,0.05),0_8px_22px_rgba(0,0,0,0.06)]",
          "dark:fine-hover:hover:border-zinc-500/60 dark:fine-hover:hover:shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_2px_4px_rgba(0,0,0,0.38),0_10px_28px_rgba(0,0,0,0.42)]",
          "focus-visible:border-ring/80 focus-visible:ring-2 focus-visible:ring-ring/30",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-placeholder:text-muted-foreground",
          ringActive &&
            "border-ring/70 shadow-[0_1px_0_rgba(255,255,255,0.14)_inset,0_1px_2px_rgba(0,0,0,0.09),0_4px_14px_rgba(0,0,0,0.11)] dark:border-zinc-500/55 dark:shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_1px_2px_rgba(0,0,0,0.42),0_4px_20px_rgba(0,0,0,0.48)]",
          translucent && "backdrop-blur-xl backdrop-saturate-150",
          className
        )}
        data-slot="animated-select-trigger"
        disabled={props.disabled ?? isLoading}
        id={props.id ?? fieldId}
        onBlur={(e) => {
          setIsFocused(false)
          onBlur?.(e)
        }}
        onFocus={(e) => {
          setIsFocused(true)
          onFocus?.(e)
        }}
        style={{
          background: translucent
            ? "linear-gradient(to bottom, color-mix(in oklch, var(--card) 82%, oklch(0.92 0.04 330)) 0%, color-mix(in oklch, var(--card) 78%, oklch(0.88 0.06 285)) 50%, color-mix(in oklch, var(--card) 76%, oklch(0.9 0.05 245)) 100%)"
            : "linear-gradient(to bottom, color-mix(in oklch, var(--card) 95%, oklch(0.97 0.02 315)) 0%, color-mix(in oklch, var(--card) 93%, oklch(0.96 0.025 280)) 100%)",
          ...props.style,
        }}
        {...props}
        type="button"
      >
        {children}
      </SelectPrimitive.Trigger>
    </div>
  )
}

export function AnimatedSelectValue({
  className,
  placeholder: placeholderProp,
  ...props
}: SelectPrimitive.Value.Props) {
  const {
    placeholder: contextPlaceholder,
    showStaggerOverlay,
    labelStagger,
    reduceMotion,
  } = useAnimatedSelect()

  return (
    <div className="relative min-w-0 flex-1 text-sm/relaxed">
      <SelectPrimitive.Value
        className={cn(
          "block min-w-0 flex-1 truncate bg-transparent text-foreground text-sm/relaxed",
          showStaggerOverlay && "text-transparent",
          className
        )}
        data-slot="animated-select-value"
        placeholder={placeholderProp ?? contextPlaceholder}
        {...props}
      />
      {showStaggerOverlay && (
        <SelectStaggeredGlyphLine
          animateKey={labelStagger.key}
          className="pointer-events-none absolute inset-y-0 left-0 flex items-center text-foreground"
          reduceMotion={reduceMotion}
          text={labelStagger.text}
        />
      )}
    </div>
  )
}

/** Chevron / check / spinner aligned with the trigger (like `SelectPrimitive.Icon` usage). */
export function AnimatedSelectTrailingIndicator({
  className,
}: {
  className?: string
}) {
  const { trailingMode, reduceMotion, open } = useAnimatedSelect()
  const cross = trailingCrossfade(reduceMotion)
  const transition = trailingMotionTransition(reduceMotion)

  return (
    <div className={cn("relative size-8 shrink-0", className)}>
      {/*
        Thumb shell stays static; only the glyph crossfades (enter/exit). `initial` must
        not be false on animated children so the first paint is not stuck invisible.
      */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center",
          trailingThumbSurface
        )}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="sync">
          {trailingMode === "spinner" && (
            <motion.span
              animate={trailingEnter(reduceMotion)}
              aria-hidden
              className="absolute inset-0 flex items-center justify-center text-muted-foreground"
              exit={cross.exit}
              initial={cross.initial}
              key="trail-spin"
              transition={transition}
            >
              <TrailingSpinner reduceMotion={reduceMotion} />
            </motion.span>
          )}
          {trailingMode === "check" && (
            <motion.span
              animate={trailingEnter(reduceMotion)}
              aria-hidden
              className="absolute inset-0 flex items-center justify-center text-emerald-600 dark:text-emerald-400"
              exit={cross.exit}
              initial={cross.initial}
              key="trail-check"
              transition={transition}
            >
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            </motion.span>
          )}
          {trailingMode === "chevron" && (
            <motion.span
              animate={trailingEnter(reduceMotion)}
              aria-hidden
              className="absolute inset-0 flex items-center justify-center text-muted-foreground"
              exit={cross.exit}
              initial={cross.initial}
              key="trail-chevron"
              transition={transition}
            >
              <motion.span
                animate={{
                  rotate: !reduceMotion && open ? 180 : 0,
                }}
                className="inline-flex"
                transition={transition}
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </motion.span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function AnimatedSelectContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  ...props
}: ComponentProps<typeof UiSelectContent>) {
  return (
    <UiSelectContent
      {...props}
      align={align}
      alignItemWithTrigger={true}
      className={cn(
        "max-h-72 w-(--anchor-width) min-w-(--anchor-width) rounded-xl border border-[color-mix(in_oklch,var(--border)_72%,oklch(0.88_0.06_300))] bg-popover/95",
        "shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_1px_2px_rgba(0,0,0,0.04),0_4px_14px_rgba(0,0,0,0.05)]",
        "dark:border-border/80 dark:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_1px_2px_rgba(0,0,0,0.35),0_4px_20px_rgba(0,0,0,0.35)]",
        "ring-1 ring-black/8 backdrop-blur-xl backdrop-saturate-150 dark:ring-white/12",
        "data-closed:fade-out-0 data-open:fade-in-0 data-closed:animate-out data-open:animate-in",
        "data-closed:zoom-out-95 data-open:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "duration-150 ease-out",
        className
      )}
      side={side}
      sideOffset={sideOffset}
    />
  )
}

export function AnimatedSelectItem({
  className,
  children,
  index = 0,
  label,
  value,
  ...props
}: SelectPrimitive.Item.Props & { index?: number }) {
  const { listBurst, reduceMotion } = useAnimatedSelect()
  const capped = Math.min(index, LIST_STAGGER_CAP)
  const delay = reduceMotion ? 0 : capped * LIST_STAGGER_STEP_SEC
  const valueKey =
    value !== undefined &&
    value !== null &&
    typeof value === "object" &&
    "value" in (value as PolishedSelectItem)
      ? (value as PolishedSelectItem).value
      : String(value)

  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex min-h-11 w-full cursor-default select-none items-center gap-2 rounded-lg px-2.5 py-2.5",
        "text-foreground text-sm antialiased outline-none",
        "transition-[background-color,color,box-shadow] duration-150 ease-out",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
        "data-highlighted:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] dark:data-highlighted:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        className
      )}
      data-slot="animated-select-item"
      label={label}
      value={value}
      {...props}
    >
      <motion.div
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        className="flex w-full min-w-0 items-center gap-2"
        initial={
          reduceMotion ? false : { filter: "blur(4px)", opacity: 0, y: 4 }
        }
        key={`${listBurst}-${valueKey}`}
        transition={{
          delay,
          duration: 0.22,
          ease: [0.2, 0, 0, 1],
        }}
      >
        <SelectPrimitive.ItemText className="min-w-0 flex-1 truncate text-pretty">
          {children}
        </SelectPrimitive.ItemText>
        <SelectPrimitive.ItemIndicator className="flex shrink-0 text-foreground">
          <Check
            aria-hidden
            className="h-3.5 w-3.5 opacity-90"
            strokeWidth={2.5}
          />
        </SelectPrimitive.ItemIndicator>
      </motion.div>
    </SelectPrimitive.Item>
  )
}

export const AnimatedSelectGroup = SelectGroup
export const AnimatedSelectLabel = SelectLabel
export const AnimatedSelectScrollUpButton = SelectScrollUpButton
export const AnimatedSelectScrollDownButton = SelectScrollDownButton
export const AnimatedSelectSeparator = SelectSeparator
