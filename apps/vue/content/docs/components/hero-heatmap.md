---
title: Hero Heatmap
description: Split-layout hero section with responsive Heatmap shader visuals (glowing gradient through an input shape), CTA content, and tech stack badges.
component: true
links: {}
---

::component-preview{name="hero-heatmap-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[95%]" description="Responsive hero section with desktop and mobile Heatmap shader treatments"}
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
npx shadcn@latest add https://cult-ui.com/r/hero-heatmap.json
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

::component-source{name="hero-heatmap"}
::

Optionally copy the demo as a starting point.

::component-source{name="hero-heatmap-demo"}
::

Update import paths to match your project structure.
::

::

## Usage

### Quick start with the composite component

Pass shader props directly on `HeroHeatmap` for a one-line hero:

```tsx
import { HeroHeatmap } from "@/components/ui/hero-heatmap"

export default function Page() {
  return (
    <main className="min-h-screen">
      <HeroHeatmap
        width={1280}
        height={720}
        image="https://shaders.paper.design/images/logos/diamond.svg"
        colors={[
          "#112069",
          "#1f3ca3",
          "#367c66",
          "#adfa1e",
          "#ffe77a",
          "#ff9a1f",
          "#ed40b3",
        ]}
        colorBack="#000000"
        contour={0.5}
        angle={0}
        noise={0}
        innerGlow={0.5}
        outerGlow={0.5}
        speed={1}
        scale={0.75}
      />
    </main>
  )
}
```

### Compose with primitives

For full control over layout and copy, use the root and slot components:

```tsx
import {
  HeroHeatmapRoot,
  HeroHeatmapContainer,
  HeroHeatmapContent,
  HeroHeatmapHeading,
  HeroHeatmapDescription,
  HeroHeatmapActions,
  HeroHeatmapBadges,
  HeroHeatmapVisual,
  HeroHeatmapMobileVisual,
} from "@/components/ui/hero-heatmap"
```

```tsx
export default function Page() {
  return (
    <main className="min-h-screen">
      <HeroHeatmapRoot>
        <HeroHeatmapContainer>
          <HeroHeatmapContent>
            <HeroHeatmapHeading />
            <HeroHeatmapDescription />
            <HeroHeatmapActions />
            <div
              className="flex justify-center lg:justify-start"
              data-slot="hero-heatmap-badges-wrap"
            >
              <HeroHeatmapBadges />
            </div>
          </HeroHeatmapContent>
          <HeroHeatmapVisual />
        </HeroHeatmapContainer>
        <HeroHeatmapMobileVisual />
      </HeroHeatmapRoot>
    </main>
  )
}
```

## What You Get

- Split hero layout with copy and CTA on the left and Heatmap shader visual on the right.
- Memoized `Heatmap` render path for stable re-renders.
- Desktop and mobile shader variants with configurable colors, contour, glow, angle, noise, speed, and scale.
- **Root-level shader props**: Pass `width`, `height`, `image`, `colors`, `colorBack`, `contour`, `angle`, `noise`, `innerGlow`, `outerGlow`, `speed`, and `scale` directly on `HeroHeatmap` or `HeroHeatmapRoot` for convenience.
- Built-in badge row for highlighting stack metadata.
- Works as a full-width section and can be dropped into landing pages directly.

## API Reference

### Exports

| Export | Type | Description |
| --- | --- | --- |
| `HeroHeatmapRoot` | `HeroHeatmapRootProps` | Context provider and root section primitive |
| `HeroHeatmapContainer` | `div` primitive | Main hero grid wrapper |
| `HeroHeatmapContent` | `div` primitive | Left-side content column primitive |
| `HeroHeatmapHeading` | `HeroHeatmapHeadingProps` | Heading block primitive (title + subtitle) |
| `HeroHeatmapDescription` | `HeroHeatmapDescriptionProps` | Description block primitive |
| `HeroHeatmapActions` | `HeroHeatmapActionsProps` | CTA wrapper primitive |
| `HeroHeatmapCTA` | `HeroHeatmapCTAProps` | Reusable CTA slot component |
| `HeroHeatmapBadges` | `HeroHeatmapBadgesProps` | Reusable badge row primitive |
| `HeroHeatmapVisual` | `HeroHeatmapVisualProps` | Desktop visual shader wrapper primitive |
| `HeroHeatmapMobileVisual` | `HeroHeatmapMobileVisualProps` | Mobile visual shader wrapper primitive |
| `HeroHeatmap` / `default` | `HeroHeatmapProps` | Convenience assembled version built from primitives |
| `useHeroHeatmap` | `() => HeroHeatmapContextValue` | Hook for context-driven custom composition |
| `HeroHeatmapShaderOverrides` | type | Shader props that can be passed at the root |

### Props

