---
title: Onboarding
description: Composable multi-step onboarding primitives with feature carousel, choice group radio selector, tips list, and step indicator.
component: true
links: {}
---

::component-preview{name="onboarding-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[70%]"}
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
npx shadcn@latest add https://cult-ui.com/r/onboarding.json
```

#manual

::steps
Copy and paste the following code into your project.

::component-source{name="onboarding"}
::

Update the import paths to match your project setup.
::

::

## Usage

```tsx
import {
  Onboarding,
  FeatureCarousel,
  ChoiceGroup,
  TipsList,
  useOnboarding,
} from "@/components/ui/onboarding"
```

```tsx
<Onboarding totalSteps={3} onComplete={() => console.log("done")}>
  <Onboarding.StepIndicator />

  <Onboarding.Step step={1}>
    <Onboarding.Header
      title="Welcome"
      description="Here's what you can do"
    />
  </Onboarding.Step>

  <Onboarding.Step step={2}>
    <Onboarding.Header title="Personalize" description="Choose your role" />
    <ChoiceGroup name="role" onValueChange={(v) => setRole(v)}>
      <ChoiceGroup.Item value="designer">Designer</ChoiceGroup.Item>
      <ChoiceGroup.Item value="developer">Developer</ChoiceGroup.Item>
    </ChoiceGroup>
  </Onboarding.Step>

  <Onboarding.Step step={3}>
    <Onboarding.Header title="You're ready!" description="A few tips" />
    <TipsList title="Tips">
      <TipsList.Item number={1}>Be specific with your prompts.</TipsList.Item>
    </TipsList>
  </Onboarding.Step>

  <Onboarding.Navigation completeLabel="Get Started" />
</Onboarding>
```

## Components

### Onboarding (Root)

The root component manages step state and provides context to all children.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `totalSteps` | `number` | — | Total number of steps (required) |
| `value` | `number` | — | Controlled current step (1-based) |
| `defaultValue` | `number` | `1` | Default step for uncontrolled usage |
| `onValueChange` | `(step: number) => void` | — | Callback when step changes |
| `maxStepValue` | `number` | `0` | Max sub-step index for step 1 (e.g. feature carousel) |
| `canGoNext` | `(step, stepValue) => boolean` | `() => true` | Custom gate for proceeding |
| `onComplete` | `() => void` | — | Called when the last step is completed |

### Onboarding.Step

Renders children only when its `step` matches the current step.

| Prop | Type | Description |
| --- | --- | --- |
| `step` | `number` | Step index (1-based) |

### Onboarding.Header

Renders a centered title and description with serif font styling.

| Prop | Type | Description |
| --- | --- | --- |
| `title` | `string` | Step title |
| `description` | `string` | Step description |
| `children` | `ReactNode` | Custom content (overrides title/description) |

### Onboarding.Navigation

Default navigation with Back and Next/Complete buttons.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `backLabel` | `string` | `"Back"` | Back button label |
| `nextLabel` | `string` | `"Next"` | Next button label |
| `completeLabel` | `string` | `"Start Creating"` | Complete button label |
| `canGoNext` | `boolean` | — | Override next gate from context |
| `children` | `ReactNode` | — | Custom navigation content |

### Onboarding.StepIndicator

Connects to onboarding context and renders a `StepIndicator`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"dots" \| "pills"` | `"dots"` | Visual style of the indicators |
| `dotClassName` | `string` | — | Extra class for each step dot |

### FeatureCarousel

Tablist-style feature selector that syncs with `stepValue` in the onboarding context.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | — | Controlled active index |
| `defaultValue` | `number` | `0` | Default active index |
| `onValueChange` | `(index: number) => void` | — | Callback on change |
| `totalItems` | `number` | — | Total items (derived from children if omitted) |

#### FeatureCarousel.Item

| Prop | Type | Description |
| --- | --- | --- |
| `index` | `number` | Index of this item (0-based) |

### ChoiceGroup

Accessible radio group for single-select choices.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | — | Radio group name (required for a11y) |
| `value` | `string \| null` | — | Controlled selected value |
| `defaultValue` | `string \| null` | `null` | Default selected value |
| `onValueChange` | `(value: string) => void` | — | Callback on selection |
| `orientation` | `"horizontal" \| "vertical" \| "grid"` | `"grid"` | Layout orientation |

#### ChoiceGroup.Item

| Prop | Type | Description |
| --- | --- | --- |
| `value` | `string` | Value when this item is selected |

### TipsList

Ordered tips list with optional visible title.

| Prop | Type | Description |
| --- | --- | --- |
| `title` | `string` | Optional label (screen-reader only by default) |

#### TipsList.Item

| Prop | Type | Description |
| --- | --- | --- |
| `number` | `number` | Optional step number shown inline |

## Controlled Usage

```tsx
const [step, setStep] = useState(1)

<Onboarding
  value={step}
  onValueChange={setStep}
  totalSteps={3}
  canGoNext={(s) => s !== 2 || roleSelected}
  onComplete={handleComplete}
>
  {/* steps */}
</Onboarding>
```

## Sub-steps (Feature Carousel)

Pair `maxStepValue` on the root with a `FeatureCarousel` synced via `stepValue` to let users page through features before advancing:

```tsx
const FEATURES = ["Generate", "Ideas", "Upload"]

<Onboarding totalSteps={3} maxStepValue={FEATURES.length - 1}>
  <Onboarding.Step step={1}>
    {({ stepValue, setStepValue }) => (
      <FeatureCarousel
        value={stepValue}
        onValueChange={setStepValue}
        totalItems={FEATURES.length}
      >
        {FEATURES.map((f, i) => (
          <FeatureCarousel.Item key={f} index={i}>
            {f}
          </FeatureCarousel.Item>
        ))}
      </FeatureCarousel>
    )}
  </Onboarding.Step>
</Onboarding>
```
