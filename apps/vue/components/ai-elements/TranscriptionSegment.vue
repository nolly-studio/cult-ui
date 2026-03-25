<script setup lang="ts">
import { computed, inject, type InjectionKey } from "vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "TranscriptionSegment" })

interface TranscriptionSegmentData {
  text: string
  startSecond: number
  endSecond: number
}

interface TranscriptionContextValue {
  currentTime: number
  onSeek?: (time: number) => void
  onTimeUpdate: (time: number) => void
  segments: TranscriptionSegmentData[]
}

const transcriptionKey = Symbol.for("transcription") as InjectionKey<TranscriptionContextValue>

const props = defineProps<{
  segment: TranscriptionSegmentData
  index: number
  class?: string
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const context = inject(transcriptionKey)

if (!context) {
  throw new Error("TranscriptionSegment must be used within Transcription")
}

const isActive = computed(
  () =>
    context.currentTime >= props.segment.startSecond &&
    context.currentTime < props.segment.endSecond
)

const isPast = computed(() => context.currentTime >= props.segment.endSecond)

const handleClick = (event: MouseEvent) => {
  if (context.onSeek) {
    context.onSeek(props.segment.startSecond)
  }
  emit("click", event)
}
</script>

<template>
  <button
    :class="cn(
      'inline text-left',
      isActive && 'text-primary',
      isPast && 'text-muted-foreground',
      !(isActive || isPast) && 'text-muted-foreground/60',
      context?.onSeek && 'cursor-pointer hover:text-foreground',
      !context?.onSeek && 'cursor-default',
      props.class
    )"
    :data-active="isActive"
    :data-index="index"
    data-slot="transcription-segment"
    type="button"
    @click="handleClick"
  >
    {{ segment.text }}
  </button>
</template>
