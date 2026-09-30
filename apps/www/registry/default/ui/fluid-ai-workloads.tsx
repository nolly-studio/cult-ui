"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface FluidAIWorkloadsProps
  extends Omit<React.ComponentProps<"svg">, "width" | "height"> {
  width?: number
  height?: number
  backgroundColor?: string
  cardFill?: string
  cardStroke?: string
  bubbleFill?: string
  bubbleStroke?: string
  logoColor?: string
  lineColorTop?: string
  lineColorUpperMid?: string
  lineColorLowerMid?: string
  lineColorBottom?: string
  connectorLineColor?: string
  connectorDotFill?: string
  connectorDotStroke?: string
}

function FluidAIWorkloadsDefs({
  shadowFilterId,
  leftCardClipId,
  centerLogoClipId,
}: {
  shadowFilterId: string
  leftCardClipId: string
  centerLogoClipId: string
}) {
  return (
    <defs data-slot="fluid-ai-workloads-defs">
      <filter
        id={shadowFilterId}
        x="-10"
        y="-10"
        width="500"
        height="250"
        filterUnits="userSpaceOnUse"
      >
        <feGaussianBlur stdDeviation="2" />
      </filter>
      <clipPath id={leftCardClipId}>
        <rect x="2" y="31" width="163" height="130" rx="12" />
      </clipPath>
      <clipPath id={centerLogoClipId}>
        <rect x="190.592" y="62.35" width="66.816" height="67.013" rx="12" />
      </clipPath>
    </defs>
  )
}

function FluidAIWorkloadsShadowLayer({
  shadowFilterId,
}: {
  shadowFilterId: string
}) {
  return (
    <g
      data-slot="fluid-ai-workloads-shadow-layer"
      opacity="0.04"
      filter={`url(#${shadowFilterId})`}
    >
      <rect x="2" y="32.67" width="163" height="130.39" rx="12" fill="black" />
      <path
        d="M191 76.76C191 70.14 196.37 64.76 203 64.76H245C251.63 64.76 257 70.14 257 76.76V118.96C257 125.59 251.63 130.96 245 130.96H203C196.37 130.96 191 125.59 191 118.96V76.76Z"
        fill="black"
      />
      <path
        d="M313 166.04C313 161.62 316.58 158.04 321 158.04H438C442.42 158.04 446 161.62 446 166.04V185C446 189.42 442.42 193 438 193H321C316.58 193 313 189.42 313 185V166.04Z"
        fill="black"
      />
      <path
        d="M313 114.89C313 110.47 316.58 106.89 321 106.89H438C442.42 106.89 446 110.47 446 114.89V133.85C446 138.27 442.42 141.85 438 141.85H321C316.58 141.85 313 138.27 313 133.85V114.89Z"
        fill="black"
      />
      <path
        d="M313 62.16C313 57.74 316.58 54.16 321 54.16H438C442.42 54.16 446 57.74 446 62.16V81.12C446 85.53 442.42 89.12 438 89.12H321C316.58 89.12 313 85.53 313 81.12V62.16Z"
        fill="black"
      />
      <path
        d="M313 11.01C313 6.59 316.58 3.01 321 3.01H438C442.42 3.01 446 6.59 446 11.01V29.96C446 34.38 442.42 37.96 438 37.96H321C316.58 37.96 313 34.38 313 29.96V11.01Z"
        fill="black"
      />
    </g>
  )
}

function FluidAIWorkloadsLeftCard({
  leftCardClipId,
  cardFill,
  cardStroke,
  bubbleFill,
  bubbleStroke,
  dotColor,
}: {
  leftCardClipId: string
  cardFill: string
  cardStroke: string
  bubbleFill: string
  bubbleStroke: string
  dotColor: string
}) {
  return (
    <g data-slot="fluid-ai-workloads-left-card">
      <g clipPath={`url(#${leftCardClipId})`}>
        <rect x="2" y="31" width="163" height="130" rx="12" fill={cardFill} />
        <circle
          cx="15.06"
          cy="43.76"
          r="3.26"
          fill={dotColor}
          fillOpacity="0.08"
        />
        <circle
          cx="24.86"
          cy="43.76"
          r="3.26"
          fill={dotColor}
          fillOpacity="0.08"
        />
        <circle
          cx="34.65"
          cy="43.76"
          r="3.26"
          fill={dotColor}
          fillOpacity="0.08"
        />
        <rect
          x="17"
          y="61"
          width="98"
          height="16"
          rx="8"
          fill={bubbleFill}
          stroke={bubbleStroke}
          strokeWidth="1"
        />
        <rect
          x="17"
          y="87"
          width="49"
          height="16"
          rx="8"
          fill={bubbleFill}
          stroke={bubbleStroke}
          strokeWidth="1"
        />
        <rect
          x="101"
          y="113"
          width="50"
          height="17"
          rx="8"
          fill={bubbleFill}
          stroke={bubbleStroke}
          strokeWidth="1"
        />
        <rect
          x="17"
          y="140"
          width="65"
          height="41"
          rx="8"
          fill={bubbleFill}
          stroke={bubbleStroke}
          strokeWidth="1"
        />
      </g>
      <rect
        x="1.5"
        y="30.5"
        width="164"
        height="131"
        rx="12.5"
        stroke={cardStroke}
      />
    </g>
  )
}

