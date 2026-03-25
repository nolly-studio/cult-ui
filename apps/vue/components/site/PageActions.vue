<script setup lang="ts">
import { cn } from "~/lib/utils"

defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="
      cn(
        'flex w-full items-center justify-center space-x-4 py-4 md:pb-2',
        $props.class,
      )
    "
  >
    <slot />
  </div>
</template>
