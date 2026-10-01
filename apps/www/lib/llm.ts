import { promises as fs } from "fs"
import path from "path"

import { siteConfig } from "@/config/site"
import { getRegistryItem } from "@/lib/registry"
import { source } from "@/lib/source"

type DocPage = NonNullable<ReturnType<typeof source.getPage>>

const FENCE_PATTERN = /^[ \t]*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^[ \t]*\1[ \t]*$/gm

/**
 * Git commit time of the page's MDX file, from `lastModifiedTime: "git"` in
 * source.config.ts. The loader serializes it, so it can arrive as a number.
 */
export function getPageLastModified(page: DocPage) {
  const value = (page.data as { lastModified?: Date | number | string })
    .lastModified
  if (value === undefined) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}

export function getMarkdownUrl(url: string) {
  return `${siteConfig.url}${url}.md`
}

async function readPageSource(page: DocPage) {
  const filePath =
    page.absolutePath ?? path.join(process.cwd(), "content/docs", page.path)
  const raw = await fs.readFile(filePath, "utf-8")
  return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "")
}

async function getRegistrySource(name: string) {
  const item = await getRegistryItem(name).catch(() => null)
  return item?.files?.[0]?.content?.trim()
}

function codeBlock(code: string, lang = "tsx", title?: string) {
  const fence = code.includes("```") ? "````" : "```"
  return `${fence}${lang}${title ? ` title="${title}"` : ""}\n${code}\n${fence}`
}

async function replaceAsync(
  input: string,
  pattern: RegExp,
  replacer: (match: string, ...groups: string[]) => Promise<string>
) {
  const matches = Array.from(input.matchAll(pattern))
  const replacements = await Promise.all(
    matches.map((match) => replacer(match[0], ...match.slice(1)))
  )
  let index = 0
  return input.replace(pattern, () => replacements[index++])
}

function getProp(tag: string, prop: string) {
  return tag.match(new RegExp(`${prop}="([^"]+)"`))?.[1]
}

/**
 * Converts a docs MDX file into plain markdown for LLMs: registry demos and
 * sources are inlined, and UI-only wrappers (tabs, steps, accordions) are
 * flattened into headings so the content reads top to bottom.
 */
