<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "QueueItemAttachment" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('mt-1 flex flex-wrap gap-2', props.class)">
    <slot />
  </div>
</template>
