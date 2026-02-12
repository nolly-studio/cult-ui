---
title: Design Tokens
impact: MEDIUM
impactDescription: Flexible theming and consistency
tags: design-tokens, css-variables, theming, dark-mode, oklch
---

## Design Tokens

Use semantic design tokens instead of hardcoded colors. Design tokens separate what something is from how it looks.

### Variable Architecture

```css
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
}

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
}
```

### Token Naming

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

### Usage in Components

**Correct (semantic tokens):**

```tsx
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Click me
</button>
```

**Incorrect (hardcoded colors):**

```tsx
<button className="bg-blue-600 text-white hover:bg-blue-700">
  Click me
</button>
```

### Component Examples

```tsx
// Card
<div className="bg-background border border-border rounded-lg p-6">
  <h2 className="text-foreground font-semibold">Title</h2>
  <p className="text-muted-foreground">Description</p>
</div>

// Button variants
<button className="bg-primary text-primary-foreground">Primary</button>
<button className="bg-secondary text-secondary-foreground">Secondary</button>
<button className="bg-destructive text-destructive-foreground">Delete</button>

// Input
<input className="bg-background border border-border text-foreground placeholder:text-muted-foreground" />
```

### Dark Mode

Override tokens in `.dark` class:

```css
:root { --background: oklch(1 0 0); --foreground: oklch(0.145 0 0); }
.dark { --background: oklch(0.145 0 0); --foreground: oklch(0.985 0 0); }
```

Components automatically adapt because they reference tokens.

### Color Format: OKLCH

Use `oklch()` for better color manipulation:

```css
/* ✅ OKLCH - perceptually uniform */
--primary: oklch(0.5 0.2 250);

/* ⚠️ RGB/HSL - harder to manipulate */
--primary: rgb(100, 150, 200);
```

### Best Practices

1. **Never hardcode colors** - Always use design tokens
2. **Use semantic names** - `--primary`, not `--blue-600`
3. **Keep tokens minimal** - Start with base set, add when needed
4. **Document token purpose** - Add comments
5. **Test theme switching** - Ensure all components work in light/dark
6. **Maintain contrast** - Ensure WCAG contrast ratios

### Theme Variants

```css
:root { --primary: oklch(0.5 0.2 250); }
[data-theme="brand-b"] { --primary: oklch(0.5 0.2 120); }
[data-theme="brand-c"] { --primary: oklch(0.5 0.2 0); }
```

### Migration

```tsx
// Before
<div className="bg-white text-gray-900 border-gray-200">Content</div>

// After
<div className="bg-background text-foreground border-border">Content</div>
```
