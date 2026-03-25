---
title: Hero Dithering
description: Split-layout hero section with responsive dithering shader visuals, CTA content, and tech stack badges.
component: true
links: {}
---

::component-preview{name="hero-dithering-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[95%]" description="Responsive hero section with desktop and mobile dithering treatments"}
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
npx shadcn@latest add https://cult-ui.com/r/hero-dithering.json
```

#manual

::steps
Install required dependencies.

```bash
npm install @paper-design/shaders-react
```

Install required registry dependencies if they are not already in your project.

```bash
npx shadcn@latest add button badge
```

Copy and paste the component source into your project.

::component-source{name="hero-dithering"}
::

Optionally copy the demo as a starting point.

::component-source{name="hero-dithering-demo"}
::

Update import paths to match your project structure.
::

::

## Usage

```tsx
import {
  HeroDitheringRoot,
  HeroDitheringContainer,
  HeroDitheringContent,
  HeroDitheringHeading,
  HeroDitheringDescription,
  HeroDitheringActions,
  HeroDitheringBadges,
  HeroDitheringVisual,
  HeroDitheringMobileVisual,
} from "@/components/ui/hero-dithering"
```

```tsx
export default function Page() {
  return (
    <main className="min-h-screen">
      <HeroDitheringRoot>
        <HeroDitheringContainer>
          <HeroDitheringContent>
            <HeroDitheringHeading />
            <HeroDitheringDescription />
            <HeroDitheringActions />
            <div
              className="flex justify-center lg:justify-start"
              data-slot="hero-dithering-badges-wrap"
            >
              <HeroDitheringBadges />
            </div>
          </HeroDitheringContent>
          <HeroDitheringVisual />
        </HeroDitheringContainer>
        <HeroDitheringMobileVisual />
      </HeroDitheringRoot>
    </main>
  )
}
```

## What You Get

- Split hero layout with copy and CTA on the left and shader visual on the right.
- Memoized `Dithering` render path for stable re-renders.
- Desktop and mobile shader variants with different scale/speed tuning.
- Built-in badge row for highlighting stack metadata.
- Works as a full-width section and can be dropped into landing pages directly.

## API Reference

### Exports

| Export | Type | Description |
| --- | --- | --- |
| `HeroDitheringRoot` | `HeroDitheringRootProps` | Context provider and root section primitive |
| `HeroDitheringContainer` | `div` primitive | Main hero grid wrapper |
| `HeroDitheringContent` | `div` primitive | Left-side content column primitive |
| `HeroDitheringHeading` | `HeroDitheringHeadingProps` | Heading block primitive (title + subtitle) |
| `HeroDitheringDescription` | `HeroDitheringDescriptionProps` | Description block primitive |
| `HeroDitheringActions` | `HeroDitheringActionsProps` | CTA wrapper primitive |
| `HeroDitheringCTA` | `HeroDitheringCTAProps` | Reusable CTA slot component |
| `HeroDitheringBadges` | `HeroDitheringBadgesProps` | Reusable badge row primitive |
| `HeroDitheringVisual` | `HeroDitheringVisualProps` | Desktop visual shader wrapper primitive |
| `HeroDitheringMobileVisual` | `HeroDitheringMobileVisualProps` | Mobile visual shader wrapper primitive |
| `HeroDithering` / `default` | `HeroDitheringProps` | Convenience assembled version built from primitives |
| `useHeroDithering` | `() => HeroDitheringContextValue` | Hook for context-driven custom composition |

### Props

`HeroDitheringRoot` owns shared defaults, normalized shader props, and composition state.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `srTitle` | `string` | `"AI SDK Agents"` | Screen-reader-only heading text |
| `title` | `ReactNode` | `"AI SDK Agents"` | First line of visible heading |
| `subtitle` | `ReactNode` | `"You can Copy & Paste"` | Second line of visible heading |
| `description` | `ReactNode` | built-in marketing copy | Supporting paragraph content |
| `showCta` | `boolean` | `true` | Toggle CTA rendering |
| `ctaProps` | `Partial<HeroDitheringCTAProps>` | built-in CTA | Override CTA label/link/target/rel/click handler |
| `renderCta` | `(defaultCta) => ReactNode` | `undefined` | Wrap or replace default CTA node |
| `showBadges` | `boolean` | `true` | Toggle tech badges |
| `techStack` | `HeroDitheringTechItem[]` | Next.js + AI SDK | Badge data source |
| `renderBadge` | `(tech, index, defaultBadge) => ReactNode` | `undefined` | Custom badge rendering hook |
| `desktopShaderProps` | `Partial<DitheringProps>` | built-in desktop shader settings | Override desktop shader values |
| `mobileShaderProps` | `Partial<DitheringProps>` | built-in mobile shader settings | Override mobile shader values |
| `className` | `string` | `undefined` | Root section class override |

## Customization Patterns

### Tune Dithering Colors and Pixel Density

Use shader override props without forking the component:

```tsx
<HeroDitheringRoot
  desktopShaderProps={{
    colorFront: "#006CFF",
    speed: 0.8,
    scale: 0.75,
  }}
  mobileShaderProps={{
    colorFront: "#006CFF",
    speed: 0.7,
  }}
