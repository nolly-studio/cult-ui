<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <h3
    :class="
      cn(
        'text-lg font-semibold leading-tight text-neutral-900 dark:text-neutral-100 pl-2',
        $props.class
      )
    "
  >
    <slot />
  </h3>
</template>
