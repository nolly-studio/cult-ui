<script setup lang="ts">
import { AccordionContent } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "AccordionContent" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <AccordionContent
    class="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
  >
    <div :class="cn('pb-4 pt-0', props.class)">
      <slot />
    </div>
  </AccordionContent>
</template>
