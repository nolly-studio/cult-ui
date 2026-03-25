<script setup lang="ts">
import { cn } from "~/lib/utils"

const props = defineProps<{
  class?: string
  containerClass?: string
  maxLength: number
  modelValue?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  "update:modelValue": [value: string]
  complete: [value: string]
}>()
</script>

<template>
  <div
    :class="
      cn(
        'flex items-center gap-2 has-[:disabled]:opacity-50',
        containerClass,
      )
    "
  >
    <input
      :value="modelValue"
      :maxlength="maxLength"
      :disabled="disabled"
      :class="cn('disabled:cursor-not-allowed', props.class)"
      inputmode="numeric"
      pattern="[0-9]*"
      @input="
        (e) => {
          const val = (e.target instanceof HTMLInputElement) ? e.target.value : ''
          emit('update:modelValue', val)
          if (val.length === maxLength) emit('complete', val)
        }
      "
    />
  </div>
</template>
