<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "TerminalActions" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('flex items-center gap-1', props.class)">
    <slot />
  </div>
</template>
