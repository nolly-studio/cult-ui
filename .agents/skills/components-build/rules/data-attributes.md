---
title: Data Attributes for Styling
impact: LOW
impactDescription: Clean state-based styling patterns
tags: data-attributes, data-state, data-slot, styling, tailwind, css
---

## Data Attributes for Component Styling

Use `data-state` and `data-slot` attributes to create flexible, maintainable component APIs.

### Use data-state for Visual States

**Never expose separate className props for different states.** Use `data-state` attributes:

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
<Dialog className="data-[state=open]:opacity-100 data-[state=closed]:opacity-0" />
```

### Common State Patterns

```tsx
// Open/closed
<Accordion data-state={isOpen ? 'open' : 'closed'} />

// Selected
<Tab data-state={isSelected ? 'active' : 'inactive'} />

// Disabled
<Button data-disabled={isDisabled} disabled={isDisabled} />

// Loading
<Button data-loading={isLoading} />

// Orientation
<Slider data-orientation="horizontal" />

// Side/position
<Tooltip data-side="top" />
```

### Tailwind Integration

```tsx
<Dialog
  className={cn(
    'rounded-lg border p-4',
    'data-[state=open]:animate-in data-[state=open]:fade-in',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out'
  )}
/>
```

### Use data-slot for Component Identification

Give components stable identifiers for parent targeting:

```tsx
function CheckboxGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="checkbox-group"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-6",
        "has-[>[data-slot=checkbox-group]]:gap-3",
        className
      )}
      {...props}
    />
  );
}
```

### Parent-Aware Styling

```tsx
<form className="[&_[data-slot=button]]:w-full">
  <Button>Submit</Button>
</form>
```

### Naming Conventions

**Incorrect:**

```tsx
data-slot="input"           // Too generic
data-slot="blueButton"      // Includes styling
data-slot="div-wrapper"     // Implementation detail
```

**Correct:**

```tsx
data-slot="search-input"
data-slot="navigation-menu"
data-slot="error-message"
data-slot="submit-button"
```

### When to Use Each

| Pattern | Use For |
|---------|---------|
| `data-state` | Visual states (open/closed, active, loading) |
| `data-slot` | Component identification, parent-child targeting |
| `props` | Variants (primary, secondary), sizes, event handlers |

### Combined Example

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

### Rules

1. **Use `data-state` instead of separate className props** for states
2. **Add `data-slot` to reusable components** for targeting
3. **Use kebab-case** for `data-slot` values
4. **Prefer Tailwind arbitrary variants** over custom CSS
5. **Never rely on class names** for parent-child targeting
