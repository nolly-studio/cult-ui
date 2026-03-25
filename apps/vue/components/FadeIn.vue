<script setup lang="ts">
import { inject, provide, ref } from 'vue'
import { Motion, useReducedMotion } from 'motion-v'

const isInStaggerGroup = inject<boolean>('fadeInStaggerGroup', false)
const shouldReduceMotion = useReducedMotion()

const viewport = { once: true, margin: '0px 0px -200px' }

interface Props {
  class?: string
}

defineProps<Props>()
</script>

<template>
  <Motion
    :class="props.class"
    :variants="{
      hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
      visible: { opacity: 1, y: 0 },
    }"
    :transition="{ duration: 0.5 }"
    v-bind="
      isInStaggerGroup
        ? {}
        : {
            initial: 'hidden',
            whileInView: 'visible',
            viewport,
          }
    "
  >
    <slot />
  </Motion>
</template>
