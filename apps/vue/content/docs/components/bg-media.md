---
title: BgMedia
description: A full screen background media component for videos or images
component: true
links: {}
---

::component-preview{name="bg-media-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[70%]" description="All variations"}
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
npx shadcn@latest add https://cult-ui.com/r/bg-media.json
```

#manual

::steps
Copy and paste the following code into your project.

::component-source{name="bg-media"}
::

Update the import paths to match your project setup.
::

::

## Usage

```tsx
import BackgroundMedia from "@/components/ui/bg-media"

export default function BgMediaDemo() {
  return (
    <div className="w-full ">
      <div className="min-w-[20rem] md:min-w-[40rem] lg:md:min-w-[50rem]">
        <BackgroundMedia
          type="video"
          variant="light"
          src="https://openaicomproductionae4b.blob.core.windows.net/production-twill-01/c74791d0-75d2-48e6-acae-96d13bc97c56/paper-planes.mp4"
        />
      </div>
    </div>
  )
}
```
