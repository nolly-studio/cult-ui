<script setup lang="ts">
import { HoverCardContent } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "HoverCardContent" })

const props = withDefaults(
  defineProps<{
    class?: string
    align?: "start" | "center" | "end"
    sideOffset?: number
    side?: "top" | "right" | "bottom" | "left"
  }>(),
  { align: "center", sideOffset: 4 }
)
</script>

<template>
  <HoverCardContent
    :align="align"
    :side-offset="sideOffset"
    :side="side"
    :class="
      cn(
        'z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        props.class
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </HoverCardContent>
</template>
