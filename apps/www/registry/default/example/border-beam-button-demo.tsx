"use client"

import { useEffect, useId, useState, type ReactNode } from "react"
import type { BorderBeamColorVariant } from "border-beam"
import { ArrowRight, Pause, Play, Sparkles, Wand2, Zap } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  BorderBeamButton,
  BorderBeamIconButton,
} from "@/registry/default/ui/border-beam-button"

const COLOR_ROW: { key: BorderBeamColorVariant; label: string }[] = [
  { key: "colorful", label: "Colorful" },
  { key: "ocean", label: "Ocean" },
  { key: "sunset", label: "Sunset" },
  { key: "mono", label: "Mono" },
]

const BEAM_SIZES = ["sm", "md", "line"] as const

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h3 className="font-semibold text-foreground text-sm tracking-tight">
          {title}
        </h3>
        {description ? (
          <p className="text-pretty text-muted-foreground text-xs leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

export default function BorderBeamButtonDemo() {
  const id = useId()
  const [beamActive, setBeamActive] = useState(true)
  const [respectsReducedMotion, setRespectsReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setRespectsReducedMotion(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  const effectiveActive = beamActive && !respectsReducedMotion

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10 px-4 py-8 md:px-6">
      <header className="space-y-2 text-center">
        <p className="font-medium text-[11px] text-muted-foreground uppercase tracking-[0.2em]">
          Border beam
        </p>
        <h2 className="font-semibold text-foreground text-xl tracking-tight md:text-2xl">
          Button + traveling glow
        </h2>
        <p className="mx-auto max-w-lg text-pretty text-muted-foreground text-sm leading-relaxed">
          <span className="text-foreground/90">className</span> targets the
          shadcn <span className="text-foreground/90">Button</span>;{" "}
          <span className="text-foreground/90">borderBeamClassName</span> styles
          the beam wrapper. Use{" "}
          <span className="text-foreground/90">colorVariant</span>,{" "}
          <span className="text-foreground/90">beamSize</span>, and{" "}
          <span className="text-foreground/90">active</span> to tune the effect.
        </p>
      </header>

      <div className="">
        <Section
          description="Outline and secondary read well against the beam; default adds a stronger fill."
          title="Button variants"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <BorderBeamButton type="button" variant="default">
              Continue
            </BorderBeamButton>
            <BorderBeamButton type="button" variant="outline">
              Outline
            </BorderBeamButton>
            <BorderBeamButton type="button" variant="secondary">
              Secondary
            </BorderBeamButton>
            <BorderBeamButton type="button" variant="ghost">
              Ghost
            </BorderBeamButton>
          </div>
        </Section>
      </div>

      <div className="">
        <Section
          description="Same outline button; swap the beam palette."
          title="Beam color"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            {COLOR_ROW.map(({ key, label }) => (
              <BorderBeamButton
                colorVariant={key}
                key={key}
                type="button"
                variant="outline"
              >
                {label}
              </BorderBeamButton>
            ))}
          </div>
        </Section>
      </div>

      <div className="">
        <Section
          description="sm keeps a tight glow on controls; md is fuller; line is a bottom traveling accent."
          title="Beam size"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            {BEAM_SIZES.map((size) => (
              <BorderBeamButton
                beamSize={size}
                key={size}
                type="button"
                variant="outline"
              >
                <span className="font-mono text-xs">{size}</span>
              </BorderBeamButton>
            ))}
          </div>
        </Section>
      </div>

      <div className="">
        <Section
          description="Icon buttons default to icon sizing; pair with lucide icons."
          title="Icon buttons"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <BorderBeamIconButton
              aria-label="Sparkles"
              colorVariant="sunset"
              title="Sparkles"
              type="button"
              variant="outline"
            >
              <Sparkles aria-hidden className="size-3.5" />
            </BorderBeamIconButton>
            <BorderBeamIconButton
              aria-label="Zap"
              colorVariant="ocean"
              title="Zap"
              type="button"
              variant="secondary"
            >
              <Zap aria-hidden className="size-3.5" />
            </BorderBeamIconButton>
            <BorderBeamIconButton
              aria-label="Wand"
              colorVariant="mono"
              staticColors
              title="Wand"
              type="button"
              variant="outline"
            >
              <Wand2 aria-hidden className="size-3.5" />
            </BorderBeamIconButton>
          </div>
        </Section>
      </div>

      <div className="">
        <Section
          description="Toggle the beam without hiding the button. Respects prefers-reduced-motion."
          title="Interactive"
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <BorderBeamButton
              active={effectiveActive}
              className="gap-2 pr-5 pl-6"
              colorVariant="colorful"
              type="button"
              variant="outline"
            >
              Get started
              <ArrowRight aria-hidden className="size-4 opacity-80" />
            </BorderBeamButton>
            <BorderBeamIconButton
              aria-label={effectiveActive ? "Pause beam" : "Play beam"}
              aria-pressed={beamActive}
              colorVariant="ocean"
              onClick={() => setBeamActive((v) => !v)}
              title={effectiveActive ? "Pause beam" : "Play beam"}
              type="button"
              variant="secondary"
            >
              {effectiveActive ? (
                <Pause aria-hidden className="size-3.5" />
              ) : (
                <Play aria-hidden className="size-3.5" />
              )}
            </BorderBeamIconButton>
          </div>
          <p
            className={cn(
              "text-center text-xs",
              respectsReducedMotion
                ? "text-amber-600 dark:text-amber-400"
                : "text-muted-foreground"
            )}
            id={`${id}-hint`}
          >
            {respectsReducedMotion
              ? "Reduced motion is on — beam animation stays off."
              : "Tip: pause leaves the button fully clickable; the glow stops."}
          </p>
        </Section>
      </div>
    </div>
  )
}
