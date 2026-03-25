import { toc } from "mdast-util-toc"
import { remark } from "remark"
import { visit } from "unist-util-visit"

const textTypes = ["text", "emphasis", "strong", "inlineCode"]

interface MdastNode {
  type: string
  value?: string
  url?: string
  children?: MdastNode[]
}

function flattenNode(node: MdastNode): string {
  const p: string[] = []
  visit(node, (child: MdastNode) => {
    if (!textTypes.includes(child.type)) return
    if (child.value) p.push(child.value)
  })
  return p.join("")
}

interface Item {
  title: string
  url: string
  items?: Item[]
}

interface Items {
  items?: Item[]
}

function getItems(node: MdastNode | undefined, current: Partial<Item>): Items {
  if (!node) {
    return {}
  }

  if (node.type === "paragraph") {
    visit(node, (item: MdastNode) => {
      if (item.type === "link") {
        current.url = item.url
        current.title = flattenNode(node)
      }

      if (item.type === "text") {
        current.title = flattenNode(node)
      }
    })

    return current
  }

  if (node.type === "list") {
    (current as Items).items = node.children?.map((i) => getItems(i, {}) as Item)
    return current
  } else if (node.type === "listItem") {
    const heading = getItems(node.children?.[0], {})

    if (node.children && node.children.length > 1) {
      getItems(node.children[1], heading)
    }

    return heading
  }

  return {}
}

const getToc = () => (node: MdastNode, file: { data: Items }) => {
  const table = toc(node)
  const items = getItems(table.map, {})
  file.data = items
}

export type TableOfContents = Items

export async function getTableOfContents(
  content: string
): Promise<TableOfContents> {
  const result = await remark().use(getToc).process(content)

  return result.data as TableOfContents
}
