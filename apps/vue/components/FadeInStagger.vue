<script setup lang="ts">
import { provide } from 'vue'
import { Motion } from 'motion-v'

interface Props {
  faster?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  faster: false,
})

provide('fadeInStaggerGroup', true)

const viewport = { once: true, margin: '0px 0px -200px' }
</script>

<template>
  <Motion
    :class="props.class"
    initial="hidden"
    while-in-view="visible"
    :viewport="viewport"
    :transition="{ staggerChildren: props.faster ? 0.12 : 0.2 }"
  >
    <slot />
  </Motion>
</template>
