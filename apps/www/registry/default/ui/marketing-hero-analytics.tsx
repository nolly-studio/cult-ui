"use client"

import type * as React from "react"
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react"

import { cn } from "@/lib/utils"

export type AnalyticsHeroChartDatum = {
  label: string
  value: number
}

export type AnalyticsHeroSourceIconKey =
  | "google"
  | "vercel"
  | "x"
  | "yc"
  | "splitbee"
  | "linear"
  | "github"

export type AnalyticsHeroSource = {
  name: string
  visitors: number
  icon: AnalyticsHeroSourceIconKey
}

export type AnalyticsHeroLog = {
  time: string
  rt: "mw" | "fe"
  method: string
  status: number
  path: string
}

export const ANALYTICS_HERO_CHART_DATA: AnalyticsHeroChartDatum[] = [
  { label: "Fri May 10 6am - 7am", value: 142_310 },
  { label: "Fri May 10 7am - 8am", value: 142_310 },
  { label: "Fri May 10 8am - 9am", value: 285_420 },
  { label: "Fri May 10 9am - 10am", value: 428_530 },
  { label: "Fri May 10 10am - 11am", value: 428_530 },
  { label: "Fri May 10 11am - 12pm", value: 609_797 },
  { label: "Fri May 10 12pm - 1pm", value: 752_640 },
  { label: "Fri May 10 1pm - 2pm", value: 618_070 },
  { label: "Fri May 10 2pm - 3pm", value: 895_750 },
  { label: "Fri May 10 3pm - 4pm", value: 752_640 },
  { label: "Fri May 10 4pm - 5pm", value: 895_750 },
  { label: "Fri May 10 5pm - 6pm", value: 895_750 },
  { label: "Fri May 10 6pm - 7pm", value: 1_038_860 },
]

export const ANALYTICS_HERO_SOURCES: AnalyticsHeroSource[] = [
  { name: "google.com", visitors: 259_010, icon: "google" },
  { name: "vercel.com", visitors: 132_821, icon: "vercel" },
  { name: "x.com", visitors: 51_280, icon: "x" },
  { name: "ycombinator.com", visitors: 27_102, icon: "yc" },
  { name: "splitbee.com", visitors: 20_186, icon: "splitbee" },
  { name: "linear.com", visitors: 18_281, icon: "linear" },
  { name: "github.blog", visitors: 13_021, icon: "github" },
]

export const ANALYTICS_HERO_LOGS: AnalyticsHeroLog[] = [
  {
    time: "24:59",
    rt: "mw",
    method: "GET",
    status: 200,
    path: "/app/front/ap...",
  },
  { time: "24.52", rt: "fe", method: "GET", status: 200, path: "/status/api" },
  { time: "24.50", rt: "mw", method: "GET", status: 200, path: "/docs" },
  { time: "24.43", rt: "fe", method: "GET", status: 200, path: "/api/jwt" },
]

export const ANALYTICS_HERO_STOPS = [
  "#FF975C",
  "#FAA95A",
  "#F5BE57",
  "#EED353",
  "#EAE550",
  "#D7E84B",
  "#C2E447",
  "#B2E444",
  "#9ADD3E",
  "#84DB40",
  "#67D141",
  "#4ECB42",
  "#37C442",
] as const

export function getAnalyticsHeroColor(index: number) {
  return ANALYTICS_HERO_STOPS[Math.min(index, ANALYTICS_HERO_STOPS.length - 1)]
}

export function AnalyticsHeroGoogleIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      data-slot="analytics-hero-icon-google"
      focusable="false"
      height="15"
      viewBox="0 0 16 16"
      width="15"
      {...props}
    >
      <path
        d="M8.16 6.545v3.098h4.305c-.189.996-.756 1.84-1.607 2.407l2.596 2.015c1.513-1.397 2.386-3.448 2.386-5.884 0-.567-.051-1.113-.145-1.636H8.16z"
        fill="#4285F4"
      />
      <path
        d="M3.676 9.523l-.585.448-2.073 1.615c1.316 2.61 4.014 4.414 7.142 4.414 2.16 0 3.971-.717 5.294-1.94l-2.596-2.015c-.713.48-1.622.771-2.698.771-2.08 0-3.847-1.404-4.48-3.295l-.004.002z"
        fill="#34A853"
      />
      <path
        d="M1.018 4.415A7.81 7.81 0 00.16 8c0 1.294.313 2.509.858 3.585l2.662-2.066A4.632 4.632 0 013.425 8c0-.531.095-1.04.255-1.52L1.018 4.415z"
        fill="#FBBC05"
      />
      <path
        d="M8.16 3.185c1.178 0 2.226.407 3.062 1.193l2.29-2.29C12.123.793 10.32 0 8.16 0 5.033 0 2.334 1.796 1.018 4.415l2.662 2.065c.632-1.891 2.4-3.295 4.48-3.295z"
        fill="#EA4335"
      />
    </svg>
  )
}

export function AnalyticsHeroVercelIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      data-slot="analytics-hero-icon-vercel"
      focusable="false"
      height="15"
      viewBox="0 0 16 16"
      width="15"
      {...props}
    >
      <path d="M8 1L16 15H0L8 1Z" fill="currentColor" />
    </svg>
  )
}

export function AnalyticsHeroXIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      data-slot="analytics-hero-icon-x"
      focusable="false"
      height="15"
      viewBox="0 0 16 16"
      width="15"
      {...props}
    >
      <path
        d="M0.5 0.5H5.75L9.48 5.71L14 0.5H16L10.39 6.97L16.5 15.5H11.25L7.52 10.29L3 15.5H1L6.61 9.03L0.5 0.5ZM12.02 14L3.42 2H4.98L13.58 14H12.02Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function AnalyticsHeroYcIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      data-slot="analytics-hero-icon-yc"
      focusable="false"
      height="15"
      viewBox="0 0 16 16"
      width="15"
      {...props}
    >
      <rect fill="#FB651E" height="16" rx="1" width="16" />
      <path
        d="M7.46 9.047L4.715 3.902h1.255l1.615 3.256.087.18.087.193.037.064.025.056c.041.083.079.164.112.242.033.079.062.151.087.218a6.55 6.55 0 01.218-.454c.079-.161.16-.329.242-.497l1.64-3.258h1.169l-2.771 5.207v3.318H7.461V9.047z"
        fill="white"
      />
    </svg>
  )
}

export function AnalyticsHeroSplitbeeIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      data-slot="analytics-hero-icon-splitbee"
      focusable="false"
      height="15"
      viewBox="0 0 16 16"
      width="15"
      {...props}
    >
      <circle
        cx="8"
        cy="10"
        fill="#FFC700"
        r="5"
        stroke="#222"
        strokeWidth="0.6"
      />
      <ellipse
        cx="6"
        cy="4.5"
        fill="white"
        rx="2"
        ry="2.7"
        stroke="#222"
        strokeWidth="0.6"
        transform="rotate(-10 6 4.5)"
      />
      <ellipse
        cx="5.2"
        cy="5.8"
        fill="white"
        rx="2.4"
        ry="1.6"
        stroke="#222"
        strokeWidth="0.6"
        transform="rotate(25 5.2 5.8)"
      />
      <circle cx="11.2" cy="9" fill="#222" r="0.55" />
    </svg>
  )
}

export function AnalyticsHeroLinearIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      data-slot="analytics-hero-icon-linear"
      focusable="false"
      height="15"
      viewBox="0 0 16 16"
      width="15"
      {...props}
    >
      <path
        d="M1.172 9.613c-.031-.133.127-.216.223-.12l5.112 5.112c.096.097.013.255-.12.224a7.002 7.002 0 01-5.215-5.216zM1 7.564a.167.167 0 01.04.106l7.289 7.289a.167.167 0 00.106.04c.33-.02.656-.064.975-.13a.147.147 0 00.067-.13L1.36 6.523a.147.147 0 00-.13.067 7.12 7.12 0 00-.13.975zM1.59 5.16a.167.167 0 00.029.154l9.068 9.069a.167.167 0 00.154.029c.25-.112.493-.236.726-.375a.167.167 0 00.026-.216L2.181 4.407a.167.167 0 00-.215.026 7.09 7.09 0 00-.376.726zM2.772 3.53a.167.167 0 00-.006-.19A6.996 6.996 0 017.993 1C11.863 1 15 4.137 15 8.007a6.997 6.997 0 01-2.341 5.227.167.167 0 01-.19-.006L2.773 3.53z"
        fill="#5E6AD2"
      />
    </svg>
  )
}

export function AnalyticsHeroGithubIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      data-slot="analytics-hero-icon-github"
      focusable="false"
      height="15"
      viewBox="0 0 16 16"
      width="15"
      {...props}
    >
      <path
        d="M8 0C3.58 0 0 3.579 0 7.997c0 3.539 2.29 6.528 5.47 7.588.37.07.52-.24.52-.45 0-.2-.01-.83-.01-1.5-2 .37-2.52-.86-2.68-1.31-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.88 2.33.67.07-.53.28-.88.51-1.08-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.56 7.56 0 014 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 7.997C16 3.579 12.42 0 8 0z"
        fill="currentColor"
      />
    </svg>
  )
}

export const ANALYTICS_HERO_ICONS: Record<
  AnalyticsHeroSourceIconKey,
  (props: React.ComponentProps<"svg">) => React.JSX.Element
> = {
  google: AnalyticsHeroGoogleIcon,
  vercel: AnalyticsHeroVercelIcon,
  x: AnalyticsHeroXIcon,
  yc: AnalyticsHeroYcIcon,
  splitbee: AnalyticsHeroSplitbeeIcon,
  linear: AnalyticsHeroLinearIcon,
  github: AnalyticsHeroGithubIcon,
}

export interface AnalyticsHeroCrosshairProps
  extends React.ComponentProps<"div"> {}

export function AnalyticsHeroCrosshair({
  className,
  ...props
}: AnalyticsHeroCrosshairProps) {
  return (
    <div
      className={cn("absolute", className)}
      data-slot="analytics-hero-crosshair"
      {...props}
    >
      <div className="relative h-[14px] w-[14px]">
        <div
          className="-translate-x-1/2 absolute top-0 left-1/2 h-full w-px"
          style={{ background: "hsl(0 0% 66%)" }}
        />
        <div
          className="-translate-y-1/2 absolute top-1/2 left-0 h-px w-full"
          style={{ background: "hsl(0 0% 66%)" }}
        />
      </div>
    </div>
  )
}

export interface AnalyticsHeroGridLinesProps
  extends React.ComponentProps<"div"> {
  cols: number
  rows: number
}

export function AnalyticsHeroGridLines({
  cols,
  rows,
  className,
  ...props
}: AnalyticsHeroGridLinesProps) {
  const verticalPositions = Array.from(
    { length: cols + 1 },
    (_, i) => `${((i / cols) * 100).toFixed(4)}%`
  )
  const horizontalPositions = Array.from(
    { length: rows + 1 },
    (_, i) => `${((i / rows) * 100).toFixed(4)}%`
  )

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      data-slot="analytics-hero-grid-lines"
      {...props}
    >
      {verticalPositions.map((left) => (
        <div
          className="absolute top-0 bottom-0"
          key={`v-${left}`}
          style={{
            left,
            borderLeft: "1px solid hsl(0 0% 88%)",
          }}
        />
      ))}
      {horizontalPositions.map((top) => (
        <div
          className="absolute right-0 left-0"
          key={`h-${top}`}
          style={{
            top,
            borderTop: "1px solid hsl(0 0% 88%)",
          }}
        />
      ))}
      <AnalyticsHeroCrosshair className="-top-[7px] -left-[7px]" />
      <AnalyticsHeroCrosshair className="-bottom-[7px] -right-[7px]" />
    </div>
  )
}

export interface AnalyticsHeroChartProps
  extends Omit<React.ComponentProps<"svg">, "onHover"> {
  data: AnalyticsHeroChartDatum[]
  hovered: number | null
  onHover: (index: number | null) => void
}

