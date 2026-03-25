<script setup lang="ts">
import { computed } from "vue"
import { cn } from "@/lib/utils"
import { useStackTrace, AT_PREFIX_REGEX, type StackFrame } from "./stack-trace-utils"

defineOptions({ name: "StackTraceFrames" })

const props = withDefaults(
  defineProps<{
    class?: string
    showInternalFrames?: boolean
  }>(),
  {
    showInternalFrames: true,
  },
)

const { trace, onFilePathClick } = useStackTrace()

const framesToShow = computed(() =>
  props.showInternalFrames
    ? trace.value.frames
    : trace.value.frames.filter((f) => !f.isInternal),
)

function handleFilePathClick(frame: StackFrame) {
  if (frame.filePath && onFilePathClick) {
    onFilePathClick(
      frame.filePath,
      frame.lineNumber ?? undefined,
      frame.columnNumber ?? undefined,
    )
  }
}
</script>

<template>
  <div :class="cn('space-y-1 p-3', props.class)">
    <div
      v-for="(frame, index) in framesToShow"
      :key="`${frame.raw}-${index}`"
      :class="cn(
        'text-xs',
        frame.isInternal
          ? 'text-muted-foreground/50'
          : 'text-foreground/90'
      )"
    >
      <span class="text-muted-foreground">at </span>
      <template v-if="frame.functionName">
        <span :class="frame.isInternal ? '' : 'text-foreground'">
          {{ frame.functionName }}{{ ' ' }}
        </span>
      </template>
      <template v-if="frame.filePath">
        <span class="text-muted-foreground">(</span>
        <button
          :class="cn(
            'underline decoration-dotted hover:text-primary',
            onFilePathClick && 'cursor-pointer'
          )"
          :disabled="!onFilePathClick"
          type="button"
          @click="handleFilePathClick(frame)"
        >
          {{ frame.filePath }}
          <template v-if="frame.lineNumber !== null">:{{ frame.lineNumber }}</template>
          <template v-if="frame.columnNumber !== null">:{{ frame.columnNumber }}</template>
        </button>
        <span class="text-muted-foreground">)</span>
      </template>
      <template v-if="!frame.filePath && !frame.functionName">
        <span>{{ frame.raw.replace(AT_PREFIX_REGEX, '') }}</span>
      </template>
    </div>
    <div v-if="framesToShow.length === 0" class="text-muted-foreground text-xs">
      No stack frames
    </div>
  </div>
</template>
