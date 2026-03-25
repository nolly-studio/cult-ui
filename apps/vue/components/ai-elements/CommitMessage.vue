<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "CommitMessage" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <span :class="cn('font-medium text-sm', props.class)">
    <slot />
  </span>
</template>
