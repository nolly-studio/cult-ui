"use client"

import { useState } from "react"

import { PixelParagraph } from "@/registry/default/ui/pixel-paragraph-words"

/* ─── Constants ─── */

const PIXEL_FONTS = ["square", "grid", "circle", "triangle", "line"] as const
type PixelFont = (typeof PIXEL_FONTS)[number]

const WRAPPER_TAGS = ["p", "span", "div"] as const

const DEFAULT_TEXT =
  "54+ animated components and effects. Free, open source, and built to drop into any shadcn/ui project."
const DEFAULT_PIXEL_WORDS = "animated,shadcn/ui"

/* ─── Demo ─── */

export default function PixelParagraphWordsDemo() {
  const [text, setText] = useState(DEFAULT_TEXT)
  const [pixelWordsInput, setPixelWordsInput] = useState(DEFAULT_PIXEL_WORDS)
  const [font, setFont] = useState<PixelFont>("square")
  const [wrapperTag, setWrapperTag] =
    useState<(typeof WRAPPER_TAGS)[number]>("p")

  const pixelWords = pixelWordsInput
    .split(",")
    .map((w) => w.trim())
    .filter(Boolean)

  return (
    <div className="w-full space-y-8 py-4">
      {/* ── Preview ── */}
      <div className="flex min-h-[120px] items-center justify-center rounded-lg border border-border/40 bg-background p-8">
        <PixelParagraph
          text={text}
          pixelWords={pixelWords}
          as={wrapperTag}
          font={font}
          className="max-w-xl text-lg leading-relaxed text-muted-foreground"
          pixelWordClassName="text-foreground font-medium"
        />
      </div>

      {/* ── Controls ── */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Text */}
        <ControlGroup
          label="Paragraph Text"
          className="sm:col-span-2 lg:col-span-3"
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="Enter paragraph text"
          />
        </ControlGroup>

        {/* Pixel Words */}
        <ControlGroup
          label="Pixel Words (comma-separated)"
          className="sm:col-span-2 lg:col-span-3"
        >
          <input
            type="text"
            value={pixelWordsInput}
            onChange={(e) => setPixelWordsInput(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="e.g. animated,shadcn/ui,open source"
          />
          <p className="text-xs text-muted-foreground">
            These words render in a pixel font while the rest stays in the
            normal typeface
          </p>
        </ControlGroup>

        {/* Pixel Font */}
        <ControlGroup label="Pixel Font">
          <div className="flex flex-wrap gap-1.5">
            {PIXEL_FONTS.map((f) => (
              <button
                type="button"
                key={f}
                onClick={() => setFont(f)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  font === f
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </ControlGroup>

        {/* Wrapper Tag */}
        <ControlGroup label="Wrapper Element">
          <select
            value={wrapperTag}
            onChange={(e) =>
              setWrapperTag(e.target.value as (typeof WRAPPER_TAGS)[number])
            }
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {WRAPPER_TAGS.map((t) => (
              <option key={t} value={t}>
                {"<" + t + ">"}
              </option>
            ))}
          </select>
        </ControlGroup>
      </div>
    </div>
  )
}

/* ─── Shared control primitives ─── */

function ControlGroup({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  )
}
