"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import {
  showPolishedToast,
  type RimVariant,
} from "@/registry/default/ui/animated-toast"

/** Mirrors {@link AnimatedCard} surface chrome in animated-toast (layered inset + ambient depth). */
const toastLikeShadow =
  "shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_1px_2px_rgba(0,0,0,0.04),0_4px_14px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_1px_2px_rgba(0,0,0,0.35),0_4px_20px_rgba(0,0,0,0.35)]"

const toastLikeShadowHover =
  "fine-hover:hover:shadow-[0_1px_0_rgba(255,255,255,0.14)_inset,0_1px_2px_rgba(0,0,0,0.09),0_4px_14px_rgba(0,0,0,0.11)] dark:fine-hover:hover:shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_1px_2px_rgba(0,0,0,0.42),0_4px_20px_rgba(0,0,0,0.48)]"

const pressAndFocus =
  "transition-[background-color,border-color,box-shadow,transform,color] duration-200 ease-out motion-reduce:transition-none active:scale-[0.96] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

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

export default function AnimatedToastDemo() {
  const [index, setIndex] = useState(0)

  function pushWithRim(rimVariant: RimVariant) {
    const s = SAMPLES[index % SAMPLES.length] ?? SAMPLES[0]
    showPolishedToast({
      closeButton: false,
      description: s.description,
      messageKey: `sonner-${index}-${rimVariant}-${s.title}`,
      politeness: s.politeness,
      rimVariant,
      title: s.title,
    })
    setIndex((i) => i + 1)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="flex w-full max-w-lg flex-col items-center gap-12">
        <section className="flex w-full flex-col items-center gap-6">
          <div className="text-center">
            <h2 className="font-semibold text-foreground text-xl">
              Animated toast
            </h2>
            <p className="mt-2 max-w-md text-pretty text-muted-foreground text-sm">
              Stackable notifications with a gradient rim, frosted panel, and
              optional status or semantic rim colors. Dismiss from the viewport
              edge or use an in-card close control when enabled.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span
                className={cn(
                  "inline-flex rounded-[15px] p-px",
                  "bg-[linear-gradient(135deg,#ff0080_0%,#7928ca_42%,#00d4ff_100%)]",
                  toastLikeShadow,
                  "shadow-[0_4px_18px_rgba(121,40,202,0.22),0_1px_0_rgba(255,255,255,0.12)_inset] dark:shadow-[0_4px_22px_rgba(0,0,0,0.45),0_1px_0_rgba(255,255,255,0.06)_inset]"
                )}
              >
                <button
                  className={cn(
                    "inline-flex min-h-10 items-center justify-center rounded-[14px] px-4",
                    "bg-primary font-medium text-primary-foreground text-sm antialiased",
                    "shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]",
                    pressAndFocus,
                    "fine-hover:hover:bg-primary/92 fine-hover:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
                  )}
                  onClick={() => pushWithRim("default")}
                  type="button"
                >
                  Push toast (default rim)
                </button>
              </span>
              <button
                className={cn(
                  "inline-flex min-h-10 items-center justify-center rounded-[14px] border border-border/90 px-4",
                  "bg-linear-to-b from-card/92 to-card/78 font-medium text-foreground text-sm antialiased",
                  "backdrop-blur-xl backdrop-saturate-150",
                  toastLikeShadow,
                  toastLikeShadowHover,
                  pressAndFocus,
                  "fine-hover:hover:border-ring/45 dark:fine-hover:hover:border-zinc-500/55",
                  "fine-hover:hover:bg-linear-to-b fine-hover:hover:from-card fine-hover:hover:to-card/90"
                )}
                onClick={() => {
                  showPolishedToast({
                    closeButton: true,
                    description:
                      "Use the dismiss control on this card to close it.",
                    messageKey: `close-button-demo-${Date.now()}`,
                    politeness: "status",
                    title: "Toast with close button",
                  })
                }}
                type="button"
              >
                Push toast (with close)
              </button>
            </div>
            <p className="text-center text-muted-foreground text-xs">
              Success and error rim treatments
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                className={cn(
                  "inline-flex min-h-10 items-center justify-center rounded-[14px] border border-emerald-600/30 px-4",
                  "bg-linear-to-b from-emerald-500/12 via-emerald-600/8 to-teal-800/10",
                  "font-medium text-foreground text-sm antialiased",
                  "backdrop-blur-xl backdrop-saturate-150",
                  "shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_1px_2px_rgba(0,0,0,0.04),0_4px_14px_rgba(5,150,105,0.1)]",
                  "dark:shadow-[0_1px_0_rgba(255,255,255,0.05)_inset,0_4px_18px_rgba(5,150,105,0.12)]",
                  pressAndFocus,
                  "fine-hover:hover:border-emerald-500/45 fine-hover:hover:shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_4px_16px_rgba(16,185,129,0.14)]",
                  "fine-hover:hover:bg-linear-to-b fine-hover:hover:from-emerald-500/18 fine-hover:hover:via-emerald-600/12 fine-hover:hover:to-teal-800/14"
                )}
                onClick={() => {
                  showPolishedToast({
                    description:
                      "Your changes are synced. You can continue editing or invite collaborators.",
                    messageKey: `rim-success-${Date.now()}`,
                    politeness: "status",
                    rimVariant: "success",
                    title: "Saved to workspace",
                  })
                }}
                type="button"
              >
                Success rim
              </button>
              <button
                className={cn(
                  "inline-flex min-h-10 items-center justify-center rounded-[14px] border border-rose-600/35 px-4",
                  "bg-linear-to-b from-red-500/10 via-rose-600/8 to-red-950/12",
                  "font-medium text-foreground text-sm antialiased",
                  "backdrop-blur-xl backdrop-saturate-150",
                  "shadow-[0_1px_0_rgba(255,255,255,0.07)_inset,0_1px_2px_rgba(0,0,0,0.04),0_4px_14px_rgba(220,38,38,0.12)]",
                  "dark:shadow-[0_1px_0_rgba(255,255,255,0.05)_inset,0_4px_18px_rgba(220,38,38,0.14)]",
                  pressAndFocus,
                  "fine-hover:hover:border-rose-500/50 fine-hover:hover:shadow-[0_1px_0_rgba(255,255,255,0.09)_inset,0_4px_16px_rgba(244,63,94,0.16)]",
                  "fine-hover:hover:bg-linear-to-b fine-hover:hover:from-red-500/16 fine-hover:hover:via-rose-600/12 fine-hover:hover:to-red-950/16"
                )}
                onClick={() => {
                  showPolishedToast({
                    description:
                      "We could not complete that action. Try again or contact support if it keeps happening.",
                    messageKey: `rim-destructive-${Date.now()}`,
                    politeness: "alert",
                    rimVariant: "destructive",
                    title: "Something went wrong",
                  })
                }}
                type="button"
              >
                Error rim
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
