---
title: BgAnimateButton
description: A button with gradient and animation defaults
component: true
links: {}
---

::component-preview{name="bg-animate-button-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[70%]" description="All variations"}
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
npx shadcn@latest add https://cult-ui.com/r/bg-animate-button.json
```

#manual

::steps
Copy and paste the following code into your project.

::component-source{name="bg-animate-button"}
::

Update the import paths to match your project setup.
::

::

## Usage

```tsx
const roundings = ["full", "xl", "2xl", "3xl", "sm"]
const gradients = [
  "sunrise",
  "ocean",
  "candy",
  "default",
  "forest",
  "sunset",
  "nebula",
]
const animations = ["spin", "pulse", "spin-slow", "spin-fast"]

export const BgAnimateDemo = () => {
  return (
    <div className="w-full max-w-4xl">
      <div className="min-h-[500px] px-12 md:px-24 flex flex-col justify-center border border-dashed rounded-lg space-y-4">
        {/* Roundings Grid */}

        <div className="grid grid-cols-3 gap-4">
          {roundings.slice(0, 2).map((rounding, i) => (
            <BgAnimateButton
              gradient={gradients[i + 1]}
              key={rounding}
              rounded={rounding}
            >
              {rounding}
            </BgAnimateButton>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {roundings.slice(2, 5).map((rounding, i) => (
            <BgAnimateButton
              gradient={gradients[i + 1]}
              key={rounding}
              rounded={rounding}
            >
              {rounding}
            </BgAnimateButton>
          ))}
        </div>

        {/* animations Grid */}
        <div className="grid grid-cols-4 gap-4">
          {animations.map((animations, i) => (
            <BgAnimateButton
              key={animations}
              gradient={gradients[i + 2]}
              variant="ghost"
              animation={animations}
            >
              {animations}
            </BgAnimateButton>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BgAnimateDemo
```
