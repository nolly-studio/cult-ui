<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "TaskItemFile" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="cn(
      'inline-flex items-center gap-1 rounded-md border bg-secondary px-1.5 py-0.5 text-foreground text-xs',
      props.class
    )"
  >
    <slot />
  </div>
</template>
