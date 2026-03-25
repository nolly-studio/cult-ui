<script setup lang="ts">
import { ContextMenuSubContent } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "ContextMenuSubContent" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <ContextMenuSubContent
    :class="
      cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        props.class
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </ContextMenuSubContent>
</template>
