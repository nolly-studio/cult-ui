---
title: GradientButtonGroup
description: Premium, layered button group navigation with animated active states and a theme-toggle underlay.
component: true
links: {}
---

::component-preview{name="gradient-button-group-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[75%]" description="Layered container and animated active button ring"}
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
npx shadcn@latest add https://cult-ui.com/r/gradient-button-group.json
```

#manual

::steps
Install the following dependency:

```bash
npm install motion
```

Copy and paste the following code into your project.

::component-source{name="gradient-button-group"}
::

Add the required animation utility to your global styles.

```css
@keyframes gold-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@utility animate-gold-spin {
  animation: gold-spin 3s linear infinite;
}
```

Update import paths to match your project setup.
::

::

## Usage

```tsx
import { GradientButtonGroup } from "@/components/ui/gradient-button-group"

export function Example() {
  return <GradientButtonGroup />
}
```
