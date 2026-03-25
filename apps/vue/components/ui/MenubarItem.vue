<script setup lang="ts">
import { MenubarItem } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "MenubarItem" })

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
  <MenubarItem
    :disabled="disabled"
    :class="
      cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        props.class
      )
    "
  >
    <slot />
  </MenubarItem>
</template>
