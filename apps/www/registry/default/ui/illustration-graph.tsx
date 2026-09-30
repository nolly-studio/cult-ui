"use client"

import { useId, type ReactNode } from "react"

import { cn } from "@/lib/utils"

export interface DataPoint {
  x: number
  y: number
}

export interface IllustrationGraphProps
  extends Omit<React.ComponentProps<"svg">, "width" | "height"> {
  width?: number
  height?: number
  backgroundColor?: string
  borderColor?: string
  cardFill?: string
  cardStroke?: string
  gridLineColor?: string
  primaryLineColor?: string
  errorLineColor?: string
  errorBadgeColor?: string
  errorBadgeTextColor?: string
  highlightAreaColor?: string
  highlightBorderColor?: string
  textColor?: string
  mutedTextColor?: string
  badgeText?: string
  headerText?: string
  footerText?: string
  yAxisLabels?: string[]
  dataPoints?: DataPoint[]
  errorRegion?: { start: number; end: number }
  showHighlightArea?: boolean
  customBadgeIcon?: ReactNode
}

export const defaultDataPoints: DataPoint[] = [
  { x: 40, y: 107 },
  { x: 102, y: 107 },
  { x: 119.5, y: 105.5 },
  { x: 147.5, y: 107 },
  { x: 174.5, y: 107 },
  { x: 216.5, y: 107 },
  { x: 224, y: 99.5 },
  { x: 228.5, y: 102.5 },
  { x: 237, y: 90 },
  { x: 257, y: 84 },
  { x: 280.5, y: 50.5 },
  { x: 293.5, y: 55 },
  { x: 313.5, y: 53.5 },
  { x: 336.5, y: 74 },
  { x: 352.5, y: 99.5 },
  { x: 367, y: 107 },
  { x: 417.5, y: 107 },
]

function generatePath(points: DataPoint[]) {
  if (points.length === 0) return ""
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`)
    .join(" ")
}

function IllustrationGraphDefs({
  footerShadowId,
  chartShadowId,
}: {
  footerShadowId: string
  chartShadowId: string
}) {
  return (
    <defs data-slot="illustration-graph-defs">
      <filter
        id={footerShadowId}
        x="0"
        y="142.589"
        width="450"
        height="42"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
      <filter
        id={chartShadowId}
        x="0"
        y="0"
        width="450"
        height="141.178"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
    </defs>
  )
}

function IllustrationGraphFooter({
  shadowId,
  cardFill,
  cardStroke,
  mutedTextColor,
  footerText,
}: {
  shadowId: string
  cardFill: string
  cardStroke: string
  mutedTextColor: string
  footerText: string
}) {
  return (
    <g data-slot="illustration-graph-footer" filter={`url(#${shadowId})`}>
      <path
        d="M3 156.589C3 149.962 8.37258 144.589 15 144.589H435C441.627 144.589 447 149.962 447 156.589V168.589C447 175.217 441.627 180.589 435 180.589H15C8.37258 180.589 3 175.217 3 168.589V156.589Z"
        fill={cardFill}
      />
      <path
        d="M435 144.089C441.904 144.089 447.5 149.686 447.5 156.589V168.589C447.5 175.493 441.904 181.089 435 181.089H15C8.09644 181.089 2.5 175.493 2.5 168.589V156.589C2.5 149.686 8.09644 144.089 15 144.089H435Z"
        stroke={cardStroke}
      />
      <circle
        cx="20.5"
        cy="158.66"
        r="0.786"
        fill="color-mix(in srgb, var(--muted-foreground) 45%, transparent)"
      />
      <circle
        cx="22.07"
        cy="161.28"
        r="0.786"
        fill="color-mix(in srgb, var(--muted-foreground) 65%, transparent)"
      />
      <circle
        cx="18.93"
        cy="161.28"
        r="0.786"
        fill="color-mix(in srgb, var(--muted-foreground) 65%, transparent)"
      />
      <circle cx="20.5" cy="163.9" r="0.786" fill="var(--muted-foreground)" />
      <circle cx="17.36" cy="163.9" r="0.786" fill="var(--muted-foreground)" />
      <circle cx="23.64" cy="163.9" r="0.786" fill="var(--muted-foreground)" />
      <circle
        cx="22.07"
        cy="166.52"
        r="0.786"
        fill="color-mix(in srgb, var(--muted-foreground) 65%, transparent)"
      />
      <circle
        cx="25.22"
        cy="166.52"
        r="0.786"
        fill="color-mix(in srgb, var(--muted-foreground) 45%, transparent)"
      />
      <circle
        cx="18.93"
        cy="166.52"
        r="0.786"
        fill="color-mix(in srgb, var(--muted-foreground) 65%, transparent)"
      />
      <circle
        cx="15.79"
        cy="166.52"
        r="0.786"
        fill="color-mix(in srgb, var(--muted-foreground) 45%, transparent)"
      />
      <text
        x="31"
        y="166"
        fill={mutedTextColor}
        fontSize="8"
        fontFamily="system-ui, sans-serif"
      >
        {footerText}
      </text>
    </g>
  )
}

