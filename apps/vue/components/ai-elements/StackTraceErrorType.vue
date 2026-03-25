<script setup lang="ts">
import { cn } from "@/lib/utils"
import { useStackTrace } from "./stack-trace-utils"

defineOptions({ name: "StackTraceErrorType" })

const props = defineProps<{
  class?: string
}>()

const { trace } = useStackTrace()
</script>

<template>
  <span
    :class="cn('shrink-0 font-semibold text-destructive', props.class)"
  >
    <slot>{{ trace.errorType }}</slot>
  </span>
</template>
