<script setup lang="ts">
import { computed } from "vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "Shimmer" })

const props = withDefaults(
  defineProps<{
    class?: string
    as?: string
    duration?: number
    spread?: number
  }>(),
  {
    as: "p",
    duration: 2,
    spread: 2,
  }
)

const slots = defineSlots<{
  default(): any
}>()

const dynamicSpread = computed(() => {
  // Approximate character count from slot - fallback to 10
  return 10 * props.spread
})

const shimmerStyle = computed(() => ({
  "--spread": `${dynamicSpread.value}px`,
  backgroundImage:
    "var(--bg), linear-gradient(var(--color-muted-foreground), var(--color-muted-foreground))",
  animation: `shimmer ${props.duration}s linear infinite`,
}))
</script>

<template>
  <component
    :is="props.as"
    :class="cn(
      'relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent',
      '[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--color-background),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]',
      'animate-shimmer',
      props.class
    )"
    :style="shimmerStyle"
  >
    <slot />
  </component>
</template>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: 100% center;
  }
  100% {
    background-position: 0% center;
  }
}

.animate-shimmer {
  animation: shimmer v-bind('`${props.duration}s`') linear infinite;
}
</style>
