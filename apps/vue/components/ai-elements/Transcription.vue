<script setup lang="ts">
import { ref, computed, provide, inject, type InjectionKey } from "vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "Transcription" })

interface TranscriptionSegment {
  text: string
  startSecond: number
  endSecond: number
}

export interface TranscriptionContextValue {
  currentTime: number
  onSeek?: (time: number) => void
  onTimeUpdate: (time: number) => void
  segments: TranscriptionSegment[]
}

export const transcriptionKey = Symbol("transcription") as InjectionKey<TranscriptionContextValue>

const props = defineProps<{
  segments: TranscriptionSegment[]
  currentTime?: number
  class?: string
}>()

const emit = defineEmits<{
  seek: [time: number]
}>()

const internalTime = ref(props.currentTime ?? 0)

const currentTimeValue = computed(() => props.currentTime ?? internalTime.value)

const handleTimeUpdate = (time: number) => {
  internalTime.value = time
  emit("seek", time)
}

provide(transcriptionKey, {
  get currentTime() {
    return currentTimeValue.value
  },
  onSeek: (time: number) => {
    handleTimeUpdate(time)
  },
  onTimeUpdate: handleTimeUpdate,
  segments: props.segments,
})

const filteredSegments = computed(() =>
  props.segments.filter((segment) => segment.text.trim())
)
</script>

<template>
  <div
    :class="cn('flex flex-wrap gap-1 text-sm leading-relaxed', props.class)"
    data-slot="transcription"
  >
    <slot
      v-for="(segment, index) in filteredSegments"
      :key="index"
      :segment="segment"
      :index="index"
    />
  </div>
</template>
