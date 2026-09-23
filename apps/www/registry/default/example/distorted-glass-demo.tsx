"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { DistortedGlass } from "@/registry/default/ui/distorted-glass";

export default function DistortedGlassDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform values for parallax effects
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const parallaxYSlow = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxYFast = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <div className="relative flex h-screen flex-col overflow-hidden">
      {/* Fixed Distorted Glass Header */}

      {/* Scrollable Content Area - Content scrolls behind the glass */}
      <div ref={containerRef} className="flex-1 overflow-y-auto pt-[50px]">
        <div className="absolute top-0 right-0 left-0 -mt-[1px] w-full">
          <DistortedGlass className="h-48 w-full" />
        </div>
        {/* Section 1: Large Moving Text - Easy to see distortion */}
        <section className="from-primary/20 via-primary/10 relative flex h-96 items-center justify-center bg-gradient-to-br to-transparent">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="text-primary/30 absolute top-20 left-10 text-8xl font-black select-none"
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
              className="text-primary/30 absolute top-40 right-10 text-8xl font-black select-none"
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
        <section className="via-primary/10 to-primary/20 relative flex h-[700px] items-center justify-center bg-gradient-to-br from-transparent">
          <div className="absolute inset-0 overflow-hidden">
            <div className="grid grid-cols-8 gap-4 p-8">
              {Array.from({ length: 64 }).map((_, i) => {
                const row = Math.floor(i / 8);
                const col = i % 8;
                const squareId = `square-${row}-${col}`;
                return (
                  <motion.div
                    key={squareId}
                    className="bg-primary border-primary/50 h-16 w-16 rounded-lg border-2"
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
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 3: Radial Circles */}
        <section className="from-primary/20 to-primary/10 relative flex h-[600px] items-center justify-center bg-gradient-to-br via-transparent">
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => {
              const size = 200 + i * 80;
              const circleId = `circle-${size}`;
              return (
                <motion.div
                  key={circleId}
                  className="border-primary/40 absolute rounded-full border-4"
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
              );
            })}
          </div>
        </section>

        {/* Section 4: Lines Pattern */}
        <section className="via-primary/10 to-primary/20 relative flex min-h-screen items-center justify-center bg-gradient-to-br from-transparent">
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => {
              const lineTop = i * 10;
              const lineId = `line-${lineTop}`;
              return (
                <motion.div
                  key={lineId}
                  className="bg-primary/40 absolute right-0 left-0 h-1"
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
              );
            })}
          </div>
        </section>

        {/* Final Info Section */}
        <section className="bg-muted/30 flex min-h-screen items-center justify-center">
          <div className="mx-auto max-w-2xl space-y-4 p-8 text-center">
            <h2 className="text-foreground text-3xl font-bold">
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
  );
}
