<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "CommitFiles" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('space-y-1', props.class)">
    <slot />
  </div>
</template>
