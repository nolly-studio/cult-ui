"use client"

import { usePathname } from "next/navigation"

import { MarketingHeader } from "@/components/marketing-header"
import { ModeToggle } from "@/components/mode-toggle"

interface SiteHeaderProps {
  githubLink?: React.ReactNode
}

/** Docs header. The home page renders its own overlay `MarketingHeader`. */
export function SiteHeader({ githubLink }: SiteHeaderProps) {
  const pathname = usePathname()
  if (pathname === "/") return null
  return (
    <MarketingHeader
      variant="docs"
      githubLink={githubLink}
      actions={<ModeToggle />}
      inComponents={pathname?.startsWith("/docs/components") ?? false}
    />
  )
}
