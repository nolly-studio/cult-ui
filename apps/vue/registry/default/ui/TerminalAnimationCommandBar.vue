<script setup lang="ts">
import { useTerminalAnimation } from './TerminalAnimation.vue'

defineProps<{
  class?: string
}>()

const { commandTyped, isTypingCommand, showCursor } = useTerminalAnimation()
</script>

<template>
  <div :class="$props.class" data-slot="terminal-animation-command">
    {{ commandTyped }}
    <template v-if="isTypingCommand && showCursor">
      <slot name="cursor">
        <span aria-hidden="true">&#x258C;</span>
      </slot>
    </template>
  </div>
</template>