export async function getPageMarkdown(
  page: DocPage,
  { inlineSource = true }: { inlineSource?: boolean } = {}
) {
  const fences: string[] = []
  let body = (await readPageSource(page)).replace(FENCE_PATTERN, (fence) => {
    fences.push(fence)
    return `@@FENCE_${fences.length - 1}@@`
  })

  const tabLabels = new Map<string, string>()
  for (const [, value, label] of body.matchAll(
    /<TabsTrigger[^>]*value="([^"]+)"[^>]*>([\s\S]*?)<\/TabsTrigger>/g
  )) {
    tabLabels.set(value, label.trim())
  }

  body = await replaceAsync(
    body,
    /<ComponentPreview\b[\s\S]*?\/>/g,
    async (tag) => {
      const name = getProp(tag, "name")
      const code = name ? await getRegistrySource(name) : undefined
      return code ? `## Example\n\n${codeBlock(code, "tsx", `${name}.tsx`)}` : ""
    }
  )

  body = await replaceAsync(
    body,
    /<ComponentSource\b[\s\S]*?\/>/g,
    async (tag) => {
      const name = getProp(tag, "name")
      const src = getProp(tag, "src")
      const title = getProp(tag, "title")
      if (!inlineSource && name) {
        return `Full source: ${siteConfig.url}/r/${name}.json`
      }
      let code: string | undefined
      if (name) code = await getRegistrySource(name)
      if (src) {
        code = await fs
          .readFile(path.join(process.cwd(), src), "utf-8")
          .catch(() => undefined)
      }
      if (!code) return ""
      const lang = getProp(tag, "language") ?? title?.split(".").pop() ?? "tsx"
      return codeBlock(code.trim(), lang, title ?? (name ? `${name}.tsx` : src))
    }
  )

  body = body
    .replace(/<TabsList\b[\s\S]*?<\/TabsList>/g, "")
    .replace(/<TabsTrigger\b[\s\S]*?<\/TabsTrigger>/g, "")
    .replace(/<TabsContent[^>]*value="([^"]+)"[^>]*>/g, (_, value: string) => {
      const label = tabLabels.get(value) ?? value
      return `### ${label.charAt(0).toUpperCase()}${label.slice(1)}`
    })
    .replace(/<Step>([\s\S]*?)<\/Step>/g, (_, text: string) => `**${text.trim()}**`)
    .replace(
      /^[ \t]*<AccordionTrigger>([\s\S]*?)<\/AccordionTrigger>/gm,
      (_, text: string) => `### ${text.trim()}`
    )
    .replace(
      /<AccordionContent>([\s\S]*?)<\/AccordionContent>/g,
      (_, text: string) => text.replace(/^[ \t]+/gm, "")
    )
    .replace(
      /^[ \t]*<\/?(CodeTabs|Tabs|TabsContent|Steps|Accordion|AccordionItem|AccordionContent)\b[^>]*>[ \t]*$/gm,
      ""
    )
    .replace(/^[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .replace(/@@FENCE_(\d+)@@/g, (_, i: string) => fences[Number(i)])

  const header = [`# ${page.data.title}`]
  if (page.data.description) header.push(`> ${page.data.description}`)
  header.push(`Source: ${siteConfig.url}${page.url}`)

  return `${header.join("\n\n")}\n\n${body}\n`
}

/** Question/answer pairs from the `<Accordion>` FAQ blocks in a docs page. */
export async function getPageFaq(page: DocPage) {
  const body = await readPageSource(page)
  return Array.from(
    body.matchAll(
      /<AccordionTrigger>([\s\S]*?)<\/AccordionTrigger>\s*<AccordionContent>([\s\S]*?)<\/AccordionContent>/g
    )
  ).map(([, question, answer]) => ({
    question: question.trim(),
    answer: answer.replace(/\s+/g, " ").trim(),
  }))
}

function getSortedPages() {
  return source
    .getPages()
    .slice()
    .sort((a, b) => {
      const aComponent = a.url.startsWith("/docs/components/")
      const bComponent = b.url.startsWith("/docs/components/")
      if (aComponent !== bComponent) return aComponent ? 1 : -1
      return a.url.localeCompare(b.url)
    })
}

function pageLink(page: DocPage) {
  const description = page.data.description ? `: ${page.data.description}` : ""
  return `- [${page.data.title}](${getMarkdownUrl(page.url)})${description}`
}

export function getLLMIndex() {
  const pages = getSortedPages()
  const guides = pages.filter((p) => !p.url.startsWith("/docs/components/"))
  const components = pages.filter((p) => p.url.startsWith("/docs/components/"))

  return `# Cult UI

> ${siteConfig.description} Every component is a shadcn/ui registry item: install it with the shadcn CLI and the source is copied into your project.

- Docs: ${siteConfig.url}/docs
- Source: ${siteConfig.links.github}
- Every docs page is available as markdown by appending \`.md\` to its URL.
- Full docs in one file: ${siteConfig.url}/llms-full.txt

## Install

- Add a component: \`npx shadcn@latest add @cult-ui/{name}\`. The \`@cult-ui\` namespace is built into the shadcn CLI, so no config is needed.
- Requires a project set up with \`npx shadcn@latest init\` (components.json, the \`cn\` helper, and theme tokens).
- For the shadcn MCP server or older CLIs, list the registry in \`components.json\`: \`"registries": { "@cult-ui": "${siteConfig.url}/r/{name}.json" }\`
- Without the namespace: \`npx shadcn@latest add ${siteConfig.url}/r/{name}.json\`
- Registry index: ${siteConfig.url}/r/registry.json
- Components use Tailwind CSS v4, shadcn theme tokens, and usually \`motion\` for animation. Peer dependencies are listed on each component page.

## Docs

${guides.map(pageLink).join("\n")}

## Components

${components.map(pageLink).join("\n")}
`
}

export async function getLLMFullText() {
  const pages = getSortedPages()
  // Component source is linked rather than inlined to keep the file loadable
  // in a single agent context; per-page `.md` files still inline it.
  const sections = await Promise.all(
    pages.map((page) => getPageMarkdown(page, { inlineSource: false }))
  )
  return sections.join("\n---\n\n")
}