function IllustrationGraphChart({
  shadowId,
  cardFill,
  cardStroke,
  gridLineColor,
  errorBadgeColor,
  errorBadgeTextColor,
  highlightAreaColor,
  highlightBorderColor,
  mutedTextColor,
  badgeText,
  headerText,
  yAxisLabels,
  errorRegion,
  showHighlightArea,
  customBadgeIcon,
  textColor,
}: {
  shadowId: string
  cardFill: string
  cardStroke: string
  gridLineColor: string
  errorBadgeColor: string
  errorBadgeTextColor: string
  highlightAreaColor: string
  highlightBorderColor: string
  mutedTextColor: string
  badgeText: string
  headerText: string
  yAxisLabels: string[]
  errorRegion: { start: number; end: number }
  showHighlightArea: boolean
  customBadgeIcon?: ReactNode
  textColor: string
}) {
  return (
    <g data-slot="illustration-graph-chart" filter={`url(#${shadowId})`}>
      <path
        d="M3 14C3 7.37258 8.37258 2 15 2H435C441.627 2 447 7.37258 447 14V125.178C447 131.806 441.627 137.178 435 137.178H15C8.37258 137.178 3 131.806 3 125.178V14Z"
        fill={cardFill}
      />
      <path
        d="M435 1.5C441.904 1.5 447.5 7.09644 447.5 14V125.179C447.5 132.082 441.903 137.679 435 137.679H15C8.09652 137.679 2.50013 132.082 2.5 125.179V14L2.50391 13.6777C2.67484 6.92311 8.20418 1.5 15 1.5H435Z"
        stroke={cardStroke}
      />

      <path
        d="M21 14.5H41C44.0376 14.5 46.5 16.9624 46.5 20V28C46.5 31.0376 44.0376 33.5 41 33.5H21C17.9624 33.5 15.5 31.0376 15.5 28V20C15.5 16.9624 17.9624 14.5 21 14.5Z"
        stroke={errorBadgeColor}
        fill="none"
      />
      {textColor && customBadgeIcon ? (
        <g transform="translate(19, 18)" style={{ color: textColor }}>
          {customBadgeIcon}
        </g>
      ) : null}
      <text
        x="31"
        y="28"
        fill={errorBadgeTextColor}
        fontSize="10"
        fontFamily="system-ui, sans-serif"
        textAnchor="middle"
      >
        {badgeText}
      </text>
      <text
        x="55"
        y="28"
        fill={mutedTextColor}
        fontSize="10"
        fontFamily="system-ui, sans-serif"
      >
        {headerText}
      </text>

      <text
        x="25"
        y="54"
        fill={mutedTextColor}
        fontSize="9"
        fontFamily="system-ui, sans-serif"
        textAnchor="middle"
      >
        {yAxisLabels[0]}
      </text>
      <text
        x="25"
        y="82"
        fill={mutedTextColor}
        fontSize="9"
        fontFamily="system-ui, sans-serif"
        textAnchor="middle"
      >
        {yAxisLabels[1]}
      </text>
      <text
        x="25"
        y="110"
        fill={mutedTextColor}
        fontSize="9"
        fontFamily="system-ui, sans-serif"
        textAnchor="middle"
      >
        {yAxisLabels[2]}
      </text>

      {showHighlightArea ? (
        <rect
          opacity="0.5"
          x={errorRegion.start}
          y="50.589"
          width={errorRegion.end - errorRegion.start}
          height="56"
          fill={highlightAreaColor}
        />
      ) : null}

      <path d="M38.906 107.045H418.906" stroke={gridLineColor} />
      <path d="M38.906 79.045H418.906" stroke={gridLineColor} />
      <path d="M38.906 50.784H418.906" stroke={gridLineColor} />

      {showHighlightArea ? (
        <>
          <line
            x1={errorRegion.start + 0.5}
            y1="107.589"
            x2={errorRegion.start + 0.5}
            y2="51.589"
            stroke={highlightBorderColor}
            strokeDasharray="1 3"
          />
          <line
            x1={errorRegion.end + 0.5}
            y1="107.589"
            x2={errorRegion.end + 0.5}
            y2="51.589"
            stroke={highlightBorderColor}
            strokeDasharray="1 3"
          />
        </>
      ) : null}

      <text
        x="400"
        y="121"
        fill={mutedTextColor}
        fontSize="8"
        fontFamily="system-ui, sans-serif"
        textAnchor="middle"
      >
        now
      </text>
      <text
        x="63"
        y="121"
        fill={mutedTextColor}
        fontSize="8"
        fontFamily="system-ui, sans-serif"
        textAnchor="middle"
      >
        12h ago
      </text>
    </g>
  )
}

