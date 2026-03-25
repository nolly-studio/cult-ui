<script setup lang="ts">
import { ContextMenuRadioGroup } from "radix-vue"

defineOptions({ name: "ContextMenuRadioGroup" })

const props = defineProps<{ modelValue?: string }>()
const emit = defineEmits<{ "update:modelValue": [value: string] }>()
</script>

<template>
  <ContextMenuRadioGroup
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </ContextMenuRadioGroup>
</template>
