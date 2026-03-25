<script setup lang="ts">
import { MenubarRadioGroup } from "radix-vue"

defineOptions({ name: "MenubarRadioGroup" })

const props = defineProps<{ modelValue?: string }>()

const emit = defineEmits<{
  "update:modelValue": [value: string]
}>()
</script>

<template>
  <MenubarRadioGroup
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </MenubarRadioGroup>
</template>
