<script setup lang="ts">
import { provide, computed, type InjectionKey } from "vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "Context" })

export interface ContextSchema {
  usedTokens: number
  maxTokens: number
  usage?: { inputTokens?: number; outputTokens?: number; reasoningTokens?: number; cachedInputTokens?: number }
  modelId?: string
}

export const CONTEXT_KEY = Symbol("context") as InjectionKey<ContextSchema>

const PERCENT_MAX = 100

const props = defineProps<ContextSchema & { class?: string }>()

provide(CONTEXT_KEY, {
  usedTokens: props.usedTokens,
  maxTokens: props.maxTokens,
  usage: props.usage,
  modelId: props.modelId,
})

const usedPercent = computed(() => props.usedTokens / props.maxTokens)
const renderedPercent = computed(() =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 1, style: "percent" }).format(usedPercent.value)
)
</script>

<template>
  <div :class="cn('inline-flex items-center gap-2', props.class)">
    <slot :used-percent="usedPercent" :rendered-percent="renderedPercent" />
  </div>
</template>
