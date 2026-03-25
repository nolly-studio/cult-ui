<script lang="ts">
import type { InjectionKey } from "vue"

export interface PlanContextValue {
  isStreaming: boolean
}

export const planKey: InjectionKey<PlanContextValue> = Symbol("plan")

export function usePlan() {
  const context = inject(planKey)
  if (!context) {
    throw new Error("Plan components must be used within Plan")
  }
  return context
}
</script>

<script setup lang="ts">
import { provide, inject, reactive } from "vue"
import { cn } from "@/lib/utils"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronsUpDownIcon } from "lucide-vue-next"

defineOptions({ name: "Plan" })

const props = withDefaults(
  defineProps<{
    isStreaming?: boolean
    class?: string
  }>(),
  {
    isStreaming: false,
  }
)

provide(planKey, reactive({ isStreaming: props.isStreaming }))
</script>

<template>
  <Collapsible as-child data-slot="plan">
    <Card :class="cn('shadow-none', props.class)">
      <slot />
    </Card>
  </Collapsible>
</template>
