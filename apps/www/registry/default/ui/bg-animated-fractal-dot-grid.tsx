"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface FractalDotGridProps {
  /** Size of each dot in pixels */
  dotSize?: number
  /** Spacing between dots in pixels */
  dotSpacing?: number
  /** Opacity of dots (0-1) */
  dotOpacity?: number
  /** Intensity of the wave effect when hovering */
  waveIntensity?: number
  /** Radius of the wave effect in pixels */
  waveRadius?: number
  /** Color of the dots (supports any valid CSS color) */
  dotColor?: string
  /** Color of the dot glow effect (supports any valid CSS color) */
  glowColor?: string
  /** Enable or disable the noise overlay */
  enableNoise?: boolean
  /** Opacity of the noise overlay (0-1) */
  noiseOpacity?: number
  /** Enable or disable the mouse glow effect */
  enableMouseGlow?: boolean
  /** Set the initial performance level */
  initialPerformance?: "low" | "medium" | "high"
}

const NoiseSVG = React.memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <filter id="noise">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.65"
        numOctaves="3"
        stitchTiles="stitch"
      />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
))

NoiseSVG.displayName = "NoiseSVG"

const NoiseOverlay: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div
    className="absolute inset-0 h-full w-full mix-blend-overlay"
    style={{ opacity }}
  >
    <NoiseSVG />
  </div>
)

const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return {
    isMobile: windowSize.width < 768,
    isTablet: windowSize.width >= 768 && windowSize.width < 1024,
    isDesktop: windowSize.width >= 1024,
  }
}

const usePerformance = (
  initialPerformance: "low" | "medium" | "high" = "medium"
) => {
  const [performance, setPerformance] = useState(initialPerformance)
  const [fps, setFps] = useState(60)

  useEffect(() => {
    let frameCount = 0
    let lastTime = globalThis.performance.now()
    let framerId: number

    const measureFps = (time: number) => {
      frameCount++
      if (time - lastTime > 1000) {
        setFps(Math.round((frameCount * 1000) / (time - lastTime)))
        frameCount = 0
        lastTime = time
      }
      framerId = requestAnimationFrame(measureFps)
    }

    framerId = requestAnimationFrame(measureFps)

    return () => cancelAnimationFrame(framerId)
  }, [])

  useEffect(() => {
    if (fps < 30 && performance !== "low") {
      setPerformance("low")
    } else if (fps >= 30 && fps < 50 && performance !== "medium") {
      setPerformance("medium")
    } else if (fps >= 50 && performance !== "high") {
      setPerformance("high")
    }
  }, [fps, performance])

  return { performance, fps }
}

