<script setup lang="ts">
/**
 * Connection component - SVG connection line for flow canvas.
 * Vue equivalent of the React ConnectionLineComponent from @xyflow/react.
 * For Vue, use with @vue-flow/core's ConnectionLine slot.
 */
defineOptions({ name: "Connection" })

const props = defineProps<{
  fromX: number
  fromY: number
  toX: number
  toY: number
}>()

const HALF = 0.5
</script>

<template>
  <g>
    <path
      class="animated"
      :d="`M${props.fromX},${props.fromY} C ${props.fromX + (props.toX - props.fromX) * HALF},${props.fromY} ${props.fromX + (props.toX - props.fromX) * HALF},${props.toY} ${props.toX},${props.toY}`"
      fill="none"
      stroke="var(--color-ring)"
      :stroke-width="1"
    />
    <circle
      :cx="props.toX"
      :cy="props.toY"
      fill="#fff"
      :r="3"
      stroke="var(--color-ring)"
      :stroke-width="1"
    />
  </g>
</template>
