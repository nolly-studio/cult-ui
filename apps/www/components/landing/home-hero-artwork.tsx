"use client";

import { Dithering } from "@paper-design/shaders-react";

export function HomeHeroArtwork() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.14] dark:opacity-25 dark:invert"
    >
      <Dithering
        colorBack="#00000000"
        colorFront="#000000"
        pxSize={3}
        scale={1.6}
        shape="swirl"
        speed={0}
        type="4x4"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