const DotCanvas: React.FC<{
  dotSize: number
  dotSpacing: number
  dotOpacity: number
  waveIntensity: number
  waveRadius: number
  dotColor: string
  glowColor: string
  performance: "low" | "medium" | "high"
  mousePos: { x: number; y: number }
}> = React.memo(
  ({
    dotSize,
    dotSpacing,
    dotOpacity,
    waveIntensity,
    waveRadius,
    dotColor,
    glowColor,
    performance,
    mousePos,
  }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>()

    const drawDots = useCallback(
      (ctx: CanvasRenderingContext2D, time: number) => {
        const { width, height } = ctx.canvas
        ctx.clearRect(0, 0, width, height)

        const performanceSettings = {
          low: { skip: 3 },
          medium: { skip: 2 },
          high: { skip: 1 },
        }

        const skip = performanceSettings[performance].skip

        const cols = Math.ceil(width / dotSpacing)
        const rows = Math.ceil(height / dotSpacing)

        const centerX = mousePos.x * width
        const centerY = mousePos.y * height

        for (let i = 0; i < cols; i += skip) {
          for (let j = 0; j < rows; j += skip) {
            const x = i * dotSpacing
            const y = j * dotSpacing

            const distanceX = x - centerX
            const distanceY = y - centerY
            const distance = Math.sqrt(
              distanceX * distanceX + distanceY * distanceY
            )

            let dotX = x
            let dotY = y

            if (distance < waveRadius) {
              const waveStrength = Math.pow(1 - distance / waveRadius, 2)
              const angle = Math.atan2(distanceY, distanceX)
              const waveOffset =
                Math.sin(distance * 0.05 - time * 0.005) *
                waveIntensity *
                waveStrength
              dotX += Math.cos(angle) * waveOffset
              dotY += Math.sin(angle) * waveOffset

              const glowRadius = dotSize * (1 + waveStrength)
              const gradient = ctx.createRadialGradient(
                dotX,
                dotY,
                0,
                dotX,
                dotY,
                glowRadius
              )
              gradient.addColorStop(
                0,
                glowColor.replace("1)", `${dotOpacity * (1 + waveStrength)})`)
              )
              gradient.addColorStop(1, glowColor.replace("1)", "0)"))
              ctx.fillStyle = gradient
            } else {
              ctx.fillStyle = dotColor.replace("1)", `${dotOpacity})`)
            }

            ctx.beginPath()
            ctx.arc(dotX, dotY, dotSize / 2, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      },
      [
        dotSize,
        dotSpacing,
        dotOpacity,
        waveIntensity,
        waveRadius,
        dotColor,
        glowColor,
        performance,
        mousePos,
      ]
    )

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }

      resizeCanvas()
      window.addEventListener("resize", resizeCanvas)

      let lastTime = 0
      const animate = (time: number) => {
        if (time - lastTime > 16) {
          drawDots(ctx, time)
          lastTime = time
        }
        animationRef.current = requestAnimationFrame(animate)
      }

      animationRef.current = requestAnimationFrame(animate)

      return () => {
        window.removeEventListener("resize", resizeCanvas)
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }, [drawDots])

    return (
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full bg-gray-100"
        style={{ mixBlendMode: "multiply" }}
      />
    )
  }
)

DotCanvas.displayName = "DotCanvas"

const MouseGlow: React.FC<{
  glowColor: string
  mousePos: { x: number; y: number }
}> = React.memo(({ glowColor, mousePos }) => (
  <>
    <div
      className="absolute w-40 h-40 rounded-full pointer-events-none"
      style={{
        background: `radial-gradient(circle, ${glowColor.replace(
          "1)",
          "0.2)"
        )} 0%, ${glowColor.replace("1)", "0)")} 70%)`,
        left: `${mousePos.x * 100}%`,
        top: `${mousePos.y * 100}%`,
        transform: "translate(-50%, -50%)",
        filter: "blur(10px)",
      }}
    />
    <div
      className="absolute w-20 h-20 rounded-full pointer-events-none"
      style={{
        background: `radial-gradient(circle, ${glowColor.replace(
          "1)",
          "0.4)"
        )} 0%, ${glowColor.replace("1)", "0)")} 70%)`,
        left: `${mousePos.x * 100}%`,
        top: `${mousePos.y * 100}%`,
        transform: "translate(-50%, -50%)",
      }}
    />
  </>
))

MouseGlow.displayName = "MouseGlow"

export function FractalDotGrid({
  dotSize = 4,
  dotSpacing = 20,
  dotOpacity = 0.3,
  waveIntensity = 30,
  waveRadius = 200,
  dotColor = "rgba(100, 100, 255, 1)",
  glowColor = "rgba(100, 100, 255, 1)",
  enableNoise = true,
  noiseOpacity = 0.03,
  enableMouseGlow = true,
  initialPerformance = "medium",
}: FractalDotGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { isMobile, isTablet } = useResponsive()
  const { performance } = usePerformance(initialPerformance)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const { clientX, clientY } = event
    const { left, top, width, height } =
      containerRef.current?.getBoundingClientRect() ?? {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      }
    const x = (clientX - left) / width
    const y = (clientY - top) / height
    setMousePos({ x, y })
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  const responsiveDotSize = useMemo(() => {
    if (isMobile) return dotSize * 0.75
    if (isTablet) return dotSize * 0.9
    return dotSize
  }, [isMobile, isTablet, dotSize])

  const responsiveDotSpacing = useMemo(() => {
    if (isMobile) return dotSpacing * 1.5
    if (isTablet) return dotSpacing * 1.25
    return dotSpacing
  }, [isMobile, isTablet, dotSpacing])

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        key="fractal-dot-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 overflow-hidden w-full h-full"
      >
        <DotCanvas
          dotSize={responsiveDotSize}
          dotSpacing={responsiveDotSpacing}
          dotOpacity={dotOpacity}
          waveIntensity={waveIntensity}
          waveRadius={waveRadius}
          dotColor={dotColor}
          glowColor={glowColor}
          performance={performance}
          mousePos={mousePos}
        />
        {enableNoise && <NoiseOverlay opacity={noiseOpacity} />}
        {enableMouseGlow && (
          <MouseGlow glowColor={glowColor} mousePos={mousePos} />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default FractalDotGrid
