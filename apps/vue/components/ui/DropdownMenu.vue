<script setup lang="ts">
import { DropdownMenuRoot } from "radix-vue"

defineOptions({ name: "DropdownMenu" })

defineProps<{
  defaultOpen?: boolean
  open?: boolean
  dir?: "ltr" | "rtl"
  modal?: boolean
}>()

const emit = defineEmits<{
  "update:open": [value: boolean]
}>()
</script>

<template>
  <DropdownMenuRoot
    :default-open="defaultOpen"
    :open="open"
    :dir="dir"
    :modal="modal"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </DropdownMenuRoot>
</template>
