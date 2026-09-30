"use client"

/**
 * Tabs aligned with `AnimatedCardPolished` rim language: gradient indicator (underline or pill)
 * using the magenta / violet / cyan family from the card border trails.
 */
import type { ComponentProps } from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"

import { cn } from "@/lib/utils"

/** Ambient gradient (pill indicator glow) — same hue family as `AnimatedCardBorderTrail`. */
const TAB_GRADIENT_GLOW =
  "linear-gradient(90deg, transparent 0%, rgba(255,0,128,0.35) 22%, rgba(121,40,202,0.45) 50%, rgba(0,212,255,0.38) 78%, transparent 100%)"

export type AnimatedTabsVariant = "underline" | "pill"

export function AnimatedTabs({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      {...props}
      className={cn(
        // `flex-1 min-w-0` so the root fills centered flex previews (e.g. docs ComponentPreview) instead of
        // shrink-wrapping to the active panel. Grid column `minmax(0,1fr)` keeps tab + panel width stable.
        "group/animated-tabs grid w-full min-w-0 max-w-full flex-1 grid-cols-[minmax(0,1fr)] gap-3",
        "data-[orientation=vertical]:flex data-[orientation=vertical]:flex-row data-[orientation=vertical]:gap-4",
        className
      )}
      data-slot="animated-tabs"
    />
  )
}

export function AnimatedTabsList({
  className,
  variant = "underline",
  ...props
}: ComponentProps<typeof TabsPrimitive.List> & {
  variant?: AnimatedTabsVariant
}) {
  return (
    <TabsPrimitive.List
      {...props}
      className={cn(
        "group/animated-tabs-list relative flex w-fit min-w-0 flex-wrap items-center gap-1",
        variant === "underline" &&
          "w-full gap-6 border-border/50 border-b pb-px data-[orientation=vertical]:flex-col data-[orientation=vertical]:gap-2 data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-l data-[orientation=vertical]:pb-0 data-[orientation=vertical]:pl-px",
        variant === "pill" &&
          "gap-0 rounded-full border border-border/80 bg-muted/35 p-1 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset] backdrop-blur-md dark:border-border dark:bg-muted/25",
        className
      )}
      data-slot="animated-tabs-list"
      data-variant={variant}
    />
  )
}

export function AnimatedTabsTrigger({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Tab>) {
  return (
    <TabsPrimitive.Tab
      {...props}
      className={cn(
        "relative z-1 inline-flex min-h-9 items-center justify-center whitespace-nowrap rounded-md px-3 py-2",
        "font-medium text-muted-foreground text-sm tracking-tight antialiased",
        "outline-none transition-colors duration-200 ease-out",
        "focus-visible:ring-2 focus-visible:ring-ring/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-active:text-foreground",
        "group-data-[variant=pill]/animated-tabs-list:rounded-full group-data-[variant=pill]/animated-tabs-list:px-4 group-data-[variant=pill]/animated-tabs-list:py-2",
        "group-data-[variant=underline]/animated-tabs-list:data-active:bg-transparent",
        className
      )}
      data-slot="animated-tabs-trigger"
    />
  )
}

export function AnimatedTabsIndicator({
  className,
  variant = "underline",
  ...props
}: ComponentProps<typeof TabsPrimitive.Indicator> & {
  variant?: AnimatedTabsVariant
}) {
  return (
    <TabsPrimitive.Indicator
      {...props}
      className={cn(
        "pointer-events-none absolute z-0",
        variant === "underline" &&
          "-bottom-px left-(--active-tab-left) h-0.5 w-(--active-tab-width) rounded-none shadow-[0_0_12px_rgba(121,40,202,0.35),0_0_24px_rgba(0,212,255,0.2)] transition-[left,width] duration-300 ease-out [background:linear-gradient(90deg,transparent_0%,rgba(255,0,128,0.85)_18%,rgba(121,40,202,0.92)_50%,rgba(0,212,255,0.88)_82%,transparent_100%)] motion-reduce:transition-none",
        variant === "pill" &&
          "top-(--active-tab-top) left-(--active-tab-left) h-(--active-tab-height) w-(--active-tab-width) rounded-full transition-[left,width,top,height] duration-300 ease-out motion-reduce:transition-none",
        className
      )}
      data-slot="animated-tabs-indicator"
    >
      {variant === "pill" ? (
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 overflow-hidden rounded-full",
            // Hairline “ring” + softer lift: layered shadows (no heavy 10px blur) for edge definition on any background.
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.11),0_0_0_1px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.045)]",
            "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(255,255,255,0.08),0_1px_2px_rgba(0,0,0,0.22)]"
          )}
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in oklch, var(--card) 88%, transparent), color-mix(in oklch, var(--card) 72%, transparent))",
          }}
        />
      ) : null}
      {variant === "pill" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-90"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,0,128,0.2), rgba(121,40,202,0.28), rgba(0,212,255,0.22))",
            mixBlendMode: "multiply",
          }}
        />
      ) : null}
      {variant === "pill" ? (
        <span
          aria-hidden
          className="-bottom-px pointer-events-none absolute inset-x-0 h-1/2 rounded-b-full opacity-55 blur-sm dark:opacity-75"
          style={{ background: TAB_GRADIENT_GLOW }}
        />
      ) : null}
    </TabsPrimitive.Indicator>
  )
}

export function AnimatedTabsContent({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Panel>) {
  return (
    <TabsPrimitive.Panel
      {...props}
      className={cn(
        "w-full min-w-0 text-pretty text-foreground text-sm/relaxed outline-none",
        className
      )}
      data-slot="animated-tabs-content"
    />
  )
}

export type AnimatedTabsProps = ComponentProps<typeof TabsPrimitive.Root>
