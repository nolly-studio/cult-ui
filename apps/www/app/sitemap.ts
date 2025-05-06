import { MetadataRoute } from "next"
import { allDocs } from "contentlayer/generated"

import { siteConfig } from "@/config/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  // Define the main pages of your site
  const routes = [
    "",
    "/docs",

    // Add more routes as needed
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Add all docs paths
  const docRoutes = allDocs.map((doc) => ({
    url: `${baseUrl}/docs/${doc.slugAsParams}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...routes, ...docRoutes]
}
