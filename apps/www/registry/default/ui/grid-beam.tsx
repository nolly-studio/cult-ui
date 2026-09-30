"use client"

import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentProps,
  type CSSProperties,
  type MutableRefObject,
  type RefObject,
} from "react"

import { cn } from "@/lib/utils"

// ─── Color palettes ───────────────────────────────────────────────

export type RGB = readonly [number, number, number]

export type PaletteBand = Readonly<{
  color: RGB
  op: number
}>

export type GridBeamPaletteLayers = Readonly<{
  h: readonly PaletteBand[]
  v: readonly PaletteBand[]
}>

export const PALETTES = {
  colorful: {
    dark: {
      h: [
        { color: [255, 50, 100] as const, op: 0.38 },
        { color: [40, 180, 220] as const, op: 0.35 },
        { color: [50, 200, 80] as const, op: 0.38 },
        { color: [180, 40, 240] as const, op: 0.35 },
        { color: [255, 160, 30] as const, op: 0.38 },
        { color: [100, 70, 255] as const, op: 0.35 },
      ],
      v: [
        { color: [40, 140, 255] as const, op: 0.38 },
        { color: [240, 50, 180] as const, op: 0.35 },
        { color: [30, 185, 170] as const, op: 0.38 },
        { color: [255, 120, 40] as const, op: 0.38 },
        { color: [100, 70, 255] as const, op: 0.35 },
        { color: [50, 200, 80] as const, op: 0.38 },
      ],
    },
    light: {
      h: [
        { color: [200, 30, 70] as const, op: 0.28 },
        { color: [20, 140, 180] as const, op: 0.24 },
        { color: [30, 160, 50] as const, op: 0.28 },
        { color: [140, 20, 200] as const, op: 0.24 },
        { color: [210, 120, 10] as const, op: 0.28 },
        { color: [70, 40, 210] as const, op: 0.24 },
      ],
      v: [
        { color: [20, 100, 210] as const, op: 0.28 },
        { color: [200, 30, 140] as const, op: 0.24 },
        { color: [15, 145, 130] as const, op: 0.28 },
        { color: [210, 90, 20] as const, op: 0.28 },
        { color: [70, 40, 210] as const, op: 0.24 },
        { color: [30, 160, 50] as const, op: 0.28 },
      ],
    },
  },
  mono: {
    dark: {
      h: [
        { color: [200, 200, 200] as const, op: 0.16 },
        { color: [180, 180, 180] as const, op: 0.13 },
        { color: [190, 190, 190] as const, op: 0.16 },
        { color: [175, 175, 175] as const, op: 0.13 },
        { color: [195, 195, 195] as const, op: 0.16 },
        { color: [185, 185, 185] as const, op: 0.13 },
      ],
      v: [
        { color: [185, 185, 185] as const, op: 0.16 },
        { color: [170, 170, 170] as const, op: 0.13 },
        { color: [195, 195, 195] as const, op: 0.16 },
        { color: [180, 180, 180] as const, op: 0.13 },
        { color: [190, 190, 190] as const, op: 0.16 },
        { color: [175, 175, 175] as const, op: 0.13 },
      ],
    },
    light: {
      h: [
        { color: [90, 90, 90] as const, op: 0.13 },
        { color: [110, 110, 110] as const, op: 0.1 },
        { color: [80, 80, 80] as const, op: 0.13 },
        { color: [100, 100, 100] as const, op: 0.1 },
        { color: [85, 85, 85] as const, op: 0.13 },
        { color: [95, 95, 95] as const, op: 0.1 },
      ],
      v: [
        { color: [100, 100, 100] as const, op: 0.13 },
        { color: [80, 80, 80] as const, op: 0.1 },
        { color: [90, 90, 90] as const, op: 0.13 },
        { color: [110, 110, 110] as const, op: 0.1 },
        { color: [85, 85, 85] as const, op: 0.13 },
        { color: [95, 95, 95] as const, op: 0.1 },
      ],
    },
  },
  ocean: {
    dark: {
      h: [
        { color: [100, 80, 255] as const, op: 0.38 },
        { color: [60, 140, 255] as const, op: 0.35 },
        { color: [80, 100, 220] as const, op: 0.38 },
        { color: [130, 70, 255] as const, op: 0.35 },
        { color: [50, 120, 230] as const, op: 0.38 },
        { color: [110, 90, 240] as const, op: 0.35 },
      ],
      v: [
        { color: [70, 130, 255] as const, op: 0.38 },
        { color: [120, 80, 240] as const, op: 0.35 },
        { color: [90, 110, 230] as const, op: 0.38 },
        { color: [60, 100, 255] as const, op: 0.35 },
        { color: [140, 100, 255] as const, op: 0.38 },
        { color: [80, 120, 220] as const, op: 0.35 },
      ],
    },
    light: {
      h: [
        { color: [60, 50, 180] as const, op: 0.28 },
        { color: [40, 100, 210] as const, op: 0.24 },
        { color: [50, 70, 190] as const, op: 0.28 },
        { color: [90, 50, 200] as const, op: 0.24 },
        { color: [30, 80, 200] as const, op: 0.28 },
        { color: [70, 60, 210] as const, op: 0.24 },
      ],
      v: [
        { color: [50, 90, 220] as const, op: 0.28 },
        { color: [80, 60, 200] as const, op: 0.24 },
        { color: [60, 80, 210] as const, op: 0.28 },
        { color: [40, 70, 200] as const, op: 0.24 },
        { color: [100, 80, 230] as const, op: 0.28 },
        { color: [55, 85, 195] as const, op: 0.24 },
      ],
    },
  },
  sunset: {
    dark: {
      h: [
        { color: [255, 100, 60] as const, op: 0.38 },
        { color: [255, 180, 50] as const, op: 0.35 },
        { color: [255, 80, 80] as const, op: 0.38 },
        { color: [255, 140, 40] as const, op: 0.35 },
        { color: [255, 200, 60] as const, op: 0.38 },
        { color: [255, 120, 50] as const, op: 0.35 },
      ],
      v: [
        { color: [255, 160, 70] as const, op: 0.38 },
        { color: [255, 90, 60] as const, op: 0.35 },
        { color: [255, 200, 50] as const, op: 0.38 },
        { color: [255, 70, 70] as const, op: 0.35 },
        { color: [255, 150, 40] as const, op: 0.38 },
        { color: [255, 100, 80] as const, op: 0.35 },
      ],
    },
    light: {
      h: [
        { color: [200, 70, 30] as const, op: 0.28 },
        { color: [210, 140, 20] as const, op: 0.24 },
        { color: [190, 50, 50] as const, op: 0.28 },
        { color: [200, 100, 20] as const, op: 0.24 },
        { color: [220, 160, 30] as const, op: 0.28 },
        { color: [195, 80, 25] as const, op: 0.24 },
      ],
      v: [
        { color: [210, 120, 40] as const, op: 0.28 },
        { color: [190, 60, 40] as const, op: 0.24 },
        { color: [220, 160, 25] as const, op: 0.28 },
        { color: [185, 45, 45] as const, op: 0.24 },
        { color: [200, 110, 20] as const, op: 0.28 },
        { color: [195, 75, 50] as const, op: 0.24 },
      ],
    },
  },
} as const satisfies Record<
  string,
  Record<"dark" | "light", GridBeamPaletteLayers>
