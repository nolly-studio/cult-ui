"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface SuggestionItem {
  id: string
  title: string
  progress: number
  status?: "success" | "error" | "mixed"
  mixedProgress?: { success: number; error: number }
}

export interface AgentSuggestCardStackProps
  extends Omit<React.ComponentProps<"svg">, "width" | "height"> {
  width?: number
  height?: number
  backgroundColor?: string
  cardFill?: string
  cardStroke?: string
  borderColor?: string
  textColor?: string
  mutedTextColor?: string
  badgeColor?: string
  badgeTextColor?: string
  botBadgeColor?: string
  botBadgeTextColor?: string
  botBadgeStrokeColor?: string
  eyeIconColor?: string
  progressBarBackground?: string
  progressBarStrokeColor?: string
  mixedProgressSeparatorColor?: string
  successColor?: string
  errorColor?: string
  commitButtonFill?: string
  commitButtonStroke?: string
  commitButtonTextColor?: string
  headerTitle?: string
  headerBadge?: string
  suggestions?: SuggestionItem[]
  commitButtonText?: string
  logoIcon?: React.ReactNode
}

function VercelLogo({
  color = "#171717",
  size = 16,
}: {
  color?: string
  size?: number
}) {
  return (
    <svg
      aria-hidden="true"
      data-slot="agent-suggest-vercel-logo"
      fill="none"
      focusable="false"
      height={size}
      viewBox="0 0 16 16"
      width={size}
    >
      <path
        d="M12.667 3C14.5077 3.0002 15.9998 4.4923 16 6.333V11.667C15.9998 13.5077 14.5077 14.9998 12.667 15H3.333C1.4923 14.9998 0.0002 13.5077 0 11.667V6.333C0.0002 4.4923 1.4923 3.0002 3.333 3H12.667ZM4 11.833H12L8 4.833L4 11.833Z"
        fill={color}
      />
    </svg>
  )
}

function EyeIcon({
  color = "#7D7D7D",
  size = 14,
}: {
  color?: string
  size?: number
}) {
  return (
    <svg
      aria-hidden="true"
      data-slot="agent-suggest-eye-icon"
      fill="none"
      focusable="false"
      height={size}
      viewBox="0 0 14 14"
      width={size}
    >
      <path
        d="M1.8027 4.3692C3.4858 2.4147 6.5142 2.4147 8.1973 4.3692L10.1992 6.6944V7.3058L8.1973 9.631C6.5142 11.5854 3.4858 11.5854 1.8027 9.631L-0.1992 7.3058V6.6944L1.8027 4.3692ZM7.4863 4.9806C6.1773 3.4607 3.8227 3.4607 2.5137 4.9806L0.7744 7.0001L2.5137 9.0196C3.8227 10.5394 6.1773 10.5394 7.4863 9.0196L9.2246 7.0001L7.4863 4.9806ZM5 5.1251C6.0355 5.1251 6.875 5.9646 6.875 7.0001C6.875 8.0356 6.0355 8.8751 5 8.8751C3.9645 8.8751 3.125 8.0356 3.125 7.0001C3.125 5.9646 3.9645 5.1251 5 5.1251ZM5 6.0626C4.4822 6.0626 4.0625 6.4823 4.0625 7.0001C4.0625 7.5178 4.4823 7.9376 5 7.9376C5.5177 7.9376 5.9375 7.5178 5.9375 7.0001C5.9375 6.4823 5.5178 6.0626 5 6.0626Z"
        fill={color}
      />
    </svg>
  )
}

