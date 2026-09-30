"use client"

/**
 * Segmented control (single-select toggle group) aligned with `AnimatedButtonPolished`:
 * frosted track, gradient rim, sliding thumb using the same layout spring as the button.
 */
import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { Toggle } from "@base-ui/react/toggle"
import { ToggleGroup } from "@base-ui/react/toggle-group"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/** Matches `layoutSpring` in `animated-button-polished.tsx`. */
const layoutSpring = {
  type: "spring" as const,
  bounce: 0.12,
  damping: 34,
  stiffness: 420,
}

export interface AnimatedSegmentedItem {
  value: string
  label: ReactNode
  disabled?: boolean
}

export interface AnimatedSegmentedProps {
  items: AnimatedSegmentedItem[]
  /** Selected value; omit for uncontrolled usage with `defaultValue`. */
  value?: string
  defaultValue?: string
  onValueChange?: (next: string) => void
  className?: string
  /** Frosted track + backdrop blur (matches card/button translucent mode). */
  translucent?: boolean
  disabled?: boolean
}

export function AnimatedSegmented({
  items,
  value: valueProp,
  defaultValue,
  onValueChange,
  className,
  translucent = true,
  disabled = false,
}: AnimatedSegmentedProps) {
  const reduceMotion = useReducedMotion() ?? false
  const trackRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const [thumb, setThumb] = useState({ x: 0, width: 0 })

  const isControlled = valueProp !== undefined
  const [uncontrolled, setUncontrolled] = useState(
    defaultValue ?? items[0]?.value ?? ""
  )
  const selected = isControlled ? (valueProp ?? "") : uncontrolled

  const setSelected = useCallback(
    (next: string) => {
      if (!isControlled) {
        setUncontrolled(next)
      }
      onValueChange?.(next)
    },
    [isControlled, onValueChange]
  )

  const groupValue = useMemo(() => (selected ? [selected] : []), [selected])

  const measureThumb = useCallback(() => {
    const track = trackRef.current
    const active = selected ? itemRefs.current.get(selected) : undefined
    if (!(track && active)) {
      setThumb({ x: 0, width: 0 })
      return
    }
    const tr = track.getBoundingClientRect()
    const br = active.getBoundingClientRect()
    setThumb({
      x: br.left - tr.left,
      width: br.width,
    })
  }, [selected])

  useLayoutEffect(() => {
    measureThumb()
  }, [measureThumb])

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track || typeof ResizeObserver === "undefined") {
      return
    }
    const ro = new ResizeObserver(() => measureThumb())
    ro.observe(track)
    return () => ro.disconnect()
  }, [measureThumb])

  return (
    <div
      className={cn(
        "relative inline-flex max-w-full rounded-full p-px",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <motion.div
          animate={{
            opacity: translucent ? 0.72 : 0.5,
          }}
          className="absolute inset-x-0 bottom-0 h-1/2"
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <motion.div
            animate={{ left: ["-5%", "75%", "-5%"] }}
            className="-bottom-4 absolute h-14 w-44 blur-xl"
            style={{
              background:
                "linear-gradient(90deg, #ff0080, #7928ca, #00d4ff, #0070f3)",
            }}
            transition={{
              duration: reduceMotion ? 0.01 : 6,
              ease: "easeInOut",
              repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
            }}
          />
          <motion.div
            animate={{ left: ["65%", "10%", "65%"] }}
            className="-bottom-3 absolute h-11 w-36 blur-lg"
            style={{
              background: "linear-gradient(90deg, #ff4d4d, #f9cb28, #ff0080)",
            }}
            transition={{
              duration: reduceMotion ? 0.01 : 5,
              ease: "easeInOut",
              repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
            }}
          />
        </motion.div>
      </div>

      <div
        className={cn(
          "relative rounded-full border border-border/90",
          "shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_1px_2px_rgba(0,0,0,0.04),0_4px_14px_rgba(0,0,0,0.05)]",
          "dark:border-border dark:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_1px_2px_rgba(0,0,0,0.35),0_4px_20px_rgba(0,0,0,0.35)]",
          translucent && "backdrop-blur-xl backdrop-saturate-150"
        )}
        style={{
          background: translucent
            ? "linear-gradient(to bottom, color-mix(in oklch, var(--card) 82%, transparent) 0%, color-mix(in oklch, var(--card) 70%, transparent) 100%)"
            : "linear-gradient(to bottom, var(--card) 0%, color-mix(in oklch, var(--card) 94%, var(--muted)) 100%)",
        }}
      >
        <div className="relative p-1" ref={trackRef}>
          <motion.div
            animate={{
              x: thumb.width > 0 ? thumb.x : 0,
              width: thumb.width,
            }}
            aria-hidden
            className={cn(
              "pointer-events-none absolute top-1 right-auto bottom-1 left-0 rounded-full",
              "border border-border/70",
              "bg-gradient-to-b from-background/95 to-muted/40",
              "shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_2px_8px_rgba(0,0,0,0.06)]",
              "dark:border-white/10 dark:from-card/95 dark:to-muted/25",
              "dark:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_4px_12px_rgba(0,0,0,0.35)]"
            )}
            initial={false}
            transition={reduceMotion ? { duration: 0 } : layoutSpring}
          />

          <ToggleGroup
            className="relative z-1 flex min-w-0 gap-0"
            disabled={disabled}
            multiple={false}
            onValueChange={(next) => {
              const first = next[0]
              if (typeof first === "string") {
                setSelected(first)
              }
            }}
            value={groupValue}
          >
            {items.map((item) => (
              <Toggle
                className={cn(
                  "relative flex min-h-9 min-w-0 flex-1 items-center justify-center rounded-full px-4 py-2",
                  "font-medium text-muted-foreground text-sm tracking-tight antialiased",
                  "outline-none transition-colors duration-200 ease-out",
                  "focus-visible:ring-2 focus-visible:ring-ring/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  "disabled:pointer-events-none disabled:opacity-50",
                  "aria-pressed:text-foreground"
                )}
                disabled={item.disabled}
                key={item.value}
                ref={(el) => {
                  if (el) {
                    itemRefs.current.set(item.value, el)
                  } else {
                    itemRefs.current.delete(item.value)
                  }
                }}
                value={item.value}
              >
                {item.label}
              </Toggle>
            ))}
          </ToggleGroup>
        </div>
      </div>
    </div>
  )
}
