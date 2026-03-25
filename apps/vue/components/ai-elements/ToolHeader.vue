<script setup lang="ts">
import { computed } from "vue"
import {
  CheckCircleIcon,
  ChevronDownIcon,
  CircleIcon,
  ClockIcon,
  WrenchIcon,
  XCircleIcon,
} from "lucide-vue-next"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { CollapsibleTrigger } from "@/components/ui/collapsible"

defineOptions({ name: "ToolHeader" })

type ToolState =
  | "approval-requested"
  | "approval-responded"
  | "input-available"
  | "input-streaming"
  | "output-available"
  | "output-denied"
  | "output-error"

const props = defineProps<{
  title?: string
  type: string
  state: ToolState
  toolName?: string
  class?: string
}>()

const statusLabels: Record<ToolState, string> = {
  "approval-requested": "Awaiting Approval",
  "approval-responded": "Responded",
  "input-available": "Running",
  "input-streaming": "Pending",
  "output-available": "Completed",
  "output-denied": "Denied",
  "output-error": "Error",
}

const derivedName = computed(() =>
  props.type === "dynamic-tool"
    ? props.toolName
    : props.type.split("-").slice(1).join("-")
)
</script>

<template>
  <CollapsibleTrigger
    :class="cn('flex w-full items-center justify-between gap-4 p-3', props.class)"
  >
    <div class="flex items-center gap-2">
      <WrenchIcon class="size-4 text-muted-foreground" />
      <span class="font-medium text-sm">{{ title ?? derivedName }}</span>
      <Badge class="gap-1.5 rounded-full text-xs" variant="secondary">
        <ClockIcon v-if="state === 'approval-requested'" class="size-4 text-yellow-600" />
        <CheckCircleIcon v-else-if="state === 'approval-responded'" class="size-4 text-blue-600" />
        <ClockIcon v-else-if="state === 'input-available'" class="size-4 animate-pulse" />
        <CircleIcon v-else-if="state === 'input-streaming'" class="size-4" />
        <CheckCircleIcon v-else-if="state === 'output-available'" class="size-4 text-green-600" />
        <XCircleIcon v-else-if="state === 'output-denied'" class="size-4 text-orange-600" />
        <XCircleIcon v-else-if="state === 'output-error'" class="size-4 text-red-600" />
        {{ statusLabels[state] }}
      </Badge>
    </div>
    <ChevronDownIcon class="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
  </CollapsibleTrigger>
</template>
