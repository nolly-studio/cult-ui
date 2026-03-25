---
title: StripeBgGuides
description: A full screen background grid of lines that animate
component: true
links: {}
---

::component-preview{name="stripe-bg-guides-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[70%]" description="All variations"}
::

## Installation

::code-tabs
---
tabs:
  - label: "CLI"
    value: "cli"
  - label: "Manual"
    value: "manual"
---

#cli

```bash
npx shadcn@latest add https://cult-ui.com/r/stripe-bg-guides.json
```

#manual

::steps
Copy and paste the following code into your project.

::component-source{name="stripe-bg-guides"}
::

Update the import paths to match your project setup.
::

::

## Usage

```tsx
export default function StripeBgGuideDemo() {
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
```
