<script setup lang="ts">
/**
 * Canvas component - Vue wrapper for flow-based canvas.
 * Note: The React version uses @xyflow/react (ReactFlow).
 * For Vue, use @vue-flow/core instead.
 * This is a placeholder that consumers should configure with vue-flow.
 */
import { cn } from "@/lib/utils"

defineOptions({ name: "Canvas" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="cn('relative w-full h-full', props.class)"
    data-slot="canvas"
  >
    <slot />
  </div>
</template>
