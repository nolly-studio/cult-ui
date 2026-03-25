---
title: Hero Static Radial Gradient
description: Split-layout hero section with responsive StaticRadialGradient shader visuals, CTA content, and tech stack badges.
component: true
links: {}
---

::component-preview{name="hero-static-radial-gradient-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[95%]" description="Responsive hero section with desktop and mobile StaticRadialGradient shader treatments"}
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
npx shadcn@latest add https://cult-ui.com/r/hero-static-radial-gradient.json
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

::component-source{name="hero-static-radial-gradient"}
::

Optionally copy the demo as a starting point.

::component-source{name="hero-static-radial-gradient-demo"}
::

Update import paths to match your project structure.
::

::

## Usage

```tsx
import {
  HeroStaticRadialGradientRoot,
  HeroStaticRadialGradientContainer,
  HeroStaticRadialGradientContent,
  HeroStaticRadialGradientHeading,
  HeroStaticRadialGradientDescription,
  HeroStaticRadialGradientActions,
  HeroStaticRadialGradientBadges,
  HeroStaticRadialGradientVisual,
  HeroStaticRadialGradientMobileVisual,
} from "@/components/ui/hero-static-radial-gradient"
```

```tsx
export default function Page() {
  return (
    <main className="min-h-screen">
      <HeroStaticRadialGradientRoot>
        <HeroStaticRadialGradientContainer>
          <HeroStaticRadialGradientContent>
            <HeroStaticRadialGradientHeading />
            <HeroStaticRadialGradientDescription />
            <HeroStaticRadialGradientActions />
            <div
              className="flex justify-center lg:justify-start"
              data-slot="hero-static-radial-gradient-badges-wrap"
            >
              <HeroStaticRadialGradientBadges />
            </div>
          </HeroStaticRadialGradientContent>
          <HeroStaticRadialGradientVisual />
        </HeroStaticRadialGradientContainer>
        <HeroStaticRadialGradientMobileVisual />
      </HeroStaticRadialGradientRoot>
    </main>
  )
}
```

## What You Get

- Split hero layout with copy and CTA on the left and StaticRadialGradient shader visual on the right.
- Memoized `StaticRadialGradient` render path for stable re-renders.
- Desktop and mobile shader variants with configurable colors, radius, focal point, falloff, distortion, and grain.
- Built-in badge row for highlighting stack metadata.
- Works as a full-width section and can be dropped into landing pages directly.

## API Reference

### Exports

| Export | Type | Description |
| --- | --- | --- |
| `HeroStaticRadialGradientRoot` | `HeroStaticRadialGradientRootProps` | Context provider and root section primitive |
| `HeroStaticRadialGradientContainer` | `div` primitive | Main hero grid wrapper |
| `HeroStaticRadialGradientContent` | `div` primitive | Left-side content column primitive |
| `HeroStaticRadialGradientHeading` | `HeroStaticRadialGradientHeadingProps` | Heading block primitive (title + subtitle) |
| `HeroStaticRadialGradientDescription` | `HeroStaticRadialGradientDescriptionProps` | Description block primitive |
| `HeroStaticRadialGradientActions` | `HeroStaticRadialGradientActionsProps` | CTA wrapper primitive |
| `HeroStaticRadialGradientCTA` | `HeroStaticRadialGradientCTAProps` | Reusable CTA slot component |
| `HeroStaticRadialGradientBadges` | `HeroStaticRadialGradientBadgesProps` | Reusable badge row primitive |
| `HeroStaticRadialGradientVisual` | `HeroStaticRadialGradientVisualProps` | Desktop visual shader wrapper primitive |
| `HeroStaticRadialGradientMobileVisual` | `HeroStaticRadialGradientMobileVisualProps` | Mobile visual shader wrapper primitive |
| `HeroStaticRadialGradient` / `default` | `HeroStaticRadialGradientProps` | Convenience assembled version built from primitives |
| `useHeroStaticRadialGradient` | `() => HeroStaticRadialGradientContextValue` | Hook for context-driven custom composition |

### Props

