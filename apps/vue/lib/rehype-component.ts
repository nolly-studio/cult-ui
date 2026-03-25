import fs from "fs"
import path from "path"
import { u } from "unist-builder"
import { visit } from "unist-util-visit"

export interface UnistNode {
  type: string
  name?: string
  tagName?: string
  value?: string
  properties?: Record<string, unknown>
  attributes?: {
    name: string
    value: unknown
    type?: string
  }[]
  children?: UnistNode[]
}

export interface UnistTree {
  type: string
  children: UnistNode[]
}

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find((attribute) => attribute.name === name)
}

function getStringAttribute(node: UnistNode, attrName: string): string | undefined {
  const attr = getNodeAttributeByName(node, attrName)
  return typeof attr?.value === "string" ? attr.value : undefined
}

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      const srcPath = getStringAttribute(node, "src")

      if (node.name === "ComponentSource") {
        const name = getStringAttribute(node, "name") ?? ""

        if (!name && !srcPath) {
          return null
        }

        try {
          let src: string

          if (srcPath) {
            src = path.join(process.cwd(), srcPath)
          } else {
            src = path.join(process.cwd(), "components", `${name}.vue`)
          }

          let source = fs.readFileSync(src, "utf8")
          source = source.replaceAll("export default", "export")

          node.children?.push(
            u("element", {
              tagName: "pre",
              properties: { __src__: src },
              children: [
                u("element", {
                  tagName: "code",
                  properties: { className: ["language-vue"] },
                  children: [{ type: "text", value: source }],
                }),
              ],
            })
          )
        } catch (error) {
          console.error(error)
        }
      }

      if (node.name === "ComponentPreview") {
        const name = getStringAttribute(node, "name") ?? ""

        if (!name) {
          return null
        }

        try {
          const src = path.join(process.cwd(), "components", `${name}.vue`)
          let source = fs.readFileSync(src, "utf8")
          source = source.replaceAll("export default", "export")

          node.children?.push(
            u("element", {
              tagName: "pre",
              properties: { __src__: src },
              children: [
                u("element", {
                  tagName: "code",
                  properties: { className: ["language-vue"] },
                  children: [{ type: "text", value: source }],
                }),
              ],
            })
          )
        } catch (error) {
          console.error(error)
        }
      }
    })
  }
}
