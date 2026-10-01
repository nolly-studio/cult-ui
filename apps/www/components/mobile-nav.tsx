"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { SidebarNavItem } from "types/nav"

import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { aisdkAgentsUrl } from "@/lib/aisdkagents"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { getIsActive, LabelBadge } from "@/components/docs-sidebar"
import { Icons } from "@/components/icons"
import { pillCtaClass } from "@/components/pill-cta"

const ACTIVE_SELECTOR = '[data-active="true"]'

const BLOCKS_PATTERN = {
  docs: "/patterns/json-render-pdf",
  home: "/patterns/spreadsheet-agent",
} as const

export function MobileNav({
  className,
  blocksSurface = "docs",
}: {
  className?: string
  /** Featured Blocks deep-link: docs vs home. */
  blocksSurface?: keyof typeof BLOCKS_PATTERN
}) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const listRef = React.useRef<HTMLDivElement>(null)

  // Center the current page in the list every time the panel opens.
  React.useEffect(() => {
    if (!open) return
    const frame = requestAnimationFrame(() => {
      const list = listRef.current
      const active = list?.querySelector<HTMLElement>(ACTIVE_SELECTOR)
      if (!list || !active) return
      const listRect = list.getBoundingClientRect()
      const activeRect = active.getBoundingClientRect()
      list.scrollTop +=
        activeRect.top -
        listRect.top -
        (list.clientHeight - activeRect.height) / 2
    })
    return () => cancelAnimationFrame(frame)
  }, [open, pathname])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open navigation"
          className={cn("-ml-2 size-9 hover:bg-transparent", className)}
        >
          <svg
            aria-hidden="true"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex w-[85vw] flex-col gap-0 p-0 sm:max-w-xs"
        onOpenAutoFocus={(event) => {
          const active =
            listRef.current?.querySelector<HTMLElement>(ACTIVE_SELECTOR)
          if (!active) return
          event.preventDefault()
          active.focus({ preventScroll: true })
        }}
      >
        <div className="border-border/80 flex h-16 shrink-0 items-center border-b px-5">
          <SheetTitle asChild>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="focus-visible:ring-ring flex items-center gap-2 rounded-md outline-none focus-visible:ring-2"
            >
              <Icons.cultLogoBasic
                aria-hidden="true"
                className="fill-foreground size-6"
              />
              <span className="text-base font-semibold tracking-tight">
                cult ui
              </span>
              <span className="sr-only">{siteConfig.name}</span>
            </Link>
          </SheetTitle>
        </div>

        <nav
          ref={listRef}
          aria-label="Docs"
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-8"
        >
          {docsConfig.sidebarNav.map((section, index) => (
            <div key={`${section.title}-${index}`} className="pt-6">
              <h4 className="text-muted-foreground mb-1 px-2 font-mono text-[10px] font-normal tracking-wider uppercase">
                {section.title}
              </h4>
              <MobileNavItems
                items={section.items}
                pathname={pathname}
                onNavigate={() => setOpen(false)}
              />
            </div>
          ))}
        </nav>

        <div className="border-border/80 flex shrink-0 flex-col gap-3 border-t px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <a
            href={aisdkAgentsUrl("/patterns", {
              medium: "header",
              content: "mobile-nav-cta-patterns",
            })}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              pillCtaClass.ink,
              pillCtaClass.compact,
              "w-full justify-between pr-3 pl-1.5"
            )}
          >
            <span className="flex items-center gap-2">
              <span className="bg-background/15 inline-flex h-6 items-center rounded-full px-2 text-xs font-medium">
                New
              </span>
              eve patterns
            </span>
            <HugeiconsIcon
              aria-hidden="true"
              icon={ArrowRight02Icon}
              className="size-3.5 opacity-70"
            />
            <span className="sr-only">on AI SDK Agents (opens in a new tab)</span>
          </a>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-1">
            <ExternalLink
              href={aisdkAgentsUrl(BLOCKS_PATTERN[blocksSurface], {
                medium: "header",
                content:
                  blocksSurface === "docs"
                    ? "mobile-nav-blocks-docs"
                    : "mobile-nav-blocks-home",
              })}
            >
              Blocks
            </ExternalLink>
            <Link
              href={siteConfig.links.components}
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-1 rounded-md text-sm outline-none focus-visible:ring-2"
            >
              Components
            </Link>
            <ExternalLink
              href={aisdkAgentsUrl("/ai-components", {
                medium: "header",
                content: "mobile-nav-ai-components",
              })}
            >
              AI components
            </ExternalLink>
            <ExternalLink
              href={aisdkAgentsUrl("/skills", {
                medium: "header",
                content: "mobile-nav-skills",
              })}
            >
              skills
            </ExternalLink>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function MobileNavItems({
  items,
  pathname,
  onNavigate,
  depth = 0,
}: {
  items: SidebarNavItem[]
  pathname: string | null
  onNavigate: () => void
  depth?: number
}) {
  return (
    <ul className={cn("flex flex-col gap-0.5", depth > 0 && "pl-2")}>
      {items.map((item, index) => {
        const isActive = getIsActive(pathname, item.href)

        return (
          <li key={`${item.title}-${index}`}>
            {item.href && !item.disabled ? (
              <Link
                href={item.href}
                prefetch={false}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                data-active={isActive ? "true" : undefined}
                aria-current={isActive ? "page" : undefined}
                onClick={onNavigate}
                className="text-muted-foreground hover:text-foreground active:bg-muted/60 data-[active=true]:bg-muted data-[active=true]:text-foreground focus-visible:ring-ring flex min-h-10 items-center justify-between gap-2 rounded-lg px-2 text-sm transition-colors outline-none focus-visible:ring-2 data-[active=true]:font-medium"
              >
                <span className="min-w-0 flex-1 truncate">{item.title}</span>
                <LabelBadge label={item.label} />
              </Link>
            ) : (
              <div
                className={cn(
                  "text-foreground mt-3 flex h-8 items-center px-2 text-sm font-medium",
                  depth > 0 &&
                    "text-muted-foreground mt-2 h-7 text-[0.75rem] font-normal tracking-wide uppercase"
                )}
              >
                {item.title}
              </div>
            )}

            {item.items.length > 0 ? (
              <MobileNavItems
                items={item.items}
                pathname={pathname}
                onNavigate={onNavigate}
                depth={depth + 1}
              />
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}

function ExternalLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-md text-sm transition-colors outline-none focus-visible:ring-2"
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
