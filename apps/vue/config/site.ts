export const siteConfig = {
  name: "Cult UI – Shadcn UI Components, Blocks & Templates",
  description:
    "Open-source Shadcn UI components, animated blocks, and full templates you can copy-paste into any TypeScript/Next.js project.",
  url: "https://cult-ui.com",
  ogImage: "https://cult-ui.com/og.png",

  links: {
    twitter: "https://x.com/nolansym",
    github: "https://github.com/nolly-studio/cult-ui",
  },
} as const

export type SiteConfig = typeof siteConfig
