import type { UnistNode, UnistTree } from "./rehype-component"
import { visit } from "unist-util-visit"

function getRawString(node: UnistNode): string | undefined {
  const raw = node.properties?.["__rawString__"]
  return typeof raw === "string" ? raw : undefined
}

export function rehypeNpmCommand() {
  return (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      if (node.type !== "element" || node?.tagName !== "pre") {
        return
      }

      const rawString = getRawString(node)
      if (!rawString || !node.properties) return

      if (rawString.startsWith("npm install")) {
        node.properties["__npmCommand__"] = rawString
        node.properties["__yarnCommand__"] = rawString.replace("npm install", "yarn add")
        node.properties["__pnpmCommand__"] = rawString.replace("npm install", "pnpm add")
        node.properties["__bunCommand__"] = rawString.replace("npm install", "bun add")
      }

      if (rawString.startsWith("npx create-")) {
        node.properties["__npmCommand__"] = rawString
        node.properties["__yarnCommand__"] = rawString.replace("npx create-", "yarn create ")
        node.properties["__pnpmCommand__"] = rawString.replace("npx create-", "pnpm create ")
        node.properties["__bunCommand__"] = rawString.replace("npx", "bunx --bun")
      }

      if (rawString.startsWith("npx") && !rawString.startsWith("npx create-")) {
        node.properties["__npmCommand__"] = rawString
        node.properties["__yarnCommand__"] = rawString.replace("npx", "yarn")
        node.properties["__pnpmCommand__"] = rawString.replace("npx", "pnpm dlx")
        node.properties["__bunCommand__"] = rawString.replace("npx", "bunx --bun")
      }
    })
  }
}
