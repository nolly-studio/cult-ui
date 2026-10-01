import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getPageLastModified } from "@/lib/llm";
import { source } from "@/lib/source";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const routes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/themes`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const docRoutes: MetadataRoute.Sitemap = source.getPages().map((page) => {
    const lastModified = getPageLastModified(page);
    return {
      url: `${baseUrl}${page.url}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "monthly",
      priority: page.url === "/docs" ? 0.9 : 0.7,
    };
  });

  return [...routes, ...docRoutes];
}
