"use client"

import { useEffect, useMemo, useRef, useState } from "react"

export type CursorSide = "left" | "right"

function createSeededRandom(seed: string) {
  let hash = 2_166_136_261
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i)
    hash = Math.imul(hash, 16_777_619)
  }
  let state = hash >>> 0
  return () => {
    state = (Math.imul(state, 1_664_525) + 1_013_904_223) >>> 0
    return state / 4_294_967_296
  }
}

export function CursorSvg({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      data-slot="collab-cursor-svg"
      fill="none"
      focusable="false"
      height="18"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      viewBox="0 0 17 18"
      width="17"
    >
      <path
        d="M15.5036 3.11002L12.5357 15.4055C12.2666 16.5204 10.7637 16.7146 10.22 15.7049L7.4763 10.6094L2.00376 8.65488C0.915938 8.26638 0.891983 6.73663 1.96711 6.31426L13.8314 1.65328C14.7729 1.28341 15.741 2.12672 15.5036 3.11002ZM7.56678 10.6417L7.56645 10.6416C7.56656 10.6416 7.56667 10.6416 7.56678 10.6417L7.65087 10.4062L7.56678 10.6417Z"
        fill="currentColor"
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function useFloatingCursor(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null)
  const raf = useRef<number | null>(null)
  const time = useRef(0)
  const params = useRef<{
    phaseX: number
    phaseY: number
    speedX: number
    speedY: number
    ampX: number
    ampY: number
  } | null>(null)

  useEffect(() => {
    if (!enabled) return

    if (!params.current) {
      params.current = {
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        speedX: 0.55 + Math.random() * 0.35,
        speedY: 0.7 + Math.random() * 0.35,
        ampX: 3 + Math.random() * 5,
        ampY: 2 + Math.random() * 4,
      }
    }

    const p = params.current
    if (!p) return

    const tick = () => {
      time.current += 0.016
      const t = time.current
      const x =
        Math.sin(t * p.speedX + p.phaseX) * p.ampX +
        Math.sin(t * p.speedX * 1.7 + p.phaseX * 0.5) * (p.ampX * 0.3)
      const y =
        Math.sin(t * p.speedY + p.phaseY) * p.ampY +
        Math.cos(t * p.speedY * 1.3 + p.phaseY * 0.7) * (p.ampY * 0.25)

      if (ref.current) {
        ref.current.style.transform = `translate(${x}px, ${y}px)`
      }
      raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [enabled])

  return ref
}

export function Cursor({
  name,
  color,
  side,
  style: posStyle,
  delay = false,
}: {
  name: string
  color: string
  side: CursorSide
  style?: React.CSSProperties
  delay?: boolean
}) {
  const [visible, setVisible] = useState(!delay)
  const floatRef = useFloatingCursor(visible)

  useEffect(() => {
    if (!delay) return
    const timer = setTimeout(() => setVisible(true), 800)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      data-slot="collab-cursor"
      style={{ position: "absolute", pointerEvents: "none", ...posStyle }}
    >
      <div
        ref={floatRef}
        style={{
          color,
          display: "flex",
          alignItems: "flex-start",
          gap: 0,
          opacity: visible ? 1 : 0,
          filter: visible ? "blur(0px)" : "blur(6px)",
          transition:
            "opacity .5s cubic-bezier(.23,1,.32,1), filter .5s cubic-bezier(.23,1,.32,1)",
          willChange: "transform",
        }}
      >
        <CursorSvg flip={side === "right"} />
        <span
          data-slot="collab-cursor-label"
          style={{
            background: color,
            color: "#fff",
            fontSize: 12,
            fontWeight: 500,
            padding: "2px 7px",
            borderRadius: 4,
            whiteSpace: "nowrap",
            marginTop: 10,
            marginLeft: side === "left" ? -2 : 0,
            marginRight: side === "right" ? -2 : 0,
          }}
        >
          {name}
        </span>
      </div>
    </div>
  )
}

export function CursorDemo() {
  const cursors = useMemo(() => {
    const names = ["John", "Jane", "Jim", "Jill", "Jack", "Mina"] as const
    const colors = [
      "#7c3aed",
      "#2563eb",
      "#db2777",
      "#ea580c",
      "#059669",
      "#0f766e",
    ] as const
    const random = createSeededRandom("cursor-demo")
    const colorPool = [...colors]
    for (let i = colorPool.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1))
      ;[colorPool[i], colorPool[j]] = [colorPool[j], colorPool[i]]
    }
    const placed: Array<{ x: number; y: number }> = []
    return names.map((name, index) => {
      const minDistance = 44
      let x = 0
      let y = 0

      for (let attempt = 0; attempt < 30; attempt += 1) {
        const angle = random() * Math.PI * 2
        const spreadX = 54 + random() * 42
        const spreadY = 26 + random() * 28
        const candidateX = Math.round(Math.cos(angle) * spreadX)
        const candidateY = Math.round(Math.sin(angle) * spreadY)
        const isFarEnough = placed.every((point) => {
          const dx = point.x - candidateX
          const dy = point.y - candidateY
          return Math.hypot(dx, dy) >= minDistance
        })

        x = candidateX
        y = candidateY
        if (isFarEnough) break
      }

      placed.push({ x, y })
      const side: CursorSide = random() > 0.5 ? "left" : "right"
      const color =
        colorPool.pop() ?? colors[Math.floor(random() * colors.length)]
      return {
        name,
        color,
        side,
        delay: index > 1,
        style: {
          left: `calc(50% + ${x}px)`,
          bottom: `calc(48% + ${y}px)`,
        } satisfies React.CSSProperties,
      }
    })
  }, [])

  return (
    <div className="flex flex-col gap-3 antialiased">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-foreground text-sm">
          Live collaborators
        </h4>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
          6 online
        </span>
      </div>
      <div className="relative h-44 overflow-hidden rounded-[calc(var(--radius)+8px)] bg-[radial-gradient(circle_at_50%_45%,rgba(148,163,184,0.16),transparent_58%),linear-gradient(180deg,rgba(255,255,255,0.75),rgba(255,255,255,0.45))] p-4 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_8px_20px_rgba(15,23,42,0.08)] dark:bg-[radial-gradient(circle_at_50%_45%,rgba(148,163,184,0.2),transparent_58%),linear-gradient(180deg,rgba(15,23,42,0.52),rgba(2,6,23,0.7))] dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.08),0px_1px_2px_-1px_rgba(255,255,255,0.04),0px_8px_20px_rgba(0,0,0,0.35)]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.14)_1px,transparent_1px)] bg-size-[26px_26px] opacity-70" />
        <div className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.14)_0%,rgba(59,130,246,0)_70%)]" />
        {cursors.map((cursor, index) => (
          <Cursor
            color={cursor.color}
            delay={cursor.delay}
            key={`${cursor.name}-${index}`}
            name={cursor.name}
            side={cursor.side}
            style={cursor.style}
          />
        ))}
      </div>
    </div>
  )
}
