"use client"

import { useState } from "react"

import { AnimatedComposer } from "@/registry/default/ui/animated-composer"

const MOCK_LOADING_MS = 4200

const LOADING_STAGGER_SEC = 0.044
const LOADING_CHAR_DURATION_SEC = 0.42

export default function AnimatedComposerDemo() {
  const [value, setValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-8">
      <div aria-hidden className="pointer-events-none absolute inset-0" />
      <div className="relative z-10 w-full max-w-2xl space-y-6">
        <div className="text-center">
          <h2 className="text-balance font-semibold text-2xl text-foreground">
            Animated composer
          </h2>
          <p className="mt-2 text-pretty text-muted-foreground text-sm">
            Multi-line message field with send on ⌘ or Ctrl+Enter, loading line
            animation while sending, and an optional attachment affordance.
          </p>
        </div>
        <AnimatedComposer
          isLoading={isLoading}
          loadingCharDurationSec={LOADING_CHAR_DURATION_SEC}
          loadingStaggerSec={LOADING_STAGGER_SEC}
          loadingText="Sending…"
          onAttach={() => {
            // Demo: no-op; replace with file input / dialog.
          }}
          onChange={(e) => setValue(e.target.value)}
          onSend={() => {
            if (!value.trim() || isLoading) {
              return
            }
            setIsLoading(true)
            window.setTimeout(() => setIsLoading(false), MOCK_LOADING_MS)
          }}
          value={value}
        />
      </div>
    </main>
  )
}