function AgentSuggestDefs({
  backShadowId,
  frontShadowId,
  firstProgressClipId,
  secondProgressClipId,
}: {
  backShadowId: string
  frontShadowId: string
  firstProgressClipId: string
  secondProgressClipId: string
}) {
  return (
    <defs data-slot="agent-suggest-defs">
      <filter
        filterUnits="userSpaceOnUse"
        height="110%"
        id={backShadowId}
        width="104%"
        x="-2"
        y="0"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"
        />
        <feBlend in2="BackgroundImageFix" mode="normal" result="shadow" />
        <feBlend in="SourceGraphic" in2="shadow" mode="normal" result="shape" />
      </filter>
      <filter
        filterUnits="userSpaceOnUse"
        height="118%"
        id={frontShadowId}
        width="108%"
        x="-4"
        y="-1"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="4" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.05 0 0 0 0 0.05 0 0 0 0 0.05 0 0 0 0.16 0"
        />
        <feBlend in2="BackgroundImageFix" mode="normal" result="shadow" />
        <feBlend in="SourceGraphic" in2="shadow" mode="normal" result="shape" />
      </filter>
      <clipPath id={firstProgressClipId}>
        <rect height="11" rx="5.5" width="376" x="34" y="71" />
      </clipPath>
      <clipPath id={secondProgressClipId}>
        <rect height="21" rx="5" width="352" x="58" y="114" />
      </clipPath>
    </defs>
  )
}

function AgentSuggestCardFrame({
  x,
  y,
  width,
  height,
  fill,
  stroke,
  radius = 12,
}: {
  x: number
  y: number
  width: number
  height: number
  fill: string
  stroke: string
  radius?: number
}) {
  return (
    <g data-slot="agent-suggest-card-frame">
      <rect fill={fill} height={height} rx={radius} width={width} x={x} y={y} />
      <rect
        fill="none"
        height={height + 1}
        rx={radius}
        stroke={stroke}
        width={width + 1}
        x={x - 0.5}
        y={y - 0.5}
      />
    </g>
  )
}

function AgentSuggestBotBadge({
  x,
  y,
  strokeColor,
  textColor,
}: {
  x: number
  y: number
  strokeColor: string
  textColor: string
}) {
  return (
    <g data-slot="agent-suggest-bot-badge">
      <rect
        fill="none"
        height="18"
        rx="9"
        stroke={strokeColor}
        width="32"
        x={x}
        y={y}
      />
      <text
        fill={textColor}
        fontFamily="system-ui, sans-serif"
        fontSize="9"
        textAnchor="middle"
        x={x + 16}
        y={y + 12.5}
      >
        bot
      </text>
    </g>
  )
}

function AgentSuggestCommitButton({
  text,
  fill,
  stroke,
  textColor,
}: {
  text: string
  fill: string
  stroke: string
  textColor: string
}) {
  return (
    <g data-slot="agent-suggest-commit-button">
      <rect fill={fill} height="22" rx="5" width="111" x="299" y="141" />
      <rect
        fill="none"
        height="23"
        rx="5"
        stroke={stroke}
        width="112"
        x="298.5"
        y="140.5"
      />
      <text
        fill={textColor}
        fontFamily="system-ui, sans-serif"
        fontSize="11"
        fontWeight="500"
        textAnchor="middle"
        x="354.5"
        y="156"
      >
        {text}
      </text>
    </g>
  )
}

