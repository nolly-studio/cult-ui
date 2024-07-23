import { Registry } from "@/registry/schema"

export const examples: Registry = [
  {
    name: "text-animate-demo",
    type: "components:example",
    registryDependencies: ["text-animate"],
    files: ["example/text-animate-demo.tsx"],
  },
  {
    name: "texture-button-demo",
    type: "components:example",
    registryDependencies: ["texture-button"],
    files: ["example/texture-button-demo.tsx"],
  },
  {
    name: "texture-card-demo",
    type: "components:example",
    registryDependencies: ["texture-card", "texture-button"],
    files: ["example/texture-card-demo.tsx"],
  },
  {
    name: "shift-card-demo",
    type: "components:example",
    registryDependencies: ["shift-card", "texture-button"],
    files: ["example/shift-card-demo.tsx"],
  },
  {
    name: "minimal-card-demo",
    type: "components:example",
    registryDependencies: ["minimal-card"],
    files: ["example/minimal-card-demo.tsx"],
  },
  {
    name: "dynamic-island-demo",
    type: "components:example",
    registryDependencies: ["dynamic-island"],
    files: ["example/dynamic-island-demo.tsx"],
  },
  {
    name: "direction-aware-tabs-demo",
    type: "components:example",
    registryDependencies: ["direction-aware-tabs"],
    files: ["example/direction-aware-tabs-demo.tsx"],
  },
  {
    name: "bg-animate-button-demo",
    type: "components:example",
    registryDependencies: ["bg-animate-button"],
    files: ["example/bg-animate-button-demo.tsx"],
  },
  {
    name: "family-button-demo",
    type: "components:example",
    registryDependencies: ["family-button"],
    files: ["example/family-button-demo.tsx"],
  },
  {
    name: "side-panel-demo",
    type: "components:example",
    registryDependencies: ["side-panel"],
    files: ["example/side-panel-demo.tsx"],
  },
  {
    name: "bg-media-demo",
    type: "components:example",
    registryDependencies: ["bg-media"],
    files: ["example/bg-media-demo.tsx"],
  },
  {
    name: "three-d-carousel-demo",
    type: "components:example",
    registryDependencies: ["three-d-carousel"],
    files: ["example/three-d-carousel-demo.tsx"],
  },
  {
    name: "tweet-grid-demo",
    type: "components:example",
    registryDependencies: ["tweet-grid", "gradient-heading"],
    files: ["example/tweet-grid-demo.tsx"],
  },
  {
    name: "gradient-heading-demo",
    type: "components:example",
    registryDependencies: ["gradient-heading"],
    files: ["example/gradient-heading-demo.tsx"],
  },
  {
    name: "typewriter-demo",
    type: "components:example",
    registryDependencies: ["typewriter"],
    files: ["example/typewriter-demo.tsx"],
  },
  {
    name: "animated-number-demo",
    type: "components:example",
    registryDependencies: ["animated-number"],
    files: ["example/animated-number-demo.tsx"],
  },
  {
    name: "sortable-list-demo",
    type: "components:example",
    registryDependencies: ["sortable-list"],
    files: ["example/sortable-list-demo.tsx"],
  },
  {
    name: "dock-demo",
    type: "components:example",
    registryDependencies: ["dock"],
    files: ["example/dock-demo.tsx"],
  },
  {
    name: "lightboard-demo",
    type: "components:example",
    registryDependencies: ["lightboard"],
    files: ["example/lightboard-demo.tsx"],
  },
]
