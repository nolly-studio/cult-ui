<script setup lang="ts">
import { AccordionHeader, AccordionTrigger } from "radix-vue"
import { ChevronDown } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "AccordionTrigger" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      :class="
        cn(
          'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180',
          props.class
        )
      "
    >
      <slot />
      <ChevronDown
        class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
      />
    </AccordionTrigger>
  </AccordionHeader>
</template>