>

export type GridBeamPaletteKey = keyof typeof PALETTES

export type GridBeamColorScheme = "dark" | "light"

export type GridBeamThemeProp = GridBeamColorScheme | "auto"

function subscribePreferredColorScheme(onChange: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)")
  mq.addEventListener("change", onChange)
  return () => mq.removeEventListener("change", onChange)
}

function getPreferredColorSchemeSnapshot(): GridBeamColorScheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function useResolvedColorScheme(theme: GridBeamThemeProp): GridBeamColorScheme {
  const systemScheme = useSyncExternalStore(
    subscribePreferredColorScheme,
    getPreferredColorSchemeSnapshot,
    () => "light" as GridBeamColorScheme
  )
  if (theme === "auto") {
    return systemScheme
  }
  return theme
}

export function resolveGridBeamPalette(
  colorVariant: GridBeamPaletteKey,
  scheme: GridBeamColorScheme
): GridBeamPaletteLayers {
  const variant = PALETTES[colorVariant]
  if (!variant) {
    return PALETTES.colorful.dark
  }
  return variant[scheme] ?? PALETTES.colorful.dark
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t)
}

function gaussian(x: number, s: number): number {
  return Math.exp(-(x * x) / (2 * s * s))
}

export type BeamCanvasRuntimeConfig = Readonly<{
  rows: number
  cols: number
  palette: GridBeamPaletteLayers
  active: boolean
  fadingOut: boolean
  fadeStart: number | null
  duration: number
  strength: number
  breathe: boolean
}>

