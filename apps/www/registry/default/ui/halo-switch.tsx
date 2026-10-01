"use client"

/**
 * Toggle switch aligned with {@link HaloSegmented}: same layout spring, frosted track,
 * delicate rim + soft shadows, spring thumb travel (`transform` only). Extended hit target
 * via `::after` (≥44px touch area, touch-first).
 */
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
  type Ref,
  type RefCallback,
} from "react"
import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/** Matches `layoutSpring` in `halo-button.tsx` / `halo-segmented.tsx`. */
const layoutSpring = {
  type: "spring" as const,
  bounce: 0.12,
  damping: 34,
  stiffness: 420,
}

/** Horizontal inset from track edge to thumb (must match `px-[…]` on the switch root). */
const TRACK_PAD_X_PX = 3

/** Approximate thumb travel before layout measure (avoids one-frame jump). */
function approximateTravelPx(size: "sm" | "default") {
  const trackW = size === "sm" ? 34 : 40
  const thumbW = size === "sm" ? 12 : 14
  return Math.max(0, trackW - thumbW - TRACK_PAD_X_PX * 2)
}

function mergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (ref == null) {
        continue
      }
      if (typeof ref === "function") {
        ;(ref as RefCallback<T>)(node)
      } else {
        ;(ref as { current: T | null }).current = node
      }
    }
  }
}

export interface HaloSwitchProps extends SwitchPrimitive.Root.Props {
  /** Frosted shell + brand-tinted underglow (aligned with halo-card `primaryBg` family). */
  translucent?: boolean
  size?: "sm" | "default"
}

