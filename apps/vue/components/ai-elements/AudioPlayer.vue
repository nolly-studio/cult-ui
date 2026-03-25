<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "AudioPlayer" })

const props = defineProps<{
  class?: string
  src?: string
  audioData?: { mediaType: string; base64: string }
}>()

const audioSrc = computed(() => {
  if (props.src) return props.src
  if (props.audioData) return `data:${props.audioData.mediaType};base64,${props.audioData.base64}`
  return undefined
})
</script>

<template>
  <div :class="cn('w-full', props.class)" data-slot="audio-player">
    <audio v-if="audioSrc" controls class="w-full" :src="audioSrc">
      Your browser does not support the audio element.
    </audio>
    <slot />
  </div>
</template>
