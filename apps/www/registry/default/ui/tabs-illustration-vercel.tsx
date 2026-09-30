"use client"

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react"

type Feature = {
  id: string
  title: string
  description: string
  badge?: string
}

const FEATURES: Feature[] = [
  {
    id: "text",
    title: "Text",
    description:
      "Access the latest from every major model lab and provider. Power your AI features all through a single endpoint.",
  },
  {
    id: "image",
    title: "Image",
    description:
      "Generate and edit with best-in-class image models, no extra setup.",
  },
  {
    id: "video",
    title: "Video",
    description:
      "Ship production-ready video across a wide range of models with just a prompt.",
    badge: "New",
  },
]

const TRAIL_CONFIGS = [
  { color: "#EBE51A", dur: 6.5 },
  { color: "#A4E600", dur: 4.1 },
  { color: "#2DDD69", dur: 5.7 },
  { color: "#FF904D", dur: 5.7 },
  { color: "#62DE00", dur: 4.9 },
  { color: "#FFBB3D", dur: 4.9 },
  { color: "#F8E52C", dur: 5.7 },
]

const TRAIL_PATHS = [
  {
    d: "M617.415,100 h-61.743M555.673,100 h-74.252M506.605,200 A 123.097 400 0 0 0 481.421 100M506.605,200 h-106.605M400,200 h-106.605",
    cx: "617.415;617.415;555.673;481.421;506.605;400;293.395;293.395;0",
    cy: "100;100;100;100;200;200;200;200;0",
    r: "0;50;50;50;50;50;50;0;0",
    kt: "0;0.088;0.176;0.264;0.352;0.44;0.527;0.615;1",
    op: "0;1;1;1;1;1;1;0;0",
  },
  {
    d: "M603.824,200 h-97.219M519.188,300 A 123.097 400 0 0 0 506.605 200",
    cx: "603.824;603.824;506.605;519.188;519.188;0",
    cy: "200;200;200;300;300;0",
    r: "0;50;50;50;0;0",
    kt: "0;0.098;0.195;0.293;0.39;1",
    op: "0;1;1;1;0;0",
  },
  {
    d: "M718.264,300 h-90.382M627.882,300 A 235.355 400 0 0 0 603.824 200M603.824,200 h-97.219M506.605,200 h-106.605",
    cx: "718.264;718.264;627.882;603.824;506.605;400;400;0",
    cy: "300;300;300;200;200;200;200;0",
    r: "0;50;50;50;50;50;0;0",
    kt: "0;0.094;0.187;0.281;0.374;0.468;0.561;1",
    op: "0;1;1;1;1;1;0;0",
  },
  {
    d: "M627.882,300 h-108.694M519.188,300 h-119.188M400,300 h-119.188M280.812,300 A -123.097 400 0 0 0 276.903 400",
    cx: "627.882;627.882;519.188;400;280.812;276.903;276.903;0",
    cy: "300;300;300;300;300;400;400;0",
    r: "0;50;50;50;50;50;0;0",
    kt: "0;0.094;0.187;0.281;0.374;0.468;0.561;1",
    op: "0;1;1;1;1;1;0;0",
  },
  {
    d: "M318.579,100 h-74.252M244.327,100 h-61.743M182.585,100 A -328.701 400 0 0 0 115.336 200",
    cx: "318.579;318.579;244.327;182.585;115.336;115.336;0",
    cy: "100;100;100;100;200;200;0",
    r: "0;50;50;50;50;0;0",
    kt: "0;0.098;0.196;0.294;0.392;0.49;1",
    op: "0;1;1;1;1;0;0",
  },
  {
    d: "M196.176,200 h-80.84M115.336,200 h-61.747M53.59,200 A -400 400 0 0 0 12.702 300",
    cx: "196.176;196.176;115.336;53.59;12.702;12.702;0",
    cy: "200;200;200;200;300;300;0",
    r: "0;50;50;50;50;0;0",
    kt: "0;0.098;0.196;0.294;0.392;0.49;1",
    op: "0;1;1;1;1;0;0",
  },
  {
    d: "M280.812,300 h-108.694M172.118,300 h-90.382M81.736,300 h-69.035M12.702,300 A -400 400 0 0 0 0 400",
    cx: "280.812;280.812;172.118;81.736;12.702;0;0;0",
    cy: "300;300;300;300;300;400;400;0",
    r: "0;50;50;50;50;50;0;0",
    kt: "0;0.094;0.187;0.281;0.374;0.468;0.561;1",
    op: "0;1;1;1;1;1;0;0",
  },
]

