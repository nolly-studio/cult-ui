<script setup lang="ts">
import { inject, computed } from "vue"
import { cn } from "@/lib/utils"
import { BrainIcon, ChevronDownIcon } from "lucide-vue-next"
import { reasoningKey } from "./Reasoning.vue"
import Shimmer from "./Shimmer.vue"

defineOptions({ name: "ReasoningTrigger" })

const props = defineProps<{
  class?: string
}>()

const context = inject(reasoningKey)
if (!context) {
  throw new Error("ReasoningTrigger must be used within Reasoning")
}

const { isStreaming, isOpen, duration } = context

const toggle = () => {
  isOpen.value = !isOpen.value
}

const showShimmer = computed(
  () => isStreaming.value || duration.value === 0
)

const thinkingText = computed(() => {
  if (duration.value === undefined) return "Thought for a few seconds"
  return `Thought for ${duration.value} seconds`
})
</script>

<template>
  <button
    :class="cn(
      'flex w-full items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground',
      props.class
    )"
    type="button"
    @click="toggle"
  >
    <slot>
      <BrainIcon class="size-4" />
      <Shimmer v-if="showShimmer" :duration="1">Thinking...</Shimmer>
      <p v-else>{{ thinkingText }}</p>
      <ChevronDownIcon
        :class="cn(
          'size-4 transition-transform',
          isOpen ? 'rotate-180' : 'rotate-0'
        )"
      />
    </slot>
  </button>
</template>
