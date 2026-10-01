"use client"

import { useState } from "react"

import { HaloBadge } from "@/registry/default/ui/halo-badge"

export default function HaloBadgeDemo() {
  const [count, setCount] = useState(3)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="w-full max-w-md space-y-10">
        <section className="space-y-3">
          <h2 className="font-semibold text-foreground text-lg tracking-tight">
            Counts & layout
          </h2>
          <p className="text-pretty text-muted-foreground text-sm">
            Tabular figures keep digit width steady when the count changes; the
            label can animate when its text updates.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <HaloBadge tabularNums variant="secondary">
              {count}
            </HaloBadge>
            <button
              className="rounded-md border border-border px-3 py-1.5 font-medium text-foreground text-sm fine-hover:hover:bg-muted"
              onClick={() => setCount((c) => (c >= 99 ? 1 : c + 7))}
              type="button"
            >
              Bump count
            </button>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-foreground text-lg tracking-tight">
            Live & variants
          </h2>
          <p className="text-pretty text-muted-foreground text-sm">
            Live mode shows a leading status dot with a gentle pulse; reduced
            motion preferences shorten or remove the animation.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <HaloBadge live variant="outline">
              Live
            </HaloBadge>
            <HaloBadge variant="default">New</HaloBadge>
            <HaloBadge variant="destructive">Action</HaloBadge>
            <HaloBadge layout={false} variant="ghost">
              Static label
            </HaloBadge>
          </div>
        </section>
      </div>
    </main>
  )
}
