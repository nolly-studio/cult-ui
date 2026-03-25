<script setup lang="ts">
import { ref, watch, onMounted } from "vue"
import { cn } from "@/lib/utils"
import { useTerminal } from "./terminal-utils"

defineOptions({ name: "TerminalContent" })

const props = defineProps<{
  class?: string
}>()

const { output, isStreaming, autoScroll } = useTerminal()
const containerRef = ref<HTMLDivElement | null>(null)

watch(
  () => output.value,
  () => {
    if (autoScroll.value && containerRef.value) {
      containerRef.value.scrollTop = containerRef.value.scrollHeight
    }
  },
)

onMounted(() => {
  if (autoScroll.value && containerRef.value) {
    containerRef.value.scrollTop = containerRef.value.scrollHeight
  }
})
</script>

<template>
  <div
    ref="containerRef"
    :class="cn(
      'max-h-96 overflow-auto p-4 font-mono text-sm leading-relaxed',
      props.class
    )"
  >
    <slot>
      <pre class="whitespace-pre-wrap break-words">{{ output }}<span
          v-if="isStreaming"
          class="ml-0.5 inline-block h-4 w-2 animate-pulse bg-zinc-100"
        /></pre>
    </slot>
  </div>
</template>
