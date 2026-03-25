<script setup lang="ts">
import { DialogRoot } from "radix-vue"

defineOptions({ name: "Sheet" })

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
  <DialogRoot
    :open="open"
    :default-open="defaultOpen"
    :modal="modal"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </DialogRoot>
</template>
