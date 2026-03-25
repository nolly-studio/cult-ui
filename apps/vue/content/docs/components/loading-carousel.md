---
title: Loading Carousel
description: An animated carousel component with loading indicators and customizable display options.
component: true
---

::component-preview{name="loading-carousel-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[70%]"}
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
npx shadcn@latest add https://cult-ui.com/r/loading-carousel.json
```

#manual

::steps
Install the required dependencies:

```bash
npm install embla-carousel-autoplay framer-motion lucide-react
```

Install the carousel component:

```bash
npx shadcn@latest add carousel
```

Copy and paste the following code into your project.

::component-source{name="loading-carousel"}
::

Update the import paths to match your project setup.
::

::

## Usage

```tsx
export default function LoadingCarouselDemo() {
  return <LoadingCarousel />
}
```

## Props

| Prop               | Type                            | Default       | Description                              |
| ------------------ | ------------------------------- | ------------- | ---------------------------------------- |
| tips               | `Tip[]`                         | `defaultTips` | Array of tips to display in the carousel |
| autoplayInterval   | `number`                        | `4000`        | Time in milliseconds between slides      |
| showNavigation     | `boolean`                       | `false`       | Show previous/next navigation buttons    |
| showIndicators     | `boolean`                       | `true`        | Show slide indicator dots                |
| showProgress       | `boolean`                       | `true`        | Show progress bar for current slide      |
| aspectRatio        | `"video" \| "square" \| "wide"` | `"video"`     | Aspect ratio of the carousel             |
| textPosition       | `"top" \| "bottom"`             | `"bottom"`    | Position of the tip text                 |
| onTipChange        | `(index: number) => void`       | -             | Callback function when tip changes       |
| backgroundTips     | `boolean`                       | `false`       | Show tips on the image background        |
| backgroundGradient | `boolean`                       | `false`       | Show gradient overlay on background      |
| shuffleTips        | `boolean`                       | `false`       | Randomly shuffle the order of tips       |

## Examples

### Default

```tsx
<LoadingCarousel />
```

### Custom Interval and Navigation

```tsx
<LoadingCarousel autoplayInterval={2000} showNavigation={true} />
```

### Square Aspect Ratio with Background Tips

```tsx
<LoadingCarousel
  aspectRatio="square"
  backgroundTips={true}
  backgroundGradient={true}
/>
```

### Wide Aspect Ratio with Top Text

```tsx
<LoadingCarousel aspectRatio="wide" textPosition="top" showIndicators={false} />
```

### Shuffled Tips

```tsx
<LoadingCarousel
  shuffleTips={true}
  autoplayInterval={3000}
  showProgress={false}
/>
```
