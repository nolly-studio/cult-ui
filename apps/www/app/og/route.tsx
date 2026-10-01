import { renderOgImage } from "@/lib/og"

export const dynamic = "force-static"

export function GET() {
  return renderOgImage({
    title: "Shadcn,",
    titlePixel: "expanded",
    description: "Free, open-source animated components for shadcn/ui.",
    footer: "npx shadcn add @cult-ui/<name>",
  })
}
