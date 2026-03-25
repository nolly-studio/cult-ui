<script setup lang="ts">
import { cn } from "@/lib/utils"
import { CollapsibleRoot, CollapsibleTrigger } from "radix-vue"
import { useStackTrace } from "./stack-trace-utils"

defineOptions({ name: "StackTraceHeader" })

const props = defineProps<{
  class?: string
}>()

const { isOpen, setIsOpen } = useStackTrace()
</script>

<template>
  <CollapsibleRoot :open="isOpen" @update:open="setIsOpen">
    <CollapsibleTrigger as-child>
      <div
        :class="cn(
          'flex w-full cursor-pointer items-center gap-3 p-3 text-left transition-colors hover:bg-muted/50',
          props.class
        )"
      >
        <slot />
      </div>
    </CollapsibleTrigger>
  </CollapsibleRoot>
</template>
