"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useAnimation } from "framer-motion"

interface GradientStop {
  color: string
  position: number
}

interface GradientType {
  stops: GradientStop[]
  centerX: number
  centerY: number
}

interface CanvasFractalGridProps {
  /** Size of each dot in pixels */
  dotSize?: number
  /** Spacing between dots in pixels */
  dotSpacing?: number
  /** Opacity of dots (0-1) */
  dotOpacity?: number
  /** Duration of the background gradient animation in seconds */
  gradientAnimationDuration?: number
  /** Stiffness of mouse tracking (higher values make it more responsive) */
  mouseTrackingStiffness?: number
  /** Damping of mouse tracking (higher values make it less bouncy) */
  mouseTrackingDamping?: number
  /** Intensity of the wave effect when hovering */
  waveIntensity?: number
  /** Radius of the wave effect in pixels */
  waveRadius?: number
  /** Array of gradient configurations for the background */
  gradients?: GradientType[]
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
  /** Enable or disable the gradient animation */
  enableGradient?: boolean
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

const Gradient: React.FC<{
  gradients: GradientType[]
  animationDuration: number
}> = React.memo(({ gradients, animationDuration }) => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      background: gradients.map(
        (g) =>
          `radial-gradient(circle at ${g.centerX}% ${g.centerY}%, ${g.stops
            .map((s) => `${s.color} ${s.position}%`)
            .join(", ")})`
      ),
      transition: {
        duration: animationDuration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      },
    })
  }, [controls, gradients, animationDuration])

  return (
    <motion.div className="absolute inset-0 h-full w-full" animate={controls} />
  )
})

Gradient.displayName = "Gradient"

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

const defaultGradients: GradientType[] = [
  {
    stops: [
      { color: "#FFD6A5", position: 0 },
      { color: "#FFADAD", position: 25 },
      { color: "#FFC6FF", position: 50 },
      { color: "transparent", position: 75 },
    ],
    centerX: 50,
    centerY: 50,
  },
  {
    stops: [
      { color: "#A0C4FF", position: 0 },
      { color: "#BDB2FF", position: 25 },
      { color: "#CAFFBF", position: 50 },
      { color: "transparent", position: 75 },
    ],
    centerX: 60,
    centerY: 40,
  },
  {
    stops: [
      { color: "#9BF6FF", position: 0 },
      { color: "#FDFFB6", position: 25 },
      { color: "#FFAFCC", position: 50 },
      { color: "transparent", position: 75 },
    ],
    centerX: 40,
    centerY: 60,
  },
]

