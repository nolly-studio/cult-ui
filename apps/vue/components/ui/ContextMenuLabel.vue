<script setup lang="ts">
import { ContextMenuLabel } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "ContextMenuLabel" })

const props = withDefaults(
  defineProps<{
    class?: string
    inset?: boolean
  }>(),
  { inset: false }
)
</script>

<template>
  <ContextMenuLabel
    :class="
      cn(
        'px-2 py-1.5 text-sm font-semibold text-foreground',
        inset && 'pl-8',
        props.class
      )
    "
  >
    <slot />
  </ContextMenuLabel>
</template>
