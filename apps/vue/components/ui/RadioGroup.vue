<script setup lang="ts">
import { RadioGroupRoot } from "radix-vue"
import { cn } from "~/lib/utils"

const props = defineProps<{
  class?: string
  modelValue?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  "update:modelValue": [value: string]
}>()
</script>

<template>
  <RadioGroupRoot
    :model-value="modelValue"
    :disabled="disabled"
    :class="cn('grid gap-2', props.class)"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </RadioGroupRoot>
</template>
