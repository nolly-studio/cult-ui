<script setup lang="ts">
import { computed } from "vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "AiImage" })

const props = defineProps<{
  class?: string
  base64: string
  mediaType: string
  alt?: string
}>()

const src = computed(() => `data:${props.mediaType};base64,${props.base64}`)
</script>

<template>
  <img
    :alt="props.alt"
    :class="cn('h-auto max-w-full overflow-hidden rounded-md', props.class)"
    :src="src"
  />
</template>
