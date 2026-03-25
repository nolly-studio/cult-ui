<script setup lang="ts">
import { cn } from "@/lib/utils"
import { TabsRoot } from "radix-vue"

defineOptions({ name: "SandboxTabs" })

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
    :class="cn('w-full gap-0', props.class)"
    :default-value="props.defaultValue"
    :model-value="props.modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </TabsRoot>
</template>
