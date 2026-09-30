"use client"

import { useId } from "react"
import { Search } from "lucide-react"

import {
  BorderBeamInput,
  BorderBeamInputGroup,
  BorderBeamInputGroupAddon,
  BorderBeamInputGroupInput,
} from "@/registry/default/ui/border-beam-input"

export default function BorderBeamInputDemo() {
  const searchId = useId()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="flex w-full max-w-3xl flex-col gap-10">
        <header className="space-y-2 text-center">
          <h2 className="font-semibold text-foreground text-xl tracking-tight">
            Border beam input
          </h2>
          <p className="text-pretty text-muted-foreground text-sm">
            <span className="text-foreground/90">BorderBeamInput</span> and{" "}
            <span className="text-foreground/90">BorderBeamInputGroup</span>{" "}
            default to{" "}
            <span className="text-foreground/90">
              beamSize=&quot;line&quot;
            </span>{" "}
            (bottom-travel glow). Use{" "}
            <span className="text-foreground/90">pill</span> on the group for a
            rounded search bar. Addons match{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground text-xs">
              InputGroup
            </code>{" "}
            composition.
          </p>
        </header>

        <section className="space-y-3">
          <h3 className="font-semibold text-foreground text-lg tracking-tight">
            Single input & pill group
          </h3>
          <div className="flex max-w-md flex-col gap-4">
            <BorderBeamInput placeholder="Single input, line beam…" />
            <BorderBeamInputGroup className="max-w-md" pill>
              <label className="sr-only" htmlFor={searchId}>
                Search
              </label>
              <BorderBeamInputGroupAddon aria-hidden>
                <Search className="size-4 text-muted-foreground" />
              </BorderBeamInputGroupAddon>
              <BorderBeamInputGroupInput
                id={searchId}
                placeholder="Search…"
                type="search"
              />
            </BorderBeamInputGroup>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="font-semibold text-foreground text-lg tracking-tight">
            Line beam (InputGroup)
          </h3>
          <p className="text-pretty text-muted-foreground text-sm">
            Same pattern as a compact toolbar search — icon + control inside{" "}
            <span className="text-foreground/90">BorderBeamInputGroup</span>.
          </p>
          <div className="pb-8">
            <BorderBeamInputGroup className="max-w-md" theme="auto">
              <label className="sr-only" htmlFor="border-beam-line-input-demo">
                Search
              </label>
              <BorderBeamInputGroupAddon aria-hidden>
                <Search className="size-4 text-muted-foreground" />
              </BorderBeamInputGroupAddon>
              <BorderBeamInputGroupInput
                id="border-beam-line-input-demo"
                placeholder="line beam (InputGroup)…"
                type="search"
              />
            </BorderBeamInputGroup>
          </div>
        </section>
      </div>
    </main>
  )
}