function useBeamCanvas(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  config: MutableRefObject<BeamCanvasRuntimeConfig>
) {
  const animRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: animation reads latest `config.current` each frame; only canvas mount should restart the loop.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) {
      return
    }
    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    startRef.current = performance.now()

    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: single canvas frame renderer; splitting would obscure the math.
    const draw = (now: number) => {
      const {
        rows,
        cols,
        palette,
        active,
        fadingOut,
        fadeStart,
        duration,
        strength,
        breathe,
      } = config.current
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      ctx.clearRect(0, 0, w, h)

      if (!(active || fadingOut)) {
        animRef.current = requestAnimationFrame(draw)
        return
      }

      const elapsed = (now - (startRef.current ?? now)) / 1000
      let fade = 1
      if (fadingOut && fadeStart) {
        fade = Math.max(0, 1 - (now - fadeStart) / 600)
        if (fade <= 0) {
          animRef.current = requestAnimationFrame(draw)
          return
        }
      } else if (active) {
        fade = smoothstep(Math.min(1, elapsed / 0.8))
      }

      const cellW = w / cols
      const cellH = h / rows
      const gs = fade * strength
      const br = breathe
        ? 0.85 + 0.3 * Math.sin(elapsed * 1.4) + 0.1 * Math.sin(elapsed * 2.3)
        : 1

      const rgba = (r: number, g: number, b: number, a: number) =>
        `rgba(${r},${g},${b},${Math.max(0, a).toFixed(4)})`

      for (let r = 1; r < rows; r++) {
        const y = r * cellH
        const pal = palette.h[r % palette.h.length]
        const [cr, cg, cb] = pal.color
        const op = pal.op
        const speed = 1 + (r % 3) * 0.12
        const offset = r * 0.21 + (r % 2) * 0.35
        const t = ((elapsed * speed) / duration + offset) % 1
        const x = t * w

        const bloomLen = cellW * 0.6 * br
        const bloomH = 4
        const bloomGrad = ctx.createRadialGradient(x, y, 0, x, y, bloomLen)
        bloomGrad.addColorStop(0, rgba(cr, cg, cb, op * 0.3 * gs))
        bloomGrad.addColorStop(0.4, rgba(cr, cg, cb, op * 0.12 * gs))
        bloomGrad.addColorStop(1, "transparent")
        ctx.save()
        ctx.scale(1, bloomH / bloomLen)
        ctx.fillStyle = bloomGrad
        ctx.beginPath()
        ctx.arc(x, (y * bloomLen) / bloomH, bloomLen, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        const coreLen = cellW * 0.55 * br
        const lineGrad = ctx.createLinearGradient(
          x - coreLen,
          y,
          x + coreLen,
          y
        )
        lineGrad.addColorStop(0, "transparent")
        lineGrad.addColorStop(0.12, rgba(cr, cg, cb, op * 0.4 * gs))
        lineGrad.addColorStop(
          0.35,
          rgba(
            Math.min(255, cr + 60),
            Math.min(255, cg + 60),
            Math.min(255, cb + 60),
            op * 0.8 * gs
          )
        )
        lineGrad.addColorStop(
          0.5,
          rgba(
            Math.min(255, cr + 100),
            Math.min(255, cg + 100),
            Math.min(255, cb + 100),
            op * 1.0 * gs
          )
        )
        lineGrad.addColorStop(
          0.65,
          rgba(
            Math.min(255, cr + 60),
            Math.min(255, cg + 60),
            Math.min(255, cb + 60),
            op * 0.8 * gs
          )
        )
        lineGrad.addColorStop(0.88, rgba(cr, cg, cb, op * 0.4 * gs))
        lineGrad.addColorStop(1, "transparent")
        ctx.strokeStyle = lineGrad
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(x - coreLen, y)
        ctx.lineTo(x + coreLen, y)
        ctx.stroke()
      }

      for (let c = 1; c < cols; c++) {
        const x = c * cellW
        const pal = palette.v[c % palette.v.length]
        const [cr, cg, cb] = pal.color
        const op = pal.op
        const speed = 1 + (c % 3) * 0.1
        const offset = c * 0.26 + (c % 2) * 0.4
        const t = ((elapsed * speed) / (duration * 1.2) + offset) % 1
        const y = t * h

        const bloomLen = cellH * 0.6 * br
        const bloomW = 4
        const bloomGrad = ctx.createRadialGradient(x, y, 0, x, y, bloomLen)
        bloomGrad.addColorStop(0, rgba(cr, cg, cb, op * 0.3 * gs))
        bloomGrad.addColorStop(0.4, rgba(cr, cg, cb, op * 0.12 * gs))
        bloomGrad.addColorStop(1, "transparent")
        ctx.save()
        ctx.scale(bloomW / bloomLen, 1)
        ctx.fillStyle = bloomGrad
        ctx.beginPath()
        ctx.arc((x * bloomLen) / bloomW, y, bloomLen, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        const coreLen = cellH * 0.55 * br
        const lineGrad = ctx.createLinearGradient(
          x,
          y - coreLen,
          x,
          y + coreLen
        )
        lineGrad.addColorStop(0, "transparent")
        lineGrad.addColorStop(0.12, rgba(cr, cg, cb, op * 0.4 * gs))
        lineGrad.addColorStop(
          0.35,
          rgba(
            Math.min(255, cr + 60),
            Math.min(255, cg + 60),
            Math.min(255, cb + 60),
            op * 0.8 * gs
          )
        )
        lineGrad.addColorStop(
          0.5,
          rgba(
            Math.min(255, cr + 100),
            Math.min(255, cg + 100),
            Math.min(255, cb + 100),
            op * 1.0 * gs
          )
        )
        lineGrad.addColorStop(
          0.65,
          rgba(
            Math.min(255, cr + 60),
            Math.min(255, cg + 60),
            Math.min(255, cb + 60),
            op * 0.8 * gs
          )
        )
        lineGrad.addColorStop(0.88, rgba(cr, cg, cb, op * 0.4 * gs))
        lineGrad.addColorStop(1, "transparent")
        ctx.strokeStyle = lineGrad
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(x, y - coreLen)
        ctx.lineTo(x, y + coreLen)
        ctx.stroke()
      }

      for (let r = 1; r < rows; r++) {
        for (let c = 1; c < cols; c++) {
          const ix = c * cellW
          const iy = r * cellH
          const hSpeed = 1 + (r % 3) * 0.12
          const hOffset = r * 0.21 + (r % 2) * 0.35
          const ht = ((elapsed * hSpeed) / duration + hOffset) % 1
          const hx = ht * w
          const vSpeed = 1 + (c % 3) * 0.1
          const vOffset = c * 0.26 + (c % 2) * 0.4
          const vt = ((elapsed * vSpeed) / (duration * 1.2) + vOffset) % 1
          const vy = vt * h

          const proxH = gaussian((hx - ix) / cellW, 0.25)
          const proxV = gaussian((vy - iy) / cellH, 0.25)
          const prox = proxH * proxV

          if (prox > 0.05) {
            const pH = palette.h[r % palette.h.length]
            const pV = palette.v[c % palette.v.length]
            const mr = Math.floor((pH.color[0] + pV.color[0]) / 2)
            const mg = Math.floor((pH.color[1] + pV.color[1]) / 2)
            const mb = Math.floor((pH.color[2] + pV.color[2]) / 2)
            const fr = 3.5 * Math.sqrt(prox)
            const fop = prox * 0.6 * gs

            const fg = ctx.createRadialGradient(ix, iy, 0, ix, iy, fr)
            fg.addColorStop(
              0,
              rgba(
                Math.min(255, mr + 140),
                Math.min(255, mg + 140),
                Math.min(255, mb + 140),
                fop
              )
            )
            fg.addColorStop(0.5, rgba(mr, mg, mb, fop * 0.4))
            fg.addColorStop(1, "transparent")
            ctx.fillStyle = fg
            ctx.beginPath()
            ctx.arc(ix, iy, fr, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => {
      if (animRef.current !== null) {
        cancelAnimationFrame(animRef.current)
      }
      ro.disconnect()
    }
  }, [canvasRef])
}

export type UseGridBeamOptions = Readonly<{
  rows?: number
  cols?: number
  colorVariant?: GridBeamPaletteKey
  /** Resolved automatically when `"auto"` via `prefers-color-scheme`. */
  theme?: GridBeamThemeProp
  active?: boolean
  duration?: number
  strength?: number
  breathe?: boolean
}>

export type UseGridBeamResult = Readonly<{
  canvasRef: RefObject<HTMLCanvasElement | null>
  palette: GridBeamPaletteLayers
  resolvedScheme: GridBeamColorScheme
  rows: number
  cols: number
  fadingOut: boolean
  fadeStart: number | null
}>

/**
 * Headless state for the grid beam canvas: palette resolution, fade-out when `active` becomes false,
 * and a ref to attach to {@link GridBeamCanvas}.
 */
export function useGridBeam({
  rows: rowsProp = 3,
  cols: colsProp = 4,
  colorVariant = "colorful",
  theme = "dark",
  active = true,
  duration = 3,
  strength = 1,
  breathe = true,
}: UseGridBeamOptions): UseGridBeamResult {
  const rows = Math.max(2, rowsProp)
  const cols = Math.max(2, colsProp)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [fadingOut, setFadingOut] = useState(false)
  const [fadeStart, setFadeStart] = useState<number | null>(null)
  const prevActive = useRef(active)

  const resolvedScheme = useResolvedColorScheme(theme)

  const palette = useMemo(
    () => resolveGridBeamPalette(colorVariant, resolvedScheme),
    [colorVariant, resolvedScheme]
  )

  useEffect(() => {
    if (prevActive.current && !active) {
      setFadingOut(true)
      setFadeStart(performance.now())
      const timer = window.setTimeout(() => setFadingOut(false), 700)
      prevActive.current = active
      return () => window.clearTimeout(timer)
    }
    prevActive.current = active
  }, [active])

  const configRef = useRef<BeamCanvasRuntimeConfig>({
    rows,
    cols,
    palette,
    active,
    fadingOut,
    fadeStart,
    duration,
    strength,
    breathe,
  })
  configRef.current = {
    rows,
    cols,
    palette,
    active,
    fadingOut,
    fadeStart,
    duration,
    strength,
    breathe,
  }

  useBeamCanvas(canvasRef, configRef)

  return {
    canvasRef,
    palette,
    resolvedScheme,
    rows,
    cols,
    fadingOut,
    fadeStart,
  }
}

export type GridBeamDividersProps = ComponentProps<"svg"> &
  Readonly<{
    rows: number
    cols: number
    /** Grid line color (default `var(--border)` from shadcn theme). */
    dividerStroke?: string
  }>

/** SVG grid lines only — pair with {@link GridBeamCanvas} and your own layout. */
export function GridBeamDividers({
  rows,
  cols,
  dividerStroke = "var(--border)",
  className,
  ...props
}: GridBeamDividersProps) {
  return (
    <svg
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-1 h-full w-full",
        className
      )}
      preserveAspectRatio="none"
      role="presentation"
      {...props}
    >
      {Array.from({ length: rows - 1 }, (_, r) => {
        const y = `${((r + 1) / rows) * 100}%`
        return (
          <line
            key={`h-${rows}-${y}`}
            stroke={dividerStroke}
            strokeWidth={1}
            x1="0"
            x2="100%"
            y1={y}
            y2={y}
          />
        )
      })}
      {Array.from({ length: cols - 1 }, (_, c) => {
        const x = `${((c + 1) / cols) * 100}%`
        return (
          <line
            key={`v-${cols}-${x}`}
            stroke={dividerStroke}
            strokeWidth={1}
            x1={x}
            x2={x}
            y1="0"
            y2="100%"
          />
        )
      })}
    </svg>
  )
}

export type GridBeamCanvasProps = ComponentProps<"canvas"> &
  Readonly<{
    borderRadius?: number
  }>

export const GridBeamCanvas = forwardRef<
  HTMLCanvasElement,
  GridBeamCanvasProps
>(function GridBeamCanvas({ className, style, borderRadius, ...props }, ref) {
  return (
    <canvas
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-2 h-full w-full",
        className
      )}
      ref={ref}
      style={{ borderRadius, ...style } as CSSProperties}
      {...props}
    />
  )
})

