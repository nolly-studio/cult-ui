<script setup lang="ts">
import { AlertDialogRoot } from "radix-vue"

defineOptions({ name: "AlertDialog" })

defineProps<{
  open?: boolean
  defaultOpen?: boolean
}>()

const emit = defineEmits<{
  "update:open": [value: boolean]
}>()
</script>

<template>
  <AlertDialogRoot
    :open="open"
    :default-open="defaultOpen"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </AlertDialogRoot>
</template>
