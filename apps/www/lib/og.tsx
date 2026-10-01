import { promises as fs } from "fs"
import path from "path"
import { ImageResponse } from "next/og"

export const OG_SIZE = { width: 1200, height: 630 }

const INK = "#171717"
const MUTED = "#666666"
const HAIRLINE = "#EBEBEB"
const CANVAS = "#FAFAFA"

const LOGO_PATH =
  "M130 216.896c-23.894 0-43.333-19.439-43.333-43.333S106.106 130.23 130 130.23s43.333 19.439 43.333 43.333-19.439 43.333-43.333 43.333zm0 173.794c23.894 0 43.333 19.439 43.333 43.333S153.894 477.356 130 477.356s-43.333-19.439-43.333-43.333S106.106 390.69 130 390.69zm86.667-304.023c-23.895 0-43.334-19.44-43.334-43.334C173.333 19.44 192.772 0 216.667 0 240.561 0 260 19.439 260 43.333c0 23.895-19.439 43.334-43.333 43.334zm0 173.792c23.894 0 43.333 19.439 43.333 43.334 0 23.894-19.439 43.333-43.333 43.333-23.895 0-43.334-19.439-43.334-43.333 0-23.895 19.439-43.334 43.334-43.334zM43.333 86.667C19.44 86.667 0 67.227 0 43.333 0 19.44 19.439 0 43.333 0c23.895 0 43.334 19.439 43.334 43.333 0 23.895-19.44 43.334-43.334 43.334zm0 173.792c23.895 0 43.334 19.439 43.334 43.334 0 23.894-19.44 43.333-43.334 43.333C19.44 347.126 0 327.687 0 303.793c0-23.895 19.439-43.334 43.333-43.334z"

async function loadFonts() {
  const dir = path.join(process.cwd(), "assets/og")
  const [regular, medium, mono, pixel] = await Promise.all(
    [
      "Geist-Regular.ttf",
      "Geist-Medium.ttf",
      "GeistMono-Regular.ttf",
      "GeistPixel-Square.ttf",
    ].map((file) => fs.readFile(path.join(dir, file)))
  )
  return [
    { name: "Geist", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Geist", data: medium, weight: 500 as const, style: "normal" as const },
    { name: "Geist Mono", data: mono, weight: 400 as const, style: "normal" as const },
    { name: "Geist Pixel", data: pixel, weight: 400 as const, style: "normal" as const },
  ]
}

function truncate(text: string, max: number) {
  if (text.length <= max) return text
  return `${text.slice(0, max).replace(/\s+\S*$/, "")}…`
}

export type OgImageOptions = {
  title: string
  /** Rendered in Geist Pixel after the title; the image's one pixel moment. */
  titlePixel?: string
  /** Pixel kicker above the title. Skip it when `titlePixel` is set. */
  kicker?: string | null
  description?: string
  /** Mono text in the footer ledger, e.g. an install command. */
  footer?: string
}

/**
 * Shared Open Graph template: near-monochrome canvas, wordmark, a large Geist
 * title, muted description, and a hairline footer ledger (see DESIGN.md).
 */
export async function renderOgImage({
  title,
  titlePixel,
  kicker,
  description,
  footer = "cult-ui.com/docs",
}: OgImageOptions) {
  const titleSize = title.length > 28 ? 72 : title.length > 18 ? 84 : 96

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: CANVAS,
          padding: "64px 72px 0",
          fontFamily: "Geist",
          color: INK,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: Satori paints <title> as visible text over the mark */}
          <svg width={22} height={40} viewBox="0 0 260 478">
            <path d={LOGO_PATH} fill={INK} />
          </svg>
          <span style={{ fontSize: 32, fontWeight: 500, letterSpacing: "-0.03em" }}>
            cult ui
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {kicker && !titlePixel ? (
            <span
              style={{
                fontFamily: "Geist Pixel",
                fontSize: 20,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: MUTED,
                marginBottom: 24,
              }}
            >
              {kicker}
            </span>
          ) : null}
          <div
            style={{
              display: "flex",
              flexDirection: titlePixel ? "column" : "row",
              fontSize: titleSize,
              lineHeight: 1.02,
              letterSpacing: "-0.055em",
              maxWidth: 1000,
            }}
          >
            <span>{truncate(title, 60)}</span>
            {titlePixel ? (
              <span style={{ fontFamily: "Geist Pixel", letterSpacing: "-0.02em" }}>
                {titlePixel}
              </span>
            ) : null}
          </div>
          {description ? (
            <span
              style={{
                marginTop: 24,
                marginLeft: 4,
                fontSize: 30,
                lineHeight: 1.35,
                color: MUTED,
                maxWidth: 940,
              }}
            >
              {truncate(description, 120)}
            </span>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${HAIRLINE}`,
            marginTop: 40,
            height: 84,
            fontFamily: "Geist Mono",
            fontSize: 20,
            color: MUTED,
          }}
        >
          <span>{footer}</span>
          <span>cult-ui.com</span>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await loadFonts() }
  )
}
