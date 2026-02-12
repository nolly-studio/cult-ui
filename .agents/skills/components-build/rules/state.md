---
title: State Management Patterns
impact: HIGH
impactDescription: Flexible component APIs for all use cases
tags: state, controlled, uncontrolled, useControllableState, radix
---

## State Management Patterns

Build flexible components that work seamlessly in both controlled and uncontrolled modes.

### Uncontrolled State

Component manages its own state internally:

```tsx
export const Stepper = () => {
  const [value, setValue] = useState(0);
  return (
    <div>
      <p>{value}</p>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  );
};
```

**When to use:** Simple components, default behavior, internal state is sufficient.

### Controlled State

Parent component manages the state:

```tsx
type StepperProps = {
  value: number;
  setValue: (value: number) => void;
};

export const Stepper = ({ value, setValue }: StepperProps) => (
  <div>
    <p>{value}</p>
    <button onClick={() => setValue(value + 1)}>Increment</button>
  </div>
);
```

**When to use:** State coordination, external data sources, form validation, persistence.

### Merging Both Patterns

Use `@radix-ui/react-use-controllable-state` to support both:

```tsx
import { useControllableState } from '@radix-ui/react-use-controllable-state';

type StepperProps = {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
};

export const Stepper = ({ value: controlledValue, defaultValue, onValueChange }: StepperProps) => {
  const [value, setValue] = useControllableState({
    prop: controlledValue,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  return (
    <div>
      <p>{value}</p>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  );
};
```

**Usage:**

```tsx
// Uncontrolled
<Stepper defaultValue={0} />

// Controlled
const [count, setCount] = useState(5);
<Stepper value={count} onValueChange={setCount} />
```

### Prop Naming Conventions

| State Type | Value Prop | Default Prop | Change Callback |
|------------|------------|--------------|-----------------|
| Generic | `value` | `defaultValue` | `onValueChange` |
| Boolean | `checked` | `defaultChecked` | `onCheckedChange` |
| Open/Close | `open` | `defaultOpen` | `onOpenChange` |
| Selection | `selected` | `defaultSelected` | `onSelectedChange` |

### Complete Example: Toggle

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

### Best Practices

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

### Key Benefits

1. **Flexibility** - Works in both controlled and uncontrolled modes
2. **Developer Experience** - Simple API for simple cases, powerful for complex
3. **Consistency** - Matches patterns used by Radix UI and professional libraries
4. **Backward Compatibility** - Easy to migrate from uncontrolled to controlled
