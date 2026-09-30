"use client"

import { useState } from "react"

import {
  IPhone17ProMax,
  type DynamicIslandSize,
} from "@/registry/default/ui/apple-iphone-17-pro"

const FRAME_SWATCH: Record<"graphite" | "gold" | "blue", string> = {
  graphite: "#363839",
  gold: "#E96A45",
  blue: "#0066F7",
}

export default function AppleIPhone17ProDemo() {
  const [dynamicIslandSize, setDynamicIslandSize] =
    useState<DynamicIslandSize>("default")
  const [frameColor, setFrameColor] = useState<
    "graphite" | "silver" | "gold" | "blue"
  >("graphite")

  const cycleDynamicIsland = () => {
    const sizes: DynamicIslandSize[] = ["default", "expanded", "large", "ultra"]
    const currentIndex = sizes.indexOf(dynamicIslandSize)
    const nextIndex = (currentIndex + 1) % sizes.length
    setDynamicIslandSize(sizes[nextIndex])
  }

  return (
    <IPhone17ProMax
      batteryLevel={94}
      dynamicIslandSize={dynamicIslandSize}
      frameColor={frameColor}
      onDynamicIslandTap={cycleDynamicIsland}
      signalStrength={2}
      time="9:41"
    >
      {/* Demo screen content */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
        <h1 className="text-center font-bold text-xl">iPhone 17 Pro Max</h1>
        <p className="text-center text-neutral-500 text-sm">
          Tap the Screen to cycle <br /> through dynamic island sizes
        </p>

        <div className="rounded-full bg-neutral-100 px-3 py-1.5 text-neutral-400 text-xs">
          Current: {dynamicIslandSize}
        </div>

        {/* Frame color selector */}
        <div className="mt-4 flex gap-3">
          {(["graphite", "gold", "blue"] as const).map((color) => (
            <button
              className={`h-8 w-8 rounded-full border-2 transition-all ${
                frameColor === color
                  ? "scale-110 border-black"
                  : "border-transparent"
              }`}
              key={color}
              onClick={() => setFrameColor(color)}
              style={{ background: FRAME_SWATCH[color] }}
              type="button"
            />
          ))}
        </div>
        <p className="text-neutral-400 text-xs">Select frame color</p>
      </div>
    </IPhone17ProMax>
  )
}
