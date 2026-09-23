import type { MainNavItem, SidebarNavItem } from "types/nav";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Components",
      href: "/docs/components/dynamic-island",
    },
    {
      title: "Themes",
      href: "/themes",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
        {
          title: "MCP Server",
          href: "/docs/mcp-server",
          items: [],
        },
        {
          title: "Changelog",
          href: "/docs/changelog",
          items: [],
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Marketing & Heroes",
          items: [
            {
              title: "Hero Dithering",
              href: "/docs/components/hero-dithering",
              items: [],
            },
            {
              title: "Hero Color Panels",
              href: "/docs/components/hero-color-panels",
              items: [],
            },
            {
              title: "Hero Heatmap",
              href: "/docs/components/hero-heatmap",
              items: [],
            },
            {
              title: "Hero Liquid Metal",
              href: "/docs/components/hero-liquid-metal",
              items: [],
            },
            {
              title: "Hero Static Radial Gradient",
              href: "/docs/components/hero-static-radial-gradient",
              items: [],
            },
            {
              title: "Bg Media Hero",
              href: "/docs/components/bg-media",
              items: [],
            },
            {
              title: "Logo Carousel",
              href: "/docs/components/logo-carousel",
              items: [],
            },
            {
              title: "Tweet Grid",
              href: "/docs/components/tweet-grid",
              items: [],
            },
            {
              title: "Gradient Heading",
              href: "/docs/components/gradient-heading",
              items: [],
            },
          ],
        },
        {
          title: "Buttons",
          items: [
            {
              title: "Neumorph Button",
              href: "/docs/components/neumorph-button",
              items: [],
            },
            {
              title: "Texture Button",
              href: "/docs/components/texture-button",
              label: "updated",
              items: [],
            },
            {
              title: "Bg Animate Button",
              href: "/docs/components/bg-animate-button",
              items: [],
            },
            {
              title: "Border Beam Button",
              href: "/docs/components/border-beam-button",
              items: [],
              label: "recent",
            },
            {
              title: "Metal Button",
              href: "/docs/components/metal-button",
              items: [],
              label: "new",
            },
            {
              title: "Cosmic Button",
              href: "/docs/components/cosmic-button",

              items: [],
            },
            {
              title: "Gradient Button Group",
              href: "/docs/components/gradient-button-group",
              items: [],
            },
          ],
        },
        {
          title: "Expandable Widgets",
          items: [
            {
              title: "Dynamic Island",
              href: "/docs/components/dynamic-island",
              items: [],
            },
            {
              title: "Onboarding",
              href: "/docs/components/onboarding",
              items: [],
            },
            {
              title: "Family Button",
              href: "/docs/components/family-button",
              items: [],
            },
            {
              title: "Toolbar Expandable",
              href: "/docs/components/toolbar-expandable",
              items: [],
            },
            {
              title: "Expandable Screen",
              href: "/docs/components/expandable-screen",
              items: [],
              label: "updated",
            },
            {
              title: "Expandable Card",
              href: "/docs/components/expandable",
              items: [],
            },
            {
              title: "Morph Surface",
              href: "/docs/components/morph-surface",
              items: [],
            },
            {
              title: "Side Panel",
              href: "/docs/components/side-panel",
              items: [],
            },
            {
              title: "Family Drawer",
              href: "/docs/components/family-drawer",
              items: [],
            },
            {
              title: "Intro Disclosure",
              href: "/docs/components/intro-disclosure",
              items: [],
            },
          ],
        },
        {
          title: "Cards & Surfaces",
          items: [
            {
              title: "Minimal Card",
              href: "/docs/components/minimal-card",
              items: [],
            },
            {
              title: "Cutout Card",
              href: "/docs/components/cutout-card",
              label: "recent",
              items: [],
            },
            {
              title: "Neumorph Eyebrow",
              href: "/docs/components/neumorph-eyebrow",
              items: [],
            },
            {
              title: "Texture Card",
              href: "/docs/components/texture-card",
              items: [],
            },
            {
              title: "Shift Card",
              href: "/docs/components/shift-card",
              items: [],
            },
          ],
        },
        {
          title: "Frames & Mockups",
          items: [
            {
              title: "Browser Window",
              href: "/docs/components/mock-browser-window",
              items: [],
            },
            {
              title: "Code Block",
              href: "/docs/components/code-block",
              items: [],
              label: "updated",
            },
            {
              title: "Terminal Animation",
              href: "/docs/components/terminal-animation",
              items: [],
            },
          ],
        },
        {
          title: "Textures & Overlays",
          items: [
            {
              title: "Texture Overlay",
              href: "/docs/components/texture-overlay",
              items: [],
            },
            {
              title: "Distorted Glass",
              href: "/docs/components/distorted-glass",
              items: [],
            },
            {
              title: "Background Texture",
              href: "/docs/components/bg-image-texture",
              items: [],
            },
            {
              title: "Edge Blur",
              href: "/docs/components/edge-blur",
              items: [],
              label: "recent",
            },
            {
              title: "Dither Image",
              href: "/docs/components/dither-image",
              items: [],
              label: "recent",
            },
          ],
        },
        {
          title: "Visual Systems",
          items: [
            {
              title: "Grid Beam",
              href: "/docs/components/grid-beam",
              items: [],
              label: "recent",
            },
            {
              title: "Fractal Grid",
              href: "/docs/components/bg-animated-fractal-grid",
              items: [],
            },
            {
              title: "Canvas Fractal Grid",
              href: "/docs/components/canvas-fractal-grid",
              items: [],
            },
            {
              title: "Stripe Bg Guides",
              href: "/docs/components/stripe-bg-guides",
              items: [],
            },
            {
              title: "LightBoard",
              href: "/docs/components/lightboard",
              items: [],
            },
            {
              title: "Shader Lens Blur",
              href: "/docs/components/shader-lens-blur",

              items: [],
            },
            {
              title: "SVG Shapes",
              href: "/docs/components/svg-shapes",
              items: [],
              label: "recent",
            },
            {
              title: "SVG Shapes Animated",
              href: "/docs/components/svg-shapes-animated",
              items: [],
              label: "recent",
            },
            {
              title: "SVG Bands",
              href: "/docs/components/svg-bands",
              items: [],
              label: "recent",
            },
          ],
        },
        {
          title: "Navigation & Floating UI",
          items: [
            {
              title: "Direction Aware Tabs",
              href: "/docs/components/direction-aware-tabs",
              items: [],
            },
            {
              title: "Floating Panel",
              href: "/docs/components/floating-panel",
              items: [],
            },
            {
              title: "Popover",
              href: "/docs/components/popover",
              items: [],
            },
            {
              title: "Popover Form",
              href: "/docs/components/popover-form",
              items: [],
            },
            {
              title: "MacOS Dock",
              href: "/docs/components/dock",
              items: [],
            },
          ],
        },
        {
          title: "Inputs & Decision UI",
          items: [
            {
              title: "Color Picker",
              href: "/docs/components/color-picker",
              items: [],
            },
            {
              title: "Choice Poll",
              href: "/docs/components/choice-poll",
              items: [],
            },
            {
              title: "Feature Poll",
              href: "/docs/components/feature-poll",
              items: [],
            },
            {
              title: "Feature Voting",
              href: "/docs/components/feature-voting",
              items: [],
            },
            {
              title: "Vote Tally",
              href: "/docs/components/vote-tally",
              items: [],
            },
            {
              title: "Poll Widget",
              href: "/docs/components/poll-widget",
              items: [],
            },
          ],
        },
        {
          title: "AI & Productivity Widgets",
          items: [
            {
              title: "Prompt Library",
              href: "/docs/components/prompt-library",
              items: [],
            },
            {
              title: "AI Instructions",
              href: "/docs/components/ai-instructions",
              items: [],
            },
            {
              title: "Timer",
              href: "/docs/components/timer",
              items: [],
            },
            {
              title: "Sortable List",
              href: "/docs/components/sortable-list",
              items: [],
            },
          ],
        },
        {
          title: "Media",
          items: [
            {
              title: "3D Carousel",
              href: "/docs/components/three-d-carousel",
              items: [],
            },
            {
              title: "Hover Video Player",
              href: "/docs/components/hover-video-player",
              items: [],
              label: "updated",
            },
            {
              title: "YouTube Video Player",
              href: "/docs/components/youtube-video-player",
              items: [],
            },
            {
              title: "Feature Carousel",
              href: "/docs/components/feature-carousel",
              items: [],
            },
            {
              title: "Loading Carousel",
              href: "/docs/components/loading-carousel",
              items: [],
              label: "updated",
            },
          ],
        },
        {
          title: "Typography & Text Effects",
          items: [
            {
              title: "Text Animate",
              href: "/docs/components/text-animate",
              items: [],
            },
            {
              title: "Typewriter",
              href: "/docs/components/typewriter",
              items: [],
            },
            {
              title: "Animated Number",
              href: "/docs/components/animated-number",
              items: [],
            },
            {
              title: "Pixel Heading (Char)",
              href: "/docs/components/pixel-heading-character",
              items: [],
            },
            {
              title: "Pixel Heading (Word)",
              href: "/docs/components/pixel-heading-word",
              items: [],
            },
            {
              title: "Pixel Paragraph",
              href: "/docs/components/pixel-paragraph-words",
              items: [],
            },
            {
              title: "Pixel Paragraph Inv",
              href: "/docs/components/pixel-paragraph-words-inverse",
              items: [],
            },
            {
              title: "Text Gif",
              href: "/docs/components/text-gif",
              items: [],
            },
            {
              title: "Squiggle Arrow",
              href: "/docs/components/squiggle-arrow",
              items: [],
            },
          ],
        },
      ],
    },
  ],
};
