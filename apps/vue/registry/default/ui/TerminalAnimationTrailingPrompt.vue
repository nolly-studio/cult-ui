<script setup lang="ts">
import { computed } from 'vue'
import { useTerminalAnimation } from './TerminalAnimation.vue'

defineProps<{
  class?: string
}>()

const { isTypingCommand, showCursor, visibleLines, currentTab } =
  useTerminalAnimation()

const show = computed(
  () =>
    !isTypingCommand.value &&
    showCursor.value &&
    visibleLines.value >= currentTab.value.lines.length
)
</script>

<template>
  <div
    v-if="show"
    :class="$props.class"
    data-slot="terminal-animation-trailing-prompt"
  >
    <slot />
  </div>
</template>