export function CanvasFractalGrid({
  dotSize = 4,
  dotSpacing = 20,
  dotOpacity = 0.3,
  gradientAnimationDuration = 20,
  waveIntensity = 30,
  waveRadius = 200,
  gradients = defaultGradients,
  dotColor = "rgba(100, 100, 255, 1)",
  glowColor = "rgba(100, 100, 255, 1)",
  enableNoise = true,
  noiseOpacity = 0.03,
  enableMouseGlow = true,
  initialPerformance = "medium",
  enableGradient = false,
}: CanvasFractalGridProps) {
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
        key="landing-animation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 overflow-hidden w-full h-full"
      >
        {enableGradient && (
          <Gradient
            gradients={gradients}
            animationDuration={gradientAnimationDuration}
          />
        )}
        {enableGradient && (
          <motion.div
            className="absolute inset-0 h-full w-full"
            style={{
              background: "radial-gradient(circle, transparent, #FFFFFF)",
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              mixBlendMode: "overlay",
            }}
            animate={{
              backgroundPosition: `${mousePos.x * 100}% ${mousePos.y * 100}%`,
            }}
          />
        )}
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

export default React.memo(CanvasFractalGrid)

// export default CanvasFractalGrid

// const Gradient2: React.FC<{
//   gradients: Gradient[]
//   animationDuration: number
// }> = ({ gradients, animationDuration }) => {
//   const controls = useAnimation()

//   useEffect(() => {
//     controls.start({
//       background: gradients.map(
//         (g) =>
//           `radial-gradient(circle at ${g.centerX}% ${g.centerY}%, ${g.stops
//             .map((s) => `${s.color} ${s.position}%`)
//             .join(", ")})`
//       ),
//       transition: {
//         duration: animationDuration,
//         repeat: Infinity,
//         repeatType: "reverse",
//         ease: "easeInOut",
//       },
//     })
//   }, [controls, gradients, animationDuration])

//   return (
//     <motion.div className="absolute inset-0 h-full w-full" animate={controls} />
//   )
// }

// const DotCanvas2: React.FC<{
//   dotSize: number
//   dotSpacing: number
//   dotOpacity: number
//   waveIntensity: number
//   waveRadius: number
//   dotColor: string
//   glowColor: string
//   performance: "low" | "medium" | "high"
//   mouseX: number
//   mouseY: number
// }> = ({
//   dotSize,
//   dotSpacing,
//   dotOpacity,
//   waveIntensity,
//   waveRadius,
//   dotColor,
//   glowColor,
//   performance,
//   mouseX,
//   mouseY,
// }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const animationRef = useRef<number>()
//   const mouseRef = useRef({ x: mouseX, y: mouseY })

//   useEffect(() => {
//     mouseRef.current = { x: mouseX, y: mouseY }
//   }, [mouseX, mouseY])

//   const drawDots = useCallback(
//     (ctx: CanvasRenderingContext2D, time: number) => {
//       const { width, height } = ctx.canvas
//       ctx.clearRect(0, 0, width, height)

//       const performanceSettings = {
//         low: { skip: 3 },
//         medium: { skip: 2 },
//         high: { skip: 1 },
//       }

//       const skip = performanceSettings[performance].skip

//       const cols = Math.ceil(width / dotSpacing)
//       const rows = Math.ceil(height / dotSpacing)

//       const centerX = mouseRef.current.x * width
//       const centerY = mouseRef.current.y * height

//       for (let i = 0; i < cols; i += skip) {
//         for (let j = 0; j < rows; j += skip) {
//           const x = i * dotSpacing
//           const y = j * dotSpacing

//           const distanceX = x - centerX
//           const distanceY = y - centerY
//           const distance = Math.sqrt(
//             distanceX * distanceX + distanceY * distanceY
//           )

//           let dotX = x
//           let dotY = y

//           if (distance < waveRadius) {
//             const waveStrength = Math.pow(1 - distance / waveRadius, 2)
//             const angle = Math.atan2(distanceY, distanceX)
//             const waveOffset =
//               Math.sin(distance * 0.05 - time * 0.005) *
//               waveIntensity *
//               waveStrength
//             dotX += Math.cos(angle) * waveOffset
//             dotY += Math.sin(angle) * waveOffset

//             const glowRadius = dotSize * (1 + waveStrength)
//             const gradient = ctx.createRadialGradient(
//               dotX,
//               dotY,
//               0,
//               dotX,
//               dotY,
//               glowRadius
//             )
//             gradient.addColorStop(
//               0,
//               glowColor.replace("1)", `${dotOpacity * (1 + waveStrength)})`)
//             )
//             gradient.addColorStop(1, glowColor.replace("1)", "0)"))
//             ctx.fillStyle = gradient
//           } else {
//             ctx.fillStyle = dotColor.replace("1)", `${dotOpacity})`)
//           }

//           ctx.beginPath()
//           ctx.arc(dotX, dotY, dotSize / 2, 0, Math.PI * 2)
//           ctx.fill()
//         }
//       }
//     },
//     [
//       dotSize,
//       dotSpacing,
//       dotOpacity,
//       waveIntensity,
//       waveRadius,
//       dotColor,
//       glowColor,
//       performance,
//     ]
//   )

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth
//       canvas.height = window.innerHeight
//     }

//     resizeCanvas()
//     window.addEventListener("resize", resizeCanvas)

//     let lastTime = 0
//     const animate = (time: number) => {
//       if (time - lastTime > 16) {
//         drawDots(ctx, time)
//         lastTime = time
//       }
//       animationRef.current = requestAnimationFrame(animate)
//     }

//     animationRef.current = requestAnimationFrame(animate)

//     return () => {
//       window.removeEventListener("resize", resizeCanvas)
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current)
//       }
//     }
//   }, [drawDots])

