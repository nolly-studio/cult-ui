"use client"

import type { ReactNode } from "react"
import {
  IconAlt,
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconBrightnessDown,
  IconBrightnessUp,
  IconCommand,
  IconLayoutGrid,
  IconMathLower,
  IconMicrophone,
  IconMoon,
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconSearch,
  IconVolume,
  IconVolume2,
  IconVolume3,
  IconWorld,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"

type KeySize =
  | "1u"
  | "1.25u"
  | "1.5u"
  | "1.75u"
  | "2u"
  | "2.25u"
  | "2.75u"
  | "6.25u"

type CornerPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "none"

interface KeyProps {
  children?: ReactNode
  size?: KeySize
  symbol?: string
  secondaryLabel?: string
  icon?: ReactNode
  corner?: CornerPosition
  className?: string
  iconWithLabel?: boolean
}

const sizeClasses: Record<KeySize, string> = {
  "1u": "w-10 sm:w-11 md:w-12",
  "1.25u": "w-[52px] sm:w-14 md:w-[60px]",
  "1.5u": "w-[60px] sm:w-[68px] md:w-[72px]",
  "1.75u": "w-[70px] sm:w-[78px] md:w-[84px]",
  "2u": "w-[82px] sm:w-[90px] md:w-[98px]",
  "2.25u": "w-[92px] sm:w-[100px] md:w-[110px]",
  "2.75u": "w-[112px] sm:w-[122px] md:w-[134px]",
  "6.25u": "w-[200px] sm:w-[260px] md:w-[300px]",
}

const cornerClasses: Record<CornerPosition, string> = {
  "top-left": "rounded-tl-xl",
  "top-right": "rounded-tr-xl",
  "bottom-left": "rounded-bl-xl",
  "bottom-right": "rounded-br-xl",
  none: "",
}

function Key({
  children,
  size = "1u",
  symbol,
  secondaryLabel,
  icon,
  corner = "none",
  className,
  iconWithLabel = false,
}: KeyProps) {
  let mainContent: ReactNode = null
  if (iconWithLabel && icon) {
    mainContent = (
      <div className="flex items-center gap-0.5">
        {icon}
        {children && (
          <span className="text-[8px] text-gray-500 sm:text-[9px]">
            {children}
          </span>
        )}
      </div>
    )
  } else if (icon) {
    mainContent = (
      <span className="flex items-center justify-center">{icon}</span>
    )
  } else if (children) {
    mainContent = (
      <span className={cn(symbol && "leading-tight")}>{children}</span>
    )
  }

  return (
    <button
      className={cn(
        "h-10 sm:h-11 md:h-12",
        "bg-gradient-to-b from-white to-[#fafafa]",
        "rounded-[4px]",
        "flex flex-col items-center justify-center",
        "font-normal text-gray-800 text-sm sm:text-base",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_0_0_0.5px_rgba(0,0,0,0.08),0_1px_1px_rgba(0,0,0,0.06)]",
        "border-0",
        "shadow-inner ring-1 ring-black/10",
        "transition-all duration-75 ease-out",
        "active:scale-[0.98] active:bg-gradient-to-b active:from-[#f0f0f2] active:to-[#eaeaec] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1),0_0_0_0.5px_rgba(0,0,0,0.1)]",
        "cursor-pointer select-none",
        sizeClasses[size],
        cornerClasses[corner],
        className
      )}
      type="button"
    >
      {symbol && (
        <span className="font-light text-[10px] text-gray-400 leading-none sm:text-[11px]">
          {symbol}
        </span>
      )}
      {mainContent}
      {secondaryLabel && (
        <span className="mt-3 font-light text-[7px] text-gray-600 leading-none sm:text-[8px]">
          {secondaryLabel}
        </span>
      )}
    </button>
  )
}

