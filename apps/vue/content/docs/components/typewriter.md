---
title: Typewriter
description: A repeating typewriter effect
component: true
links: {}
---

::component-preview{name="typewriter-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[70%]" description="All variations"}
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
npx shadcn@latest add https://cult-ui.com/r/typewriter.json
```

#manual

::steps
Copy and paste the following code into your project.

::component-source{name="typewriter"}
::

Update the import paths to match your project setup.
::

::

## Usage

```tsx
const texts = [
  "Testing 124",
  "Look at newcult.co",
  "and check gnow.io",
  "Sick af",
]

export default function TypewriterDemo() {
  return (
    <IosOgShellCard>
      <div className="ml-auto px-4 py-2 mb-3 text-white bg-blue-500 rounded-2xl">
        <p className="text-sm md:text-base font-semibold text-base-900 truncate">
          <Typewriter texts={texts} delay={1} baseText="Yo " />
        </p>
      </div>
    </IosOgShellCard>
  )
}
```
