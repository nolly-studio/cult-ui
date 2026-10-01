import type * as React from "react"
import Link from "next/link"
import { ArrowRight02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight } from "lucide-react"

import { siteConfig } from "@/config/site"
import { aisdkAgentsUrl } from "@/lib/aisdkagents"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"
import { pillCtaClass } from "@/components/pill-cta"

/** Featured pattern deep-links differ by surface: docs vs home. */
const BLOCKS_PATTERN = {
  docs: "/patterns/json-render-pdf",
  home: "/patterns/spreadsheet-agent",
} as const

function getNavLinks(surface: "docs" | "home") {
  return [
    {
      label: "Blocks",
      href: aisdkAgentsUrl(BLOCKS_PATTERN[surface], {
        medium: "header",
        content: surface === "docs" ? "nav-blocks-docs" : "nav-blocks-home",
      }),
      external: true,
    },
    {
      label: "Components",
      href: siteConfig.links.components,
      external: false,
    },
    {
      label: "AI components",
      href: aisdkAgentsUrl("/ai-components", {
        medium: "header",
        content: "nav-ai-components",
      }),
      external: true,
    },
    {
      label: "skills",
      href: aisdkAgentsUrl("/skills", {
        medium: "header",
        content: "nav-skills",
      }),
      external: true,
    },
  ] as const
}

const linkClass =
  "text-muted-foreground hover:text-foreground hover:bg-muted/60 focus-visible:ring-ring data-[current=true]:bg-muted data-[current=true]:text-foreground inline-flex h-8 items-center gap-1 rounded-full px-3 text-sm transition-colors duration-150 outline-none focus-visible:ring-2 data-[current=true]:font-medium"

function NavLink({
  label,
  href,
  external,
  current,
}: ReturnType<typeof getNavLinks>[number] & { current?: boolean }) {
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

/** The header's one ink pill: the newest AI SDK Agents patterns. */
function PatternsCta({ placement }: { placement: string }) {
  return (
    <a
      href={aisdkAgentsUrl("/patterns", {
        medium: "header",
        content: placement,
      })}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        pillCtaClass.ink,
        pillCtaClass.compact,
        "ml-1 gap-2 pr-3 pl-1.5"
      )}
    >
      <span className="bg-background/15 inline-flex h-6 items-center rounded-full px-2 text-xs font-medium">
        New
      </span>
      <span>
        <span className="hidden sm:inline">eve </span>patterns
      </span>
      <HugeiconsIcon
        aria-hidden="true"
        icon={ArrowRight02Icon}
        className="size-3.5 opacity-70 transition-transform duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
      />
      <span className="sr-only">on AI SDK Agents (opens in a new tab)</span>
    </a>
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
 * Site header: wordmark and pill nav left; GitHub, actions and one ink
 * "New eve patterns" pill to AI SDK Agents right. Both variants share the
 * same chrome so home and docs read as one site.
 */
export function MarketingHeader({
  githubLink,
  variant = "overlay",
  actions,
  inComponents = false,
  className,
}: MarketingHeaderProps) {
  const isDocs = variant === "docs"
  const surface = isDocs ? "docs" : "home"
  const navLinks = getNavLinks(surface)
  return (
    <header
      data-slot="marketing-header"
      data-variant={variant}
      className={cn(
        "relative z-40",
        isDocs && "border-border/80 bg-background sticky top-0 z-50 border-b",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-16 items-center gap-3 px-4 md:gap-6",
          isDocs ? "max-w-none lg:px-6" : "max-w-6xl"
        )}
      >
        <div
          className={cn(
            "flex items-center",
            isDocs ? "lg:hidden" : "md:hidden"
          )}
        >
          <MobileNav blocksSurface={surface} />
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
        <nav aria-label="Main" className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              {...link}
              current={link.label === "Components" && inComponents}
            />
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1.5">
          {githubLink}
          {actions}
          <PatternsCta
            placement={isDocs ? "docs-cta-patterns" : "cta-patterns"}
          />
        </div>
      </div>
    </header>
  )
}