export function AnalyticsHeroChart({
  data,
  hovered,
  onHover,
  className,
  ...props
}: AnalyticsHeroChartProps) {
  const idBase = useId().replaceAll(":", "")
  const lineGradientId = `${idBase}-line-gradient`
  const fillGradientId = `${idBase}-fill-gradient`
  const hoverClipId = `${idBase}-hover-clip`

  const max = Math.max(...data.map((d) => d.value))
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * 960,
    y: 560 - (d.value / max) * 480 - 20,
  }))
  const linePath = points
    .map((point, i) => `${i ? "L" : "M"}${point.x} ${point.y}`)
    .join(" ")
  const fillPath = `${linePath} L960 560 L0 560 Z`
  const clipX = hovered !== null ? (points[hovered]?.x ?? 0) : 0

  return (
    <svg
      className={cn("h-full w-full", className)}
      data-slot="analytics-hero-chart"
      onMouseLeave={() => onHover(null)}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        const ratio = Math.min(
          1,
          Math.max(0, (event.clientX - bounds.left) / bounds.width)
        )
        onHover(Math.round(ratio * (data.length - 1)))
      }}
      preserveAspectRatio="none"
      style={{ cursor: "crosshair", overflow: "visible" }}
      viewBox="0 0 960 560"
      {...props}
    >
      <title>Visitors chart</title>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={lineGradientId}
          x1="960"
          x2="0"
          y1="2"
          y2="542"
        >
          <stop offset="0" stopColor="#35C442" />
          <stop offset=".333" stopColor="#9AE13E" />
          <stop offset=".667" stopColor="#E9EB4E" />
          <stop offset="1" stopColor="#FF975C" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={fillGradientId}
          x1="960"
          x2="0"
          y1="0"
          y2="560"
        >
          <stop offset="0" stopColor="#35C442" />
          <stop offset=".333" stopColor="#9AE13E" />
          <stop offset=".667" stopColor="#E9EB4E" />
          <stop offset="1" stopColor="#FF975C" />
        </linearGradient>
        <clipPath id={hoverClipId}>
          <rect height="560" width={clipX} x="0" y="0" />
        </clipPath>
      </defs>
      <path
        clipPath={`url(#${hoverClipId})`}
        d={fillPath}
        fill={`url(#${fillGradientId})`}
        opacity="0.05"
      />
      <path
        d={linePath}
        fill="none"
        stroke={`url(#${lineGradientId})`}
        strokeLinecap="square"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      {points.map((point, i) => {
        const isHovered = hovered === i
        const color = getAnalyticsHeroColor(i)
        const datum = data[i]
        return (
          <g key={`${datum.label}-${datum.value}`}>
            {isHovered ? (
              <circle
                cx={point.x}
                cy={point.y}
                fill="hsl(0 0% 8%)"
                opacity="0.08"
                r="9"
              />
            ) : null}
            <circle
              cx={point.x}
              cy={point.y}
              fill={color}
              r={isHovered ? 6 : 4}
              stroke="hsl(0 0% 98%)"
              strokeWidth={isHovered ? 2 : 1}
              style={{
                filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.04))",
                transition: "r 120ms cubic-bezier(0.23,1,0.32,1)",
              }}
            />
          </g>
        )
      })}
    </svg>
  )
}

export interface AnalyticsHeroTooltipProps extends React.ComponentProps<"div"> {
  data: AnalyticsHeroChartDatum[]
  index: number | null
  containerRef: React.RefObject<HTMLDivElement | null>
  sectionRef: React.RefObject<HTMLElement | null>
}

