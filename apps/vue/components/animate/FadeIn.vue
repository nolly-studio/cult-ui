<script setup lang="ts">
import { inject, provide, ref } from "vue"
import { useIntersectionObserver, usePreferredReducedMotion } from "@vueuse/core"

interface Props {
  stagger?: boolean
  faster?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  stagger: false,
  faster: false,
})

const isInStaggerGroup = inject("fadeInStagger", false)
const reducedMotion = usePreferredReducedMotion()
const shouldReduceMotion = ref(reducedMotion.value === "reduce")

const el = ref<HTMLElement>()
const isVisible = ref(false)

if (!isInStaggerGroup) {
  useIntersectionObserver(
    el,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        isVisible.value = true
      }
    },
    { rootMargin: "0px 0px -200px" }
  )
}

if (props.stagger) {
  provide("fadeInStagger", true)
}
</script>

<template>
  <div
    v-if="stagger"
    ref="el"
  >
    <slot />
  </div>
  <div
    v-else
    ref="el"
    :style="{
      opacity: isVisible || isInStaggerGroup ? 1 : 0,
      transform: isVisible || isInStaggerGroup
        ? 'translateY(0)'
        : `translateY(${shouldReduceMotion ? 0 : 24}px)`,
      transition: 'opacity 0.5s ease, transform 0.5s ease',
    }"
  >
    <slot />
  </div>
</template>
