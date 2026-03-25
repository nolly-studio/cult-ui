<script setup lang="ts">
import { cn } from "~/lib/utils"

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <span
    :class="
      cn(
        'text-muted-foreground flex items-center gap-2 text-sm [&_svg:not([class*=\'size-\'])]:size-4 [&_svg]:pointer-events-none',
        props.class,
      )
    "
  >
    <slot />
  </span>
</template>
