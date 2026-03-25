<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "QueueItemContent" })

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
      'line-clamp-1 grow break-words',
      completed
        ? 'text-muted-foreground/50 line-through'
        : 'text-muted-foreground',
      props.class
    )"
  >
    <slot />
  </span>
</template>
