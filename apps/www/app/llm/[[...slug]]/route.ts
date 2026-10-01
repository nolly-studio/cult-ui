import { notFound } from "next/navigation"

import { siteConfig } from "@/config/site"
import { getPageMarkdown } from "@/lib/llm"
import { source } from "@/lib/source"

// Served at `/docs/<slug>.md` via the rewrite in next.config.mjs.
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

  return new Response(await getPageMarkdown(page), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `<${siteConfig.url}${page.url}>; rel="canonical"`,
    },
  })
}
