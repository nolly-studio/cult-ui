---
name: components-build
description: Build modern, composable, and accessible React UI components following the components.build specification. Use when creating, reviewing, or refactoring component libraries, design systems, or any reusable UI components. Triggers on tasks involving component APIs, composition patterns, accessibility, styling systems, or TypeScript props.
license: MIT
metadata:
  author: components.build
  version: "1.0.0"
---

# Components.build Specification

Comprehensive guidelines for building modern, composable, and accessible UI components. Contains 16 rule categories covering everything from core principles to distribution, co-authored by Hayden Bleasel and shadcn.

## When to Apply

Reference these guidelines when:
- Creating new React components or component libraries
- Designing component APIs and prop interfaces
- Implementing accessibility features (keyboard, ARIA, focus management)
- Building composable component architectures
- Styling components with Tailwind CSS and CVA
- Publishing components to registries or npm

## Rule Categories by Priority

| Priority | Category | Focus | Prefix |
|----------|----------|-------|--------|
| 1 | Overview | Specification scope and goals | `overview` |
| 2 | Principles | Core design philosophy | `principles` |
| 3 | Definitions | Common terminology | `definitions` |
| 4 | Composition | Breaking down complex components | `composition` |
| 5 | Accessibility | Keyboard, screen readers, ARIA | `accessibility` |
| 6 | State | Controlled/uncontrolled patterns | `state` |
| 7 | Types | TypeScript props and interfaces | `types` |
| 8 | Polymorphism | Element switching with `as` prop | `polymorphism` |
| 9 | As-Child | Radix Slot composition pattern | `as-child` |
| 10 | Data Attributes | `data-state` and `data-slot` | `data-attributes` |
| 11 | Styling | Tailwind CSS, cn utility, CVA | `styling` |
| 12 | Design Tokens | CSS variables and theming | `design-tokens` |
| 13 | Documentation | Component documentation | `documentation` |
| 14 | Registry | Component registries | `registry` |
| 15 | NPM | Publishing to npm | `npm` |
| 16 | Marketplaces | Component marketplaces | `marketplaces` |

## Quick Reference

### 1. Overview
- `overview` - Specification scope, goals, and philosophy

### 2. Principles
- `principles` - Composability, accessibility, customization, transparency

### 3. Definitions
- `definitions` - Common terminology (primitive, compound, headless, etc.)

### 4. Composition
- `composition-root` - Root component with Context for shared state
- `composition-item` - Item wrapper components
- `composition-trigger` - Interactive trigger components
- `composition-content` - Content display components
- `composition-export` - Namespace export pattern

### 5. Accessibility
- `accessibility-semantic-html` - Use appropriate HTML elements
- `accessibility-keyboard` - Full keyboard navigation support
- `accessibility-aria` - Proper ARIA roles, states, and properties
- `accessibility-focus` - Focus management and restoration
- `accessibility-live-regions` - Screen reader announcements
- `accessibility-contrast` - Color contrast requirements

### 6. State
- `state-uncontrolled` - Internal state management
- `state-controlled` - External state delegation
- `state-controllable` - Support both patterns with useControllableState

### 7. Types
- `types-extend-html` - Extend native HTML attributes
- `types-export` - Export prop types for consumers
- `types-single-element` - One component wraps one element

### 8. Polymorphism
- `polymorphism-as-prop` - Change rendered element type
- `polymorphism-typescript` - Type-safe polymorphic components
- `polymorphism-defaults` - Semantic element defaults

### 9. As-Child
- `as-child-slot` - Radix Slot for prop merging
- `as-child-composition` - Compose with child components

### 10. Data Attributes
- `data-attributes-state` - Use `data-state` for styling states
- `data-attributes-slot` - Use `data-slot` for targeting sub-components

### 11. Styling
- `styling-cn-utility` - Combine clsx and tailwind-merge
- `styling-order` - Base → Variants → Conditionals → User overrides
- `styling-cva` - Class Variance Authority for variants
- `styling-css-variables` - Dynamic values with CSS variables

### 12. Design Tokens
- `design-tokens-css-variables` - Define tokens as CSS variables
- `design-tokens-theming` - Support light/dark modes and themes

### 13. Documentation
- `documentation-props` - Document all props with JSDoc
- `documentation-examples` - Provide usage examples

### 14. Registry
- `registry-structure` - Registry file structure
- `registry-schema` - Component metadata schema

### 15. NPM
- `npm-package-json` - Package configuration
- `npm-exports` - Module exports

### 16. Marketplaces
- `marketplaces-distribution` - Component distribution strategies

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/composition/SKILL.md
rules/accessibility/SKILL.md
rules/styling/SKILL.md
```

Each rule file contains:
- Brief explanation of why it matters
- Incorrect code example with explanation
- Correct code example with explanation
- Best practices and common pitfalls

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`

## Key Principles

1. **Composition over Configuration** - Break components into composable sub-components
2. **Accessibility by Default** - Not an afterthought, but a requirement
3. **Single Element Wrapping** - Each component wraps one HTML element
4. **Extend HTML Attributes** - Always extend native element props
5. **Export Types** - Make prop types available to consumers
6. **Support Both State Patterns** - Controlled and uncontrolled
7. **Intelligent Class Merging** - Use `cn()` utility with tailwind-merge

## Authors

Co-authored by:
- **Hayden Bleasel** ([@haydenbleasel](https://x.com/haydenbleasel))
- **shadcn** ([@shadcn](https://x.com/shadcn))

Adapted as an AI skill by:
- **Jordan Gilliam** ([@nolansym](https://x.com/nolansym))

Based on the [components.build](https://components.build) specification.
