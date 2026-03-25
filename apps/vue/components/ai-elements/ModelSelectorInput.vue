<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "ModelSelectorInput" })

const props = defineProps<{
  class?: string
  modelValue?: string
  placeholder?: string
}>()

const emit = defineEmits<{
  "update:modelValue": [value: string]
}>()
</script>

<template>
  <input
    type="text"
    :class="cn('w-full border-b bg-transparent px-3 py-3.5 text-sm outline-none placeholder:text-muted-foreground', props.class)"
    :value="props.modelValue"
    :placeholder="props.placeholder"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
