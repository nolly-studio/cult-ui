<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "QueueItemDescription" })

const props = withDefaults(
  defineProps<{
    class?: string
    completed?: boolean
  }>(),
  { completed: false }
)
</script>

<template>
  <div
    :class="cn(
      'ml-6 text-xs',
      completed
        ? 'text-muted-foreground/40 line-through'
        : 'text-muted-foreground',
      props.class
    )"
  >
    <slot />
  </div>
</template>
