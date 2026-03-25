<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "TestResultsHeader" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('flex items-center justify-between border-b px-4 py-3', props.class)">
    <slot />
  </div>
</template>
