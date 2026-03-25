<script setup lang="ts">
/**
 * Node component for flow canvas.
 * Vue equivalent uses @vue-flow/core node types.
 */
import { cn } from "@/lib/utils"

defineOptions({ name: "FlowNode" })

const props = defineProps<{
  class?: string
  handles?: {
    target: boolean
    source: boolean
  }
}>()
</script>

<template>
  <div
    :class="cn('node-container relative size-full h-auto w-sm gap-0 rounded-md border bg-card p-0 shadow-sm', props.class)"
  >
    <slot />
  </div>
</template>
