<script setup lang="ts">
/**
 * Edge components for flow canvas.
 * Vue equivalent uses @vue-flow/core edge types.
 * Provides Temporary and Animated edge variants as named slots/components.
 */
defineOptions({ name: "Edge" })

const props = defineProps<{
  variant: "temporary" | "animated"
  id: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition?: string
  targetPosition?: string
  path?: string
  markerEnd?: string
}>()
</script>

<template>
  <!-- Temporary edge (dashed) -->
  <template v-if="props.variant === 'temporary'">
    <path
      class="stroke-1 stroke-ring"
      :id="props.id"
      :d="props.path"
      fill="none"
      style="stroke-dasharray: 5, 5"
    />
  </template>

  <!-- Animated edge -->
  <template v-else-if="props.variant === 'animated'">
    <path
      :id="props.id"
      :d="props.path"
      fill="none"
      class="stroke-1 stroke-ring"
      :marker-end="props.markerEnd"
    />
    <circle fill="var(--primary)" r="4">
      <animateMotion dur="2s" :path="props.path" repeatCount="indefinite" />
    </circle>
  </template>
</template>
