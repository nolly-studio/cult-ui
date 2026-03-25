---
title: Neumorph Button
description: A neumorphic button component with customizable hover and press effects.
component: true
links: {}
---

::component-preview{name="neumorph-button-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[70%]"}
::

## References

::citations
---
label: "Inspiration"
items:
  - text: "Animations dot dev"
    href: "https://animations.dev/learn"
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
npx shadcn@latest add https://cult-ui.com/r/neumorph-button.json
```

#manual

::steps
Copy and paste the following code into your project.

::component-source{name="neumorph-button"}
::

Update the import paths to match your project setup.
::

::

## Usage

```tsx
export default function Example() {
  return <NeumorphButton>Click me</NeumorphButton>
}
```