//   return (
//     <canvas
//       ref={canvasRef}
//       className="absolute inset-0 h-full w-full bg-gray-100"
//       style={{ mixBlendMode: "multiply" }}
//     />
//   )
// }

// const MouseGlow2: React.FC<{
//   glowColor: string
//   mouseX: any
//   mouseY: any
// }> = ({ glowColor, mouseX, mouseY }) => (
//   <>
//     <motion.div
//       className="absolute w-40 h-40 rounded-full pointer-events-none"
//       style={{
//         background: `radial-gradient(circle, ${glowColor.replace(
//           "1)",
//           "0.2)"
//         )} 0%, ${glowColor.replace("1)", "0)")} 70%)`,
//         x: mouseX,
//         y: mouseY,
//         translateX: "-50%",
//         translateY: "-50%",
//         filter: "blur(10px)",
//       }}
//     />
//     <motion.div
//       className="absolute w-20 h-20 rounded-full pointer-events-none"
//       style={{
//         background: `radial-gradient(circle, ${glowColor.replace(
//           "1)",
//           "0.4)"
//         )} 0%, ${glowColor.replace("1)", "0)")} 70%)`,
//         x: mouseX,
//         y: mouseY,
//         translateX: "-50%",
//         translateY: "-50%",
//       }}
//     />
//   </>
// )
// "use client"

// import React, { useCallback, useEffect, useMemo, useRef } from "react"
// import { AnimatePresence, motion, useAnimation, useSpring } from "framer-motion"

// const NoiseSVG = React.memo(() => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
//     <filter id="noise">
//       <feTurbulence
//         type="fractalNoise"
//         baseFrequency="0.65"
//         numOctaves="3"
//         stitchTiles="stitch"
//       />
//     </filter>
//     <rect width="100%" height="100%" filter="url(#noise)" opacity="0.03" />
//   </svg>
// ))

// NoiseSVG.displayName = "NoiseSVG"

// interface GradientStop {
//   color: string
//   position: number
// }

// interface Gradient {
//   stops: GradientStop[]
//   centerX: number
//   centerY: number
// }

// interface CanvasFractalGridProps {
//   /** Size of each dot in pixels */
//   dotSize?: number
//   /** Spacing between dots in pixels */
//   dotSpacing?: number
//   /** Opacity of dots (0-1) */
//   dotOpacity?: number
//   /** Duration of the background gradient animation in seconds */
//   gradientAnimationDuration?: number
//   /** Stiffness of mouse tracking (higher values make it more responsive) */
//   mouseTrackingStiffness?: number
//   /** Damping of mouse tracking (higher values make it less bouncy) */
//   mouseTrackingDamping?: number
//   /** Intensity of the wave effect when hovering */
//   waveIntensity?: number
//   /** Radius of the wave effect in pixels */
//   waveRadius?: number
//   /** Array of gradient configurations for the background */
//   gradients?: Gradient[]
//   /** Color of the dots (supports any valid CSS color) */
//   dotColor?: string
//   /** Color of the dot glow effect (supports any valid CSS color) */
//   glowColor?: string
//   /** Enable or disable the noise overlay */
//   enableNoise?: boolean
//   /** Opacity of the noise overlay (0-1) */
//   noiseOpacity?: number
//   /** Enable or disable the mouse glow effect */
//   enableMouseGlow?: boolean
// }

// const defaultGradients: Gradient[] = [
//   {
//     stops: [
//       { color: "#FFD6A5", position: 0 },
//       { color: "#FFADAD", position: 25 },
//       { color: "#FFC6FF", position: 50 },
//       { color: "transparent", position: 75 },
//     ],
//     centerX: 50,
//     centerY: 50,
//   },
//   {
//     stops: [
//       { color: "#A0C4FF", position: 0 },
//       { color: "#BDB2FF", position: 25 },
//       { color: "#CAFFBF", position: 50 },
//       { color: "transparent", position: 75 },
//     ],
//     centerX: 60,
//     centerY: 40,
//   },
//   {
//     stops: [
//       { color: "#9BF6FF", position: 0 },
//       { color: "#FDFFB6", position: 25 },
//       { color: "#FFAFCC", position: 50 },
//       { color: "transparent", position: 75 },
//     ],
//     centerX: 40,
//     centerY: 60,
//   },
// ]

