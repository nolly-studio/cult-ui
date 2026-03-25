---
title: Neumorph Eyebrow
description: A neumorphic eyebrow text component with subtle animation effects.
component: true
links: {}
---

::component-preview{name="neumorph-eyebrow-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[70%]"}
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
npx shadcn@latest add https://cult-ui.com/r/neumorph-eyebrow.json
```

#manual

::steps
Copy and paste the following code into your project.

::component-source{name="neumorph-eyebrow"}
::

Update the import paths to match your project setup.
::

::

## Usage

```tsx
export default function Example() {
  return <NeumorphEyebrow>Featured Content</NeumorphEyebrow>
}
```

## Features

- Three variants: default, primary, and secondary
- Neumorphic design with subtle shadow effects
- Rounded pill shape
- Compact and lightweight

## Examples

### All Variants

```tsx
<div className="space-y-4">
  <NeumorphEyebrow>Default Eyebrow</NeumorphEyebrow>
  <NeumorphEyebrow intent="primary">Primary Eyebrow</NeumorphEyebrow>
  <NeumorphEyebrow intent="secondary">Secondary Eyebrow</NeumorphEyebrow>
</div>
```

### With Custom Styling

```tsx
<NeumorphEyebrow className="font-bold">Custom Styled Eyebrow</NeumorphEyebrow>
```

### Common Use Cases

```tsx
<div className="space-y-4">
  <div>
    <NeumorphEyebrow>NEW</NeumorphEyebrow>
    <h2>Feature Announcement</h2>
  </div>

  <div>
    <NeumorphEyebrow intent="primary">BETA</NeumorphEyebrow>
    <h2>Upcoming Feature</h2>
  </div>

  <div>
    <NeumorphEyebrow intent="secondary">UPDATED</NeumorphEyebrow>
    <h2>Recent Changes</h2>
  </div>
</div>
```
