---
title: Publishing to NPM
impact: LOW
impactDescription: Traditional package distribution
tags: npm, package, publishing, versioning, exports
---

## Publishing Components to NPM

Distribute components as npm packages for stable, versioned dependencies with centralized updates.

### When to Use NPM

Choose npm when:
- Users need stable, versioned dependencies
- Centralized control over updates
- Automatic dependency resolution
- Users don't need source code access

### Package Configuration

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

### Tailwind Configuration

**Critical:** Document this requirement for Tailwind-based components:

**Example:**
```css
@import "tailwindcss";

/* Users must add this to scan your package */
@source "../node_modules/@acme/ui-components";
```

### Build and Publish

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

### Trade-offs

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

### Usage

**Example:**
```bash
npm install @acme/ui-components
```

```tsx
import { Button } from '@acme/ui-components'

// Pre-built, versioned code from node_modules
```

### Choosing Distribution

**npm when:**
- Stable, versioned dependencies needed
- Centralized updates preferred
- Source access not required

**Registry when:**
- Source code access needed
- Customization beyond props important
- Copy-paste workflow preferred

Consider offering both to let developers choose.
