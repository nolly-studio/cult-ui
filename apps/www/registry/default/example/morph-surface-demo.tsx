"use client"

import { useState } from "react"
import { HelpCircle } from "lucide-react"

import { MorphSurface } from "@/registry/default/ui/morph-surface"

export default function MorphSurfaceDemo() {
  const [isControlledOpen, setIsControlledOpen] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    const message = formData.get("message") as string
    console.log("Submitted message:", message)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  return (
    <div className="p-8 space-y-12">
      {/* Default Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Default Usage</h2>
        <p className="text-sm text-muted-foreground">
          The component works out of the box with no configuration needed
        </p>
        <div className="flex justify-center items-center min-h-[300px] bg-muted/30 rounded-lg p-8">
          <MorphSurface />
        </div>
      </section>

      {/* Custom Labels and Content */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Custom Labels & Content</h2>
        <p className="text-sm text-muted-foreground">
          Customize trigger label, placeholder, and submit behavior
        </p>
        <div className="flex justify-center items-center min-h-[300px] bg-muted/30 rounded-lg p-8">
          <MorphSurface
            triggerLabel="Send Feedback"
            placeholder="Share your thoughts..."
            onSubmit={handleSubmit}
            onSuccess={() => {
              console.log("Feedback submitted successfully!")
            }}
          />
        </div>
      </section>

      {/* Custom Dimensions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Custom Dimensions</h2>
        <p className="text-sm text-muted-foreground">
          Adjust the size when collapsed and expanded
        </p>
        <div className="flex justify-center items-center min-h-[300px] bg-muted/30 rounded-lg p-8">
          <MorphSurface
            collapsedWidth="auto"
            collapsedHeight={48}
            expandedWidth={400}
            expandedHeight={250}
            triggerLabel="Custom Size"
            placeholder="This surface is larger..."
          />
        </div>
      </section>

      {/* Custom Trigger Icon */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Custom Trigger Icon</h2>
        <p className="text-sm text-muted-foreground">
          Add an icon to the trigger button
        </p>
        <div className="flex justify-center items-center min-h-[300px] bg-muted/30 rounded-lg p-8">
          <MorphSurface
            triggerLabel="Help"
            triggerIcon={<HelpCircle className="w-4 h-4" />}
            placeholder="How can we help you?"
            onSubmit={handleSubmit}
          />
        </div>
      </section>

      {/* Controlled State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Controlled State</h2>
        <p className="text-sm text-muted-foreground">
          Control the open/close state externally
        </p>
        <div className="flex flex-col items-center gap-4 min-h-[300px] bg-muted/30 rounded-lg p-8">
          <button
            type="button"
            onClick={() => setIsControlledOpen(!isControlledOpen)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            {isControlledOpen ? "Close" : "Open"} Morph Surface
          </button>
          <MorphSurface
            isOpen={isControlledOpen}
            onOpenChange={setIsControlledOpen}
            triggerLabel="Controlled"
            placeholder="This surface is controlled externally..."
            onSubmit={handleSubmit}
          />
        </div>
      </section>

      {/* Custom Animation Speed */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Custom Animation Speed</h2>
        <p className="text-sm text-muted-foreground">
          Speed up or slow down animations (higher values = slower animations)
        </p>
        <div className="flex justify-center items-center min-h-[300px] bg-muted/30 rounded-lg p-8">
          <MorphSurface
            animationSpeed={2}
            triggerLabel="Slow Animation"
            placeholder="Animations are slower..."
          />
        </div>
      </section>
    </div>
  )
}
