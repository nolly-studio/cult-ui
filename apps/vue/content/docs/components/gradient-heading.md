---
title: GradientHeading
description: A cool gradient heading component
component: true
links: {}
---

::component-preview{name="gradient-heading-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[70%]" description="All variations"}
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
npx shadcn@latest add https://cult-ui.com/r/gradient-heading.json
```

#manual

::steps
Copy and paste the following code into your project.

::component-source{name="gradient-heading"}
::

Update the import paths to match your project setup.
::

::

## Usage

```tsx
export default function GradientHeadingExample() {
  return (
    <GradientHeading variant="default" size="lg" weight="bold">
      Like and subscribe
    </GradientHeading>
  )
}
```
