---
title: Component Registries
impact: LOW
impactDescription: Source code distribution
tags: registry, shadcn, distribution, cli, source-code
---

## Component Registries

Registries distribute **source code**, not compiled packages. This enables true component ownership and customization.

### Core Concept

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

### Registry Metadata Format

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

### Quick Publishing

**1. Create structure:**

```
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

### Component JSON Structure

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

### Registry vs npm

| Aspect | Registry | npm |
|--------|----------|-----|
| Distribution | Source code | Compiled |
| Ownership | Full control | Dependency lock |
| Customization | Modify freely | Fork/override |
| Updates | Manual copy | `npm update` |
| Bundle size | Only what you use | Full package |

### Best Practices

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

### When to Use

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