function AgentSuggestCardStack({
  width = 444,
  height = 178,
  backgroundColor = "transparent",
  cardFill = "var(--card)",
  cardStroke = "var(--border)",
  borderColor,
  textColor = "var(--foreground)",
  mutedTextColor = "var(--muted-foreground)",
  badgeColor = "#388E4A",
  badgeTextColor = "var(--primary-foreground)",
  botBadgeColor = "var(--muted)",
  botBadgeTextColor = "var(--muted-foreground)",
  botBadgeStrokeColor = "var(--border)",
  eyeIconColor = "var(--muted-foreground)",
  progressBarBackground = "color-mix(in oklab, var(--muted) 85%, #388e4a 15%)",
  progressBarStrokeColor = "var(--border)",
  mixedProgressSeparatorColor = "color-mix(in oklab, var(--foreground) 12%, transparent)",
  successColor = "color-mix(in oklab, #388e4a 50%, var(--muted))",
  errorColor = "color-mix(in oklab, #c63d3d 50%, var(--muted))",
  commitButtonFill = "var(--muted)",
  commitButtonStroke = "var(--border)",
  commitButtonTextColor = "var(--foreground)",
  headerTitle = "Adding a #5347",
  headerBadge = "Open",
  suggestions = [
    { id: "1", title: "Vercel", progress: 8, status: "success" },
    {
      id: "2",
      title: "Vercel",
      progress: 8,
      status: "mixed",
      mixedProgress: { success: 92, error: 8 },
    },
  ],
  commitButtonText = "Commit to main",
  logoIcon,
  className,
  ...props
}: AgentSuggestCardStackProps) {
  const estimateTextWidth = (value: string) => {
    // Good enough for compact UI labels in this fixed-size SVG.
    return Math.max(26, Math.round(value.length * 6.2))
  }

  const resolvedCardStroke = borderColor ?? cardStroke
  const baseId = React.useId().replaceAll(":", "")
  const backShadowId = `${baseId}-shadow-back`
  const frontShadowId = `${baseId}-shadow-front`
  const firstProgressClipId = `${baseId}-progress-1`
  const secondProgressClipId = `${baseId}-progress-2`

  const first = suggestions[0] ?? {
    id: "1",
    title: "Vercel",
    progress: 8,
    status: "success" as const,
  }
  const second = suggestions[1] ?? {
    id: "2",
    title: "Vercel",
    progress: 8,
    status: "mixed" as const,
    mixedProgress: { success: 92, error: 8 },
  }
  const firstWidth = Math.max(29, first.progress * 3.76)
  const secondWidth = Math.max(27, second.progress * 3.52)
  const secondMixedWidth = Math.max(
    27,
    ((second.mixedProgress?.success ?? 8) / 100) * 352
  )
  const primaryTitle = first.title || "Vercel"
  const secondaryTitle = second.title || "Vercel"
  const primaryBotBadgeX = Math.min(
    332,
    42 + estimateTextWidth(primaryTitle) + 10
  )
  const secondaryBotBadgeX = Math.min(
    312,
    22 + estimateTextWidth(secondaryTitle) + 10
  )
  const secondaryTailTextX = Math.min(344, secondaryBotBadgeX + 41)

  return (
    <svg
      className={cn("agent-suggest-theme", className)}
      data-slot="agent-suggest"
      fill="none"
      height={height}
      viewBox="0 0 444 178"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Agent suggestion card stack</title>
      <AgentSuggestDefs
        backShadowId={backShadowId}
        firstProgressClipId={firstProgressClipId}
        frontShadowId={frontShadowId}
        secondProgressClipId={secondProgressClipId}
      />
      <rect fill={backgroundColor} height="178" width="444" />

      <g
        data-slot="agent-suggest-header-card"
        filter={`url(#${backShadowId})`}
        opacity="0.72"
      >
        <AgentSuggestCardFrame
          fill={cardFill}
          height={106}
          stroke={resolvedCardStroke}
          width={360}
          x={42}
          y={1}
        />
        <rect
          fill={badgeColor}
          height="19"
          rx="9.5"
          width="33"
          x="54"
          y="13.5"
        />
        <text
          fill={badgeTextColor}
          fontFamily="system-ui, sans-serif"
          fontSize="10"
          fontWeight="500"
          textAnchor="middle"
          x="70.5"
          y="27"
        >
          {headerBadge}
        </text>
        <text
          fill={textColor}
          fontFamily="system-ui, sans-serif"
          fontSize="14"
          fontWeight="600"
          x="93"
          y="27"
        >
          {headerTitle}
        </text>
        <text
          fill={mutedTextColor}
          fontFamily="system-ui, sans-serif"
          fontSize="13"
          x="300"
          y="27"
        >
          #5347
        </text>
      </g>

      <g data-slot="agent-suggest-main-card" filter={`url(#${frontShadowId})`}>
        <AgentSuggestCardFrame
          fill={cardFill}
          height={141}
          stroke={resolvedCardStroke}
          width={400}
          x={22}
          y={35}
        />

        <g data-slot="agent-suggest-row-primary" transform="translate(34, 47)">
          <g>{logoIcon ?? <VercelLogo color={textColor} size={16} />}</g>
          <circle cx="29" cy="8" fill={botBadgeColor} r="7" />
          <g transform="translate(22, 1)">
            <EyeIcon color={eyeIconColor} size={14} />
          </g>
          <text
            fill={textColor}
            fontFamily="system-ui, sans-serif"
            fontSize="11"
            fontWeight="500"
            x="42"
            y="12"
          >
            {primaryTitle}
          </text>
          <AgentSuggestBotBadge
            strokeColor={botBadgeStrokeColor}
            textColor={botBadgeTextColor}
            x={primaryBotBadgeX}
            y={0}
          />
        </g>

        <g data-slot="agent-suggest-progress-primary">
          <rect
            fill={progressBarBackground}
            height="11"
            rx="5.5"
            stroke={progressBarStrokeColor}
            width="376"
            x="34"
            y="71"
          />
          <g clipPath={`url(#${firstProgressClipId})`}>
            <rect
              fill={successColor}
              height="21"
              width={firstWidth}
              x="34"
              y="71"
            />
          </g>
        </g>

        <g
          data-slot="agent-suggest-row-secondary"
          transform="translate(34, 90)"
        >
          <g>{logoIcon ?? <VercelLogo color={textColor} size={16} />}</g>
          <text
            fill={textColor}
            fontFamily="system-ui, sans-serif"
            fontSize="11"
            fontWeight="500"
            x="22"
            y="12"
          >
            {secondaryTitle}
          </text>
          <AgentSuggestBotBadge
            strokeColor={botBadgeStrokeColor}
            textColor={botBadgeTextColor}
            x={secondaryBotBadgeX}
            y={0}
          />
          <text
            fill={textColor}
            fontFamily="system-ui, sans-serif"
            fontSize="11"
            x={secondaryTailTextX}
            y="12"
          >
            now
          </text>
        </g>

        <g data-slot="agent-suggest-progress-secondary">
          <rect
            fill={progressBarBackground}
            height="21"
            rx="5"
            stroke={progressBarStrokeColor}
            width="352"
            x="58"
            y="114"
          />
          <g clipPath={`url(#${secondProgressClipId})`}>
            {second.status === "mixed" ? (
              <>
                <rect
                  fill={errorColor}
                  height="11"
                  width="352"
                  x="58"
                  y="114"
                />
                <rect
                  fill={successColor}
                  height="11"
                  width={secondMixedWidth}
                  x="58"
                  y="114"
                />
                <line
                  stroke={mixedProgressSeparatorColor}
                  x1="58"
                  x2="410"
                  y1="124.5"
                  y2="124.5"
                />
                <rect
                  fill={successColor}
                  height="10"
                  width={secondMixedWidth}
                  x="58"
                  y="125"
                />
              </>
            ) : (
              <rect
                fill={second.status === "error" ? errorColor : successColor}
                height="21"
                width={secondWidth}
                x="58"
                y="114"
              />
            )}
          </g>
        </g>

        <AgentSuggestCommitButton
          fill={commitButtonFill}
          stroke={commitButtonStroke}
          text={commitButtonText}
          textColor={commitButtonTextColor}
        />
      </g>
    </svg>
  )
}

export {
  AgentSuggestCardStack,
  AgentSuggestDefs,
  AgentSuggestCardFrame,
  AgentSuggestBotBadge,
  AgentSuggestCommitButton,
  VercelLogo,
  EyeIcon,
}
