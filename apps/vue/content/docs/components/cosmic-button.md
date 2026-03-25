---
title: CosmicButton
description: An animated button/link with a cosmic gradient border effect
component: true
links: {}
---

::component-preview{name="cosmic-button-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[70%]" description="Link and button variants"}
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
npx shadcn@latest add https://cult-ui.com/r/cosmic-button.json
```

#manual

::steps
Copy and paste the following code into your project.

::component-source{name="cosmic-button"}
::

Add the required keyframes and utilities to your global CSS (e.g. globals.css):

```css
@keyframes cosmic-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes cosmic-spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}
/* If using Tailwind v4 @theme: */
/* --animate-cosmic-spin: cosmic-spin 3s linear infinite; */
/* --animate-cosmic-spin-slow: cosmic-spin-slow 5s linear infinite; */
```

Update the import paths to match your project setup.
::

::

## Usage

As a link (default):

```tsx
<CosmicButton href="/about">About</CosmicButton>
```

As a button:

```tsx
<CosmicButton as="button" onClick={handleClick}>
  Submit
</CosmicButton>
```
