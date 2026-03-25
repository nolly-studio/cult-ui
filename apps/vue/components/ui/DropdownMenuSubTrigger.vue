<script setup lang="ts">
import { DropdownMenuSubTrigger } from "radix-vue"
import { ChevronRight } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "DropdownMenuSubTrigger" })

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
  <DropdownMenuSubTrigger
    :disabled="disabled"
    :class="
      cn(
        'flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        inset && 'pl-8',
        props.class
      )
    "
  >
    <slot />
    <ChevronRight class="ml-auto" />
  </DropdownMenuSubTrigger>
</template>
