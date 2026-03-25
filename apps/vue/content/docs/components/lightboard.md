---
title: LightBoard
description: A fun lightboard component used to display moving text and draw in a visually appealing way.
component: true
links: {}
---

::component-preview{name="lightboard-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[70%]" description="All variations"}
::

## References

::citations
---
label: "Inspiration"
items:
  - text: "Rauno Nextjs Blog"
    href: "https://rauno.me/craft/nextjs"
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
npx shadcn@latest add https://cult-ui.com/r/lightboard.json
```

#manual

::steps
Copy and paste the following code into your project.

::component-source{name="lightboard"}
::

Update the import paths to match your project setup.
::

::

## Usage

```tsx
// Example usage of the Dock component with animated cards and dividers

const LightBoardDemo = () => {
  return (
    <LightBoard
      size={LightBoardSize.Large}
      lightSize={4}
      gap={1}
      text="Hello World"
      font="default"
      updateInterval={100}
    />
  )
}

export default LightBoardDemo
```
