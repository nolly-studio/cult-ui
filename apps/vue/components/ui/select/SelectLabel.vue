<script setup lang="ts">
import { SelectLabel } from "radix-vue"
import { cn } from "~/lib/utils"

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <SelectLabel :class="cn('px-2 py-1.5 text-sm font-semibold', props.class)">
    <slot />
  </SelectLabel>
</template>
