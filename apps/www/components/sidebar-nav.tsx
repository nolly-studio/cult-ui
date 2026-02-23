"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarNavItem } from "types/nav"

import { useDebounce } from "@/hooks/use-debounce"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export interface DocsSidebarNavProps {
  items: SidebarNavItem[]
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname()
  const [search, setSearch] = React.useState("")
  const debouncedSearch = useDebounce(search, 200)

  const filteredItems = React.useMemo(() => {
    if (!debouncedSearch) return items

    return items
      .map((item) => {
        const matchingSubItems = item.items?.filter((subItem) =>
          subItem.title.toLowerCase().includes(debouncedSearch.toLowerCase())
        )

        if (
          item.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          (matchingSubItems && matchingSubItems.length > 0)
        ) {
          return {
            ...item,
            items: matchingSubItems,
          }
        }

        return null
      })
      .filter(Boolean) as SidebarNavItem[]
  }, [items, debouncedSearch])

  return (
    <div className="w-full">
      <div className="mb-4 px-2">
        <Input
          placeholder="Filter components..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-8 text-xs"
        />
      </div>
      {filteredItems.length ? (
        filteredItems.map((item, index) => (
          <div key={`${item.title}-${index}`} className={cn("pb-4")}>
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
              {item.title}
            </h4>
            {item?.items?.length && (
              <DocsSidebarNavItems items={item.items} pathname={pathname} />
            )}
          </div>
        ))
      ) : (
        <div className="px-2 py-4 text-xs text-muted-foreground">
          No components found.
        </div>
      )}
    </div>
  )
}

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[]
  pathname: string | null
}

export function DocsSidebarNavItems({
  items,
  pathname,
}: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {items.map((item, index) => (
        <NavItem
          key={`${item.title}-${index}`}
          item={item}
          pathname={pathname}
        />
      ))}
    </div>
  ) : null
}

interface NavItemProps {
  item: SidebarNavItem
  pathname: string | null
}

function NavItem({ item, pathname }: NavItemProps) {
  const isActive = pathname === item.href
  const hasChildren = item.items && item.items.length > 0

  if (hasChildren) {
    return (
      <div>
        <span className="flex w-full cursor-default items-center rounded-md p-2 text-xs font-medium text-muted-foreground">
          {item.title}
        </span>
        <div className="ml-3 border-l border-border pl-3">
          <DocsSidebarNavItems items={item.items} pathname={pathname} />
        </div>
      </div>
    )
  }

  if (item.href && !item.disabled) {
    return (
      <Link
        href={item.href}
        className={cn(
          "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
          item.disabled && "cursor-not-allowed opacity-60",
          isActive ? "font-medium text-foreground" : "text-muted-foreground"
        )}
        target={item.external ? "_blank" : ""}
        rel={item.external ? "noreferrer" : ""}
      >
        {item.title}
        {item.label === "new" && (
          <span className="ml-2 rounded-sm border border-black bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
            {item.label}
          </span>
        )}
        {item.label === "recent" && (
          <span className="ml-2 rounded-sm border border-black bg-cyan-200  px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
            {item.label}
          </span>
        )}
        {item.label === "updated" && (
          <span className="ml-2 rounded-sm border border-black bg-pink-400 px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
            {item.label}
          </span>
        )}
      </Link>
    )
  }

  return (
    <span
      className={cn(
        "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
        item.disabled && "cursor-not-allowed opacity-60"
      )}
    >
      {item.title}
      {item.label && (
        <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
          {item.label}
        </span>
      )}
    </span>
  )
}
