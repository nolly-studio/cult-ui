import { createContentlayerPlugin } from "next-contentlayer"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: "/Users/jordangilliam/dev/cult-templates-mono-repo/__PRODUCT__/cult-ui",
  outputFileTracingIncludes: {
    registry: ["./registry/**/*"],
  },
  webpack: (config, { isServer }) => {
    // Handle Node.js built-in modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        path: false,
        util: false,
        fs: false,
        net: false,
        tls: false,
      }
    }

    return config
  },
  images: {
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
        destination: "/docs/components/dynamic-island",
        permanent: true,
      },
      {
        source: "/docs/components",
        destination: "/docs/components/dynamic-island",
        permanent: true,
      },
    ]
  },
}

const withContentlayer = createContentlayerPlugin({
  // Additional Contentlayer config options
})

export default withContentlayer(nextConfig)