function IllustrationGraphLines({
  fullPath,
  errorPath,
  primaryLineColor,
  errorLineColor,
  showHighlightArea,
}: {
  fullPath: string
  errorPath: string
  primaryLineColor: string
  errorLineColor: string
  showHighlightArea: boolean
}) {
  return (
    <g data-slot="illustration-graph-lines">
      <path
        d={fullPath}
        stroke={primaryLineColor}
        strokeWidth="2"
        fill="none"
      />
      {showHighlightArea && errorPath ? (
        <path
          d={errorPath}
          stroke={errorLineColor}
          strokeWidth="2"
          fill="none"
        />
      ) : null}
    </g>
  )
}

function IllustrationGraph({
  width = 450,
  height = 185,
  backgroundColor = "transparent",
  borderColor,
  cardFill = "var(--card)",
  cardStroke = "var(--border)",
  gridLineColor = "var(--border)",
  primaryLineColor = "#0070F3",
  errorLineColor = "var(--destructive)",
  errorBadgeColor = "var(--destructive)",
  errorBadgeTextColor = "var(--destructive)",
  highlightAreaColor = "color-mix(in srgb, var(--destructive) 8%, transparent)",
  highlightBorderColor = "color-mix(in srgb, var(--destructive) 25%, transparent)",
  textColor = "var(--card-foreground)",
  mutedTextColor = "var(--muted-foreground)",
  badgeText = "5xx",
  headerText = "api / api/error rate / error rate",
  footerText = "Investigate 12h ago / now",
  yAxisLabels = ["40%", "20%", "0%"],
  dataPoints = defaultDataPoints,
  errorRegion = { start: 205, end: 355 },
  showHighlightArea = true,
  customBadgeIcon,
  className,
  ...props
}: IllustrationGraphProps) {
  void borderColor
  const idBase = useId().replaceAll(":", "")
  const footerShadowId = `${idBase}-drop-shadow-footer`
  const chartShadowId = `${idBase}-drop-shadow-chart`

  const errorPoints = dataPoints.filter(
    (point) => point.x >= errorRegion.start && point.x <= errorRegion.end
  )
  const fullPath = generatePath(dataPoints)
  const errorPath = generatePath(errorPoints)

  return (
    <svg
      data-slot="illustration-graph"
      width={width}
      height={height}
      viewBox="0 0 450 185"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      style={{ backgroundColor }}
      {...props}
    >
      <title>API error rate graph</title>
      <IllustrationGraphDefs
        footerShadowId={footerShadowId}
        chartShadowId={chartShadowId}
      />
      <IllustrationGraphFooter
        shadowId={footerShadowId}
        cardFill={cardFill}
        cardStroke={cardStroke}
        mutedTextColor={mutedTextColor}
        footerText={footerText}
      />
      <IllustrationGraphChart
        shadowId={chartShadowId}
        cardFill={cardFill}
        cardStroke={cardStroke}
        gridLineColor={gridLineColor}
        errorBadgeColor={errorBadgeColor}
        errorBadgeTextColor={errorBadgeTextColor}
        highlightAreaColor={highlightAreaColor}
        highlightBorderColor={highlightBorderColor}
        mutedTextColor={mutedTextColor}
        badgeText={badgeText}
        headerText={headerText}
        yAxisLabels={yAxisLabels}
        errorRegion={errorRegion}
        showHighlightArea={showHighlightArea}
        customBadgeIcon={customBadgeIcon}
        textColor={textColor}
      />
      <IllustrationGraphLines
        fullPath={fullPath}
        errorPath={errorPath}
        primaryLineColor={primaryLineColor}
        errorLineColor={errorLineColor}
        showHighlightArea={showHighlightArea}
      />
    </svg>
  )
}

export {
  IllustrationGraph,
  IllustrationGraphDefs,
  IllustrationGraphFooter,
  IllustrationGraphChart,
  IllustrationGraphLines,
}