>
  {/* compose primitives */}
</HeroDitheringRoot>
```

### Swap Hero Copy and CTA

Replace copy and CTA target via props:

```tsx
<HeroDitheringRoot
  title="Composable Hero Dithering"
  subtitle="Ship branded launches faster"
  description="Reusable hero primitive with configurable visuals and slots."
  ctaProps={{
    label: "Explore workflows",
    href: "/workflows",
    target: "_self",
    rel: undefined,
  }}
>
  {/* compose primitives */}
</HeroDitheringRoot>
```

### Replace Badge Rendering

Use `techStack` + `renderBadge` for custom chips while preserving defaults:

```tsx
<HeroDitheringRoot
  techStack={[
    { name: "Next.js", version: "v16" },
    { name: "AI SDK", version: "v6" },
    { name: "Tailwind", version: "v4" },
  ]}
  renderBadge={(tech, _index, defaultBadge) =>
    tech.name === "AI SDK" ? (
      <span className="rounded-b-full border px-3 py-1 text-xs font-semibold">
        {tech.name} {tech.version}
      </span>
    ) : (
      defaultBadge
    )
  }
>
  {/* compose primitives */}
</HeroDitheringRoot>
```

### Compose with Slot Primitives

Use primitive exports for custom layout composition:

```tsx
<HeroDitheringRoot>
  <HeroDitheringContainer>
    <HeroDitheringContent>
      <HeroDitheringHeading />
      <HeroDitheringDescription />
      <HeroDitheringActions />
      <HeroDitheringBadges />
    </HeroDitheringContent>
    <HeroDitheringVisual desktopShaderProps={{ colorFront: "#00d2ff" }} />
  </HeroDitheringContainer>
  <HeroDitheringMobileVisual />
</HeroDitheringRoot>
```

## Performance Notes

- `Dithering` is wrapped with `memo` to avoid unnecessary rerenders.
- Mobile and desktop effects are rendered as separate sections so each layout can be tuned independently.
- Keep the hero in client-rendered regions only (`"use client"` is required).

## Accessibility Notes

- Includes a screen-reader-only heading (`sr-only`) so page structure remains meaningful.
- CTA link includes `rel="noopener noreferrer"` when opened in a new tab.
- Ensure visible contrast remains sufficient if you change shader colors or text opacity.

## Troubleshooting

### Shader does not render

- Confirm `@paper-design/shaders-react` is installed.
- Verify this component runs in a client context.
- Confirm parent containers are not clipping to zero height.

### Layout looks crowded on small screens

- Increase the mobile shader container height.
- Reduce heading size classes or copy length.
- Move badges under the fold for dense hero content.
