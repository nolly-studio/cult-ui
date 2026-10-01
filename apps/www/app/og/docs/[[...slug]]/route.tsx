import { notFound } from "next/navigation"

import { getDocsCategory } from "@/lib/docs"
import { renderOgImage } from "@/lib/og"
import { source } from "@/lib/source"

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return source.generateParams()
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug } = await params
  const page = source.getPage(slug)

  if (!page) {
    notFound()
  }

  const isComponent = page.url.startsWith("/docs/components/")
  const name = page.slugs.at(-1)

  return renderOgImage({
    title: page.data.title ?? "Cult UI",
    description: page.data.description,
    kicker: getDocsCategory(page.url) ?? "Docs",
    footer:
      isComponent && name
        ? `npx shadcn add @cult-ui/${name}`
        : `cult-ui.com${page.url}`,
  })
}
