<script setup lang="ts">
import { computed, provide, inject, type InjectionKey } from "vue"
import {
  CheckCircle2Icon,
  ChevronRightIcon,
  CircleDotIcon,
  CircleIcon,
  XCircleIcon,
} from "lucide-vue-next"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

defineOptions({ name: "TestResults" })

type TestStatus = "passed" | "failed" | "skipped" | "running"

interface TestResultsSummaryData {
  passed: number
  failed: number
  skipped: number
  total: number
  duration?: number
}

const props = defineProps<{
  summary?: TestResultsSummaryData
  class?: string
}>()

const testResultsKey = Symbol("testResults") as InjectionKey<{
  summary?: TestResultsSummaryData
}>

provide(testResultsKey, {
  summary: props.summary,
})

const formatDuration = (ms: number) => {
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(2)}s`
}

const passedPercent = computed(() =>
  props.summary ? (props.summary.passed / props.summary.total) * 100 : 0
)
const failedPercent = computed(() =>
  props.summary ? (props.summary.failed / props.summary.total) * 100 : 0
)
</script>

<template>
  <div :class="cn('rounded-lg border bg-background', props.class)">
    <slot>
      <template v-if="summary">
        <!-- Default header -->
        <div class="flex items-center justify-between border-b px-4 py-3">
          <div class="flex items-center gap-3">
            <Badge
              class="gap-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              variant="secondary"
            >
              <CheckCircle2Icon class="size-3" />
              {{ summary.passed }} passed
            </Badge>
            <Badge
              v-if="summary.failed > 0"
              class="gap-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              variant="secondary"
            >
              <XCircleIcon class="size-3" />
              {{ summary.failed }} failed
            </Badge>
            <Badge
              v-if="summary.skipped > 0"
              class="gap-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
              variant="secondary"
            >
              <CircleIcon class="size-3" />
              {{ summary.skipped }} skipped
            </Badge>
          </div>
          <span v-if="summary.duration" class="text-muted-foreground text-sm">
            {{ formatDuration(summary.duration) }}
          </span>
        </div>
      </template>
    </slot>
  </div>
</template>
