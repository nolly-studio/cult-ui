<script setup lang="ts">
import { computed } from 'vue'
import { useConfig } from '@/composables/useConfig'
import { themes } from '@/registry/themes'
import ThemeWrapper from './ThemeWrapper.vue'

const config = useConfig()
const activeTheme = computed(() => themes.find(t => t.name === config.value.theme))

const cssVarPrefixes = ['card', 'popover', 'primary', 'secondary', 'muted', 'accent', 'destructive'] as const

function getThemeCode() {
  const theme = activeTheme.value
  if (!theme) return ''

  const lightVars = Object.entries(theme.cssVars.light)
    .filter(([key]) => key !== 'radius')
    .map(([key, value]) => `    --${key}: ${value};`)
    .join('\n')

  const darkVars = Object.entries(theme.cssVars.dark)
    .map(([key, value]) => `    --${key}: ${value};`)
    .join('\n')

  return `@layer base {
  :root {
${lightVars}
    --radius: ${config.value.radius}rem;
  }

  .dark {
${darkVars}
  }
}`
}
</script>

<template>
  <ThemeWrapper default-theme="zinc" class="relative space-y-4">
    <div data-rehype-pretty-code-fragment="">
      <pre class="max-h-[450px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900">
        <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm whitespace-pre text-white">{{ getThemeCode() }}</code>
      </pre>
    </div>
  </ThemeWrapper>
</template>
