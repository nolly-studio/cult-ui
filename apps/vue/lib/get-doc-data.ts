import { getSourceUrl } from "./source"

export async function getDocData(slug: string[]) {
  try {
    const path = getSourceUrl(slug)
    return { path }
  } catch (error) {
    console.error("Error fetching doc data:", error)
    return null
  }
}

export async function getAllDocSlugs(): Promise<string[][]> {
  try {
    return []
  } catch (error) {
    console.error("Error fetching doc slugs:", error)
    return []
  }
}
