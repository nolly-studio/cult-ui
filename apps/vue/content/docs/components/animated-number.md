---
title: AnimatedNumber
description: A simple animated number animation
component: true
---

::component-preview{name="animated-number-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[70%]" description="All variations"}
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
npx shadcn@latest add https://cult-ui.com/r/animated-number.json
```

#manual

::steps
Copy and paste the following code into your project.

::component-source{name="animated-number"}
::

Update the import paths to match your project setup.
::

::

## Usage

```tsx
function BasicExample() {
  const [value, setValue] = useState(1000)

  return (
    <div>
      <AnimatedNumber value={value} />
      <Button
        size="sm"
        variant="ghost"
        className="border border-primary/10 rounded-full "
        onClick={() => setValue(value + 1000)}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
```
