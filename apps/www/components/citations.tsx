import * as React from "react"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

function getHostname(href?: string) {
  if (!href) return null
  try {
    return new URL(href).hostname.replace(/^www\./, "")
  } catch {
    return null
  }
}

export function Citations({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="citations"
      className={cn("my-6", className)}
      {...props}
    />
  )
}

export function CitationTitle({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="citation-title"
      className={cn(
        "text-muted-foreground mt-6 mb-2 px-1 font-mono first:mt-0 text-[10px] tracking-wider uppercase [&>span]:text-muted-foreground/60 [&>span]:normal-case [&>span]:tracking-normal",
        className
      )}
      {...props}
    />
  )
}

export function CitationList({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="citation-list"
      className={cn(
        "bg-background shadow-soft divide-border/80 m-0 list-none divide-y overflow-hidden rounded-2xl p-0",
        className
      )}
      {...props}
    />
  )
}

export function CitationItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="citation-item"
      className={cn("m-0 p-0", className)}
      {...props}
    />
  )
}

export function CitationLink({
  className,
  href,
  children,
  target = "_blank",
  rel = "noopener noreferrer",
  ...props
}: React.ComponentProps<"a">) {
  const hostname = getHostname(href)

  return (
    <a
      data-slot="citation-link"
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "group hover:bg-muted/40 focus-visible:bg-muted/40 flex items-center gap-3 px-4 py-3 text-sm outline-none transition-colors duration-150",
        className
      )}
      {...props}
    >
      <span className="text-foreground min-w-0 flex-1 truncate font-medium">
        {children}
      </span>
      {hostname && (
        <span className="text-muted-foreground hidden shrink-0 font-mono text-xs sm:inline">
          {hostname}
        </span>
      )}
      <ArrowUpRight
        aria-hidden="true"
        className="text-muted-foreground group-hover:text-foreground group-focus-visible:text-foreground size-3.5 shrink-0 transition-[color,translate] duration-150 motion-safe:group-hover:translate-x-px motion-safe:group-hover:-translate-y-px"
      />
      {target === "_blank" && (
        <span className="sr-only">(opens in a new tab)</span>
      )}
    </a>
  )
}
