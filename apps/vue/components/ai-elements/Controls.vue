<script setup lang="ts">
/**
 * Controls component - Flow canvas controls wrapper.
 * Vue equivalent uses @vue-flow/core Controls.
 * This is a styled container for flow control buttons.
 */
import { cn } from "@/lib/utils"

defineOptions({ name: "Controls" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="cn(
      'gap-px overflow-hidden rounded-md border bg-card p-1 shadow-none',
      '[&>button]:rounded-md [&>button]:border-none [&>button]:bg-transparent [&>button]:hover:bg-secondary',
      props.class
    )"
  >
    <slot />
  </div>
</template>