`HeroStaticRadialGradientRoot` owns shared defaults, normalized shader props, and composition state.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `srTitle` | `string` | `"AI SDK Agents"` | Screen-reader-only heading text |
| `title` | `ReactNode` | `"AI SDK Agents"` | First line of visible heading |
| `subtitle` | `ReactNode` | `"Copy and Paste"` | Second line of visible heading |
| `description` | `ReactNode` | built-in marketing copy | Supporting paragraph content |
| `showCta` | `boolean` | `true` | Toggle CTA rendering |
| `ctaProps` | `Partial<HeroStaticRadialGradientCTAProps>` | built-in CTA | Override CTA label/link/target/rel/click handler |
| `renderCta` | `(defaultCta) => ReactNode` | `undefined` | Wrap or replace default CTA node |
| `showBadges` | `boolean` | `true` | Toggle tech badges |
| `techStack` | `HeroStaticRadialGradientTechItem[]` | Next.js + AI SDK | Badge data source |
| `renderBadge` | `(tech, index, defaultBadge) => ReactNode` | `undefined` | Custom badge rendering hook |
| `desktopShaderProps` | `Partial<StaticRadialGradientProps>` | built-in desktop shader settings | Override desktop shader values |
| `mobileShaderProps` | `Partial<StaticRadialGradientProps>` | built-in mobile shader settings | Override mobile shader values |
| `className` | `string` | `undefined` | Root section class override |

### Shader props (StaticRadialGradient)

Passed via `desktopShaderProps` and `mobileShaderProps`. Common options:

| Prop | Type | Description |
| --- | --- | --- |
| `width` | `number` | Canvas width (e.g. 1280) |
| `height` | `number` | Canvas height (e.g. 720) |
| `colors` | `string[]` | Array of hex colors (e.g. `["#ed40b3", "#adfa1e", "#6ef7cc"]`) |
| `colorBack` | `string` | Background color (e.g. `"#ffffff00"` for transparent) |
| `radius` | `number` | Gradient radius (e.g. 0.98) |
| `focalDistance` | `number` | Focal distance (e.g. 0) |
| `focalAngle` | `number` | Focal angle (e.g. 0) |
| `falloff` | `number` | Falloff (e.g. 0.9) |
| `mixing` | `number` | Color mixing (e.g. 0.7) |
| `distortion` | `number` | Distortion amount (e.g. 0) |
| `distortionShift` | `number` | Distortion shift (e.g. 0) |
| `distortionFreq` | `number` | Distortion frequency (e.g. 12) |
| `grainMixer` | `number` | Grain mix (e.g. 1) |
| `grainOverlay` | `number` | Grain overlay (e.g. 0.5) |

## Customization Patterns

### Tune radial gradient colors and shape

Use shader override props without forking the component:

```tsx
<HeroStaticRadialGradientRoot
  desktopShaderProps={{
    width: 1280,
    height: 720,
    colors: ["#ed40b3", "#adfa1e", "#6ef7cc"],
    colorBack: "#ffffff00",
    radius: 0.98,
    focalDistance: 0,
    focalAngle: 0,
    falloff: 0.9,
    mixing: 0.7,
    distortion: 0,
    distortionShift: 0,
    distortionFreq: 12,
    grainMixer: 1,
    grainOverlay: 0.5,
  }}
  mobileShaderProps={{
    colors: ["#ed40b3", "#adfa1e", "#6ef7cc"],
    radius: 0.98,
    falloff: 0.9,
    mixing: 0.7,
  }}
>
  {/* compose primitives */}
</HeroStaticRadialGradientRoot>
```

### Swap hero copy and CTA

Replace copy and CTA target via props:

```tsx
<HeroStaticRadialGradientRoot
  title="Your Product"
  subtitle="Ship faster"
  description="Reusable hero primitive with configurable radial gradient visuals."
  ctaProps={{
    label: "Get started",
    href: "/signup",
    target: "_self",
  }}
>
  {/* compose primitives */}
</HeroStaticRadialGradientRoot>
```

### Compose with slot primitives

Use primitive exports for custom layout composition:

```tsx
<HeroStaticRadialGradientRoot>
  <HeroStaticRadialGradientContainer>
    <HeroStaticRadialGradientContent>
      <HeroStaticRadialGradientHeading />
      <HeroStaticRadialGradientDescription />
      <HeroStaticRadialGradientActions />
      <HeroStaticRadialGradientBadges />
    </HeroStaticRadialGradientContent>
    <HeroStaticRadialGradientVisual desktopShaderProps={{ colors: ["#006CFF", "#00d2ff", "#7c3aed"] }} />
  </HeroStaticRadialGradientContainer>
  <HeroStaticRadialGradientMobileVisual />
</HeroStaticRadialGradientRoot>
```

## Performance Notes

- `StaticRadialGradient` is wrapped with `memo` to avoid unnecessary rerenders.
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
