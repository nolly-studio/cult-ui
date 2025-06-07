"use client"

import { StripeBgGuides } from "../ui/stripe-bg-guides"

export default function StripeBgGuidesDemo() {
  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg border bg-background">
      {/* Modified StripeBgGuides to work within a container */}
      <StripeBgGuides
        columnCount={6}
        animated={true}
        animationDuration={8}
        glowColor="hsl(var(--primary))"
        randomize={true}
        randomInterval={3000}
        contained={true}
      />

      {/* Content to demonstrate the background effect */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="max-w-md text-center">
          <h3 className="text-2xl font-bold mb-2">Stripe Background Guides</h3>
          <p className="text-muted-foreground">
            Animated background guides with glowing effects, inspired by
            Stripe's design system.
          </p>
        </div>
      </div>
    </div>
  )
}
