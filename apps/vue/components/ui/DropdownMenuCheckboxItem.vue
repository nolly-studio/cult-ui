<script setup lang="ts">
import {
  DropdownMenuCheckboxItem,
  DropdownMenuItemIndicator,
} from "radix-vue"
import { Check } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "DropdownMenuCheckboxItem" })

const props = defineProps<{
  class?: string
  checked?: boolean | "indeterminate"
  disabled?: boolean
}>()

const emit = defineEmits<{
  "update:checked": [value: boolean]
  select: [event: Event]
}>()
</script>

<template>
  <DropdownMenuCheckboxItem
    :checked="checked"
    :disabled="disabled"
    :class="
      cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class
      )
    "
    @update:checked="emit('update:checked', $event)"
    @select="emit('select', $event)"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuItemIndicator>
        <Check class="h-4 w-4" />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuCheckboxItem>
</template>
