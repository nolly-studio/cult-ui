<script setup lang="ts">
import { DropdownMenuRadioGroup } from "radix-vue"

defineOptions({ name: "DropdownMenuRadioGroup" })

const props = defineProps<{ modelValue?: string }>()
const emit = defineEmits<{ "update:modelValue": [value: string] }>()
</script>

<template>
  <DropdownMenuRadioGroup
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </DropdownMenuRadioGroup>
</template>
