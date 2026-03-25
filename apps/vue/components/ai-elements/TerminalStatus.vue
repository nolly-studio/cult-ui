<script setup lang="ts">
import { cn } from "@/lib/utils"
import { useTerminal } from "./terminal-utils"

defineOptions({ name: "TerminalStatus" })

const props = defineProps<{
  class?: string
}>()

const { isStreaming } = useTerminal()
</script>

<template>
  <div
    v-if="isStreaming"
    :class="cn('flex items-center gap-2 text-xs text-zinc-400', props.class)"
  >
    <slot>
      <span class="inline-block w-16 animate-pulse text-zinc-400">Running...</span>
    </slot>
  </div>
</template>
