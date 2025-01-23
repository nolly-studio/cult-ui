import { Registry } from "@/registry/schema"

export const ui: Registry = [
  {
    name: "text-animate",
    type: "components:ui",
    dependencies: ["framer-motion"],
    files: ["ui/text-animate.tsx"],
  },

  {
    name: "texture-button",
    type: "components:ui",
    dependencies: ["@radix-ui/react-slot"],
    files: ["ui/texture-button.tsx"],
  },
  {
    name: "texture-card",
    type: "components:ui",
    dependencies: [""],
    files: ["ui/texture-card.tsx"],
  },
  {
    name: "shift-card",
    type: "components:ui",
    dependencies: [""],
    files: ["ui/shift-card.tsx"],
  },
  {
    name: "minimal-card",
    type: "components:ui",
    dependencies: [""],
    files: ["ui/minimal-card.tsx"],
  },
  {
    name: "dynamic-island",
    type: "components:ui",
    dependencies: ["framer-motion"],
    files: ["ui/dynamic-island.tsx"],
  },
  {
    name: "direction-aware-tabs",
    type: "components:ui",
    dependencies: ["framer-motion", "react-use-measure"],
    files: ["ui/direction-aware-tabs.tsx"],
  },
  {
    name: "bg-animate-button",
    type: "components:ui",
    dependencies: [""],
    files: ["ui/bg-animate-button.tsx"],
  },
  {
    name: "family-button",
    type: "components:ui",
    dependencies: [""],
    files: ["ui/family-button.tsx"],
  },
  {
    name: "side-panel",
    type: "components:ui",
    dependencies: [""],
    files: ["ui/side-panel.tsx"],
  },
  {
    name: "bg-media",
    type: "components:ui",
    dependencies: [""],
    files: ["ui/bg-media.tsx"],
  },
  {
    name: "three-d-carousel",
    type: "components:ui",
    dependencies: [""],
    files: ["ui/three-d-carousel.tsx"],
  },
  {
    name: "tweet-grid",
    type: "components:ui",
    dependencies: [""],
    files: ["ui/tweet-grid.tsx"],
  },
  {
    name: "gradient-heading",
    type: "components:ui",
    dependencies: ["@radix-ui/react-slot"],
    files: ["ui/gradient-heading.tsx"],
  },
  {
    name: "typewriter",
    type: "components:ui",
    dependencies: ["framer-motion"],
    files: ["ui/typewriter.tsx"],
  },
  {
    name: "animated-number",
    type: "components:ui",
    dependencies: ["framer-motion"],
    files: ["ui/animated-number.tsx"],
  },
  {
    name: "sortable-list",
    type: "components:ui",
    dependencies: ["framer-motion, react-use-measure"],
    files: ["ui/sortable-list.tsx"],
  },
  {
    name: "dock",
    type: "components:ui",
    dependencies: ["framer-motion"],
    files: ["ui/dock.tsx"],
  },
  {
    name: "lightboard",
    type: "components:ui",
    dependencies: [""],
    files: ["ui/lightboard.tsx"],
  },
  {
    name: "canvas-fractal-grid",
    type: "components:ui",
    dependencies: ["framer-motion"],
    files: ["ui/canvas-fractal-grid.tsx"],
  },
  {
    name: "bg-animated-fractal-dot-grid",
    type: "components:ui",
    dependencies: ["framer-motion"],
    files: ["ui/bg-animated-fractal-dot-grid.tsx"],
  },
  {
    name: "bg-animated-gradient",
    type: "components:ui",
    dependencies: ["framer-motion"],
    files: ["ui/bg-animated-gradient.tsx"],
  },

  {
    name: "popover",
    type: "components:ui",
    dependencies: ["framer-motion"],
    files: ["ui/popover.tsx"],
  },
  {
    name: "floating-panel",
    type: "components:ui",
    dependencies: ["framer-motion"],
    files: ["ui/floating-panel.tsx"],
  },
  {
    name: "color-picker",
    type: "components:ui",
    dependencies: ["framer-motion"],
    files: ["ui/color-picker.tsx"],
  },

  {
    name: "shader-lens-blur",
    type: "components:ui",
    dependencies: ["framer-motion", "three", "jotai"],
    files: ["ui/shader-lens-blur.tsx"],
  },

  {
    name: "popover-form",
    type: "components:ui",
    dependencies: ["framer-motion"],
    files: ["ui/popover-form.tsx"],
  },
  {
    name: "expandable",
    type: "components:ui",
    dependencies: ["framer-motion"],
    files: ["ui/expandable.tsx"],
  },
  {
    name: "logo-carousel",
    type: "components:ui",
    dependencies: ["framer-motion"],
    files: ["ui/logo-carousel.tsx"],
  },
  {
    name: "loading-carousel",
    type: "components:ui",
    dependencies: ["framer-motion"],
    files: ["ui/loading-carousel.tsx"],
  },
  {
    name: "hover-video-player",
    type: "components:ui",
    dependencies: ["framer-motion"],
    files: ["ui/hover-video-player.tsx"],
  },
  {
    name: "neumorph-eyebrow",
    type: "components:ui",
    dependencies: [""],
    files: ["ui/neumorph-eyebrow.tsx"],
  },
  {
    name: "neumorph-button",
    type: "components:ui",
    dependencies: [""],
    files: ["ui/neumorph-button.tsx"],
  },
  {
    name: "feature-carousel",
    type: "components:ui",
    dependencies: ["framer-motion"],
    files: ["ui/feature-carousel.tsx"],
  },
  {
    name: "intro-disclosure",
    type: "components:ui",
    dependencies: [
      "framer-motion",
      "react-use-measure",
      "button",
      "aspect-ratio",
    ],
    files: ["ui/intro-disclosure.tsx"],
  },
]
