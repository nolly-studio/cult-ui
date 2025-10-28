import { source } from "./source"

export async function getDocData(slug: string[]) {
  try {
    const doc = source.getPage(slug)
    return doc
  } catch (error) {
    console.error("Error fetching doc data:", error)
    return null
  }
}

export async function getAllDocSlugs() {
  try {
    const pages = source.getPages()
    return pages ? pages.map((page) => page.slugs) : []
  } catch (error) {
    console.error("Error fetching doc slugs:", error)
    return []
  }
}
