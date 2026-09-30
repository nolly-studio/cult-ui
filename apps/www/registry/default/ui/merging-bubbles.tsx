"use client"

import { useId } from "react"

import { cn } from "@/lib/utils"

interface MergingBubblesProps {
  size?: "xs" | "sm" | "md" | "lg"
  className?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  showPlus?: boolean
}

const sizeConfig = {
  xs: { width: 160, height: 72, iconSize: 24, plusSize: 12 },
  sm: { width: 200, height: 88, iconSize: 32, plusSize: 16 },
  md: { width: 280, height: 124, iconSize: 48, plusSize: 22 },
  lg: { width: 400, height: 176, iconSize: 64, plusSize: 28 },
}

export function MergingBubbles({
  size = "md",
  className,
  startIcon,
  endIcon,
  showPlus = true,
}: MergingBubblesProps) {
  const { width, height, iconSize, plusSize } = sizeConfig[size]

  const VB_X = -24
  const VB_W = 400
  const LEFT_CX = 88
  const RIGHT_CX = 264
  const CENTER_X = 176
  const toPixelX = (vbX: number) => ((vbX - VB_X) / VB_W) * width

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
    >
      <svg
        width={width}
        height={height}
        viewBox="-24 0 400 176"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <title>Outer glow/shadow</title>
        {/* Outer glow/shadow */}
        <path
          d="M88,168c-44.18,0-80-35.82-80-80S43.82,8,88,8c17.57,0,33.78,5.66,46.97,15.26,12.22,8.9,25.94,16.74,41.03,16.74h0c15.09,0,28.81-7.84,41.03-16.74C230.22,13.66,246.43,8,264,8c44.18,0,80,35.82,80,80s-35.82,80-80,80c-17.57,0-33.78-5.66-46.97-15.26-12.22-8.9-25.94-16.74-41.03-16.74h0c-15.09,0-28.81,7.84-41.03,16.74C121.78,162.34,105.57,168,88,168Z"
          className="stroke-foreground/10"
          strokeWidth="10"
          fill="none"
        />
        {/* Fill */}
        <path
          d="M88,168c-44.18,0-80-35.82-80-80S43.82,8,88,8c17.57,0,33.78,5.66,46.97,15.26,12.22,8.9,25.94,16.74,41.03,16.74h0c15.09,0,28.81-7.84,41.03-16.74C230.22,13.66,246.43,8,264,8c44.18,0,80,35.82,80,80s-35.82,80-80,80c-17.57,0-33.78-5.66-46.97-15.26-12.22-8.9-25.94-16.74-41.03-16.74h0c-15.09,0-28.81,7.84-41.03,16.74C121.78,162.34,105.57,168,88,168Z"
          className="fill-muted/60"
        />
        {/* Border stroke */}
        <path
          d="M88,168c-44.18,0-80-35.82-80-80S43.82,8,88,8c17.57,0,33.78,5.66,46.97,15.26,12.22,8.9,25.94,16.74,41.03,16.74h0c15.09,0,28.81-7.84,41.03-16.74C230.22,13.66,246.43,8,264,8c44.18,0,80,35.82,80,80s-35.82,80-80,80c-17.57,0-33.78-5.66-46.97-15.26-12.22-8.9-25.94-16.74-41.03-16.74h0c-15.09,0-28.81,7.84-41.03,16.74C121.78,162.34,105.57,168,88,168Z"
          className="stroke-foreground/20"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      {/* Plus symbol in center */}
      {showPlus && (
        <div
          className="absolute top-1/2 -translate-y-1/2 text-foreground/40 font-light leading-none select-none"
          style={{
            fontSize: plusSize,
            left: toPixelX(CENTER_X) - plusSize / 2,
          }}
        >
          +
        </div>
      )}

      {/* Start icon positioned on left circle */}
      {startIcon && (
        <div
          className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
          style={{
            width: iconSize,
            height: iconSize,
            left: toPixelX(LEFT_CX) - iconSize / 2,
          }}
        >
          {startIcon}
        </div>
      )}

      {/* End icon positioned on right circle */}
      {endIcon && (
        <div
          className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
          style={{
            width: iconSize,
            height: iconSize,
            left: toPixelX(RIGHT_CX) - iconSize / 2,
          }}
        >
          {endIcon}
        </div>
      )}
    </div>
  )
}

// Next.js logo icon
export function NextLogo({ className }: { className?: string }) {
  const gradientBaseId = useId()
  const nextGradient1Id = `${gradientBaseId}-nextGradient1`
  const nextGradient2Id = `${gradientBaseId}-nextGradient2`

  return (
    <svg
      viewBox="0 0 16 16"
      className={cn("text-current", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Next Logo</title>
      <defs>
        <linearGradient
          id={nextGradient1Id}
          x1="11.13"
          y1="5"
          x2="11.13"
          y2="11"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="0.609375" stopColor="white" stopOpacity="0.57" />
          <stop offset="0.796875" stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={nextGradient2Id}
          x1="9.9375"
          y1="9.0625"
          x2="13.5574"
          y2="13.3992"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle
        cx="8"
        cy="8"
        r="7.375"
        fill="black"
        stroke="black"
        strokeWidth="1.25"
      />
      <path
        d="M10.63 11V5"
        stroke={`url(#${nextGradient1Id})`}
        strokeWidth="1.25"
        strokeMiterlimit="1.41421"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.995 5.00087V5H4.745V11H5.995V6.96798L12.3615 14.7076C12.712 14.4793 13.0434 14.2242 13.353 13.9453L5.99527 5.00065L5.995 5.00087Z"
        fill={`url(#${nextGradient2Id})`}
      />
    </svg>
  )
}

// Vercel triangle icon
export function VercelLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cn("text-current", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Vercel Logo</title>
      <circle
        cx="8"
        cy="8"
        r="7.25"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 4.5L11.5 10.625H4.5L8 4.5Z"
        className="fill-background"
      />
    </svg>
  )
}
