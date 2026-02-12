---
title: Component Artifact Definitions
impact: MEDIUM
impactDescription: Essential for correct component classification
tags: definitions, primitive, component, block, template, pattern, utility, terminology
---

## Component Artifact Definitions

Precise terminology for classifying and naming UI artifacts.

### Primitive (Unstyled Component)

The **lowest-level building block** providing behavior and accessibility without styling. Completely headless.

```tsx
// Primitive - behavior only, no styling
function DialogPrimitive({ open, onOpenChange, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
}
```

**Examples:** Radix UI Primitives, React Aria Components, Headless UI

### Component

A **styled, reusable UI unit** that adds visual design to primitives or composes multiple elements.

```tsx
// Component - styled and reusable
function Button({ variant = 'primary', size = 'md', children, ...props }) {
  return (
    <button className={cn('base-button-styles', variants[variant], sizes[size])} {...props}>
      {children}
    </button>
  );
}
```

**Examples:** shadcn/ui components, Material UI, Ant Design

### Pattern

A **specific composition** solving a UI/UX problem. Documentation-focused, not a reusable component.

**Examples:** Form validation with inline errors, confirming destructive actions, typeahead search

### Block

An **opinionated, production-ready composition** solving a concrete interface use case.

```tsx
// Block - complete, opinionated composition
function PricingTable({ plans, onSelectPlan }) {
  return (
    <div className="pricing-table">
      {plans.map(plan => (
        <Card key={plan.id}>
          <Card.Header><Card.Title>{plan.name}</Card.Title></Card.Header>
          <Card.Content><div className="price">{plan.price}</div></Card.Content>
          <Card.Footer><Button onClick={() => onSelectPlan(plan.id)}>Select Plan</Button></Card.Footer>
        </Card>
      ))}
    </div>
  );
}
```

**Examples:** Pricing table, auth screens, onboarding stepper, AI chat panel

### Page

A **complete, single-route view** composed of multiple blocks.

```tsx
function LandingPage() {
  return (
    <Layout>
      <HeroBlock />
      <FeaturesBlock />
      <PricingBlock />
      <FooterBlock />
    </Layout>
  );
}
```

### Template

A **multi-page collection** or full-site scaffold bundling pages, routing, layouts, and providers.

**Examples:** SaaS starter, e-commerce template, dashboard starter

### Utility (Non-visual)

A **helper** for developer ergonomics or composition; not rendered UI.

```tsx
function useControllableState({ prop, defaultProp, onChange }) {
  const [state, setState] = useState(defaultProp);
  const value = prop !== undefined ? prop : state;
  const setValue = (newValue) => {
    if (prop === undefined) setState(newValue);
    onChange?.(newValue);
  };
  return [value, setValue];
}
```

**Examples:** React hooks, class utilities, keybinding helpers, focus scopes

### Classification Decision Flow

1. **Behavior/a11y only, no styling?** → **Primitive**
2. **Styled, reusable UI element?** → **Component**
3. **Concrete product use case with opinionated composition?** → **Block**
4. **Multi-page scaffold with routing/providers?** → **Template**
5. **Documentation of recurring solution?** → **Pattern**
6. **Non-visual logic?** → **Utility**

### Common Classification Mistakes

**Incorrect (mislabeling a styled component as a primitive):**

```tsx
// Wrong: This is styled, so it's a Component, not a Primitive
function DialogPrimitive({ open, onOpenChange, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="rounded-lg border bg-white p-6 shadow-lg">
        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
}
```

**Correct (proper classification based on styling presence):**

```tsx
// Primitive - behavior only, no styling
function DialogPrimitive({ open, onOpenChange, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
}

// Component - styled wrapper around primitive
function Dialog({ open, onOpenChange, children }) {
  return (
    <DialogPrimitive open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className={cn("rounded-lg border bg-white p-6 shadow-lg")}>
        {children}
      </Dialog.Content>
    </DialogPrimitive>
  );
}
```

### Key Vocabulary

- **Props API** - Public configuration surface, typed and documented
- **Children/Slots** - Placeholders for caller-provided structure
- **Render Prop** - Function child delegating rendering
- **Controlled** - Value driven by props (parent is source of truth)
- **Uncontrolled** - Internal state with optional `defaultValue`
- **Provider/Context** - Supplies shared state to subtree
- **Portal** - Rendering outside DOM hierarchy for layering
- **Headless** - Behavior without styling
- **Styled** - Ships with default visual design
- **Variants** - Style/behavior permutations via props
- **Design Tokens** - Named values for theming
