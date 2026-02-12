---
title: Polymorphism Patterns
impact: MEDIUM
impactDescription: Flexible element rendering
tags: polymorphism, as-prop, element-type, typescript, semantic-html
---

## Polymorphism Patterns

Build flexible components that can render as different HTML elements or components while maintaining consistent styling and behavior.

### Core Pattern: The `as` Prop

The `as` prop allows components to change their rendered element type:

```tsx
<Button as="a" href="/home">Go Home</Button>
<Button as="button" type="submit">Submit</Button>
<Button as="div" role="button" tabIndex={0}>Custom Element</Button>
```

### Basic Implementation

```tsx
function Component({ as: Element = 'div', children, ...props }) {
  return <Element {...props}>{children}</Element>;
}
```

### TypeScript Implementation

```tsx
type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<E>;

function Component<E extends React.ElementType = 'div'>({
  as,
  children,
  ...props
}: PolymorphicProps<E>) {
  const Element = as || 'div';
  return <Element {...props}>{children}</Element>;
}
```

### Common Use Cases

**Typography Components:**

```tsx
function Text({ as: Element = 'span', variant = 'body', ...props }) {
  const className = cn(
    'text-base',
    variant === 'heading' && 'text-2xl font-bold',
    variant === 'body' && 'text-base',
    props.className
  );
  return <Element className={className} {...props} />;
}

<Text as="h1" variant="heading">Title</Text>
<Text as="p" variant="body">Paragraph</Text>
```

**Layout Components:**

```tsx
function Flex({ as: Element = 'div', ...props }) {
  return <Element className={cn('flex', props.className)} {...props} />;
}

<Flex as="header" className="justify-between"><Logo /><Navigation /></Flex>
<Flex as="main" className="flex-col"><Content /></Flex>
```

**Interactive Elements:**

```tsx
function Clickable({ as: Element = 'button', ...props }) {
  const isButton = Element === 'button';
  const isAnchor = Element === 'a';
  return (
    <Element
      role={!isButton && !isAnchor ? 'button' : undefined}
      tabIndex={!isButton && !isAnchor ? 0 : undefined}
      {...props}
    />
  );
}
```

### Best Practices

**1. Default to Semantic Elements:**

**Incorrect (too generic):**

```tsx
function Component({ as: Element = 'div', ...props }) { }
```

**Correct (semantic defaults):**

```tsx
function Article({ as: Element = 'article', ...props }) { }
function Navigation({ as: Element = 'nav', ...props }) { }
function Heading({ as: Element = 'h2', ...props }) { }
```

**2. Document Valid Elements:**

```tsx
interface BoxProps {
  /**
   * The HTML element to render as
   * @default 'div'
   */
  as?: 'div' | 'section' | 'article' | 'aside' | 'main' | 'header' | 'footer';
}
```

**3. Handle Event Handlers:**

```tsx
function Interactive({ as: Element = 'button', onClick, ...props }) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (Element !== 'button' && (e.key === 'Enter' || e.key === ' ')) {
      onClick?.(e as any);
    }
  };
  return (
    <Element
      onClick={onClick}
      onKeyDown={Element !== 'button' ? handleKeyDown : undefined}
      {...props}
    />
  );
}
```

### Common Pitfalls

**Invalid HTML Nesting:**

```tsx
// Incorrect: Invalid - button inside button
<Button as="button"><Button as="button">Nested</Button></Button>

// Incorrect: Invalid - div inside p
<Text as="p"><Box as="div">Invalid</Box></Text>

// Correct: Valid nesting
<Text as="div"><Box as="div">Valid</Box></Text>
```

**Missing Accessibility:**

```tsx
// ❌ Missing accessibility
<Box as="nav"><MenuItems /></Box>

// ✅ Proper accessibility
<Box as="nav" aria-label="Main navigation"><MenuItems /></Box>
```

**Performance:**

```tsx
// ❌ Creates new component on every render
function Parent() {
  const CustomDiv = (props) => <div {...props} />;
  return <Component as={CustomDiv} />;
}

// ✅ Stable component reference
const CustomDiv = (props) => <div {...props} />;
function Parent() {
  return <Component as={CustomDiv} />;
}
```

### Key Benefits

1. **Semantic HTML Flexibility** - Use the most appropriate element
2. **Component Reusability** - One component serves multiple purposes
3. **Accessibility** - Choose elements for best accessibility
4. **Style System Integration** - Maintain styling while changing elements
