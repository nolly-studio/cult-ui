<script setup lang="ts">
import {
  ContextMenuCheckboxItem,
  ContextMenuItemIndicator,
} from "radix-vue"
import { Check } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "ContextMenuCheckboxItem" })

const props = defineProps<{
  class?: string
  checked?: boolean | "indeterminate"
  disabled?: boolean
}>()

const emit = defineEmits<{
  "update:checked": [value: boolean]
}>()
</script>

<template>
  <ContextMenuCheckboxItem
    :checked="checked"
    :disabled="disabled"
    :class="
      cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class
      )
    "
    @update:checked="emit('update:checked', $event)"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuItemIndicator>
        <Check class="h-4 w-4" />
      </ContextMenuItemIndicator>
    </span>
    <slot />
  </ContextMenuCheckboxItem>
</template>
