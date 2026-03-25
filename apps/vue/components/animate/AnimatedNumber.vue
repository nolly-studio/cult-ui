<script setup lang="ts">
import { ref, watch, onUnmounted, computed } from "vue"
import { useSpring } from "@vueuse/motion"

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

const currentValue = ref(props.value)

const springValues = useSpring(currentValue, {
  mass: props.mass,
  stiffness: props.stiffness,
  damping: props.damping,
})

const displayText = computed(() =>
  props.format(parseFloat(Number(springValues.value).toFixed(props.precision)))
)

watch(
  () => props.value,
  (newVal) => {
    emit("animationStart")
    currentValue.value = newVal
  }
)

watch(springValues, (val) => {
  if (Math.abs(Number(val) - props.value) < 0.01) {
    emit("animationComplete")
  }
})
</script>

<template>
  <span>{{ displayText }}</span>
</template>
