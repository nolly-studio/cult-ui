import { MainNavItem, SidebarNavItem } from "types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    // {
    //   title: "Documentation",
    //   href: "/docs",
    // },
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
          title: "LightBoard",
          href: "/docs/components/lightboard",
          items: [],
          label: "latest",
        },
        {
          title: "MacOS Dock",
          href: "/docs/components/dock",
          items: [],
          label: "new",
        },
        {
          title: "Sortable List",
          href: "/docs/components/sortable-list",
          items: [],
          label: "new",
        },
        {
          title: "Dynamic Island",
          href: "/docs/components/dynamic-island",
          items: [],
          // label: "new",
        },
        {
          title: "Shift Card",
          href: "/docs/components/shift-card",
          items: [],
          // label: "new",
        },
        {
          title: "Family Button",
          href: "/docs/components/family-button",
          items: [],
          // label: "new",
        },
        {
          title: "Direction Aware Tabs",
          href: "/docs/components/direction-aware-tabs",
          items: [],
          // label: "new",
        },
        {
          title: "Side Panel",
          href: "/docs/components/side-panel",
          items: [],
          // label: "new",
        },
        {
          title: "Bg Media",
          href: "/docs/components/bg-media",
          items: [],
          // label: "new",
        },

        {
          title: "Text Animate",
          href: "/docs/components/text-animate",
          items: [],
          // label: "new",
        },
        {
          title: "Typewriter",
          href: "/docs/components/typewriter",
          items: [],
          // label: "new",
        },
        {
          title: "Animated Number",
          href: "/docs/components/animated-number",
          items: [],
          // label: "new",
        },
        {
          title: "3D Carousel",
          href: "/docs/components/three-d-carousel",
          items: [],
          // label: "new",
        },

        {
          title: "Tweet Grid",
          href: "/docs/components/tweet-grid",
          items: [],
          // label: "new",
        },

        {
          title: "Texture Button",
          href: "/docs/components/texture-button",
          items: [],
          // label: "new",
        },
        {
          title: "Texture Card",
          href: "/docs/components/texture-card",
          items: [],
          // label: "new",
        },
        {
          title: "Minimal Card",
          href: "/docs/components/minimal-card",
          items: [],
          // label: "new",
        },
        {
          title: "Gradient Heading",
          href: "/docs/components/gradient-heading",
          items: [],
          // label: "new",
        },
        {
          title: "Bg Animate Button",
          href: "/docs/components/bg-animate-button",
          items: [],
          // label: "new",
        },
      ],
    },
  ],
}
