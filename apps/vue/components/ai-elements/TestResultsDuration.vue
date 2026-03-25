<script setup lang="ts">
import { inject, type InjectionKey } from "vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "TestResultsDuration" })

const props = defineProps<{
  class?: string
}>()

interface TestResultsSummaryData {
  passed: number
  failed: number
  skipped: number
  total: number
  duration?: number
}

const testResultsKey = Symbol.for("testResults") as InjectionKey<{
  summary?: TestResultsSummaryData
}>

const context = inject(testResultsKey, { summary: undefined })

const formatDuration = (ms: number) => {
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(2)}s`
}
</script>

<template>
  <span
    v-if="context.summary?.duration"
    :class="cn('text-muted-foreground text-sm', props.class)"
  >
    <slot>{{ formatDuration(context.summary.duration) }}</slot>
  </span>
</template>
