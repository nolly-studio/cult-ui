import type { ComponentProps } from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

/**
 * 3D-style L-shaped extrusion. Renders at z-10; place after backdrops/glow/content
 * in DOM order so it paints on top, or rely on z-10 vs default z-0 layers.
 */
function ShadowCardBevel({
  className,
  barClassName,
  ...props
}: ComponentProps<"div"> & {
  /** Applied to both vertical and horizontal bars (e.g. thickness, color). */
  barClassName?: string
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-10", className)}
      data-slot="shadow-card-bevel"
      {...props}
    >
      <div
        className={cn(
          "absolute top-0 right-0 bottom-0 w-2 bg-black",
          barClassName
        )}
      />
      <div
        className={cn(
          "absolute right-0 bottom-0 left-0 h-2 bg-black",
          barClassName
        )}
      />
    </div>
  )
}

type ShadowCardProps = ComponentProps<"div"> & {
  asChild?: boolean
}

function ShadowCard({ className, asChild, ...props }: ShadowCardProps) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      className={cn("relative overflow-hidden rounded-sm", className)}
      data-slot="shadow-card"
      {...props}
    />
  )
}

function ShadowCardBackdrop({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("absolute", className)}
      data-slot="shadow-card-backdrop"
      {...props}
    />
  )
}

function ShadowCardGlow({ className, style, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("absolute", className)}
      data-slot="shadow-card-glow"
      style={style}
      {...props}
    />
  )
}

const DEFAULT_SHADOW_CARD_PIXEL_COLORS: string[][] = [
  [
    "#e8d0e0",
    "#dcc4d8",
    "#d4bcd4",
    "#ccb4d0",
    "#c8b0cc",
    "#c8aec8",
    "#ccb0c8",
    "#d0b4c8",
    "#d8bcc8",
    "#dcc0c8",
  ],
  [
    "#e4c8d8",
    "#d8bcd0",
    "#d0b0c8",
    "#c8a8c0",
    "#c4a0b8",
    "#c4a0b4",
    "#c8a4b4",
    "#d0acb4",
    "#d8b4b8",
    "#e0bcbc",
  ],
  [
    "#e0c0d0",
    "#d4b4c8",
    "#cca8bc",
    "#c49cb0",
    "#c094a8",
    "#c090a0",
    "#c49498",
    "#cc9c98",
    "#d8a8a0",
    "#e0b4a8",
  ],
  [
    "#deb8c8",
    "#d0a8bc",
    "#c89cac",
    "#c0909c",
    "#bc8890",
    "#bc8488",
    "#c08884",
    "#cc9080",
    "#dca088",
    "#e8b094",
  ],
  [
    "#dcb0c0",
    "#cca0b0",
    "#c4909c",
    "#bc848c",
    "#b87c80",
    "#b87874",
    "#c08070",
    "#d09070",
    "#e4a47c",
    "#f0b88c",
  ],
  [
    "#d8a8b8",
    "#c898a4",
    "#c08890",
    "#b87c80",
    "#b47470",
    "#b87064",
    "#c87c5c",
    "#dc9460",
    "#f0ac70",
    "#fcc484",
  ],
  [
    "#d4a0b0",
    "#c49098",
    "#bc8084",
    "#b47474",
    "#b06c64",
    "#b8685c",
    "#cc7850",
    "#e49454",
    "#f8b068",
    "#ffd080",
  ],
  [
    "#d498a8",
    "#c08890",
    "#b8787c",
    "#b06c6c",
    "#ac645c",
    "#b46050",
    "#d07448",
    "#e8944c",
    "#fcb860",
    "#ffe080",
  ],
  [
    "#d09098",
    "#bc8088",
    "#b47074",
    "#ac6464",
    "#a85c54",
    "#b45848",
    "#d47044",
    "#ec9448",
    "#ffc05c",
    "#ffec88",
  ],
  [
    "#cc8890",
    "#b87880",
    "#b0686c",
    "#a85c5c",
    "#a4544c",
    "#b05040",
    "#d86c40",
    "#f09444",
    "#ffc858",
    "#fff490",
  ],
]

type ShadowCardPixelGradientProps = ComponentProps<"div"> & {
  /** Row-major grid of CSS color strings; defaults to the built-in pastel mesh. */
  colors?: string[][]
}

function ShadowCardPixelGradient({
  className,
  colors = DEFAULT_SHADOW_CARD_PIXEL_COLORS,
  ...props
}: ShadowCardPixelGradientProps) {
  return (
    <div
      className={cn("flex h-full w-full flex-col", className)}
      data-slot="shadow-card-pixel-gradient"
      {...props}
    >
      {colors.map((row, i) => (
        <div className="flex flex-1" key={i}>
          {row.map((color, j) => (
            <div
              className="flex-1"
              key={j}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

function ShadowCardVerticalText({
  className,
  style,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("absolute", className)}
      data-slot="shadow-card-vertical-text"
      style={{
        writingMode: "vertical-rl",
        textOrientation: "mixed",
        transform: "rotate(180deg)",
        ...style,
      }}
      {...props}
    />
  )
}

function ShadowCardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("absolute bottom-6 left-6 flex items-end gap-3", className)}
      data-slot="shadow-card-footer"
      {...props}
    />
  )
}

export type { ShadowCardPixelGradientProps, ShadowCardProps }
export {
  ShadowCard,
  ShadowCardBackdrop,
  ShadowCardBevel,
  ShadowCardFooter,
  ShadowCardGlow,
  ShadowCardPixelGradient,
  ShadowCardVerticalText,
}
