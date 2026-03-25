<script setup lang="ts">
import { cn } from "@/lib/utils"
import { CollapsibleRoot, CollapsibleContent } from "radix-vue"
import { useStackTrace } from "./stack-trace-utils"

defineOptions({ name: "StackTraceContent" })

const props = withDefaults(
  defineProps<{
    class?: string
    maxHeight?: number
  }>(),
  {
    maxHeight: 400,
  },
)

const { isOpen } = useStackTrace()
</script>

<template>
  <CollapsibleRoot :open="isOpen">
    <CollapsibleContent
      :class="cn(
        'overflow-auto border-t bg-muted/30',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=open]:animate-in',
        props.class
      )"
      :style="{ maxHeight: `${props.maxHeight}px` }"
    >
      <slot />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
