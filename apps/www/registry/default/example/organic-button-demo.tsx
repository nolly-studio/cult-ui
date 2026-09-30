"use client"

import { ArrowRight } from "lucide-react"

import { OrganicButton } from "@/registry/default/ui/organic-button"

export default function OrganicButtonDemo() {
  return (
    <div
      className="mx-auto max-w-3xl space-y-8 px-4 py-2"
      id="shape-button-section"
    >
      <p className="text-pretty text-muted-foreground text-sm leading-relaxed">
        Anchor-based control with fixed SVG end caps and shared surface colors
        via CSS variables on{" "}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-foreground text-xs">
          variantColor
        </code>
        .
      </p>

      <div className="space-y-3 rounded-xl border bg-muted/30 p-6">
        <p className="font-medium text-muted-foreground text-sm">Default</p>
        <div className="flex flex-wrap items-center gap-4">
          <OrganicButton href="#shape-button-section" label="Get started" />
        </div>
      </div>

      <div className="space-y-3 rounded-xl border bg-muted/30 p-6">
        <div>
          <p className="font-medium text-muted-foreground text-sm">Sizes</p>
          <p className="mt-1 text-muted-foreground text-xs">
            Row height and label type scale together: 36px / 44px / 56px (sm /
            md / lg).
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-6">
          <OrganicButton href="#shape-button-section" label="Small" size="sm" />
          <OrganicButton
            href="#shape-button-section"
            label="Medium"
            size="md"
          />
          <OrganicButton href="#shape-button-section" label="Large" size="lg" />
        </div>
      </div>

      <div className="space-y-3 rounded-xl border bg-muted/30 p-6">
        <p className="font-medium text-muted-foreground text-sm">Colors</p>
        <div className="flex flex-wrap items-center gap-4">
          <OrganicButton
            href="#shape-button-section"
            label="Primary"
            variantColor="primary"
          />
          <OrganicButton
            href="#shape-button-section"
            label="Secondary"
            variantColor="secondary"
          />
        </div>
      </div>
    </div>
  )
}
