<script setup lang="ts">
import { computed, inject, type InjectionKey } from "vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "TestResultsProgress" })

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

const passedPercent = computed(() =>
  context.summary ? (context.summary.passed / context.summary.total) * 100 : 0
)
const failedPercent = computed(() =>
  context.summary ? (context.summary.failed / context.summary.total) * 100 : 0
)
</script>

<template>
  <div v-if="context.summary" :class="cn('space-y-2', props.class)">
    <slot>
      <div class="flex h-2 overflow-hidden rounded-full bg-muted">
        <div
          class="bg-green-500 transition-all"
          :style="{ width: `${passedPercent}%` }"
        />
        <div
          class="bg-red-500 transition-all"
          :style="{ width: `${failedPercent}%` }"
        />
      </div>
      <div class="flex justify-between text-muted-foreground text-xs">
        <span>{{ context.summary.passed }}/{{ context.summary.total }} tests passed</span>
        <span>{{ passedPercent.toFixed(0) }}%</span>
      </div>
    </slot>
  </div>
</template>
