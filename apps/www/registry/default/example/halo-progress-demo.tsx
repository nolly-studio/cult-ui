"use client"

import { useEffect, useState } from "react"

import { HaloProgress } from "@/registry/default/ui/halo-progress"

export default function HaloProgressDemo() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    if (pct >= 100) {
      return
    }
    const id = window.setInterval(() => {
      setPct((p) => Math.min(100, p + 2))
    }, 120)
    return () => window.clearInterval(id)
  }, [pct])

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-10">
        <section className="space-y-3">
          <h2 className="font-semibold text-foreground text-lg tracking-tight">
            Determinate
          </h2>
          <p className="text-pretty text-muted-foreground text-sm">
            Shows a known completion percentage with an optional label and
            numeric value — suited to uploads and other bounded tasks.
          </p>
          <HaloProgress
            label="Uploading"
            showValue
            value={pct === 100 ? 100 : pct}
          />
          <div className="flex gap-2">
            <button
              className="rounded-md border border-border px-3 py-1.5 font-medium text-foreground text-sm fine-hover:hover:bg-muted"
              onClick={() => setPct(0)}
              type="button"
            >
              Reset
            </button>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-foreground text-lg tracking-tight">
            Indeterminate
          </h2>
          <p className="text-pretty text-muted-foreground text-sm">
            Use when the duration is unknown: the bar loops until the task
            finishes or you switch to a determinate value.
          </p>
          <HaloProgress value={null} />
        </section>
      </div>
    </main>
  )
}
