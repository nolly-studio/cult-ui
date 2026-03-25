<script setup lang="ts">
import { provide, type InjectionKey } from "vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "Confirmation" })

export type ToolUIPartState =
  | "input-streaming"
  | "input-available"
  | "approval-requested"
  | "approval-responded"
  | "output-denied"
  | "output-available"

export interface ToolUIPartApproval {
  id: string
  approved?: boolean
  reason?: string
}

export const CONFIRMATION_KEY = Symbol("confirmation") as InjectionKey<{
  approval: ToolUIPartApproval | undefined
  state: ToolUIPartState
}>

const props = defineProps<{
  class?: string
  approval?: ToolUIPartApproval
  state: ToolUIPartState
}>()

const shouldRender = computed(
  () => props.approval && props.state !== "input-streaming" && props.state !== "input-available"
)

provide(CONFIRMATION_KEY, {
  approval: props.approval,
  state: props.state,
})
</script>

<template>
  <div
    v-if="shouldRender"
    :class="cn('flex flex-col gap-2 rounded-lg border p-4', props.class)"
    role="alert"
  >
    <slot />
  </div>
</template>
