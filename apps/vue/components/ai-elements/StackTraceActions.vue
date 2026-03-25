<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "StackTraceActions" })

const props = defineProps<{
  class?: string
}>()

function handleClick(e: MouseEvent) {
  e.stopPropagation()
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === "Enter" || e.key === " ") {
    e.stopPropagation()
  }
}
</script>

<template>
  <div
    :class="cn('flex shrink-0 items-center gap-1', props.class)"
    role="group"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <slot />
  </div>
</template>
