<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "InlineCitationText" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <span :class="cn('transition-colors group-hover:bg-accent', props.class)">
    <slot />
  </span>
</template>