// Mac Magic Keyboard Component
export function AppleKeyboard() {
  const fnIconSize = 12
  const iconClass = "text-gray-600"

  return (
    <div className="mx-auto w-full max-w-[48rem]">
      <div className="rounded-xl bg-gradient-to-b from-[#d4d6d9] to-[#c9cbce] p-2 shadow-[0_8px_30px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.5)] sm:rounded-2xl sm:p-2.5 md:p-3">
        {/* Function Row */}
        <div className="mb-[3px] flex gap-[3px] sm:mb-1 sm:gap-1">
          <Key corner="top-left" size="1.5u">
            <span className="font-normal text-[10px] text-gray-600 sm:text-[11px]">
              esc
            </span>
          </Key>
          <Key
            icon={
              <IconBrightnessDown
                className={iconClass}
                size={fnIconSize}
                strokeWidth={1.5}
              />
            }
            secondaryLabel="F1"
            size="1u"
          />
          <Key
            icon={
              <IconBrightnessUp
                className={iconClass}
                size={fnIconSize}
                strokeWidth={1.5}
              />
            }
            secondaryLabel="F2"
            size="1u"
          />
          <Key
            icon={
              <IconLayoutGrid
                className={iconClass}
                size={fnIconSize}
                strokeWidth={1.5}
              />
            }
            secondaryLabel="F3"
            size="1u"
          />
          <Key
            icon={
              <IconSearch
                className={iconClass}
                size={fnIconSize}
                strokeWidth={1.5}
              />
            }
            secondaryLabel="F4"
            size="1u"
          />
          <Key
            icon={
              <IconMicrophone
                className={iconClass}
                size={fnIconSize}
                strokeWidth={1.5}
              />
            }
            secondaryLabel="F5"
            size="1u"
          />
          <Key
            icon={
              <IconMoon
                className={iconClass}
                size={fnIconSize}
                strokeWidth={1.5}
              />
            }
            secondaryLabel="F6"
            size="1u"
          />
          <Key
            icon={
              <IconPlayerTrackPrev
                className={iconClass}
                size={fnIconSize}
                strokeWidth={1.5}
              />
            }
            secondaryLabel="F7"
            size="1u"
          />
          <Key
            // icon={<span className="text-[11px] text-gray-600">⏯</span>}
            icon={
              <div className="flex items-center justify-center">
                <IconPlayerPlay
                  className={cn(iconClass, "-mr-0.5")}
                  size={11}
                  strokeWidth={1.5}
                />
                <IconPlayerPause
                  className={iconClass}
                  size={11}
                  strokeWidth={1.5}
                />
              </div>
            }
            secondaryLabel="F8"
            size="1u"
          />
          <Key
            // icon={<span className="text-[11px] text-gray-600">⏩</span>}
            icon={
              <IconPlayerTrackNext
                className={iconClass}
                size={fnIconSize}
                strokeWidth={1.5}
              />
            }
            secondaryLabel="F9"
            size="1u"
          />
          <Key
            icon={
              <IconVolume3
                className={iconClass}
                size={fnIconSize}
                strokeWidth={1.5}
              />
            }
            secondaryLabel="F10"
            size="1u"
          />
          <Key
            icon={
              <IconVolume2
                className={iconClass}
                size={fnIconSize}
                strokeWidth={1.5}
              />
            }
            secondaryLabel="F11"
            size="1u"
          />
          <Key
            icon={
              <IconVolume
                className={iconClass}
                size={fnIconSize}
                strokeWidth={1.5}
              />
            }
            secondaryLabel="F12"
            size="1u"
          />
          {/* Touch ID Button */}
          <button
            className="flex h-10 w-10 cursor-pointer select-none items-center justify-center overflow-hidden rounded-[4px] rounded-tr-xl bg-gradient-to-b from-white via-white/90 to-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.1)] transition-all duration-75 active:scale-[0.98] sm:h-11 sm:w-11 md:h-12 md:w-12"
            type="button"
          >
            <div className="h-7 w-7 rounded-full border-2 border-gray-400/70 bg-transparent shadow-inner ring-1 ring-black/10 sm:h-8 sm:w-8 md:h-9 md:w-9" />
          </button>
        </div>

        {/* Number Row */}
        <div className="mb-[3px] flex gap-[3px] sm:mb-1 sm:gap-1">
          <Key symbol="~">`</Key>
          <Key symbol="!">1</Key>
          <Key symbol="@">2</Key>
          <Key symbol="#">3</Key>
          <Key symbol="$">4</Key>
          <Key symbol="%">5</Key>
          <Key symbol="^">6</Key>
          <Key symbol="&amp;">7</Key>
          <Key symbol="*">8</Key>
          <Key symbol="(">9</Key>
          <Key symbol=")">0</Key>
          <Key symbol="_">-</Key>
          <Key symbol="+">{"="}</Key>
          <Key className="relative" size="1.5u">
            <span className="absolute right-2 bottom-1 font-normal text-[10px] text-gray-600 sm:text-[11px]">
              delete
            </span>
          </Key>
        </div>

        {/* QWERTY Row */}
        <div className="mb-[3px] flex gap-[3px] sm:mb-1 sm:gap-1">
          <Key className="relative" size="1.5u">
            <span className="absolute bottom-1 left-2 font-normal text-[10px] text-gray-600 sm:text-[11px]">
              tab
            </span>
          </Key>
          <Key>Q</Key>
          <Key>W</Key>
          <Key>E</Key>
          <Key>R</Key>
          <Key>T</Key>
          <Key>Y</Key>
          <Key>U</Key>
          <Key>I</Key>
          <Key>O</Key>
          <Key>P</Key>
          <Key symbol={"{"}>
            <span className="translate-y-2 text-[12px]">]</span>
          </Key>
          <Key symbol={"}"}>
            <span className="translate-y-2 text-[12px]">]</span>
          </Key>
          <Key symbol="|">
            {" "}
            <span className="translate-y-2 text-[12px]">\</span>
          </Key>
        </div>

        {/* Home Row */}
        <div className="mb-[3px] flex gap-[3px] sm:mb-1 sm:gap-1">
          <Key className="relative" size="1.75u">
            <span className="absolute top-2 left-1.5 h-1 w-1 rounded-full bg-gray-400/60" />
            <span className="absolute bottom-1 left-2 font-normal text-[10px] text-gray-600 sm:text-[11px]">
              caps lock
            </span>
          </Key>
          <Key>A</Key>
          <Key>S</Key>
          <Key>D</Key>
          <Key>F</Key>
          <Key>G</Key>
          <Key>H</Key>
          <Key>J</Key>
          <Key>K</Key>
          <Key>L</Key>
          <Key symbol=":">;</Key>
          <Key symbol={'"'}>&apos;</Key>
          <Key className="relative" size="1.75u">
            <span className="absolute right-2 bottom-1 font-normal text-[10px] text-gray-600 sm:text-[11px]">
              return
            </span>
          </Key>
        </div>

        {/* Shift Row */}
        <div className="mb-[3px] flex gap-[3px] sm:mb-1 sm:gap-1">
          <Key className="relative" size="2.25u">
            <span className="absolute bottom-1 left-2 font-normal text-[10px] text-gray-600 sm:text-[11px]">
              shift
            </span>
          </Key>
          <Key>Z</Key>
          <Key>X</Key>
          <Key>C</Key>
          <Key>V</Key>
          <Key>B</Key>
          <Key>N</Key>
          <Key>M</Key>
          <Key symbol="&lt;">,</Key>
          <Key symbol="&gt;">.</Key>
          <Key symbol="?">/</Key>
          <Key className="relative" size="2.25u">
            <span className="absolute right-2 bottom-1 font-normal text-[10px] text-gray-600 sm:text-[11px]">
              shift
            </span>
          </Key>
        </div>

        {/* Bottom Row with Arrow Keys */}
        <div className="flex items-end gap-[3px] sm:gap-1">
          <Key
            corner="bottom-left"
            icon={
              <IconWorld
                className={cn(iconClass, "-translate-x-2.5 translate-y-2")}
                size={14}
                strokeWidth={1.5}
              />
            }
          />
          <Key
            icon={
              <IconMathLower
                className={cn(
                  iconClass,
                  "-translate-y-1 translate-x-3 rotate-90"
                )}
                size={14}
                strokeWidth={1.5}
              />
            }
            secondaryLabel="control"
          />
          <Key
            icon={
              <IconAlt
                className={cn(iconClass, "-translate-y-1 translate-x-3")}
                size={14}
                strokeWidth={1.5}
              />
            }
            secondaryLabel="option"
          />
          <Key
            icon={
              <IconCommand
                className={cn(iconClass, "-translate-y-1 translate-x-3")}
                size={14}
                strokeWidth={1.5}
              />
            }
            secondaryLabel="command"
            size="1.25u"
          />
          <div className="h-10 w-[100px] cursor-pointer select-none rounded-[4px] bg-gradient-to-b from-white to-[#fafafa] shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_0_0_0.5px_rgba(0,0,0,0.08),0_1px_1px_rgba(0,0,0,0.06)] transition-all duration-75 active:scale-[0.98] active:bg-gradient-to-b active:from-[#f0f0f2] active:to-[#eaeaec] sm:h-11 sm:w-[140px] md:h-12 md:w-[280px]" />
          <Key
            icon={
              <IconCommand
                className={cn(iconClass, "-translate-y-1 translate-x-3")}
                size={14}
                strokeWidth={1.5}
              />
            }
            secondaryLabel="command"
            size="1.25u"
          />
          <Key
            icon={
              <IconAlt
                className={cn(iconClass, "-translate-y-1 translate-x-3")}
                size={14}
                strokeWidth={1.5}
              />
            }
            secondaryLabel="option"
          />

          {/* Arrow Keys Cluster - Left/Right are full height but narrower, Up/Down are half height stacked */}
          <div className="flex items-center gap-[3px] sm:gap-1">
            <Key
              className="!w-8 sm:!w-9 md:!w-10"
              icon={
                <IconArrowLeft
                  className={iconClass}
                  size={12}
                  strokeWidth={1.5}
                />
              }
            />
            <div className="flex flex-col gap-[1px]">
              <Key
                className="!w-8 sm:!w-9 md:!w-10 !h-[19px] sm:!h-[21px] md:!h-[23px] !rounded-b-none"
                icon={
                  <IconArrowUp
                    className={iconClass}
                    size={10}
                    strokeWidth={1.5}
                  />
                }
              />
              <Key
                className="!w-8 sm:!w-9 md:!w-10 !h-[19px] sm:!h-[21px] md:!h-[23px] !rounded-t-none"
                icon={
                  <IconArrowDown
                    className={iconClass}
                    size={10}
                    strokeWidth={1.5}
                  />
                }
              />
            </div>
            <Key
              className="!w-8 sm:!w-9 md:!w-10"
              corner="bottom-right"
              icon={
                <IconArrowRight
                  className={iconClass}
                  size={12}
                  strokeWidth={1.5}
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
