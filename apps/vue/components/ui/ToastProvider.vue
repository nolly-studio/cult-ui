<script setup lang="ts">
import { ToastProvider } from "radix-vue"

defineOptions({ name: "ToastProvider" })

defineProps<{
  duration?: number
  label?: string
  swipeDirection?: "up" | "down" | "left" | "right"
  swipeThreshold?: number
}>()
</script>

<template>
  <ToastProvider
    :duration="duration"
    :label="label"
    :swipe-direction="swipeDirection"
    :swipe-threshold="swipeThreshold"
  >
    <slot />
  </ToastProvider>
</template>
