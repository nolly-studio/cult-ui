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
          title: "Buttons & Controls",
          items: [
            {
              title: "Neumorph Button",
              href: "/docs/components/neumorph-button",
              items: [],
              label: "new",
            },
            {
              title: "Family Button",
              href: "/docs/components/family-button",
              items: [],
            },
            {
              title: "Texture Button",
              href: "/docs/components/texture-button",
              items: [],
            },
            {
              title: "Bg Animate Button",
              href: "/docs/components/bg-animate-button",
              items: [],
            },
          ],
        },
        {
          title: "Cards & Containers",
          items: [
            {
              title: "Expandable Card",
              href: "/docs/components/expandable",
              items: [],
              label: "updated",
            },
            {
              title: "Minimal Card",
              href: "/docs/components/minimal-card",
              items: [],
            },
            {
              title: "Neumorph Eyebrow",
              href: "/docs/components/neumorph-eyebrow",
              items: [],
              label: "new",
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
          title: "Onboarding & Tours",
          items: [
            {
              title: "Feature Carousel",
              href: "/docs/components/feature-carousel",
              items: [],
              label: "new",
            },
            {
              title: "Intro Disclosure",
              href: "/docs/components/intro-disclosure",
              items: [],
              label: "new",
            },
            {
              title: "Loading Carousel",
              href: "/docs/components/loading-carousel",
              items: [],
              label: "recent",
            },
          ],
        },

        {
          title: "Layout & Forms",
          items: [
            {
              title: "Direction Aware Tabs",
              href: "/docs/components/direction-aware-tabs",
              items: [],
            },
            {
              title: "Side Panel",
              href: "/docs/components/side-panel",
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
              title: "Sortable List",
              href: "/docs/components/sortable-list",
              items: [],
            },
          ],
        },
        {
          title: "Interactive Elements",
          items: [
            {
              title: "Dynamic Island",
              href: "/docs/components/dynamic-island",
              items: [],
            },
            {
              title: "Color Picker",
              href: "/docs/components/color-picker",
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
          title: "Media",
          items: [
            {
              title: "Logo Carousel",
              href: "/docs/components/logo-carousel",
              items: [],
              label: "recent",
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
              label: "recent",
            },
            {
              title: "Bg Media Hero",
              href: "/docs/components/bg-media",
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
          title: "Typography & Text",
          items: [
            {
              title: "Gradient Heading",
              href: "/docs/components/gradient-heading",
              items: [],
            },
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
          ],
        },

        {
          title: "Visual Effects",
          items: [
            {
              title: "LightBoard",
              href: "/docs/components/lightboard",
              items: [],
            },
            {
              title: "Fractal Grid",
              href: "/docs/components/bg-animated-fractal-grid",
              items: [],
            },
            {
              title: "Shader Lens Blur",
              href: "/docs/components/shader-lens-blur",
              items: [],
            },
          ],
        },
      ],
    },
  ],
}