export function AnalyticsHeroTooltip({
  data,
  index,
  containerRef,
  sectionRef,
  className,
  ...props
}: AnalyticsHeroTooltipProps) {
  if (index === null || !containerRef.current || !sectionRef.current) {
    return null
  }

  const chartRect = containerRef.current.getBoundingClientRect()
  const sectionRect = sectionRef.current.getBoundingClientRect()
  const max = Math.max(...data.map((d) => d.value))
  const xRatio = index / (data.length - 1)
  const yRatio = 1 - (data[index].value / max) * (480 / 560) - 20 / 560
  let left = chartRect.left - sectionRect.left + xRatio * chartRect.width + 12
  const top = chartRect.top - sectionRect.top + yRatio * chartRect.height + 12
  if (left + 200 > sectionRect.width) {
    left = chartRect.left - sectionRect.left + xRatio * chartRect.width - 210
  }

  return (
    <div
      className={cn("pointer-events-none absolute z-50", className)}
      data-slot="analytics-hero-tooltip"
      style={{
        left,
        top,
        transition:
          "left 60ms cubic-bezier(0.23,1,0.32,1), top 60ms cubic-bezier(0.23,1,0.32,1)",
      }}
      {...props}
    >
      <div
        style={{
          background: "hsl(0 0% 100%)",
          border: "1px solid hsl(0 0% 88% / 0.6)",
          borderRadius: 8,
          padding: "10px 14px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center justify-between" style={{ gap: 28 }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "hsl(0 0% 10%)",
              letterSpacing: "-0.01em",
            }}
          >
            Visitors
          </span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "hsl(0 0% 10%)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {data[index].value.toLocaleString()}
          </span>
        </div>
        <p
          style={{
            fontSize: 12,
            color: "hsl(0 0% 40%)",
            marginTop: 2,
            whiteSpace: "nowrap",
            margin: "2px 0 0",
          }}
        >
          {data[index].label}
        </p>
      </div>
    </div>
  )
}

export interface AnalyticsHeroAppLogsProps extends React.ComponentProps<"div"> {
  logs: AnalyticsHeroLog[]
  timestamp?: string
}

export function AnalyticsHeroAppLogs({
  logs,
  timestamp = "13:39",
  className,
  ...props
}: AnalyticsHeroAppLogsProps) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 420)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div
      className={cn(className)}
      data-slot="analytics-hero-app-logs"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        filter: visible ? "blur(0)" : "blur(4px)",
        transition: "all 500ms cubic-bezier(0.23,1,0.32,1)",
        background: "hsl(0 0% 100%)",
        borderRadius: 10,
        border: "1px solid hsl(0 0% 88% / 0.7)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.03)",
        overflow: "hidden",
        width: 270,
      }}
      {...props}
    >
      <div
        style={{
          padding: "12px 16px 6px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: "hsl(0 0% 10%)" }}>
          App Logs
        </span>
        <span
          style={{
            fontSize: 12,
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
            color: "hsl(0 0% 56%)",
          }}
        >
          {timestamp}
        </span>
      </div>
      <div style={{ padding: "2px 8px 10px" }}>
        {logs.map((log) => (
          <div
            key={`${log.time}-${log.path}-${log.method}-${log.status}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 8px",
              borderRadius: 6,
              fontSize: 11,
              color: "hsl(0 0% 30%)",
            }}
          >
            <span
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                color: "hsl(0 0% 62%)",
                width: 36,
                flexShrink: 0,
                fontVariantNumeric: "tabular-nums",
                fontSize: 10,
              }}
            >
              {log.time}
            </span>
            <span
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                border: "1px solid hsl(0 0% 88%)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 7,
                fontWeight: 700,
                color: "hsl(0 0% 56%)",
                flexShrink: 0,
                background: "hsl(0 0% 100%)",
              }}
            >
              {log.rt === "mw" ? "M" : "ƒe"}
            </span>
            <span
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                color: "hsl(0 0% 46%)",
                flexShrink: 0,
                fontSize: 11,
              }}
            >
              {log.method}
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2px 5px",
                borderRadius: 4,
                fontSize: 10,
                fontWeight: 600,
                lineHeight: 1,
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                background: "hsl(152 69% 96%)",
                color: "hsl(152 69% 31%)",
                border: "1px solid hsl(152 60% 85%)",
                flexShrink: 0,
              }}
            >
              {log.status}
            </span>
            <span
              style={{
                fontSize: 11,
                color: "hsl(0 0% 50%)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {log.path}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export interface AnalyticsHeroTopSourcesProps
  extends React.ComponentProps<"div"> {
  sources: AnalyticsHeroSource[]
}

export function AnalyticsHeroTopSources({
  sources,
  className,
  ...props
}: AnalyticsHeroTopSourcesProps) {
  const maxVisitors = Math.max(...sources.map((source) => source.visitors))
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 540)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div
      className={cn(className)}
      data-slot="analytics-hero-top-sources"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(16px)",
        filter: visible ? "blur(0)" : "blur(4px)",
        transition: "all 500ms cubic-bezier(0.23,1,0.32,1)",
        background: "hsl(0 0% 100%)",
        borderRadius: 10,
        border: "1px solid hsl(0 0% 88% / 0.7)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.03)",
        overflow: "hidden",
        width: 246,
      }}
      {...props}
    >
      <div
        style={{
          padding: "12px 16px 6px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: "hsl(0 0% 10%)" }}>
          Top Sources
        </span>
        <span style={{ fontSize: 12, color: "hsl(0 0% 56%)" }}>Visitors</span>
      </div>
      <div
        style={{
          padding: "2px 8px 10px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {sources.map((source) => {
          const SourceIcon = ANALYTICS_HERO_ICONS[source.icon]
          const width = (source.visitors / maxVisitors) * 100
          return (
            <div
              data-slot="analytics-hero-top-sources-row"
              key={`${source.name}-${source.visitors}`}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                padding: "5px 8px",
                borderRadius: 5,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${width}%`,
                  background: "hsl(0 0% 96%)",
                  borderRadius: 5,
                }}
              />
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  minWidth: 0,
                }}
              >
                <SourceIcon />
                <span style={{ fontSize: 12, color: "hsl(0 0% 40%)" }}>
                  {source.name}
                </span>
              </div>
              <span
                style={{
                  position: "relative",
                  fontSize: 12,
                  color: "hsl(0 0% 40%)",
                  fontVariantNumeric: "tabular-nums",
                  flexShrink: 0,
                }}
              >
                {source.visitors.toLocaleString()}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export interface AnalyticsHeroCopyProps extends React.ComponentProps<"div"> {
  visible: boolean
  title?: string
  description?: string
  deployLabel?: string
  demoLabel?: string
}

export function AnalyticsHeroCopy({
  visible,
  title = "Understand production from the inside out.",
  description = "With real-time infrastructure and traffic insights, Vercel is the mission control for frontend applications.",
  deployLabel = "Deploy Now",
  demoLabel = "Get a Demo",
  className,
  ...props
}: AnalyticsHeroCopyProps) {
  return (
    <div
      className={cn(className)}
      data-slot="analytics-hero-copy"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 48px",
      }}
      {...props}
    >
      <h1
        style={{
          fontSize: "clamp(28px, 2.8vw, 40px)",
          fontWeight: 700,
          lineHeight: 1.12,
          letterSpacing: "-0.025em",
          color: "hsl(0 0% 6%)",
          maxWidth: "18ch",
          textWrap: "balance",
          margin: 0,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(10px)",
          filter: visible ? "blur(0)" : "blur(4px)",
          transition:
            "opacity 700ms cubic-bezier(0.23,1,0.32,1), transform 700ms cubic-bezier(0.23,1,0.32,1), filter 700ms cubic-bezier(0.23,1,0.32,1)",
        }}
      >
        {title}
      </h1>
      <p
        style={{
          marginTop: 16,
          fontSize: "clamp(15px, 1.3vw, 18px)",
          lineHeight: 1.55,
          color: "hsl(0 0% 40%)",
          maxWidth: "30ch",
          textWrap: "pretty",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
          filter: visible ? "blur(0)" : "blur(3px)",
          transition:
            "opacity 700ms 80ms cubic-bezier(0.23,1,0.32,1), transform 700ms 80ms cubic-bezier(0.23,1,0.32,1), filter 700ms 80ms cubic-bezier(0.23,1,0.32,1)",
        }}
      >
        {description}
      </p>
      <div
        data-slot="analytics-hero-actions"
        style={{
          display: "flex",
          gap: 12,
          marginTop: 24,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
          filter: visible ? "blur(0)" : "blur(3px)",
          transition:
            "opacity 700ms 160ms cubic-bezier(0.23,1,0.32,1), transform 700ms 160ms cubic-bezier(0.23,1,0.32,1), filter 700ms 160ms cubic-bezier(0.23,1,0.32,1)",
        }}
      >
        <button
          className="active:scale-[0.97]"
          data-slot="analytics-hero-primary-action"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 20px",
            background: "hsl(0 0% 6%)",
            color: "white",
            fontSize: 14,
            fontWeight: 500,
            borderRadius: 999,
            border: "none",
            cursor: "pointer",
            transition: "transform 160ms cubic-bezier(0.23,1,0.32,1)",
          }}
          type="button"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            height="12"
            viewBox="0 0 74 64"
            width="12"
          >
            <path
              d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z"
              fill="white"
            />
          </svg>
          {deployLabel}
        </button>
        <button
          className="active:scale-[0.97]"
          data-slot="analytics-hero-secondary-action"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "10px 20px",
            background: "white",
            color: "hsl(0 0% 6%)",
            fontSize: 14,
            fontWeight: 500,
            borderRadius: 999,
            border: "1px solid hsl(0 0% 88%)",
            cursor: "pointer",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            transition: "transform 160ms cubic-bezier(0.23,1,0.32,1)",
          }}
          type="button"
        >
          {demoLabel}
        </button>
      </div>
    </div>
  )
}

