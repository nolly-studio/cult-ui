"use client"

import { useEffect, useId, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

const RAYS = [0, 45, 90, 135, 180, 225, 270, 315] as const

/**
 * Flat header control that toggles light ↔ dark. The glyph morphs in place
 * (sun disc + rays ↔ masked crescent) so the control stays one beat.
 * System preference remains available from the command menu.
 */
export function ModeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const reduceMotion = useReducedMotion()
  const maskId = useId().replace(/:/g, "")

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"
  const duration = reduceMotion ? 0 : 0.45

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "text-muted-foreground hover:text-foreground hover:bg-muted/60 focus-visible:ring-ring relative inline-flex size-9 shrink-0 items-center justify-center rounded-full outline-none",
        "transition-[color,background-color,transform] duration-150 ease-out",
        "active:scale-[0.99] motion-reduce:active:scale-100",
        "focus-visible:ring-2",
        !mounted && "opacity-0",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="size-4 overflow-visible"
        animate={{ rotate: isDark ? -30 : 0 }}
        transition={{ type: "spring", duration, bounce: 0 }}
      >
        <defs>
          <mask id={maskId}>
            <rect width="24" height="24" fill="white" />
            <motion.circle
              fill="black"
              initial={false}
              animate={{
                cx: isDark ? 10 : 30,
                cy: isDark ? 8 : 2,
                r: 7.5,
              }}
              transition={{ type: "spring", duration, bounce: 0 }}
            />
          </mask>
        </defs>

        <motion.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask={`url(#${maskId})`}
          initial={false}
          animate={{ r: isDark ? 8 : 4.5 }}
          transition={{ type: "spring", duration, bounce: 0.18 }}
        />

        {RAYS.map((deg, i) => (
          <g key={deg} transform={`rotate(${deg} 12 12)`}>
            <motion.line
              x1="12"
              y1="2.5"
              x2="12"
              y2="5.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={false}
              animate={{
                opacity: isDark ? 0 : 1,
                y1: isDark ? 5.25 : 2.5,
              }}
              transition={{
                type: "spring",
                duration,
                bounce: 0.2,
                delay: reduceMotion ? 0 : isDark ? 0 : i * 0.02,
              }}
            />
          </g>
        ))}
      </motion.svg>
    </button>
  )
}
