<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "AgentTools" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('space-y-2', props.class)">
    <span class="font-medium text-muted-foreground text-sm">Tools</span>
    <div class="rounded-md border">
      <slot />
    </div>
  </div>
</template>
