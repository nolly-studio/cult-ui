<script setup lang="ts">
import { inject } from "vue"
import { cn } from "@/lib/utils"
import { reasoningKey } from "./Reasoning.vue"

defineOptions({ name: "ReasoningContent" })

const props = defineProps<{
  class?: string
  content: string
}>()

const context = inject(reasoningKey)
if (!context) {
  throw new Error("ReasoningContent must be used within Reasoning")
}

const { isOpen } = context
</script>

<template>
  <div
    v-if="isOpen"
    :class="cn(
      'mt-4 text-sm',
      'text-muted-foreground',
      props.class
    )"
  >
    <div class="whitespace-pre-wrap">{{ props.content }}</div>
  </div>
</template>
