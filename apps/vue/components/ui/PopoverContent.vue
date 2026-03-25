<script setup lang="ts">
import { PopoverContent, PopoverPortal } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "PopoverContent" })

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
  <PopoverPortal>
    <PopoverContent
      :align="align"
      :side-offset="sideOffset"
      :side="side"
      :class="
        cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 flex flex-col gap-2.5 rounded-lg p-2.5 text-sm shadow-md ring-1 duration-100 z-50 w-72 outline-hidden',
          props.class
        )
      "
      v-bind="$attrs"
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
