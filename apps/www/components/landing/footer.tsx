import { Dithering } from "@paper-design/shaders-react";
import { memo } from "react";

import { Icons } from "../icons";
import { LocalTime } from "./local-time";

const MemoizedDithering = memo(Dithering);

export const Footer = () => (
  <div className="relative grid w-full grid-cols-[0.2fr_3fr_0.2fr] md:grid-cols-[0.5fr_3fr_0.5fr]">
    {/* Gradient overlays */}
    <div className="pointer-events-none absolute inset-0">
      <div className="from-background absolute top-0 right-0 left-0 h-8 bg-gradient-to-b to-transparent" />
      <div className="from-background absolute right-0 bottom-0 left-0 h-6 bg-gradient-to-t to-transparent" />
      <div className="from-background absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r to-transparent" />
      <div className="from-background absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l to-transparent" />
    </div>

    <div className="absolute top-12 right-0 left-0 z-0">
      <div className="shader-background absolute inset-0 z-0 select-none">
        <MemoizedDithering
          colorBack="#00000000"
          // colorFront="#006CFF"
          colorFront="#000000"
          pxSize={3}
          scale={2.13}
          shape="swirl"
          speed={0.43}
          style={{
            // background
            // Color: "#000000",
            height: "30.2vh",
            // width: "100vw",
          }}
          type="4x4"
        />
      </div>
    </div>

    {/* Top row */}

    {/* Middle row - main content */}
    <div className="" />
    <div className="relative flex items-center justify-center">
      {/* Main content */}
      <div className="flex flex-col items-center justify-center px-5 py-36">
        <div className="flex items-center justify-center gap-1">
          <Icons.cultLogoBasic className="size-6 fill-black dark:fill-white" />
          <h2 className="mb-2 text-center text-3xl font-medium tracking-[-0.12rem] md:text-4xl">
            cult ui
          </h2>
          <Icons.cultLogoBasic className="size-6 fill-black dark:fill-white" />
        </div>

        <p className="font-pixel-line max-w-2xl text-center text-lg">
          Join the cult
        </p>
        <p className="font-pixel-line max-w-2xl text-center text-lg">
          <LocalTime />
        </p>
      </div>
    </div>

    {/* Spacer */}
    <div className="h-16" />

    <div className="" />
  </div>
);
