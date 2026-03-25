<script setup lang="ts">
import { ContextMenuSubTrigger } from "radix-vue"
import { ChevronRight } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "ContextMenuSubTrigger" })

const props = withDefaults(
  defineProps<{
    class?: string
    inset?: boolean
    disabled?: boolean
  }>(),
  { inset: false }
)
</script>

<template>
  <ContextMenuSubTrigger
    :disabled="disabled"
    :class="
      cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        inset && 'pl-8',
        props.class
      )
    "
  >
    <slot />
    <ChevronRight class="ml-auto h-4 w-4" />
  </ContextMenuSubTrigger>
</template>
