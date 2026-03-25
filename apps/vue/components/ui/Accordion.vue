<script setup lang="ts">
import { AccordionRoot } from "radix-vue"

defineOptions({ name: "Accordion" })

const props = defineProps<{
  class?: string
  type?: "single" | "multiple"
  collapsible?: boolean
  defaultValue?: string | string[]
  modelValue?: string | string[]
}>()
</script>

<template>
  <AccordionRoot
    :class="props.class"
    :type="type ?? 'single'"
    :collapsible="collapsible"
    :default-value="defaultValue"
    :model-value="modelValue"
  >
    <slot />
  </AccordionRoot>
</template>
