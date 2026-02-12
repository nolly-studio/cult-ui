import { type Registry } from "@/registry/schema"

export const ui: Registry["items"] = [
  {
    name: "text-animate",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/default/ui/text-animate.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Animated text component with customizable reveal effects and timing",
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
    description:
      "Button component with texture overlay effects and customizable variants",
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
    description:
      "Card component with texture background and customizable styling options",
  },
  {
    name: "timer",
    type: "registry:ui",
    dependencies: [""],
    files: [
      {
        path: "registry/default/ui/timer.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Countdown timer component with customizable duration and visual styles",
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
    description:
      "Card component with shift animation effects and hover interactions",
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
    description:
      "Clean and minimal card component with subtle styling and hover effects",
  },
  {
    name: "dynamic-island",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/default/ui/dynamic-island.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "iOS-style dynamic island component with expandable content and smooth animations",
  },
  {
    name: "direction-aware-tabs",
    type: "registry:ui",
    dependencies: ["motion", "react-use-measure"],
    files: [
      {
        path: "registry/default/ui/direction-aware-tabs.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Tab component with direction-aware animations and smooth transitions",
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
    description:
      "Button component with animated background effects and gradient transitions",
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
    description:
      "Button component with family-style design and interactive hover effects",
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
    description:
      "Sliding side panel component with customizable positioning and animations",
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
    description:
      "Background media component with video/image support and overlay effects",
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
    description:
      "3D carousel component with perspective effects and smooth item transitions",
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
    description:
      "Grid layout component for displaying tweet-like content cards",
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
    description:
      "Heading component with gradient text effects and customizable styling",
  },
  {
    name: "typewriter",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/default/ui/typewriter.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Typewriter effect component with customizable typing speed and cursor animation",
  },
  {
    name: "animated-number",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/default/ui/animated-number.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Number component with smooth counting animations and customizable formatting",
  },
  {
    name: "sortable-list",
    type: "registry:ui",
    dependencies: ["motion", "react-use-measure"],
    files: [
      {
        path: "registry/default/ui/sortable-list.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Drag-and-drop sortable list component with smooth animations and reordering",
  },
  {
    name: "dock",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/default/ui/dock.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "macOS-style dock component with hover effects and smooth animations",
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
    description:
      "Interactive lightboard component with customizable grid and lighting effects",
  },
  {
    name: "canvas-fractal-grid",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/default/ui/canvas-fractal-grid.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Interactive canvas-based fractal dot grid with mouse tracking and wave effects",
  },
  {
    name: "bg-animated-fractal-dot-grid",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/default/ui/bg-animated-fractal-dot-grid.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Background animated fractal dot grid with performance optimization and responsive design",
  },
  {
    name: "bg-animated-gradient",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/default/ui/bg-animated-gradient.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Animated gradient background component with customizable color transitions",
  },
  {
    name: "bg-image-texture",
    type: "registry:ui",
    dependencies: [""],
    files: [
      {
        path: "registry/default/ui/bg-image-texture.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Background texture component with multiple texture variants and customizable opacity",
  },
  {
    name: "popover",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/default/ui/popover.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Animated popover component with form support and smooth transitions",
  },
  {
    name: "floating-panel",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/default/ui/floating-panel.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Floating panel component with backdrop blur and position-aware animations",
  },
  {
    name: "color-picker",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/default/ui/color-picker.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Interactive color picker component with HSL support and preset colors",
  },
  {
    name: "shader-lens-blur",
    type: "registry:ui",
    dependencies: ["motion", "three", "jotai"],
    files: [
      {
        path: "registry/default/ui/shader-lens-blur.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "WebGL shader component with lens blur effects and mouse interaction",
  },
  {
    name: "popover-form",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/default/ui/popover-form.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Form popover component with success states and animated transitions",
  },
  {
    name: "expandable",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/default/ui/expandable.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Expandable component system with smooth animations and customizable presets",
  },
  {
    name: "logo-carousel",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/default/ui/logo-carousel.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Animated logo carousel with staggered animations and customizable columns",
  },
  {
    name: "loading-carousel",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/default/ui/loading-carousel.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Loading carousel component with smooth transitions and customizable content",
  },
  {
    name: "hover-video-player",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/default/ui/hover-video-player.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Video player component that plays on hover with smooth animations",
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
    description:
      "Neumorphic eyebrow component with soft shadow effects and modern styling",
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
    description:
      "Neumorphic button component with soft shadows and tactile interaction effects",
  },
  {
    name: "feature-carousel",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/default/ui/feature-carousel.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Feature carousel component with smooth transitions and customizable layouts",
  },
  {
    name: "choice-poll",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-use-controllable-state", "lucide-react"],
    files: [
      {
        path: "registry/default/ui/choice-poll.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Poll component with single or multiple selection, optional results, and keyboard navigation",
  },
  {
    name: "vote-tally",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-use-controllable-state"],
    files: [
      {
        path: "registry/default/ui/vote-tally.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "List of items with up-vote support, optional sorting by vote count, and controlled or uncontrolled state",
  },
  {
    name: "poll-widget",
    type: "registry:ui",
    dependencies: [
      "@radix-ui/react-use-controllable-state",
      "class-variance-authority",
      "lucide-react",
      "motion",
    ],
    files: [
      {
        path: "registry/default/ui/poll-widget.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Poll widget with inline, popover, and dialog modes, optional results, and animations",
  },
  {
    name: "prompt-library",
    type: "registry:ui",
    dependencies: ["@hugeicons/core-free-icons", "@hugeicons/react"],
    files: [
      {
        path: "registry/default/ui/prompt-library.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Browse, insert, and manage prompt templates with categories and custom prompts",
  },
  {
    name: "ai-instructions",
    type: "registry:ui",
    dependencies: ["@hugeicons/core-free-icons", "@hugeicons/react"],
    files: [
      {
        path: "registry/default/ui/ai-instructions.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Manage and toggle AI instructions with a popover, search, and create-dialog",
  },
  {
    name: "intro-disclosure",
    type: "registry:ui",
    registryDependencies: ["button", "aspect-ratio"],
    dependencies: ["motion", "react-use-measure"],
    files: [
      {
        path: "registry/default/ui/intro-disclosure.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Intro disclosure component with expandable content and smooth animations",
  },
  {
    name: "text-gif",
    type: "registry:ui",
    dependencies: [],
    files: [
      {
        path: "registry/default/ui/text-gif.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Text component with GIF-like animation effects and customizable styling",
  },
  {
    name: "stripe-bg-guides",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/default/ui/stripe-bg-guides.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Stripe-style background guides component with animated patterns and effects",
  },
  {
    name: "youtube-video-player",
    type: "registry:ui",
    dependencies: ["motion"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/default/ui/youtube-video-player.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "YouTube video player component with custom controls and smooth animations",
  },
  {
    name: "toolbar-expandable",
    type: "registry:ui",
    dependencies: ["motion", "@radix-ui/react-scroll-area"],
    registryDependencies: ["badge"],
    files: [
      {
        path: "registry/default/ui/toolbar-expandable.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Expandable toolbar component with step-based navigation, smooth animations, and enhanced scrolling",
  },
  {
    name: "texture-overlay",
    type: "registry:ui",
    dependencies: [""],
    files: [
      {
        path: "registry/default/ui/texture-overlay.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Texture overlay component with various CSS gradient patterns for adding visual texture to backgrounds",
  },
  {
    name: "squiggle-arrow",
    type: "registry:ui",
    dependencies: [""],
    files: [
      {
        path: "registry/default/ui/squiggle-arrow.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "A playful, hand-drawn squiggly arrow component with customizable variants, directions, and sizes",
  },
  {
    name: "code-block",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/default/ui/code-block.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "A beautiful code block component with tabs, copy functionality, and smooth animations",
  },
  {
    name: "mock-browser-window",
    type: "registry:ui",
    dependencies: [""],
    registryDependencies: ["texture-overlay"],
    files: [
      {
        path: "registry/default/ui/mock-browser-window.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "A customizable browser window mockup component with support for Chrome, Safari, and generic styles, customizable sidebars, and themes",
  },
  {
    name: "morph-surface",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/default/ui/morph-surface.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "A morphing surface component with smooth animations, customizable dimensions, and configurable content",
  },
  {
    name: "distorted-glass",
    type: "registry:ui",
    dependencies: [""],
    files: [
      {
        path: "registry/default/ui/distorted-glass.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "A glass morphism effect component using SVG filters with fractal noise to create visual transitions between sections",
  },
  {
    name: "family-drawer",
    type: "registry:ui",
    dependencies: [
      "motion",
      "react-use-measure",
      "vaul",
      "@radix-ui/react-slot",
    ],
    files: [
      {
        path: "registry/default/ui/family-drawer.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "A multi-view drawer component with smooth animations, view navigation, and customizable content views",
  },
  {
    name: "expandable-screen",
    type: "registry:ui",
    dependencies: ["motion", "lucide-react"],
    files: [
      {
        path: "registry/default/ui/expandable-screen.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "A full-screen expandable component with morphing animations using shared layout IDs for smooth transitions",
  },
  {
    name: "pixel-heading-character",
    type: "registry:ui",
    dependencies: ["geist"],
    files: [
      {
        path: "registry/default/ui/pixel-heading-character.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Per-character pixel-font heading with four animation modes using Geist pixel fonts",
  },
  {
    name: "pixel-heading-word",
    type: "registry:ui",
    dependencies: ["geist"],
    files: [
      {
        path: "registry/default/ui/pixel-heading-word.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Whole-word pixel-font heading that swaps or cycles fonts on hover using Geist pixel fonts",
  },
  {
    name: "pixel-paragraph-words-inverse",
    type: "registry:ui",
    dependencies: ["geist"],
    files: [
      {
        path: "registry/default/ui/pixel-paragraph-words-inverse.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Paragraph in pixel font where specific words escape into interactive sans/mono with hover swap or cycle",
  },
  {
    name: "pixel-paragraph-words",
    type: "registry:ui",
    dependencies: ["geist"],
    files: [
      {
        path: "registry/default/ui/pixel-paragraph-words.tsx",
        type: "registry:ui",
      },
    ],
    description:
      "Paragraph where specific words render in an interactive pixel font that swaps or cycles on hover",
  },
]
