<script setup lang="ts">
import { DropdownMenuItem } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "DropdownMenuItem" })

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
  <DropdownMenuItem
    :disabled="disabled"
    :class="
      cn(
        'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0',
        inset && 'pl-8',
        props.class
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </DropdownMenuItem>
</template>
