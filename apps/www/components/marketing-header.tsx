import type * as React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { siteConfig } from "@/config/site"
import { aisdkAgentsUrl } from "@/lib/aisdkagents"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"
import { pillCtaClass } from "@/components/pill-cta"

const navLinks = [
  { label: "Components", href: siteConfig.links.components, external: false },
  {
    label: "AI blocks",
    href: aisdkAgentsUrl("/patterns", {
      medium: "header",
      content: "nav-blocks",
    }),
    external: true,
  },
  {
    label: "AI skills",
    href: aisdkAgentsUrl("/skills", {
      medium: "header",
      content: "nav-skills",
    }),
    external: true,
  },
] as const

const linkClass =
  "text-muted-foreground hover:text-foreground focus-visible:ring-ring data-[current=true]:text-foreground inline-flex items-center gap-1 rounded-md text-sm transition-colors duration-150 outline-none focus-visible:ring-2"

function NavLink({
  label,
  href,
  external,
  current,
}: (typeof navLinks)[number] & { current?: boolean }) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {label}
        <ArrowUpRight aria-hidden="true" className="size-3 opacity-60" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    )
  }
  return (
    <Link
      href={href}
      className={linkClass}
      data-current={current ? "true" : undefined}
      aria-current={current ? "page" : undefined}
    >
      {label}
    </Link>
  )
}

export type MarketingHeaderProps = {
  githubLink?: React.ReactNode
  /**
   * `overlay` sits transparent over a hero band; `docs` is sticky, full width
   * and opaque with a hairline bottom border.
   * @default "overlay"
   */
  variant?: "overlay" | "docs"
  /** Extra controls rendered after the GitHub link, e.g. a theme toggle. */
  actions?: React.ReactNode
  /** Marks the Components link as the current section. */
  inComponents?: boolean
  className?: string
}

/**
 * Site header: wordmark and links left, GitHub and actions right. The overlay
 * variant ends with one ink pill; the docs variant drops it because the reader
 * is already browsing components.
 */
export function MarketingHeader({
  githubLink,
  variant = "overlay",
  actions,
  inComponents = false,
  className,
}: MarketingHeaderProps) {
  const isDocs = variant === "docs"
  return (
    <header
      data-slot="marketing-header"
      data-variant={variant}
      className={cn(
        "relative z-40",
        isDocs &&
          "border-border/80 bg-background/85 supports-[backdrop-filter]:bg-background/70 sticky top-0 z-50 border-b backdrop-blur-md",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-16 items-center gap-8 px-4",
          isDocs ? "max-w-none lg:px-6" : "max-w-6xl"
        )}
      >
        <div className="flex items-center md:hidden">
          <MobileNav />
        </div>
        <Link
          href="/"
          className="focus-visible:ring-ring flex shrink-0 items-center gap-2 rounded-md outline-none focus-visible:ring-2"
        >
          <Icons.cultLogoBasic
            aria-hidden="true"
            className="fill-foreground size-6"
          />
          <span className="text-base font-semibold tracking-tight">
            cult ui
          </span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              {...link}
              current={link.label === "Components" && inComponents}
            />
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          {githubLink}
          {actions}
          {isDocs ? null : (
            <Link
              href={siteConfig.links.components}
              className={cn(
                pillCtaClass.ink,
                pillCtaClass.compact,
                "ml-1 hidden sm:inline-flex"
              )}
            >
              Browse components
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
