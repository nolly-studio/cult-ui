<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "TestResultsContent" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('space-y-2 p-4', props.class)">
    <slot />
  </div>
</template>
