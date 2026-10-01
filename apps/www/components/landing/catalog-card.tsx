"use client"

import { useState } from "react"
import type * as React from "react"
import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import { ArrowRight02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { cn } from "@/lib/utils"

type CatalogImage = {
  light: string | StaticImageData
  /** Omit when one screenshot serves both themes. */
  dark?: string | StaticImageData
}

export type CatalogCardProps = {
  href: string
  title: string
  description?: string
  image: CatalogImage
  /** Notched corner badge, see `CatalogBadge`. One per card. */
  badge?: React.ReactNode
  tags?: string[]
  /** @default 2 */
  maxTags?: number
  /** Footer left slot: brand icons or a single pixel label. */
  meta?: React.ReactNode
  /** `md` is the two-up template size. @default "sm" */
  size?: "sm" | "md"
  sizes?: string
  className?: string
}

const pixelMicro = "font-pixel-square text-[10px] tracking-wider uppercase"

function isExternal(href: string) {
  return href.startsWith("http")
}

/**
 * Catalog card for components, blocks and templates: preview, clamped text,
 * tag chips and a footer ledger. Lay several out in a `CatalogTray`.
 */
export function CatalogCard({
  href,
  title,
  description,
  image,
  badge,
  tags = [],
  maxTags = 2,
  meta,
  size = "sm",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  className,
}: CatalogCardProps) {
  const [failed, setFailed] = useState(false)
  const external = isExternal(href)
  const Root = external ? "a" : Link
  const linkProps = external
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href }

  return (
    <Root
      data-slot="catalog-card"
      {...linkProps}
      className={cn(
        "group bg-card shadow-soft hover:shadow-soft-md focus-visible:ring-ring relative flex flex-col overflow-hidden rounded-2xl transition-shadow duration-150 outline-none focus-visible:ring-2 corner-squircle dark:bg-muted",
        className
      )}
    >
      <div className="border-border/80 bg-muted/20 relative aspect-[16/10] overflow-hidden border-b">
        {failed ? (
          <div
            className={cn(
              pixelMicro,
              "text-muted-foreground flex h-full items-center justify-center"
            )}
          >
            Preview
          </div>
        ) : (
          (image.dark
            ? (["light", "dark"] as const)
            : (["light"] as const)
          ).map((mode) => (
            <Image
              key={mode}
              alt=""
              src={mode === "dark" && image.dark ? image.dark : image.light}
              fill
              sizes={sizes}
              onError={() => setFailed(true)}
              className={cn(
                "object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.01] motion-reduce:group-hover:scale-100",
                image.dark &&
                  (mode === "light" ? "dark:hidden" : "hidden dark:block")
              )}
            />
          ))
        )}
        {badge}
      </div>

      <div
        className={cn("flex flex-1 flex-col", size === "md" ? "p-4" : "p-3")}
      >
        <h3
          className={cn(
            "line-clamp-1 leading-tight font-medium tracking-tight",
            size === "md" ? "mb-2 text-base" : "mb-1.5 text-sm"
          )}
        >
          {title}
        </h3>
        {description ? (
          <p
            className={cn(
              "text-muted-foreground mb-3 line-clamp-2 flex-1 leading-relaxed font-light",
              size === "md" ? "text-sm" : "text-xs"
            )}
          >
            {description}
          </p>
        ) : (
          <div className="flex-1" />
        )}

        {tags.length > 0 ? (
          <ul className="mb-3 flex flex-wrap gap-1">
            {tags.slice(0, maxTags).map((tag) => (
              <li
                key={tag}
                className="border-border/80 font-pixel-square text-muted-foreground group-hover:border-foreground/20 rounded-md border px-1.5 py-0.5 text-[10px] lowercase transition-colors duration-150"
              >
                {tag}
              </li>
            ))}
            {tags.length > maxTags ? (
              <li className="font-pixel-square text-muted-foreground/60 px-1 text-[10px] tabular-nums">
                +{tags.length - maxTags}
              </li>
            ) : null}
          </ul>
        ) : null}

        <div className="border-border/80 flex min-h-7 items-center justify-between border-t pt-2.5">
          <div className="flex items-center gap-0.5">{meta}</div>
          <span
            className={cn(
              pixelMicro,
              "text-muted-foreground group-hover:text-foreground flex items-center gap-1 transition-colors duration-150"
            )}
          >
            View
            <HugeiconsIcon
              aria-hidden="true"
              icon={ArrowRight02Icon}
              className="size-3 transition-transform duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
            />
            {external ? (
              <span className="sr-only">(opens in a new tab)</span>
            ) : null}
          </span>
        </div>
      </div>
    </Root>
  )
}

const complexityTone = {
  beginner: {
    label: "BEG",
    className: "text-emerald-600 dark:text-emerald-400",
  },
  intermediate: {
    label: "INT",
    className: "text-amber-600 dark:text-amber-400",
  },
  advanced: { label: "ADV", className: "text-rose-600 dark:text-rose-400" },
} as const

export type Complexity = keyof typeof complexityTone

/** Notched corner badge for a `CatalogCard` preview. */
export function CatalogBadge({
  children,
  corner = "right",
  tone = "default",
  className,
}: {
  children: React.ReactNode
  corner?: "left" | "right"
  /** `inverse` is the ink "New" notch. */
  tone?: "default" | "inverse"
  className?: string
}) {
  return (
    <span
      className={cn(
        pixelMicro,
        "border-border/80 absolute top-0 px-2 py-1 font-medium",
        corner === "right"
          ? "right-0 rounded-bl-md border-b border-l"
          : "left-0 rounded-br-md border-r border-b",
        tone === "inverse"
          ? "bg-primary text-primary-foreground"
          : "bg-background/95 backdrop-blur-sm",
        className
      )}
    >
      {children}
    </span>
  )
}

export function ComplexityBadge({ complexity }: { complexity: Complexity }) {
  const tone = complexityTone[complexity]
  return (
    <CatalogBadge className={tone.className}>
      <span className="sr-only">Complexity: </span>
      {tone.label}
    </CatalogBadge>
  )
}

export function CatalogMetaLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className={cn(pixelMicro, "text-muted-foreground")}>{children}</span>
  )
}

/** Muted tray that holds catalog cards. Card radius = tray radius − padding. */
export function CatalogTray({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="catalog-tray"
      className={cn(
        "bg-muted shadow-soft corner-squircle grid gap-4 rounded-[1.5rem] p-2 sm:grid-cols-2 lg:grid-cols-3 dark:bg-background",
        className
      )}
      {...props}
    />
  )
}
