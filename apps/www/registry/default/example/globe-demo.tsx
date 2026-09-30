"use client"

import * as React from "react"
import createGlobe from "cobe"
import { useInView, useReducedMotion } from "motion/react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import {
  getShowcaseArcs,
  getShowcaseMarkers,
  showcaseConfigs,
  showcaseDefaultArcs,
  showcaseDefaultMarkers,
} from "@/registry/default/ui/globe"

const DEFAULT_KEY = "default" as const

// ---------------------------------------------------------------------------
// Theme → RGB for the WebGL globe (dark mode only; light matches the default demo look)
// ---------------------------------------------------------------------------

const CSS_RGB_RE = /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i

function probeCssColorToRgb01(color: string): [number, number, number] {
  if (typeof document === "undefined") {
    return [0.5, 0.5, 0.5]
  }
  const el = document.createElement("div")
  el.style.color = color
  el.style.position = "fixed"
  el.style.left = "0"
  el.style.top = "0"
  el.style.opacity = "0"
  el.style.pointerEvents = "none"
  document.body.appendChild(el)
  const rgb = getComputedStyle(el).color
  document.body.removeChild(el)
  const m = rgb.match(CSS_RGB_RE)
  if (!m) {
    return [0.5, 0.5, 0.5]
  }
  return [Number(m[1]) / 255, Number(m[2]) / 255, Number(m[3]) / 255]
}

