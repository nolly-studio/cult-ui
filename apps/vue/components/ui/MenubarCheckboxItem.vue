<script setup lang="ts">
import { MenubarCheckboxItem, MenubarItemIndicator } from "radix-vue"
import { Check } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "MenubarCheckboxItem" })

const props = defineProps<{
  class?: string
  checked?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  "update:checked": [value: boolean]
}>()
</script>

<template>
  <MenubarCheckboxItem
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
      <MenubarItemIndicator>
        <Check class="h-4 w-4" />
      </MenubarItemIndicator>
    </span>
    <slot />
  </MenubarCheckboxItem>
</template>
