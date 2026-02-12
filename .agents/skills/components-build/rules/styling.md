---
title: Component Styling with Tailwind CSS
impact: HIGH
impactDescription: Predictable, maintainable styling patterns
tags: styling, tailwind, cn, clsx, tailwind-merge, cva, class-variance-authority
---

## Component Styling with Tailwind CSS

Use Tailwind CSS with intelligent class merging (`tailwind-merge`), conditional classes (`clsx`), and variant APIs (CVA).

### The `cn` Utility Function

```tsx
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Why:** Without `tailwind-merge`, conflicting classes both apply. The `cn` utility resolves conflicts intelligently.

### Class Merging

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

### Component Pattern: Order Matters

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
const Component = ({ className, variant, isActive, ...props }: ComponentProps) => {
  return (
    <div
      className={cn(
        'rounded-lg border bg-white shadow-sm',  // 1. Base
        variant === 'primary' && 'bg-blue-500',  // 2. Variants
        isActive && 'ring-2 ring-blue-500',       // 3. Conditionals
        className                                  // 4. User overrides
      )}
      {...props}
    />
  );
};
```

### Conditional Classes with `clsx`

```tsx
cn('base', isActive && 'active');
cn('base', { 'active': isActive, 'disabled': isDisabled });
cn(['base', isLarge ? 'text-lg' : 'text-sm']);
```

### Class Variance Authority (CVA)

For components with multiple variants:

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

**Key points:**
- Define CVA variants **outside** the component
- Use `VariantProps<typeof variants>` for TypeScript types
- Always merge with `className` prop using `cn`

### Best Practices

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

### Common Patterns

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
