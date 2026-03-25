<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "CommitInfo" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('flex flex-1 flex-col', props.class)">
    <slot />
  </div>
</template>