/* ─── Icons ─── */
function XIcon({ size = 16 }) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size}>
      <title>X Icon</title>
      <path d="M2.3 8.776L12.047 23h4.333L6.632 8.776H2.3zM6.629 16.676L2.295 23h4.336l2.165-3.161-2.167-3.163zM17.371 1L9.88 11.931l2.167 3.163L21.707 1h-4.336zM18.156 7.764V23h3.551V2.582l-3.551 5.182z" />
    </svg>
  )
}

function OpenAIIcon({ size = 16 }) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 16 16" width={size}>
      <title>OpenAI Icon</title>
      <path d="M14.945 6.549c.368-1.09.241-2.283-.347-3.274-.885-1.52-2.664-2.302-4.401-1.934A4.436 4.436 0 007.15 0C5.375-.004 3.8 1.124 3.253 2.791a4.435 4.435 0 00-2.701 1.934C-.187 6.24.016 8.152 1.055 9.452a4.476 4.476 0 00.347 3.274c.885 1.52 2.664 2.302 4.401 1.934a4.436 4.436 0 003.047 1.34c1.776.004 3.353-1.125 3.899-2.793a4.435 4.435 0 002.701-1.934c.89-1.516.687-3.426-.504-4.724zM8.85 14.954a3.502 3.502 0 01-1.945-.7l.095-.055 3.229-1.84a.527.527 0 00.266-.457V7.422l1.365.778a.048.048 0 01.026.024v3.72c-.002 1.654-1.36 2.995-3.036 2.999zM2.321 12.203a3.44 3.44 0 01-.362-2.01l.096.057 3.229 1.84a.538.538 0 00.53 0l3.942-2.246v1.555a.046.046 0 01-.019.04l-3.264 1.86a3.06 3.06 0 01-4.152-1.097zM1.472 5.248a3.44 3.44 0 011.581-1.315v3.791a.524.524 0 00.265.456l3.941 2.245-1.364.778a.046.046 0 01-.046.006l-3.265-1.86A3.003 3.003 0 011.472 5.248zm10.211 2.574L7.742 5.577l1.364-.777a.046.046 0 01.046-.005l3.265 1.86a3.004 3.004 0 011.112 4.097 3.44 3.44 0 01-1.581 1.314V8.276a.526.526 0 00-.264-.454zm1.358-2.017a4.19 4.19 0 00-.096-.056L9.717 3.909a.538.538 0 00-.53 0L5.244 6.155V4.6a.046.046 0 01.02-.041l3.264-1.858A3.063 3.063 0 0113.678 3.8c.354.606.482 1.316.362 2.006zM5.503 8.577L4.137 7.8a.048.048 0 01-.026-.024V4.043a3.003 3.003 0 013.04-2.997 3.5 3.5 0 011.945.694l-.096.054-3.229 1.84a.527.527 0 00-.265.457l-.002 4.49zm.741-1.577L8 5.999l1.756 1v2.001L8 10l-1.756-1V7z" />
    </svg>
  )
}

function PlayIcon({ size = 16 }) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size}>
      <title>Play Icon</title>
      <polygon points="6 3 20 12 6 21" />
    </svg>
  )
}

