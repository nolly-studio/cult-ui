"use client"

import { useId } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

const FOLDED_CARD_CLIP_PATH =
  "polygon(0 8px, 8px 0, calc(100% - 40px) 0, 100% 40px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px)"

function ChatTail({
  className,
  isLight = true,
  side = "left",
}: {
  className?: string
  isLight?: boolean
  side?: "left" | "right"
}) {
  const maskId = useId().replaceAll(":", "")
  const bubbleFill = isLight ? "var(--card)" : "var(--muted)"
  const bubbleStroke = "var(--border)"
  const mirrorTransform =
    side === "right" ? "translate(24 0) scale(-1 1)" : undefined
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0H24V24H0z" fill="transparent" />
      <mask
        height="24"
        id={maskId}
        maskUnits="userSpaceOnUse"
        style={{ maskType: "alpha" }}
        width="24"
        x="0"
        y="0"
      >
        <path d="M0 0h24v24H0V0z" fill="#D9D9D9" />
      </mask>
      <g mask={`url(#${maskId})`} transform={mirrorTransform}>
        <path
          clipRule="evenodd"
          d="M27-19C15.954-19 7-10.046 7 1c0 .335.008.669.025 1H7v10a15 15 0 01-3 9c4.116 0 7.845-1.658 10.555-4.342A19.915 19.915 0 0027 21c11.046 0 20-8.954 20-20s-8.954-20-20-20z"
          fill={bubbleFill}
          fillRule="evenodd"
        />
        <path
          d="M7.025 2v1h1.05l-.052-1.05-.998.05zM7 2V1H6v1h1zm-3 19l-.8-.6L2 22h2v-1zm10.555-4.342l.623-.783-.695-.553-.631.625.703.71zM8 1c0-10.493 8.507-19 19-19v-2C15.402-20 6-10.598 6 1h2zm.023.95A19.327 19.327 0 018 1H6c0 .352.009.702.026 1.05l1.997-.1zM7 3h.025V1H7v2zm1 9V2H6v10h2zm-3.2 9.6A16 16 0 008 12H6a14 14 0 01-2.8 8.4l1.6 1.2zm9.052-5.653A13.952 13.952 0 014 20v2c4.39 0 8.37-1.77 11.259-4.632l-1.407-1.42zM27 20c-4.47 0-8.577-1.542-11.822-4.125l-1.245 1.565A20.915 20.915 0 0027 22v-2zM46 1c0 10.493-8.507 19-19 19v2c11.598 0 21-9.402 21-21h-2zM27-18c10.493 0 19 8.507 19 19h2c0-11.598-9.402-21-21-21v2z"
          fill={bubbleStroke}
        />
      </g>
    </svg>
  )
}

function FoldedCard({
  className,
  style,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("relative mx-auto max-w-sm", className)}
      data-slot="folded-card"
      style={{ clipPath: FOLDED_CARD_CLIP_PATH, ...style }}
      {...props}
    />
  )
}

function FoldedCardFold({ className, ...props }: React.ComponentProps<"div">) {
  const gradientId = useId().replaceAll(":", "")

  return (
    <div
      className={cn(
        "pointer-events-none absolute top-0 right-0 z-30 h-10 w-10",
        className
      )}
      data-slot="folded-card-fold"
      {...props}
    >
      <svg
        aria-hidden="true"
        className="h-full w-full"
        fill="none"
        focusable="false"
        viewBox="0 0 40 40"
      >
        <defs>
          <linearGradient id={gradientId} x1="100%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="var(--card)" />
            <stop offset="40%" stopColor="var(--muted)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
        </defs>
        <path d="M0 0 L40 40 L40 0 Z" fill={`url(#${gradientId})`} />
        <line
          stroke="var(--border)"
          strokeWidth="1"
          x1="0"
          x2="40"
          y1="0"
          y2="40"
        />
        <path
          d="M36 18 L36 4 L22 4"
          fill="none"
          stroke="var(--border)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
      </svg>
      <div className="absolute inset-0 border-b border-l bg-muted" />
    </div>
  )
}

function FoldedCardLink({
  className,
  style,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "group relative block overflow-hidden bg-card no-underline transition-shadow hover:shadow-lg",
        className
      )}
      data-slot="folded-card-link"
      style={{ clipPath: FOLDED_CARD_CLIP_PATH, ...style }}
      {...props}
    />
  )
}

function FoldedCardBorder({
  className,
  style,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-20 rounded-b-xl rounded-tl-xl",
        className
      )}
      data-slot="folded-card-border"
      style={{
        clipPath: FOLDED_CARD_CLIP_PATH,
        background: "var(--border)",
        padding: "1px",
        WebkitMask:
          "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        ...style,
      }}
      {...props}
    />
  )
}

function FoldedCardPreview({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative h-[228px] overflow-hidden rounded-b-xl rounded-tl-xl bg-muted/40",
        className
      )}
      data-slot="folded-card-preview"
      {...props}
    />
  )
}

type FoldedCardGridProps = React.ComponentProps<"div"> & {
  rows?: number
  columns?: number
}

function FoldedCardGrid({
  className,
  rows = 4,
  columns = 4,
  ...props
}: FoldedCardGridProps) {
  const rowCount = Math.max(1, Math.floor(rows))
  const columnCount = Math.max(1, Math.floor(columns))

  return (
    <div
      className={cn("absolute inset-0", className)}
      data-slot="folded-card-grid"
      {...props}
    >
      {Array.from({ length: rowCount - 1 }, (_, index) => (
        <hr
          className="absolute w-full border border-border/30 border-t border-dashed"
          key={`row-${index + 1}`}
          style={{ top: `${((index + 1) / rowCount) * 100}%` }}
        />
      ))}

      {Array.from({ length: columnCount - 1 }, (_, index) => (
        <hr
          className="absolute h-full border border-border/30 border-l border-dashed"
          key={`column-${index + 1}`}
          style={{ left: `${((index + 1) / columnCount) * 100}%` }}
        />
      ))}
    </div>
  )
}

function FoldedCardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 border-border border-t bg-card px-4 py-3",
        className
      )}
      data-slot="folded-card-footer"
      {...props}
    />
  )
}

function FoldedCardHeading({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      data-slot="folded-card-heading"
      {...props}
    />
  )
}

function FoldedCardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("font-medium text-foreground text-sm", className)}
      data-slot="folded-card-title"
      {...props}
    />
  )
}

function FoldedCardBadge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "rounded-full bg-primary px-2 py-0.5 font-medium text-primary-foreground text-xs",
        className
      )}
      data-slot="folded-card-badge"
      {...props}
    />
  )
}

function FoldedCardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "line-clamp-3 text-muted-foreground text-sm leading-relaxed",
        className
      )}
      data-slot="folded-card-description"
      {...props}
    />
  )
}

export {
  ChatTail,
  FoldedCard,
  FoldedCardFold,
  FoldedCardLink,
  FoldedCardBorder,
  FoldedCardPreview,
  FoldedCardGrid,
  FoldedCardFooter,
  FoldedCardHeading,
  FoldedCardTitle,
  FoldedCardBadge,
  FoldedCardDescription,
}
