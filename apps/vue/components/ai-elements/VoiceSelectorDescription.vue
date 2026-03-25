<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "VoiceSelectorDescription" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <span :class="cn('text-muted-foreground text-xs', props.class)">
    <slot />
  </span>
</template>
