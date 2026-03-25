<script setup lang="ts">
import { MenubarLabel } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "MenubarLabel" })

const props = withDefaults(
  defineProps<{
    class?: string
    inset?: boolean
  }>(),
  { inset: false }
)
</script>

<template>
  <MenubarLabel
    :class="
      cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', props.class)
    "
  >
    <slot />
  </MenubarLabel>
</template>
