import { type Registry } from "shadcn/registry"

export const ui: Registry["items"] = [
  {
    name: "text-animate",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/default/ui/text-animate.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "texture-button",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-slot"],
    files: [
      {
        path: "registry/default/ui/texture-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "texture-card",
    type: "registry:ui",
    dependencies: [""],
    files: [
      {
        path: "registry/default/ui/texture-card.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "shift-card",
    type: "registry:ui",
    dependencies: [""],
    files: [
      {
        path: "registry/default/ui/shift-card.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "minimal-card",
    type: "registry:ui",
    dependencies: [""],
    files: [
      {
        path: "registry/default/ui/minimal-card.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dynamic-island",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/default/ui/dynamic-island.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "direction-aware-tabs",
    type: "registry:ui",
    dependencies: ["framer-motion", "react-use-measure"],
    files: [
      {
        path: "registry/default/ui/direction-aware-tabs.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "bg-animate-button",
    type: "registry:ui",
    dependencies: [""],
    files: [
      {
        path: "registry/default/ui/bg-animate-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "family-button",
    type: "registry:ui",
    dependencies: [""],
    files: [
      {
        path: "registry/default/ui/family-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "side-panel",
    type: "registry:ui",
    dependencies: [""],
    files: [
      {
        path: "registry/default/ui/side-panel.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "bg-media",
    type: "registry:ui",
    dependencies: [""],
    files: [
      {
        path: "registry/default/ui/bg-media.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "three-d-carousel",
    type: "registry:ui",
    dependencies: [""],
    files: [
      {
        path: "registry/default/ui/three-d-carousel.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "tweet-grid",
    type: "registry:ui",
    dependencies: [""],
    files: [
      {
        path: "registry/default/ui/tweet-grid.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "gradient-heading",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-slot"],
    files: [
      {
        path: "registry/default/ui/gradient-heading.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "typewriter",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/default/ui/typewriter.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "animated-number",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/default/ui/animated-number.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "sortable-list",
    type: "registry:ui",
    dependencies: ["framer-motion", "react-use-measure"],
    files: [
      {
        path: "registry/default/ui/sortable-list.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dock",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/default/ui/dock.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "lightboard",
    type: "registry:ui",
    dependencies: [""],
    files: [
      {
        path: "registry/default/ui/lightboard.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "canvas-fractal-grid",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/default/ui/canvas-fractal-grid.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "bg-animated-fractal-dot-grid",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/default/ui/bg-animated-fractal-dot-grid.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "bg-animated-gradient",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/default/ui/bg-animated-gradient.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "popover",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/default/ui/popover.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "floating-panel",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/default/ui/floating-panel.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "color-picker",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/default/ui/color-picker.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "shader-lens-blur",
    type: "registry:ui",
    dependencies: ["framer-motion", "three", "jotai"],
    files: [
      {
        path: "registry/default/ui/shader-lens-blur.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "popover-form",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/default/ui/popover-form.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "expandable",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/default/ui/expandable.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "logo-carousel",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/default/ui/logo-carousel.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "loading-carousel",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/default/ui/loading-carousel.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "hover-video-player",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/default/ui/hover-video-player.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "neumorph-eyebrow",
    type: "registry:ui",
    dependencies: [""],
    files: [
      {
        path: "registry/default/ui/neumorph-eyebrow.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "neumorph-button",
    type: "registry:ui",
    dependencies: [""],
    files: [
      {
        path: "registry/default/ui/neumorph-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "feature-carousel",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/default/ui/feature-carousel.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "intro-disclosure",
    type: "registry:ui",
    dependencies: [
      "framer-motion",
      "react-use-measure",
      "button",
      "aspect-ratio",
    ],
    files: [
      {
        path: "registry/default/ui/intro-disclosure.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "text-gif",
    type: "registry:ui",
    dependencies: ["next/image", "framer-motion"],
    files: [
      {
        path: "registry/default/ui/text-gif.tsx",
        type: "registry:ui",
      },
    ],
  },
]
