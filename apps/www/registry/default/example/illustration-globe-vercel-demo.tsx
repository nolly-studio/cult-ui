"use client"

import { useState } from "react"

import {
  DeployGlobe,
  type DeployNode,
  type DeployStatus,
  type TrajectoryStep,
} from "@/registry/default/ui/illustration-globe-vercel"

function DemoGlobeVercelControls({
  status,
  accent,
  preset,
  onStatusChange,
  onPresetChange,
  onAccentChange,
}: {
  status: DeployStatus
  accent: string
  preset: NodePresetName
  onStatusChange: (status: DeployStatus) => void
  onPresetChange: (preset: NodePresetName) => void
  onAccentChange: (color: string) => void
}) {
  const pill = (active: boolean) =>
    ({
      padding: "5px 13px",
      borderRadius: 999,
      border: "none",
      background: active
        ? "var(--pill-active-bg, #171717)"
        : "var(--pill-bg, #f4f4f5)",
      color: active ? "var(--pill-active-fg, #fff)" : "var(--pill-fg, #52525b)",
      fontSize: 12,
      fontWeight: 500,
      cursor: "pointer",
      fontFamily: "ui-monospace, SFMono-Regular, monospace",
      transition:
        "background 160ms ease-out, color 160ms ease-out, transform 160ms ease-out",
      letterSpacing: "0.02em",
    }) as React.CSSProperties

  return (
    <div
      data-slot="deploy-globe-controls"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        alignItems: "center",
        marginBottom: 28,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 6,
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "var(--color-muted-foreground, #a1a1aa)",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginRight: 4,
          }}
        >
          Status
        </span>
        {(["deploying", "deployed", "error"] as DeployStatus[]).map(
          (nextStatus) => (
            <button
              key={nextStatus}
              onClick={() => onStatusChange(nextStatus)}
              onMouseDown={(event) => {
                event.currentTarget.style.transform = "scale(0.95)"
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = "scale(1)"
              }}
              onMouseUp={(event) => {
                event.currentTarget.style.transform = "scale(1)"
              }}
              style={pill(status === nextStatus)}
              type="button"
            >
              {nextStatus}
            </button>
          )
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: 6,
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "var(--color-muted-foreground, #a1a1aa)",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginRight: 4,
          }}
        >
          Icons
        </span>
        {(Object.keys(NODE_PRESETS) as NodePresetName[]).map((nextPreset) => (
          <button
            key={nextPreset}
            onClick={() => onPresetChange(nextPreset)}
            onMouseDown={(event) => {
              event.currentTarget.style.transform = "scale(0.95)"
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = "scale(1)"
            }}
            onMouseUp={(event) => {
              event.currentTarget.style.transform = "scale(1)"
            }}
            style={pill(preset === nextPreset)}
            type="button"
          >
            {nextPreset}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: 6,
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "var(--color-muted-foreground, #a1a1aa)",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginRight: 4,
          }}
        >
          Color
        </span>
        {COLOR_PRESETS.map((colorPreset) => (
          <button
            key={colorPreset.label}
            onClick={() => onAccentChange(colorPreset.color)}
            onMouseDown={(event) => {
              event.currentTarget.style.transform = "scale(0.88)"
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = "scale(1)"
            }}
            onMouseUp={(event) => {
              event.currentTarget.style.transform = "scale(1)"
            }}
            style={{
              width: 24,
              height: 24,
              borderRadius: 999,
              border: "none",
              background: colorPreset.color,
              cursor: "pointer",
              boxShadow:
                accent === colorPreset.color
                  ? `0 0 0 2px var(--globe-bg, var(--color-background, #fafafa)), 0 0 0 4px ${colorPreset.color}`
                  : "0 0 0 1px var(--color-border, rgba(0,0,0,0.08))",
              transition: "box-shadow 160ms ease-out, transform 160ms ease-out",
            }}
            title={colorPreset.label}
            type="button"
          />
        ))}
      </div>
    </div>
  )
}

const TRAJ = {
  a: [
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
  ] as TrajectoryStep[],
  b: [
    [-3, 0],
    [-3, 1],
    [-3, 2],
    [-3, 3],
    [-3, 4],
  ] as TrajectoryStep[],
  c: [
    [1, 0],
    [1, 1],
    [1, 2],
  ] as TrajectoryStep[],
  d: [
    [-1, 0],
    [-1, 1],
    [-2, 1],
  ] as TrajectoryStep[],
  e: [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [-1, 3],
  ] as TrajectoryStep[],
  f: [
    [2, 0],
    [2, 1],
  ] as TrajectoryStep[],
}

