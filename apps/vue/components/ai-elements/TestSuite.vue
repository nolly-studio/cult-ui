<script setup lang="ts">
import { provide, type InjectionKey } from "vue"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

defineOptions({ name: "TestSuite" })

type TestStatus = "passed" | "failed" | "skipped" | "running"

const props = defineProps<{
  name: string
  status: TestStatus
  class?: string
}>()

const testSuiteKey = Symbol("testSuite") as InjectionKey<{
  name: string
  status: TestStatus
}>

provide(testSuiteKey, {
  name: props.name,
  status: props.status,
})
</script>

<template>
  <Collapsible :class="cn('rounded-lg border', props.class)">
    <slot />
  </Collapsible>
</template>
