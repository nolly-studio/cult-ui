// Source configuration for Nuxt content
// In Nuxt 3, content sourcing is handled by @nuxt/content module
// configured in nuxt.config.ts rather than a custom loader.

export interface SourcePage {
  slug: string[]
  title?: string
  description?: string
  body?: unknown
}

export function getSourceUrl(slug: string[]): string {
  return `/docs/${slug.join("/")}`
}
