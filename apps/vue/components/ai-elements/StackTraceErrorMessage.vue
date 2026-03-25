<script setup lang="ts">
import { cn } from "@/lib/utils"
import { useStackTrace } from "./stack-trace-utils"

defineOptions({ name: "StackTraceErrorMessage" })

const props = defineProps<{
  class?: string
}>()

const { trace } = useStackTrace()
</script>

<template>
  <span :class="cn('truncate text-foreground', props.class)">
    <slot>{{ trace.errorMessage }}</slot>
  </span>
</template>
