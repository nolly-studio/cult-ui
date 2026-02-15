"use client"

import React, { useRef, useState } from "react"
import { HTMLMotionProps, motion, useSpring, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

interface TiltProps extends HTMLMotionProps<"div"> {
  maxRotation?: number
  scale?: number
  springOptions?: {
    stiffness?: number
    damping?: number
    mass?: number
  }
}

export function Tilt({
  children,
  maxRotation = 15,
  scale = 1.05,
  springOptions = {
    stiffness: 300,
    damping: 30,
    mass: 1,
  },
  className,
  ...props
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useSpring(0, springOptions)
  const y = useSpring(0, springOptions)

  const rotateX = useTransform(y, [-0.5, 0.5], [maxRotation, -maxRotation])
  const rotateY = useTransform(x, [-0.5, 0.5], [-maxRotation, maxRotation])
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    const xPos = mouseX / width - 0.5
    const yPos = mouseY / height - 0.5

    x.set(xPos)
    y.set(yPos)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale: isHovered ? scale : 1,
        transformStyle: "preserve-3d",
      }}
      className={cn("relative", className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Tilt
