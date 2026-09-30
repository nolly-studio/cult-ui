"use client"

import {
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react"
import {
  AlignJustify,
  AudioLines,
  Heart,
  Mic,
  Music,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Wifi,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

export type DynamicIslandSize =
  | "default"
  | "compact"
  | "expanded"
  | "large"
  | "ultra"

export interface IPhoneProps {
  /** Content to display on the screen */
  children?: ReactNode
  /** Dynamic Island size preset */
  dynamicIslandSize?: DynamicIslandSize
  /** Content to display inside the Dynamic Island when expanded */
  dynamicIslandContent?: ReactNode
  /** Frame color variant */
  frameColor?: "graphite" | "silver" | "gold" | "blue"
  /** Show status bar */
  showStatusBar?: boolean
  /** Show home indicator */
  showHomeIndicator?: boolean
  /** Custom time to display */
  time?: string
  /** Battery level (0-100) */
  batteryLevel?: number
  /** Signal strength (0-4) */
  signalStrength?: number
  /** Callback when Dynamic Island is tapped */
  onDynamicIslandTap?: () => void
  /** Callback when screen is tapped */
  onScreenTap?: () => void
  /** Custom className for the container */
  className?: string
}

const FRAME_COLORS = {
  graphite: {
    gradient:
      "linear-gradient(145deg, #454549 0%, #3d3d41 15%, #363839 30%, #3a3a3e 50%, #424246 70%, #3b3b3f 85%, #343438 100%)",
    button:
      "linear-gradient(180deg, #424246 0%, #3a3a3e 30%, #363839 50%, #3a3a3e 70%, #424246 100%)",
  },
  silver: {
    gradient:
      "linear-gradient(145deg, #e8e8e8 0%, #d4d4d4 15%, #c0c0c0 30%, #d0d0d0 50%, #e0e0e0 70%, #cccccc 85%, #b8b8b8 100%)",
    button:
      "linear-gradient(180deg, #e0e0e0 0%, #c8c8c8 30%, #b0b0b0 50%, #c8c8c8 70%, #e0e0e0 100%)",
  },
  gold: {
    gradient:
      "linear-gradient(145deg, #ff9544 0%, #f88535 15%, #F77E2D 30%, #f88535 50%, #ff9040 70%, #f88030 85%, #F77E2D 100%)",
    button:
      "linear-gradient(180deg, #ff9040 0%, #f88535 30%, #F77E2D 50%, #f88535 70%, #ff9040 100%)",
  },
  blue: {
    gradient:
      "linear-gradient(145deg, #3f4459 0%, #383c50 15%, #32374B 30%, #383c50 50%, #3d4256 70%, #363a4e 85%, #32374B 100%)",
    button:
      "linear-gradient(180deg, #3d4256 0%, #383c50 30%, #32374B 50%, #383c50 70%, #3d4256 100%)",
  },
}

type FrameColor = keyof typeof FRAME_COLORS

/** Per-finish lighting for left rail; silver & blue reuse graphite preset. */
const LEFT_BUTTON_LIGHTING: Record<
  "graphite" | "gold",
  {
    beforeShadow: string
    afterClasses: string
    boxShadow: string
  }
> = {
  graphite: {
    beforeShadow:
      "before:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_1px_0_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.28)]",
    afterClasses:
      "after:bg-gradient-to-b after:from-black/50 after:via-black/20 after:to-transparent",
    boxShadow: `
      -1px 0 0 0 rgba(255, 255, 255, 0.16),
      -2px 3px 5px -1px rgba(0, 0, 0, 0.34),
      -4px 5px 12px -2px rgba(0, 0, 0, 0.2),
      inset 1px 0 1px rgba(255, 255, 255, 0.12)
    `,
  },
  gold: {
    beforeShadow:
      "before:shadow-[inset_0_1px_0_rgba(255,228,195,0.5),inset_1px_0_0_rgba(255,240,215,0.3),inset_0_-1px_0_rgba(115,52,18,0.38)]",
    afterClasses:
      "after:bg-gradient-to-b after:from-[rgba(72,36,14,0.58)] after:via-[rgba(72,36,14,0.22)] after:to-transparent",
    boxShadow: `
      -1px 0 0 0 rgba(255, 246, 225, 0.24),
      -2px 3px 5px -1px rgba(48, 24, 8, 0.34),
      -4px 5px 12px -2px rgba(80, 40, 14, 0.2),
      inset 1px 0 1px rgba(255, 232, 205, 0.22)
    `,
  },
}

function leftRailLighting(frameColor: FrameColor) {
  return frameColor === "gold"
    ? LEFT_BUTTON_LIGHTING.gold
    : LEFT_BUTTON_LIGHTING.graphite
}

function LeftRailButton({
  frameColor,
  frameColorScheme,
  className,
}: {
  frameColor: FrameColor
  frameColorScheme: (typeof FRAME_COLORS)[FrameColor]
  className?: string
}) {
  const L = leftRailLighting(frameColor)
  return (
    <div
      aria-hidden
      className={cn(
        "-left-[3px] absolute w-[3px] overflow-visible rounded-l-sm transition-shadow duration-200",
        "isolate",
        "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-l-sm before:content-['']",
        L.beforeShadow,
        "after:-right-px after:-left-px after:pointer-events-none after:absolute after:top-[calc(100%-2px)] after:z-0 after:h-2.5 after:opacity-[0.72] after:blur-xs after:content-['']",
        L.afterClasses,
        className
      )}
      style={{
        background: frameColorScheme.button,
        boxShadow: L.boxShadow,
      }}
    />
  )
}

const DYNAMIC_ISLAND_SIZES = {
  default: { width: 110, height: 32, borderRadius: 16 },
  compact: { width: 90, height: 28, borderRadius: 14 },
  /** width ignored for motion — expanded uses nearly full screen width */
  expanded: { width: 280, height: 56, borderRadius: 32 },
  large: { width: 290, height: 120, borderRadius: 32 },
  ultra: { width: 300, height: 180, borderRadius: 36 },
}

function getIslandMotionAnimate(size: DynamicIslandSize) {
  const c = DYNAMIC_ISLAND_SIZES[size]
  //   if (size === "expanded") {
  //     return {
  //       width: "calc(100% - 18px)",
  //       borderRadius: c.borderRadius,
  //       height: c.height,
  //     };
  //   }
  return {
    width: c.width,
    borderRadius: c.borderRadius,
    height: c.height,
  }
}

export function IPhone17ProMax({
  children,
  dynamicIslandSize = "default",
  dynamicIslandContent,
  frameColor = "graphite",
  showStatusBar = true,
  showHomeIndicator = true,
  time = "9:41",
  batteryLevel = 94,
  signalStrength = 2,
  onDynamicIslandTap,
  onScreenTap,
  className = "",
}: IPhoneProps) {
  const [internalDynamicIslandSize, setInternalDynamicIslandSize] =
    useState<DynamicIslandSize>(dynamicIslandSize)

  const frameColorScheme = FRAME_COLORS[frameColor]

  const handleDynamicIslandTap = () => {
    if (onDynamicIslandTap) {
      onDynamicIslandTap()
    } else {
      // Default behavior: toggle between default and expanded
      setInternalDynamicIslandSize((prev) =>
        prev === "default" ? "expanded" : "default"
      )
    }
  }

  // Sync with external prop changes
  if (dynamicIslandSize !== internalDynamicIslandSize && onDynamicIslandTap) {
    setInternalDynamicIslandSize(dynamicIslandSize)
  }

  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      {/* Phone Container - iPhone 17 Pro Max aspect ratio */}
      <div
        className={"relative transition-transform duration-150 ease-out"}
        style={{
          height: "min(700px, 85vh)",
          aspectRatio: "71.5 / 149.6",
          //   aspectRatio: "71.5 / 145.6",
        }}
      >
        {/* Outer Shadow */}
        <div
          className="absolute inset-0 rounded-[55px]"
          style={{
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 12px 24px -8px rgba(0, 0, 0, 0.15)",
          }}
        />

        {/* Titanium Frame */}
        <div
          className="absolute inset-0 rounded-[55px]"
          style={{
            background: frameColorScheme.gradient,
            padding: "3px",
          }}
        >
          {/* Inner Black Bezel */}
          <div
            className="relative h-full w-full overflow-hidden rounded-[52px]"
            style={{
              background: "#0a0a0a",
              padding: "3px",
            }}
          >
            {/* Screen */}
            <div
              className="relative h-full w-full cursor-pointer overflow-hidden rounded-[49px] bg-white"
              {...(onScreenTap
                ? {
                    role: "button" as const,
                    tabIndex: 0,
                    "aria-label": "Phone screen",
                    onKeyDown: (e: ReactKeyboardEvent<HTMLDivElement>) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        onScreenTap()
                      }
                    },
                  }
                : {})}
              onClick={(e) => {
                e.stopPropagation()
                if (onScreenTap) {
                  onScreenTap()
                  return
                }
                handleDynamicIslandTap()
              }}
            >
              {/* Status Bar */}
              {showStatusBar && (
                <div className="absolute top-0 right-0 left-0 z-10 flex items-center justify-between px-6 pt-4 font-medium text-black text-xs">
                  {/* Left side - Time */}
                  <div className="mt-1 ml-1 flex w-14 items-center gap-1">
                    <span className="font-semibold text-[14px] tracking-tight">
                      {time}
                    </span>
                  </div>

                  {/* Right side - Signal, WiFi, Battery */}
                  <div className="flex w-17 items-center justify-end gap-[5px]">
                    {/* Signal Bars */}
                    <div className="flex items-end gap-px">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          className={cn(
                            "w-[3px] rounded-[1px] bg-black",
                            i <= signalStrength ? "opacity-100" : "opacity-30"
                          )}
                          key={i}
                          style={{
                            height: `${3 + i * 2}px`,
                            opacity: i <= signalStrength ? 1 : 0.3,
                          }}
                        />
                      ))}
                    </div>
                    <Wifi
                      className="size-3.5 text-black"
                      size={13}
                      strokeWidth={2}
                    />
                    {/* Battery */}
                    <div className="relative flex items-center">
                      <div className="relative h-[12px] w-[24px] rounded-[4px] border border-gray-900/20 ring-1 ring-white/5">
                        <div
                          className="absolute top-[1.2px] bottom-px left-[1.2px] rounded-[2.5px] bg-gray-950/90 transition-all"
                          style={{
                            width: `${Math.max(0, Math.min(100, batteryLevel)) * 0.19}px`,
                          }}
                        />
                      </div>
                      <div className="ml-[0.5px] h-[5px] w-[1.5px] rounded-r-sm bg-black/40" />
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Island */}
              <motion.div
                animate={getIslandMotionAnimate(internalDynamicIslandSize)}
                className={cn(
                  "absolute top-3 z-20 flex cursor-pointer items-center justify-center overflow-hidden bg-black",
                  internalDynamicIslandSize === "expanded"
                    ? "-translate-x-1/2 left-1/2 max-w-[calc(100%-18px)]"
                    : "-translate-x-1/2 left-1/2"
                )}
                onClick={(e) => {
                  e.stopPropagation()
                  handleDynamicIslandTap()
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              >
                <AnimatePresence mode="wait">
                  {internalDynamicIslandSize === "default" ||
                  internalDynamicIslandSize === "compact" ? (
                    <motion.div
                      animate={{ opacity: 1 }}
                      className="absolute right-3"
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                      key="camera"
                    >
                      {/* Camera lens inside Dynamic Island */}
                      <div
                        className="h-[10px] w-[10px] rounded-full"
                        style={{
                          background:
                            "radial-gradient(circle at 30% 30%, #2a3a5a 0%, #0f1520 60%, #000 100%)",
                          boxShadow: "inset 0 0 2px rgba(100, 150, 255, 0.3)",
                        }}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex h-full w-full items-center justify-center p-3 text-white"
                      exit={{ opacity: 0, scale: 0.8 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      key="content"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    >
                      {dynamicIslandContent || (
                        <DefaultDynamicIslandContent
                          size={internalDynamicIslandSize}
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Screen Content Area */}
              <div className="absolute inset-0 flex flex-col pt-14">
                {children}
              </div>

              {/* Home Indicator */}
              {showHomeIndicator && (
                <div className="-translate-x-1/2 absolute bottom-2 left-1/2">
                  <div className="h-1 w-32 rounded-full bg-black/80" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Side Buttons - Right Side (Power Button) */}
        <div
          className="-right-[3px] absolute top-[28%] h-[65px] w-[3px] rounded-r-sm transition-shadow duration-200"
          style={{
            background: frameColorScheme.button,
            boxShadow: `
              1px 0 0 0 rgba(255, 255, 255, 0.15),
              2px 1px 3px -1px rgba(0, 0, 0, 0.25),
              3px 2px 6px 0 rgba(0, 0, 0, 0.15),
              inset -1px 0 1px rgba(255, 255, 255, 0.1)
            `,
          }}
        />

        {/* Side Buttons - Left Side */}
        <LeftRailButton
          className="top-[20%] h-[22px]"
          frameColor={frameColor}
          frameColorScheme={frameColorScheme}
        />
        <LeftRailButton
          className="top-[27%] h-[40px]"
          frameColor={frameColor}
          frameColorScheme={frameColorScheme}
        />
        <LeftRailButton
          className="top-[36%] h-[40px]"
          frameColor={frameColor}
          frameColorScheme={frameColorScheme}
        />

        {/* Frame Highlights */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[55px]"
          style={{
            background: `linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.15) 0%,
              transparent 25%,
              transparent 75%,
              rgba(0, 0, 0, 0.1) 100%
            )`,
          }}
        />
      </div>
    </div>
  )
}

const ISLAND_ART =
  "bg-linear-to-br from-pink-500 via-orange-400 to-violet-600 shadow-[inset_0_1px_2px_rgba(255,255,255,0.35)]"

const MINI_WAVEFORM_BARS = [
  { id: "a", h: 8 },
  { id: "b", h: 18 },
  { id: "c", h: 12 },
  { id: "d", h: 12 },
  { id: "e", h: 17 },
  { id: "f", h: 24 },
  { id: "g", h: 15 },
  { id: "h", h: 20 },
  { id: "i", h: 16 },
  { id: "j", h: 21 },
  { id: "k", h: 14 },
  { id: "l", h: 18 },
] as const

function MiniWaveform({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex h-5 items-end gap-px", className)}>
      {MINI_WAVEFORM_BARS.map(({ id, h }) => (
        <span
          className="w-1 min-w-px rounded-full bg-rose-400/95"
          key={id}
          style={{ height: h }}
        />
      ))}
    </div>
  )
}

/** Spotify “circle + three arcs” mark (#1DB954), decorative only */
function SpotifyLogoMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden className={cn("shrink-0", className)} viewBox="0 0 24 24">
      <title>Spotify</title>
      <path
        d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
        fill="#1DB954"
      />
    </svg>
  )
}

/** Green disc + dark waveform (Spotify-style app icon), decorative */
function SpotifyAppIcon({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full bg-[#1DB954]",
        className
      )}
    >
      <AudioLines className="size-[18px] text-black" strokeWidth={2.75} />
    </div>
  )
}

const PAUSE_RING_R = 15

function PauseWithProgressRing({
  progress = 0.75,
  className,
}: {
  progress?: number
  className?: string
}) {
  const circumference = 2 * Math.PI * PAUSE_RING_R
  const dashOffset = circumference * (1 - progress)
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex size-10 items-center justify-center",
        className
      )}
    >
      <svg
        className="-rotate-90 absolute inset-0 size-full"
        viewBox="0 0 44 44"
      >
        <title>Playback progress</title>
        <circle
          cx="22"
          cy="22"
          fill="none"
          r={PAUSE_RING_R}
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="2.5"
        />
        <circle
          cx="22"
          cy="22"
          fill="none"
          r={PAUSE_RING_R}
          stroke="#1DB954"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          strokeWidth="2.5"
        />
      </svg>
      <span className="flex size-8 items-center justify-center rounded-full bg-white/[0.14]">
        <Pause className="size-3.5 text-white" strokeWidth={2.5} />
      </span>
    </span>
  )
}

// Default content shown in expanded Dynamic Island
function DefaultDynamicIslandContent({ size }: { size: DynamicIslandSize }) {
  if (size === "expanded") {
    return (
      <div className="flex h-full w-full items-center justify-between gap-3 px-0.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <SpotifyAppIcon />
          <div className="min-w-0">
            <p className="truncate text-[11px] text-white/65">RY X</p>
            <p className="truncate font-semibold text-[14px] text-white leading-tight">
              Let You Go
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <PauseWithProgressRing progress={0.72} />
          <span
            aria-hidden
            className="flex size-9 items-center justify-center rounded-full bg-white/[0.14] text-white"
          >
            <SkipForward className="size-4" strokeWidth={2.25} />
          </span>
        </div>
      </div>
    )
  }

  if (size === "large") {
    return (
      <div className="flex h-full w-full flex-col justify-between gap-1 text-white">
        <div className="flex items-center gap-2.5">
          <div
            aria-hidden
            className={cn("h-14 w-14 shrink-0 rounded-xl", ISLAND_ART)}
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-[12px] uppercase tracking-wide">
              The Move
            </p>
            <p className="truncate text-[11px] text-white/55">Space Rangers</p>
          </div>
          <MiniWaveform className="h-12" />
        </div>

        <div className="space-y-1 px-2 pb-2">
          <div className="flex justify-between font-medium text-[9px] text-white/45 tabular-nums">
            <span>1:20</span>
            <span>-1:48</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/16">
            <div className="h-full w-[41%] rounded-full bg-white" />
          </div>
        </div>
      </div>
    )
  }

  if (size === "ultra") {
    const ultraCtrl =
      "flex size-7.5 shrink-0 items-center justify-center rounded-full bg-white/[0.14] text-white ring-1 ring-gray-900/30"

    return (
      <div className="flex h-full w-full flex-col gap-2.5 text-white">
        <div className="mt-0.5 flex items-center justify-between font-medium text-[10px] tabular-nums">
          <span className="ml-2 text-white/90">0:42</span>
          <SpotifyLogoMark className="mr-2 h-[18px] w-[18px]" />
        </div>

        <div className="flex items-center gap-2.5">
          <div
            aria-hidden
            className={cn(
              "h-[40px] w-[40px] shrink-0 rounded-full",
              ISLAND_ART
            )}
          />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-white/65">RY X</p>
            <p className="font-semibold text-[15px] text-white leading-snug tracking-tight">
              Let You Go
            </p>
          </div>
          <div aria-hidden className="flex shrink-0 gap-2">
            <span className={ultraCtrl}>
              <Mic className="size-3.5 text-white/80" strokeWidth={2.5} />
            </span>
            <span className={cn(ultraCtrl, "relative")}>
              <Music className="size-3.5 text-white/80" strokeWidth={2.5} />
              {/* <UserRound className="h-4 w-4" strokeWidth={2} />
              <span className="pointer-events-none absolute -right-0.5 -bottom-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-white/14 ring-1 ring-black/40">
                <Music className="h-2 w-2 text-white" strokeWidth={2.5} />
              </span> */}
            </span>
          </div>
        </div>

        <div>
          <div className="mb-1 flex justify-between gap-2 font-medium text-[10px] text-white/45 tabular-nums">
            <span>1:40</span>
            <div className="relative flex h-4 w-full items-center">
              <div className="mx-auto h-1 w-full rounded-full bg-white/14" />
              <div className="-translate-y-1/2 absolute top-1/2 left-0 h-1 w-[48%] rounded-l-full bg-white" />
              <div
                aria-hidden
                className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-[48%] z-10 h-3.5 w-3.5 rounded-full border border-black/25 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
              />
            </div>
            <span>3:20</span>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-5 place-items-center gap-1">
          <span aria-hidden className={ultraCtrl}>
            <Heart className="h-[15px] w-[15px]" strokeWidth={2} />
          </span>
          <span aria-hidden className={ultraCtrl}>
            <SkipBack className="h-[17px] w-[17px]" strokeWidth={2} />
          </span>
          <span aria-hidden className={ultraCtrl}>
            <Play
              className="ml-0.5 h-[17px] w-[17px] fill-current text-white"
              strokeWidth={0}
            />
          </span>
          <span aria-hidden className={ultraCtrl}>
            <SkipForward className="h-[17px] w-[17px]" strokeWidth={2} />
          </span>
          <span aria-hidden className={ultraCtrl}>
            <AlignJustify className="h-[15px] w-[15px]" strokeWidth={2} />
          </span>
        </div>
      </div>
    )
  }

  return null
}

// Keep the old export for backwards compatibility
export default IPhone17ProMax
