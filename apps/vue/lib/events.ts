import { z } from "zod"

const eventSchema = z.object({
  name: z.enum([
    "copy_npm_command",
    "copy_usage_import_code",
    "copy_usage_code",
    "copy_primitive_code",
    "copy_theme_code",
    "copy_block_code",
    "copy_chunk_code",
    "enable_lift_mode",
  ]),
  properties: z
    .record(z.union([z.string(), z.number(), z.boolean(), z.null()]))
    .optional(),
})

export type Event = z.infer<typeof eventSchema>

interface AnalyticsProvider {
  track: (name: string, properties?: Record<string, string | number | boolean | null>) => void
}

function getAnalytics(): AnalyticsProvider | undefined {
  if (typeof window === "undefined") return undefined
  const win = window as Record<string, unknown>
  const analytics = win.__analytics
  if (
    typeof analytics === "object" &&
    analytics !== null &&
    "track" in analytics &&
    typeof (analytics as Record<string, unknown>).track === "function"
  ) {
    return analytics as AnalyticsProvider
  }
  return undefined
}

export function trackEvent(input: Event): void {
  const event = eventSchema.parse(input)
  if (event) {
    getAnalytics()?.track(event.name, event.properties)
  }
}
