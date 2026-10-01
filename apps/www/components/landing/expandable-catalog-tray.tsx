"use client"

import { useId, useState } from "react"
import type * as React from "react"

import { cn } from "@/lib/utils"
import { pillCtaClass } from "@/components/pill-cta"

import { CatalogTray } from "./catalog-card"

export function ExpandableCatalogTray({
  items,
  initialCount,
  noun,
  className,
}: {
  items: React.ReactNode[]
  initialCount: number
  /** Plural noun for the toggle label, e.g. "components". */
  noun: string
  className?: string
}) {
  const [expanded, setExpanded] = useState(false)
  const trayId = useId()
  const canExpand = items.length > initialCount
  const visible = expanded || !canExpand ? items : items.slice(0, initialCount)

  return (
    <div className="flex flex-col items-start gap-6 sm:gap-8">
      <CatalogTray id={trayId} className={cn("w-full", className)}>
        {visible}
      </CatalogTray>
      {canExpand ? (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={trayId}
          onClick={() => setExpanded((value) => !value)}
          className={pillCtaClass.outline}
        >
          {expanded
            ? `Show fewer ${noun}`
            : `Show ${items.length - initialCount} more ${noun}`}
        </button>
      ) : null}
    </div>
  )
}
