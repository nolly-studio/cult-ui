"use client"

import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

const WHITESPACE = /\s+/

function initialsFromName(name: string): string {
  const parts = name.trim().split(WHITESPACE).filter(Boolean)
  if (parts.length >= 2) {
    const a = parts[0][0] ?? ""
    const b = parts[1][0] ?? ""
    return `${a}${b}`.toUpperCase()
  }
  const word = parts[0] ?? ""
  if (word.length <= 1) {
    return word.toUpperCase()
  }
  return word.slice(0, 2).toUpperCase()
}

const enterEase = [0.2, 0, 0, 1] as const

export function CollabAvatar({
  name,
  color,
  size = 24,
  className,
}: {
  name: string
  color: string
  size?: number
  className?: string
}) {
  const reduceMotion = useReducedMotion()
  const initials = initialsFromName(name)
  const fontSize = size * 0.38

  return (
    <motion.div
      data-slot="collab-avatar"
      role="img"
      aria-label={name}
      title={name}
      className={cn(
        "relative isolate shrink-0 select-none [-webkit-font-smoothing:antialiased]",
        className
      )}
      initial={
        reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }
      }
      animate={{ opacity: 1, scale: 1 }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.22, ease: enterEase }
      }
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize,
        fontWeight: 600,
        color,
        lineHeight: 1,
        letterSpacing: "-0.03em",
        background: `
          linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, transparent 48%),
          linear-gradient(135deg, ${color}18, ${color}3a)
        `,
        border: `1px solid ${color}55`,
        boxShadow: `
          0 0 0 1px ${color}22,
          0 1px 2px rgba(0, 0, 0, 0.06),
          inset 0 1px 0 rgba(255, 255, 255, 0.28)
        `,
      }}
    >
      <span
        className="pointer-events-none block translate-y-[0.5px] leading-none tracking-tight"
        aria-hidden
      >
        {initials}
      </span>
    </motion.div>
  )
}
