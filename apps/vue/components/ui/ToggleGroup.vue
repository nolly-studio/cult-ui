<script setup lang="ts">
import { ToggleGroupRoot } from "radix-vue"
import { provide } from "vue"
import { cn } from "@/lib/utils"
import type { ToggleVariants } from "./Toggle.vue"

defineOptions({ name: "ToggleGroup" })

const props = withDefaults(
  defineProps<{
    class?: string
    type?: "single" | "multiple"
    variant?: NonNullable<ToggleVariants["variant"]>
    size?: NonNullable<ToggleVariants["size"]>
    modelValue?: string | string[]
    defaultValue?: string | string[]
    disabled?: boolean
  }>(),
  {
    type: "single",
    variant: "default",
    size: "default",
  }
)

const emit = defineEmits<{
  "update:modelValue": [value: string | string[]]
}>()

provide("toggleGroupContext", {
  variant: props.variant,
  size: props.size,
})
</script>

<template>
  <ToggleGroupRoot
    :type="type!"
    :model-value="modelValue"
    :default-value="defaultValue"
    :disabled="disabled"
    :class="cn('flex items-center justify-center gap-1', props.class)"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </ToggleGroupRoot>
</template>
