<script setup lang="ts">
import { inject, type InjectionKey } from "vue"
import { CheckCircle2Icon, CircleIcon, XCircleIcon } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

defineOptions({ name: "TestResultsSummary" })

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
</script>

<template>
  <div v-if="context.summary" :class="cn('flex items-center gap-3', props.class)">
    <slot>
      <Badge
        class="gap-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
        variant="secondary"
      >
        <CheckCircle2Icon class="size-3" />
        {{ context.summary.passed }} passed
      </Badge>
      <Badge
        v-if="context.summary.failed > 0"
        class="gap-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
        variant="secondary"
      >
        <XCircleIcon class="size-3" />
        {{ context.summary.failed }} failed
      </Badge>
      <Badge
        v-if="context.summary.skipped > 0"
        class="gap-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
        variant="secondary"
      >
        <CircleIcon class="size-3" />
        {{ context.summary.skipped }} skipped
      </Badge>
    </slot>
  </div>
</template>
