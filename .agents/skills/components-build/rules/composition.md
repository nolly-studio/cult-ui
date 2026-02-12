---
title: Component Composition
impact: HIGH
impactDescription: Foundation of component architecture
tags: composition, patterns, sub-components, context, root, trigger, content
---

## Component Composition

Composition is the foundation of building modern UI components. Instead of cramming all functionality into a single component with dozens of props, break components down into smaller, focused sub-components that work together.

**Incorrect (monolithic, hard to customize):**

```tsx
<Accordion data={data} />
```

**Correct (composable, each layer customizable):**

```tsx
<Accordion.Root open={open} setOpen={setOpen}>
  {data.map((item) => (
    <Accordion.Item key={item.title}>
      <Accordion.Trigger>{item.title}</Accordion.Trigger>
      <Accordion.Content>{item.content}</Accordion.Content>
    </Accordion.Item>
  ))}
</Accordion.Root>
```

### Building Composable Components

#### 1. Root Component

The main container that holds sub-components and manages shared state using Context:

```tsx
const AccordionContext = createContext<AccordionContextValue>({
  open: false,
  setOpen: () => {},
});

export const Root = ({ children, open, setOpen, ...props }: AccordionRootProps) => (
  <AccordionContext.Provider value={{ open, setOpen }}>
    <div {...props}>{children}</div>
  </AccordionContext.Provider>
);
```

#### 2. Item Component

A simple wrapper for each item:

```tsx
export const Item = (props: AccordionItemProps) => <div {...props} />;
```

#### 3. Trigger Component

Handles user interaction:

```tsx
export const Trigger = ({ asChild, ...props }: AccordionTriggerProps) => {
  const { open, setOpen } = useContext(AccordionContext);
  return (
    <button onClick={() => setOpen(!open)} aria-expanded={open} {...props} />
  );
};
```

#### 4. Content Component

Displays the main content:

```tsx
export const Content = ({ asChild, ...props }: AccordionContentProps) => {
  const { open } = useContext(AccordionContext);
  if (!open) return null;
  return <div {...props} />;
};
```

#### 5. Export Pattern

Export components as a namespace:

```tsx
export const Accordion = { Root, Item, Trigger, Content };

// Usage
<Accordion.Root open={open} setOpen={setOpen}>
  <Accordion.Item>
    <Accordion.Trigger>Title</Accordion.Trigger>
    <Accordion.Content>Content</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### Naming Conventions

- **Root** - Main container component
- **Trigger** - Element that initiates an action
- **Content** - Element containing the main content
- **Header/Body/Footer** - Structured content areas
- **Title/Description** - Informational components

### Best Practices

1. **Single Responsibility** - Each sub-component should have one clear purpose
2. **Context for State** - Use React Context to share state between sub-components
3. **Extend HTML Attributes** - Always extend native HTML element props
4. **Consistent Naming** - Follow established conventions
5. **Namespace Exports** - Export components as a namespace for clean API
6. **Composition Over Configuration** - Prefer multiple components over many props

### When to Use Composition

**Use composition when:**
- A component has multiple responsibilities
- Customization requires CSS overrides
- You need flexible layouts or structures
- Building a component library
- Components need to work together but remain independent

**Avoid composition for:**
- Simple, single-purpose components
- Components that don't need customization
- Over-engineering simple UI elements
