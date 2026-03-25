<script setup lang="ts">
import { inject } from "vue"
import { cn } from "@/lib/utils"
import { CHAIN_OF_THOUGHT_KEY } from "./ChainOfThought.vue"

defineOptions({ name: "ChainOfThoughtContent" })

const props = defineProps<{
  class?: string
}>()

const ctx = inject(CHAIN_OF_THOUGHT_KEY)!
</script>

<template>
  <div
    v-show="ctx.isOpen.value"
    :class="cn('mt-2 space-y-3', props.class)"
  >
    <slot />
  </div>
</template>
