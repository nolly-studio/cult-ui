<script setup lang="ts">
import { HoverCardRoot } from "radix-vue"

defineOptions({ name: "HoverCard" })

defineProps<{
  open?: boolean
  defaultOpen?: boolean
  openDelay?: number
  closeDelay?: number
}>()

const emit = defineEmits<{
  "update:open": [value: boolean]
}>()
</script>

<template>
  <HoverCardRoot
    :open="open"
    :default-open="defaultOpen"
    :open-delay="openDelay"
    :close-delay="closeDelay"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </HoverCardRoot>
</template>
