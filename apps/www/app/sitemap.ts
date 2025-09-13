import { MetadataRoute } from "next"
import { getAllDocSlugs } from "@/lib/get-doc-data"

import { siteConfig } from "@/config/site"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
  const slugs = await getAllDocSlugs()
  const docRoutes = slugs.map((slug: string[]) => ({
    url: `${baseUrl}/docs/${slug.join("/")}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...routes, ...docRoutes]
}
