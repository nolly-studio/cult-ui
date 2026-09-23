"use client";

import { TextureOverlay } from "@/registry/default/ui/texture-overlay";

export default function TextureOverlayDemo() {
  return (
    <div className="flex justify-center rounded-md px-4 py-6 md:px-0 dark:bg-stone-950">
      <div className="w-full max-w-6xl">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight">
            Texture Overlay Showcase
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Explore different texture patterns using CSS gradients for adding
            visual texture to backgrounds and surfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { type: "dots" as const, name: "Dots Pattern" },
            { type: "grid" as const, name: "Grid Pattern" },
            { type: "noise" as const, name: "Noise Pattern" },
            { type: "crosshatch" as const, name: "Crosshatch Pattern" },
            { type: "diagonal" as const, name: "Diagonal Pattern" },
            { type: "scatteredDots" as const, name: "Scattered Dots" },
            { type: "halftone" as const, name: "Halftone Pattern" },
            { type: "triangular" as const, name: "Triangular Pattern" },
            { type: "chevron" as const, name: "Chevron Pattern" },
            { type: "paperGrain" as const, name: "Paper Grain" },
            { type: "horizontalLines" as const, name: "Horizontal Lines" },
            { type: "verticalLines" as const, name: "Vertical Lines" },
          ].map((texture) => (
            <div
              key={texture.type}
              className="bg-card relative h-48 overflow-hidden rounded-lg border shadow-[0px_1px_0px_0px_hsla(0,_0%,_0%,_0.02)_inset,_0px_0px_0px_1px_hsla(0,_0%,_0%,_0.02)_inset,_0px_0px_0px_1px_rgba(255,_255,_255,_0.25)]"
            >
              <TextureOverlay texture={texture.type} />
              <div className="relative z-10 flex h-full items-end p-6">
                <div className="bg-background/80 rounded-md border px-3 py-2 backdrop-blur-sm">
                  <h3 className="text-foreground font-medium">
                    {texture.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {texture.type} texture
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-8">
          <div className="text-center">
            <h3 className="text-foreground mb-4 text-2xl font-bold tracking-tight">
              Opacity Variations
            </h3>
            <p className="text-muted-foreground mb-8">
              See how different opacity values affect the texture appearance
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[0.3, 0.6, 1.0].map((opacity) => (
              <div
                key={opacity}
                className="bg-card relative h-32 overflow-hidden rounded-lg border shadow-[0px_1px_0px_0px_hsla(0,_0%,_0%,_0.02)_inset,_0px_0px_0px_1px_hsla(0,_0%,_0%,_0.02)_inset,_0px_0px_0px_1px_rgba(255,_255,_255,_0.25)]"
              >
                <TextureOverlay texture="dots" opacity={opacity} />
                <div className="relative z-10 flex h-full items-end p-4">
                  <div className="bg-background/80 rounded-md border px-3 py-2 backdrop-blur-sm">
                    <h4 className="text-foreground font-medium">
                      Dots Pattern
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Opacity: {opacity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-foreground mb-4 text-2xl font-bold tracking-tight">
              Custom Styling
            </h3>
            <p className="text-muted-foreground mb-8">
              Combine with custom classes for unique effects
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="relative h-32 overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <TextureOverlay texture="grid" className="mix-blend-overlay" />
              <div className="relative z-10 flex h-full items-center justify-center p-4">
                <div className="bg-background/80 rounded-md border px-3 py-2 backdrop-blur-sm">
                  <h4 className="text-foreground font-medium">
                    Grid with Blend Mode
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    mix-blend-overlay
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-32 overflow-hidden rounded-lg bg-gradient-to-br from-green-500 to-teal-600">
              <TextureOverlay texture="noise" className="opacity-50" />
              <div className="relative z-10 flex h-full items-center justify-center p-4">
                <div className="bg-background/80 rounded-md border px-3 py-2 backdrop-blur-sm">
                  <h4 className="text-foreground font-medium">
                    Noise with Custom Opacity
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    opacity-50 class
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
