import type * as React from "react"

import { cn } from "@/lib/utils"
import { PixelKicker, SectionTitle } from "@/components/section-heading"
import { TwoToneSectionDescription } from "@/components/two-tone-section-description"

export function MarketingSection({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="marketing-section"
      className={cn(
        "mx-auto max-w-6xl px-4 py-10 sm:py-16 lg:py-24",
        className
      )}
      {...props}
    />
  )
}

/**
 * Start-aligned section header: optional pixel kicker, title, two-tone
 * description, and an optional action that sits at the right on desktop.
 * Use a kicker or a `PixelPhrase` in the title, not both.
 */
export function SectionHeader({
  id,
  kicker,
  title,
  lead,
  children,
  action,
  className,
}: {
  id: string
  kicker?: React.ReactNode
  title: React.ReactNode
  lead?: React.ReactNode
  children?: React.ReactNode
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className="flex max-w-2xl flex-col items-start">
        {kicker ? <PixelKicker className="mb-4">{kicker}</PixelKicker> : null}
        <SectionTitle id={id}>{title}</SectionTitle>
        {lead ? (
          <TwoToneSectionDescription
            lead={lead}
            className="mt-3 ms-0.5 md:ms-1"
          >
            {children}
          </TwoToneSectionDescription>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
