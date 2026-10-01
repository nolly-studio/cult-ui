import { NextResponse } from "next/server"

import { highlightCode } from "@/lib/highlight-code"
import { getRegistryItem } from "@/lib/registry"
import { Index } from "@/registry/__index__"

// Highlighted source for docs code tabs, fetched only when a reader opens
// them so the source stays out of every docs page payload.
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(Index).map((name) => ({ name }))
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params
  const item = await getRegistryItem(name).catch(() => null)
  const code = item?.files?.[0]?.content

  if (!code) {
    return NextResponse.json({ error: "Component not found" }, { status: 404 })
  }

  const html = await highlightCode(code, "tsx")

  return NextResponse.json({ code, html })
}
