<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'

interface Props {
  value: number
  mass?: number
  stiffness?: number
  damping?: number
  precision?: number
  format?: (value: number) => string
}

const props = withDefaults(defineProps<Props>(), {
  mass: 0.8,
  stiffness: 75,
  damping: 15,
  precision: 0,
  format: (num: number) => num.toLocaleString(),
})

const emit = defineEmits<{
  animationStart: []
  animationComplete: []
}>()

const displayValue = ref(props.format(props.value))
let currentValue = props.value
let velocity = 0
let animationFrame: number | null = null

function animate() {
  const target = props.value
  const force = props.stiffness * (target - currentValue)
  const dampingForce = -props.damping * velocity
  const acceleration = (force + dampingForce) / props.mass

  velocity += acceleration * (1 / 60)
  currentValue += velocity * (1 / 60)

  displayValue.value = props.format(
    parseFloat(currentValue.toFixed(props.precision))
  )

  if (Math.abs(target - currentValue) < 0.01 && Math.abs(velocity) < 0.01) {
    currentValue = target
    displayValue.value = props.format(
      parseFloat(target.toFixed(props.precision))
    )
    animationFrame = null
    emit('animationComplete')
    return
  }

  animationFrame = requestAnimationFrame(animate)
}

watch(
  () => props.value,
  () => {
    emit('animationStart')
    if (animationFrame) cancelAnimationFrame(animationFrame)
    animationFrame = requestAnimationFrame(animate)
  },
  { immediate: true }
)

onUnmounted(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <span>{{ displayValue }}</span>
</template>
