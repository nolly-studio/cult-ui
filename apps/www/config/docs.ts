import type { MainNavItem, SidebarNavItem } from "types/nav";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Components",
      href: "/docs/components/prompt-composer",
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
          title: "LLMs & Agents",
          href: "/docs/llms",
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
          title: "AI",
          items: [
            {
              title: "Inputs",
              items: [
                {
                  title: "Prompt Composer",
                  href: "/docs/components/prompt-composer",
                  items: [],
                  label: "new",
                },
                {
                  title: "Halo Search",
                  href: "/docs/components/halo-search",
                  items: [],
                  label: "new",
                },
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
                  title: "AI Blob Warp",
                  href: "/docs/components/ai-blob-warp",
                  items: [],
                  label: "new",
                },
                {
                  title: "Halo Dropzone",
                  href: "/docs/components/halo-dropzone",
                  items: [],
                  label: "new",
                },
              ],
            },
            {
              title: "Generative UI",
              items: [
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
                  title: "Poll Widget",
                  href: "/docs/components/poll-widget",
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
                  title: "Agent Suggest Card Stack",
                  href: "/docs/components/agent-suggest-card-stack",
                  items: [],
                  label: "new",
                },
                {
                  title: "Speech Bubble",
                  href: "/docs/components/speech-bubble",
                  items: [],
                  label: "new",
                },
                {
                  title: "Sortable List",
                  href: "/docs/components/sortable-list",
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
                {
                  title: "File Icons",
                  href: "/docs/components/file-icons",
                  items: [],
                  label: "new",
                },
              ],
            },
          ],
        },
        {
          title: "App & Workspace",
          items: [
            {
              title: "Analytics Chart",
              href: "/docs/components/analytics-chart",
              items: [],
              label: "new",
            },
            {
              title: "Kanban Board",
              href: "/docs/components/kanban-board",
              items: [],
              label: "new",
            },
            {
              title: "Timer",
              href: "/docs/components/timer",
              items: [],
            },
            {
              title: "Collab Avatar",
              href: "/docs/components/collab-avatar",
              items: [],
              label: "new",
            },
            {
              title: "Collab Toolbar",
              href: "/docs/components/collab-toolbar",
              items: [],
              label: "new",
            },
          ],
        },
        {
          title: "Form Controls",
          items: [
            {
              title: "Color Picker",
              href: "/docs/components/color-picker",
              items: [],
            },
            {
              title: "Halo Input",
              href: "/docs/components/halo-input",
              items: [],
              label: "new",
            },
            {
              title: "Halo Field",
              href: "/docs/components/halo-field",
              items: [],
              label: "new",
            },
            {
              title: "Halo Select",
              href: "/docs/components/halo-select",
              items: [],
              label: "new",
            },
            {
              title: "Halo Switch",
              href: "/docs/components/halo-switch",
              items: [],
              label: "new",
            },
            {
              title: "Halo Segmented",
              href: "/docs/components/halo-segmented",
              items: [],
              label: "new",
            },
            {
              title: "Halo Toggle Group",
              href: "/docs/components/halo-toggle-group",
              items: [],
              label: "new",
            },
            {
              title: "Border Beam Input",
              href: "/docs/components/border-beam-input",
              items: [],
              label: "new",
            },
          ],
        },
        {
          title: "Feedback & Status",
          items: [
            {
              title: "Halo Badge",
              href: "/docs/components/halo-badge",
              items: [],
              label: "new",
            },
            {
              title: "Halo Progress",
              href: "/docs/components/halo-progress",
              items: [],
              label: "new",
            },
            {
              title: "Halo Toast",
              href: "/docs/components/halo-toast",
              items: [],
              label: "new",
            },
            {
              title: "Halo Notification",
              href: "/docs/components/halo-notification",
              items: [],
              label: "new",
            },
            {
              title: "Dynamic Island",
              href: "/docs/components/dynamic-island",
              items: [],
            },
          ],
        },
        {
          title: "Navigation & Overlays",
          items: [
            {
              title: "Direction Aware Tabs",
              href: "/docs/components/direction-aware-tabs",
              items: [],
            },
            {
              title: "Halo Tabs",
              href: "/docs/components/halo-tabs",
              items: [],
              label: "new",
            },
            {
              title: "Gradient Button Group",
              href: "/docs/components/gradient-button-group",
              items: [],
            },
            {
              title: "MacOS Dock",
              href: "/docs/components/dock",
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
              title: "Floating Panel",
              href: "/docs/components/floating-panel",
              items: [],
            },
            {
              title: "Family Drawer",
              href: "/docs/components/family-drawer",
              items: [],
            },
            {
              title: "Side Panel",
              href: "/docs/components/side-panel",
              items: [],
            },
            {
              title: "Morph Surface",
              href: "/docs/components/morph-surface",
              items: [],
            },
            {
              title: "Expandable Screen",
              href: "/docs/components/expandable-screen",
              items: [],
              label: "updated",
            },
          ],
        },
        {
          title: "Onboarding & Flows",
          items: [
            {
              title: "Onboarding",
              href: "/docs/components/onboarding",
              items: [],
            },
            {
              title: "Intro Disclosure",
              href: "/docs/components/intro-disclosure",
              items: [],
            },
            {
              title: "Wizard Expandable",
              href: "/docs/components/wizard-expandable",
              items: [],
              label: "new",
            },
            {
              title: "Toolbar Expandable",
              href: "/docs/components/toolbar-expandable",
              items: [],
            },
            {
              title: "Family Button",
              href: "/docs/components/family-button",
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
              label: "updated",
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
              title: "Organic Button",
              href: "/docs/components/organic-button",
              items: [],
              label: "new",
            },
            {
              title: "Halo Button",
              href: "/docs/components/halo-button",
              items: [],
              label: "new",
            },
            {
              title: "Copy Button",
              href: "/docs/components/copy-button",
              items: [],
              label: "new",
            },
          ],
        },
        {
          title: "Cards",
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
              title: "Texture Card",
              href: "/docs/components/texture-card",
              items: [],
            },
            {
              title: "Shift Card",
              href: "/docs/components/shift-card",
              items: [],
            },
            {
              title: "Folded Card",
              href: "/docs/components/folded-card",
              items: [],
              label: "new",
            },
            {
              title: "Shadow Card",
              href: "/docs/components/shadow-card",
              items: [],
              label: "new",
            },
            {
              title: "Organic Card",
              href: "/docs/components/organic-card",
              items: [],
              label: "new",
            },
            {
              title: "Organic Card Small",
              href: "/docs/components/organic-card-small",
              items: [],
              label: "new",
            },
            {
              title: "Halo Card",
              href: "/docs/components/halo-card",
              items: [],
              label: "new",
            },
            {
              title: "Border Beam Card",
              href: "/docs/components/border-beam-card",
              items: [],
              label: "new",
            },
            {
              title: "Expandable Card",
              href: "/docs/components/expandable",
              items: [],
            },
          ],
        },
        {
          title: "Landing Pages",
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
              title: "Marketing Hero Analytics",
              href: "/docs/components/marketing-hero-analytics",
              items: [],
              label: "new",
            },
            {
              title: "Marketing Feature Code",
              href: "/docs/components/marketing-feature-code",
              items: [],
              label: "new",
            },
            {
              title: "Feature Sticky Section",
              href: "/docs/components/feature-sticky-section",
              items: [],
              label: "new",
            },
            {
              title: "Feature Carousel",
              href: "/docs/components/feature-carousel",
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
          ],
        },
        {
          title: "Illustrations",
          items: [
            {
              title: "Gateway Endpoint Illustration",
              href: "/docs/components/gateway-endpoint-illustration",
              items: [],
              label: "new",
            },
            {
              title: "Gateway Route Illustration",
              href: "/docs/components/gateway-route-illustration",
              items: [],
              label: "new",
            },
            {
              title: "Gateway SVG Illustration",
              href: "/docs/components/gateway-svg-illustration",
              items: [],
              label: "new",
            },
            {
              title: "Illustration Card Grid",
              href: "/docs/components/illustration-card-grid",
              items: [],
              label: "new",
            },
            {
              title: "Illustration Cursor",
              href: "/docs/components/illustration-cursor",
              items: [],
              label: "new",
            },
            {
              title: "Illustration Comment Bubble",
              href: "/docs/components/illustration-comment-bubble",
              items: [],
              label: "new",
            },
            {
              title: "Illustration Fluid Rendering",
              href: "/docs/components/illustration-fluid-rendering",
              items: [],
              label: "new",
            },
            {
              title: "Illustration Globe Vercel",
              href: "/docs/components/illustration-globe-vercel",
              items: [],
              label: "new",
            },
            {
              title: "Illustration Graph",
              href: "/docs/components/illustration-graph",
              items: [],
              label: "new",
            },
            {
              title: "Tabs Illustration Vercel",
              href: "/docs/components/tabs-illustration-vercel",
              items: [],
              label: "new",
            },
            {
              title: "Circuit Board",
              href: "/docs/components/circuit-board",
              items: [],
              label: "new",
            },
            {
              title: "Fluid AI Workloads",
              href: "/docs/components/fluid-ai-workloads",
              items: [],
              label: "new",
            },
            {
              title: "Security Checkpoint",
              href: "/docs/components/security-checkpoint",
              items: [],
              label: "new",
            },
            {
              title: "Merging Bubbles",
              href: "/docs/components/merging-bubbles",
              items: [],
              label: "new",
            },
            {
              title: "Globe (COBE)",
              href: "/docs/components/globe",
              items: [],
              label: "new",
            },
          ],
        },
        {
          title: "Media & Mockups",
          items: [
            {
              title: "Browser Window",
              href: "/docs/components/mock-browser-window",
              items: [],
            },
            {
              title: "Apple iPhone 17 Pro Max",
              href: "/docs/components/apple-iphone-17-pro",
              items: [],
              label: "new",
            },
            {
              title: "Apple Keyboard",
              href: "/docs/components/apple-keyboard",
              items: [],
              label: "new",
            },
            {
              title: "Apple Watch Ultra",
              href: "/docs/components/apple-watch-ultra",
              items: [],
              label: "new",
            },
            {
              title: "Mac Screen",
              href: "/docs/components/mac-screen",
              items: [],
              label: "new",
            },
            {
              title: "Apple Pro Display XDR",
              href: "/docs/components/apple-pro-display-xdr",
              items: [],
              label: "new",
            },
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
              title: "Loading Carousel",
              href: "/docs/components/loading-carousel",
              items: [],
              label: "updated",
            },
          ],
        },
        {
          title: "Backgrounds & Effects",
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
            {
              title: "Fluted Glass",
              href: "/docs/components/fluted-glass",
              items: [],
              label: "new",
            },
          ],
        },
        {
          title: "Typography",
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
              title: "Rolling Number",
              href: "/docs/components/rolling-number",
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
              title: "Gradient Heading",
              href: "/docs/components/gradient-heading",
              items: [],
            },
            {
              title: "Neumorph Eyebrow",
              href: "/docs/components/neumorph-eyebrow",
              items: [],
            },
            {
              title: "LightBoard",
              href: "/docs/components/lightboard",
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
