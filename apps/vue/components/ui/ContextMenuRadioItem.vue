<script setup lang="ts">
import {
  ContextMenuItemIndicator,
  ContextMenuRadioItem,
} from "radix-vue"
import { Circle } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "ContextMenuRadioItem" })

const props = defineProps<{
  class?: string
  value: string
  disabled?: boolean
}>()
</script>

<template>
  <ContextMenuRadioItem
    :value="value"
    :disabled="disabled"
    :class="
      cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class
      )
    "
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuItemIndicator>
        <Circle class="h-4 w-4 fill-current" />
      </ContextMenuItemIndicator>
    </span>
    <slot />
  </ContextMenuRadioItem>
</template>
