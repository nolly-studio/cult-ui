"use client";

import { useState } from "react";

import { PixelHeading } from "@/registry/default/ui/pixel-heading-character";
import type { PixelHeadingMode } from "@/registry/default/ui/pixel-heading-character";

/* ─── Constants ─── */

const MODES: PixelHeadingMode[] = ["uniform", "multi", "wave", "random"];
const PREFIX_FONTS = [
  "none",
  "square",
  "grid",
  "circle",
  "triangle",
  "line",
] as const;
const HEADING_LEVELS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

/* ─── Demo ─── */

export default function PixelHeadingCharacterDemo() {
  const [text, setText] = useState("Pixel Fonts");
  const [mode, setMode] = useState<PixelHeadingMode>("wave");
  const [autoPlay, setAutoPlay] = useState(true);
  const [showLabel, setShowLabel] = useState(true);
  const [cycleInterval, setCycleInterval] = useState(340);
  const [staggerDelay, setStaggerDelay] = useState(200);
  const [prefix, setPrefix] = useState("");
  const [prefixFont, setPrefixFont] =
    useState<(typeof PREFIX_FONTS)[number]>("none");
  const [headingLevel, setHeadingLevel] =
    useState<(typeof HEADING_LEVELS)[number]>("h1");
  const [defaultFontIndex, setDefaultFontIndex] = useState(3);
  const [isolateEnabled, setIsolateEnabled] = useState(false);
  const [isolateChars, setIsolateChars] = useState("x");
  const [isolateFont, setIsolateFont] = useState("sans");

  const isolateMap = isolateEnabled
    ? Object.fromEntries(isolateChars.split("").map((c) => [c, isolateFont]))
    : undefined;

  /* ── Reset key forces remount when autoPlay toggles ── */
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="w-full space-y-8 py-4">
      {/* ── Preview ── */}
      <div className="border-border/40 bg-background flex min-h-[160px] items-center justify-center rounded-lg border p-8">
        <PixelHeading
          key={resetKey}
          as={headingLevel}
          mode={mode}
          autoPlay={autoPlay}
          showLabel={showLabel}
          cycleInterval={cycleInterval}
          staggerDelay={staggerDelay}
          defaultFontIndex={defaultFontIndex}
          prefix={prefix || undefined}
          prefixFont={prefixFont}
          isolate={isolateMap}
          className="text-5xl tracking-tight md:text-7xl"
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
            className="border-input placeholder:text-muted-foreground focus-visible:ring-ring h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
            placeholder="Enter heading text"
          />
        </ControlGroup>

        {/* Mode */}
        <ControlGroup label="Mode">
          <div className="flex flex-wrap gap-1.5">
            {MODES.map((m) => (
              <button
                type="button"
                key={m}
                onClick={() => {
                  setMode(m);
                  setResetKey((k) => k + 1);
                }}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  mode === m
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {m}
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
            className="border-input focus-visible:ring-ring h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
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
            min={30}
            max={500}
            step={10}
            value={cycleInterval}
            onChange={(e) => setCycleInterval(Number(e.target.value))}
            className="accent-foreground w-full"
          />
        </ControlGroup>

        {/* Stagger Delay */}
        <ControlGroup label={`Stagger Delay: ${staggerDelay}ms`}>
          <input
            type="range"
            min={0}
            max={200}
            step={5}
            value={staggerDelay}
            onChange={(e) => setStaggerDelay(Number(e.target.value))}
            className="accent-foreground w-full"
          />
        </ControlGroup>

        {/* Default Font Index (uniform) */}
        <ControlGroup label={`Default Font Index: ${defaultFontIndex}`}>
          <input
            type="range"
            min={0}
            max={4}
            step={1}
            value={defaultFontIndex}
            onChange={(e) => setDefaultFontIndex(Number(e.target.value))}
            className="accent-foreground w-full"
          />
        </ControlGroup>

        {/* Auto Play */}
        <ControlGroup label="Auto Play">
          <Toggle
            checked={autoPlay}
            onChange={(v) => {
              setAutoPlay(v);
              setResetKey((k) => k + 1);
            }}
          />
        </ControlGroup>

        {/* Show Label */}
        <ControlGroup label="Show Label">
          <Toggle checked={showLabel} onChange={setShowLabel} />
        </ControlGroup>

        {/* Prefix */}
        <ControlGroup label="Prefix">
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            className="border-input placeholder:text-muted-foreground focus-visible:ring-ring h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
            placeholder="e.g. Shadcn,"
          />
        </ControlGroup>

        {/* Prefix Font */}
        <ControlGroup label="Prefix Font">
          <select
            value={prefixFont}
            onChange={(e) =>
              setPrefixFont(e.target.value as (typeof PREFIX_FONTS)[number])
            }
            className="border-input focus-visible:ring-ring h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
          >
            {PREFIX_FONTS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </ControlGroup>

        {/* Isolate */}
        <ControlGroup label="Isolate Characters">
          <div className="space-y-2">
            <Toggle checked={isolateEnabled} onChange={setIsolateEnabled} />
            {isolateEnabled && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={isolateChars}
                  onChange={(e) => setIsolateChars(e.target.value)}
                  className="border-input placeholder:text-muted-foreground focus-visible:ring-ring h-9 w-20 rounded-md border bg-transparent px-3 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
                  placeholder="chars"
                />
                <select
                  value={isolateFont}
                  onChange={(e) => setIsolateFont(e.target.value)}
                  className="border-input focus-visible:ring-ring h-9 flex-1 rounded-md border bg-transparent px-3 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
                >
                  <option value="sans">sans</option>
                  <option value="mono">mono</option>
                </select>
              </div>
            )}
          </div>
        </ControlGroup>

        {/* Remount */}
        <ControlGroup label="Reset Animation">
          <button
            type="button"
            onClick={() => setResetKey((k) => k + 1)}
            className="border-input hover:bg-muted h-9 rounded-md border bg-transparent px-4 text-sm font-medium shadow-sm transition-colors"
          >
            Restart
          </button>
        </ControlGroup>
      </div>
    </div>
  );
}

/* ─── Shared control primitives ─── */

function ControlGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <span className="text-muted-foreground block text-xs font-medium tracking-wider uppercase">
        {label}
      </span>
      {children}
    </div>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
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
        className={`bg-background pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