export interface AnalyticsHeroVisualProps extends React.ComponentProps<"div"> {
  logs: AnalyticsHeroLog[]
  sources: AnalyticsHeroSource[]
}

export function AnalyticsHeroVisual({
  logs,
  sources,
  className,
  ...props
}: AnalyticsHeroVisualProps) {
  return (
    <div
      className={cn("pointer-events-none relative min-h-[400px]", className)}
      data-slot="analytics-hero-visual"
      {...props}
    >
      <div
        className="pointer-events-auto"
        data-slot="analytics-hero-app-logs-positioner"
        style={{ position: "absolute", bottom: 8, left: -12 }}
      >
        <AnalyticsHeroAppLogs logs={logs} />
      </div>
      <div
        className="pointer-events-auto"
        data-slot="analytics-hero-top-sources-positioner"
        style={{ position: "absolute", top: "36%", right: -6 }}
      >
        <AnalyticsHeroTopSources sources={sources} />
      </div>
    </div>
  )
}

export interface AnalyticsHeroProps extends React.ComponentProps<"section"> {
  data?: AnalyticsHeroChartDatum[]
  sources?: AnalyticsHeroSource[]
  logs?: AnalyticsHeroLog[]
  logsTimestamp?: string
  title?: string
  description?: string
  deployLabel?: string
  demoLabel?: string
}

