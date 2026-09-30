"use client"

/**
 * Progress bar for async flows and inline status (pairs with polished toast / notification).
 * Determinate fill uses `scaleX` (transform) — not animated `width`. Indeterminate uses a
 * sliding gradient strip. Styling aligns with {@link AnimatedSegmented} frosted + rim chrome.
 */
import { useMemo, type ComponentProps, type ReactNode } from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/** Matches `layoutSpring` in `animated-button.tsx` / `animated-segmented.tsx`. */
const layoutSpring = {
  type: "spring" as const,
  bounce: 0.12,
  damping: 34,
  stiffness: 420,
}

function IndeterminateBar({
  className,
  reduceMotion,
}: {
  className?: string
  reduceMotion: boolean
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        className
      )}
    >
      <motion.div
        animate={
          reduceMotion
            ? { x: "0%" }
            : {
                x: ["-45%", "145%"],
              }
        }
        aria-hidden
        className="absolute inset-y-0 left-0 h-full w-2/5 rounded-[inherit] bg-gradient-to-r from-primary/25 via-primary to-primary/25"
        style={{ willChange: reduceMotion ? undefined : "transform" }}
        transition={{
          duration: reduceMotion ? 0.01 : 1.15,
          ease: "easeInOut",
          repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
        }}
      />
    </div>
  )
}

export interface AnimatedProgressProps
  extends Omit<ProgressPrimitive.Root.Props, "children"> {
  /** Optional label wired to Base UI progress label + `aria-labelledby`. */
  label?: ReactNode
  /** Show formatted percentage from Base UI (`tabular-nums`). */
  showValue?: boolean
  /** Frosted track + gradient rim (matches segmented / button polish). */
  translucent?: boolean
  trackClassName?: string
  indicatorClassName?: string
}

export function AnimatedProgress({
  className,
  label,
  showValue,
  translucent = true,
  trackClassName,
  indicatorClassName,
  value,
  min = 0,
  max = 100,
  ...rootProps
}: AnimatedProgressProps) {
  const reduceMotion = useReducedMotion() ?? false
  const isIndeterminate = value === null

  const pct = useMemo(() => {
    if (value === null || !Number.isFinite(value)) {
      return 0
    }
    const span = max - min
    if (span <= 0) {
      return 0
    }
    return Math.min(1, Math.max(0, (value - min) / span))
  }, [value, min, max])

  return (
    <ProgressPrimitive.Root
      className={cn("flex w-full min-w-[8rem] flex-wrap gap-2", className)}
      max={max}
      min={min}
      value={value}
      {...rootProps}
    >
      {(label != null || showValue) && (
        <div className="flex w-full items-baseline justify-between gap-3">
          {label == null ? (
            <span className="sr-only">Progress</span>
          ) : (
            <ProgressPrimitive.Label className="font-medium text-foreground text-xs/relaxed">
              {label}
            </ProgressPrimitive.Label>
          )}
          {showValue ? (
            <ProgressPrimitive.Value className="text-muted-foreground text-xs/relaxed tabular-nums" />
          ) : null}
        </div>
      )}

      <div
        className={cn(
          "relative w-full rounded-full p-px",
          !(label || showValue) && "min-w-[8rem]"
        )}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <motion.div
            animate={{
              opacity: translucent ? 0.55 : 0.4,
            }}
            className="absolute inset-x-0 bottom-0 h-1/2"
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <motion.div
              animate={{ left: ["-8%", "72%", "-8%"] }}
              className="-bottom-3 absolute h-10 w-32 blur-xl"
              style={{
                background:
                  "linear-gradient(90deg, #0070f3, #7928ca, #00d4ff, #ff0080)",
              }}
              transition={{
                duration: reduceMotion ? 0.01 : 5.5,
                ease: "easeInOut",
                repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
              }}
            />
          </motion.div>
        </div>

        <ProgressPrimitive.Track
          className={cn(
            "relative h-2 w-full overflow-hidden rounded-full border border-border/80",
            "shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_1px_2px_rgba(0,0,0,0.05)]",
            "dark:border-border dark:shadow-[0_1px_0_rgba(255,255,255,0.05)_inset,0_2px_10px_rgba(0,0,0,0.35)]",
            translucent && "backdrop-blur-md backdrop-saturate-150",
            trackClassName
          )}
          style={{
            background: translucent
              ? "linear-gradient(to bottom, color-mix(in oklch, var(--muted) 55%, transparent) 0%, color-mix(in oklch, var(--muted) 40%, transparent) 100%)"
              : "var(--muted)",
          }}
        >
          {isIndeterminate ? (
            <IndeterminateBar reduceMotion={reduceMotion} />
          ) : (
            <motion.div
              animate={{ scaleX: pct }}
              aria-hidden
              className={cn(
                "absolute inset-y-0 left-0 h-full w-full origin-left rounded-[inherit]",
                "bg-gradient-to-b from-primary to-primary/85",
                "shadow-[0_1px_0_rgba(255,255,255,0.2)_inset]",
                indicatorClassName
              )}
              initial={false}
              style={{ willChange: reduceMotion ? undefined : "transform" }}
              transition={reduceMotion ? { duration: 0 } : { ...layoutSpring }}
            />
          )}
        </ProgressPrimitive.Track>
      </div>
    </ProgressPrimitive.Root>
  )
}

export type AnimatedProgressLabelProps = ComponentProps<
  typeof ProgressPrimitive.Label
>
export type AnimatedProgressValueProps = ComponentProps<
  typeof ProgressPrimitive.Value
>