// export function CanvasFractalGrid({
//   dotSize = 4,
//   dotSpacing = 20,
//   dotOpacity = 0.3,
//   gradientAnimationDuration = 20,
//   mouseTrackingStiffness = 500,
//   mouseTrackingDamping = 150,
//   waveIntensity = 30,
//   waveRadius = 200,
//   gradients = defaultGradients,
//   dotColor = "rgba(100, 100, 255, 1)",
//   glowColor = "rgba(100, 100, 255, 1)",
//   enableNoise = true,
//   noiseOpacity = 0.03,
//   enableMouseGlow = true,
// }: CanvasFractalGridProps) {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const animationRef = useRef<number>()
//   const mouseRef = useRef({ x: 0, y: 0 })

//   const mouseX = useSpring(0, {
//     stiffness: mouseTrackingStiffness,
//     damping: mouseTrackingDamping,
//   })
//   const mouseY = useSpring(0, {
//     stiffness: mouseTrackingStiffness,
//     damping: mouseTrackingDamping,
//   })

//   const handleMouseMove = useCallback(
//     (event: MouseEvent) => {
//       const { clientX, clientY } = event
//       const { left, top, width, height } =
//         containerRef.current?.getBoundingClientRect() ?? {
//           left: 0,
//           top: 0,
//           width: 0,
//           height: 0,
//         }
//       const x = (clientX - left) / width
//       const y = (clientY - top) / height
//       mouseX.set(x)
//       mouseY.set(y)
//       mouseRef.current = { x, y }
//     },
//     [mouseX, mouseY]
//   )

//   useEffect(() => {
//     window.addEventListener("mousemove", handleMouseMove)
//     return () => window.removeEventListener("mousemove", handleMouseMove)
//   }, [handleMouseMove])

//   const controls = useAnimation()

//   useEffect(() => {
//     controls.start({
//       background: gradients.map(
//         (g) =>
//           `radial-gradient(circle at ${g.centerX}% ${g.centerY}%, ${g.stops
//             .map((s) => `${s.color} ${s.position}%`)
//             .join(", ")})`
//       ),
//       transition: {
//         duration: gradientAnimationDuration,
//         repeat: Infinity,
//         repeatType: "reverse",
//         ease: "easeInOut",
//       },
//     })
//   }, [controls, gradients, gradientAnimationDuration])

//   const drawDots = useCallback(
//     (ctx: CanvasRenderingContext2D, time: number) => {
//       const { width, height } = ctx.canvas
//       ctx.clearRect(0, 0, width, height)

//       const cols = Math.ceil(width / dotSpacing)
//       const rows = Math.ceil(height / dotSpacing)

//       const centerX = mouseRef.current.x * width
//       const centerY = mouseRef.current.y * height

//       for (let i = 0; i < cols; i++) {
//         for (let j = 0; j < rows; j++) {
//           const x = i * dotSpacing
//           const y = j * dotSpacing

//           const distanceX = x - centerX
//           const distanceY = y - centerY
//           const distance = Math.sqrt(
//             distanceX * distanceX + distanceY * distanceY
//           )

//           let dotX = x
//           let dotY = y

//           if (distance < waveRadius) {
//             const waveStrength = Math.pow(1 - distance / waveRadius, 2)
//             const angle = Math.atan2(distanceY, distanceX)
//             const waveOffset =
//               Math.sin(distance * 0.05 - time * 0.005) *
//               waveIntensity *
//               waveStrength
//             dotX += Math.cos(angle) * waveOffset
//             dotY += Math.sin(angle) * waveOffset

//             const glowRadius = dotSize * (1 + waveStrength)
//             const gradient = ctx.createRadialGradient(
//               dotX,
//               dotY,
//               0,
//               dotX,
//               dotY,
//               glowRadius
//             )
//             gradient.addColorStop(
//               0,
//               glowColor.replace("1)", `${dotOpacity * (1 + waveStrength)})`)
//             )
//             gradient.addColorStop(1, glowColor.replace("1)", "0)"))
//             ctx.fillStyle = gradient
//           } else {
//             ctx.fillStyle = dotColor.replace("1)", `${dotOpacity})`)
//           }

