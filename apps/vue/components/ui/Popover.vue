<script setup lang="ts">
import { PopoverRoot } from "radix-vue"

defineOptions({ name: "Popover" })

defineProps<{
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
}>()

const emit = defineEmits<{
  "update:open": [value: boolean]
}>()
</script>

<template>
  <PopoverRoot
    :open="open"
    :default-open="defaultOpen"
    :modal="modal"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </PopoverRoot>
</template>
