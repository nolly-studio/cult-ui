<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()

const backgroundGradientClasses =
  'absolute inset-0 bg-gradient-to-br from-violet-600/40 via-fuchsia-600/30 to-indigo-950'
</script>

<template>
  <div
    aria-hidden="true"
    :class="cn(backgroundGradientClasses, $props.class)"
    data-slot="terminal-animation-background-gradient"
  />
</template>