//           ctx.beginPath()
//           ctx.arc(dotX, dotY, dotSize / 2, 0, Math.PI * 2)
//           ctx.fill()
//         }
//       }
//     },
//     [
//       dotSize,
//       dotSpacing,
//       dotOpacity,
//       waveIntensity,
//       waveRadius,
//       dotColor,
//       glowColor,
//     ]
//   )

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth
//       canvas.height = window.innerHeight
//     }

//     resizeCanvas()
//     window.addEventListener("resize", resizeCanvas)

//     let lastTime = 0
//     const animate = (time: number) => {
//       if (time - lastTime > 16) {
//         drawDots(ctx, time)
//         lastTime = time
//       }
//       animationRef.current = requestAnimationFrame(animate)
//     }

//     animationRef.current = requestAnimationFrame(animate)

//     return () => {
//       window.removeEventListener("resize", resizeCanvas)
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current)
//       }
//     }
//   }, [drawDots])

//   const gradientStyle = useMemo(
//     () =>
//       ({
//         "--mouse-x": mouseX,
//         "--mouse-y": mouseY,
//       } as React.CSSProperties),
//     [mouseX, mouseY]
//   )

//   return (
//     <AnimatePresence>
//       <motion.div
//         ref={containerRef}
//         key="landing-animation"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 1.5, ease: "easeOut" }}
//         className="absolute inset-0 overflow-hidden w-full h-full"
//         style={gradientStyle}
//       >
//         <motion.div
//           className="absolute inset-0 h-full w-full"
//           animate={controls}
//         />
//         <motion.div
//           className="absolute inset-0 h-full w-full"
//           style={{
//             background: "radial-gradient(circle, transparent, #FFFFFF)",
//             backgroundSize: "100% 100%",
//             backgroundPosition: "center",
//             mixBlendMode: "overlay",
//           }}
//           animate={{
//             backgroundPosition: `calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%)`,
//           }}
//         />
//         <canvas
//           ref={canvasRef}
//           className="absolute inset-0 h-full w-full bg-gray-100"
//           style={{ mixBlendMode: "multiply" }}
//         />
//         {enableNoise && (
//           <div
//             className="absolute inset-0 h-full w-full mix-blend-overlay"
//             style={{ opacity: noiseOpacity }}
//           >
//             <NoiseSVG />
//           </div>
//         )}
//         {enableMouseGlow && (
//           <>
//             <motion.div
//               className="absolute w-40 h-40 rounded-full pointer-events-none"
//               style={{
//                 background: `radial-gradient(circle, ${glowColor.replace(
//                   "1)",
//                   "0.2)"
//                 )} 0%, ${glowColor.replace("1)", "0)")} 70%)`,
//                 x: mouseX,
//                 y: mouseY,
//                 translateX: "-50%",
//                 translateY: "-50%",
//                 filter: "blur(10px)",
//               }}
//             />
//             <motion.div
//               className="absolute w-20 h-20 rounded-full pointer-events-none"
//               style={{
//                 background: `radial-gradient(circle, ${glowColor.replace(
//                   "1)",
//                   "0.4)"
//                 )} 0%, ${glowColor.replace("1)", "0)")} 70%)`,
//                 x: mouseX,
//                 y: mouseY,
//                 translateX: "-50%",
//                 translateY: "-50%",
//               }}
//             />
//           </>
//         )}
//       </motion.div>
//     </AnimatePresence>
//   )
// }

// export default CanvasFractalGrid

// "use client"

// import React, { useCallback, useEffect, useMemo, useRef } from "react"
// import { AnimatePresence, motion, useAnimation, useSpring } from "framer-motion"

// const NoiseSVG = React.memo(() => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
//     <filter id="noise">
//       <feTurbulence
//         type="fractalNoise"
//         baseFrequency="0.65"
//         numOctaves="3"
//         stitchTiles="stitch"
//       />
//     </filter>
//     <rect width="100%" height="100%" filter="url(#noise)" opacity="0.03" />
//   </svg>
// ))