function FluidAIWorkloadsCenterCard({
  cardFill,
  cardStroke,
  logoColor,
  centerLogoClipId,
}: {
  cardFill: string
  cardStroke: string
  logoColor: string
  centerLogoClipId: string
}) {
  return (
    <g data-slot="fluid-ai-workloads-center-card">
      <path
        d="M245 62.35C251.85 62.35 257.41 67.9 257.41 74.76V116.96C257.41 123.81 251.85 129.36 245 129.36H203C196.15 129.36 190.59 123.81 190.59 116.96V74.76C190.59 67.9 196.15 62.35 203 62.35H245Z"
        fill={cardFill}
      />
      <path
        d="M245 62.35C251.85 62.35 257.41 67.9 257.41 74.76V116.96C257.41 123.81 251.85 129.36 245 129.36H203C196.15 129.36 190.59 123.81 190.59 116.96V74.76C190.59 67.9 196.15 62.35 203 62.35H245Z"
        stroke={cardStroke}
        strokeWidth="0.82"
      />
      <g clipPath={`url(#${centerLogoClipId})`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M224 86.47L233.79 103.61H214.2L224 86.47Z"
          fill={logoColor}
        />
      </g>
    </g>
  )
}

function FluidAIWorkloadsBranchLines({
  lineColorBottom,
  lineColorTop,
  lineColorLowerMid,
  lineColorUpperMid,
}: {
  lineColorBottom: string
  lineColorTop: string
  lineColorLowerMid: string
  lineColorUpperMid: string
}) {
  return (
    <g data-slot="fluid-ai-workloads-branch-lines">
      <path
        d="M244 95.857L276 95.858C282.63 95.858 288 101.23 288 107.86V161.09C288 167.72 293.37 173.09 300 173.09C316.05 173.09 330.36 173.09 330.36 173.09"
        stroke={lineColorBottom}
        strokeWidth="2"
      />
      <path
        d="M244 95.858L276 95.857C282.63 95.857 288 90.48 288 83.86V30.63C288 24 293.37 18.63 300 18.63C316.05 18.63 330.36 18.63 330.36 18.63"
        stroke={lineColorTop}
        strokeWidth="2"
      />
      <path
        d="M243.59 95.856L276 95.856C282.63 95.857 288 101.23 288 107.86V111.94C288 117.46 292.48 121.94 298 121.94C314.75 121.94 329.98 121.94 329.98 121.94"
        stroke={lineColorLowerMid}
        strokeWidth="2"
      />
      <path
        d="M243.59 95.858L276 95.858C282.63 95.858 288 90.49 288 83.86V79.78C288 74.26 292.48 69.78 298 69.78C314.75 69.78 329.98 69.78 329.98 69.78"
        stroke={lineColorUpperMid}
        strokeWidth="2"
      />
    </g>
  )
}

function FluidAIWorkloadsRightCards({
  cardFill,
  cardStroke,
  connectorDotFill,
  connectorDotStroke,
}: {
  cardFill: string
  cardStroke: string
  connectorDotFill: string
  connectorDotStroke: string
}) {
  return (
    <g data-slot="fluid-ai-workloads-right-cards">
      <path
        d="M438 0.5C442.69 0.5 446.5 4.31 446.5 9V27.96C446.5 32.65 442.69 36.46 438 36.46H321C316.31 36.46 312.5 32.65 312.5 27.96V9C312.5 4.31 316.31 0.5 321 0.5H438Z"
        fill={cardFill}
      />
      <path
        d="M438 0.5C442.69 0.5 446.5 4.31 446.5 9V27.96C446.5 32.65 442.69 36.46 438 36.46H321C316.31 36.46 312.5 32.65 312.5 27.96V9C312.5 4.31 316.31 0.5 321 0.5H438Z"
        stroke={cardStroke}
      />

      <path
        d="M438 51.65C442.69 51.65 446.5 55.46 446.5 60.15V79.11C446.5 83.8 442.69 87.61 438 87.61H321C316.31 87.61 312.5 83.8 312.5 79.11V60.15C312.5 55.46 316.31 51.65 321 51.65H438Z"
        fill={cardFill}
      />
      <path
        d="M438 51.65C442.69 51.65 446.5 55.46 446.5 60.15V79.11C446.5 83.8 442.69 87.61 438 87.61H321C316.31 87.61 312.5 83.8 312.5 79.11V60.15C312.5 55.46 316.31 51.65 321 51.65H438Z"
        stroke={cardStroke}
      />
      <circle
        cx="312.27"
        cy="69.65"
        r="3.76"
        fill={connectorDotFill}
        stroke={connectorDotStroke}
      />

      <path
        d="M438 104.38C442.69 104.38 446.5 108.19 446.5 112.88V131.84C446.5 136.54 442.69 140.34 438 140.34H321C316.31 140.34 312.5 136.54 312.5 131.84V112.88C312.5 108.19 316.31 104.38 321 104.38H438Z"
        fill={cardFill}
      />
      <path
        d="M438 104.38C442.69 104.38 446.5 108.19 446.5 112.88V131.84C446.5 136.54 442.69 140.34 438 140.34H321C316.31 140.34 312.5 136.54 312.5 131.84V112.88C312.5 108.19 316.31 104.38 321 104.38H438Z"
        stroke={cardStroke}
      />
      <circle
        cx="312.5"
        cy="121.88"
        r="3.76"
        fill={connectorDotFill}
        stroke={connectorDotStroke}
      />

      <path
        d="M438 155.54C442.69 155.54 446.5 159.34 446.5 164.04V182.99C446.5 187.69 442.69 191.49 438 191.49H321C316.31 191.49 312.5 187.69 312.5 182.99V164.04C312.5 159.34 316.31 155.54 321 155.54H438Z"
        fill={cardFill}
      />
      <path
        d="M438 155.54C442.69 155.54 446.5 159.34 446.5 164.04V182.99C446.5 187.69 442.69 191.49 438 191.49H321C316.31 191.49 312.5 187.69 312.5 182.99V164.04C312.5 159.34 316.31 155.54 321 155.54H438Z"
        stroke={cardStroke}
      />
      <circle
        cx="312.27"
        cy="173.04"
        r="3.76"
        fill={connectorDotFill}
        stroke={connectorDotStroke}
      />
    </g>
  )
}

function FluidAIWorkloads({
  width = 448,
  height = 195,
  backgroundColor = "var(--background)",
  cardFill = "var(--card)",
  cardStroke = "var(--border)",
  bubbleFill = "var(--muted)",
  bubbleStroke = "var(--border)",
  logoColor = "var(--foreground)",
  lineColorTop = "#52AEFF",
  lineColorUpperMid = "#E5484D",
  lineColorLowerMid = "#FFB224",
  lineColorBottom = "#45DEC4",
  connectorLineColor = "var(--muted-foreground)",
  connectorDotFill = "var(--card)",
  connectorDotStroke = "var(--border)",
  className,
  ...props
}: FluidAIWorkloadsProps) {
  const idBase = React.useId().replaceAll(":", "")
  const shadowFilterId = `${idBase}-shadow-filter`
  const leftCardClipId = `${idBase}-left-card-clip`
  const centerLogoClipId = `${idBase}-center-logo-clip`

  return (
    <svg
      data-slot="fluid-ai-workloads"
      width={width}
      height={height}
      viewBox="0 0 448 195"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <title>Fluid AI workloads illustration</title>
      <rect width="448" height="195" fill={backgroundColor} />
      <FluidAIWorkloadsDefs
        shadowFilterId={shadowFilterId}
        leftCardClipId={leftCardClipId}
        centerLogoClipId={centerLogoClipId}
      />
      <FluidAIWorkloadsShadowLayer shadowFilterId={shadowFilterId} />
      <FluidAIWorkloadsLeftCard
        leftCardClipId={leftCardClipId}
        cardFill={cardFill}
        cardStroke={cardStroke}
        bubbleFill={bubbleFill}
        bubbleStroke={bubbleStroke}
        dotColor={logoColor}
      />
      <path
        data-slot="fluid-ai-workloads-connector"
        d="M166.047 95.856H191.348"
        stroke={connectorLineColor}
        strokeWidth="1.63"
      />
      <FluidAIWorkloadsCenterCard
        cardFill={cardFill}
        cardStroke={cardStroke}
        logoColor={logoColor}
        centerLogoClipId={centerLogoClipId}
      />
      <FluidAIWorkloadsBranchLines
        lineColorBottom={lineColorBottom}
        lineColorTop={lineColorTop}
        lineColorLowerMid={lineColorLowerMid}
        lineColorUpperMid={lineColorUpperMid}
      />
      <FluidAIWorkloadsRightCards
        cardFill={cardFill}
        cardStroke={cardStroke}
        connectorDotFill={connectorDotFill}
        connectorDotStroke={connectorDotStroke}
      />
    </svg>
  )
}

export {
  FluidAIWorkloads,
  FluidAIWorkloadsDefs,
  FluidAIWorkloadsShadowLayer,
  FluidAIWorkloadsLeftCard,
  FluidAIWorkloadsCenterCard,
  FluidAIWorkloadsBranchLines,
  FluidAIWorkloadsRightCards,
}