export function AnalyticsHero({
  data = ANALYTICS_HERO_CHART_DATA,
  sources = ANALYTICS_HERO_SOURCES,
  logs = ANALYTICS_HERO_LOGS,
  title,
  description,
  deployLabel,
  demoLabel,
  className,
  ...props
}: AnalyticsHeroProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(timeout)
  }, [])

  const lineX = useMemo(() => {
    if (hovered === null || !chartRef.current || !sectionRef.current) {
      return null
    }
    const chartRect = chartRef.current.getBoundingClientRect()
    const sectionRect = sectionRef.current.getBoundingClientRect()
    const xRatio = hovered / (data.length - 1)
    return chartRect.left - sectionRect.left + xRatio * chartRect.width
  }, [data.length, hovered])

  const handleHover = useCallback((index: number | null) => {
    setHovered(index)
  }, [])

  return (
    <section
      className={cn(className)}
      data-slot="analytics-hero"
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        background: "hsl(0 0% 98%)",
        borderBottom: "1px solid hsl(0 0% 88%)",
        overflow: "hidden",
        fontFamily:
          '"Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
      {...props}
    >
      <div
        data-slot="analytics-hero-grid"
        style={{
          position: "absolute",
          inset: 0,
          maxWidth: 1080,
          margin: "0 auto",
          zIndex: 0,
        }}
      >
        <AnalyticsHeroGridLines cols={12} rows={8} />
      </div>
      <div
        data-slot="analytics-hero-chart-frame"
        ref={chartRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          minHeight: 600,
          opacity: visible ? 1 : 0,
          transition: "opacity 800ms 200ms cubic-bezier(0.23,1,0.32,1)",
        }}
      >
        <AnalyticsHeroChart
          data={data}
          hovered={hovered}
          onHover={handleHover}
        />
      </div>
      {lineX !== null ? (
        <div
          aria-hidden="true"
          data-slot="analytics-hero-hover-line"
          style={{
            position: "absolute",
            left: lineX,
            top: 0,
            bottom: 0,
            width: 1,
            background: "hsl(0 0% 12%)",
            zIndex: 20,
            pointerEvents: "none",
            transition: "left 60ms cubic-bezier(0.23,1,0.32,1)",
          }}
        />
      ) : null}
      {hovered !== null ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-15"
          data-slot="analytics-hero-tooltip-layer"
        >
          <AnalyticsHeroTooltip
            containerRef={chartRef}
            data={data}
            index={hovered}
            sectionRef={sectionRef}
          />
        </div>
      ) : null}
      <div
        data-slot="analytics-hero-content"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1080,
          margin: "0 auto",
          pointerEvents: "none",
        }}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ minHeight: 600 }}
        >
          <div className="pointer-events-auto w-fit max-w-full self-center justify-self-start">
            <AnalyticsHeroCopy
              demoLabel={demoLabel}
              deployLabel={deployLabel}
              description={description}
              title={title}
              visible={visible}
            />
          </div>
          <AnalyticsHeroVisual logs={logs} sources={sources} />
        </div>
      </div>
    </section>
  )
}

export default AnalyticsHero
