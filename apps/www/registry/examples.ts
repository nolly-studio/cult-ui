import type { Registry } from "@/registry/schema"

export const examples: Registry["items"] = [
  {
    name: "text-animate-demo",
    type: "registry:component",
    registryDependencies: ["text-animate"],
    files: [
      {
        path: "registry/default/example/text-animate-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "cosmic-button-demo",
    type: "registry:component",
    registryDependencies: ["cosmic-button"],
    files: [
      {
        path: "registry/default/example/cosmic-button-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "texture-button-demo",
    type: "registry:component",
    registryDependencies: ["texture-button"],
    files: [
      {
        path: "registry/default/example/texture-button-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "texture-card-demo",
    type: "registry:component",
    registryDependencies: ["texture-card", "texture-button"],
    files: [
      {
        path: "registry/default/example/texture-card-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "timer-demo",
    type: "registry:component",
    registryDependencies: ["timer", "texture-button"],
    files: [
      {
        path: "registry/default/example/timer-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "shift-card-demo",
    type: "registry:component",
    registryDependencies: ["shift-card", "texture-button"],
    files: [
      {
        path: "registry/default/example/shift-card-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "minimal-card-demo",
    type: "registry:component",
    registryDependencies: ["minimal-card"],
    files: [
      {
        path: "registry/default/example/minimal-card-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "cutout-card-demo",
    type: "registry:component",
    registryDependencies: ["cutout-card"],
    files: [
      {
        path: "registry/default/example/cutout-card-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "dynamic-island-demo",
    type: "registry:component",
    registryDependencies: ["dynamic-island"],
    files: [
      {
        path: "registry/default/example/dynamic-island-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "direction-aware-tabs-demo",
    type: "registry:component",
    registryDependencies: ["direction-aware-tabs"],
    files: [
      {
        path: "registry/default/example/direction-aware-tabs-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "bg-animate-button-demo",
    type: "registry:component",
    registryDependencies: ["bg-animate-button"],
    files: [
      {
        path: "registry/default/example/bg-animate-button-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "border-beam-button-demo",
    type: "registry:component",
    registryDependencies: ["border-beam-button"],
    files: [
      {
        path: "registry/default/example/border-beam-button-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "family-button-demo",
    type: "registry:component",
    registryDependencies: ["family-button"],
    files: [
      {
        path: "registry/default/example/family-button-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "side-panel-demo",
    type: "registry:component",
    registryDependencies: ["side-panel"],
    files: [
      {
        path: "registry/default/example/side-panel-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "bg-media-demo",
    type: "registry:component",
    registryDependencies: ["bg-media"],
    files: [
      {
        path: "registry/default/example/bg-media-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "bg-image-texture-demo",
    type: "registry:component",
    registryDependencies: ["bg-image-texture"],
    files: [
      {
        path: "registry/default/example/bg-image-texture-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "three-d-carousel-demo",
    type: "registry:component",
    registryDependencies: ["three-d-carousel"],
    files: [
      {
        path: "registry/default/example/three-d-carousel-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "tweet-grid-demo",
    type: "registry:component",
    registryDependencies: ["tweet-grid", "gradient-heading"],
    files: [
      {
        path: "registry/default/example/tweet-grid-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "gradient-heading-demo",
    type: "registry:component",
    registryDependencies: ["gradient-heading"],
    files: [
      {
        path: "registry/default/example/gradient-heading-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "typewriter-demo",
    type: "registry:component",
    registryDependencies: ["typewriter"],
    files: [
      {
        path: "registry/default/example/typewriter-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "animated-number-demo",
    type: "registry:component",
    registryDependencies: ["animated-number"],
    files: [
      {
        path: "registry/default/example/animated-number-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "sortable-list-demo",
    type: "registry:component",
    registryDependencies: ["sortable-list"],
    files: [
      {
        path: "registry/default/example/sortable-list-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "dock-demo",
    type: "registry:component",
    registryDependencies: ["dock"],
    files: [
      {
        path: "registry/default/example/dock-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "lightboard-demo",
    type: "registry:component",
    registryDependencies: ["lightboard"],
    files: [
      {
        path: "registry/default/example/lightboard-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "canvas-fractal-grid-demo",
    type: "registry:component",
    registryDependencies: ["canvas-fractal-grid"],
    files: [
      {
        path: "registry/default/example/canvas-fractal-grid-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "bg-animated-fractal-dot-grid-demo",
    type: "registry:component",
    registryDependencies: ["bg-animated-fractal-dot-grid"],
    files: [
      {
        path: "registry/default/example/bg-animated-fractal-dot-grid-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "bg-animated-gradient-demo",
    type: "registry:component",
    registryDependencies: ["bg-animated-gradient"],
    files: [
      {
        path: "registry/default/example/bg-animated-gradient-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "popover-demo",
    type: "registry:component",
    registryDependencies: ["popover"],
    files: [
      {
        path: "registry/default/example/popover-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "floating-panel-demo",
    type: "registry:component",
    registryDependencies: ["floating-panel"],
    files: [
      {
        path: "registry/default/example/floating-panel-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "color-picker-demo",
    type: "registry:component",
    registryDependencies: ["color-picker"],
    files: [
      {
        path: "registry/default/example/color-picker-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "shader-lens-blur-demo",
    type: "registry:component",
    registryDependencies: ["shader-lens-blur", "color-picker"],
    files: [
      {
        path: "registry/default/example/shader-lens-blur-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "edge-blur-demo",
    type: "registry:component",
    registryDependencies: ["edge-blur"],
    files: [
      {
        path: "registry/default/example/edge-blur-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "dither-image-demo",
    type: "registry:component",
    registryDependencies: ["dither-image"],
    files: [
      {
        path: "registry/default/example/dither-image-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "dither-image-demo-upload",
    type: "registry:component",
    registryDependencies: ["dither-image"],
    files: [
      {
        path: "registry/default/example/dither-image-demo-upload.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "popover-form-demo",
    type: "registry:component",
    registryDependencies: ["popover-form"],
    files: [
      {
        path: "registry/default/example/popover-form-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "expandable-demo",
    type: "registry:component",
    registryDependencies: ["expandable"],
    files: [
      {
        path: "registry/default/example/expandable-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "logo-carousel-demo",
    type: "registry:component",
    registryDependencies: ["logo-carousel", "gradient-heading"],
    files: [
      {
        path: "registry/default/example/logo-carousel-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "loading-carousel-demo",
    type: "registry:component",
    registryDependencies: ["loading-carousel"],
    files: [
      {
        path: "registry/default/example/loading-carousel-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "hover-video-player-demo",
    type: "registry:component",
    registryDependencies: ["hover-video-player"],
    files: [
      {
        path: "registry/default/example/hover-video-player-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "neumorph-eyebrow-demo",
    type: "registry:component",
    registryDependencies: ["neumorph-eyebrow"],
    files: [
      {
        path: "registry/default/example/neumorph-eyebrow-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "neumorph-button-demo",
    type: "registry:component",
    registryDependencies: ["neumorph-button"],
    files: [
      {
        path: "registry/default/example/neumorph-button-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "feature-carousel-demo",
    type: "registry:component",
    registryDependencies: ["feature-carousel"],
    files: [
      {
        path: "registry/default/example/feature-carousel-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "choice-poll-demo",
    type: "registry:component",
    registryDependencies: ["choice-poll"],
    files: [
      {
        path: "registry/default/example/choice-poll-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "feature-poll-demo",
    type: "registry:component",
    registryDependencies: ["feature-poll"],
    files: [
      {
        path: "registry/default/example/feature-poll-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "feature-voting-demo",
    type: "registry:component",
    registryDependencies: ["feature-voting"],
    files: [
      {
        path: "registry/default/example/feature-voting-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "vote-tally-demo",
    type: "registry:component",
    registryDependencies: ["vote-tally"],
    files: [
      {
        path: "registry/default/example/vote-tally-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "poll-widget-demo",
    type: "registry:component",
    registryDependencies: ["poll-widget"],
    files: [
      {
        path: "registry/default/example/poll-widget-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "prompt-library-demo",
    type: "registry:component",
    registryDependencies: ["prompt-library"],
    files: [
      {
        path: "registry/default/example/prompt-library-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "ai-instructions-demo",
    type: "registry:component",
    registryDependencies: ["ai-instructions"],
    files: [
      {
        path: "registry/default/example/ai-instructions-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "intro-disclosure-demo",
    type: "registry:component",
    registryDependencies: ["intro-disclosure"],
    files: [
      {
        path: "registry/default/example/intro-disclosure-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "text-gif-demo",
    type: "registry:component",
    registryDependencies: ["text-gif"],
    files: [
      {
        path: "registry/default/example/text-gif-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "stripe-bg-guides-demo",
    type: "registry:component",
    registryDependencies: ["stripe-bg-guides"],
    files: [
      {
        path: "registry/default/example/stripe-bg-guides-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "svg-shapes-demo",
    type: "registry:component",
    registryDependencies: ["svg-shapes"],
    files: [
      {
        path: "registry/default/example/svg-shapes-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "svg-shapes-animated-demo",
    type: "registry:component",
    registryDependencies: ["svg-shapes-animated"],
    files: [
      {
        path: "registry/default/example/svg-shapes-animated-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "svg-bands-demo",
    type: "registry:component",
    registryDependencies: ["svg-bands"],
    files: [
      {
        path: "registry/default/example/svg-bands-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "grid-beam-demo",
    type: "registry:component",
    registryDependencies: ["grid-beam"],
    files: [
      {
        path: "registry/default/example/grid-beam-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "youtube-video-player-demo",
    type: "registry:component",
    registryDependencies: ["youtube-video-player"],
    files: [
      {
        path: "registry/default/example/youtube-video-player-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "toolbar-expandable-demo",
    type: "registry:component",
    registryDependencies: [
      "toolbar-expandable",
      "button",
      "input",
      "label",
      "textarea",
    ],
    files: [
      {
        path: "registry/default/example/toolbar-expandable-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "texture-overlay-demo",
    type: "registry:component",
    registryDependencies: ["texture-overlay"],
    files: [
      {
        path: "registry/default/example/texture-overlay-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "squiggle-arrow-demo",
    type: "registry:component",
    registryDependencies: ["squiggle-arrow"],
    files: [
      {
        path: "registry/default/example/squiggle-arrow-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "code-block-demo",
    type: "registry:component",
    registryDependencies: ["code-block"],
    files: [
      {
        path: "registry/default/example/code-block-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "metal-button-demo",
    type: "registry:component",
    registryDependencies: ["metal-button"],
    files: [
      {
        path: "registry/default/example/metal-button-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "mock-browser-window-demo",
    type: "registry:component",
    registryDependencies: [
      "mock-browser-window",
      "button",
      "input",
      "label",
      "select",
      "switch",
    ],
    files: [
      {
        path: "registry/default/example/mock-browser-window-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "morph-surface-demo",
    type: "registry:component",
    registryDependencies: ["morph-surface"],
    files: [
      {
        path: "registry/default/example/morph-surface-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "distorted-glass-demo",
    type: "registry:component",
    registryDependencies: ["distorted-glass"],
    files: [
      {
        path: "registry/default/example/distorted-glass-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "family-drawer-demo",
    type: "registry:component",
    registryDependencies: ["family-drawer"],
    files: [
      {
        path: "registry/default/example/family-drawer-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "expandable-screen-demo",
    type: "registry:component",
    registryDependencies: [
      "expandable-screen",
      "button",
      "input",
      "label",
      "select",
      "textarea",
    ],
    files: [
      {
        path: "registry/default/example/expandable-screen-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "pixel-heading-character-demo",
    type: "registry:component",
    registryDependencies: ["pixel-heading-character"],
    files: [
      {
        path: "registry/default/example/pixel-heading-character-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "pixel-heading-word-demo",
    type: "registry:component",
    registryDependencies: ["pixel-heading-word"],
    files: [
      {
        path: "registry/default/example/pixel-heading-word-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "pixel-paragraph-words-inverse-demo",
    type: "registry:component",
    registryDependencies: ["pixel-paragraph-words-inverse"],
    files: [
      {
        path: "registry/default/example/pixel-paragraph-words-inverse-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "pixel-paragraph-words-demo",
    type: "registry:component",
    registryDependencies: ["pixel-paragraph-words"],
    files: [
      {
        path: "registry/default/example/pixel-paragraph-words-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "onboarding-demo",
    type: "registry:component",
    registryDependencies: ["onboarding"],
    files: [
      {
        path: "registry/default/example/onboarding-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "gradient-button-group-demo",
    type: "registry:component",
    registryDependencies: ["gradient-button-group"],
    files: [
      {
        path: "registry/default/example/gradient-button-group-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "terminal-animation-demo",
    type: "registry:component",
    registryDependencies: ["terminal-animation"],
    files: [
      {
        path: "registry/default/example/terminal-animation-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "hero-dithering-demo",
    type: "registry:component",
    registryDependencies: ["hero-dithering"],
    files: [
      {
        path: "registry/default/example/hero-dithering-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "hero-color-panels-demo",
    type: "registry:component",
    registryDependencies: ["hero-color-panel"],
    files: [
      {
        path: "registry/default/example/hero-color-panels-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "hero-static-radial-gradient-demo",
    type: "registry:component",
    registryDependencies: ["hero-static-radial-gradient"],
    files: [
      {
        path: "registry/default/example/hero-static-radial-gradient-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "hero-heatmap-demo",
    type: "registry:component",
    registryDependencies: ["hero-heatmap"],
    files: [
      {
        path: "registry/default/example/hero-heatmap-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "hero-liquid-metal-demo",
    type: "registry:component",
    registryDependencies: ["hero-liquid-metal"],
    files: [
      {
        path: "registry/default/example/hero-liquid-metal-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "gateway-endpoint-illustration-demo",
    type: "registry:component",
    registryDependencies: ["gateway-endpoint-illustration"],

    files: [
      {
        path: "registry/default/example/gateway-endpoint-illustration-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "gateway-route-illustration-demo",
    type: "registry:component",
    registryDependencies: ["gateway-route-illustration"],

    files: [
      {
        path: "registry/default/example/gateway-route-illustration-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "gateway-svg-illustration-demo",
    type: "registry:component",
    registryDependencies: ["gateway-svg-illustration"],

    files: [
      {
        path: "registry/default/example/gateway-svg-illustration-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "illustration-card-grid-demo",
    type: "registry:component",
    registryDependencies: ["illustration-card-grid"],

    files: [
      {
        path: "registry/default/example/illustration-card-grid-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "illustration-cursor-demo",
    type: "registry:component",
    registryDependencies: ["illustration-cursor"],

    files: [
      {
        path: "registry/default/example/illustration-cursor-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "illustration-comment-bubble-demo",
    type: "registry:component",
    registryDependencies: ["illustration-comment-bubble"],

    files: [
      {
        path: "registry/default/example/illustration-comment-bubble-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "illustration-fluid-rendering-demo",
    type: "registry:component",
    registryDependencies: ["illustration-fluid-rendering"],

    files: [
      {
        path: "registry/default/example/illustration-fluid-rendering-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "illustration-globe-vercel-demo",
    type: "registry:component",
    registryDependencies: ["illustration-globe-vercel"],

    files: [
      {
        path: "registry/default/example/illustration-globe-vercel-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "illustration-graph-demo",
    type: "registry:component",
    registryDependencies: ["illustration-graph"],

    files: [
      {
        path: "registry/default/example/illustration-graph-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "tabs-illustration-vercel-demo",
    type: "registry:component",
    registryDependencies: ["tabs-illustration-vercel"],

    files: [
      {
        path: "registry/default/example/tabs-illustration-vercel-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "circuit-board-demo",
    type: "registry:component",
    registryDependencies: ["circuit-board"],

    files: [
      {
        path: "registry/default/example/circuit-board-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "fluid-ai-workloads-demo",
    type: "registry:component",
    registryDependencies: ["fluid-ai-workloads"],

    files: [
      {
        path: "registry/default/example/fluid-ai-workloads-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "security-checkpoint-demo",
    type: "registry:component",
    registryDependencies: ["security-checkpoint"],

    files: [
      {
        path: "registry/default/example/security-checkpoint-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "merging-bubbles-demo",
    type: "registry:component",
    registryDependencies: ["merging-bubbles"],

    files: [
      {
        path: "registry/default/example/merging-bubbles-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "ai-blob-warp-demo",
    type: "registry:component",
    registryDependencies: ["ai-blob-warp"],

    files: [
      {
        path: "registry/default/example/ai-blob-warp-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "folded-card-demo",
    type: "registry:component",
    registryDependencies: ["folded-card"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/default/example/folded-card-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "shadow-card-demo",
    type: "registry:component",
    registryDependencies: ["shadow-card"],

    files: [
      {
        path: "registry/default/example/shadow-card-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "organic-card-demo",
    type: "registry:component",
    registryDependencies: ["organic-card"],

    files: [
      {
        path: "registry/default/example/organic-card-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "organic-card-small-demo",
    type: "registry:component",
    registryDependencies: ["organic-card-small"],

    files: [
      {
        path: "registry/default/example/organic-card-small-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "organic-button-demo",
    type: "registry:component",
    registryDependencies: ["organic-button"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/default/example/organic-button-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "fluted-glass-demo",
    type: "registry:component",
    registryDependencies: [
      "fluted-glass",
      "button",
      "input",
      "label",
      "slider",
    ],
    dependencies: ["@paper-design/shaders-react"],
    files: [
      {
        path: "registry/default/example/fluted-glass-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "speech-bubble-demo",
    type: "registry:component",
    registryDependencies: ["speech-bubble"],

    files: [
      {
        path: "registry/default/example/speech-bubble-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "apple-iphone-17-pro-demo",
    type: "registry:component",
    registryDependencies: ["apple-iphone-17-pro"],

    files: [
      {
        path: "registry/default/example/apple-iphone-17-pro-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "apple-keyboard-demo",
    type: "registry:component",
    registryDependencies: ["apple-keyboard"],

    files: [
      {
        path: "registry/default/example/apple-keyboard-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "apple-watch-ultra-demo",
    type: "registry:component",
    registryDependencies: ["apple-watch-ultra"],

    files: [
      {
        path: "registry/default/example/apple-watch-ultra-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "mac-screen-demo",
    type: "registry:component",
    registryDependencies: ["mac-screen"],

    files: [
      {
        path: "registry/default/example/mac-screen-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "apple-pro-display-xdr-demo",
    type: "registry:component",
    registryDependencies: ["apple-pro-display-xdr"],

    files: [
      {
        path: "registry/default/example/apple-pro-display-xdr-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "marketing-hero-analytics-demo",
    type: "registry:component",
    registryDependencies: ["marketing-hero-analytics"],

    files: [
      {
        path: "registry/default/example/marketing-hero-analytics-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "marketing-feature-code-demo",
    type: "registry:component",
    registryDependencies: ["marketing-feature-code"],

    files: [
      {
        path: "registry/default/example/marketing-feature-code-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "feature-sticky-section-demo",
    type: "registry:component",
    registryDependencies: ["feature-sticky-section"],

    files: [
      {
        path: "registry/default/example/feature-sticky-section-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "analytics-chart-demo",
    type: "registry:component",
    registryDependencies: ["analytics-chart"],

    files: [
      {
        path: "registry/default/example/analytics-chart-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "kanban-board-demo",
    type: "registry:component",
    registryDependencies: ["kanban-board"],
    dependencies: ["motion"],
    files: [
      {
        path: "registry/default/example/kanban-board-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "agent-suggest-card-stack-demo",
    type: "registry:component",
    registryDependencies: ["agent-suggest-card-stack"],

    files: [
      {
        path: "registry/default/example/agent-suggest-card-stack-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "collab-avatar-demo",
    type: "registry:component",
    registryDependencies: ["collab-avatar"],

    files: [
      {
        path: "registry/default/example/collab-avatar-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "collab-toolbar-demo",
    type: "registry:component",
    registryDependencies: ["collab-toolbar"],

    files: [
      {
        path: "registry/default/example/collab-toolbar-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "animated-dropzone-demo",
    type: "registry:component",
    registryDependencies: ["animated-dropzone"],

    files: [
      {
        path: "registry/default/example/animated-dropzone-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "animated-search-demo",
    type: "registry:component",
    registryDependencies: ["animated-search", "button"],

    files: [
      {
        path: "registry/default/example/animated-search-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "globe-demo",
    type: "registry:component",
    registryDependencies: ["globe"],
    dependencies: ["cobe", "motion", "next-themes"],
    files: [
      {
        path: "registry/default/example/globe-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "file-icons-demo",
    type: "registry:component",
    registryDependencies: ["file-icons"],

    files: [
      {
        path: "registry/default/example/file-icons-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "animated-button-demo",
    type: "registry:component",
    registryDependencies: ["animated-button"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/default/example/animated-button-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "copy-button-demo",
    type: "registry:component",
    registryDependencies: ["copy-button"],

    files: [
      {
        path: "registry/default/example/copy-button-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "animated-card-demo",
    type: "registry:component",
    registryDependencies: ["animated-card"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/default/example/animated-card-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "border-beam-card-demo",
    type: "registry:component",
    registryDependencies: ["border-beam-card"],

    files: [
      {
        path: "registry/default/example/border-beam-card-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "animated-tabs-demo",
    type: "registry:component",
    registryDependencies: ["animated-tabs"],

    files: [
      {
        path: "registry/default/example/animated-tabs-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "animated-segmented-demo",
    type: "registry:component",
    registryDependencies: ["animated-segmented"],

    files: [
      {
        path: "registry/default/example/animated-segmented-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "animated-toggle-group-demo",
    type: "registry:component",
    registryDependencies: ["animated-toggle-group"],

    files: [
      {
        path: "registry/default/example/animated-toggle-group-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "animated-notification-demo",
    type: "registry:component",
    registryDependencies: ["animated-notification"],
    dependencies: ["motion"],
    files: [
      {
        path: "registry/default/example/animated-notification-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "animated-toast-demo",
    type: "registry:component",
    registryDependencies: ["animated-toast"],

    files: [
      {
        path: "registry/default/example/animated-toast-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "animated-switch-demo",
    type: "registry:component",
    registryDependencies: ["animated-switch"],

    files: [
      {
        path: "registry/default/example/animated-switch-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "animated-input-demo",
    type: "registry:component",
    registryDependencies: ["animated-input"],

    files: [
      {
        path: "registry/default/example/animated-input-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "animated-field-demo",
    type: "registry:component",
    registryDependencies: ["animated-field"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/default/example/animated-field-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "animated-progress-demo",
    type: "registry:component",
    registryDependencies: ["animated-progress"],

    files: [
      {
        path: "registry/default/example/animated-progress-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "border-beam-input-demo",
    type: "registry:component",
    registryDependencies: ["border-beam-input"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/default/example/border-beam-input-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "animated-badge-demo",
    type: "registry:component",
    registryDependencies: ["animated-badge"],

    files: [
      {
        path: "registry/default/example/animated-badge-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "animated-select-demo",
    type: "registry:component",
    registryDependencies: ["animated-select", "button"],

    files: [
      {
        path: "registry/default/example/animated-select-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "animated-composer-demo",
    type: "registry:component",
    registryDependencies: ["animated-composer"],

    files: [
      {
        path: "registry/default/example/animated-composer-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "wizard-expandable-demo",
    type: "registry:component",
    registryDependencies: [
      "wizard-expandable",
      "button",
      "input",
      "label",
      "textarea",
    ],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/default/example/wizard-expandable-demo.tsx",
        type: "registry:component",
      },
    ],
  },
]
