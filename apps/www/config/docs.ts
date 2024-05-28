import { MainNavItem, SidebarNavItem } from "types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Components",
      href: "/docs/components/accordion",
    },
    {
      title: "Themes",
      href: "/themes",
    },
    {
      title: "Examples",
      href: "/examples",
    },
    {
      title: "Blocks",
      href: "/blocks",
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
          title: "Dynamic Island",
          href: "/docs/components/dynamic-island",
          items: [],
        },
        {
          title: "Shift Card",
          href: "/docs/components/shift-card",
          items: [],
        },
        {
          title: "Family Button",
          href: "/docs/components/family-button",
          items: [],
        },
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
          title: "Bg Media",
          href: "/docs/components/bg-media",
          items: [],
        },
        {
          title: "3D Carousel",
          href: "/docs/components/three-d-carousel",
          items: [],
        },
        {
          title: "Gradient Heading",
          href: "/docs/components/gradient-heading",
          items: [],
        },
        {
          title: "Tweet Grid",
          href: "/docs/components/tweet-grid",
          items: [],
        },
        {
          title: "Bg Animate Button",
          href: "/docs/components/bg-animate-button",
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
        {
          title: "Minimal Card",
          href: "/docs/components/minimal-card",
          items: [],
        },
        {
          title: "Text Animate",
          href: "/docs/components/text-animate",
          items: [],
        },
      ],
    },
  ],
}
