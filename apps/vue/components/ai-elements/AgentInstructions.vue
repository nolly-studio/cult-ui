<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "AgentInstructions" })

const props = defineProps<{
  class?: string
  instructions: string
}>()
</script>

<template>
  <div :class="cn('space-y-2', props.class)">
    <span class="font-medium text-muted-foreground text-sm">Instructions</span>
    <div class="rounded-md bg-muted/50 p-3 text-muted-foreground text-sm">
      <p>{{ props.instructions }}</p>
    </div>
  </div>
</template>
