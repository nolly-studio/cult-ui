<script setup lang="ts">
import { ContextMenuContent, ContextMenuPortal } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "ContextMenuContent" })

const props = defineProps<{
  class?: string
  alignOffset?: number
}>()
</script>

<template>
  <ContextMenuPortal>
    <ContextMenuContent
      :align-offset="alignOffset"
      :class="
        cn(
          'z-50 max-h-[var(--radix-context-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          props.class
        )
      "
      v-bind="$attrs"
    >
      <slot />
    </ContextMenuContent>
  </ContextMenuPortal>
</template>
