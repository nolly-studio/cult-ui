---
title: FractalDotGrid
description: An interactive canvas fractal dot grid component to add dynamic visual interest to your UI.
component: true
links: {}
---

::component-preview{name="bg-animated-fractal-dot-grid-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[70%]" description="All variations"}
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
npx shadcn@latest add https://cult-ui.com/r/bg-animated-fractal-grid.json
```

#manual

::steps
Copy and paste the following code into your project.

::component-source{name="bg-animated-fractal-dot-grid"}
::

Update the import paths to match your project setup.
::

::

## Usage

```tsx
function FractalDotGridExample() {
  return (
    <div className="h-screen w-screen relative">
      <FractalDotGrid
        dotSize={4}
        dotSpacing={20}
        dotOpacity={0.3}
        waveIntensity={30}
        waveRadius={200}
        dotColor="rgba(100, 100, 255, 1)"
        glowColor="rgba(100, 100, 255, 1)"
        enableNoise={true}
        noiseOpacity={0.03}
        enableMouseGlow={true}
        initialPerformance="medium"
      />
    </div>
  )
}

export default FractalDotGridExample
```
