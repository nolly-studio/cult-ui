"use client";

import { useState } from "react";

import { LightBoard, PatternCell } from "../ui/lightboard";

export default function LightBoardDemo() {
  const [controlledDrawState, setControlledDrawState] =
    useState<PatternCell>("2");
  const [controlledHoverState, setControlledHoverState] = useState(false);

  const cycleDrawState = () => {
    setControlledDrawState((prev) => {
      switch (prev) {
        case "0":
          return "1";
        case "1":
          return "2";
        case "2":
          return "3";
        case "3":
          return "0";
        default:
          return "0";
      }
    });
  };

  return (
    <div className="space-y-2 p-2 lg:space-y-4 lg:p-8">
      <h1 className="text-3xl font-bold text-white">LightBoard Demo</h1>

      {/* Controlled Interactive Board */}
      <div className="w-full max-w-2xl">
        <h2 className="mb-3 text-xl font-semibold">
          Controlled LightBoard with draw support
        </h2>
        <p className="mb-3">
          Try drawing on this board by clicking and dragging.
        </p>

        <div className="mb-3 flex space-x-4">
          <button
            className="rounded bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
            onClick={cycleDrawState}
          >
            Draw Color: {controlledDrawState}
          </button>
          <button
            className="rounded bg-green-500 px-4 py-2 text-sm font-bold text-white hover:bg-green-700"
            onClick={() => setControlledHoverState((prev) => !prev)}
          >
            Toggle Scroll: {controlledHoverState ? "On" : "Off"}
          </button>
        </div>

        <div className="dark:bg-background bg-neutral-900">
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

      <h2 className="mb-3 text-xl font-semibold">Drawing disabled</h2>

      {/* Basic example */}
      <div className="w-full max-w-md bg-black">
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
      <div className="w-full max-w-lg bg-black">
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
      <div className="w-full max-w-xl bg-black">
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
      <div className="w-full max-w-2xl bg-black">
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

      <h2 className="mb-3 text-xl font-semibold">sketchpad</h2>
      <p className="mb-3">
        Try drawing on this board by clicking and dragging.
      </p>

      <div className="dark:bg-background mb-2 bg-neutral-900">
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
  );
}
