"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

import { DistortedGlass } from "@/registry/default/ui/distorted-glass"

export default function DistortedGlassDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Transform values for parallax effects
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const parallaxYSlow = useTransform(scrollYProgress, [0, 1], [0, -100])
  const parallaxYFast = useTransform(scrollYProgress, [0, 1], [0, -300])

  return (
    <div className="relative h-screen flex flex-col overflow-hidden">
      {/* Fixed Distorted Glass Header */}

      {/* Scrollable Content Area - Content scrolls behind the glass */}
      <div ref={containerRef} className="flex-1 overflow-y-auto pt-[50px]">
        <div className="w-full absolute  top-0 left-0 right-0 -mt-[1px]">
          <DistortedGlass className="h-48 w-full" />
        </div>
        {/* Section 1: Large Moving Text - Easy to see distortion */}
        <section className="relative h-96 flex items-center justify-center bg-gradient-to-br from-primary/20 via-primary/10 to-transparent">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-20 left-10 text-8xl font-black text-primary/30 select-none"
              style={{ y: parallaxY }}
              animate={{
                x: [0, 50, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              DISTORTED
            </motion.div>
            <motion.div
              className="absolute top-40 right-10 text-8xl font-black text-primary/30 select-none"
              style={{ y: parallaxYSlow }}
              animate={{
                x: [0, -50, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              GLASS
            </motion.div>
          </div>
        </section>

        {/* Section 2: Grid of Moving Squares */}
        <section className="relative h-[700px] flex items-center justify-center bg-gradient-to-br from-transparent via-primary/10 to-primary/20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="grid grid-cols-8 gap-4 p-8">
              {Array.from({ length: 64 }).map((_, i) => {
                const row = Math.floor(i / 8)
                const col = i % 8
                const squareId = `square-${row}-${col}`
                return (
                  <motion.div
                    key={squareId}
                    className="w-16 h-16 bg-primary rounded-lg border-2 border-primary/50"
                    initial={{ opacity: 0.3 }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.8, 0.3],
                      rotate: [0, 90, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: (row + col) * 0.1,
                      ease: "easeInOut",
                    }}
                    style={{
                      y: parallaxY,
                    }}
                  />
                )
              })}
            </div>
          </div>
        </section>

        {/* Section 3: Radial Circles */}
        <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-primary/20 via-transparent to-primary/10">
          <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
            {Array.from({ length: 5 }).map((_, i) => {
              const size = 200 + i * 80
              const circleId = `circle-${size}`
              return (
                <motion.div
                  key={circleId}
                  className="absolute rounded-full border-4 border-primary/40"
                  style={{
                    width: size,
                    height: size,
                    y: parallaxYSlow,
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 20 + i * 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              )
            })}
          </div>
        </section>

        {/* Section 4: Lines Pattern */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-transparent via-primary/10 to-primary/20">
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => {
              const lineTop = i * 10
              const lineId = `line-${lineTop}`
              return (
                <motion.div
                  key={lineId}
                  className="absolute left-0 right-0 h-1 bg-primary/40"
                  style={{
                    top: `${lineTop}%`,
                    y: parallaxYFast,
                  }}
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                    scaleX: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                />
              )
            })}
          </div>
        </section>

        {/* Final Info Section */}
        <section className="min-h-screen flex items-center justify-center bg-muted/30">
          <div className="max-w-2xl mx-auto p-8 space-y-4 text-center">
            <h2 className="text-3xl font-bold text-foreground">
              About Distorted Glass
            </h2>
            <p className="text-muted-foreground">
              The DistortedGlass component uses SVG filters with fractal noise
              to create a unique glass morphism effect.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
