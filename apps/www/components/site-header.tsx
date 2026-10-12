"use client"

import { usePathname } from "next/navigation"

import { MarketingHeader } from "@/components/marketing-header"
import { ModeToggle } from "@/components/mode-toggle"

interface SiteHeaderProps {
  githubLink?: React.ReactNode
}

/**
 * Docs header, rendered by the `(site)` layout. The home page sits outside that
 * route group and renders its own overlay `MarketingHeader`.
 */
export function SiteHeader({ githubLink }: SiteHeaderProps) {
  const pathname = usePathname()
  return (
    <MarketingHeader
      variant="docs"
      githubLink={githubLink}
      actions={<ModeToggle />}
      inComponents={pathname?.startsWith("/docs/components") ?? false}
    />
  )
}
