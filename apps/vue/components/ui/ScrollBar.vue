<script setup lang="ts">
import {
  ScrollAreaScrollbar,
  ScrollAreaThumb,
} from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "ScrollBar" })

const props = withDefaults(
  defineProps<{
    class?: string
    orientation?: "vertical" | "horizontal"
  }>(),
  { orientation: "vertical" }
)
</script>

<template>
  <ScrollAreaScrollbar
    :orientation="orientation"
    :class="
      cn(
        'flex touch-none select-none transition-colors',
        orientation === 'vertical' &&
          'h-full w-2.5 border-l border-l-transparent p-[1px]',
        orientation === 'horizontal' &&
          'h-2.5 flex-col border-t border-t-transparent p-[1px]',
        props.class
      )
    "
  >
    <ScrollAreaThumb class="relative flex-1 rounded-full bg-border" />
  </ScrollAreaScrollbar>
</template>
