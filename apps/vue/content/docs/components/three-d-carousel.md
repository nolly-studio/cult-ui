---
title: 3D Carousel
description: A 3D image carousel
component: true
links: {}
---

::component-preview{name="three-d-carousel-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[70%]" description="All variations"}
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
npx shadcn@latest add https://cult-ui.com/r/three-d-carousel.json
```

#manual

::steps
Copy and paste the following code into your project.

::component-source{name="three-d-carousel"}
::

Update the import paths to match your project setup.
::

::

## Usage

```tsx
export default function ThreeDPhotoCarouselDemo() {
  return (
    <div className="w-full max-w-4xl">
      <div className="min-h-[500px]  flex flex-col justify-center border border-dashed rounded-lg space-y-4">
        <div className="p-2">
          <ThreeDPhotoCarousel />
        </div>
      </div>
    </div>
  )
}
```
