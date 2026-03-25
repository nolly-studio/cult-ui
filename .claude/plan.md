# React-to-Vue Full Conversion Plan

## Summary

Convert the entire cult-ui React/Next.js component showcase site (383 TS/TSX files) to Vue 3/Nuxt 3 with shadcn-vue. The new app lives at `apps/vue/` alongside the existing `apps/www/`, allowing parallel workers to add files to non-overlapping paths without merge conflicts.

### Tech Stack Mapping

| React Stack | Vue Stack |
|---|---|
| Next.js 16 | Nuxt 3 |
| React 19 | Vue 3 (Composition API, `<script setup>`) |
| Radix UI + shadcn/ui | Radix Vue + shadcn-vue |
| Fumadocs (MDX) | Nuxt Content v2 |
| next-themes | @nuxtjs/color-mode |
| Jotai | Pinia |
| Motion (Framer) | @vueuse/motion / Vue `<Transition>` |
| React Hook Form | VeeValidate + Zod |
| lucide-react | lucide-vue-next |
| cmdk | vue-command-palette |
| sonner | vue-sonner |
| vaul | vaul-vue |
| embla-carousel-react | embla-carousel-vue |
| @tanstack/react-table | @tanstack/vue-table |
| SWR | useFetch (Nuxt) / @tanstack/vue-query |
| react-resizable-panels | splitpanes |

### Conversion Patterns (shared with all workers)

```
- useState(x) → ref(x) or reactive({})
- useEffect(() => {}, [deps]) → watch(deps, cb) or onMounted/onUnmounted
- useRef(x) → ref(x) (template ref) or shallowRef(x) (value)
- useContext → inject/provide or Pinia store
- JSX → <template> + <script setup lang="ts">
- className → class
- onClick → @click, onChange → @update:model-value
- {cond && <X />} → <X v-if="cond" />
- {items.map(i => <X key={i.id} />)} → <X v-for="i in items" :key="i.id" />
- children → <slot />
- React.forwardRef → defineExpose + useTemplateRef
- Props interface → defineProps<{}>()
- Callback props → defineEmits
- asChild + Slot → Radix Vue's asChild equivalent
- cn() / clsx → works as-is in Vue
- "use client" → remove (Nuxt handles this)
```

---

## Work Units (18 total)

### Unit 1: Nuxt 3 Scaffolding + Base Config
**Files to create:** `apps/vue/nuxt.config.ts`, `package.json`, `app.vue`, `tsconfig.json`, `assets/css/globals.css`, `assets/css/mdx.css`, `tailwind.config`, `.eslintrc`, `components.json` (shadcn-vue config)
**Description:** Initialize the Nuxt 3 app with Tailwind CSS 4, shadcn-vue, Pinia, @nuxtjs/color-mode, @vueuse/motion. Configure module aliases (`@/` → project root). Set up the `pnpm-workspace.yaml` entry. Create `lib/utils.ts` with `cn()` helper.

### Unit 2: Layouts + Site Shell + Navigation
**Source files:** `app/(app)/layout.tsx`, `app/(app)/docs/layout.tsx`, `components/site-header.tsx`, `components/site-footer.tsx`, `components/main-nav.tsx`, `components/mobile-nav.tsx`, `components/sidebar-nav.tsx`, `components/tailwind-indicator.tsx`, `components/announcement.tsx`, `components/page-header.tsx`
**Target:** `apps/vue/layouts/default.vue`, `layouts/docs.vue`, `components/site/`
**Description:** Convert Next.js layouts to Nuxt layouts. Convert navigation components to Vue SFCs.

### Unit 3: Theme System + Themes Page
**Source files:** `components/mode-toggle.tsx`, `components/theme-customizer.tsx`, `components/theme-switcher.tsx`, `components/theme-wrapper.tsx`, `components/theme-component.tsx`, `components/style-switcher.tsx`, `components/style-wrapper.tsx`, `components/providers.tsx`, `app/(app)/themes/`
**Target:** `apps/vue/components/theme/`, `pages/themes.vue`, `plugins/color-mode.ts`, `stores/theme.ts`
**Description:** Convert theme system using @nuxtjs/color-mode and Pinia store. Convert themes page.

### Unit 4: Home Page + Landing Components
**Source files:** `app/(app)/page.tsx`, `components/landing/*` (14 files)
**Target:** `apps/vue/pages/index.vue`, `components/landing/`
**Description:** Convert the home/landing page and all landing section components (pixel headings, blocks grid, template grid, plug grid, feature section, etc.).

