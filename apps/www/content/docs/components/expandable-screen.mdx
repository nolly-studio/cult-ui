---
title: ExpandableScreen
description: A full-screen expandable component with morphing animations using shared layout IDs for smooth transitions
component: true
links: {}
---

<ComponentPreview
  name="expandable-screen-demo"
  className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[70%]"
  description="All variations"
/>

## References

<Citations>
  <p className="font-medium text-primary">Inspiration</p>
  <CitationList>
    <CitationItem>
      <CitationLink
        href="https://animations.dev/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Animations.dev - Morphing Animations
      </CitationLink>
    </CitationItem>
    <CitationItem>
      <CitationLink
        href="https://v0.app/@joelbqz"
        target="_blank"
        rel="noopener noreferrer"
      >
        v0.app/@joelbqz - Expandable Screen Component
      </CitationLink>
    </CitationItem>
  </CitationList>
</Citations>

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>

<TabsContent value="cli">

```bash
npx shadcn@latest add https://cult-ui.com/r/expandable-screen.json
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="expandable-screen" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

The ExpandableScreen component creates a morphing animation effect where a trigger element smoothly expands into a full-screen overlay. It uses Framer Motion's `layoutId` feature to create seamless transitions between states.

### Basic Example

```tsx
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from "@/components/ui/expandable-screen"

export default function ExpandableScreenDemo() {
  return (
    <ExpandableScreen
      layoutId="cta-card"
      triggerRadius="100px"
      contentRadius="24px"
    >
      <div className="flex min-h-screen items-center justify-center">
        <ExpandableScreenTrigger>
          <button className="bg-primary px-6 py-3 text-primary-foreground">
            Open Screen
          </button>
        </ExpandableScreenTrigger>
      </div>

      <ExpandableScreenContent className="bg-primary">
        <div className="flex h-full items-center justify-center p-8">
          <h2 className="text-4xl text-primary-foreground">
            Full Screen Content
          </h2>
        </div>
      </ExpandableScreenContent>
    </ExpandableScreen>
  )
}
```

## Components

### ExpandableScreen

The root component that provides context and manages the expanded state. It uses a shared `layoutId` to create morphing animations between the trigger and content.

```typescriptreact
<ExpandableScreen
  layoutId="unique-id"
  triggerRadius="100px"
  contentRadius="24px"
  animationDuration={0.3}
>
  {/* Child components */}
</ExpandableScreen>
```

**Props:**

- `layoutId?: string` - Unique identifier for the shared layout animation (default: "expandable-card")
- `triggerRadius?: string` - Border radius for the trigger element (default: "100px")
- `contentRadius?: string` - Border radius for the expanded content (default: "24px")
- `animationDuration?: number` - Duration of the morphing animation in seconds (default: 0.3)
- `defaultExpanded?: boolean` - Initial expanded state (default: false)
- `onExpandChange?: (expanded: boolean) => void` - Callback when expanded state changes
- `lockScroll?: boolean` - Whether to lock body scroll when expanded (default: true)

### ExpandableScreenTrigger

The trigger element that expands into the full screen. This component automatically hides when expanded and shows when collapsed.

```typescriptreact
<ExpandableScreenTrigger>
  <button>Click to Expand</button>
</ExpandableScreenTrigger>
```

**Props:**

- `className?: string` - Additional CSS classes

**Note:** The trigger automatically disappears when the screen is expanded and reappears when collapsed.

### ExpandableScreenContent

The full-screen content that appears when expanded. It morphs from the trigger element using the shared `layoutId`.

```typescriptreact
<ExpandableScreenContent className="bg-primary">
  {/* Full screen content */}
</ExpandableScreenContent>
```

**Props:**

- `className?: string` - Additional CSS classes
- `showCloseButton?: boolean` - Whether to show the close button (default: true)
- `closeButtonClassName?: string` - Additional CSS classes for the close button

### ExpandableScreenBackground

An optional component for rendering different content based on the expanded state. Useful for background elements.

```typescriptreact
<ExpandableScreenBackground
  trigger={<div>Trigger Background</div>}
  content={<div>Expanded Background</div>}
/>
```

**Props:**

- `trigger?: ReactNode` - Content to show when collapsed
- `content?: ReactNode` - Content to show when expanded
- `className?: string` - Additional CSS classes

### useExpandableScreen Hook

Hook to access the expandable screen context and control the expanded state.

```typescriptreact
function CustomComponent() {
  const { isExpanded, expand, collapse, layoutId } = useExpandableScreen()

  return (
    <div>
      <p>Is expanded: {isExpanded ? "Yes" : "No"}</p>
      <button onClick={expand}>Expand</button>
      <button onClick={collapse}>Collapse</button>
    </div>
  )
}
```

**Returns:**

- `isExpanded: boolean` - Whether the screen is currently expanded
- `expand: () => void` - Function to expand the screen
- `collapse: () => void` - Function to collapse the screen
- `layoutId: string` - The shared layout ID for morphing animations
- `triggerRadius: string` - Border radius of the trigger
- `contentRadius: string` - Border radius of the content
- `animationDuration: number` - Animation duration

## Advanced Usage

### Custom Layout IDs

Use unique `layoutId` values when you have multiple expandable screens on the same page:

```typescriptreact
<ExpandableScreen layoutId="waitlist-form">
  {/* Content */}
</ExpandableScreen>

<ExpandableScreen layoutId="contact-form">
  {/* Different content */}
</ExpandableScreen>
```

### Controlled State

Control the expanded state externally:

```typescriptreact
const [isExpanded, setIsExpanded] = useState(false)

<ExpandableScreen
  layoutId="controlled-screen"
  defaultExpanded={isExpanded}
  onExpandChange={setIsExpanded}
>
  {/* Content */}
</ExpandableScreen>
```

### Custom Close Button

Customize or hide the close button:

```typescriptreact
<ExpandableScreenContent
  showCloseButton={false}
  className="bg-primary"
>
  <div className="flex h-full items-center justify-center">
    <button onClick={() => collapse()}>Custom Close</button>
  </div>
</ExpandableScreenContent>
```

### Different Border Radius

Create different visual styles by adjusting the border radius:

```typescriptreact
<ExpandableScreen
  layoutId="rounded-card"
  triggerRadius="12px"
  contentRadius="0px"
>
  {/* Content */}
</ExpandableScreen>
```

## How It Works

The ExpandableScreen component uses Framer Motion's `layoutId` feature to create morphing animations. Here's how it works:

1. **Shared Layout ID**: Both the trigger and content share the same `layoutId`, which tells Framer Motion they're the same element in different states.

2. **Layout Animation**: When the state changes, Framer Motion automatically animates the position, size, and shape between the two elements.

3. **Smooth Transitions**: The component uses `layout` animations combined with opacity transitions for smooth, performant animations.

4. **Scroll Locking**: By default, the component locks body scroll when expanded to prevent background scrolling.

## Customization

The ExpandableScreen component is highly customizable:

- Adjust animation duration for faster or slower transitions
- Customize border radius for different visual styles
- Control scroll locking behavior
- Customize close button appearance or hide it entirely
- Use different layout IDs for multiple instances

## Accessibility

The ExpandableScreen component includes:

- Keyboard support (Escape key closes the expanded screen)
- Proper ARIA labels on the close button
- Focus management
- Scroll locking to prevent background interaction when expanded

## Performance

The component is optimized for performance:

- Uses `transform-gpu` and `will-change-transform` for GPU acceleration
- Leverages Framer Motion's layout animations for efficient transitions
- Minimal re-renders with context-based state management
