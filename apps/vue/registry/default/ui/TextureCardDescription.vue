<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <p
    :class="
      cn('text-sm text-neutral-600 dark:text-neutral-400 pl-2', $props.class)
    "
  >
    <slot />
  </p>
</template>
