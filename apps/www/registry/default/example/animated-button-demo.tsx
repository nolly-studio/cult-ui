"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"

import { AnimatedButton } from "@/registry/default/ui/animated-button"

/** How long the demo keeps `isLoading` true; wire your real mutation the same way. */
const MOCK_LOADING_MS = 2400

export default function AnimatedButtonDemo() {
  const [loading, setLoading] = useState(false)
  const [isContinueLoading, setIsContinueLoading] = useState(false)

  function simulateAsync() {
    setLoading(true)
    window.setTimeout(() => setLoading(false), 2200)
  }

  return (
    <div
      className="mx-auto max-w-3xl space-y-8 px-4 py-2"
      id="animated-button-section"
    >
      <div className="space-y-3 rounded-xl border bg-muted/30 p-6">
        <p className="font-medium text-muted-foreground text-sm">
          Default (translucent)
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <AnimatedButton type="button">Continue</AnimatedButton>
          <AnimatedButton translucent={false} type="button">
            Solid surface
          </AnimatedButton>
        </div>
      </div>

      <div className="space-y-3 rounded-xl border bg-muted/30 p-6">
        <p className="font-medium text-muted-foreground text-sm">
          Loading state (async)
        </p>
        <p className="text-muted-foreground text-xs">
          Guard the click while loading, then clear after your mutation (here{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.7rem]">
            MOCK_LOADING_MS
          </code>
          ).
        </p>
        <div className="dark flex min-h-[120px] flex-col items-center justify-center rounded-lg bg-background p-8 ring-1 ring-border/60">
          <div className="w-full max-w-2xl">
            <AnimatedButton
              isLoading={isContinueLoading}
              loadingText="Working on it…"
              onClick={() => {
                if (isContinueLoading) {
                  return
                }
                setIsContinueLoading(true)
                window.setTimeout(
                  () => setIsContinueLoading(false),
                  MOCK_LOADING_MS
                )
              }}
              type="button"
            >
              Continue
            </AnimatedButton>
          </div>
        </div>
      </div>

      <div className="space-y-3 rounded-xl border bg-muted/30 p-6">
        <p className="font-medium text-muted-foreground text-sm">Loading</p>
        <p className="text-muted-foreground text-xs">
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.7rem]">
            isLoading
          </code>{" "}
          shows{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.7rem]">
            loadingText
          </code>{" "}
          and disables the control.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <AnimatedButton
            isLoading={loading}
            loadingCharDurationSec={0.22}
            loadingStaggerSec={0.028}
            loadingText="Processing…"
            onClick={simulateAsync}
            type="button"
          >
            Save
          </AnimatedButton>
        </div>
      </div>

      <div className="space-y-3 rounded-xl border bg-muted/30 p-6">
        <p className="font-medium text-muted-foreground text-sm">
          Non-string children
        </p>
        <p className="text-muted-foreground text-xs">
          Stagger applies only when the label is a string.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <AnimatedButton type="button">
            <span className="inline-flex items-center gap-2">
              <Loader2 aria-hidden className="size-4 opacity-70" />
              With icon
            </span>
          </AnimatedButton>
        </div>
      </div>
    </div>
  )
}
