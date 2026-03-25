<script setup lang="ts">
import { ComboboxRoot } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "Command" })

const props = defineProps<{
  class?: string
  modelValue?: string
}>()

function onModelValueUpdate(value: string | string[]) {
  if (typeof value === "string") {
    emit("update:modelValue", value)
  }
}

const emit = defineEmits<{
  "update:modelValue": [value: string]
}>()
</script>

<template>
  <ComboboxRoot
    :model-value="modelValue"
    :class="
      cn(
        'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
        props.class
      )
    "
    @update:model-value="onModelValueUpdate"
  >
    <slot />
  </ComboboxRoot>
</template>