export function HaloSwitch({
  className,
  translucent = true,
  size = "default",
  checked: checkedProp,
  defaultChecked,
  onCheckedChange,
  disabled,
  ...rootProps
}: HaloSwitchProps) {
  const reduceMotion = useReducedMotion() ?? false
  const trackRef = useRef<HTMLSpanElement | null>(null)
  const thumbRef = useRef<HTMLSpanElement | null>(null)
  const [thumbTravel, setThumbTravel] = useState(() =>
    approximateTravelPx(size)
  )

  const isControlled = checkedProp !== undefined
  const [, setUncontrolled] = useState(Boolean(defaultChecked))

  const measure = useCallback(() => {
    const track = trackRef.current
    const thumb = thumbRef.current
    if (!(track && thumb)) {
      return
    }
    const hw = thumb.getBoundingClientRect().width
    const styles = getComputedStyle(track)
    const padX =
      Number.parseFloat(styles.paddingLeft) +
      Number.parseFloat(styles.paddingRight)
    /** `clientWidth` excludes border; subtract padding for the row the thumb slides in. */
    const innerW = track.clientWidth - padX
    const next = Math.max(0, innerW - hw)
    setThumbTravel(next)
  }, [])

  useLayoutEffect(() => {
    measure()
  }, [measure])

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track || typeof ResizeObserver === "undefined") {
      return
    }
    const ro = new ResizeObserver(() => measure())
    ro.observe(track)
    return () => ro.disconnect()
  }, [measure])

  const handleCheckedChange = useCallback(
    (
      next: boolean,
      details: Parameters<NonNullable<typeof onCheckedChange>>[1]
    ) => {
      if (!isControlled) {
        setUncontrolled(next)
      }
      onCheckedChange?.(next, details)
    },
    [isControlled, onCheckedChange]
  )

  const thumbSize =
    size === "sm" ? "size-3 min-h-3 min-w-3" : "size-3.5 min-h-3.5 min-w-3.5"
  const trackSize =
    size === "sm"
      ? "h-[18px] min-h-[18px] w-[34px] min-w-[34px]"
      : "h-[22px] min-h-[22px] w-10 min-w-[40px]"
  /** `::after` extends hit area to ≥44px tall (Emil touch-first). */
  const hitAfterY =
    size === "sm" ? "after:-inset-y-[13px]" : "after:-inset-y-[11px]"

  /** Shell fill: muted tints of the brand ramp (#ff0080 → #7928ca → #00d4ff), pairs with checked track. */
  const shellBackgroundTranslucent =
    "linear-gradient(to bottom, color-mix(in oklch, var(--card) 82%, oklch(0.92 0.04 330)) 0%, color-mix(in oklch, var(--card) 78%, oklch(0.88 0.06 285)) 50%, color-mix(in oklch, var(--card) 76%, oklch(0.9 0.05 245)) 100%)"
  const shellBackgroundSolid =
    "linear-gradient(to bottom, color-mix(in oklch, var(--card) 95%, oklch(0.97 0.02 315)) 0%, color-mix(in oklch, var(--card) 93%, oklch(0.96 0.025 280)) 100%)"

  return (
    <div
      className={cn(
        "relative inline-flex max-w-full rounded-[9999px]",
        className
      )}
    >
      {/* Underglow clipped to the same pill as the shell — avoids a second “rim” vs the track. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[9999px]">
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
      </div>

      <div
        className={cn(
          "relative rounded-[9999px] border border-[color-mix(in_oklch,var(--border)_72%,oklch(0.88_0.06_300))]",
          "shadow-[0_1px_0_rgba(255,255,255,0.55)_inset,0_1px_2px_rgba(0,0,0,0.03),0_6px_18px_rgba(0,0,0,0.04)]",
          "dark:border-border/80 dark:shadow-[0_1px_0_rgba(255,255,255,0.05)_inset,0_1px_2px_rgba(0,0,0,0.28),0_6px_22px_rgba(0,0,0,0.32)]",
          translucent && "backdrop-blur-xl backdrop-saturate-150"
        )}
        style={{
          background: translucent
            ? shellBackgroundTranslucent
            : shellBackgroundSolid,
        }}
      >
        <SwitchPrimitive.Root
          {...rootProps}
          checked={isControlled ? checkedProp : undefined}
          className={cn(
            /* Flex centers the thumb vertically; avoid absolute + nested flex (subpixel drift). */
            "group/switch relative isolate flex shrink-0 cursor-pointer flex-row items-center justify-start rounded-[9999px] border border-transparent px-[3px] outline-none",
            "transition-[background,box-shadow] duration-200 ease-out",
            /* Hit slop only — must not paint (no blur/double rim). */
            "after:-inset-x-3 after:pointer-events-auto after:absolute after:z-0 after:rounded-[9999px] after:bg-transparent after:content-['']",
            hitAfterY,
            "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
            "data-unchecked:bg-[color-mix(in_oklch,var(--muted)_36%,oklch(0.945_0.032_295))]",
            /* Solid oklch ramp: same mix bases as unchecked/shell, stronger chroma (magenta → purple → cyan) — no alpha, no track blur */
            "data-checked:bg-[linear-gradient(180deg,color-mix(in_oklch,var(--muted)_32%,oklch(0.9_0.045_325))_0%,color-mix(in_oklch,var(--muted)_30%,oklch(0.87_0.068_290))_38%,color-mix(in_oklch,var(--muted)_30%,oklch(0.87_0.065_250))_72%,color-mix(in_oklch,var(--muted)_32%,oklch(0.85_0.072_268))_100%)]",
            "dark:data-checked:bg-[linear-gradient(180deg,color-mix(in_oklch,var(--input)_80%,oklch(0.52_0.11_318))_0%,color-mix(in_oklch,var(--input)_78%,oklch(0.5_0.13_282))_36%,color-mix(in_oklch,var(--input)_78%,oklch(0.5_0.12_248))_70%,color-mix(in_oklch,var(--input)_80%,oklch(0.48_0.13_268))_100%)]",
            "data-disabled:cursor-not-allowed data-disabled:opacity-50",
            "dark:data-unchecked:bg-[color-mix(in_oklch,var(--input)_86%,oklch(0.38_0.035_280))]",
            trackSize
          )}
          data-size={size}
          data-slot="halo-switch"
          defaultChecked={isControlled ? undefined : defaultChecked}
          disabled={disabled}
          onCheckedChange={handleCheckedChange}
          ref={trackRef}
        >
          <SwitchPrimitive.Thumb
            data-slot="halo-switch-thumb"
            render={(thumbProps, thumbState) => {
              const {
                className: thumbClassName,
                ref: thumbRefProp,
                style: thumbStyle,
                // DOM handlers that share names with Motion APIs but have incompatible typings.
                onDrag: _onDrag,
                onDragStart: _onDragStart,
                onDragEnd: _onDragEnd,
                onAnimationStart: _onAnimationStart,
                onAnimationEnd: _onAnimationEnd,
                ...thumbRest
              } = thumbProps
              const { transform: _, ...thumbStyleSafe } = (thumbStyle ??
                {}) as CSSProperties
              return (
                <motion.span
                  {...thumbRest}
                  animate={{
                    x: thumbState.checked ? thumbTravel : 0,
                  }}
                  className={cn(
                    thumbClassName,
                    "pointer-events-none relative z-1 box-border block shrink-0 rounded-full bg-background ring-0",
                    thumbSize,
                    "shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_1px_2px_rgba(0,0,0,0.07),0_2px_10px_rgba(0,0,0,0.05)]",
                    "ring-1 ring-black/8 dark:ring-white/12",
                    "dark:shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_1px_3px_rgba(0,0,0,0.45),0_2px_12px_rgba(0,0,0,0.35)]",
                    "fine-hover:group-hover/switch:ring-2 fine-hover:group-hover/switch:ring-ring/20",
                    "data-checked:bg-white dark:data-checked:bg-white dark:data-unchecked:bg-[oklch(0.97_0.01_280)]"
                  )}
                  initial={false}
                  ref={mergeRefs(thumbRefProp, thumbRef)}
                  style={{
                    ...thumbStyleSafe,
                    willChange: reduceMotion ? undefined : "transform",
                  }}
                  transition={reduceMotion ? { duration: 0 } : layoutSpring}
                  whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                />
              )
            }}
          />
        </SwitchPrimitive.Root>
      </div>
    </div>
  )
}

export type HaloSwitchThumbProps = ComponentProps<typeof SwitchPrimitive.Thumb>