// NoiseSVG.displayName = "NoiseSVG"

// interface LandingAnimationProps {
//   dotSize?: number
//   dotSpacing?: number
//   dotOpacity?: number
//   animationDuration?: number
//   mouseTrackingStiffness?: number
//   mouseTrackingDamping?: number
//   waveIntensity?: number
//   waveRadius?: number
// }

// export function CanvasFractalGrid({
//   dotSize = 4,
//   dotSpacing = 20,
//   dotOpacity = 0.3,
//   animationDuration = 5,
//   mouseTrackingStiffness = 500,
//   mouseTrackingDamping = 150,
//   waveIntensity = 30,
//   waveRadius = 200,
// }: LandingAnimationProps) {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const animationRef = useRef<number>()
//   const mouseRef = useRef({ x: 0, y: 0 })

//   const mouseX = useSpring(0, {
//     stiffness: mouseTrackingStiffness,
//     damping: mouseTrackingDamping,
//   })
//   const mouseY = useSpring(0, {
//     stiffness: mouseTrackingStiffness,
//     damping: mouseTrackingDamping,
//   })

//   const handleMouseMove = useCallback(
//     (event: MouseEvent) => {
//       const { clientX, clientY } = event
//       const { left, top, width, height } =
//         containerRef.current?.getBoundingClientRect() ?? {
//           left: 0,
//           top: 0,
//           width: 0,
//           height: 0,
//         }
//       const x = (clientX - left) / width
//       const y = (clientY - top) / height
//       mouseX.set(x)
//       mouseY.set(y)
//       mouseRef.current = { x, y }
//     },
//     [mouseX, mouseY]
//   )

//   useEffect(() => {
//     window.addEventListener("mousemove", handleMouseMove)
//     return () => window.removeEventListener("mousemove", handleMouseMove)
//   }, [handleMouseMove])

//   const controls = useAnimation()

//   useEffect(() => {
//     controls.start({
//       background: [
//         "radial-gradient(circle at 50% 50%, #FFD6A5 0%, #FFADAD 25%, #FFC6FF 50%, transparent 75%)",
//         "radial-gradient(circle at 60% 40%, #A0C4FF 0%, #BDB2FF 25%, #CAFFBF 50%, transparent 75%)",
//         "radial-gradient(circle at 40% 60%, #9BF6FF 0%, #FDFFB6 25%, #FFAFCC 50%, transparent 75%)",
//       ],
//       transition: {
//         duration: 20,
//         repeat: Infinity,
//         repeatType: "reverse",
//         ease: "easeInOut",
//       },
//     })
//   }, [controls])

//   const drawDots = useCallback(
//     (ctx: CanvasRenderingContext2D, time: number) => {
//       const { width, height } = ctx.canvas
//       ctx.clearRect(0, 0, width, height)

//       const cols = Math.ceil(width / dotSpacing)
//       const rows = Math.ceil(height / dotSpacing)

//       const centerX = mouseRef.current.x * width
//       const centerY = mouseRef.current.y * height

//       for (let i = 0; i < cols; i++) {
//         for (let j = 0; j < rows; j++) {
//           const x = i * dotSpacing
//           const y = j * dotSpacing

//           const distanceX = x - centerX
//           const distanceY = y - centerY
//           const distance = Math.sqrt(
//             distanceX * distanceX + distanceY * distanceY
//           )

//           let dotX = x
//           let dotY = y

//           if (distance < waveRadius) {
//             const waveStrength = Math.pow(1 - distance / waveRadius, 2)
//             const angle = Math.atan2(distanceY, distanceX)
//             const waveOffset =
//               Math.sin(distance * 0.05 - time * 0.005) *
//               waveIntensity *
//               waveStrength
//             dotX += Math.cos(angle) * waveOffset
//             dotY += Math.sin(angle) * waveOffset

//             const glowRadius = dotSize * (1 + waveStrength)
//             const gradient = ctx.createRadialGradient(
//               dotX,
//               dotY,
//               0,
//               dotX,
//               dotY,
//               glowRadius
//             )
//             gradient.addColorStop(
//               0,
//               `rgba(100, 100, 255, ${dotOpacity * (1 + waveStrength)})`
//             )
//             gradient.addColorStop(1, "rgba(100, 100, 255, 0)")
//             ctx.fillStyle = gradient
//           } else {
//             ctx.fillStyle = `rgba(100, 100, 255, ${dotOpacity})`
//           }

