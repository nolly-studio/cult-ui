<script setup lang="ts">
import { AccordionItem } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "AccordionItem" })

const props = defineProps<{
  class?: string
  value: string
  disabled?: boolean
}>()
</script>

<template>
  <AccordionItem
    :value="value"
    :disabled="disabled"
    :class="cn('border-b', props.class)"
  >
    <slot />
  </AccordionItem>
</template>
