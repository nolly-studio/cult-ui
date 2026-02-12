---
title: asChild Pattern
impact: MEDIUM
impactDescription: Prop merging without wrapper elements
tags: as-child, slot, radix, composition, prop-merging
---

## asChild Pattern

The `asChild` prop allows components to merge their props, behaviors, and event handlers with a custom child element instead of rendering a default DOM element.

### When to Use

Implement `asChild` when:
- Building trigger components (Dialog.Trigger, Tooltip.Trigger)
- Creating composable components that wrap other elements
- Allowing users to customize rendered element while preserving functionality
- Integrating with existing design system components

### Implementation

```tsx
import { Slot } from '@radix-ui/react-slot';

interface TriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

export const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  ({ asChild = false, children, ...props }, ref) => {
    if (asChild) {
      return <Slot ref={ref} {...props}>{children}</Slot>;
    }
    return <button ref={ref} {...props}>{children}</button>;
  }
);
```

### How It Works

**Without asChild (nested elements):**

```tsx
<Dialog.Trigger>
  <button>Open Dialog</button>
</Dialog.Trigger>
// Renders: <button><button>Open Dialog</button></button>
```

**With asChild (props merge onto child):**

```tsx
<Dialog.Trigger asChild>
  <button>Open Dialog</button>
</Dialog.Trigger>
// Renders: <button data-state="closed">Open Dialog</button>
```

### Common Use Cases

**Custom Trigger Elements:**

```tsx
<AlertDialog.Trigger asChild>
  <a href="/delete">Delete Account</a>
</AlertDialog.Trigger>

<Tooltip.Trigger asChild>
  <IconButton icon={<InfoIcon />} />
</Tooltip.Trigger>

<DropdownMenu.Trigger asChild>
  <Button variant="outline" size="icon">
    <MoreVertical className="h-4 w-4" />
  </Button>
</DropdownMenu.Trigger>
```

**Semantic HTML:**

```tsx
<NavigationMenu.Link asChild>
  <Link href="/products" className="nav-link">Products</Link>
</NavigationMenu.Link>
```

**Component Composition:**

```tsx
<Dialog.Trigger asChild>
  <Tooltip.Trigger asChild>
    <button>Open dialog (with tooltip)</button>
  </Tooltip.Trigger>
</Dialog.Trigger>
```

### Best Practices

**1. Child Must Spread Props:**

**Incorrect:**

```tsx
// Won't receive trigger behavior
const BadButton = ({ children }) => <button>{children}</button>;
```

**Correct:**

```tsx
// Properly receives all props
const GoodButton = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);
```

**2. Single Child Element Only:**

**Incorrect:**

```tsx
// Multiple children
<Trigger asChild>
  <button>One</button>
  <button>Two</button>
</Trigger>
```

**Correct:**

```tsx
// Single child
<Trigger asChild>
  <button>Single Button</button>
</Trigger>
```

**3. Maintain Accessibility:**

**Correct:**

```tsx
// Maintains button semantics
<Dialog.Trigger asChild>
  <button type="button">Open</button>
</Dialog.Trigger>
```

**Note (ensure proper ARIA):**

```tsx
// Ensure proper ARIA when using non-semantic elements
<Dialog.Trigger asChild>
  <div role="button" tabIndex={0} aria-label="Open dialog">Open</div>
</Dialog.Trigger>
```

### Common Pitfalls

**Don't manually clone elements:**

**Incorrect:**

```tsx
// Manual cloning misses edge cases
if (asChild) {
  return React.cloneElement(children, { ...props });
}
```

**Correct:**

```tsx
// Use Slot for proper merging
if (asChild) {
  return <Slot {...props}>{children}</Slot>;
}
```

### Integration

The `asChild` pattern is essential for:
- **Composability** - Enables flexible component composition
- **Customizable** - Allows users to control rendered elements
- **Transparent** - No hidden wrapper elements in DOM
- **Accessible** - Maintains semantic HTML structure

Reference: [@radix-ui/react-slot](https://www.radix-ui.com/primitives/docs/utilities/slot)
