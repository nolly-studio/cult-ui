"use client"

import { useCallback, useRef, useState } from "react"
import { Compass, Mountain, Sun, Thermometer } from "lucide-react"
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react"

import { cn } from "@/lib/utils"

const DETAIL_HOLD_MS = 2000
const CENTER_CROSSFADE = { duration: 0.2, ease: [0.23, 1, 0.32, 1] as const }
const LAYOUT_SPRING = {
  type: "spring" as const,
  duration: 0.34,
  bounce: 0.22,
}

export function AppleWatchUltra() {
  const [compassRotation, setCompassRotation] = useState(0)
  const [actionFlash, setActionFlash] = useState(false)
  const [centerDetailKey, setCenterDetailKey] = useState<string | null>(null)
  const [centerDetailOpen, setCenterDetailOpen] = useState(false)
  const detailHoldTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reduceMotion = useReducedMotion()

  const layoutTransition = reduceMotion ? { duration: 0.01 } : LAYOUT_SPRING

  const handleCrownClick = useCallback(() => {
    setCompassRotation((prev) => prev + 15)
  }, [])

  const handleActionButtonClick = useCallback(() => {
    setActionFlash(true)
    setTimeout(() => setActionFlash(false), 200)
  }, [])

  const handleComplicationClick = useCallback((complication: string) => {
    setCenterDetailKey(complication)
    requestAnimationFrame(() => setCenterDetailOpen(true))
    if (detailHoldTimerRef.current) {
      clearTimeout(detailHoldTimerRef.current)
    }
    detailHoldTimerRef.current = setTimeout(() => {
      setCenterDetailOpen(false)
      detailHoldTimerRef.current = null
    }, DETAIL_HOLD_MS)
  }, [])

  const complications = {
    uv: { label: "UV Index", value: "3", sublabel: "Moderate" },
    temp: { label: "Temperature", value: "72", sublabel: "Partly Cloudy" },
    compass: { label: "Heading", value: "NW", sublabel: "315" },
    altitude: { label: "Altitude", value: "1,247", sublabel: "ft" },
  }

  const degreeSymbol = "\u00B0"
  const bandIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  const crownIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const dotIndices = [0, 1, 2, 3, 4]
  const compassIndices = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
  ]
  const cardinals = ["N", "E", "S", "W"]

  const activeDetail =
    centerDetailOpen && centerDetailKey
      ? complications[centerDetailKey as keyof typeof complications]
      : null

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <div
        className="relative scale-100 cursor-pointer select-none transition-all duration-200 ease-out"
        style={{
          width: "min(380px, 85vw)",
        }}
      >
        <div className="-top-20 -translate-x-1/2 absolute left-1/2 z-0 h-24 w-48">
          <div
            className="h-full w-full rounded-t-[38px]"
            style={{
              background:
                "linear-gradient(180deg, #3d5a80 0%, #4a6fa5 30%, #3d5a80 100%)",
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.3)",
            }}
          >
            <div className="absolute inset-x-4 top-2 bottom-0 flex flex-col gap-1">
              {bandIndices.map((i) => (
                <div className="flex justify-between" key={i}>
                  <div className="h-1.5 w-[2px] bg-white/40" />
                  <div className="h-1.5 w-[2px] bg-white/40" />
                </div>
              ))}
            </div>
            <div className="absolute inset-x-7 top-0 bottom-0 flex h-full flex-col gap-1 bg-blue-950" />
            <div className="absolute inset-x-6 top-1 bottom-0 flex flex-col gap-1">
              {bandIndices.map((i) => (
                <div className="flex justify-between" key={i}>
                  <div className="h-1.5 w-[2px] bg-white/40" />
                  <div className="h-1.5 w-[2px] bg-white/40" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="-bottom-20 -translate-x-1/2 absolute left-1/2 z-0 h-26 w-48">
          <div
            className="h-full w-full rounded-b-[38px]"
            style={{
              background:
                "linear-gradient(0deg, #3d5a80 0%, #4a6fa5 30%, #3d5a80 100%)",
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.3)",
            }}
          >
            <div className="absolute inset-x-4 top-0 bottom-2 flex flex-col gap-1">
              {bandIndices.slice(0, 10).map((i) => (
                <div className="flex justify-between" key={i}>
                  <div className="h-1.5 w-[2px] bg-white/40" />
                  <div className="h-1.5 w-[2px] bg-white/40" />
                </div>
              ))}
            </div>
            <div className="absolute inset-x-7 top-0 bottom-0 flex h-full flex-col gap-1 bg-blue-950" />
            <div className="absolute inset-x-6 top-0 bottom-0 flex flex-col gap-1">
              {bandIndices.slice(0, 10).map((i) => (
                <div className="flex justify-between" key={i}>
                  <div className="h-1.5 w-[2px] bg-white/40" />
                  <div className="h-1.5 w-[2px] bg-white/40" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 z-10 rounded-[86px]"
          style={{
            boxShadow:
              "0 4px 8px rgba(0,0,0,0.5), 0 12px 24px rgba(0,0,0,0.4), 0 32px 64px rgba(0,0,0,0.3)",
          }}
        />

        <div
          className="relative z-10 rounded-[86px]"
          style={{
            aspectRatio: "0.88",
            background:
              "linear-gradient(145deg, #c9c5bf 0%, #b5b0a8 15%, #a39e96 35%, #918c84 55%, #7d7870 75%, #696560 100%)",
            boxShadow:
              "inset 0 2px 0 rgba(255,255,255,0.35), inset -2px 0 0 rgba(0,0,0,0.1), inset 0 -2px 0 rgba(0,0,0,0.15), inset 2px 0 0 rgba(255,255,255,0.15)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-[2px] rounded-[82px]"
            style={{
              boxShadow:
                "inset 1px 1px 0 rgba(255,255,255,0.25), inset -1px -1px 0 rgba(0,0,0,0.15)",
            }}
          />

          <div
            className="-right-5 -translate-y-1/2 absolute top-1/2 z-20 h-48 w-5 rounded-r-2xl"
            style={{
              background:
                "linear-gradient(145deg, #b5b0a8 0%, #9a958d 30%, #7d7870 70%, #696560 100%)",
              boxShadow:
                "3px 0 6px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.25), inset 0 -2px 0 rgba(0,0,0,0.15)",
            }}
          />

          <button
            className="-right-5 absolute top-[calc(50%-58px)] z-30 h-14 w-6 cursor-pointer rounded-md transition-all hover:brightness-110 active:brightness-90"
            onClick={handleCrownClick}
            style={{
              background:
                "linear-gradient(90deg, #858078 0%, #97928a 30%, #a9a49c 50%, #97928a 70%, #858078 100%)",
              boxShadow:
                "2px 0 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.35)",
            }}
            title="Click to rotate compass"
            type="button"
          >
            <div className="absolute inset-x-0.5 inset-y-1 flex flex-col justify-between">
              {crownIndices.map((i) => (
                <div
                  className="h-px w-full"
                  key={i}
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.4) 70%, transparent 100%)",
                  }}
                />
              ))}
            </div>
            <div className="-translate-y-1/2 absolute top-1/2 right-0 flex flex-col gap-0.5 pr-0.5">
              {dotIndices.map((i) => (
                <div className="h-1 w-1 rounded-full bg-black/30" key={i} />
              ))}
            </div>
          </button>

          <div
            className="-right-3.5 absolute top-[calc(50%+14px)] z-30 h-5 w-4 rounded-md"
            style={{
              background:
                "linear-gradient(90deg, #7d7870 0%, #918c84 50%, #7d7870 100%)",
              boxShadow:
                "2px 0 3px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
            }}
          />

          <button
            className="-left-1.5 absolute top-[calc(50%+8px)] z-30 h-20 w-2 cursor-pointer rounded-full transition-all hover:brightness-110 active:brightness-90"
            onClick={handleActionButtonClick}
            style={{
              background:
                "radial-gradient(circle at 35% 35%, #ff8c42 0%, #ff6d0a 45%, #e55d00 100%)",
              boxShadow:
                "-2px 0 4px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)",
            }}
            title="Action Button"
            type="button"
          >
            <div className="absolute inset-1.5 rounded-sm border border-white/50" />
          </button>

          <div
            className="-top-2 -translate-x-1/2 absolute left-1/2 h-4 w-14 rounded-t-lg"
            style={{
              background:
                "linear-gradient(180deg, #b5b0a8 0%, #a39e96 50%, #918c84 100%)",
              boxShadow:
                "0 -2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.25)",
            }}
          >
            <div className="-translate-x-1/2 absolute bottom-0.5 left-1/2 h-1 w-10 rounded-full bg-black/30" />
          </div>

          <div
            className="-bottom-2 -translate-x-1/2 absolute left-1/2 h-4 w-14 rounded-b-lg"
            style={{
              background:
                "linear-gradient(0deg, #918c84 0%, #a39e96 50%, #b5b0a8 100%)",
              boxShadow:
                "0 2px 4px rgba(0,0,0,0.2), inset 0 -1px 0 rgba(0,0,0,0.15)",
            }}
          >
            <div className="-translate-x-1/2 absolute top-0.5 left-1/2 h-1 w-10 rounded-full bg-black/30" />
          </div>

          <div
            className="absolute inset-3 overflow-hidden rounded-[72px]"
            style={{
              background: "#1c1c1e",
              boxShadow:
                "inset 0 0 0 3px rgba(0,0,0,0.6), inset 0 4px 8px rgba(0,0,0,0.6)",
            }}
          >
            <div
              className="absolute inset-1 overflow-hidden rounded-[68px] transition-colors duration-200"
              style={{
                backgroundColor: actionFlash ? "#FF6D0A" : "#000000",
                boxShadow: "inset 0 0 12px rgba(0,0,0,0.9)",
              }}
            >
              <div className="relative h-full w-full p-3">
                <div className="absolute top-2 right-0 left-0 z-20 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#30D158]" />
                </div>

                <div
                  className="absolute inset-8 rounded-full transition-transform duration-300 ease-out"
                  style={{ transform: `rotate(${compassRotation}deg)` }}
                >
                  {compassIndices.map((i) => {
                    const degree = i * 10
                    const isMajor = degree % 30 === 0
                    const isCardinal = degree % 90 === 0
                    const tickColor = isCardinal
                      ? "#FF6D0A"
                      : "rgba(255,255,255,0.5)"
                    const textColor = isCardinal
                      ? "#FF6D0A"
                      : "rgba(255,255,255,0.6)"

                    return (
                      <div
                        className="absolute top-0 left-1/2 origin-bottom"
                        key={i}
                        style={{
                          transform: `translateX(-50%) rotate(${degree}deg)`,
                          height: "50%",
                        }}
                      >
                        <div
                          className="-translate-x-1/2 absolute top-0 left-1/2"
                          style={{
                            width: isMajor ? "2px" : "1px",
                            height: isMajor ? "10px" : "5px",
                            background: tickColor,
                          }}
                        />
                        {isMajor && (
                          <div
                            className="absolute top-3 left-1/2 font-semibold text-[9px]"
                            style={{
                              color: textColor,
                              transform: `translateX(-50%) rotate(-${degree + compassRotation}deg)`,
                            }}
                          >
                            {isCardinal ? cardinals[degree / 90] : degree}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <LayoutGroup>
                    <AnimatePresence
                      initial={false}
                      mode="popLayout"
                      onExitComplete={() => {
                        if (!centerDetailOpen) {
                          setCenterDetailKey(null)
                        }
                      }}
                    >
                      {activeDetail ? (
                        <motion.div
                          animate={{
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)",
                          }}
                          className="flex w-full max-w-[min(220px,72%)] flex-col items-center justify-center px-2"
                          exit={{
                            opacity: 0,
                            scale: 0.97,
                            filter: reduceMotion ? "blur(0px)" : "blur(3px)",
                          }}
                          initial={{
                            opacity: 0,
                            scale: 0.97,
                            filter: reduceMotion ? "blur(0px)" : "blur(3px)",
                          }}
                          key="center-detail"
                          transition={CENTER_CROSSFADE}
                        >
                          <div className="text-center font-medium text-[#8E8E93] text-[11px] leading-tight tracking-wide">
                            {activeDetail.label}
                          </div>
                          <motion.div
                            className="mt-1 text-center font-bold text-white leading-none tracking-tight"
                            layoutId="center-text"
                            style={{
                              fontSize: "40px",
                              fontFamily:
                                "system-ui, -apple-system, sans-serif",
                            }}
                            transition={layoutTransition}
                          >
                            {activeDetail.value}
                          </motion.div>
                          <div className="mt-1 text-center font-medium text-[#8E8E93] text-[12px] leading-tight">
                            {activeDetail.sublabel}
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          animate={{
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)",
                          }}
                          className="flex flex-col items-center"
                          exit={{
                            opacity: 0,
                            scale: 0.97,
                            filter: reduceMotion ? "blur(0px)" : "blur(3px)",
                          }}
                          initial={{
                            opacity: 0,
                            scale: 0.97,
                            filter: reduceMotion ? "blur(0px)" : "blur(3px)",
                          }}
                          key="center-time"
                          transition={CENTER_CROSSFADE}
                        >
                          <motion.div
                            className="font-bold text-white leading-none tracking-tight"
                            layoutId="center-text"
                            style={{
                              fontSize: "48px",
                              fontFamily:
                                "system-ui, -apple-system, sans-serif",
                            }}
                            transition={layoutTransition}
                          >
                            10:09
                          </motion.div>
                          <div className="mt-1 font-medium text-[#8E8E93] text-[11px] tracking-wide">
                            TUESDAY, APR 1
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </LayoutGroup>
                </div>

                <ComplicationItem
                  ariaLabel={complications.uv.label}
                  icon={<Sun size={16} strokeWidth={1.5} />}
                  isActive={centerDetailKey === "uv"}
                  label="UV"
                  onClick={() => handleComplicationClick("uv")}
                  position="top-left"
                  value={complications.uv.value}
                />

                <ComplicationItem
                  ariaLabel={complications.temp.label}
                  icon={<Thermometer size={16} strokeWidth={1.5} />}
                  isActive={centerDetailKey === "temp"}
                  label=""
                  onClick={() => handleComplicationClick("temp")}
                  position="top-right"
                  value={complications.temp.value + degreeSymbol}
                />

                <ComplicationItem
                  ariaLabel={complications.compass.label}
                  icon={<Compass size={16} strokeWidth={1.5} />}
                  isActive={centerDetailKey === "compass"}
                  label={complications.compass.sublabel + degreeSymbol}
                  onClick={() => handleComplicationClick("compass")}
                  position="bottom-left"
                  value={complications.compass.value}
                />

                <ComplicationItem
                  ariaLabel={complications.altitude.label}
                  icon={<Mountain size={16} strokeWidth={1.5} />}
                  isActive={centerDetailKey === "altitude"}
                  label={complications.altitude.sublabel}
                  onClick={() => handleComplicationClick("altitude")}
                  position="bottom-right"
                  value={complications.altitude.value}
                />

                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute top-1/2 right-[22%] left-[22%] h-px bg-white/15" />
                  <div className="absolute top-[22%] bottom-[22%] left-1/2 w-px bg-white/15" />
                </div>

                <div
                  className="pointer-events-none absolute inset-0 rounded-[40px]"
                  style={{
                    background:
                      "linear-gradient(35deg, transparent 0%, transparent 42%, rgba(255,255,255,0.04) 46%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 54%, transparent 58%, transparent 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ComplicationItem({
  position,
  icon,
  value,
  label,
  isActive,
  onClick,
  ariaLabel,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  icon: React.ReactNode
  value: string
  label: string
  isActive: boolean
  onClick: () => void
  ariaLabel: string
}) {
  const positions: Record<string, string> = {
    "top-left": "top-6 left-6",
    "top-right": "top-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-right": "bottom-6 right-6",
  }

  const posClass = positions[position]

  return (
    <button
      aria-label={ariaLabel}
      className={cn(
        "absolute z-10 flex cursor-pointer flex-col items-center gap-0.5 transition-transform duration-200 ease-out active:scale-[0.97]",
        posClass,
        isActive ? "scale-125" : "hover:scale-110"
      )}
      onClick={onClick}
      type="button"
    >
      <div className="text-[#FF6D0A]">{icon}</div>
      <div className="font-semibold text-white text-xs leading-none">
        {value}
      </div>
      {label ? (
        <div className="font-medium text-[#8E8E93] text-[9px] leading-none">
          {label}
        </div>
      ) : null}
    </button>
  )
}
