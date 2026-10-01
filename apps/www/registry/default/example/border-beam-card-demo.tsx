"use client"

import { useId, useState } from "react"

import {
  BorderBeamCard,
  BorderBeamCardContent,
  BorderBeamCardDescription,
  BorderBeamCardHeader,
  BorderBeamCardTitle,
} from "@/registry/default/ui/border-beam-card"

export default function BorderBeamCardDemo() {
  const [strength, setStrength] = useState(1)
  const [active, setActive] = useState(true)
  const strengthId = useId()
  const activeId = useId()

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-3xl flex-col gap-14">
        <header className="space-y-2 text-center">
          <h2 className="font-semibold text-foreground text-xl tracking-tight">
            Border beam card
          </h2>
          <p className="text-pretty text-muted-foreground text-sm">
            <span className="text-foreground/90">BorderBeamCard</span> wraps{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground text-xs">
              Card
            </code>{" "}
            with the same header / content slots. Effect layers use{" "}
            <span className="text-foreground/90">pointer-events: none</span>.
          </p>
        </header>

        <section className="space-y-3">
          <h3 className="font-semibold text-foreground text-lg tracking-tight">
            Composable card
          </h3>
          <p className="text-pretty text-muted-foreground text-sm">
            Same slots as <span className="text-foreground/90">Card</span> —
            header, title, description, content.
          </p>
          <BorderBeamCard>
            <BorderBeamCardHeader>
              <BorderBeamCardTitle>Border beam card</BorderBeamCardTitle>
              <BorderBeamCardDescription>
                Uses <span className="text-foreground/90">Card</span> layout
                tokens; <span className="text-foreground/90">beamSize</span>{" "}
                controls the glow preset,{" "}
                <span className="text-foreground/90">size</span> matches card
                density (<span className="text-foreground/90">sm</span> /
                default).
              </BorderBeamCardDescription>
            </BorderBeamCardHeader>
            <BorderBeamCardContent>
              <p className="text-foreground/90 text-xs/relaxed">
                Body content sits in{" "}
                <span className="font-mono text-[0.8rem]">CardContent</span>,
                with padding aligned to the root{" "}
                <span className="font-mono text-[0.8rem]">size</span>.
              </p>
            </BorderBeamCardContent>
          </BorderBeamCard>
        </section>

        <section className="space-y-3">
          <h3 className="font-semibold text-foreground text-lg tracking-tight">
            Color variants
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <BorderBeamCard colorVariant="colorful" theme="auto">
              <BorderBeamCardContent className="pt-0">
                <p className="font-medium text-foreground text-sm">colorful</p>
              </BorderBeamCardContent>
            </BorderBeamCard>
            <BorderBeamCard colorVariant="mono" staticColors theme="auto">
              <BorderBeamCardContent className="pt-0">
                <p className="font-medium text-foreground text-sm">mono</p>
              </BorderBeamCardContent>
            </BorderBeamCard>
            <BorderBeamCard colorVariant="ocean" theme="auto">
              <BorderBeamCardContent className="pt-0">
                <p className="font-medium text-foreground text-sm">ocean</p>
              </BorderBeamCardContent>
            </BorderBeamCard>
            <BorderBeamCard colorVariant="sunset" theme="auto">
              <BorderBeamCardContent className="pt-0">
                <p className="font-medium text-foreground text-sm">sunset</p>
              </BorderBeamCardContent>
            </BorderBeamCard>
          </div>
        </section>
      </div>
    </main>
  )
}
