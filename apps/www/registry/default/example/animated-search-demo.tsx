"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react"

import { Button } from "@/components/ui/button"
import { AnimatedSearchInput } from "@/registry/default/ui/animated-search"

/** How long the demo keeps `isLoading` true; wire your real request the same way. */
const MOCK_LOADING_MS = 4800

/** Optional: tune loading line motion from the parent (defaults are already slower than placeholder). */
const LOADING_STAGGER_SEC = 0.044
const LOADING_CHAR_DURATION_SEC = 0.42

export default function AnimatedSearchDemo() {
  const [searchValue, setSearchValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [blobTranslucent, setBlobTranslucent] = useState(false)
  /** Browser timer id (`window.setTimeout`); avoid `NodeJS.Timeout` mismatch in tsc with `@types/node`. */
  const loadTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (loadTimerRef.current) {
        clearTimeout(loadTimerRef.current)
      }
    }
  }, [])

  const clearLoadingTimer = useCallback(() => {
    if (loadTimerRef.current) {
      clearTimeout(loadTimerRef.current)
      loadTimerRef.current = null
    }
  }, [])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || isLoading) {
      return
    }
    const q = e.currentTarget.value.trim()
    if (!q) {
      return
    }
    e.preventDefault()
    clearLoadingTimer()
    setIsLoading(true)
    loadTimerRef.current = window.setTimeout(() => {
      setIsLoading(false)
      loadTimerRef.current = null
    }, MOCK_LOADING_MS) as number
  }

  const handleClear = useCallback(() => {
    clearLoadingTimer()
    setIsLoading(false)
    setSearchValue("")
  }, [clearLoadingTimer])

  return (
    <div className="mx-auto flex min-h-[min(70vh,520px)] max-w-2xl flex-col justify-center space-y-10 px-4 py-10 sm:px-6 sm:py-14">
      <div className="text-center">
        <p className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">
          Component demo
        </p>
        <h1 className="mb-3 text-balance font-semibold text-2xl text-foreground sm:text-3xl">
          Animated search
        </h1>
        <p className="mx-auto max-w-md text-balance text-muted-foreground text-sm leading-relaxed sm:text-base">
          Press{" "}
          <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[11px]">
            Enter
          </kbd>{" "}
          to run a mock search — loading state matches how you&apos;d gate a
          real fetch. Clear resets the request timer too. Toggle frosted fill to
          see the gradient blobs through the field.
        </p>
      </div>

      <div className="space-y-4">
        <AnimatedSearchInput
          aria-label="Demo search"
          autoComplete="off"
          blobTranslucent={blobTranslucent}
          isLoading={isLoading}
          loadingCharDurationSec={LOADING_CHAR_DURATION_SEC}
          loadingStaggerSec={LOADING_STAGGER_SEC}
          loadingText="Searching…"
          onChange={(e) => setSearchValue(e.target.value)}
          onClear={handleClear}
          onKeyDown={handleKeyDown}
          placeholder="Search docs, APIs, or ask a question…"
          value={searchValue}
        />

        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
          <Button
            onClick={() => setBlobTranslucent((v) => !v)}
            size="sm"
            type="button"
            variant={blobTranslucent ? "default" : "outline"}
          >
            {blobTranslucent ? "Solid fill" : "Frosted fill"}
          </Button>
        </div>

        <p className="text-center text-muted-foreground text-xs sm:text-left">
          Clear the field or use the trailing control to see the deletion
          animation. Prefer reduced motion? Effects shorten or disable
          automatically.
        </p>
      </div>
    </div>
  )
}
