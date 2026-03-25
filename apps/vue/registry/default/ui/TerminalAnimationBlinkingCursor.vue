<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <span
    aria-hidden="true"
    :class="
      cn(
        'ml-0.5 inline-block h-[18px] w-[7px] translate-y-[3px] animate-caret-blink bg-muted-foreground duration-1000',
        $props.class
      )
    "
    data-slot="terminal-animation-blinking-cursor"
  />
</template>