const DEMO_DOTS: DeployNode[] = [
  { id: "a", trajectory: TRAJ.a },
  { id: "b", trajectory: TRAJ.b },
  { id: "c", trajectory: TRAJ.c },
  { id: "d", trajectory: TRAJ.d },
  { id: "e", trajectory: TRAJ.e },
  { id: "f", trajectory: TRAJ.f },
]

const DEMO_TRIANGLES: DeployNode[] = [
  { id: "a", trajectory: TRAJ.a, icon: "triangle" },
  { id: "b", trajectory: TRAJ.b, icon: "triangle" },
  { id: "c", trajectory: TRAJ.c, icon: "triangle" },
  { id: "d", trajectory: TRAJ.d, icon: "triangle" },
  { id: "e", trajectory: TRAJ.e, icon: "triangle" },
  { id: "f", trajectory: TRAJ.f, icon: "triangle" },
]

const DEMO_INFRA: DeployNode[] = [
  { id: "a", trajectory: TRAJ.a, icon: "server" },
  { id: "b", trajectory: TRAJ.b, icon: "database" },
  { id: "c", trajectory: TRAJ.c, icon: "cloud" },
  { id: "d", trajectory: TRAJ.d, icon: "shield" },
  { id: "e", trajectory: TRAJ.e, icon: "globe" },
  { id: "f", trajectory: TRAJ.f, icon: "zap" },
]

const DEMO_CUSTOM: DeployNode[] = [
  {
    id: "a",
    trajectory: TRAJ.a,
    icon: { d: "M12 2L2 22h20L12 2z", viewBox: "0 0 24 24" },
  },
  {
    id: "b",
    trajectory: TRAJ.b,
    icon: { d: "M4 4h16v16H4z", viewBox: "0 0 24 24" },
  },
  {
    id: "c",
    trajectory: TRAJ.c,
    icon: { d: "M12 3a9 9 0 100 18 9 9 0 000-18z", viewBox: "0 0 24 24" },
  },
  {
    id: "d",
    trajectory: TRAJ.d,
    icon: {
      d: "M12 2l8 4v6c0 5-3.8 9.7-8 10-4.2-.3-8-5-8-10V6l8-4z",
      viewBox: "0 0 24 24",
    },
  },
  {
    id: "e",
    trajectory: TRAJ.e,
    icon: { d: "M12 2v8h8v4h-8v8h-4v-8H0v-4h8V2z", viewBox: "0 0 24 24" },
  },
  {
    id: "f",
    trajectory: TRAJ.f,
    icon: { d: "M12 1l10 6v10l-10 6L2 17V7l10-6z", viewBox: "0 0 24 24" },
  },
]

const NODE_PRESETS = {
  Dots: DEMO_DOTS,
  Vercel: DEMO_TRIANGLES,
  Infra: DEMO_INFRA,
  Custom: DEMO_CUSTOM,
} as const

type NodePresetName = keyof typeof NODE_PRESETS

const COLOR_PRESETS = [
  { label: "Blue", color: "#3B82F6" },
  { label: "Teal", color: "#45DEC4" },
  { label: "Purple", color: "#A855F7" },
  { label: "Rose", color: "#F43F5E" },
  { label: "Amber", color: "#F59E0B" },
]

function DemoGlobeVercel() {
  const [status, setStatus] = useState<DeployStatus>("deployed")
  const [accent, setAccent] = useState("#3B82F6")
  const [preset, setPreset] = useState<NodePresetName>("Vercel")
  const activeNodes = NODE_PRESETS[preset]

  return (
    <div
      className="relative min-w-xl"
      data-slot="deploy-globe-demo"
      style={{
        minHeight: "100vh",
        // background: "#fafafa",
        background: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 20px",
        fontFamily: "'Inter', -apple-system, sans-serif",
        WebkitFontSmoothing: "antialiased",
        ["--pill-active-bg" as string]: "var(--color-foreground, #171717)",
        ["--pill-active-fg" as string]: "var(--color-background, #fff)",
        ["--pill-bg" as string]: "var(--color-muted, #f4f4f5)",
        ["--pill-fg" as string]: "var(--color-muted-foreground, #52525b)",
      }}
    >
      <DemoGlobeVercelControls
        accent={accent}
        onAccentChange={setAccent}
        onPresetChange={setPreset}
        onStatusChange={setStatus}
        preset={preset}
        status={status}
      />

      <div
        data-slot="deploy-globe-demo-stage"
        style={{ width: "100%", maxWidth: 680 }}
      >
        <DeployGlobe
          accentColor={status === "error" ? undefined : accent}
          duration={4.5}
          nodes={activeNodes}
          status={status}
        />
      </div>

      <div className="mask-b-from-100% mask-t-from-60% pointer-events-none absolute right-0 bottom-0 left-0 h-96 bg-background" />
    </div>
  )
}

export default DemoGlobeVercel