/* ─── Chat bubble tail ─── */
function BubbleTail() {
  const tailMaskId = `tail-mask-${useId().replace(/:/g, "")}`

  return (
    <svg
      fill="none"
      height="24"
      style={{ position: "absolute", bottom: -2, left: -7, display: "block" }}
      viewBox="0 0 24 24"
      width="24"
    >
      <title>Bubble Tail</title>
      {/* No full-rect fill: avoids a second “page color” that can mismatch the real parent behind the tail. */}
      <mask
        height="24"
        id={tailMaskId}
        maskUnits="userSpaceOnUse"
        style={{ maskType: "alpha" }}
        width="24"
        x="0"
        y="0"
      >
        <path d="M0 0h24v24H0V0z" fill="#D9D9D9" />
      </mask>
      <g mask={`url(#${tailMaskId})`}>
        <path
          clipRule="evenodd"
          d="M27-19C15.954-19 7-10.046 7 1c0 .335.008.669.025 1H7v10a15 15 0 01-3 9c4.116 0 7.845-1.658 10.555-4.342A19.915 19.915 0 0027 21c11.046 0 20-8.954 20-20s-8.954-20-20-20z"
          fill="var(--ga-surface)"
          fillRule="evenodd"
        />
        <path
          d="M7.025 2v1h1.05l-.052-1.05-.998.05zM7 2V1H6v1h1zm-3 19l-.8-.6L2 22h2v-1zm10.555-4.342l.623-.783-.695-.553-.631.625.703.71zM8 1c0-10.493 8.507-19 19-19v-2C15.402-20 6-10.598 6 1h2zm.023.95A19.327 19.327 0 018 1H6c0 .352.009.702.026 1.05l1.997-.1zM7 3h.025V1H7v2zm1 9V2H6v10h2zm-3.2 9.6A16 16 0 008 12H6a14 14 0 01-2.8 8.4l1.6 1.2zm9.052-5.653A13.952 13.952 0 014 20v2c4.39 0 8.37-1.77 11.259-4.632l-1.407-1.42zM27 20c-4.47 0-8.577-1.542-11.822-4.125l-1.245 1.565A20.915 20.915 0 0027 22v-2zM46 1c0 10.493-8.507 19-19 19v2c11.598 0 21-9.402 21-21h-2zM27-18c10.493 0 19 8.507 19 19h2c0-11.598-9.402-21-21-21v2z"
          fill="var(--ga-border-svg)"
        />
      </g>
    </svg>
  )
}

