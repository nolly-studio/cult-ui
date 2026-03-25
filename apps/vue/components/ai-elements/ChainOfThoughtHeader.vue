<script setup lang="ts">
import { inject } from "vue"
import { Brain, ChevronDown } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import { CHAIN_OF_THOUGHT_KEY } from "./ChainOfThought.vue"

defineOptions({ name: "ChainOfThoughtHeader" })

const props = defineProps<{
  class?: string
}>()

const ctx = inject(CHAIN_OF_THOUGHT_KEY)!
</script>

<template>
  <button
    type="button"
    :class="cn(
      'flex w-full items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground',
      props.class
    )"
    @click="ctx.toggle()"
  >
    <Brain class="size-4" />
    <span class="flex-1 text-left">
      <slot>Chain of Thought</slot>
    </span>
    <ChevronDown
      :class="cn('size-4 transition-transform', ctx.isOpen.value ? 'rotate-180' : 'rotate-0')"
    />
  </button>
</template>
