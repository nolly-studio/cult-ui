<script setup lang="ts">
import { DialogRoot } from "radix-vue"
import UiDialogContent from "./DialogContent.vue"

defineOptions({ name: "CommandDialog" })

const props = withDefaults(
  defineProps<{
    open?: boolean
  }>(),
  { open: false }
)

const emit = defineEmits<{
  "update:open": [value: boolean]
}>()
</script>

<template>
  <DialogRoot :open="open" @update:open="emit('update:open', $event)">
    <UiDialogContent class="overflow-hidden p-0" :show-close-button="false">
      <slot />
    </UiDialogContent>
  </DialogRoot>
</template>
