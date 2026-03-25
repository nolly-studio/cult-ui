<script setup lang="ts">
import { cn } from "~/lib/utils"

defineProps<{
  class?: string
}>()
</script>

<template>
  <h1
    :class="
      cn(
        'text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]',
        $props.class,
      )
    "
  >
    <slot />
  </h1>
</template>