export type GridBeamContentProps = ComponentProps<"div">

/** Slot above the beam layers — default `z-index` stacks content on top. */
export function GridBeamContent({ className, ...props }: GridBeamContentProps) {
  return (
    <div
      className={cn("relative z-3", className)}
      data-slot="grid-beam-content"
      {...props}
    />
  )
}

export type GridBeamProps = UseGridBeamOptions &
  ComponentProps<"div"> &
  Readonly<{
    /** Corner radius for the root and canvas (divider SVG is rectangular). */
    borderRadius?: number
  }>

/**
 * Opinionated composition: root + dividers + canvas + content slot.
 * For full control, call {@link useGridBeam} and assemble {@link GridBeamDividers}, {@link GridBeamCanvas}, {@link GridBeamContent} yourself.
 */
export function GridBeam({
  children,
  className,
  style,
  borderRadius,
  rows,
  cols,
  colorVariant,
  theme,
  active,
  duration,
  strength,
  breathe,
  ...props
}: GridBeamProps) {
  const {
    canvasRef,
    rows: r,
    cols: c,
  } = useGridBeam({
    rows,
    cols,
    colorVariant,
    theme,
    active,
    duration,
    strength,
    breathe,
  })

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      data-slot="grid-beam"
      style={{ borderRadius, ...style }}
      {...props}
    >
      <GridBeamDividers cols={c} rows={r} />
      <GridBeamCanvas borderRadius={borderRadius} ref={canvasRef} />
      <GridBeamContent>{children}</GridBeamContent>
    </div>
  )
}
