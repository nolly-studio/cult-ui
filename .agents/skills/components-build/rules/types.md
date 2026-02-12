---
title: Component Types
impact: HIGH
impactDescription: Type-safe, flexible component interfaces
tags: types, typescript, props, html-attributes, export, single-element
---

## Component Types

Proper typing is essential for creating flexible, customizable, and type-safe component interfaces.

### Single Element Wrapping

Each exported component should wrap a single HTML or JSX element:

**Incorrect (hard to customize):**

```tsx
const Card = ({ title, description, footer, ...props }) => (
  <div {...props}>
    <div className="card-header">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
    <div className="card-footer">{footer}</div>
  </div>
);
```

**Correct (composable, each layer customizable):**

```tsx
<Card.Root>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Header>
  <Card.Footer>Footer</Card.Footer>
</Card.Root>
```

### Extending HTML Attributes

Every component should extend native HTML attributes:

```tsx
export type CardRootProps = React.ComponentProps<'div'> & {
  variant?: 'default' | 'outlined';
};

export const CardRoot = ({ variant = 'default', ...props }: CardRootProps) => (
  <div {...props} />
);
```

**Common HTML Attribute Types:**

```tsx
type DivProps = React.ComponentProps<'div'>;
type ButtonProps = React.ComponentProps<'button'>;
type InputProps = React.ComponentProps<'input'>;
type FormProps = React.ComponentProps<'form'>;
type LinkProps = React.ComponentProps<'a'>;
```

### Exporting Types

Always export prop types for consumers:

```tsx
// Enables type extraction
import type { CardRootProps } from '@/components/ui/card';
type Variant = CardRootProps['variant'];

// Enables extending
export type ExtendedCardProps = CardRootProps & { isLoading?: boolean };

// Enables wrapper components
const MyCard = (props: CardRootProps) => (
  <CardRoot {...props} className={cn('my-custom-class', props.className)} />
);
```

**Naming convention:** Export types as `<ComponentName>Props`.

### Best Practices

**1. Always Spread Props Last:**

```tsx
// ✅ User props override defaults
<div className="default-class" {...props} />

// ❌ Defaults override user props
<div {...props} className="default-class" />
```

**2. Avoid Prop Name Conflicts:**

```tsx
// ❌ Conflicts with HTML title attribute
type CardProps = React.ComponentProps<'div'> & { title: string };

// ✅ Use a different name
type CardProps = React.ComponentProps<'div'> & { heading: string };
```

**3. Document Custom Props:**

```tsx
export type DialogProps = React.ComponentProps<'div'> & {
  /** Whether the dialog is currently open */
  open: boolean;
  /** Callback when the dialog requests to be closed */
  onOpenChange: (open: boolean) => void;
  /** Whether to render the dialog in a portal */
  modal?: boolean;
};
```

### Polymorphic Types

For components that can render as different elements:

```tsx
type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
} & React.ComponentPropsWithoutRef<E>;

function Component<E extends React.ElementType = 'div'>({
  as,
  ...props
}: PolymorphicProps<E>) {
  const Element = as || 'div';
  return <Element {...props} />;
}
```

### Quick Reference

| Pattern | Usage | Example |
|---------|-------|---------|
| Basic extension | Extend single HTML element | `React.ComponentProps<'div'>` |
| Custom props | Add component-specific props | `React.ComponentProps<'button'> & { variant?: string }` |
| Polymorphic | Render as different elements | `PolymorphicProps<T>` |
| Type extraction | Get specific prop type | `CardProps['variant']` |
| Type extension | Extend existing component props | `CardProps & { isLoading?: boolean }` |
