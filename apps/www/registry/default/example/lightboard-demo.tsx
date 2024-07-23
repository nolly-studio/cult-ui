"use client"

import { useState } from "react"

import { LightBoard, PatternCell } from "../ui/lightboard"

export default function LightBoardDemo() {
  const [controlledDrawState, setControlledDrawState] =
    useState<PatternCell>("2")
  const [controlledHoverState, setControlledHoverState] = useState(false)

  const cycleDrawState = () => {
    setControlledDrawState((prev) => {
      switch (prev) {
        case "0":
          return "1"
        case "1":
          return "2"
        case "2":
          return "3"
        case "3":
          return "0"
        default:
          return "0"
      }
    })
  }

  return (
    <div className="space-y-2 lg:space-y-4 p-2 lg:p-8">
      <h1 className="text-3xl font-bold text-white">LightBoard Demo</h1>

      {/* Controlled Interactive Board */}
      <div className="max-w-2xl w-full">
        <h2 className="text-xl font-semibold  mb-3">
          Controlled LightBoard with draw support
        </h2>
        <p className=" mb-3">
          Try drawing on this board by clicking and dragging.
        </p>

        <div className="flex space-x-4 mb-3">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
            onClick={cycleDrawState}
          >
            Draw Color: {controlledDrawState}
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm"
            onClick={() => setControlledHoverState((prev) => !prev)}
          >
            Toggle Scroll: {controlledHoverState ? "On" : "Off"}
          </button>
        </div>

        <div className="bg-neutral-900 dark:bg-background">
          <LightBoard
            rows={12}
            lightSize={6}
            gap={2}
            text="CONTROLLED BOARD"
            font="default"
            disableDrawing={false}
            updateInterval={150}
            colors={{
              background: "#0a0a0a",
              textDim: "#555555",
              drawLine: "#E78AEA",
              textBright: "#FFFFFF",
            }}
            controlledDrawState={controlledDrawState}
            onDrawStateChange={setControlledDrawState}
            controlledHoverState={controlledHoverState}
            onHoverStateChange={setControlledHoverState}
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold  mb-3">Drawing disabled</h2>

      {/* Basic example */}
      <div className="max-w-md w-full bg-black">
        <LightBoard
          text="Hello World"
          rows={7}
          gap={1}
          lightSize={4}
          font="default"
          updateInterval={150}
          colors={{
            background: "#1a1a1a",
            textDim: "#3a3a3a",
            drawLine: "#7a7a7a",
            textBright: "#ffffff",
          }}
        />
      </div>

      {/* Red Alert */}
      <div className="max-w-lg w-full bg-black">
        <LightBoard
          text="DANGER ZONE"
          rows={10}
          gap={1}
          lightSize={5}
          font="default"
          updateInterval={100}
          colors={{
            background: "#1a0000",
            textDim: "#4a0000",
            drawLine: "#8a0000",
            textBright: "#ff0000",
          }}
        />
      </div>

      {/* Rainbow Scroll */}
      <div className="max-w-xl w-full bg-black">
        <LightBoard
          rows={15}
          lightSize={2}
          gap={1}
          text="Colors of the Rainbow"
          font="default"
          updateInterval={200}
          colors={{
            background: "#1a1a1a",
            textDim: "#ff9999",
            drawLine: "#ffff99",
            textBright: "#99ffff",
          }}
        />
      </div>

      {/* Matrix Style */}
      <div className="w-full bg-black">
        <LightBoard
          rows={20}
          lightSize={3}
          gap={1}
          text="THE MATRIX HAS YOU"
          font="default"
          updateInterval={50}
          colors={{
            background: "#001a00",
            textDim: "#006600",
            drawLine: "#00b300",
            textBright: "#00ff00",
          }}
        />
      </div>

      {/* Interactive Neon Board */}
      <div className="max-w-2xl w-full bg-black">
        <LightBoard
          rows={12}
          lightSize={4}
          gap={2}
          text="NEON DREAMS"
          font="default"
          updateInterval={150}
          colors={{
            background: "#0a0a0a",
            textDim: "#ff00ff33",
            drawLine: "#ff00ff66",
            textBright: "#ff00ffff",
          }}
        />
      </div>

      <h2 className="text-xl font-semibold  mb-3">sketchpad</h2>
      <p className=" mb-3">
        Try drawing on this board by clicking and dragging.
      </p>

      <div className="bg-neutral-900 dark:bg-background mb-2">
        <LightBoard
          rows={22}
          lightSize={6}
          gap={2}
          text=""
          font="default"
          disableDrawing={false}
          updateInterval={150}
          colors={{
            drawLine: "#6CF2E8",
          }}
          controlledDrawState={controlledDrawState}
          onDrawStateChange={setControlledDrawState}
          controlledHoverState={true}
          onHoverStateChange={setControlledHoverState}
        />
      </div>
    </div>
  )
}
