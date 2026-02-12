---
title: Components.build Overview
impact: MEDIUM
impactDescription: Foundation for understanding the specification
tags: overview, introduction, philosophy, goals
---

## Components.build Overview

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
