import { createMDX } from "fumadocs-mdx/next";

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
      // Crawlers request markdown variants of docs pages; there is no
      // /llm route, so send them to the canonical HTML page instead of
      // letting every request 404 through a serverless function.
      {
        source: "/docs/:path*.mdx",
        destination: "/docs/:path*",
        permanent: true,
      },
      {
        source: "/docs/:path*.md",
        destination: "/docs/:path*",
        permanent: true,
      },
      {
        source: "/mcp",
        destination: "/docs/mcp",
        permanent: false,
      },
    ];
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
          "/:dir(cult-pro-images|cult-pro-component-images|component-images|placeholders|migrate|images|textures|fonts)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
