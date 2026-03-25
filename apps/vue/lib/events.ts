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

declare global {
  interface Window {
    __analytics?: {
      track: (name: string, properties?: Record<string, string | number | boolean | null>) => void
    }
  }
}

export function trackEvent(input: Event): void {
  const event = eventSchema.parse(input)
  if (event && typeof window !== "undefined" && window.__analytics) {
    window.__analytics.track(event.name, event.properties)
  }
}
