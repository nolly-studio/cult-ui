<script setup lang="ts">
import { computed, provide } from "vue"
import { cn } from "@/lib/utils"
import { terminalKey } from "./terminal-utils"
import TerminalHeader from "./TerminalHeader.vue"
import TerminalTitle from "./TerminalTitle.vue"
import TerminalStatus from "./TerminalStatus.vue"
import TerminalActions from "./TerminalActions.vue"
import TerminalCopyButton from "./TerminalCopyButton.vue"
import TerminalClearButton from "./TerminalClearButton.vue"
import TerminalContent from "./TerminalContent.vue"

defineOptions({ name: "Terminal" })

const props = withDefaults(
  defineProps<{
    class?: string
    output: string
    isStreaming?: boolean
    autoScroll?: boolean
    onClear?: () => void
  }>(),
  {
    isStreaming: false,
    autoScroll: true,
  },
)

provide(terminalKey, {
  output: computed(() => props.output),
  isStreaming: computed(() => props.isStreaming),
  autoScroll: computed(() => props.autoScroll),
  onClear: props.onClear,
})
</script>

<template>
  <div
    :class="cn(
      'flex flex-col overflow-hidden rounded-lg border bg-zinc-950 text-zinc-100',
      props.class
    )"
  >
    <slot>
      <TerminalHeader>
        <TerminalTitle />
        <div class="flex items-center gap-1">
          <TerminalStatus />
          <TerminalActions>
            <TerminalCopyButton />
            <TerminalClearButton v-if="props.onClear" />
          </TerminalActions>
        </div>
      </TerminalHeader>
      <TerminalContent />
    </slot>
  </div>
</template>
