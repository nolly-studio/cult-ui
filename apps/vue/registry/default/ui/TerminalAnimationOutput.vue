<script setup lang="ts">
import { useTerminalAnimation } from './TerminalAnimation.vue'
import type { TerminalLine } from './TerminalAnimation.vue'

defineProps<{
  class?: string
}>()

const { isTypingCommand, visibleLines, currentTab, activeTab } =
  useTerminalAnimation()
</script>

<template>
  <div
    v-if="!isTypingCommand"
    aria-atomic="false"
    aria-live="polite"
    :class="$props.class"
    data-slot="terminal-animation-output"
    role="log"
  >
    <div
      v-for="(line, i) in currentTab.lines"
      :key="`${activeTab}-${i}`"
    >
      <slot
        name="line"
        :line="line"
        :index="i"
        :visible="i < visibleLines"
      >
        <div
          v-if="i < visibleLines"
          data-slot="terminal-animation-output-line"
        >
          <span :data-line-color="line.color">{{
            line.text || '\u00A0'
          }}</span>
        </div>
      </slot>
    </div>
  </div>
</template>