//           ctx.beginPath()
//           ctx.arc(dotX, dotY, dotSize / 2, 0, Math.PI * 2)
//           ctx.fill()
//         }
//       }
//     },
//     [dotSize, dotSpacing, dotOpacity, waveIntensity, waveRadius]
//   )

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth
//       canvas.height = window.innerHeight
//     }

//     resizeCanvas()
//     window.addEventListener("resize", resizeCanvas)

//     let lastTime = 0
//     const animate = (time: number) => {
//       if (time - lastTime > 16) {
//         drawDots(ctx, time)
//         lastTime = time
//       }
//       animationRef.current = requestAnimationFrame(animate)
//     }

//     animationRef.current = requestAnimationFrame(animate)

//     let animationId: number

//     animationId = requestAnimationFrame(animate)

//     return () => {
//       window.removeEventListener("resize", resizeCanvas)
//       cancelAnimationFrame(animationId)
//     }
//   }, [drawDots])

//   const gradientStyle = useMemo(
//     () =>
//       ({
//         "--mouse-x": mouseX,
//         "--mouse-y": mouseY,
//       } as React.CSSProperties),
//     [mouseX, mouseY]
//   )

//   return (
//     <AnimatePresence>
//       <motion.div
//         ref={containerRef}
//         key="landing-animation"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 1.5, ease: "easeOut" }}
//         // add -z-10 to fix z-index issue if you want to use this component as a background with no parent element setting bg color
//         className="absolute inset-0  overflow-hidden w-full h-full "
//         style={gradientStyle}
//       >
//         <motion.div
//           className="absolute inset-0 h-full w-full"
//           animate={controls}
//         />
//         <motion.div
//           className="absolute inset-0 h-full w-full"
//           animate={{
//             background: [
//               "radial-gradient(circle at 25% 75%, #FFC6FF 0%, #FFADAD 25%, #FFD6A5 50%, transparent 75%)",
//               "radial-gradient(circle at 25% 25%, #A0C4FF 0%, #BDB2FF 25%, #CAFFBF 50%, transparent 75%)",
//               "radial-gradient(circle at 25% 75%, #9BF6FF 0%, #FDFFB6 25%, #FFAFCC 50%, transparent 75%)",
//             ],
//           }}
//           transition={{
//             duration: 15,
//             repeat: Infinity,
//             repeatType: "reverse",
//             ease: "easeInOut",
//           }}
//         />
//         <motion.div
//           className="absolute inset-0 h-full w-full"
//           style={{
//             background: "radial-gradient(circle, transparent, #FFFFFF)",
//             backgroundSize: "100% 100%",
//             backgroundPosition: "center",
//             mixBlendMode: "overlay",
//           }}
//           animate={{
//             backgroundPosition: `calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%)`,
//           }}
//         />
//         <canvas
//           ref={canvasRef}
//           className="absolute inset-0 h-full w-full bg-gray-100"
//           style={{ mixBlendMode: "multiply" }}
//         />
//         <div className="absolute inset-0 h-full w-full opacity-30 mix-blend-overlay">
//           <NoiseSVG />
//         </div>
//         <motion.div
//           className="absolute w-40 h-40 rounded-full pointer-events-none"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(100,100,255,0.2) 0%, rgba(100,100,255,0) 70%)",
//             x: mouseX,
//             y: mouseY,
//             translateX: "-50%",
//             translateY: "-50%",
//             filter: "blur(10px)",
//           }}
//         />
//         <motion.div
//           className="absolute w-20 h-20 rounded-full pointer-events-none"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(100,100,255,0.4) 0%, rgba(100,100,255,0) 70%)",
//             x: mouseX,
//             y: mouseY,
//             translateX: "-50%",
//             translateY: "-50%",
//           }}
//         />
//       </motion.div>
//     </AnimatePresence>
//   )
// }

// export default CanvasFractalGrid