/* ─── Globe wireframe with SMIL animations ─── */
function GlobeWireframe() {
  const idPrefix = useId().replace(/:/g, "")
  const ggId = `${idPrefix}-gg`
  const gmgId = `${idPrefix}-gmg`
  const gmId = `${idPrefix}-gm`

  return (
    <svg
      aria-hidden="true"
      height="100%"
      style={{ overflow: "visible", display: "block" }}
      viewBox="-1 -1 802 402"
      width="100%"
    >
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={ggId}
          x1="0"
          x2="0"
          y1="0"
          y2="400"
        >
          <stop offset="0%" stopColor="var(--ga-grid)" />
          <stop offset="100%" stopColor="var(--ga-grid)" />
        </linearGradient>
        <linearGradient gradientTransform="rotate(90)" id={gmgId}>
          <stop offset=".7" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id={gmId}>
          <rect fill={`url(#${gmgId})`} height="100%" width="100%" />
        </mask>
      </defs>
      <g mask={`url(#${gmId})`}>
        <circle cx="400" cy="400" fill="var(--ga-bg)" r="400" />
        {[
          -400, -328.701, -235.355, -123.097, 0, 123.097, 235.355, 328.701, 400,
        ].map((a) => (
          <path
            d={
              a <= 0
                ? `M 400 800 A ${a} 400 0 0 0 400 0`
                : `M 400 0 A ${a} 400 0 0 0 400 800`
            }
            fill="none"
            key={`v-${a}`}
            stroke={`url(#${ggId})`}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {[
          [135.425, 100, 529.15],
          [53.59, 200, 692.82],
          [12.702, 300, 774.597],
          [0, 400, 800],
          [12.702, 500, 774.597],
          [53.59, 600, 692.82],
          [135.425, 700, 529.15],
        ].map(([x, y, w]) => (
          <path
            d={`M${x},${y} h${w}`}
            fill="none"
            key={`h-${y}`}
            stroke={`url(#${ggId})`}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
      {TRAIL_CONFIGS.map((t, i) => {
        const p = TRAIL_PATHS[i]
        if (!p) return null
        const id = `t${i}`,
          dur = `${t.dur}s`
        return (
          <g key={id} mask={`url(#${gmId})`}>
            <path
              d={p.d}
              fill="none"
              stroke={`url(#${id}g)`}
              strokeLinecap="round"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            >
              <animate
                attributeName="opacity"
                dur={dur}
                keyTimes={p.kt}
                repeatCount="indefinite"
                values={p.op}
              />
            </path>
            <defs>
              <radialGradient
                cx="100"
                cy="100"
                gradientUnits="userSpaceOnUse"
                id={`${id}g`}
                r="0"
              >
                <stop offset="0" stopColor={t.color} />
                <stop offset="0.4" stopColor={t.color} />
                <stop offset="1" stopColor={t.color} stopOpacity="0" />
                <animate
                  attributeName="cx"
                  dur={dur}
                  keyTimes={p.kt}
                  repeatCount="indefinite"
                  values={p.cx}
                />
                <animate
                  attributeName="cy"
                  dur={dur}
                  keyTimes={p.kt}
                  repeatCount="indefinite"
                  values={p.cy}
                />
                <animate
                  attributeName="r"
                  dur={dur}
                  keyTimes={p.kt}
                  repeatCount="indefinite"
                  values={p.r}
                />
              </radialGradient>
            </defs>
          </g>
        )
      })}
    </svg>
  )
}

/* ─── Shared chat bubble shell ─── */
function ChatBubbleShell({
  icon,
  children,
}: {
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 12,
        width: "100%",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "var(--ga-surface)",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "var(--ga-shadow)",
        }}
      >
        {icon}
      </div>
      <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
        <div
          style={{
            background: "var(--ga-surface)",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "var(--ga-shadow)",
          }}
        >
          {children}
        </div>
        <BubbleTail />
      </div>
    </div>
  )
}

/* ─── Tab: Text ─── streaming text with cursor ─── */
function TextPanel() {
  const text =
    "Vercel is a cloud platform for deploying and hosting websites, apps, and serverless functions with speed, scalability, and simplicity. It gives teams one workflow from development to global delivery, so products ship faster while keeping reliability and performance high across every request. With robust developer tooling and seamless integrations, Vercel enables engineering teams to collaborate efficiently and manage code from preview to production."
  const [charCount, setCharCount] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setCharCount(0)
    intervalRef.current = setInterval(() => {
      setCharCount((c) => {
        if (c >= text.length) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
          return c
        }
        return c + 2
      })
    }, 16)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <ChatBubbleShell icon={<OpenAIIcon size={16} />}>
      <div
        style={{
          padding: 20,
          aspectRatio: "16/9",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            flex: 1,
            maxHeight: 240,
          }}
        >
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.65,
              color: "var(--ga-fg-body)",
              margin: 0,
              WebkitMaskImage:
                "linear-gradient(175deg, black 40%, transparent 90%)",
              maskImage: "linear-gradient(175deg, black 40%, transparent 90%)",
            }}
          >
            {text.slice(0, charCount)}
            {charCount < text.length && (
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: 15,
                  background: "var(--ga-fg-body)",
                  marginLeft: 1,
                  verticalAlign: "text-bottom",
                  animation: "blink 1s step-end infinite",
                }}
              />
            )}
          </p>
        </div>
      </div>
    </ChatBubbleShell>
  )
}

/* ─── Tab: Image ─── globe wireframe with progress ─── */
function ImagePanel() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    setProgress(0)
    const start = Date.now()
    const dur = 8000
    let raf: number | null = null
    function tick() {
      const e = Date.now() - start
      setProgress(Math.min((e / dur) * 100, 100))
      if (e < dur) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      if (raf !== null) {
        cancelAnimationFrame(raf)
      }
    }
  }, [])

  return (
    <ChatBubbleShell icon={<XIcon size={16} />}>
      <div
        style={{
          aspectRatio: "16/9",
          position: "relative",
          overflow: "hidden",
          background: "var(--ga-surface)",
        }}
      >
        <GlobeWireframe />
      </div>
      <div style={{ padding: "0 12px 10px" }}>
        <div
          style={{
            height: 4,
            background: "var(--ga-track)",
            borderRadius: 9999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "var(--ga-fill)",
              borderRadius: 9999,
              width: `${progress}%`,
              transition: "width 80ms linear",
            }}
          />
        </div>
      </div>
    </ChatBubbleShell>
  )
}

