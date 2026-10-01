"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { SidebarNavItem } from "types/nav"

import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

function getIsActive(pathname: string | null, href?: string) {
  if (!pathname || !href) {
    return false
  }

  if (href === "/docs") {
    return pathname === href
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

function LabelBadge({ label }: { label?: string }) {
  if (!label) {
    return null
  }

  return (
    <span
      data-label={label}
      className="border-border/80 font-pixel-square text-muted-foreground data-[label=new]:border-foreground/15 data-[label=new]:text-foreground shrink-0 rounded-md border px-1 py-px text-[10px] leading-none lowercase"
    >
      {label}
    </span>
  )
}

function DocsSidebarItems({
  items,
  pathname,
  depth = 0,
}: {
  items: SidebarNavItem[]
  pathname: string | null
  depth?: number
}) {
  return (
    <SidebarMenu
      className={cn(
        "min-w-0 grid-cols-[minmax(0,1fr)]",
        depth > 0 && "pl-2"
      )}
    >
      {items.map((item, index) => {
        const hasChildren = item.items.length > 0
        const isActive = getIsActive(pathname, item.href)

        return (
          <SidebarMenuItem
            key={`${item.title}-${index}`}
            className="mr-1 min-w-0 hover:cursor-pointer"
          >
            {item.href && !item.disabled ? (
              <SidebarMenuButton
                asChild
                isActive={isActive}
                className={cn(
                  "data-[active=true]:bg-muted focus-visible:ring-ring h-8 min-w-0 justify-between gap-2 rounded-lg border-0 text-[0.8125rem] font-normal outline-none focus-visible:ring-2 data-[active=true]:font-medium",
                  depth > 0 && "h-7",
                  item.external && "pr-3"
                )}
              >
                <Link
                  href={item.href}
                  prefetch={false}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  data-sidebar-active={isActive ? "true" : undefined}
                >
                  <span className="min-w-0 flex-1 truncate">{item.title}</span>
                  <LabelBadge label={item.label} />
                </Link>
              </SidebarMenuButton>
            ) : (
              <div
                className={cn(
                  "text-foreground mt-3 flex h-8 min-w-0 items-center justify-between gap-2 px-2 text-[0.8125rem] font-medium",
                  depth > 0 && "text-muted-foreground mt-2 h-7 text-[0.75rem] font-normal tracking-wide uppercase"
                )}
              >
                <span className="min-w-0 flex-1 truncate">{item.title}</span>
                <LabelBadge label={item.label} />
              </div>
            )}

            {hasChildren ? (
              <DocsSidebarItems
                items={item.items}
                pathname={pathname}
                depth={depth + 1}
              />
            ) : null}
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}

export function DocsSidebar() {
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!pathname) return

    const container = containerRef.current
    const activeLink = container?.querySelector<HTMLElement>(
      '[data-sidebar-active="true"]'
    )
    if (!container || !activeLink) return

    // scrollIntoView would also scroll the overflow-x-hidden container sideways
    requestAnimationFrame(() => {
      const containerRect = container.getBoundingClientRect()
      const linkRect = activeLink.getBoundingClientRect()
      container.scrollTop +=
        linkRect.top -
        containerRect.top -
        (container.clientHeight - linkRect.height) / 2
      container.scrollLeft = 0
    })
  }, [pathname])

  return (
    <Sidebar className="sticky top-(--header-height) z-30 hidden h-[calc(100svh-var(--header-height))] overscroll-none bg-transparent lg:flex">
      <div className="h-(--top-spacing) shrink-0" />
      <div className="relative mt-2 h-full overflow-hidden">
        <div className="via-border absolute top-12 right-0 bottom-0 hidden h-full w-px bg-linear-to-b from-transparent to-transparent lg:flex" />
        <SidebarContent
          ref={containerRef}
          className="no-scrollbar mx-auto h-full w-(--sidebar-menu-width) overflow-x-hidden px-2 pb-16 [mask-image:linear-gradient(to_bottom,transparent,black_1.5rem,black_calc(100%-5rem),transparent_calc(100%-0.5rem))]"
        >
          {docsConfig.sidebarNav.map((section, index) => (
            <SidebarGroup
              key={`${section.title}-${index}`}
              className="pt-6 first:pt-6"
            >
              <SidebarGroupLabel className="text-muted-foreground mb-1 px-2 font-mono text-[10px] font-normal tracking-wider uppercase">
                {section.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <DocsSidebarItems items={section.items} pathname={pathname} />
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </div>
    </Sidebar>
  )
}