`HeroHeatmapRoot` owns shared defaults, normalized shader props, and composition state.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `srTitle` | `string` | `"AI SDK Agents"` | Screen-reader-only heading text |
| `title` | `ReactNode` | `"AI SDK Agents"` | First line of visible heading |
| `subtitle` | `ReactNode` | `"Copy and Paste"` | Second line of visible heading |
| `description` | `ReactNode` | built-in marketing copy | Supporting paragraph content |
| `showCta` | `boolean` | `true` | Toggle CTA rendering |
| `ctaProps` | `Partial<HeroHeatmapCTAProps>` | built-in CTA | Override CTA label/link/target/rel/click handler |
| `renderCta` | `(defaultCta) => ReactNode` | `undefined` | Wrap or replace default CTA node |
| `showBadges` | `boolean` | `true` | Toggle tech badges |
| `techStack` | `HeroHeatmapTechItem[]` | Next.js + AI SDK | Badge data source |
| `renderBadge` | `(tech, index, defaultBadge) => ReactNode` | `undefined` | Custom badge rendering hook |
| `desktopShaderProps` | `Partial<HeatmapProps>` | built-in desktop shader settings | Override desktop shader values |
| `mobileShaderProps` | `Partial<HeatmapProps>` | built-in mobile shader settings | Override mobile shader values |
| `className` | `string` | `undefined` | Root section class override |

### Root-level shader props (HeroHeatmapShaderOverrides)

You can pass these on `HeroHeatmap` or `HeroHeatmapRoot`; they are merged into both desktop and mobile shader props (before `desktopShaderProps` / `mobileShaderProps`).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `width` | `number` | `1280` | Canvas width |
| `height` | `number` | `720` | Canvas height |
| `image` | `string \| HTMLImageElement` | diamond SVG URL | Source image or URL (shape mask for the heatmap) |
| `colors` | `string[]` | 7-color palette | Array of hex colors for the heat gradient |
| `colorBack` | `string` | `"#000000"` | Background color |
| `contour` | `number` | `0.5` | Heat intensity near the edges of the shape (0–1) |
| `angle` | `number` | `0` | Direction of the heatwaves in degrees (0–360) |
| `noise` | `number` | `0` | Grain across the graphic (0–1) |
| `innerGlow` | `number` | `0.5` | Size of the heated area inside the shape (0–1) |
| `outerGlow` | `number` | `0.5` | Size of the heated area outside the shape (0–1) |
| `speed` | `number` | `1` | Animation speed |
| `scale` | `number` | `0.75` | Overall zoom (0.01–4) |

## Customization Patterns

### Tune Heatmap via root-level props

Use the composite component and pass shader props directly:

```tsx
<HeroHeatmap
  image="https://shaders.paper.design/images/logos/diamond.svg"
  colors={["#112069", "#1f3ca3", "#367c66", "#adfa1e", "#ffe77a", "#ff9a1f", "#ed40b3"]}
  colorBack="#0a0a0a"
  contour={0.6}
  angle={45}
  innerGlow={0.6}
  outerGlow={0.4}
  noise={0.1}
  speed={1.2}
  scale={0.8}
  width={1280}
  height={720}
/>
```

### Override desktop and mobile separately

Use `desktopShaderProps` and `mobileShaderProps` when composing with primitives:

```tsx
<HeroHeatmapRoot
  desktopShaderProps={{
    scale: 0.8,
    speed: 0.7,
    innerGlow: 0.6,
    outerGlow: 0.4,
  }}
  mobileShaderProps={{
    speed: 0.65,
  }}
>
  {/* compose primitives */}
</HeroHeatmapRoot>
```

### Swap hero copy and CTA

Replace copy and CTA target via props:

```tsx
<HeroHeatmapRoot
  title="Your Product"
  subtitle="Ship faster"
  description="Reusable hero primitive with configurable Heatmap visuals."
  ctaProps={{
    label: "Get started",
    href: "/signup",
    target: "_self",
  }}
>
  {/* compose primitives */}
</HeroHeatmapRoot>
```

### Replace badge rendering

Use `techStack` + `renderBadge` for custom chips:

```tsx
<HeroHeatmapRoot
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
</HeroHeatmapRoot>
```

### Compose with slot primitives

Use primitive exports for custom layout composition:

```tsx
<HeroHeatmapRoot>
  <HeroHeatmapContainer>
    <HeroHeatmapContent>
      <HeroHeatmapHeading />
      <HeroHeatmapDescription />
      <HeroHeatmapActions />
      <HeroHeatmapBadges />
    </HeroHeatmapContent>
    <HeroHeatmapVisual desktopShaderProps={{ scale: 0.9, innerGlow: 0.7 }} />
  </HeroHeatmapContainer>
  <HeroHeatmapMobileVisual />
</HeroHeatmapRoot>
```

## Performance Notes

- `Heatmap` is wrapped with `memo` to avoid unnecessary rerenders.
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
- Ensure `image` is a valid URL or loaded image; the Heatmap uses it as a shape mask.

### Layout looks crowded on small screens

- Increase the mobile shader container height.
- Reduce heading size classes or copy length.
- Move badges under the fold for dense hero content.
