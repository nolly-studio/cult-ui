<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()

const contentClasses = 'flex-1 px-6 py-6 sm:px-10 sm:py-8'
</script>

<template>
  <div
    :class="cn(contentClasses, $props.class)"
    data-slot="terminal-animation-content"
  >
    <slot />
  </div>
</template>
