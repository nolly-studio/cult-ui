<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="
      cn('flex items-center justify-between px-6 py-4 gap-2', $props.class)
    "
  >
    <slot />
  </div>
</template>
