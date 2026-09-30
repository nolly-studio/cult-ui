"use client"

import { useState } from "react"

import { AnimatedToggleGroup } from "@/registry/default/ui/animated-toggle-group"

export default function AnimatedToggleGroupDemo() {
  const [segment, setSegment] = useState("week")
  return (
    <div>
      <section className="space-y-3">
        <h2 className="font-semibold text-foreground text-lg tracking-tight">
          Segmented control
        </h2>
        <p className="text-pretty text-muted-foreground text-sm">
          Single-select toggle group with a spring-driven thumb (same constants
          as <code className="text-foreground">AnimatedButton</code>
          ).
        </p>
        <AnimatedToggleGroup
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
  )
}
