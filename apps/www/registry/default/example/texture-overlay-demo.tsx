"use client"

import { TextureOverlay } from "@/registry/default/ui/texture-overlay"

export default function TextureOverlayDemo() {
  return (
    <div className="dark:bg-stone-950 py-6 px-4 md:px-0 rounded-md flex justify-center">
      <div className="max-w-6xl w-full">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Texture Overlay Showcase
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore different texture patterns using CSS gradients for adding
            visual texture to backgrounds and surfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="relative h-48 rounded-lg bg-card border overflow-hidden shadow-[0px_1px_0px_0px_hsla(0,_0%,_0%,_0.02)_inset,_0px_0px_0px_1px_hsla(0,_0%,_0%,_0.02)_inset,_0px_0px_0px_1px_rgba(255,_255,_255,_0.25)]"
            >
              <TextureOverlay texture={texture.type} />
              <div className="relative z-10 p-6 h-full flex items-end">
                <div className="bg-background/80 backdrop-blur-sm rounded-md px-3 py-2 border">
                  <h3 className="font-medium text-foreground">
                    {texture.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {texture.type} texture
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold tracking-tight text-foreground mb-4">
              Opacity Variations
            </h3>
            <p className="text-muted-foreground mb-8">
              See how different opacity values affect the texture appearance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0.3, 0.6, 1.0].map((opacity) => (
              <div
                key={opacity}
                className="relative h-32 rounded-lg bg-card border overflow-hidden shadow-[0px_1px_0px_0px_hsla(0,_0%,_0%,_0.02)_inset,_0px_0px_0px_1px_hsla(0,_0%,_0%,_0.02)_inset,_0px_0px_0px_1px_rgba(255,_255,_255,_0.25)]"
              >
                <TextureOverlay texture="dots" opacity={opacity} />
                <div className="relative z-10 p-4 h-full flex items-end">
                  <div className="bg-background/80 backdrop-blur-sm rounded-md px-3 py-2 border">
                    <h4 className="font-medium text-foreground">
                      Dots Pattern
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Opacity: {opacity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold tracking-tight text-foreground mb-4">
              Custom Styling
            </h3>
            <p className="text-muted-foreground mb-8">
              Combine with custom classes for unique effects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative h-32 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
              <TextureOverlay texture="grid" className="mix-blend-overlay" />
              <div className="relative z-10 p-4 h-full flex items-center justify-center">
                <div className="bg-background/80 backdrop-blur-sm rounded-md px-3 py-2 border">
                  <h4 className="font-medium text-foreground">
                    Grid with Blend Mode
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    mix-blend-overlay
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-32 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 overflow-hidden">
              <TextureOverlay texture="noise" className="opacity-50" />
              <div className="relative z-10 p-4 h-full flex items-center justify-center">
                <div className="bg-background/80 backdrop-blur-sm rounded-md px-3 py-2 border">
                  <h4 className="font-medium text-foreground">
                    Noise with Custom Opacity
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    opacity-50 class
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
