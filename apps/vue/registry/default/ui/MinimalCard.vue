<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{ class?: string }>()
</script>

<template>
  <div
    :class="cn(
      'rounded-[24px] dark:bg-neutral-800 bg-neutral-50 p-2 no-underline shadow-sm transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800/80',
      'shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]',
      'shadow-[rgba(17,24,28,0.08)_0_0_0_1px,rgba(17,24,28,0.08)_0_1px_2px_-1px,rgba(17,24,28,0.04)_0_2px_4px]',
      'dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]',
      $props.class
    )"
  >
    <slot />
  </div>
</template>
