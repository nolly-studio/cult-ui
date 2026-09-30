"use client"

import * as React from "react"
import {
  flutedGlassPresets,
  type FlutedGlassProps,
} from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/base-select"
import {
  defaultFlutedGlassProps,
  FlutedGlass,
} from "@/registry/default/ui/fluted-glass"

const DEMO_IMAGES = [
  {
    id: "flowers",
    label: "Flowers",
    url: "https://paper.design/flowers.webp",
  },
  {
    id: "mountains",
    label: "Mountains",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&q=80&fm=webp",
  },
  {
    id: "abstract",
    label: "Abstract",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1280&q=80&fm=webp",
  },
  {
    id: "forest",
    label: "Forest",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1280&q=80&fm=webp",
  },
  {
    id: "ocean",
    label: "Ocean",
    url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1280&q=80&fm=webp",
  },
] as const

const GRID_SHAPES = [
  "lines",
  "linesIrregular",
  "wave",
  "zigzag",
  "pattern",
] as const

const DISTORTION_SHAPES = [
  "prism",
  "lens",
  "contour",
  "cascade",
  "flat",
] as const

const FIT_OPTIONS = ["cover", "contain", "none"] as const

type DemoSettings = Pick<
  FlutedGlassProps,
  | "distortion"
  | "size"
  | "shadows"
  | "highlights"
  | "angle"
  | "edges"
  | "blur"
  | "stretch"
  | "shift"
  | "grainMixer"
  | "grainOverlay"
  | "margin"
  | "shape"
  | "distortionShape"
  | "fit"
  | "colorBack"
  | "colorShadow"
  | "colorHighlight"
>

const INITIAL_SETTINGS: DemoSettings = {
  distortion: defaultFlutedGlassProps.distortion,
  size: defaultFlutedGlassProps.size,
  shadows: defaultFlutedGlassProps.shadows,
  highlights: defaultFlutedGlassProps.highlights,
  angle: defaultFlutedGlassProps.angle,
  edges: defaultFlutedGlassProps.edges,
  blur: defaultFlutedGlassProps.blur,
  stretch: defaultFlutedGlassProps.stretch,
  shift: defaultFlutedGlassProps.shift,
  grainMixer: defaultFlutedGlassProps.grainMixer,
  grainOverlay: defaultFlutedGlassProps.grainOverlay,
  margin: defaultFlutedGlassProps.margin,
  shape: defaultFlutedGlassProps.shape,
  distortionShape: defaultFlutedGlassProps.distortionShape,
  fit: defaultFlutedGlassProps.fit,
  colorBack: defaultFlutedGlassProps.colorBack,
  colorShadow: defaultFlutedGlassProps.colorShadow,
  colorHighlight: defaultFlutedGlassProps.colorHighlight,
}

function SettingSlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format = (v: number) => v.toFixed(2),
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  format?: (v: number) => string
}) {
  return (
    <div className="space-y-2" data-slot="fluted-glass-demo-slider">
      <div className="flex items-center justify-between gap-2">
        <Label className="text-muted-foreground">{label}</Label>
        <span className="tabular-nums text-muted-foreground text-xs">
          {format(value)}
        </span>
      </div>
      <Slider
        max={max}
        min={min}
        onValueChange={(v) =>
          onChange(typeof v === "number" ? v : (v[0] ?? min))
        }
        step={step}
        value={value}
      />
    </div>
  )
}

