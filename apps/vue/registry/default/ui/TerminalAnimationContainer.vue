<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()

const containerClasses =
  'relative w-full max-w-[62rem] px-3 pt-10 pb-0 md:px-0 md:pt-28'
</script>

<template>
  <div
    :class="cn(containerClasses, $props.class)"
    data-slot="terminal-animation-container"
  >
    <slot />
  </div>
</template>
