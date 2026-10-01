import { docsConfig } from "@/config/docs"
import type { SidebarNavItem } from "types/nav"

function findParentTitle(
  items: SidebarNavItem[],
  url: string,
  parentTitle: string
): string | null {
  for (const item of items) {
    if (item.href === url) return parentTitle
    if (item.items?.length) {
      const found = findParentTitle(item.items, url, item.title)
      if (found) return found
    }
  }
  return null
}

/** Title of the sidebar group (or section) that directly contains a docs URL. */
export function getDocsCategory(url: string) {
  for (const section of docsConfig.sidebarNav) {
    const found = findParentTitle(section.items ?? [], url, section.title)
    if (found) return found
  }
  return null
}

export function getOgImageUrl(url: string) {
  return `/og${url}`
}
