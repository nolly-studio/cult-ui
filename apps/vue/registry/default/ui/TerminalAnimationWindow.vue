<script setup lang="ts">
import { ref, onMounted, onUnmounted, type CSSProperties } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    class?: string
    backgroundColor?: string
    minHeight?: string
    animateOnVisible?: boolean
  }>(),
  {
    class: undefined,
    backgroundColor: undefined,
    minHeight: '28rem',
    animateOnVisible: true,
  }
)

const windowRef = ref<HTMLDivElement | null>(null)
const hasAnimated = ref(false)

const windowClasses = 'relative flex flex-col overflow-hidden rounded-t-xl'

onMounted(() => {
  if (!props.animateOnVisible || !windowRef.value) return
  const el = windowRef.value
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        hasAnimated.value = true
      }
    },
    { threshold: 0.1 }
  )
  observer.observe(el)
  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <div
    ref="windowRef"
    :class="
      cn(
        windowClasses,
        !backgroundColor && 'bg-card',
        animateOnVisible &&
          'transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]',
        animateOnVisible && !hasAnimated && 'translate-y-64',
        animateOnVisible && hasAnimated && 'translate-y-0',
        props.class
      )
    "
    data-slot="terminal-animation-window"
    :style="
      backgroundColor
        ? { backgroundColor, minHeight }
        : { minHeight }
    "
  >
    <slot />
  </div>
</template>
