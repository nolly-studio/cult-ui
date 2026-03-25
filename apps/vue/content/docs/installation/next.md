---
title: Next.js
description: Install and configure Next.js.
---

::steps
### Create project

Start by creating a new Next.js project using `create-next-app`:

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
```

### Run the CLI

Run the `cult-ui` init command to setup your project:

```bash
npx cult-ui@latest init
```

### Add motion

Install `motion` for animation-powered components:

```bash
npm install motion
```

### Configure components.json

You will be asked a few questions to configure `components.json`:

```txt showLineNumbers
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Do you want to use CSS variables for colors? › no / yes
```

### Fonts (Tailwind v4)

I use [Inter](https://rsms.me/inter/) as the default font. Inter is not required. You can replace it with any other font.

Here's how I configure Inter for Next.js:

**1. Import the font in the root layout:**

```js showLineNumbers title=app/layout.tsx {2,5-8,16-17}
import "@/styles/globals.css"
import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
})

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        ...
      </body>
    </html>
  )
}
```

**2. Map your font variable in `globals.css`**

```css title="app/globals.css"
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-inter);
}
```

### App structure

Here's how I structure my Next.js apps. You can use this as a reference:

```txt {6-10,14-15}
.
├── app
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── ui
│   │   ├── alert-dialog.tsx
│   │   ├── button.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── ...
│   ├── main-nav.tsx
│   ├── page-header.tsx
│   └── ...
├── lib
│   └── utils.ts
├── styles
│   └── globals.css
├── next.config.js
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

- I place the UI components in the `components/ui` folder.
- The rest of the components such as `<PageHeader />` and `<MainNav />` are placed in the `components` folder.
- The `lib` folder contains all the utility functions. I have a `utils.ts` where I define the `cn` helper.
- The `styles` folder contains the global CSS.

### That's it

You can now start adding components to your project.

```bash
npx cult-ui@latest add button
```

The command above will add the `Button` component to your project. You can then import it like this:

```tsx {1,6} showLineNumbers
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}
```
::
