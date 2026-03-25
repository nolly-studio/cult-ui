---
title: FamilyButton
description: Animated expansion inspired by Family
component: true
links: {}
---

::component-preview{name="family-button-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[70%]" description="All variations"}
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
npx shadcn@latest add https://cult-ui.com/r/family-button.json
```

#manual

::steps
Copy and paste the following code into your project.

::component-source{name="family-button"}
::

Update the import paths to match your project setup.
::

::

## Usage

```tsx
<FamilyButton>
  <FamilyButtonHeader className="flex flex-col gap-4 justify-center items-center  ">
    <div className="p-3 bg-neutral-950 rounded-full">
      <Mail className="h-4 w-4 stroke-neutral-200" />
    </div>
  </FamilyButtonHeader>

  <FamilyButtonContent className=" w-48 ">
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum eos quia
      incidunt perspiciatis, ut, deleniti fugit a aliquam sequi, voluptatum
      pariatur quaerat. Temporibus sed facere at, voluptas dolorem officiis
      incidunt!
    </p>
  </FamilyButtonContent>
  <TextureSeparator />

  <div>
    <div className="dark:bg-neutral-800 bg-stone-100 pt-px rounded-b-[20px] overflow-hidden ">
      <div className="flex flex-col items-center justify-center">
        <div className="py-2 px-2">
          <p className="font-light dark:text-white text-black">
            Texture <span className="font-medium tracking-wide">card</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</FamilyButton>
```
