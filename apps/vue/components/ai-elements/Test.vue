<script setup lang="ts">
import { provide, type InjectionKey } from "vue"
import {
  CheckCircle2Icon,
  CircleDotIcon,
  CircleIcon,
  XCircleIcon,
} from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "Test" })

type TestStatus = "passed" | "failed" | "skipped" | "running"

const props = defineProps<{
  name: string
  status: TestStatus
  duration?: number
  class?: string
}>()

const testKey = Symbol("test") as InjectionKey<{
  name: string
  status: TestStatus
  duration?: number
}>

provide(testKey, {
  name: props.name,
  status: props.status,
  duration: props.duration,
})

const statusStyles: Record<TestStatus, string> = {
  failed: "text-red-600 dark:text-red-400",
  passed: "text-green-600 dark:text-green-400",
  running: "text-blue-600 dark:text-blue-400",
  skipped: "text-yellow-600 dark:text-yellow-400",
}
</script>

<template>
  <div :class="cn('flex items-center gap-2 px-4 py-2 text-sm', props.class)">
    <slot>
      <span :class="cn('shrink-0', statusStyles[status])">
        <CheckCircle2Icon v-if="status === 'passed'" class="size-4" />
        <XCircleIcon v-else-if="status === 'failed'" class="size-4" />
        <CircleDotIcon v-else-if="status === 'running'" class="size-4 animate-pulse" />
        <CircleIcon v-else class="size-4" />
      </span>
      <span class="flex-1">{{ name }}</span>
      <span v-if="duration !== undefined" class="ml-auto text-muted-foreground text-xs">
        {{ duration }}ms
      </span>
    </slot>
  </div>
</template>
