<script setup lang="ts">
import { DropdownMenuSub } from "radix-vue"

defineOptions({ name: "DropdownMenuSub" })

defineProps<{ open?: boolean; defaultOpen?: boolean }>()
const emit = defineEmits<{ "update:open": [value: boolean] }>()
</script>

<template>
  <DropdownMenuSub
    :open="open"
    :default-open="defaultOpen"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </DropdownMenuSub>
</template>
