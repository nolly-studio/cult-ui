<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "TaskItem" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('text-muted-foreground text-sm', props.class)">
    <slot />
  </div>
</template>
