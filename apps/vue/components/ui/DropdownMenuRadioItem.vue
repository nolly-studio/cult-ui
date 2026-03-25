<script setup lang="ts">
import {
  DropdownMenuItemIndicator,
  DropdownMenuRadioItem,
} from "radix-vue"
import { Circle } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "DropdownMenuRadioItem" })

const props = defineProps<{
  class?: string
  value: string
  disabled?: boolean
}>()
</script>

<template>
  <DropdownMenuRadioItem
    :value="value"
    :disabled="disabled"
    :class="
      cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class
      )
    "
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuItemIndicator>
        <Circle class="h-2 w-2 fill-current" />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuRadioItem>
</template>
