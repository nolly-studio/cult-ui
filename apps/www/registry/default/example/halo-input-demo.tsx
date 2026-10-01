"use client"

import { useState } from "react"

import { HaloInput, HaloTextarea } from "@/registry/default/ui/halo-input"

export default function HaloInputDemo() {
  const [name, setName] = useState("")
  const [note, setNote] = useState("")

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <header className="space-y-2 text-center">
          <h2 className="font-semibold text-foreground text-lg tracking-tight">
            Animated input
          </h2>
          <p className="text-pretty text-muted-foreground text-sm">
            Single-line and multiline controls with the same frosted rim polish
            as the rest of the animated form set.
          </p>
        </header>
        <section className="space-y-3">
          <h3 className="font-medium text-foreground text-sm">Single line</h3>
          <HaloInput
            onChange={(e) => setName(e.target.value)}
            placeholder="Display name"
            value={name}
          />
          <p className="text-muted-foreground text-xs tabular-nums">
            Value length: {name.length}
          </p>
        </section>
        <section className="space-y-3">
          <h3 className="font-medium text-foreground text-sm">Multiline</h3>
          <HaloTextarea
            className="min-h-[120px]"
            onChange={(e) => setNote(e.target.value)}
            placeholder="Notes"
            value={note}
          />
          <p className="text-muted-foreground text-xs tabular-nums">
            {note.length} characters
          </p>
        </section>
      </div>
    </main>
  )
}
