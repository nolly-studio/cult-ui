"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type TocItem = {
  title: string
  url: string
  depth?: number
  children?: TocItem[]
}

interface DocsTableOfContentsProps {
  toc: TocItem[]
  className?: string
}

function flatten(
  items: TocItem[],
  depth = 0
): Array<TocItem & { level: number }> {
  return items.flatMap((item) => [
    { ...item, level: item.depth ? Math.max(0, item.depth - 2) : depth },
    ...flatten(item.children ?? [], depth + 1),
  ])
}

function useActiveHeading(ids: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null)

  React.useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-80px 0px -70% 0px" }
    )
    for (const element of elements) observer.observe(element)
    return () => observer.disconnect()
  }, [ids])

  return activeId
}

export function DocsTableOfContents({
  toc,
  className,
}: DocsTableOfContentsProps) {
  const items = React.useMemo(() => flatten(toc), [toc])
  const ids = React.useMemo(
    () => items.map((item) => decodeURIComponent(item.url.replace(/^#/, ""))),
    [items]
  )
  const activeId = useActiveHeading(ids)

  return (
    <nav
      aria-labelledby="toc-title"
      className={cn("flex flex-col gap-3", className)}
    >
      <h2
        id="toc-title"
        className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase"
      >
        On this page
      </h2>
      <ul className="border-border/80 flex flex-col border-l">
        {items.map((item, index) => {
          const isActive = ids[index] === activeId
          return (
            <li key={item.url}>
              <a
                href={item.url}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "text-muted-foreground hover:text-foreground focus-visible:ring-ring -ml-px block border-l border-transparent py-1 text-[0.8125rem] leading-snug transition-colors duration-150 outline-none focus-visible:ring-2",
                  item.level > 0 ? "pl-6" : "pl-3",
                  isActive && "border-foreground text-foreground"
                )}
              >
                {item.title}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
