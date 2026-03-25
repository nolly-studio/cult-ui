import type { Registry } from "@/registry/schema"

export const examples: Registry["items"] = [
  {
    name: "text-animate-demo",
    type: "registry:component",
    registryDependencies: ["text-animate"],
    files: [
      {
        path: "registry/default/example/TextAnimateDemo.vue",
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
        path: "registry/default/example/CosmicButtonDemo.vue",
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
        path: "registry/default/example/TextureButtonDemo.vue",
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
        path: "registry/default/example/TextureCardDemo.vue",
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
        path: "registry/default/example/TimerDemo.vue",
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
        path: "registry/default/example/ShiftCardDemo.vue",
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
        path: "registry/default/example/MinimalCardDemo.vue",
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
        path: "registry/default/example/DynamicIslandDemo.vue",
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
        path: "registry/default/example/DirectionAwareTabsDemo.vue",
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
        path: "registry/default/example/BgAnimateButtonDemo.vue",
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
        path: "registry/default/example/FamilyButtonDemo.vue",
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
        path: "registry/default/example/SidePanelDemo.vue",
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
        path: "registry/default/example/BgMediaDemo.vue",
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
        path: "registry/default/example/BgImageTextureDemo.vue",
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
        path: "registry/default/example/ThreeDCarouselDemo.vue",
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
        path: "registry/default/example/TweetGridDemo.vue",
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
        path: "registry/default/example/GradientHeadingDemo.vue",
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
        path: "registry/default/example/TypewriterDemo.vue",
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
        path: "registry/default/example/AnimatedNumberDemo.vue",
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
        path: "registry/default/example/SortableListDemo.vue",
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
        path: "registry/default/example/DockDemo.vue",
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
        path: "registry/default/example/LightboardDemo.vue",
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
        path: "registry/default/example/CanvasFractalGridDemo.vue",
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
        path: "registry/default/example/BgAnimatedFractalDotGridDemo.vue",
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
        path: "registry/default/example/BgAnimatedGradientDemo.vue",
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
        path: "registry/default/example/PopoverDemo.vue",
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
        path: "registry/default/example/FloatingPanelDemo.vue",
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
        path: "registry/default/example/ColorPickerDemo.vue",
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
        path: "registry/default/example/ShaderLensBlurDemo.vue",
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
        path: "registry/default/example/PopoverFormDemo.vue",
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
        path: "registry/default/example/ExpandableDemo.vue",
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
        path: "registry/default/example/LogoCarouselDemo.vue",
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
        path: "registry/default/example/LoadingCarouselDemo.vue",
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
        path: "registry/default/example/HoverVideoPlayerDemo.vue",
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
        path: "registry/default/example/NeumorphEyebrowDemo.vue",
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
        path: "registry/default/example/NeumorphButtonDemo.vue",
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
        path: "registry/default/example/FeatureCarouselDemo.vue",
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
        path: "registry/default/example/ChoicePollDemo.vue",
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
        path: "registry/default/example/VoteTallyDemo.vue",
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
        path: "registry/default/example/PollWidgetDemo.vue",
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
        path: "registry/default/example/PromptLibraryDemo.vue",
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
        path: "registry/default/example/AiInstructionsDemo.vue",
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
        path: "registry/default/example/IntroDisclosureDemo.vue",
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
        path: "registry/default/example/TextGifDemo.vue",
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
        path: "registry/default/example/StripeBgGuidesDemo.vue",
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
        path: "registry/default/example/YoutubeVideoPlayerDemo.vue",
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
        path: "registry/default/example/ToolbarExpandableDemo.vue",
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
        path: "registry/default/example/TextureOverlayDemo.vue",
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
        path: "registry/default/example/SquiggleArrowDemo.vue",
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
        path: "registry/default/example/CodeBlockDemo.vue",
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
        path: "registry/default/example/MockBrowserWindowDemo.vue",
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
        path: "registry/default/example/MorphSurfaceDemo.vue",
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
        path: "registry/default/example/DistortedGlassDemo.vue",
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
        path: "registry/default/example/FamilyDrawerDemo.vue",
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
        path: "registry/default/example/ExpandableScreenDemo.vue",
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
        path: "registry/default/example/PixelHeadingCharacterDemo.vue",
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
        path: "registry/default/example/PixelHeadingWordDemo.vue",
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
        path: "registry/default/example/PixelParagraphWordsInverseDemo.vue",
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
        path: "registry/default/example/PixelParagraphWordsDemo.vue",
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
        path: "registry/default/example/OnboardingDemo.vue",
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
        path: "registry/default/example/GradientButtonGroupDemo.vue",
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
        path: "registry/default/example/TerminalAnimationDemo.vue",
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
        path: "registry/default/example/HeroDitheringDemo.vue",
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
        path: "registry/default/example/HeroColorPanelsDemo.vue",
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
        path: "registry/default/example/HeroStaticRadialGradientDemo.vue",
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
        path: "registry/default/example/HeroHeatmapDemo.vue",
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
        path: "registry/default/example/HeroLiquidMetalDemo.vue",
        type: "registry:component",
      },
    ],
  },
]
