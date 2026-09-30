"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type GatewayOverheadIds = {
  base: string
  left: string
  right: string
  bottom: string
  clip: string
  logoClip: string
  top: string[]
}

export interface GatewayOverheadProps
  extends React.SVGAttributes<SVGSVGElement> {
  width?: number
  height?: number
  backgroundColor?: string
  borderColor?: string
  leftLineColor?: string
  centerLineColor?: string
  rightLineColor?: string
  logoColor?: string
  iconColor?: string
  showBackgroundGrid?: boolean
  leftIcon?: React.ReactNode
  centerIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

type GatewayOverheadDefsProps = {
  ids: GatewayOverheadIds
  borderColor: string
  backgroundColor: string
}

type GatewayOverheadGridProps = {
  ids: GatewayOverheadIds
  borderColor: string
}

function buildGatewayOverheadIds(id: string): GatewayOverheadIds {
  const base = id.replaceAll(":", "")
  return {
    base,
    left: `${base}-left`,
    right: `${base}-right`,
    bottom: `${base}-bottom`,
    clip: `${base}-clip`,
    logoClip: `${base}-logo-clip`,
    top: Array.from({ length: 7 }, (_, index) => `${base}-top-${index}`),
  }
}

function GatewayOverheadSvg({
  className,
  width = 264,
  height = 120,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      className={cn(className)}
      data-slot="gateway-overhead"
      fill="none"
      height={height}
      viewBox="0 0 264 120"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    />
  )
}

function GatewayOverheadDefs({
  ids,
  borderColor,
  backgroundColor,
}: GatewayOverheadDefsProps) {
  return (
    <defs data-slot="gateway-overhead-defs">
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id={ids.left}
        x1="22"
        x2="-10"
        y1="32"
        y2="32"
      >
        <stop stopColor={borderColor} />
        <stop offset="1" stopColor={borderColor} stopOpacity="0" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id={ids.right}
        x1="32"
        x2="0"
        y1="16"
        y2="16"
      >
        <stop stopColor={borderColor} />
        <stop offset="1" stopColor={borderColor} stopOpacity="0" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id={ids.bottom}
        x1="132.5"
        x2="132.5"
        y1="104.5"
        y2="120"
      >
        <stop stopColor="#C9C9C9" />
        <stop offset="1" stopColor={backgroundColor} />
      </linearGradient>
      {ids.top.map((topId, index) => (
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={topId}
          key={topId}
          x1={138 + index * 42 - 106}
          x2={106 + index * 42 - 106}
          y1="-8"
          y2="-8"
        >
          <stop stopColor={borderColor} />
          <stop offset="1" stopColor={borderColor} stopOpacity="0" />
        </linearGradient>
      ))}
      <clipPath id={ids.clip}>
        <rect fill="white" height="120" width="264" />
      </clipPath>
      <clipPath id={ids.logoClip}>
        <rect
          fill="white"
          height="14.4"
          transform="translate(124.8 79.9004)"
          width="14.4"
        />
      </clipPath>
    </defs>
  )
}

function GatewayOverheadScene({
  ids,
  children,
}: React.PropsWithChildren<{ ids: GatewayOverheadIds }>) {
  return (
    <g clipPath={`url(#${ids.clip})`} data-slot="gateway-overhead-scene">
      {children}
    </g>
  )
}

function GatewayOverheadBackground({
  backgroundColor,
}: {
  backgroundColor: string
}) {
  return (
    <rect
      data-slot="gateway-overhead-background"
      fill={backgroundColor}
      height="120"
      width="264"
    />
  )
}

function GatewayOverheadBackgroundGrid({
  ids,
  borderColor,
}: GatewayOverheadGridProps) {
  return (
    <g data-slot="gateway-overhead-grid" opacity="0.8">
      <rect
        fill="none"
        height="32"
        opacity="0.5"
        rx="6"
        stroke={`url(#${ids.left})`}
        width="32"
        x="-10"
        y="16"
      />
      <rect
        fill="none"
        height="32"
        opacity="0.5"
        rx="6"
        stroke={borderColor}
        width="32"
        x="74"
        y="16"
      />
      <rect
        fill="none"
        height="32"
        opacity="0.5"
        rx="6"
        stroke={borderColor}
        width="32"
        x="158"
        y="16"
      />
      <rect
        fill="none"
        height="32"
        opacity="0.5"
        rx="6"
        stroke={`url(#${ids.top[0]})`}
        transform="rotate(90 106 -24)"
        width="32"
        x="106"
        y="-24"
      />
      <rect
        fill="none"
        height="32"
        opacity="0.5"
        rx="6"
        stroke={`url(#${ids.top[1]})`}
        transform="rotate(90 64 -24)"
        width="32"
        x="64"
        y="-24"
      />
      <rect
        fill="none"
        height="32"
        opacity="0.5"
        rx="6"
        stroke={`url(#${ids.top[2]})`}
        transform="rotate(90 22 -24)"
        width="32"
        x="22"
        y="-24"
      />
      <rect
        fill="none"
        height="32"
        opacity="0.5"
        rx="6"
        stroke={`url(#${ids.top[3]})`}
        transform="rotate(90 148 -24)"
        width="32"
        x="148"
        y="-24"
      />
      <rect
        fill="none"
        height="32"
        opacity="0.5"
        rx="6"
        stroke={`url(#${ids.top[4]})`}
        transform="rotate(90 190 -24)"
        width="32"
        x="190"
        y="-24"
      />
      <rect
        fill="none"
        height="32"
        opacity="0.5"
        rx="6"
        stroke={`url(#${ids.top[5]})`}
        transform="rotate(90 232 -24)"
        width="32"
        x="232"
        y="-24"
      />
      <rect
        fill="none"
        height="32"
        opacity="0.5"
        rx="6"
        stroke={`url(#${ids.top[6]})`}
        transform="rotate(90 274 -24)"
        width="32"
        x="274"
        y="-24"
      />
      <rect
        fill="none"
        height="32"
        opacity="0.5"
        rx="6"
        stroke={`url(#${ids.right})`}
        transform="matrix(-1 0 0 1 274 16)"
        width="32"
      />
    </g>
  )
}

function GatewayOverheadBottomLine({ ids }: { ids: GatewayOverheadIds }) {
  return (
    <path
      d="M132 100V120"
      data-slot="gateway-overhead-bottom-line"
      stroke={`url(#${ids.bottom})`}
    />
  )
}

function GatewayOverheadNodeBox({
  x,
  borderColor,
}: {
  x: number
  borderColor: string
}) {
  return (
    <rect
      data-slot="gateway-overhead-node-box"
      fill="white"
      height="32"
      rx="6"
      stroke={borderColor}
      width="32"
      x={x}
      y="16"
    />
  )
}

function GatewayOverheadCenterIcon({ iconColor }: { iconColor: string }) {
  return (
    <path
      d="M127.051 27.0498C128.859 25.242 131.41 24.6311 133.721 25.2149L132.866 26.3789C131.137 26.114 129.31 26.647 127.978 27.9785C125.757 30.1996 125.757 33.8004 127.978 36.0215L128.442 36.4854L127.515 37.4141L127.051 36.9502C124.317 34.2165 124.317 29.7835 127.051 27.0498ZM137.953 28.3194C139.625 31.0188 139.293 34.6077 136.95 36.9502L136.485 37.4141L135.558 36.4854L136.021 36.0215C137.791 34.2523 138.149 31.6089 137.1 29.4834L137.953 28.3194ZM135.725 26.0742C136.097 26.3086 136.445 26.5769 136.766 26.875L133.731 30.667C134.016 31.0363 134.187 31.4976 134.187 32C134.187 33.2081 133.208 34.1875 132 34.1875C130.792 34.1875 129.812 33.2081 129.812 32C129.812 30.7919 130.792 29.8125 132 29.8125C132.228 29.8125 132.447 29.8476 132.653 29.9121L135.725 26.0742ZM132 31.125C131.517 31.125 131.125 31.5168 131.125 32C131.125 32.4833 131.517 32.875 132 32.875C132.483 32.875 132.875 32.4833 132.875 32C132.875 31.5168 132.483 31.125 132 31.125Z"
      data-slot="gateway-overhead-center-icon"
      fill={iconColor}
    />
  )
}

function GatewayOverheadCenterLine({
  centerLineColor,
}: {
  centerLineColor: string
}) {
  return (
    <path
      d="M132 48.5L132 75"
      data-slot="gateway-overhead-center-line"
      stroke={centerLineColor}
    />
  )
}

function GatewayOverheadRightLine({
  rightLineColor,
}: {
  rightLineColor: string
}) {
  return (
    <path
      d="M217.5 50.4355C217.5 55.7802 211.871 60.1133 204.927 60.1133H144.073C137.685 60.1133 132.506 64.0995 132.506 69.0166V72.5H131.5V69.0166C131.5 63.6719 137.129 59.3389 144.073 59.3389H204.927C211.315 59.3389 216.494 55.3526 216.494 50.4355V48.5H217.5V50.4355Z"
      data-slot="gateway-overhead-right-line"
      fill={rightLineColor}
    />
  )
}

function GatewayOverheadLeftLine({ leftLineColor }: { leftLineColor: string }) {
  return (
    <path
      d="M48 49V49C48 55.1998 53.026 60.2258 59.2258 60.2258H120C126.627 60.2258 132 65.5984 132 72.2258V73"
      data-slot="gateway-overhead-left-line"
      fill="none"
      stroke={leftLineColor}
    />
  )
}

function GatewayOverheadHub({
  ids,
  backgroundColor,
  logoColor,
}: {
  ids: GatewayOverheadIds
  backgroundColor: string
  logoColor: string
}) {
  return (
    <g data-slot="gateway-overhead-hub">
      <circle cx="132" cy="88" fill={backgroundColor} r="18" stroke="#C9C9C9" />
      <g clipPath={`url(#${ids.logoClip})`}>
        <path
          clipRule="evenodd"
          d="M132 80.8008L139.2 93.4008H124.8L132 80.8008Z"
          fill={logoColor}
          fillRule="evenodd"
        />
      </g>
    </g>
  )
}

function GatewayOverhead({
  width = 264,
  height = 120,
  //   backgroundColor = "#FAFAFA",
  backgroundColor = "transparent",
  borderColor = "#EAEAEA",
  leftLineColor = "#0067D6",
  centerLineColor = "#FFB224",
  rightLineColor = "#CA2A30",
  logoColor = "#000000",
  iconColor = "#171717",
  showBackgroundGrid = true,
  leftIcon,
  centerIcon,
  rightIcon,
  className,
  ...props
}: GatewayOverheadProps) {
  const ids = buildGatewayOverheadIds(React.useId())

  return (
    <GatewayOverheadSvg
      className={className}
      height={height}
      width={width}
      {...props}
    >
      <title>Gateway Overhead</title>
      <GatewayOverheadDefs
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        ids={ids}
      />
      <GatewayOverheadScene ids={ids}>
        <GatewayOverheadBackground backgroundColor={backgroundColor} />
        {showBackgroundGrid ? (
          <GatewayOverheadBackgroundGrid borderColor={borderColor} ids={ids} />
        ) : null}

        <GatewayOverheadBottomLine ids={ids} />

        <GatewayOverheadNodeBox borderColor={borderColor} x={32} />
        {leftIcon ?? (
          <g
            data-slot="gateway-overhead-left-icon"
            transform="translate(41, 25)"
          >
            <SettingsIcon color={iconColor} />
          </g>
        )}

        <GatewayOverheadNodeBox borderColor={borderColor} x={116} />
        {centerIcon ?? <GatewayOverheadCenterIcon iconColor={iconColor} />}

        <GatewayOverheadNodeBox borderColor={borderColor} x={200} />
        {rightIcon ?? (
          <g
            data-slot="gateway-overhead-right-icon"
            transform="translate(209, 25)"
          >
            <SettingsIcon color={iconColor} />
          </g>
        )}

        <GatewayOverheadCenterLine centerLineColor={centerLineColor} />
        <GatewayOverheadRightLine rightLineColor={rightLineColor} />
        <GatewayOverheadLeftLine leftLineColor={leftLineColor} />

        <GatewayOverheadHub
          backgroundColor={backgroundColor}
          ids={ids}
          logoColor={logoColor}
        />
      </GatewayOverheadScene>
    </GatewayOverheadSvg>
  )
}

function SettingsIcon({ color = "#171717" }: { color?: string }) {
  const k = 14 / 24
  return (
    <g data-slot="gateway-overhead-settings-icon" transform={`scale(${k})`}>
      <path
        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
        fill={color}
      />
      <circle cx="12" cy="12" fill={color} r="3" />
    </g>
  )
}

export {
  GatewayOverhead,
  GatewayOverheadSvg,
  GatewayOverheadDefs,
  GatewayOverheadScene,
  GatewayOverheadBackground,
  GatewayOverheadBackgroundGrid,
  GatewayOverheadBottomLine,
  GatewayOverheadNodeBox,
  GatewayOverheadCenterIcon,
  GatewayOverheadCenterLine,
  GatewayOverheadRightLine,
  GatewayOverheadLeftLine,
  GatewayOverheadHub,
}

export default GatewayOverhead
