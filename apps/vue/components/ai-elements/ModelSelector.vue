<script setup lang="ts">
import { ref, provide, type InjectionKey } from "vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "ModelSelector" })

export const MODEL_SELECTOR_KEY = Symbol("model-selector") as InjectionKey<{
  open: Ref<boolean>
  onOpenChange: (open: boolean) => void
}>

const props = defineProps<{
  class?: string
  modelValue?: boolean
}>()

const emit = defineEmits<{
  "update:modelValue": [value: boolean]
}>()

const open = ref(props.modelValue ?? false)

function onOpenChange(value: boolean) {
  open.value = value
  emit("update:modelValue", value)
}

provide(MODEL_SELECTOR_KEY, { open, onOpenChange })
</script>

<template>
  <div :class="props.class">
    <slot :open="open" />
  </div>
</template>
