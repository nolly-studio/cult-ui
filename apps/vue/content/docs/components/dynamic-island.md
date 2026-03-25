---
title: DynamicIsland
description: Composable, animated Dynamic Island primitives for building adaptive notification, status, and action surfaces.
component: true
links: {}
---

::component-preview{name="dynamic-island-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[70%]" description="Interactive state transitions"}
::

## References

::citations
---
label: "Inspiration"
items:
  - text: "Recreating the Dynamic Island by Sunghyun "Siwoo" Cho"
    href: "https://cho.sh/w/9F7F85"
---
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
npx shadcn@latest add https://cult-ui.com/r/dynamic-island.json
```

#manual

::steps
Install the following dependencies:

```bash
npm install motion
```

Copy and paste the following code into your project.

::component-source{name="dynamic-island"}
::

Update the import paths to match your project setup.
::

::

## Usage

```tsx
import {
  DynamicIsland,
  DynamicIslandProvider,
  DynamicContainer,
  DynamicDiv,
  DynamicDescription,
  DynamicTitle,
  useDynamicIslandSize,
} from "@/components/ui/dynamic-island"
```

```tsx
const STATES = ["compact", "large", "tall", "long", "medium"] as const

function DynamicIslandContent() {
  const { state, setSize } = useDynamicIslandSize()

  const cycleState = () => {
    const currentIndex = STATES.indexOf(state.size as (typeof STATES)[number])
    const nextIndex = (currentIndex + 1) % STATES.length
    setSize(STATES[nextIndex])
  }

  const renderState = () => {
    switch (state.size) {
      case "compact":
        return (
          <DynamicContainer className="flex h-full w-full items-center justify-between px-4 text-white">
            <DynamicDescription className="text-sm opacity-80">Now playing</DynamicDescription>
            <DynamicTitle className="text-sm font-semibold">Cult FM</DynamicTitle>
          </DynamicContainer>
        )
      case "large":
        return (
          <DynamicContainer className="flex h-full w-full items-center justify-center">
            <DynamicTitle className="text-2xl font-black text-white">Syncing...</DynamicTitle>
          </DynamicContainer>
        )
      case "tall":
        return (
          <DynamicContainer className="flex h-full w-full flex-col items-start gap-2 p-5 text-white">
            <DynamicTitle className="text-xl font-bold">New message</DynamicTitle>
            <DynamicDescription className="text-sm text-neutral-300">
              Your team invited you to review the latest release.
            </DynamicDescription>
          </DynamicContainer>
        )
      default:
        return (
          <DynamicContainer className="flex h-full w-full items-center justify-center">
            <DynamicDiv className="text-sm text-white/90">Tap to cycle states</DynamicDiv>
          </DynamicContainer>
        )
    }
  }

  return (
    <>
      <button onClick={cycleState}>Cycle</button>
      <DynamicIsland id="example-island">{renderState()}</DynamicIsland>
    </>
  )
}

export default function Example() {
  return (
    <DynamicIslandProvider initialSize="default">
      <DynamicIslandContent />
    </DynamicIslandProvider>
  )
}
```

## Anatomy

The Dynamic Island is built from small primitives you compose together:

- `DynamicIslandProvider` manages size state and transition queue.
- `DynamicIsland` renders the animated shell (width, height, radius).
- `DynamicContainer` wraps each state view with enter/exit motion.
- `DynamicTitle`, `DynamicDescription`, and `DynamicDiv` animate content blocks.
- `useDynamicIslandSize` gives you `state`, `setSize`, and `scheduleAnimation`.

## Size Presets

Use these built-in shape presets with `setSize(...)` or `initialSize`.

| Preset | Intended use |
| --- | --- |
| `default` | Idle base state |
| `compact` | Small status indicator |
| `compactLong` | Compact but wider row |
| `compactMedium` | Medium compact card |
| `large` | Prominent status/action |
| `long` | Horizontal content row |
| `medium` | Multi-line panel |
| `tall` | Stacked content |
| `ultra` | Large immersive panel |
| `massive` | Full, oversized layout |
| `minimalLeading` | Tiny leading indicator |
| `minimalTrailing` | Tiny trailing indicator |
| `reset` | Internal reset shape |
| `empty` | Hidden/zero layout |

## Controlled State Transitions

Switch island layouts directly from app events:

```tsx
const { setSize } = useDynamicIslandSize()

setSize("compact")
setSize("medium")
```

Use the current and previous state to render context-aware UI:

```tsx
const { state } = useDynamicIslandSize()

<span>Current: {state.size}</span>
<span>Previous: {state.previousSize}</span>
```

## Scheduled Animations

Queue a sequence of size transitions for guided flows:

```tsx
import { useScheduledAnimations } from "@/components/ui/dynamic-island"

function IntroSequence() {
  useScheduledAnimations([
    { size: "compact", delay: 800 },
    { size: "large", delay: 1200 },
    { size: "tall", delay: 1400 },
    { size: "medium", delay: 1000 },
  ])

  return null
}
```

`delay` is the wait time (in milliseconds) before each step.

## API Reference

### `DynamicIslandProvider`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Provider contents |
| `initialSize` | `SizePresets` | `"default"` | Initial island size |
| `initialAnimation` | `{ size: SizePresets; delay: number }[]` | `[]` | Optional initial transition queue |

### `DynamicIsland`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | — | Required id for the animated island element |
| `children` | `ReactNode` | — | State-specific content |
| `...props` | `HTMLMotionProps<"div">` | — | Passed to the root motion container |

### `DynamicContainer`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | Additional classes for the animated wrapper |
| `children` | `ReactNode` | — | Content for current size state |

### `DynamicTitle`, `DynamicDescription`, `DynamicDiv`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | Styling classes |
| `children` | `ReactNode` | — | Animated content |

### `useDynamicIslandSize()`

Returns:

| Key | Type | Description |
| --- | --- | --- |
| `state.size` | `SizePresets` | Current active preset |
| `state.previousSize` | `SizePresets \| undefined` | Previously rendered preset |
| `state.animationQueue` | `{ size: SizePresets; delay: number }[]` | Pending queued transitions |
| `state.isAnimating` | `boolean` | Whether a queued animation sequence is in progress |
| `setSize` | `(size: SizePresets) => void` | Immediately switch to a preset |
| `scheduleAnimation` | `(steps: { size: SizePresets; delay: number }[]) => void` | Queue timed transitions |
| `presets` | `Record<SizePresets, Preset>` | Raw preset dimensions and radii |

## Best Practices

- Keep each size state focused on one job (status, CTA, detail, confirmation).
- Prefer `DynamicContainer` per state to keep transitions smooth and predictable.
- Use `state.isAnimating` to disable controls during scripted animation sequences.
- Keep heavy effects or expensive rendering outside frequently changing state views.
- Place this component in client-rendered UI (`"use client"`), since it depends on browser size and motion.
