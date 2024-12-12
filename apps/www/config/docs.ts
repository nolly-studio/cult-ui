import { MainNavItem, SidebarNavItem } from "types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
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
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "App UI",
          items: [
            {
              title: "Animated Number",
              href: "/docs/components/animated-number",
              items: [],
            },
            {
              title: "Bg Animate Button",
              href: "/docs/components/bg-animate-button",
              items: [],
            },
            {
              title: "Bg Media Hero",
              href: "/docs/components/bg-media",
              items: [],
            },
            {
              title: "Color Picker",
              href: "/docs/components/color-picker",
              items: [],
            },
            {
              title: "Direction Aware Tabs",
              href: "/docs/components/direction-aware-tabs",
              items: [],
            },
            {
              title: "Dynamic Island",
              href: "/docs/components/dynamic-island",
              items: [],
            },

            {
              title: "Expandable",
              href: "/docs/components/expandable",
              items: [],
            },
            {
              title: "Family Button",
              href: "/docs/components/family-button",
              items: [],
            },
            {
              title: "Floating Panel",
              href: "/docs/components/floating-panel",
              items: [],
            },
            {
              title: "Gradient Heading",
              href: "/docs/components/gradient-heading",
              items: [],
            },
            {
              title: "Hover Video Player",
              href: "/docs/components/hover-video-player",
              items: [],
              label: "new",
            },
            {
              title: "Minimal Card",
              href: "/docs/components/minimal-card",
              items: [],
            },
            {
              title: "Loading Carousel",
              href: "/docs/components/loading-carousel",
              items: [],
              label: "new",
            },
            {
              title: "Logo Carousel",
              href: "/docs/components/logo-carousel",
              items: [],
              label: "new",
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
              title: "Shift Card",
              href: "/docs/components/shift-card",
              items: [],
            },
            {
              title: "Side Panel",
              href: "/docs/components/side-panel",
              items: [],
            },
            {
              title: "Sortable List",
              href: "/docs/components/sortable-list",
              items: [],
            },
            {
              title: "Text Animate",
              href: "/docs/components/text-animate",
              items: [],
            },
            {
              title: "Texture Button",
              href: "/docs/components/texture-button",
              items: [],
            },
            {
              title: "Texture Card",
              href: "/docs/components/texture-card",
              items: [],
            },
          ],
        },
        {
          title: "Bespoke UI",
          items: [
            {
              title: "3D Carousel",
              href: "/docs/components/three-d-carousel",
              items: [],
            },
            {
              title: "LightBoard",
              href: "/docs/components/lightboard",
              items: [],
            },
            {
              title: "MacOS Dock",
              href: "/docs/components/dock",
              items: [],
            },
            {
              title: "Fractal Grid",
              href: "/docs/components/bg-animated-fractal-grid",
              items: [],
              label: "new",
            },
            {
              title: "Shader Lens Blur",
              href: "/docs/components/shader-lens-blur",
              items: [],
              label: "new",
            },
            {
              title: "Tweet Grid",
              href: "/docs/components/tweet-grid",
              items: [],
            },
            {
              title: "Typewriter",
              href: "/docs/components/typewriter",
              items: [],
            },
          ],
        },
      ],
    },
  ],
}
