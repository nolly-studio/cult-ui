<script setup lang="ts">
import { TooltipRoot } from "radix-vue"

defineOptions({ name: "Tooltip" })

defineProps<{
  open?: boolean
  defaultOpen?: boolean
  delayDuration?: number
}>()

const emit = defineEmits<{
  "update:open": [value: boolean]
}>()
</script>

<template>
  <TooltipRoot
    :open="open"
    :default-open="defaultOpen"
    :delay-duration="delayDuration"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </TooltipRoot>
</template>
