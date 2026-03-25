---
title: Introduction
description: Motion-rich, niche components for shadcn/ui projects. Accessible, customizable, and open source.
---

Cult UI is an extension of the shadcn/ui ecosystem: a curated set of niche, animated components built to work with shadcn theme variables, patterns, and workflows.

This is not a traditional npm component package. Components are distributed as source via the registry and can be copied into your codebase, so you fully own and customize what you ship.

**What does "not a component library" mean here?**

It means no black-box dependency layer. You do not install a monolithic UI package from npm and style around its constraints.

Instead, pick the components you need, add them through the shadcn registry CLI or copy the source, and adapt them to your product.

_Use Cult UI as a reference implementation for building your own design system on top of shadcn._

## FAQ

::accordion

:::accordion-item{value="faq-1"}
---
title: "Why copy/paste and not packaged as a dependency?"
---
The idea behind this is to give you ownership and control over the code, allowing you to decide how the components are built and styled.

Start with some sensible defaults, then customize the components to your needs.

One of the drawback of packaging the components in an npm package is that the style is coupled with the implementation. _The design of your components should be separate from their implementation._
:::

:::accordion-item{value="faq-2"}
---
title: "Do you plan to publish it as an npm package?"
---
No. I have no plans to publish it as an npm package.
:::

:::accordion-item{value="faq-3"}
---
title: "Which frameworks are supported?"
---
You can use any framework that supports React. [Next.js](https://ui.Jordan-Gilliam.com/docs/installation/next), [Astro](https://ui.Jordan-Gilliam.com/docs/installation/astro), [Remix](https://ui.Jordan-Gilliam.com/docs/installation/remix), [Gatsby](https://ui.Jordan-Gilliam.com/docs/installation/gatsby) etc.
:::

:::accordion-item{value="faq-4"}
---
title: "Can I use this in my project?"
---
Yes. Free to use for personal and commercial projects. No attribution required.

But hey, let me know if you do. I'd love to see what you build.
:::
::