/* ─── Tab: Video ─── waveform visualizer with timeline ─── */
function VideoPanel() {
  const [time, setTime] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    setTime(0)
    const start = Date.now()
    function tick() {
      setTime(((Date.now() - start) / 1000) % 12)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${Math.floor(s % 60)
      .toString()
      .padStart(2, "0")}`

  return (
    <ChatBubbleShell icon={<PlayIcon size={14} />}>
      <div
        style={{
          aspectRatio: "16/9",
          position: "relative",
          overflow: "hidden",
          background: "var(--ga-surface)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: 3, height: 80 }}
        >
          {Array.from({ length: 32 }, (_, index) => index + 1).map((bar) => {
            const phase = (time * 2.5 + (bar - 1) * 0.3) % (Math.PI * 2)
            const h = 10 + Math.abs(Math.sin(phase)) * 58
            const hue = ((bar - 1) * 11 + time * 30) % 360
            return (
              <div
                key={`wave-${bar}`}
                style={{
                  width: 6,
                  borderRadius: 3,
                  height: h,
                  background: `hsl(${hue}, 65%, 58%)`,
                  opacity: 0.85,
                  transition: "height 80ms linear",
                }}
              />
            )
          })}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 12,
            right: 12,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.6)",
              fontVariantNumeric: "tabular-nums",
              fontFamily: "monospace",
            }}
          >
            {fmt(time)}
          </span>
          <div
            style={{
              flex: 1,
              height: 3,
              background: "rgba(255,255,255,0.12)",
              borderRadius: 9999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                background: "rgba(255,255,255,0.5)",
                borderRadius: 9999,
                width: `${(time / 12) * 100}%`,
                transition: "width 60ms linear",
              }}
            />
          </div>
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.4)",
              fontVariantNumeric: "tabular-nums",
              fontFamily: "monospace",
            }}
          >
            0:12
          </span>
        </div>
      </div>
    </ChatBubbleShell>
  )
}

/* ─── Tab button ─── */
function TabButton({
  active,
  title,
  badge,
  progress,
  onClick,
}: {
  active: boolean
  title: string
  badge?: string
  progress: number
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        all: "unset",
        cursor: "pointer",
        display: "block",
        padding: "10px 0",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
      }}
      type="button"
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: active ? "var(--ga-fg)" : "var(--ga-fg-muted)",
            transition: "color 200ms cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          {title}
        </span>
        {badge && (
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "var(--ga-badge)",
              opacity: active ? 1 : 0.6,
              transition: "opacity 200ms ease",
            }}
          >
            {badge}
          </span>
        )}
      </div>
      <div
        style={{
          height: 2,
          marginTop: 4,
          borderRadius: 9999,
          background: active ? "var(--ga-track-active)" : "transparent",
          overflow: "hidden",
          transition: "background 200ms ease",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 9999,
            background: "var(--ga-fg)",
            width: active ? `${progress * 100}%` : "0%",
            transition: active ? "none" : "width 0ms",
          }}
        />
      </div>
    </button>
  )
}

const CYCLE_MS = 6000

/* ─── Main export ─── */
export default function GenerateAnything({
  title = "Generate anything",
  features = FEATURES,
}: {
  title?: string
  features?: Feature[]
}) {
  const [activeTab, setActiveTab] = useState("text")
  const [panelKey, setPanelKey] = useState(0)
  const [progress, setProgress] = useState(1)
  const startRef = useRef(Date.now())
  const rafRef = useRef<number | null>(null)

  const advanceTab = useCallback(() => {
    setActiveTab((prev) => {
      const idx = features.findIndex((f) => f.id === prev)
      return features[(idx + 1) % features.length].id
    })
    setPanelKey((k) => k + 1)
    startRef.current = Date.now()
  }, [features])

  useEffect(() => {
    function tick() {
      const elapsed = Date.now() - startRef.current
      const remaining = Math.max(1 - elapsed / CYCLE_MS, 0)
      setProgress(remaining)
      if (remaining <= 0) {
        advanceTab()
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [advanceTab])

  const handleTabChange = useCallback(
    (id: string) => {
      if (id === activeTab) return
      setActiveTab(id)
      setPanelKey((k) => k + 1)
      startRef.current = Date.now()
      setProgress(1)
    },
    [activeTab]
  )

  return (
    <>
      <style>{`
        [data-generate-anything] {
          --ga-bg: #fafafa;
          --ga-surface: #fff;
          --ga-fg: #000;
          --ga-fg-muted: #888;
          --ga-fg-body: #666;
          --ga-border: rgba(0,0,0,0.08);
          --ga-border-subtle: rgba(0,0,0,0.04);
          --ga-border-svg: rgba(0,0,0,0.06);
          --ga-track: #eee;
          --ga-fill: #1a1a1a;
          --ga-grid: #ccc;
          --ga-track-active: rgba(0,0,0,0.1);
          --ga-badge: #0070f3;
          --ga-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04);
        }
        :is(.dark) [data-generate-anything] {
          --ga-bg: #0a0a0a;
          --ga-surface: #1a1a1a;
          --ga-fg: #ededed;
          --ga-fg-muted: #a0a0a0;
          --ga-fg-body: #a1a1a1;
          --ga-border: rgba(255,255,255,0.08);
          --ga-border-subtle: rgba(255,255,255,0.04);
          --ga-border-svg: rgba(255,255,255,0.08);
          --ga-track: #333;
          --ga-fill: #ededed;
          --ga-grid: #333;
          --ga-track-active: rgba(255,255,255,0.1);
          --ga-badge: #3291ff;
          --ga-shadow: 0 1px 3px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06);
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes panelIn {
          from { opacity:0; transform:scale(0.97) translateY(6px); }
          to { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes descIn {
          from { opacity:0; transform:translateY(4px); }
          to { opacity:1; transform:translateY(0); }
        }
      `}</style>
      <div
        data-generate-anything
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          minHeight: 380,
          background: "var(--ga-bg)",
          overflow: "hidden",
          fontFamily:
            '"Geist","Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
        }}
      >
        {/* Left: tabs + description */}
        <div
          style={{
            flex: 1,
            padding: "48px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "var(--ga-fg)",
              margin: "0 0 36px",
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
            }}
          >
            {title}
          </h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {features.map((f) => {
              const isActive = f.id === activeTab
              return (
                <div key={f.id}>
                  <TabButton
                    active={isActive}
                    badge={f.badge}
                    onClick={() => handleTabChange(f.id)}
                    progress={isActive ? progress : 0}
                    title={f.title}
                  />
                  <div
                    style={{
                      overflow: "hidden",
                      maxHeight: isActive ? 120 : 0,
                      opacity: isActive ? 1 : 0,
                      transition:
                        "max-height 350ms cubic-bezier(0.23,1,0.32,1), opacity 250ms cubic-bezier(0.23,1,0.32,1)",
                    }}
                  >
                    <p
                      key={`d-${f.id}-${isActive}`}
                      style={{
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: "var(--ga-fg-muted)",
                        margin: "0 0 16px",
                        maxWidth: 400,
                        animation: isActive
                          ? "descIn 400ms cubic-bezier(0.23,1,0.32,1) both"
                          : "none",
                      }}
                    >
                      {f.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 1,
            background: "var(--ga-border)",
            alignSelf: "stretch",
          }}
        />

        {/* Right: animated panel */}
        <div
          style={{
            flex: 1,
            padding: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end",
          }}
        >
          <div
            key={panelKey}
            style={{
              width: "100%",
              animation: "panelIn 400ms cubic-bezier(0.23,1,0.32,1) both",
            }}
          >
            {activeTab === "text" && <TextPanel />}
            {activeTab === "image" && <ImagePanel />}
            {activeTab === "video" && <VideoPanel />}
          </div>
        </div>
      </div>
    </>
  )
}
