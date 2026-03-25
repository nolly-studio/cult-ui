<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "CommitMetadata" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('flex items-center gap-2 text-muted-foreground text-xs', props.class)">
    <slot />
  </div>
</template>