function FlutedGlassDemo() {
  const [image, setImage] = React.useState<string>(DEMO_IMAGES[0].url)
  const [customUrl, setCustomUrl] = React.useState("")
  const [settings, setSettings] = React.useState<DemoSettings>(INITIAL_SETTINGS)

  const patch = React.useCallback(
    <K extends keyof DemoSettings>(key: K, value: DemoSettings[K]) => {
      setSettings((s) => ({ ...s, [key]: value }))
    },
    []
  )

  const applyPreset = React.useCallback((presetIndex: number) => {
    const preset = flutedGlassPresets[presetIndex]
    if (!preset) {
      return
    }
    setSettings((prev) => ({
      ...prev,
      ...(preset.params as Partial<DemoSettings>),
    }))
  }, [])

  const reset = React.useCallback(() => {
    setImage(DEMO_IMAGES[0].url)
    setCustomUrl("")
    setSettings(INITIAL_SETTINGS)
  }, [])

  const applyCustomUrl = React.useCallback(() => {
    const trimmed = customUrl.trim()
    if (!trimmed) {
      return
    }
    setImage(trimmed)
  }, [customUrl])

  return (
    <div
      className="flex min-h-full flex-col gap-8 bg-background p-4 md:flex-row md:p-8"
      data-slot="fluted-glass-demo"
    >
      <div className="flex w-full flex-col gap-4 md:max-w-[min(100%,800px)] md:flex-1">
        <div
          className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted/30 shadow-sm"
          data-slot="fluted-glass-demo-stage"
        >
          <FlutedGlass
            key={image}
            className="absolute inset-0 size-full"
            height={720}
            image={image}
            width={1280}
            {...settings}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs">Image</Label>
          <div className="flex flex-wrap gap-2">
            {DEMO_IMAGES.map((item) => {
              const active = image === item.url
              return (
                <button
                  className={cn(
                    "relative aspect-video h-14 w-24 overflow-hidden rounded-lg border-2 transition-opacity",
                    active
                      ? "border-primary ring-2 ring-ring/40"
                      : "border-transparent opacity-80 hover:opacity-100"
                  )}
                  key={item.id}
                  onClick={() => setImage(item.url)}
                  title={item.label}
                  type="button"
                >
                  <img
                    alt=""
                    className="size-full object-cover"
                    decoding="async"
                    src={item.url}
                  />
                  <span className="sr-only">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <div className="flex-1 space-y-1">
            <Label
              className="text-muted-foreground text-xs"
              htmlFor="fluted-custom-url"
            >
              Custom image URL
            </Label>
            <Input
              className="font-mono text-xs"
              id="fluted-custom-url"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  applyCustomUrl()
                }
              }}
              placeholder="https://…"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
            />
          </div>
          <Button
            className="shrink-0"
            onClick={applyCustomUrl}
            type="button"
            variant="secondary"
          >
            Load URL
          </Button>
        </div>
      </div>

      <div
        className="flex w-full flex-col gap-5 md:max-h-[min(90vh,920px)] md:w-[380px] md:shrink-0 md:overflow-y-auto"
        data-slot="fluted-glass-demo-controls"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={reset} size="sm" type="button" variant="outline">
            Reset defaults
          </Button>
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs">
            Library presets
          </Label>
          <div className="flex flex-wrap gap-2">
            {flutedGlassPresets.map((preset, i) => (
              <Button
                key={preset.name}
                onClick={() => applyPreset(i)}
                size="sm"
                type="button"
                variant="secondary"
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label className="text-muted-foreground text-xs">Grid shape</Label>
            <Select
              onValueChange={(v) => patch("shape", v as DemoSettings["shape"])}
              value={settings.shape}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GRID_SHAPES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-muted-foreground text-xs">
              Distortion shape
            </Label>
            <Select
              onValueChange={(v) =>
                patch("distortionShape", v as DemoSettings["distortionShape"])
              }
              value={settings.distortionShape}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DISTORTION_SHAPES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Label className="text-muted-foreground text-xs">Fit</Label>
            <Select
              onValueChange={(v) => patch("fit", v as DemoSettings["fit"])}
              value={settings.fit}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FIT_OPTIONS.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="space-y-1">
            <Label
              className="text-muted-foreground text-xs"
              htmlFor="fluted-color-back"
            >
              Background
            </Label>
            <Input
              className="font-mono text-xs"
              id="fluted-color-back"
              onChange={(e) => patch("colorBack", e.target.value)}
              value={settings.colorBack}
            />
          </div>
          <div className="space-y-1">
            <Label
              className="text-muted-foreground text-xs"
              htmlFor="fluted-color-shadow"
            >
              Shadow tint
            </Label>
            <Input
              className="font-mono text-xs"
              id="fluted-color-shadow"
              onChange={(e) => patch("colorShadow", e.target.value)}
              value={settings.colorShadow}
            />
          </div>
          <div className="space-y-1">
            <Label
              className="text-muted-foreground text-xs"
              htmlFor="fluted-color-highlight"
            >
              Highlight tint
            </Label>
            <Input
              className="font-mono text-xs"
              id="fluted-color-highlight"
              onChange={(e) => patch("colorHighlight", e.target.value)}
              value={settings.colorHighlight}
            />
          </div>
        </div>

        <div className="space-y-4">
          <SettingSlider
            label="Distortion"
            max={1}
            min={0}
            onChange={(v) => patch("distortion", v)}
            step={0.01}
            value={settings.distortion ?? 0}
          />
          <SettingSlider
            label="Stripe size"
            max={1}
            min={0}
            onChange={(v) => patch("size", v)}
            step={0.01}
            value={settings.size ?? 0}
          />
          <SettingSlider
            label="Shadows"
            max={1}
            min={0}
            onChange={(v) => patch("shadows", v)}
            step={0.01}
            value={settings.shadows ?? 0}
          />
          <SettingSlider
            label="Highlights"
            max={1}
            min={0}
            onChange={(v) => patch("highlights", v)}
            step={0.01}
            value={settings.highlights ?? 0}
          />
          <SettingSlider
            format={(v) => `${Math.round(v)}°`}
            label="Angle"
            max={180}
            min={0}
            onChange={(v) => patch("angle", v)}
            step={1}
            value={settings.angle ?? 0}
          />
          <SettingSlider
            label="Edges"
            max={1}
            min={0}
            onChange={(v) => patch("edges", v)}
            step={0.01}
            value={settings.edges ?? 0}
          />
          <SettingSlider
            label="Blur"
            max={1}
            min={0}
            onChange={(v) => patch("blur", v)}
            step={0.01}
            value={settings.blur ?? 0}
          />
          <SettingSlider
            label="Stretch"
            max={1}
            min={0}
            onChange={(v) => patch("stretch", v)}
            step={0.01}
            value={settings.stretch ?? 0}
          />
          <SettingSlider
            label="Shift"
            max={1}
            min={-1}
            onChange={(v) => patch("shift", v)}
            step={0.01}
            value={settings.shift ?? 0}
          />
          <SettingSlider
            label="Margin"
            max={1}
            min={0}
            onChange={(v) => patch("margin", v)}
            step={0.01}
            value={settings.margin ?? 0}
          />
          <SettingSlider
            label="Grain mixer"
            max={1}
            min={0}
            onChange={(v) => patch("grainMixer", v)}
            step={0.01}
            value={settings.grainMixer ?? 0}
          />
          <SettingSlider
            label="Grain overlay"
            max={1}
            min={0}
            onChange={(v) => patch("grainOverlay", v)}
            step={0.01}
            value={settings.grainOverlay ?? 0}
          />
        </div>
      </div>
    </div>
  )
}

export { FlutedGlassDemo }
export default FlutedGlassDemo
