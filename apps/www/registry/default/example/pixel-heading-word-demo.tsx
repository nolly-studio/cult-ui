"use client"

import { useState } from "react"

import { PixelHeading } from "@/registry/default/ui/pixel-heading-word"

/* ─── Constants ─── */

const PIXEL_FONTS = ["square", "grid", "circle", "triangle", "line"] as const
type PixelFont = (typeof PIXEL_FONTS)[number]

const HEADING_LEVELS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const

/* ─── Demo ─── */

export default function PixelHeadingWordDemo() {
  const [text, setText] = useState("Pixel Fonts")
  const [initialFont, setInitialFont] = useState<PixelFont>("square")
  const [hoverFont, setHoverFont] = useState<PixelFont | "cycle">("cycle")
  const [cycleInterval, setCycleInterval] = useState(300)
  const [showLabel, setShowLabel] = useState(true)
  const [headingLevel, setHeadingLevel] =
    useState<(typeof HEADING_LEVELS)[number]>("h1")
  const [defaultFontIndex, setDefaultFontIndex] = useState(0)

  const isSwapMode = hoverFont !== "cycle"

  return (
    <div className="w-full space-y-8 py-4">
      {/* ── Preview ── */}
      <div className="flex min-h-[160px] items-center justify-center rounded-lg border border-border/40 bg-background p-8">
        <PixelHeading
          as={headingLevel}
          initialFont={initialFont}
          hoverFont={isSwapMode ? (hoverFont as PixelFont) : undefined}
          cycleInterval={cycleInterval}
          defaultFontIndex={defaultFontIndex}
          showLabel={showLabel}
          className="text-5xl md:text-7xl tracking-tight"
        >
          {text}
        </PixelHeading>
      </div>

      {/* ── Controls ── */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Text */}
        <ControlGroup label="Text">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="Enter heading text"
          />
        </ControlGroup>

        {/* Initial Font */}
        <ControlGroup label="Initial Font">
          <div className="flex flex-wrap gap-1.5">
            {PIXEL_FONTS.map((f) => (
              <button
                type="button"
                key={f}
                onClick={() => setInitialFont(f)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  initialFont === f
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </ControlGroup>

        {/* Hover Font / Mode */}
        <ControlGroup label="Hover Behavior">
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setHoverFont("cycle")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                hoverFont === "cycle"
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              cycle all
            </button>
            {PIXEL_FONTS.map((f) => (
              <button
                type="button"
                key={f}
                onClick={() => setHoverFont(f)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  hoverFont === f
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </ControlGroup>

        {/* Heading Level */}
        <ControlGroup label="Heading Level">
          <select
            value={headingLevel}
            onChange={(e) =>
              setHeadingLevel(e.target.value as (typeof HEADING_LEVELS)[number])
            }
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {HEADING_LEVELS.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </ControlGroup>

        {/* Cycle Interval */}
        <ControlGroup label={`Cycle Interval: ${cycleInterval}ms`}>
          <input
            type="range"
            min={50}
            max={1000}
            step={25}
            value={cycleInterval}
            onChange={(e) => setCycleInterval(Number(e.target.value))}
            className="w-full accent-foreground"
          />
          <p className="text-xs text-muted-foreground">
            Only applies in cycle mode (no hover font set)
          </p>
        </ControlGroup>

        {/* Default Font Index */}
        <ControlGroup label={`Default Font Index: ${defaultFontIndex}`}>
          <input
            type="range"
            min={0}
            max={4}
            step={1}
            value={defaultFontIndex}
            onChange={(e) => setDefaultFontIndex(Number(e.target.value))}
            className="w-full accent-foreground"
          />
          <p className="text-xs text-muted-foreground">
            Used when initialFont is not set
          </p>
        </ControlGroup>

        {/* Show Label */}
        <ControlGroup label="Show Label">
          <Toggle checked={showLabel} onChange={setShowLabel} />
        </ControlGroup>
      </div>
    </div>
  )
}

/* ─── Shared control primitives ─── */

function ControlGroup({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  )
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
        checked ? "bg-foreground" : "bg-input"
      }`}
    >
      <span
        className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  )
}
