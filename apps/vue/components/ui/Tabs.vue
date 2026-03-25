<script setup lang="ts">
import { TabsRoot } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "Tabs" })

const props = defineProps<{
  class?: string
  defaultValue?: string
  modelValue?: string
}>()

const emit = defineEmits<{
  "update:modelValue": [value: string]
}>()
</script>

<template>
  <TabsRoot
    :class="cn(props.class)"
    :default-value="defaultValue"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </TabsRoot>
</template>
