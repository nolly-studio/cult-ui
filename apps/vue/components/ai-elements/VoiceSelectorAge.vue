<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "VoiceSelectorAge" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <span :class="cn('text-muted-foreground text-xs tabular-nums', props.class)">
    <slot />
  </span>
</template>
