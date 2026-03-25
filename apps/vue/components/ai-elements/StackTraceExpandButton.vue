<script setup lang="ts">
import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-vue-next"
import { useStackTrace } from "./stack-trace-utils"

defineOptions({ name: "StackTraceExpandButton" })

const props = defineProps<{
  class?: string
}>()

const { isOpen } = useStackTrace()
</script>

<template>
  <div
    :class="cn('flex size-7 items-center justify-center', props.class)"
  >
    <ChevronDownIcon
      :class="cn(
        'size-4 text-muted-foreground transition-transform',
        isOpen ? 'rotate-180' : 'rotate-0'
      )"
    />
  </div>
</template>
