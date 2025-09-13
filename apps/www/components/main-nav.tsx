"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ExternalLink } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex ">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.cultLogoBasic className="size-6 fill-black  " />
        <span className="hidden text-lg font-bold sm:inline-block">
          cult ui
        </span>
        <span className="sr-only">{siteConfig.name}</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/docs"
          className={cn(
            "text-sm font-semibold transition-colors hover:text-foreground/80",
            pathname?.startsWith("/docs/components")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Components
        </Link>

        <a
          href="https://pro.cult-ui.com/blocks"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-2 text-sm font-semibold transition-colors hover:text-foreground/80",
            pathname?.startsWith("/examples")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Blocks <span className="text-xs text-pink-500">(8 new)</span>
          <ExternalLink className="size-3" />
        </a>
        <a
          href="https://pro.cult-ui.com/sections"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-2 text-sm font-semibold transition-colors hover:text-foreground/80",
            pathname?.startsWith("/examples")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Sections <span className="text-xs text-pink-500">(10 new)</span>
          <ExternalLink className="size-3" />
        </a>
        <a
          href="https://pro.cult-ui.com/templates"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-2 text-sm font-semibold transition-colors hover:text-foreground/80",
            pathname?.startsWith("/examples")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Templates <span className="text-xs text-pink-500">(1 new)</span>
          <ExternalLink className="size-3" />
        </a>
      </nav>
    </div>
  )
}