### Unit 5: UI Primitives — Forms
**Source files (14):** `components/ui/button.tsx`, `button-group.tsx`, `input.tsx`, `input-group.tsx`, `input-otp.tsx`, `label.tsx`, `checkbox.tsx`, `radio-group.tsx`, `select.tsx`, `switch.tsx`, `textarea.tsx`, `form.tsx`, `slider.tsx`, `calendar.tsx`
**Target:** `apps/vue/components/ui/`
**Description:** Convert shadcn/ui form primitives to shadcn-vue equivalents. Use Radix Vue primitives.

### Unit 6: UI Primitives — Overlays & Feedback
**Source files (17):** `components/ui/dialog.tsx`, `dropdown-menu.tsx`, `popover.tsx`, `tooltip.tsx`, `context-menu.tsx`, `hover-card.tsx`, `alert-dialog.tsx`, `sheet.tsx`, `drawer.tsx`, `alert.tsx`, `toast.tsx`, `toaster.tsx`, `sonner.tsx`, `use-toast.ts`, `progress.tsx`, `skeleton.tsx`, `spinner.tsx`
**Target:** `apps/vue/components/ui/`
**Description:** Convert overlay/feedback primitives. Replace sonner with vue-sonner, vaul/drawer with vaul-vue.

### Unit 7: UI Primitives — Navigation, Data & Layout
**Source files (20):** `components/ui/tabs.tsx`, `accordion.tsx`, `collapsible.tsx`, `navigation-menu.tsx`, `menubar.tsx`, `command.tsx`, `breadcrumb.tsx`, `pagination.tsx`, `table.tsx`, `card.tsx`, `avatar.tsx`, `badge.tsx`, `separator.tsx`, `aspect-ratio.tsx`, `scroll-area.tsx`, `carousel.tsx`, `resizable.tsx`, `toggle.tsx`, `toggle-group.tsx`, `sidebar.tsx`
**Target:** `apps/vue/components/ui/`
**Description:** Convert navigation, data display, and layout primitives to shadcn-vue.

### Unit 8: Composables + Lib + Animations
**Source files:** `hooks/*` (8 files), `lib/*` (15 files), `components/animate/*` (6 files)
**Target:** `apps/vue/composables/`, `lib/`, `components/animate/`
**Description:** Convert React hooks to Vue composables (useClickOutside, useConfig, useCopyToClipboard, useLiftMode, useLockBody, useMediaQuery, useMounted, useMutationObserver). Convert lib utilities. Convert animation components.

### Unit 9: Site Infrastructure Components
**Source files (~35):** `components/component-preview.tsx`, `component-preview-tabs.tsx`, `component-example.tsx`, `component-source.tsx`, `component-card.tsx`, `components-list.tsx`, `code-block-wrapper.tsx`, `code-block-command.tsx`, `code-collapsible-wrapper.tsx`, `code-tabs.tsx`, `copy-button.tsx`, `cli-install-button.tsx`, `cli-registry-config.tsx`, `cli-registry-snippet.tsx`, `command-menu.tsx`, `docs-copy-page.tsx`, `docs-sidebar.tsx`, `docs-toc.tsx`, `block-*.tsx` (5), `icons.tsx`, `pager.tsx`, `callout.tsx`, `github-link.tsx`, `examples-nav.tsx`, `promo-video.tsx`, `two-tone-text.tsx`, `get-cult-pro-cta.tsx`, `alert-banner.tsx`, `mdx-components.tsx`, `texture-wrapper.tsx`, `distorted-glass.tsx`, `background-guides.tsx`, `open-in-v0-button.tsx`, `analytics.tsx`, `toc.tsx`, `fade-in.tsx`, `block-display.tsx`
**Target:** `apps/vue/components/`
**Description:** Convert all site infrastructure components (component previews, code blocks, docs UI, etc.).

### Unit 10: AI Elements A (first 24)
**Source files:** `components/ai-elements/agent.tsx` through `components/ai-elements/node.tsx` (alphabetical first 24)
**Target:** `apps/vue/components/ai-elements/`
**Description:** Convert AI chat/agent UI components to Vue SFCs.

### Unit 11: AI Elements B (remaining 23)
**Source files:** `components/ai-elements/open-in-chat.tsx` through `components/ai-elements/web-preview.tsx` (alphabetical remaining 23)
**Target:** `apps/vue/components/ai-elements/`
**Description:** Convert remaining AI element components to Vue SFCs.

