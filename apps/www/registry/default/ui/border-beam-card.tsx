"use client"

/**
 * Cult-pro wrapper: [`border-beam`](https://www.npmjs.com/package/border-beam) around the same
 * compound API as `@/components/ui/card` (`BorderBeamCard` + `BorderBeamCardHeader`, …).
 *
 * The package sets `overflow: hidden` on the beam root; we set `overflow: visible` so the bloom
 * (especially `beamSize="line"`) is not clipped.
 *
 * Defaults: same concentric-radius shell as `AnimatedSelectTrigger` — outer `rounded-2xl` + `p-px`,
 * inner `rounded-[calc(1rem-1px)]` so the beam curve matches the card (not a smaller radius than
 * `Card`’s `rounded-2xl`). Layered shadow on the card; `text-balance` / `text-pretty` on title and
 * description wrappers.
 */
import type { ComponentProps, CSSProperties } from "react"
import { forwardRef } from "react"
import {
  BorderBeam,
  type BorderBeamProps,
  type BorderBeamSize,
} from "border-beam"

import { cn } from "@/lib/utils"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

/**
 * Outer rim matches `Card`’s `rounded-2xl` (1rem); `p-px` reserves the 1px track for the beam (same
 * idea as `AnimatedSelectTrigger`’s `rounded-xl` + `p-px` + inner `rounded-[11px]`).
 */
const borderBeamCardShellClass = cn(
  "relative w-full rounded-2xl p-px",
  /* Inset highlight on the shell — same family as `AnimatedSelectTrigger` shadow stack */
  "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]",
  "dark:before:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
)

/** Inner radius = outer `rounded-2xl` − 1px padding (concentric corners). */
const borderBeamCardInnerCurveClass = "rounded-[calc(1rem-1px)]"

/** Layered, low-contrast depth — works on varied backgrounds (see make-interfaces-feel-better). */
const borderBeamCardSurfaceClass =
  "shadow-[0_1px_0_rgba(0,0,0,0.04),0_1px_2px_-0.5px_rgba(0,0,0,0.07)] dark:shadow-[0_1px_0_rgba(255,255,255,0.06),0_1px_2px_-0.5px_rgba(0,0,0,0.45)]"

export type BorderBeamCardProps = Omit<BorderBeamProps, "children" | "size"> & {
  children: React.ReactNode
  /** Card layout density — same as `Card` `size` (`default` | `sm`). */
  size?: "default" | "sm"
  /** Beam preset — passed to `BorderBeam` as `size` (`sm` | `md` | `line`). */
  beamSize?: BorderBeamSize
  /** Classes merged onto the inner `Card`. */
  cardClassName?: string
  /** @deprecated Use `cardClassName` */
  contentClassName?: string
}

export const BorderBeamCard = forwardRef<HTMLDivElement, BorderBeamCardProps>(
  function BorderBeamCard(
    {
      children,
      className,
      cardClassName,
      contentClassName,
      size: cardSize = "default",
      beamSize = "md",
      theme = "auto",
      borderRadius,
      style: beamStyle,
      ...beamProps
    },
    ref
  ) {
    const explicitBeamRadius = borderRadius

    const beamMergedStyle: CSSProperties | undefined =
      explicitBeamRadius != null || beamStyle != null
        ? {
            ...beamStyle,
            ...(explicitBeamRadius != null
              ? { borderRadius: explicitBeamRadius }
              : {}),
          }
        : undefined

    const cardRadiusStyle: CSSProperties | undefined =
      explicitBeamRadius != null
        ? { borderRadius: explicitBeamRadius }
        : undefined

    return (
      <div
        className={borderBeamCardShellClass}
        ref={ref}
        style={
          explicitBeamRadius != null
            ? { borderRadius: explicitBeamRadius + 1 }
            : undefined
        }
      >
        <BorderBeam
          borderRadius={explicitBeamRadius}
          className={cn(
            "overflow-visible! block w-full",
            explicitBeamRadius == null
              ? borderBeamCardInnerCurveClass
              : undefined,
            className
          )}
          size={beamSize}
          style={beamMergedStyle}
          theme={theme}
          {...beamProps}
        >
          <Card
            className={cn(
              borderBeamCardSurfaceClass,
              explicitBeamRadius == null && "rounded-[calc(1rem-1px)]!",
              cardSize === "sm" &&
                "gap-3 py-3 text-sm *:[data-slot=card-content]:px-3",
              cardClassName,
              contentClassName
            )}
            style={cardRadiusStyle}
          >
            {children}
          </Card>
        </BorderBeam>
      </div>
    )
  }
)

BorderBeamCard.displayName = "BorderBeamCard"

export function BorderBeamCardHeader(props: ComponentProps<typeof CardHeader>) {
  return <CardHeader {...props} />
}
BorderBeamCardHeader.displayName = "BorderBeamCardHeader"

export function BorderBeamCardTitle({
  className,
  ...props
}: ComponentProps<typeof CardTitle>) {
  return <CardTitle className={cn("text-balance", className)} {...props} />
}
BorderBeamCardTitle.displayName = "BorderBeamCardTitle"

export function BorderBeamCardDescription({
  className,
  ...props
}: ComponentProps<typeof CardDescription>) {
  return <CardDescription className={cn("text-pretty", className)} {...props} />
}
BorderBeamCardDescription.displayName = "BorderBeamCardDescription"

export function BorderBeamCardAction(props: ComponentProps<typeof CardAction>) {
  return <CardAction {...props} />
}
BorderBeamCardAction.displayName = "BorderBeamCardAction"

export function BorderBeamCardContent(
  props: ComponentProps<typeof CardContent>
) {
  return <CardContent {...props} />
}
BorderBeamCardContent.displayName = "BorderBeamCardContent"

export function BorderBeamCardFooter(props: ComponentProps<typeof CardFooter>) {
  return <CardFooter {...props} />
}
BorderBeamCardFooter.displayName = "BorderBeamCardFooter"
