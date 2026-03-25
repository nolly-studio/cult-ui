<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "QueueItemIndicator" })

const props = withDefaults(
  defineProps<{
    class?: string
    completed?: boolean
  }>(),
  { completed: false }
)
</script>

<template>
  <span
    :class="cn(
      'mt-0.5 inline-block size-2.5 rounded-full border',
      completed
        ? 'border-muted-foreground/20 bg-muted-foreground/10'
        : 'border-muted-foreground/50',
      props.class
    )"
  />
</template>
