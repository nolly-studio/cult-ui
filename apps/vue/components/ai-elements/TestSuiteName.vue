<script setup lang="ts">
import { inject, type InjectionKey } from "vue"
import {
  CheckCircle2Icon,
  ChevronRightIcon,
  CircleDotIcon,
  CircleIcon,
  XCircleIcon,
} from "lucide-vue-next"
import { cn } from "@/lib/utils"
import { CollapsibleTrigger } from "@/components/ui/collapsible"

defineOptions({ name: "TestSuiteName" })

type TestStatus = "passed" | "failed" | "skipped" | "running"

const props = defineProps<{
  class?: string
}>()

const testSuiteKey = Symbol.for("testSuite") as InjectionKey<{
  name: string
  status: TestStatus
}>

const context = inject(testSuiteKey, { name: "", status: "passed" as TestStatus })

const statusStyles: Record<TestStatus, string> = {
  failed: "text-red-600 dark:text-red-400",
  passed: "text-green-600 dark:text-green-400",
  running: "text-blue-600 dark:text-blue-400",
  skipped: "text-yellow-600 dark:text-yellow-400",
}
</script>

<template>
  <CollapsibleTrigger
    :class="cn(
      'group flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/50',
      props.class
    )"
  >
    <ChevronRightIcon class="size-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-90" />
    <span :class="cn('shrink-0', statusStyles[context.status])">
      <CheckCircle2Icon v-if="context.status === 'passed'" class="size-4" />
      <XCircleIcon v-else-if="context.status === 'failed'" class="size-4" />
      <CircleDotIcon v-else-if="context.status === 'running'" class="size-4 animate-pulse" />
      <CircleIcon v-else class="size-4" />
    </span>
    <span class="font-medium text-sm">
      <slot>{{ context.name }}</slot>
    </span>
  </CollapsibleTrigger>
</template>
