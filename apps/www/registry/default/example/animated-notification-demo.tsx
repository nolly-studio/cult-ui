"use client"

import { useState } from "react"
import { AnimatePresence } from "motion/react"

import { AnimatedPolishedNotification } from "@/registry/default/ui/animated-notification"

const SAMPLES: {
  description: string
  politeness: "alert" | "status"
  title: string
}[] = [
  {
    politeness: "status",
    title: "Saved to workspace",
    description:
      "Your changes are synced. You can continue editing or invite collaborators from the share menu.",
  },
  {
    politeness: "status",
    title: "Copied to clipboard",
    description: "The snippet is ready to paste wherever you need it.",
  },
  {
    politeness: "alert",
    title: "Connection lost",
    description:
      "We will retry automatically. Check your network if this message persists.",
  },
]

export default function AnimatedNotificationDemo() {
  const [visible, setVisible] = useState(true)
  const [index, setIndex] = useState(0)
  const [slideFrom, setSlideFrom] = useState<"top" | "bottom">("bottom")

  const sample = SAMPLES[index % SAMPLES.length] ?? SAMPLES[0]

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="flex w-full max-w-lg flex-col items-center gap-10">
        <div className="text-center">
          <h2 className="font-semibold text-foreground text-xl">
            Local notification
          </h2>
          <p className="mt-2 max-w-md text-pretty text-muted-foreground text-sm">
            Brief status or alert messages with a frosted surface, icon, title,
            and body copy. Enter and exit with slide and fade from the top or
            bottom edge.
          </p>
        </div>

        <div className="flex min-h-40 w-full items-start justify-center">
          <AnimatePresence mode="wait">
            {visible ? (
              <AnimatedPolishedNotification
                className="max-w-sm"
                description={sample.description}
                key={`${index}-${sample.title}-${slideFrom}`}
                messageKey={String(index)}
                onDismiss={() => setVisible(false)}
                politeness={sample.politeness}
                slideFrom={slideFrom}
                title={sample.title}
              />
            ) : null}
          </AnimatePresence>
        </div>

        <div className="flex w-full flex-col items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              className="rounded-lg border border-border bg-card px-3 py-2 font-medium text-foreground text-sm shadow-sm transition-colors fine-hover:hover:bg-muted"
              onClick={() =>
                setSlideFrom((s) => (s === "bottom" ? "top" : "bottom"))
              }
              type="button"
            >
              Slide from: {slideFrom === "bottom" ? "bottom" : "top"}
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              className="rounded-lg border border-border bg-card px-3 py-2 font-medium text-foreground text-sm shadow-sm transition-colors fine-hover:hover:bg-muted"
              onClick={() => setVisible(true)}
              type="button"
            >
              Show
            </button>
            <button
              className="rounded-lg border border-border bg-card px-3 py-2 font-medium text-foreground text-sm shadow-sm transition-colors fine-hover:hover:bg-muted"
              onClick={() => setVisible(false)}
              type="button"
            >
              Hide
            </button>
            <button
              className="rounded-lg border border-border bg-primary px-3 py-2 font-medium text-primary-foreground text-sm shadow-sm transition-colors fine-hover:hover:bg-primary/90"
              onClick={() => {
                setVisible(true)
                setIndex((i) => i + 1)
              }}
              type="button"
            >
              Next message
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
