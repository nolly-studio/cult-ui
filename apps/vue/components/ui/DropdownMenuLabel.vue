<script setup lang="ts">
import { DropdownMenuLabel } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "DropdownMenuLabel" })

const props = withDefaults(
  defineProps<{
    class?: string
    inset?: boolean
  }>(),
  { inset: false }
)
</script>

<template>
  <DropdownMenuLabel
    :class="
      cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', props.class)
    "
  >
    <slot />
  </DropdownMenuLabel>
</template>
