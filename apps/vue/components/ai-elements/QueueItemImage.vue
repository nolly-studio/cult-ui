<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "QueueItemImage" })

const props = defineProps<{
  class?: string
  src?: string
  alt?: string
}>()
</script>

<template>
  <img
    :alt="props.alt ?? ''"
    :class="cn('h-8 w-8 rounded border object-cover', props.class)"
    :height="32"
    :width="32"
    :src="props.src"
  />
</template>
