---
title: Component Documentation
impact: MEDIUM
impactDescription: Adoption and developer experience
tags: documentation, jsdoc, examples, api-reference, accessibility-docs
---

## Component Documentation Guide

Create documentation that makes components accessible and easy to use.

### Essential Sections

#### 1. Overview

Brief introduction explaining what the component does:

```markdown
# Button

A versatile button component with multiple variants and sizes. Use for primary actions, 
secondary actions, or destructive operations.
```

#### 2. Demo and Source Code

Include live demos with code:

```tsx
import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <div className="flex gap-2">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
    </div>
  )
}
```

#### 3. Installation

Clear, copy-paste ready instructions:

```bash
# shadcn/ui CLI
npx shadcn@latest add button

# npm
npm install @acme/ui-components
```

#### 4. Features

List key capabilities:

```markdown
## Features

- **Customizable** – Adjust styles, sizes, and behavior
- **Accessible** – Keyboard navigation, ARIA, screen reader support
- **Composable** – Works with other components
- **Type-safe** – Comprehensive TypeScript types
- **Theming** – Integrates with design tokens
```

#### 5. Examples

Show variants, states, and advanced usage:

```tsx
// Variants
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>

// States
<Button disabled>Disabled</Button>
<Button isLoading>Loading...</Button>

// With icon
<Button><Icon /> Save</Button>
```

#### 6. Props/API Reference

Document all props:

```markdown
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "secondary" \| "destructive"` | `"default"` | Visual style |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size |
| `disabled` | `boolean` | `false` | Disabled state |
| `onClick` | `(event: MouseEvent) => void` | - | Click handler |
```

#### 7. Accessibility

Document a11y features:

```markdown
## Accessibility

- **Keyboard** - Enter/Space activation
- **ARIA** - Proper roles and attributes
- **Focus** - Visible `:focus-visible` indicators
- **Contrast** - WCAG AA (4.5:1)
```

#### 8. Changelog

Track versions:

```markdown
## Changelog

### v2.0.0
**Breaking:** `variant` uses `"default"` instead of `"primary"`

### v1.2.0
- Added `isLoading` prop
- Added `icon` prop
```

### Best Practices

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

### Documentation Checklist

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
