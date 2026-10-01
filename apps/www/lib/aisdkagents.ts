const AISDK_AGENTS_ORIGIN = "https://aisdkagents.com"

export type AisdkAgentsPlacement = {
  /** Surface the link lives on. */
  medium: "landing" | "docs" | "header" | "footer"
  /** Specific placement, e.g. "hero-link" or "pattern-card". */
  content: string
}

/**
 * Builds a tracked aisdkagents.com URL so each placement on cult-ui.com shows
 * up separately in analytics.
 *
 * @example aisdkAgentsUrl("/patterns", { medium: "landing", content: "hero-link" })
 */
export function aisdkAgentsUrl(path: string, placement: AisdkAgentsPlacement) {
  const url = new URL(path, AISDK_AGENTS_ORIGIN)
  url.searchParams.set("utm_source", "cult-ui")
  url.searchParams.set("utm_medium", placement.medium)
  url.searchParams.set("utm_content", placement.content)
  return url.toString()
}
