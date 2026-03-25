<script setup lang="ts">
import { computed } from 'vue'

interface GradientStop {
  color: string
  position: number
}

interface GradientType {
  stops: GradientStop[]
  centerX: number
  centerY: number
}

interface Props {
  gradients: GradientType[]
  animationDuration: number
  class?: string
}

const props = defineProps<Props>()

const backgroundImage = computed(() =>
  props.gradients
    .map(
      (g) =>
        `radial-gradient(circle at ${g.centerX}% ${g.centerY}%, ${g.stops
          .map((s) => `${s.color} ${s.position}%`)
          .join(', ')})`
    )
    .join(', ')
)

const animDuration = computed(() => `${props.animationDuration}s`)
</script>

<template>
  <div
    :class="['absolute inset-0 h-full w-full gradient-animate', props.class]"
    :style="{ backgroundImage, animationDuration: animDuration }"
  />
</template>

<style scoped>
.gradient-animate {
  animation: gradient-shift var(--duration, 20s) linear infinite alternate;
}

@keyframes gradient-shift {
  0% {
    background-size: 100% 100%;
    background-position: 0% 0%;
  }
  50% {
    background-size: 200% 200%;
    background-position: 100% 100%;
  }
  100% {
    background-size: 100% 100%;
    background-position: 0% 0%;
  }
}
</style>
