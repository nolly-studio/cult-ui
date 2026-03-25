<script setup lang="ts">
import { ContextMenuSub } from "radix-vue"

defineOptions({ name: "ContextMenuSub" })

defineProps<{ open?: boolean; defaultOpen?: boolean }>()
const emit = defineEmits<{ "update:open": [value: boolean] }>()
</script>

<template>
  <ContextMenuSub
    :open="open"
    :default-open="defaultOpen"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </ContextMenuSub>
</template>
