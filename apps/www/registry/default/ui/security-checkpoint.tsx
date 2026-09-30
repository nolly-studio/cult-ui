"use client"

import * as React from "react"
import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

export type CheckpointLine = {
  id: string
  color: "blue" | "red"
}

export const CHECKPOINT_LINES: CheckpointLine[] = [
  { id: "line-1", color: "blue" },
  { id: "line-2", color: "red" },
  { id: "line-3", color: "blue" },
  { id: "line-4", color: "red" },
  { id: "line-5", color: "blue" },
  { id: "line-6", color: "red" },
]

export interface SecurityCheckpointProps extends React.ComponentProps<"div"> {
  title?: string
  subtitle?: string
  message?: string
  lines?: CheckpointLine[]
}

export interface SecurityCheckpointLineLayerProps
  extends React.ComponentProps<"div"> {
  lines: CheckpointLine[]
  mounted: boolean
  cardLeft: number
}

export function SecurityCheckpointBlueLines({
  lines,
  mounted,
  cardLeft: _cardLeft,
  className,
  ...props
}: SecurityCheckpointLineLayerProps) {
  return (
    <div
      data-slot="security-checkpoint-blue-lines"
      className={cn(
        "absolute inset-0 flex flex-col items-stretch justify-center",
        className
      )}
      style={{ gap: 18, zIndex: 0 }}
      {...props}
    >
      {lines.map((line, i) =>
        line.color === "blue" ? (
          <div key={line.id} style={{ height: 2 }}>
            <div
              style={{
                height: 2,
                borderRadius: 1,
                width: mounted ? "100%" : "0%",
                transition: `width 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08 + 0.15}s`,
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(147,197,253,0.2) 10%, rgba(96,165,250,0.5) 40%, rgba(59,130,246,0.8) 100%)",
              }}
            />
          </div>
        ) : (
          <div key={line.id} style={{ height: 2 }} />
        )
      )}
    </div>
  )
}

export function SecurityCheckpointRedLines({
  lines,
  mounted,
  cardLeft,
  className,
  ...props
}: SecurityCheckpointLineLayerProps) {
  return (
    <div
      data-slot="security-checkpoint-red-lines"
      className={cn(
        "absolute inset-0 flex flex-col items-stretch justify-center",
        className
      )}
      style={{ gap: 18, zIndex: 0 }}
      {...props}
    >
      {lines.map((line, i) =>
        line.color === "red" ? (
          <div
            key={line.id}
            data-slot="security-checkpoint-red-line-row"
            className="relative"
            style={{ height: 2 }}
          >
            <div
              style={{
                height: 2,
                borderRadius: 1,
                width: mounted && cardLeft > 0 ? cardLeft : 0,
                transition: `width 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08 + 0.2}s`,
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(252,165,165,0.2) 10%, rgba(248,113,113,0.5) 40%, rgba(239,68,68,0.85) 100%)",
              }}
            />
            <span
              data-slot="security-checkpoint-red-line-glow"
              style={{
                position: "absolute",
                left: cardLeft > 0 ? cardLeft - 12 : -100,
                top: "50%",
                transform: "translateY(-50%)",
                width: 24,
                height: 24,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(252,165,165,0.4) 0%, rgba(252,165,165,0.15) 50%, transparent 70%)",
                opacity: mounted ? 1 : 0,
                transition: `opacity 0.3s ease ${i * 0.08 + 0.85}s`,
              }}
            />
            <span
              data-slot="security-checkpoint-red-line-dot"
              style={{
                position: "absolute",
                left: cardLeft > 0 ? cardLeft - 7 : -100,
                top: "50%",
                transform: "translateY(-50%)",
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#ef4444",
                opacity: mounted ? 1 : 0,
                transition: `opacity 0.3s ease ${i * 0.08 + 0.9}s`,
              }}
            />
          </div>
        ) : (
          <div key={line.id} style={{ height: 2 }} />
        )
      )}
    </div>
  )
}

export interface SecurityCheckpointCardProps
  extends React.ComponentProps<"div"> {
  title: string
  subtitle: string
  message: string
  mounted: boolean
}

