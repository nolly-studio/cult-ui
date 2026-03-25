import type { Registry } from "@/registry/schema"

export const ui: Registry["items"] = [
  {
    name: "text-animate",
    type: "registry:ui",
    dependencies: ["@vueuse/motion"],
    files: [
      {
        path: "registry/default/ui/TextAnimate.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Animated text component with customizable reveal effects and timing",
  },
  {
    name: "cosmic-button",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/CosmicButton.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Animated button/link with cosmic gradient border effect, renders as anchor or button",
  },
  {
    name: "texture-button",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/TextureButton.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Button component with texture overlay effects and customizable variants",
  },
  {
    name: "texture-card",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/TextureCard.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Card component with texture background and customizable styling options",
  },
  {
    name: "timer",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/Timer.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Countdown timer component with customizable duration and visual styles",
  },
  {
    name: "shift-card",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/ShiftCard.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Card component with shift animation effects and hover interactions",
  },
  {
    name: "minimal-card",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/MinimalCard.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Clean and minimal card component with subtle styling and hover effects",
  },
  {
    name: "dynamic-island",
    type: "registry:ui",
    dependencies: ["@vueuse/motion"],
    files: [
      {
        path: "registry/default/ui/DynamicIsland.vue",
        type: "registry:ui",
      },
    ],
    description:
      "iOS-style dynamic island component with expandable content and smooth animations",
  },
  {
    name: "direction-aware-tabs",
    type: "registry:ui",
    dependencies: ["@vueuse/motion", "@vueuse/core"],
    files: [
      {
        path: "registry/default/ui/DirectionAwareTabs.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Tab component with direction-aware animations and smooth transitions",
  },
  {
    name: "bg-animate-button",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/BgAnimateButton.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Button component with animated background effects and gradient transitions",
  },
  {
    name: "family-button",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/FamilyButton.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Button component with family-style design and interactive hover effects",
  },
  {
    name: "side-panel",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/SidePanel.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Sliding side panel component with customizable positioning and animations",
  },
  {
    name: "bg-media",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/BgMedia.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Background media component with video/image support and overlay effects",
  },
  {
    name: "three-d-carousel",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/ThreeDCarousel.vue",
        type: "registry:ui",
      },
    ],
    description:
      "3D carousel component with perspective effects and smooth item transitions",
  },
  {
    name: "tweet-grid",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/TweetGrid.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Grid layout component for displaying tweet-like content cards",
  },
  {
    name: "gradient-heading",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/GradientHeading.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Heading component with gradient text effects and customizable styling",
  },
  {
    name: "typewriter",
    type: "registry:ui",
    dependencies: ["@vueuse/motion"],
    files: [
      {
        path: "registry/default/ui/Typewriter.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Typewriter effect component with customizable typing speed and cursor animation",
  },
  {
    name: "animated-number",
    type: "registry:ui",
    dependencies: ["@vueuse/motion"],
    files: [
      {
        path: "registry/default/ui/AnimatedNumber.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Number component with smooth counting animations and customizable formatting",
  },
  {
    name: "sortable-list",
    type: "registry:ui",
    dependencies: ["@vueuse/motion", "@vueuse/core"],
    files: [
      {
        path: "registry/default/ui/SortableList.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Drag-and-drop sortable list component with smooth animations and reordering",
  },
  {
    name: "dock",
    type: "registry:ui",
    dependencies: ["@vueuse/motion"],
    files: [
      {
        path: "registry/default/ui/Dock.vue",
        type: "registry:ui",
      },
    ],
    description:
      "macOS-style dock component with hover effects and smooth animations",
  },
  {
    name: "lightboard",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/Lightboard.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Interactive lightboard component with customizable grid and lighting effects",
  },
  {
    name: "canvas-fractal-grid",
    type: "registry:ui",
    dependencies: ["@vueuse/motion"],
    files: [
      {
        path: "registry/default/ui/CanvasFractalGrid.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Interactive canvas-based fractal dot grid with mouse tracking and wave effects",
  },
  {
    name: "bg-animated-fractal-dot-grid",
    type: "registry:ui",
    dependencies: ["@vueuse/motion"],
    files: [
      {
        path: "registry/default/ui/BgAnimatedFractalDotGrid.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Background animated fractal dot grid with performance optimization and responsive design",
  },
  {
    name: "bg-animated-gradient",
    type: "registry:ui",
    dependencies: ["@vueuse/motion"],
    files: [
      {
        path: "registry/default/ui/BgAnimatedGradient.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Animated gradient background component with customizable color transitions",
  },
  {
    name: "bg-image-texture",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/BgImageTexture.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Background texture component with multiple texture variants and customizable opacity",
  },
  {
    name: "popover",
    type: "registry:ui",
    dependencies: ["@vueuse/motion"],
    files: [
      {
        path: "registry/default/ui/Popover.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Animated popover component with form support and smooth transitions",
  },
  {
    name: "floating-panel",
    type: "registry:ui",
    dependencies: ["@vueuse/motion"],
    files: [
      {
        path: "registry/default/ui/FloatingPanel.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Floating panel component with backdrop blur and position-aware animations",
  },
  {
    name: "color-picker",
    type: "registry:ui",
    dependencies: ["@vueuse/motion"],
    files: [
      {
        path: "registry/default/ui/ColorPicker.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Interactive color picker component with HSL support and preset colors",
  },
  {
    name: "shader-lens-blur",
    type: "registry:ui",
    dependencies: ["@vueuse/motion", "three"],
    files: [
      {
        path: "registry/default/ui/ShaderLensBlur.vue",
        type: "registry:ui",
      },
    ],
    description:
      "WebGL shader component with lens blur effects and mouse interaction",
  },
  {
    name: "popover-form",
    type: "registry:ui",
    dependencies: ["@vueuse/motion"],
    files: [
      {
        path: "registry/default/ui/PopoverForm.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Form popover component with success states and animated transitions",
  },
  {
    name: "expandable",
    type: "registry:ui",
    dependencies: ["@vueuse/motion"],
    files: [
      {
        path: "registry/default/ui/Expandable.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Expandable component system with smooth animations and customizable presets",
  },
  {
    name: "logo-carousel",
    type: "registry:ui",
    dependencies: ["@vueuse/motion"],
    files: [
      {
        path: "registry/default/ui/LogoCarousel.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Animated logo carousel with staggered animations and customizable columns",
  },
  {
    name: "loading-carousel",
    type: "registry:ui",
    dependencies: ["@vueuse/motion"],
    files: [
      {
        path: "registry/default/ui/LoadingCarousel.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Loading carousel component with smooth transitions and customizable content",
  },
  {
    name: "hover-video-player",
    type: "registry:ui",
    dependencies: ["@vueuse/motion"],
    files: [
      {
        path: "registry/default/ui/HoverVideoPlayer.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Video player component that plays on hover with smooth animations",
  },
  {
    name: "neumorph-eyebrow",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/NeumorphEyebrow.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Neumorphic eyebrow component with soft shadow effects and modern styling",
  },
  {
    name: "neumorph-button",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/NeumorphButton.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Neumorphic button component with soft shadows and tactile interaction effects",
  },
  {
    name: "feature-carousel",
    type: "registry:ui",
    dependencies: ["@vueuse/motion"],
    files: [
      {
        path: "registry/default/ui/FeatureCarousel.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Feature carousel component with smooth transitions and customizable layouts",
  },
  {
    name: "choice-poll",
    type: "registry:ui",
    dependencies: ["lucide-vue-next"],
    files: [
      {
        path: "registry/default/ui/ChoicePoll.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Poll component with single or multiple selection, optional results, and keyboard navigation",
  },
  {
    name: "vote-tally",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/VoteTally.vue",
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
      "class-variance-authority",
      "lucide-vue-next",
      "@vueuse/motion",
    ],
    files: [
      {
        path: "registry/default/ui/PollWidget.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Poll widget with inline, popover, and dialog modes, optional results, and animations",
  },
  {
    name: "prompt-library",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/PromptLibrary.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Browse, insert, and manage prompt templates with categories and custom prompts",
  },
  {
    name: "ai-instructions",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/AiInstructions.vue",
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
    dependencies: ["@vueuse/motion", "@vueuse/core"],
    files: [
      {
        path: "registry/default/ui/IntroDisclosure.vue",
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
        path: "registry/default/ui/TextGif.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Text component with GIF-like animation effects and customizable styling",
  },
  {
    name: "stripe-bg-guides",
    type: "registry:ui",
    dependencies: ["@vueuse/motion"],
    files: [
      {
        path: "registry/default/ui/StripeBgGuides.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Stripe-style background guides component with animated patterns and effects",
  },
  {
    name: "youtube-video-player",
    type: "registry:ui",
    dependencies: ["@vueuse/motion"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/default/ui/YoutubeVideoPlayer.vue",
        type: "registry:ui",
      },
    ],
    description:
      "YouTube video player component with custom controls and smooth animations",
  },
  {
    name: "toolbar-expandable",
    type: "registry:ui",
    dependencies: ["@vueuse/motion"],
    registryDependencies: ["badge"],
    files: [
      {
        path: "registry/default/ui/ToolbarExpandable.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Expandable toolbar component with step-based navigation, smooth animations, and enhanced scrolling",
  },
  {
    name: "texture-overlay",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/TextureOverlay.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Texture overlay component with various CSS gradient patterns for adding visual texture to backgrounds",
  },
  {
    name: "squiggle-arrow",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/SquiggleArrow.vue",
        type: "registry:ui",
      },
    ],
    description:
      "A playful, hand-drawn squiggly arrow component with customizable variants, directions, and sizes",
  },
  {
    name: "code-block",
    type: "registry:ui",
    dependencies: ["@vueuse/motion"],
    files: [
      {
        path: "registry/default/ui/CodeBlock.vue",
        type: "registry:ui",
      },
    ],
    description:
      "A beautiful code block component with tabs, copy functionality, and smooth animations",
  },
  {
    name: "mock-browser-window",
    type: "registry:ui",
    registryDependencies: ["texture-overlay"],
    files: [
      {
        path: "registry/default/ui/MockBrowserWindow.vue",
        type: "registry:ui",
      },
    ],
    description:
      "A customizable browser window mockup component with support for Chrome, Safari, and generic styles, customizable sidebars, and themes",
  },
  {
    name: "morph-surface",
    type: "registry:ui",
    dependencies: ["@vueuse/motion"],
    files: [
      {
        path: "registry/default/ui/MorphSurface.vue",
        type: "registry:ui",
      },
    ],
    description:
      "A morphing surface component with smooth animations, customizable dimensions, and configurable content",
  },
  {
    name: "distorted-glass",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/DistortedGlass.vue",
        type: "registry:ui",
      },
    ],
    description:
      "A glass morphism effect component using SVG filters with fractal noise to create visual transitions between sections",
  },
  {
    name: "family-drawer",
    type: "registry:ui",
    dependencies: ["@vueuse/motion", "@vueuse/core", "vaul-vue"],
    files: [
      {
        path: "registry/default/ui/FamilyDrawer.vue",
        type: "registry:ui",
      },
    ],
    description:
      "A multi-view drawer component with smooth animations, view navigation, and customizable content views",
  },
  {
    name: "expandable-screen",
    type: "registry:ui",
    dependencies: ["@vueuse/motion", "lucide-vue-next"],
    files: [
      {
        path: "registry/default/ui/ExpandableScreen.vue",
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
        path: "registry/default/ui/PixelHeadingCharacter.vue",
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
        path: "registry/default/ui/PixelHeadingWord.vue",
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
        path: "registry/default/ui/PixelParagraphWordsInverse.vue",
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
        path: "registry/default/ui/PixelParagraphWords.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Paragraph where specific words render in an interactive pixel font that swaps or cycles on hover",
  },
  {
    name: "onboarding",
    type: "registry:ui",
    dependencies: ["class-variance-authority"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/default/ui/Onboarding.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Composable multi-step onboarding primitives: Onboarding root with step navigation, FeatureCarousel, ChoiceGroup radio selector, TipsList, and StepIndicator with dots and pills variants",
  },
  {
    name: "gradient-button-group",
    type: "registry:ui",
    dependencies: ["@vueuse/motion"],
    files: [
      {
        path: "registry/default/ui/GradientButtonGroup.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Premium layered button group with animated active state, gradient ring accents, and theme toggle underlay",
  },
  {
    name: "terminal-animation",
    type: "registry:ui",
    files: [
      {
        path: "registry/default/ui/TerminalAnimation.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Composable terminal animation primitives with typed command playback, tabbed scenarios, and customizable output rendering",
  },
  {
    name: "hero-dithering",
    type: "registry:ui",
    dependencies: ["@paper-design/shaders-vue"],
    registryDependencies: ["badge", "button"],
    files: [
      {
        path: "registry/default/ui/HeroDithering.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Split-layout hero section with responsive dithering shader visuals, CTA, and tech stack badges",
  },
  {
    name: "hero-color-panel",
    type: "registry:ui",
    dependencies: ["@paper-design/shaders-vue"],
    registryDependencies: ["badge", "button"],
    files: [
      {
        path: "registry/default/ui/HeroColorPanel.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Split-layout hero section with responsive ColorPanels shader visuals, CTA, and tech stack badges",
  },
  {
    name: "hero-static-radial-gradient",
    type: "registry:ui",
    dependencies: ["@paper-design/shaders-vue"],
    registryDependencies: ["badge", "button"],
    files: [
      {
        path: "registry/default/ui/HeroStaticRadialGradient.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Split-layout hero section with responsive StaticRadialGradient shader visuals, CTA, and tech stack badges",
  },
  {
    name: "hero-heatmap",
    type: "registry:ui",
    dependencies: ["@paper-design/shaders-vue"],
    registryDependencies: ["badge", "button"],
    files: [
      {
        path: "registry/default/ui/HeroHeatmap.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Split-layout hero section with responsive Heatmap shader visuals, CTA, and tech stack badges",
  },
  {
    name: "hero-liquid-metal",
    type: "registry:ui",
    dependencies: ["@paper-design/shaders-vue"],
    registryDependencies: ["badge", "button"],
    files: [
      {
        path: "registry/default/ui/HeroLiquidMetal.vue",
        type: "registry:ui",
      },
    ],
    description:
      "Split-layout hero section with responsive LiquidMetal shader visuals, CTA, and tech stack badges",
  },
]
