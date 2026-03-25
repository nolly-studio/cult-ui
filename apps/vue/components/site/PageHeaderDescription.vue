<script setup lang="ts">
import { cn } from "~/lib/utils"

defineProps<{
  class?: string
}>()
</script>

<template>
  <p
    :class="
      cn(
        'max-w-[750px] text-center text-lg font-light text-foreground',
        $props.class,
      )
    "
  >
    <slot />
  </p>
</template>
