"use client"

import { useState } from "react"

import { AnimatedSegmented } from "@/registry/default/ui/animated-segmented"

export default function AnimatedSegmentedDemo() {
  const [segment, setSegment] = useState("week")

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-16 bg-background p-8">
      <div className="w-full max-w-2xl space-y-10">
        <section className="space-y-3">
          <h2 className="font-semibold text-foreground text-lg tracking-tight">
            Segmented control
          </h2>
          <p className="text-pretty text-muted-foreground text-sm">
            Single-select control: one option is active at a time, with a
            spring-animated thumb that slides between segments.
          </p>
          <AnimatedSegmented
            items={[
              { label: "Day", value: "day" },
              { label: "Week", value: "week" },
              { label: "Month", value: "month" },
            ]}
            onValueChange={setSegment}
            value={segment}
          />
          <p className="text-muted-foreground text-xs tabular-nums">
            Selected: {segment}
          </p>
        </section>
      </div>
    </main>
  )
}
