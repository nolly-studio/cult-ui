// TODO: EXAMPLE + DOCS + REGISTRY
"use client"

import React, { useEffect, useRef, useState } from "react"

interface GlowingButtonProps {
  href: string
  text: string
  glowColor?: string
  textColor?: string
  backgroundColor?: string
}

export default function EnhancedGlowingButton({
  href,
  text,
  glowColor = "#FFAA81",
  textColor = "black",
  backgroundColor = "#d1d1d1",
}: GlowingButtonProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [glowPosition, setGlowPosition] = useState(0)
  const buttonRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!buttonRef.current || !isHovering) return

      const rect = buttonRef.current.getBoundingClientRect()
      const x = event.clientX - rect.left
      const buttonWidth = rect.width
      const percentage = (x / buttonWidth) * 100
      setGlowPosition(percentage)
    }

    if (isHovering) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isHovering])

  return (
    <div className="relative inline-flex items-center z-10 ">
      <div
        className="border-button-light-blur absolute left-1/2 top-1/2 h-[calc(100%+9px)] w-[calc(100%+9px)] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
        style={{ opacity: 1 }}
      >
        <div className="border-button-light relative h-full w-full rounded-full"></div>
      </div>
      <div
        className="border-button-light-blur absolute left-1/2 top-1/2 h-[calc(100%+9px)] w-[calc(100%+9px)] -translate-x-1/2 -translate-y-1/2 scale-x-[-1] transform rounded-full will-change-transform"
        style={{ opacity: 0 }}
      >
        <div className="border-button-light relative h-full w-full rounded-full"></div>
      </div>
      <a
        ref={buttonRef}
        href={href}
        className={`transition-all duration-200 uppercase font-bold flex items-center justify-center h-10  text-12 -tracking-[0.015em] relative z-10 overflow-hidden rounded-full border border-primary/20 space-x-1 px-16 sm:pl-[59px] sm:pr-[52px] bg-gradient-to-br from-background to-muted/50`}
        style={{ backgroundColor }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          className="absolute -z-10 flex w-[204px] items-center justify-center pointer-events-none"
          style={{
            transform: `translateX(calc(${glowPosition}% - 102px)) translateZ(0px)`,
            opacity: isHovering ? 1 : 0,
            transition: "opacity 0.2s ease-in-out, transform 0.1s ease-out",
          }}
        >
          <div
            className="absolute top-1/2 h-[121px] w-[121px] -translate-y-1/2"
            style={{
              background: `radial-gradient(50% 50% at 50% 50%, #FFFFF5 3.5%, ${glowColor} 26.5%, #FFDA9F 37.5%, rgba(255,170,129,0.50) 49%, rgba(210,106,58,0.00) 92.5%)`,
            }}
          ></div>
          <div
            className="absolute top-1/2 h-[103px] w-[204px] -translate-y-1/2 blur-[5px]"
            style={{
              background: `radial-gradient(43.3% 44.23% at 50% 49.51%, #FFFFF7 29%, #FFFACD 48.5%, #F4D2BF 60.71%, rgba(214,211,210,0.00) 100%)`,
            }}
          ></div>
        </div>
        <span style={{ color: textColor }}>{text}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 9"
          className="h-[9px] w-[17px]"
          style={{ color: textColor }}
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="m12.495 0 4.495 4.495-4.495 4.495-.99-.99 2.805-2.805H0v-1.4h14.31L11.505.99z"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </div>
  )
}