function cssVarTriplet(name: `--${string}`): [number, number, number] {
  return probeCssColorToRgb01(`var(${name})`)
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

function saturateRgb(
  rgb: [number, number, number],
  amount: number
): [number, number, number] {
  const lum = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
  return [
    clamp01(lum + (rgb[0] - lum) * amount),
    clamp01(lum + (rgb[1] - lum) * amount),
    clamp01(lum + (rgb[2] - lum) * amount),
  ]
}

function useResolvedIsDark(): boolean {
  const { resolvedTheme } = useTheme()
  return resolvedTheme === "dark"
}

type CobeGlobeHandle = {
  update: (state: Record<string, unknown>) => void
  destroy: () => void
}

function anchorLabelStyle(
  id: string,
  kind: "marker" | "arc"
): React.CSSProperties {
  const visible =
    kind === "marker" ? `--cobe-visible-${id}` : `--cobe-visible-arc-${id}`
  const anchor = kind === "marker" ? `--cobe-${id}` : `--cobe-arc-${id}`
  return {
    position: "absolute",
    bottom: "anchor(top)",
    filter: `blur(calc((1 - var(${visible}, 0)) * 8px))`,
    left: "anchor(center)",
    opacity: `var(${visible}, 0)`,
    positionAnchor: anchor,
    transform: "translateX(-50%)",
    transition: "opacity 0.3s ease, filter 0.3s ease",
  } as React.CSSProperties
}

const demoConfig = showcaseConfigs[DEFAULT_KEY]

// ---------------------------------------------------------------------------
// Default showcase globe (interactive COBE + CSS anchor labels)
// ---------------------------------------------------------------------------

export interface DefaultShowcaseGlobeProps {
  className?: string
  globeSize?: number
}

export function DefaultShowcaseGlobe({
  className,
  globeSize = 520,
}: DefaultShowcaseGlobeProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(rootRef, { once: false, margin: "120px" })
  const shouldReduceMotion = useReducedMotion()
  const isDark = useResolvedIsDark()
  const phiAutoRef = React.useRef(0)
  const pointerInteracting = React.useRef<{ x: number; y: number } | null>(null)
  const lastPointer = React.useRef<{ x: number; y: number; t: number } | null>(
    null
  )
  const dragOffset = React.useRef({ phi: 0, theta: 0 })
  const velocity = React.useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = React.useRef(0)
  const thetaOffsetRef = React.useRef(0)
  const isPausedRef = React.useRef(false)
  const speedRef = React.useRef(1)
  const bufferSize = globeSize * 2

  const cobeMarkers = React.useMemo(
    () => getShowcaseMarkers(DEFAULT_KEY, demoConfig.markerSize),
    []
  )
  const cobeArcs = React.useMemo(() => getShowcaseArcs(DEFAULT_KEY), [])

  const handlePointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      pointerInteracting.current = { x: e.clientX, y: e.clientY }
      if (canvasRef.current) {
        canvasRef.current.style.cursor = "grabbing"
      }
      isPausedRef.current = true
    },
    []
  )

  const handlePointerMove = React.useCallback((e: PointerEvent) => {
    if (pointerInteracting.current === null) {
      return
    }
    const deltaX = e.clientX - pointerInteracting.current.x
    const deltaY = e.clientY - pointerInteracting.current.y
    dragOffset.current = { phi: deltaX / 300, theta: deltaY / 1000 }

    const now = Date.now()
    if (lastPointer.current) {
      const dt = Math.max(now - lastPointer.current.t, 1)
      const maxVelocity = 0.15
      velocity.current = {
        phi: Math.max(
          -maxVelocity,
          Math.min(
            maxVelocity,
            ((e.clientX - lastPointer.current.x) / dt) * 0.3
          )
        ),
        theta: Math.max(
          -maxVelocity,
          Math.min(
            maxVelocity,
            ((e.clientY - lastPointer.current.y) / dt) * 0.08
          )
        ),
      }
    }
    lastPointer.current = { x: e.clientX, y: e.clientY, t: now }
  }, [])

  const handlePointerUp = React.useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
      lastPointer.current = null
    }
    pointerInteracting.current = null
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grab"
    }
    isPausedRef.current = false
  }, [])

  React.useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerMove, handlePointerUp])

  React.useEffect(() => {
    if (!(canvasRef.current && isInView)) {
      return
    }

    const canvas = canvasRef.current
    const logicalSize = bufferSize
    const dpr = Math.min(
      window.devicePixelRatio || 1,
      window.innerWidth < 640 ? 1.8 : 2
    )

    let baseColor: [number, number, number]
    let markerColor: [number, number, number]
    let arcColor: [number, number, number]
    let glowColor: [number, number, number]
    let dark: number
    let mapBrightness: number
    let opacity: number

    if (isDark) {
      const cardRgb = cssVarTriplet("--card")
      const mutedRgb = cssVarTriplet("--muted")
      baseColor = [
        cardRgb[0] * 0.52 + 0.03,
        cardRgb[1] * 0.55 + 0.05,
        Math.min(0.96, cardRgb[2] * 0.6 + 0.1),
      ]
      markerColor = saturateRgb(cssVarTriplet("--chart-3"), 1.28)
      arcColor = saturateRgb(cssVarTriplet("--chart-4"), 1.18)
      glowColor = mutedRgb.map((c) => Math.min(1, c * 0.55)) as [
        number,
        number,
        number,
      ]
      dark = 1
      mapBrightness = 6.8
      opacity = 0.88
    } else {
      baseColor = demoConfig.baseColor
      markerColor = demoConfig.markerColor
      arcColor = demoConfig.arcColor
      glowColor = [0.94, 0.93, 0.91]
      dark = demoConfig.dark
      mapBrightness = demoConfig.mapBrightness
      opacity = 0.72
    }

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: logicalSize,
      height: logicalSize,
      phi: phiAutoRef.current + phiOffsetRef.current,
      theta: demoConfig.theta + thetaOffsetRef.current,
      dark,
      diffuse: 1.5,
      mapSamples: 16_000,
      mapBrightness,
      baseColor,
      markerColor,
      glowColor,
      scale: 1,
      offset: [0, 0],
      opacity,
      markers: cobeMarkers,
      arcs: cobeArcs,
      arcColor,
      arcWidth: 0.5,
      arcHeight: 0.25,
      markerElevation: demoConfig.markerElevation,
    } as never) as unknown as CobeGlobeHandle

    let raf = 0
    const tick = () => {
      if (!isPausedRef.current) {
        if (!shouldReduceMotion) {
          phiAutoRef.current += 0.003 * speedRef.current
        }
        if (
          Math.abs(velocity.current.phi) > 0.0001 ||
          Math.abs(velocity.current.theta) > 0.0001
        ) {
          phiOffsetRef.current += velocity.current.phi
          thetaOffsetRef.current += velocity.current.theta
          velocity.current.phi *= 0.95
          velocity.current.theta *= 0.95
        }
        const thetaMin = -0.4
        const thetaMax = 0.4
        if (thetaOffsetRef.current < thetaMin) {
          thetaOffsetRef.current += (thetaMin - thetaOffsetRef.current) * 0.1
        } else if (thetaOffsetRef.current > thetaMax) {
          thetaOffsetRef.current += (thetaMax - thetaOffsetRef.current) * 0.1
        }
      }
      globe.update({
        phi: phiAutoRef.current + phiOffsetRef.current + dragOffset.current.phi,
        theta:
          demoConfig.theta + thetaOffsetRef.current + dragOffset.current.theta,
        width: logicalSize,
        height: logicalSize,
        markers: cobeMarkers,
        arcs: cobeArcs,
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      globe.destroy()
    }
  }, [isInView, cobeMarkers, cobeArcs, bufferSize, shouldReduceMotion, isDark])

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[min(100vw-2rem,640px)]",
        className
      )}
      data-slot="default-showcase-globe"
      ref={rootRef}
    >
      <div
        className="relative mx-auto aspect-square w-full"
        style={{ maxWidth: globeSize, height: globeSize, width: globeSize }}
      >
        <canvas
          className="relative z-1 block size-full max-h-full max-w-full cursor-grab touch-none"
          height={bufferSize}
          onPointerDown={handlePointerDown}
          onPointerEnter={() => {
            speedRef.current = 0.8
          }}
          onPointerLeave={() => {
            speedRef.current = 1
          }}
          ref={canvasRef}
          style={{ contain: "layout paint size" }}
          width={bufferSize}
        />

        {showcaseDefaultMarkers.map((m) => (
          <div
            className="pointer-events-none z-3 rounded-sm border border-chart-4/80 bg-chart-3 px-2 py-1 font-mono text-[9px] text-white uppercase tracking-wide shadow-sm sm:text-[10px] dark:border-chart-2/70 dark:bg-chart-2 dark:text-background"
            key={m.id}
            style={anchorLabelStyle(m.id, "marker")}
          >
            {m.label}
          </div>
        ))}
        {showcaseDefaultArcs.map((a) => (
          <div
            className="pointer-events-none z-3 rounded-sm border-2 border-chart-3 bg-background px-1.5 py-0.5 font-mono text-[8px] text-chart-3 uppercase tracking-wide shadow-sm sm:text-[9px] dark:border-chart-2 dark:bg-card dark:text-chart-2"
            key={a.id}
            style={anchorLabelStyle(a.id, "arc")}
          >
            {a.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DefaultShowcaseGlobe
