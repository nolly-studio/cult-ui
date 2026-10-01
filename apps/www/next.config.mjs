import { createMDX } from "fumadocs-mdx/next"

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  // Docs MDX and the registry JSON route need the full registry tree in the trace;
  // avoid applying this to every route (reduces serverless bundle surface).
  outputFileTracingIncludes: {
    "/docs/[[...slug]]": ["./registry/**/*"],
    "/registry/[name]": ["./registry/**/*"],
    "/code/[name]": ["./registry/**/*"],
    "/llm/[[...slug]]": ["./registry/**/*", "./content/docs/**/*"],
    "/llms-full.txt": ["./registry/**/*", "./content/docs/**/*"],
    "/og": ["./assets/og/**/*"],
    "/og/docs/[[...slug]]": ["./assets/og/**/*"],
  },
  // `public/` holds large block preview PNGs; tracing them into the docs Lambda
  // exceeds Vercel's 250MB limit. Static files are still deployed separately.
  outputFileTracingExcludes: {
    "*": ["./public/**/*"],
  },
  images: {
    // Keep optimized variants cached for 31 days to avoid re-running
    // image optimization (and re-fetching large sources) per deploy/miss.
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com/random/*",
      },
      {
        protocol: "https",
        hostname: "player.vimeo.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "openaicomproductionae4b.blob.core.windows.net",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "media.giphy.com",
      },
    ],
  },
  redirects() {
    return [
      {
        source: "/components",
        destination: "/docs/components",
        permanent: true,
      },
      {
        source: "/docs/primitives/:path*",
        destination: "/docs/components/:path*",
        permanent: true,
      },
      {
        source: "/figma",
        destination: "/docs/figma",
        permanent: true,
      },
      {
        source: "/docs/forms",
        destination: "/docs/components/form",
        permanent: false,
      },
      {
        source: "/docs/forms/react-hook-form",
        destination: "/docs/components/form",
        permanent: false,
      },
      {
        source: "/sidebar",
        destination: "/docs/components/sidebar",
        permanent: true,
      },
      {
        source: "/react-19",
        destination: "/docs/react-19",
        permanent: true,
      },
      {
        source: "/charts",
        destination: "/charts/area",
        permanent: true,
      },
      {
        source: "/view/styles/:style/:name",
        destination: "/view/:name",
        permanent: true,
      },
      {
        source: "/docs/:path*.mdx",
        destination: "/docs/:path*.md",
        permanent: true,
      },
      {
        source: "/docs.mdx",
        destination: "/docs.md",
        permanent: true,
      },
      {
        source: "/mcp",
        destination: "/docs/mcp",
        permanent: false,
      },
      // Halo kit rename (animated-* → halo-*, plus prompt-composer / rolling-number)
      {
        source: "/docs/components/animated-badge",
        destination: "/docs/components/halo-badge",
        permanent: true,
      },
      {
        source: "/docs/components/animated-button",
        destination: "/docs/components/halo-button",
        permanent: true,
      },
      {
        source: "/docs/components/animated-card",
        destination: "/docs/components/halo-card",
        permanent: true,
      },
      {
        source: "/docs/components/animated-composer",
        destination: "/docs/components/prompt-composer",
        permanent: true,
      },
      {
        source: "/docs/components/animated-dropzone",
        destination: "/docs/components/halo-dropzone",
        permanent: true,
      },
      {
        source: "/docs/components/animated-field",
        destination: "/docs/components/halo-field",
        permanent: true,
      },
      {
        source: "/docs/components/animated-input",
        destination: "/docs/components/halo-input",
        permanent: true,
      },
      {
        source: "/docs/components/animated-notification",
        destination: "/docs/components/halo-notification",
        permanent: true,
      },
      {
        source: "/docs/components/animated-number",
        destination: "/docs/components/rolling-number",
        permanent: true,
      },
      {
        source: "/docs/components/animated-progress",
        destination: "/docs/components/halo-progress",
        permanent: true,
      },
      {
        source: "/docs/components/animated-search",
        destination: "/docs/components/halo-search",
        permanent: true,
      },
      {
        source: "/docs/components/animated-segmented",
        destination: "/docs/components/halo-segmented",
        permanent: true,
      },
      {
        source: "/docs/components/animated-select",
        destination: "/docs/components/halo-select",
        permanent: true,
      },
      {
        source: "/docs/components/animated-switch",
        destination: "/docs/components/halo-switch",
        permanent: true,
      },
      {
        source: "/docs/components/animated-tabs",
        destination: "/docs/components/halo-tabs",
        permanent: true,
      },
      {
        source: "/docs/components/animated-toast",
        destination: "/docs/components/halo-toast",
        permanent: true,
      },
      {
        source: "/docs/components/animated-toggle-group",
        destination: "/docs/components/halo-toggle-group",
        permanent: true,
      },
    ]
  },
  rewrites() {
    return {
      // Markdown variants of docs pages for LLMs and agents.
      beforeFiles: [
        { source: "/docs.md", destination: "/llm" },
        { source: "/docs/:path*.md", destination: "/llm/:path*" },
      ],
    }
  },
  headers() {
    return [
      {
        // Registry JSON is content-stable per deploy; let browsers and
        // the CDN keep it for a year.
        source: "/r/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/registry/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Large static marketing/screenshot assets.
        source:
          "/:dir(cult-pro-component-images|component-images|placeholders|migrate|images|textures|fonts)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ]
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