export const SecurityCheckpointCard = React.forwardRef<
  HTMLDivElement,
  SecurityCheckpointCardProps
>(function SecurityCheckpointCard(
  { title, subtitle, message, className, mounted, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      data-slot="security-checkpoint-card"
      className={cn(
        "relative flex flex-col rounded-[14px] border bg-white border-black/8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.04)] dark:bg-zinc-900 dark:border-white/10 dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_6px_16px_rgba(0,0,0,0.4)]",
        className
      )}
      style={{
        zIndex: 1,
        padding: "16px 20px",
        gap: 12,
        width: 300,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "scale(1)" : "scale(0.97)",
        transition:
          "opacity 0.4s ease 0.1s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
      }}
      {...props}
    >
      <div
        data-slot="security-checkpoint-card-header"
        className="flex items-center"
        style={{ gap: 8 }}
      >
        <div className="flex items-center" style={{ gap: 8, flex: 1 }}>
          <div
            data-slot="security-checkpoint-card-header-accent"
            style={{
              width: 3,
              height: 20,
              borderRadius: 2,
              background: "#2563eb",
            }}
          />
          <span
            className="text-zinc-900 dark:text-zinc-100"
            style={{
              fontSize: 14,
              lineHeight: "20px",
              letterSpacing: "-0.01em",
            }}
          >
            <strong style={{ fontWeight: 600 }}>{title}</strong>{" "}
            <span style={{ fontWeight: 400 }}>{subtitle}</span>
          </span>
        </div>
        <div
          data-slot="security-checkpoint-card-header-dots"
          className="flex items-center"
          style={{ gap: 3 }}
        >
          <span className="size-[5px] rounded-full bg-zinc-900 dark:bg-zinc-100" />
          <span className="size-[5px] rounded-full bg-zinc-400 dark:bg-zinc-500" />
          <span className="size-[5px] rounded-full bg-zinc-300 dark:bg-zinc-600" />
        </div>
      </div>

      <div
        data-slot="security-checkpoint-card-message"
        className="border-l border-black/10 text-zinc-500 dark:border-white/10 dark:text-zinc-400"
        style={{
          paddingLeft: 14,
          fontSize: 13,
          lineHeight: "19px",
          letterSpacing: "-0.005em",
        }}
      >
        {message}
      </div>
    </div>
  )
})

export function SecurityCheckpoint({
  title = "Vercel",
  subtitle = "Security Checkpoint",
  message = "To ensure a smooth and safe experience, we're taking a few moments to verify your browser.",
  lines = CHECKPOINT_LINES,
  className,
  ...props
}: SecurityCheckpointProps) {
  const [mounted, setMounted] = useState(false)
  const [cardLeft, setCardLeft] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const measure = useCallback(() => {
    if (containerRef.current && cardRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const cardRect = cardRef.current.getBoundingClientRect()
      setCardLeft(cardRect.left - containerRect.left)
    }
  }, [])

  useEffect(() => {
    measure()
    setMounted(true)
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [measure])

  return (
    <div
      ref={containerRef}
      data-slot="security-checkpoint"
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-xl bg-[#f8f8f8] dark:bg-zinc-950",
        className
      )}
      style={{
        width: "100%",
        maxWidth: 444,
        height: 200,
      }}
      {...props}
    >
      <SecurityCheckpointBlueLines
        lines={lines}
        mounted={mounted}
        cardLeft={cardLeft}
      />
      <SecurityCheckpointRedLines
        lines={lines}
        mounted={mounted}
        cardLeft={cardLeft}
      />
      <SecurityCheckpointCard
        ref={cardRef}
        title={title}
        subtitle={subtitle}
        message={message}
        mounted={mounted}
      />
    </div>
  )
}

export interface SecurityCheckpointDemoProps
  extends React.ComponentProps<"div"> {}

export default function SecurityCheckpointDemo({
  className,
  ...props
}: SecurityCheckpointDemoProps) {
  return (
    <div
      data-slot="security-checkpoint-demo"
      className={cn(
        "min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-zinc-950",
        className
      )}
      {...props}
    >
      <SecurityCheckpoint />
    </div>
  )
}
