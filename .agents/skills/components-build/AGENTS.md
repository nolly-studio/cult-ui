# Components.build Specification

**Version 1.0.0**  
components.build  
January 2026

> **Note:**  
> This document is mainly for agents and LLMs to follow when maintaining,  
> generating, or refactoring UI component libraries. Humans  
> may also find it useful, but guidance here is optimized for automation  
> and consistency by AI-assisted workflows.

---

## Abstract

Comprehensive guidelines for building modern, composable, and accessible UI components. This specification provides patterns and best practices for creating React components that are composable, accessible, customizable, and well-documented.

---

## Table of Contents

1. [Overview](#1-overview) — **MEDIUM**
   - 1.1 [Components.build Overview](#11-componentsbuild-overview)
2. [Principles](#2-principles) — **HIGH**
   - 2.1 [Core Component Principles](#21-core-component-principles)
3. [Definitions](#3-definitions) — **MEDIUM**
   - 3.1 [Component Artifact Definitions](#31-component-artifact-definitions)
4. [Composition](#4-composition) — **HIGH**
   - 4.1 [Component Composition](#41-component-composition)
5. [Accessibility](#5-accessibility) — **CRITICAL**
   - 5.1 [Accessibility Guidelines](#51-accessibility-guidelines)
6. [State](#6-state) — **HIGH**
   - 6.1 [State Management Patterns](#61-state-management-patterns)
7. [Types](#7-types) — **HIGH**
   - 7.1 [Component Types](#71-component-types)
8. [Polymorphism](#8-polymorphism) — **MEDIUM**
   - 8.1 [Polymorphism Patterns](#81-polymorphism-patterns)
9. [As-Child](#9-as-child) — **MEDIUM**
   - 9.1 [asChild Pattern](#91-aschild-pattern)
10. [Data Attributes](#10-data-attributes) — **LOW**
   - 10.1 [Data Attributes for Styling](#101-data-attributes-for-styling)
11. [Styling](#11-styling) — **HIGH**
   - 11.1 [Component Styling with Tailwind CSS](#111-component-styling-with-tailwind-css)
12. [Design Tokens](#12-design-tokens) — **MEDIUM**
   - 12.1 [Design Tokens](#121-design-tokens)
13. [Documentation](#13-documentation) — **MEDIUM**
   - 13.1 [Component Documentation](#131-component-documentation)
14. [Registry](#14-registry) — **LOW**
   - 14.1 [Component Registries](#141-component-registries)
15. [NPM](#15-npm) — **LOW**
   - 15.1 [Publishing to NPM](#151-publishing-to-npm)
16. [Marketplaces](#16-marketplaces) — **LOW**
   - 16.1 [Component Marketplaces](#161-component-marketplaces)

---

## 1. Overview

**Impact: MEDIUM**

Specification scope, goals, and philosophy. Introduction to the
components.build standard for building modern UI components.

### 1.1 Components.build Overview

**Impact: MEDIUM (Foundation for understanding the specification)**

The components.build specification is an open-source standard for building modern, composable, and accessible UI components. It provides high-level guidelines, best practices, and common terminology for designing UI components that integrate smoothly into any codebase.

**What This Specification Is:**

This spec is **not**:

- A tutorial or course on React

- A promotion for any specific component library or registry

- A replacement for framework documentation

This spec **is**:

- A set of high-level guidelines and best practices

- A common terminology for designing UI components

- A standard for ensuring components meet modern expectations

- A framework for creating components that integrate smoothly across projects

**Who This Is For:**

This specification is written for:

- **Open-source maintainers** building and distributing component libraries

- **Senior front-end engineers** designing component APIs and design systems

- **Developers** familiar with JavaScript/TypeScript and React

**Framework Scope:**

While examples use React (with JSX/TSX) for concreteness, the fundamental concepts apply to other frameworks (Vue, Svelte, Angular). The philosophy is **framework-agnostic**.

**Core Goals:**

The specification aims to help developers create components that are:

1. **Composable** - Components combine and nest to create complex UIs

2. **Accessible** - Usable by everyone, including users with disabilities

3. **Easy to adopt** - Integrate smoothly into any codebase

4. **Consistent** - Follow modern expectations and patterns

5. **Well-documented** - Clear guidelines and terminology

**Key Philosophy:**

- **Composition over configuration** - Build flexible, composable APIs

- **Accessibility by default** - Not an afterthought, but a requirement

- **Developer experience** - Components should be easy to understand, customize, and integrate

- **Transparency** - Source code should be inspectable and modifiable

- **Standards alignment** - Follow web standards and modern best practices

**Example:**

The following examples illustrate the difference between components that don't follow the specification and those that do:

**Incorrect:**

```tsx
// Hard-coded styles, no accessibility, not composable
function Button() {
  return (
    <button style={{ backgroundColor: '#007bff', color: 'white', padding: '10px' }}>
      Click me
    </button>
  );
}
```

**Correct:**

```tsx
// Composable, accessible, customizable
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

export function Button({ 
  className, 
  variant = 'default', 
  children, 
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2',
        'focus-visible:outline-none focus-visible:ring-2',
        variant === 'default' && 'bg-primary text-primary-foreground',
        variant === 'outline' && 'border border-input bg-background',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

**Specification Authors:**

Co-authored by:

- **Hayden Bleasel** ([@haydenbleasel](https://x.com/haydenbleasel))

- **shadcn** ([@shadcn](https://x.com/shadcn))

Adapted as an AI skill by:

- **Jordan Gilliam** ([@nolansym](https://x.com/nolansym))

Reference: [https://components.build](https://components.build)

---

## 2. Principles

**Impact: HIGH**

Core design principles for component architecture including
composability, accessibility, customization, performance, transparency, and DX.

### 2.1 Core Component Principles

**Impact: HIGH (Foundation of component architecture decisions)**

These six principles guide all component design decisions. Apply them consistently when building, refactoring, or evaluating components.

Favor composition over inheritance. Build components that combine and nest to create complex UIs.

**Incorrect: monolithic, hard to customize**

```tsx
<Accordion data={data} />
```

**Correct: composable, each layer customizable**

```tsx
<Accordion.Root open={open} onOpenChange={setOpen}>
  {items.map((item) => (
    <Accordion.Item key={item.id}>
      <Accordion.Trigger>{item.title}</Accordion.Trigger>
      <Accordion.Content>{item.content}</Accordion.Content>
    </Accordion.Item>
  ))}
</Accordion.Root>
```

Components must be usable by all users. Accessibility is not optional—it's a baseline feature.

**Incorrect: generic div with click handler**

```tsx
<div onClick={handleClick} className="button">Click me</div>
```

**Correct: semantic button element**

```tsx
<button onClick={handleClick}>Click me</button>
```

Best practices:

- Use semantic HTML (`<button>`, `<ul>/<li>`, `<nav>`, etc.)

- Provide proper ARIA roles, states, and properties

- Support keyboard navigation for all interactive elements

- Ensure focus management in modals, dropdowns, and overlays

Components should be easy to restyle or adapt to different design requirements.

**Correct: design tokens and className override**

```tsx
export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn('base-button-styles', className)}
      {...props}
    />
  );
}
```

Best practices:

- Use CSS variables (design tokens) for colors, spacing, typography

- Always allow `className` prop for style overrides

- Provide sensible default styling

- Avoid hard-coded colors, fonts, or spacing values

Components should be lean in terms of assets and dependencies.

**Incorrect: heavy dependency for simple task**

```tsx
import { entireDateLibrary } from 'heavy-date-lib';
```

**Correct: native APIs or lightweight alternatives**

```tsx
const formatDate = (date: Date) => date.toLocaleDateString();
```

Best practices:

- Keep bundle size minimal

- Use tree-shaking friendly imports

- Lazy load heavy features when possible

- Optimize for initial render performance

Components should not be black boxes. Developers should be able to inspect and modify them.

**Correct: clear, readable implementation**

```tsx
export function Button({ children, onClick, ...props }: ButtonProps) {
  return (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  );
}
```

**Incorrect: obfuscated or overly complex**

```tsx
export const Button = compose(withHOC1, withHOC2, withHOC3)(BaseButton);
```

Components should come with clear documentation and examples.

**Correct: comprehensive JSDoc**

```tsx
/**
 * Button component for primary actions.
 * 
 * @example
 * <Button variant="primary" onClick={handleClick}>Click me</Button>
 * 
 * @remarks
 * - Supports keyboard navigation (Enter/Space)
 * - Accessible by default with proper ARIA attributes
 */
export function Button({ ... }: ButtonProps) { }
```

A well-designed component applies all six principles together: **Composes** with other components, **works for everyone** with proper accessibility, **adapts** to different designs via theming, **performs** efficiently, **can be inspected** and modified, and **is easy to learn** through documentation.

---

## 3. Definitions

**Impact: MEDIUM**

Common terminology and component type definitions including
primitive, compound, headless, and styled components.

### 3.1 Component Artifact Definitions

**Impact: MEDIUM (Essential for correct component classification)**

Precise terminology for classifying and naming UI artifacts.

The **lowest-level building block** providing behavior and accessibility without styling. Completely headless.

**Examples:** Radix UI Primitives, React Aria Components, Headless UI

A **styled, reusable UI unit** that adds visual design to primitives or composes multiple elements.

**Examples:** shadcn/ui components, Material UI, Ant Design

A **specific composition** solving a UI/UX problem. Documentation-focused, not a reusable component.

**Examples:** Form validation with inline errors, confirming destructive actions, typeahead search

An **opinionated, production-ready composition** solving a concrete interface use case.

**Examples:** Pricing table, auth screens, onboarding stepper, AI chat panel

A **complete, single-route view** composed of multiple blocks.

A **multi-page collection** or full-site scaffold bundling pages, routing, layouts, and providers.

**Examples:** SaaS starter, e-commerce template, dashboard starter

A **helper** for developer ergonomics or composition; not rendered UI.

**Examples:** React hooks, class utilities, keybinding helpers, focus scopes

1. **Behavior/a11y only, no styling?** → **Primitive**

2. **Styled, reusable UI element?** → **Component**

3. **Concrete product use case with opinionated composition?** → **Block**

4. **Multi-page scaffold with routing/providers?** → **Template**

5. **Documentation of recurring solution?** → **Pattern**

6. **Non-visual logic?** → **Utility**

**Incorrect: mislabeling a styled component as a primitive**

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

**Correct: proper classification based on styling presence**

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

---

## 4. Composition

**Impact: HIGH**

Breaking down complex components into composable sub-components
using Root, Trigger, Content, and other naming patterns.

### 4.1 Component Composition

**Impact: HIGH (Foundation of component architecture)**

Composition is the foundation of building modern UI components. Instead of cramming all functionality into a single component with dozens of props, break components down into smaller, focused sub-components that work together.

**Incorrect: monolithic, hard to customize**

```tsx
<Accordion data={data} />
```

**Correct: composable, each layer customizable**

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

The main container that holds sub-components and manages shared state using Context:

A simple wrapper for each item:

Handles user interaction:

Displays the main content:

Export components as a namespace:

- **Root** - Main container component

- **Trigger** - Element that initiates an action

- **Content** - Element containing the main content

- **Header/Body/Footer** - Structured content areas

- **Title/Description** - Informational components

1. **Single Responsibility** - Each sub-component should have one clear purpose

2. **Context for State** - Use React Context to share state between sub-components

3. **Extend HTML Attributes** - Always extend native HTML element props

4. **Consistent Naming** - Follow established conventions

5. **Namespace Exports** - Export components as a namespace for clean API

6. **Composition Over Configuration** - Prefer multiple components over many props

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

---

## 5. Accessibility

**Impact: CRITICAL**

Building accessible components with keyboard navigation, screen
reader support, ARIA attributes, and focus management.

### 5.1 Accessibility Guidelines

**Impact: CRITICAL (Essential for inclusive component design)**

Accessibility (a11y) is not optional—it's a fundamental requirement. Every component must be usable by everyone, including people with visual, motor, auditory, or cognitive disabilities.

Always start with the most appropriate HTML element:

**Incorrect: generic div**

```tsx
<div onClick={handleClick} className="button">Click me</div>
```

**Correct: semantic element**

```tsx
// Polite announcement
<div role="status" aria-live="polite">{savedMessage && "Saved"}</div>

// Assertive announcement
<div role="alert" aria-live="assertive">{errorMessage}</div>
```

Every interactive element must be keyboard accessible:

Use ARIA attributes when necessary:

Support users with visual impairments:

1. **Don't use ARIA if you can use semantic HTML**

2. **Don't change native semantics unless necessary**

3. **All interactive elements must be keyboard accessible**

4. **Don't hide focusable elements** - Never use `aria-hidden="true"` on focusable elements

5. **All interactive elements must have accessible names**

**Placeholder as labels:**

```tsx
// ❌ Placeholder disappears
<input placeholder="Email address" />

// ✅ Persistent label
<label>Email address <input type="email" /></label>
```

**Empty buttons:**

```tsx
// ❌ No accessible name
<button><TrashIcon /></button>

// ✅ Screen reader text
<button aria-label="Delete item"><TrashIcon aria-hidden="true" /></button>
```

**Disabled elements:**

```html
<!-- Allow zooming -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

---

## 6. State

**Impact: HIGH**

Controlled and uncontrolled state patterns using
useControllableState for flexible component APIs.

### 6.1 State Management Patterns

**Impact: HIGH (Flexible component APIs for all use cases)**

Build flexible components that work seamlessly in both controlled and uncontrolled modes.

Component manages its own state internally:

**When to use:** Simple components, default behavior, internal state is sufficient.

Parent component manages the state:

**When to use:** State coordination, external data sources, form validation, persistence.

Use `@radix-ui/react-use-controllable-state` to support both:

**Usage:**

```tsx
import { useControllableState } from '@radix-ui/react-use-controllable-state';

type ToggleProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
};

export const Toggle = ({ checked: controlledChecked, defaultChecked, onCheckedChange, disabled }: ToggleProps) => {
  const [checked, setChecked] = useControllableState({
    prop: controlledChecked,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
  });

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && setChecked(!checked)}
    >
      {checked ? 'On' : 'Off'}
    </button>
  );
};
```

| State Type | Value Prop | Default Prop | Change Callback |

|------------|------------|--------------|-----------------|

| Generic | `value` | `defaultValue` | `onValueChange` |

| Boolean | `checked` | `defaultChecked` | `onCheckedChange` |

| Open/Close | `open` | `defaultOpen` | `onOpenChange` |

| Selection | `selected` | `defaultSelected` | `onSelectedChange` |

**1. Always Make Props Optional:**

```tsx
// ✅ Supports both patterns
type Props = {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
};
```

**2. Provide Sensible Defaults:**

```tsx
const [value, setValue] = useControllableState({
  prop: controlledValue,
  defaultProp: defaultValue ?? 0,
  onChange: onValueChange,
});
```

**3. Handle onChange in Both Modes:**

The `onChange` callback should fire regardless of controlled/uncontrolled mode.

1. **Flexibility** - Works in both controlled and uncontrolled modes

2. **Developer Experience** - Simple API for simple cases, powerful for complex

3. **Consistency** - Matches patterns used by Radix UI and professional libraries

4. **Backward Compatibility** - Easy to migrate from uncontrolled to controlled

---

## 7. Types

**Impact: HIGH**

TypeScript patterns for component props including extending HTML
attributes, exporting types, and single element wrapping.

### 7.1 Component Types

**Impact: HIGH (Type-safe, flexible component interfaces)**

Proper typing is essential for creating flexible, customizable, and type-safe component interfaces.

Each exported component should wrap a single HTML or JSX element:

**Incorrect: hard to customize**

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

**Correct: composable, each layer customizable**

```tsx
export type CardRootProps = React.ComponentProps<'div'> & {
  variant?: 'default' | 'outlined';
};

export const CardRoot = ({ variant = 'default', ...props }: CardRootProps) => (
  <div {...props} />
);
```

Every component should extend native HTML attributes:

**Common HTML Attribute Types:**

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

Always export prop types for consumers:

**Naming convention:** Export types as `<ComponentName>Props`.

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

For components that can render as different elements:

| Pattern | Usage | Example |

|---------|-------|---------|

| Basic extension | Extend single HTML element | `React.ComponentProps<'div'>` |

| Custom props | Add component-specific props | `React.ComponentProps<'button'> & { variant?: string }` |

| Polymorphic | Render as different elements | `PolymorphicProps<T>` |

| Type extraction | Get specific prop type | `CardProps['variant']` |

| Type extension | Extend existing component props | `CardProps & { isLoading?: boolean }` |

---

## 8. Polymorphism

**Impact: MEDIUM**

Implementing the `as` prop pattern to change rendered HTML
elements while preserving component functionality.

### 8.1 Polymorphism Patterns

**Impact: MEDIUM (Flexible element rendering)**

Build flexible components that can render as different HTML elements or components while maintaining consistent styling and behavior.

The `as` prop allows components to change their rendered element type:

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

**1. Default to Semantic Elements:**

**Incorrect: too generic**

```tsx
function Component({ as: Element = 'div', ...props }) { }
```

**Correct: semantic defaults**

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

1. **Semantic HTML Flexibility** - Use the most appropriate element

2. **Component Reusability** - One component serves multiple purposes

3. **Accessibility** - Choose elements for best accessibility

4. **Style System Integration** - Maintain styling while changing elements

---

## 9. As-Child

**Impact: MEDIUM**

Radix UI Slot pattern for merging props and behaviors with
custom child elements without wrapper elements.

### 9.1 asChild Pattern

**Impact: MEDIUM (Prop merging without wrapper elements)**

The `asChild` prop allows components to merge their props, behaviors, and event handlers with a custom child element instead of rendering a default DOM element.

Implement `asChild` when:

- Building trigger components (Dialog.Trigger, Tooltip.Trigger)

- Creating composable components that wrap other elements

- Allowing users to customize rendered element while preserving functionality

- Integrating with existing design system components

**Without asChild: nested elements**

```tsx
<Dialog.Trigger>
  <button>Open Dialog</button>
</Dialog.Trigger>
// Renders: <button><button>Open Dialog</button></button>
```

**With asChild: props merge onto child**

```tsx
<Dialog.Trigger asChild>
  <button>Open Dialog</button>
</Dialog.Trigger>
// Renders: <button data-state="closed">Open Dialog</button>
```

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

**Note: ensure proper ARIA**

```tsx
// Ensure proper ARIA when using non-semantic elements
<Dialog.Trigger asChild>
  <div role="button" tabIndex={0} aria-label="Open dialog">Open</div>
</Dialog.Trigger>
```

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

The `asChild` pattern is essential for:

- **Composability** - Enables flexible component composition

- **Customizable** - Allows users to control rendered elements

- **Transparent** - No hidden wrapper elements in DOM

- **Accessible** - Maintains semantic HTML structure

Reference: [https://www.radix-ui.com/primitives/docs/utilities/slot](https://www.radix-ui.com/primitives/docs/utilities/slot)

---

## 10. Data Attributes

**Impact: LOW**

Using data-state and data-slot attributes for styling component
states and targeting sub-components.

### 10.1 Data Attributes for Styling

**Impact: LOW (Clean state-based styling patterns)**

Use `data-state` and `data-slot` attributes to create flexible, maintainable component APIs.

**Never expose separate className props for different states.** Use `data-state` attributes:**

```tsx
const Dialog = ({ className, ...props }: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      data-state={isOpen ? 'open' : 'closed'}
      className={cn('transition-all', className)}
      {...props}
    />
  );
};
```

**Consumer styles from outside:**

```tsx
<form className="[&_[data-slot=button]]:w-full">
  <Button>Submit</Button>
</form>
```

Give components stable identifiers for parent targeting:

**Incorrect:**

```tsx
data-slot="input"           // Too generic
data-slot="blueButton"      // Includes styling
data-slot="div-wrapper"     // Implementation detail
```

**Correct:**

```tsx
const Button = ({ variant = 'primary', size = 'md', loading, disabled, className, ...props }: ButtonProps) => {
  return (
    <button
      data-slot="button"
      data-loading={loading}
      data-disabled={disabled}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled}
      {...props}
    />
  );
};

// Usage
<form className="[&_[data-slot=button]]:w-full">
  <Button loading={isLoading} className="data-[loading=true]:opacity-50">Submit</Button>
</form>
```

| Pattern | Use For |

|---------|---------|

| `data-state` | Visual states (open/closed, active, loading) |

| `data-slot` | Component identification, parent-child targeting |

| `props` | Variants (primary, secondary), sizes, event handlers |

1. **Use `data-state` instead of separate className props** for states

2. **Add `data-slot` to reusable components** for targeting

3. **Use kebab-case** for `data-slot` values

4. **Prefer Tailwind arbitrary variants** over custom CSS

5. **Never rely on class names** for parent-child targeting

---

## 11. Styling

**Impact: HIGH**

Component styling with Tailwind CSS, cn utility, class-variance-authority
(CVA), and intelligent class merging.

### 11.1 Component Styling with Tailwind CSS

**Impact: HIGH (Predictable, maintainable styling patterns)**

Use Tailwind CSS with intelligent class merging (`tailwind-merge`), conditional classes (`clsx`), and variant APIs (CVA).

**Why:** Without `tailwind-merge`, conflicting classes both apply. The `cn` utility resolves conflicts intelligently.

**Incorrect:**

```tsx
// Without tailwind-merge, conflicting classes both apply
className="bg-red-500 bg-blue-500" // Both classes apply, causing conflicts
className="px-4 py-2 px-8" // Both px-4 and px-8 apply
```

**Correct:**

```tsx
twMerge('bg-red-500', 'bg-blue-500'); // "bg-blue-500"
twMerge('px-4 py-2', 'px-8'); // "py-2 px-8"
twMerge('text-sm', 'text-lg'); // "text-lg"
```

Apply classes in this order:

1. **Base styles** (always applied)

2. **Variant styles** (based on props)

3. **Conditional styles** (based on state)

4. **User overrides** (className prop)

**Incorrect:**

```tsx
// Wrong order: user className comes before variants, preventing overrides
className={cn(className, variant === 'primary' && 'bg-blue-500')}
```

**Correct:**

```tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all",
  {
    variants: {
      variant: {
        default: "bg-blue-500 text-white hover:bg-blue-600",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
        ghost: "hover:bg-gray-100",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-sm",
        lg: "h-10 px-6",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>;

export const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
};
```

For components with multiple variants:

**Key points:**

- Define CVA variants **outside** the component

- Use `VariantProps<typeof variants>` for TypeScript types

- Always merge with `className` prop using `cn`

**1. Extract Repeated Patterns:**

```tsx
export const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500';
export const disabled = 'disabled:pointer-events-none disabled:opacity-50';

className={cn(focusRing, disabled, className)}
```

**2. Use CSS Variables for Dynamic Values:**

**Incorrect:**

```tsx
// Dynamic class generation (not detected by Tailwind)
<div className={`bg-[${dynamicColor}]`} />
```

**Correct:**

```tsx
// CSS variables
<div className="bg-[var(--color)]" style={{ '--color': dynamicColor } as React.CSSProperties} />
```

**3. Document Variants:**

```tsx
type ButtonProps = {
  /** The visual style @default "default" */
  variant?: 'default' | 'destructive' | 'outline' | 'ghost';
  /** The size @default "default" */
  size?: 'sm' | 'default' | 'lg' | 'icon';
};
```

**State-Based Styling:**

```tsx
<div className={cn(
  'transition-all',
  isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
)} />
```

**CVA with Additional Conditionals:**

```tsx
<div className={cn(
  baseVariants({ variant, size }),
  isActive && 'ring-2 ring-blue-500',
  isDisabled && 'opacity-50 cursor-not-allowed',
  className
)} />
```

---

## 12. Design Tokens

**Impact: MEDIUM**

CSS variables for theming, color schemes, and consistent design
system values across components.

### 12.1 Design Tokens

**Impact: MEDIUM (Flexible theming and consistency)**

Use semantic design tokens instead of hardcoded colors. Design tokens separate what something is from how it looks.

**Base Tokens:**

- `--background` - Main page background

- `--foreground` - Primary text color

- `--muted` - Subtle backgrounds

- `--muted-foreground` - Text on muted

- `--border` - Border colors

- `--ring` - Focus ring

**Semantic Tokens:**

- `--primary` / `--primary-foreground`

- `--secondary` / `--secondary-foreground`

- `--destructive` / `--destructive-foreground`

- `--accent` / `--accent-foreground`

**Correct: semantic tokens**

```tsx
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Click me
</button>
```

**Incorrect: hardcoded colors**

```tsx
// Before
<div className="bg-white text-gray-900 border-gray-200">Content</div>

// After
<div className="bg-background text-foreground border-border">Content</div>
```

Override tokens in `.dark` class:

Components automatically adapt because they reference tokens.

Use `oklch()` for better color manipulation:

1. **Never hardcode colors** - Always use design tokens

2. **Use semantic names** - `--primary`, not `--blue-600`

3. **Keep tokens minimal** - Start with base set, add when needed

4. **Document token purpose** - Add comments

5. **Test theme switching** - Ensure all components work in light/dark

6. **Maintain contrast** - Ensure WCAG contrast ratios

---

## 13. Documentation

**Impact: MEDIUM**

Documenting components with JSDoc, usage examples, accessibility
notes, and prop descriptions.

### 13.1 Component Documentation

**Impact: MEDIUM (Adoption and developer experience)**

Create documentation that makes components accessible and easy to use.

Brief introduction explaining what the component does:

Include live demos with code:

Clear, copy-paste ready instructions:

List key capabilities:

Show variants, states, and advanced usage:

Document all props:

Document a11y features:

Track versions:

**Use Real-World Examples:**

```tsx
// ✅ Real-world
function UserProfile({ user }) {
  return (
    <Card>
      <CardHeader><CardTitle>{user.name}</CardTitle></CardHeader>
      <CardContent>
        <Button onClick={() => editUser(user.id)}>Edit Profile</Button>
      </CardContent>
    </Card>
  )
}

// ❌ Too abstract
<Button onClick={handleClick}>Button</Button>
```

**Include Troubleshooting:**

```markdown
## Troubleshooting

**Button not responding:**
- Ensure `onClick` handler is provided
- Check if `disabled` is set
- Verify no parent is capturing events
```

**Link Related Components:**

```markdown
## Related

- [`IconButton`](/components/icon-button)
- [`ButtonGroup`](/components/button-group)
```

**Make Examples Runnable:**

```tsx
// ✅ Complete, runnable
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function CounterButton() {
  const [count, setCount] = useState(0)
  return <Button onClick={() => setCount(count + 1)}>Count: {count}</Button>
}
```

- [ ] Clear overview

- [ ] Live demo

- [ ] Installation instructions

- [ ] Feature list

- [ ] Multiple examples

- [ ] Complete API reference

- [ ] Accessibility docs

- [ ] Changelog

- [ ] Troubleshooting

- [ ] Related components

- [ ] All examples runnable

---

## 14. Registry

**Impact: LOW**

Component registry structure and schema for distributing
components via registries like shadcn/ui.

### 14.1 Component Registries

**Impact: LOW (Source code distribution)**

Registries distribute **source code**, not compiled packages. This enables true component ownership and customization.

**Bad:**

```typescript
// Traditional npm - compiled dependency
import { Button } from 'some-ui-library';
```

**Good:**

```typescript
// Registry-based - source code in your project
import { Button } from '@/components/ui/button';
```

**Bad:**

```json
{
  "name": "announcement",
  "type": "registry:component",
  "description": "A compound badge component"
  // Missing dependencies, registryDependencies, files, and category
}
```

**Good:**

```json
{
  "name": "announcement",
  "type": "registry:component",
  "description": "A compound badge component",
  "dependencies": ["class-variance-authority", "lucide-react"],
  "registryDependencies": ["badge"],
  "files": [
    {
      "type": "registry:component",
      "path": "announcement.tsx",
      "content": "..."
    }
  ],
  "category": "ui"
}
```

**1. Create structure:**

```typescript
my-component/
├── public/
│   └── metric-card.json
└── vercel.json
```

**2. Configure headers (`vercel.json`):**

**Example:**

```json
{
  "headers": [
    {
      "source": "/(.*).json",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Content-Type", "value": "application/json" }
      ]
    }
  ]
}
```

**3. Deploy:**

**Example:**

```bash
vercel --prod
```

**4. Users install via:**

**Example:**

```bash
npx shadcn@latest add https://your-project.vercel.app/metric-card.json
```

**Example:**

```json
{
  "name": "metric-card",
  "type": "registry:component",
  "description": "Display metrics with icon and trend",
  "dependencies": ["lucide-react"],
  "registryDependencies": ["card"],
  "files": [
    {
      "type": "registry:component",
      "path": "metric-card.tsx",
      "content": "import { Card } from '@/components/ui/card'\n\nexport function MetricCard({ title, value }) {\n  return <Card><h3>{title}</h3><p>{value}</p></Card>\n}"
    }
  ],
  "category": "ui"
}
```

| Aspect | Registry | npm |

|--------|----------|-----|

| Distribution | Source code | Compiled |

| Ownership | Full control | Dependency lock |

| Customization | Modify freely | Fork/override |

| Updates | Manual copy | `npm update` |

| Bundle size | Only what you use | Full package |

**For Authors:**

1. Document dependencies

2. Version components

3. Provide examples

4. Test compatibility

5. Use semantic naming

**For Consumers:**

1. Review source code

2. Check dependencies

3. Customize freely

4. Track updates

5. Test thoroughly

**Use registries when:**

- Sharing with community

- Users need source ownership

- Building for specific frameworks

- Quick distribution needed

**Use npm when:**

- Distributing compiled code

- Need version management

- Framework-agnostic libraries

- Complex build processes

---

## 15. NPM

**Impact: LOW**

Publishing components to npm including package.json
configuration, exports, and module formats.

### 15.1 Publishing to NPM

**Impact: LOW (Traditional package distribution)**

Distribute components as npm packages for stable, versioned dependencies with centralized updates.

Choose npm when:

- Users need stable, versioned dependencies

- Centralized control over updates

- Automatic dependency resolution

- Users don't need source code access

**Bad:**

```json
{
  "name": "@acme/ui-components",
  "version": "1.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

Missing `exports` field, pointing to source files instead of built dist, and including React in dependencies instead of peerDependencies.

**Correct:**

```json
{
  "name": "@acme/ui-components",
  "version": "1.0.0",
  "description": "Accessible React components",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./styles.css": "./dist/styles.css"
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup",
    "prepublishOnly": "npm run build"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "dependencies": {
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  }
}
```

**Key points:**

- Use `exports` for modern module resolution

- Include ESM (`module`) and CommonJS (`main`)

- Specify `types` for TypeScript

- Use `peerDependencies` for React

- Limit published files with `files` array

**Critical:** Document this requirement for Tailwind-based components:

**Example:**

```css
@import "tailwindcss";

/* Users must add this to scan your package */
@source "../node_modules/@acme/ui-components";
```

**Example:**

```json
{
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "prepublishOnly": "npm run build"
  }
}
```

**Steps:**

1. Build (`npm run build`)

2. Verify `dist` contents

3. Update version (`npm version patch|minor|major`)

4. Publish (`npm publish`)

**Source Code:**

- Users cannot modify directly

- Bug fixes require package updates

- Customization limited to exposed API

**Bundle Size:**

- All components included

- Tree-shaking helps but imperfect

**Customization:**

- Work within exposed API only

- Forking required for deep changes

**Example:**

```tsx
import { Button } from '@acme/ui-components'

// Pre-built, versioned code from node_modules
```

**npm when:**

- Stable, versioned dependencies needed

- Centralized updates preferred

- Source access not required

**Registry when:**

- Source code access needed

- Customization beyond props important

- Copy-paste workflow preferred

Consider offering both to let developers choose.

---

## 16. Marketplaces

**Impact: LOW**

Distribution strategies for component marketplaces and
third-party component ecosystems.

### 16.1 Component Marketplaces

**Impact: LOW (Centralized discovery and distribution)**

Marketplaces like [21st.dev](https://21st.dev) combine registry accessibility with package repository discoverability.

**For Publishing:**

- Share without managing infrastructure

- Reach built-in audience

- Monetize your work

- Get community feedback

**For Consuming:**

```bash
npx shadcn@latest add https://21st.dev/r/haydenbleasel/dialog-stack
```

- Curated discovery by category

- Quality assurance

- Unified tooling

Example:

1. **Hosting** - No infrastructure management

2. **Unified CLI** - Same installation pattern

3. **Previews** - Live demos and examples

4. **Discovery** - Search, categories, recommendations

Ensure components have:

- Comprehensive documentation

- Multiple demo variations

- Responsive design

- Cross-browser testing

- Accessibility compliance

- Production-ready code

**Bad:**

```json
{
  "name": "my-component",
  "description": "A component",
  "demos": []
}
```

Incomplete documentation, no demos, minimal description - marketplace users can't evaluate quality.

**Good:**

```json
{
  "name": "dialog-stack",
  "description": "A composable dialog system with stack management, keyboard navigation, and focus trapping",
  "demos": [
    {
      "title": "Basic Dialog",
      "description": "Simple modal dialog with close button",
      "code": "..."
    },
    {
      "title": "Nested Dialogs",
      "description": "Multiple dialogs in a stack",
      "code": "..."
    },
    {
      "title": "Form Dialog",
      "description": "Dialog with form validation",
      "code": "..."
    }
  ],
  "documentation": {
    "props": "...",
    "examples": "...",
    "accessibility": "..."
  }
}
```

Comprehensive documentation, multiple demo variations, clear descriptions - enables proper evaluation.

**For Authors:**

- Distribution without infrastructure

- Built-in audience and discovery

- Monetization opportunities

- Community feedback (ratings, comments)

**For Consumers:**

- Curated discovery by category

- Quality assurance through reviews

- Unified installation tooling

**For Authors:**

- Competition and visibility

- Platform dependency

- Quality pressure

**For Consumers:**

- Variable quality despite reviews

- Lock-in concerns

- Discovery paradox (too much choice)

**When Publishing:**

1. Only publish production-ready components

2. Document thoroughly

3. Create multiple demos

4. Test extensively

5. Maintain actively

6. Engage with community

**When Consuming:**

```typescript
Browse by category:
├── Marketing (Heroes, Pricing, Testimonials)
├── Application (Dashboards, Forms, Data Display)
└── E-commerce (Product Cards, Cart, Checkout)
```

1. Evaluate before installing

2. Test in your environment

3. Check maintenance status

4. Review code quality

5. Consider alternatives

Always check:

- Component age and last update

- Documentation quality

- Author reputation

- Dependencies and compatibility

- Test in your environment

---

## References

1. [https://components.build](https://components.build)
2. [https://www.radix-ui.com/primitives](https://www.radix-ui.com/primitives)
3. [https://ui.shadcn.com](https://ui.shadcn.com)
