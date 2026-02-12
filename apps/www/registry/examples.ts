import { type Registry } from "@/registry/schema"

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
]
