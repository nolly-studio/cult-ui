<script setup lang="ts">
import { TooltipContent, TooltipPortal } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "TooltipContent" })

const props = withDefaults(
  defineProps<{
    class?: string
    sideOffset?: number
    side?: "top" | "right" | "bottom" | "left"
  }>(),
  { sideOffset: 4 }
)
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      :side-offset="sideOffset"
      :side="side"
      :class="
        cn(
          'z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          props.class
        )
      "
      v-bind="$attrs"
    >
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>
