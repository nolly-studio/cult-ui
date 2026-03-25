<script setup lang="ts">
import { cn } from '@/lib/utils'
import { useConfig } from '@/composables/useConfig'

const props = withDefaults(defineProps<{
  defaultTheme?: string
  class?: string
}>(), {
  defaultTheme: undefined,
  class: undefined,
})

const config = useConfig()
</script>

<template>
  <div
    :class="cn(
      `theme-${defaultTheme || config.theme}`,
      'w-full',
      props.class,
    )"
    :style="{ '--radius': `${defaultTheme ? 0.5 : config.radius}rem` }"
  >
    <slot />
  </div>
</template>
