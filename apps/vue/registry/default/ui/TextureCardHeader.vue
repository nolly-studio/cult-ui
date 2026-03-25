<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('first:pt-6 last:pb-6', $props.class)">
    <slot />
  </div>
</template>
