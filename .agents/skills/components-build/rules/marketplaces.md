---
title: Component Marketplaces
impact: LOW
impactDescription: Centralized discovery and distribution
tags: marketplaces, 21st-dev, distribution, discovery, publishing
---

## Component Marketplaces

Marketplaces like [21st.dev](https://21st.dev) combine registry accessibility with package repository discoverability.

### When to Use

**For Publishing:**
- Share without managing infrastructure
- Reach built-in audience
- Monetize your work
- Get community feedback

**For Consuming:**
- Curated discovery by category
- Quality assurance
- Unified tooling

### Installation Pattern

```bash
npx shadcn@latest add https://21st.dev/r/<author>/<component>
```

Example:
```bash
npx shadcn@latest add https://21st.dev/r/haydenbleasel/dialog-stack
```

### What Marketplaces Provide

1. **Hosting** - No infrastructure management
2. **Unified CLI** - Same installation pattern
3. **Previews** - Live demos and examples
4. **Discovery** - Search, categories, recommendations

### Publishing Requirements

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

### Benefits

**For Authors:**
- Distribution without infrastructure
- Built-in audience and discovery
- Monetization opportunities
- Community feedback (ratings, comments)

**For Consumers:**
- Curated discovery by category
- Quality assurance through reviews
- Unified installation tooling

### Challenges

**For Authors:**
- Competition and visibility
- Platform dependency
- Quality pressure

**For Consumers:**
- Variable quality despite reviews
- Lock-in concerns
- Discovery paradox (too much choice)

### Best Practices

**When Publishing:**
1. Only publish production-ready components
2. Document thoroughly
3. Create multiple demos
4. Test extensively
5. Maintain actively
6. Engage with community

**When Consuming:**
1. Evaluate before installing
2. Test in your environment
3. Check maintenance status
4. Review code quality
5. Consider alternatives

### Discovery Categories

```
Browse by category:
├── Marketing (Heroes, Pricing, Testimonials)
├── Application (Dashboards, Forms, Data Display)
└── E-commerce (Product Cards, Cart, Checkout)
```

### Due Diligence

Always check:
- Component age and last update
- Documentation quality
- Author reputation
- Dependencies and compatibility
- Test in your environment