### Unit 12: Registry UI Components A (1–24)
**Source files:** `registry/default/ui/ai-instructions.tsx` through `registry/default/ui/floating-panel.tsx`
**Target:** `apps/vue/registry/default/ui/`
**Description:** Convert first 24 showcase UI components to Vue SFCs.

### Unit 13: Registry UI Components B (25–48)
**Source files:** `registry/default/ui/glow-button.tsx` through `registry/default/ui/poll-widget.tsx`
**Target:** `apps/vue/registry/default/ui/`
**Description:** Convert next 24 showcase UI components to Vue SFCs.

### Unit 14: Registry UI Components C (49–72)
**Source files:** `registry/default/ui/popover-form.tsx` through `registry/default/ui/youtube-video-player.tsx`
**Target:** `apps/vue/registry/default/ui/`
**Description:** Convert remaining 24 showcase UI components to Vue SFCs.

### Unit 15: Registry Examples A (1–33)
**Source files:** `registry/default/example/ai-instructions-demo.tsx` through `registry/default/example/loading-carousel-demo.tsx`
**Target:** `apps/vue/registry/default/example/`
**Description:** Convert first 33 demo/example components to Vue SFCs.

### Unit 16: Registry Examples B (34–67)
**Source files:** `registry/default/example/logo-carousel-demo.tsx` through `registry/default/example/youtube-video-player-demo.tsx`
**Target:** `apps/vue/registry/default/example/`
**Description:** Convert remaining 34 demo/example components to Vue SFCs.

### Unit 17: Docs Content + Nuxt Content System
**Source files:** `content/docs/**/*.mdx` (76 files), `mdx-components.tsx`
**Target:** `apps/vue/content/docs/`, `components/content/`
**Description:** Set up Nuxt Content v2 module. Convert 76 MDX doc files to Nuxt Content `.md` format. Adapt frontmatter schema. Create Vue equivalents of MDX components (ComponentPreview, CodeTabs, etc.).

### Unit 18: Registry System, Build Scripts & Config
**Source files:** `registry/index.ts`, `registry/ui.ts`, `registry/examples.ts`, `registry/blocks.ts`, `registry/themes.ts`, `registry/colors.ts`, `registry/styles.ts`, `registry/schema.ts`, `scripts/build-registry.mts`, `config/docs.ts`, `config/site.ts`, `pages/api/components.ts`, `app/(app)/registry/[name]/route.ts`
**Target:** `apps/vue/registry/`, `scripts/`, `config/`, `server/api/`, `pages/docs/[...slug].vue`
**Description:** Convert registry metadata, build scripts, site config, API routes (to Nuxt server routes), and dynamic docs routing.

---

## E2E Test Recipe

**For Unit 1 (scaffolding):**
1. `cd apps/vue && pnpm install && pnpm dev`
2. Use Playwright to navigate to `http://localhost:3000` and take a screenshot
3. Verify the app renders without errors

**For page/layout units (2, 3, 4):**
1. Verify Vue SFC syntax is valid (no JSX leaking, proper `<template>` / `<script setup>` structure)
2. Run `npx vue-tsc --noEmit` if possible

**For component-only units (5–18):**
1. Verify all `.vue` files have valid SFC structure
2. Ensure no React imports remain (`import React`, `from 'react'`, `"use client"`)
3. Run linting if configured

---

## Worker Instructions (shared template)

Each worker receives:
1. The overall goal (convert React to Vue)
2. Their specific unit assignment (files, target paths)
3. The conversion patterns table above
4. The e2e recipe for their unit type

After implementing:
1. **Simplify** — Invoke the `Skill` tool with `skill: "simplify"` to review and clean up changes.
2. **Run unit tests** — Run the project's test suite if available.
3. **Test end-to-end** — Follow the e2e recipe for this unit type.
4. **Commit and push** — Commit all changes, push the branch, create a PR with `gh pr create`.
5. **Report** — End with `PR: <url>` or `PR: none — <reason>`.

## Team Structure

- **Team name:** `vue-refactor`
- **Team lead:** Coordinator (this agent) — creates tasks, assigns to workers, tracks progress
- **Workers:** 18 agents, each handling one unit, all running in worktrees
- Workers operate on the `feat/vue-refactor` branch as base
- All PRs target `feat/vue-refactor`
