---
title: CanvasFractalGrid
description: An interactive canvas fractal grid component to spice up your Hero.
component: true
links: {}
---

::component-preview{name="canvas-fractal-grid-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[70%]" description="All variations"}
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
npx shadcn@latest add https://cult-ui.com/r/canvas-fractal-grid.json
```

#manual

::steps
Copy and paste the following code into your project.

::component-source{name="canvas-fractal-grid"}
::

Update the import paths to match your project setup.
::

::

## Usage

```tsx
function CanvasFractalGridExample() {
  return (
    <div className="grid h-screen w-full pl-[56px] relative">
      <CanvasFractalGrid
        dotSize={3}
        dotSpacing={20}
        dotOpacity={0.4}
        gradientAnimationDuration={6}
        waveIntensity={60}
        waveRadius={250}
        enableGradient={true}
        enableMouseGlow={true}
        enableNoise={true}
      />
    </div>
  )
}

export default CanvasFractalGridExample
```
