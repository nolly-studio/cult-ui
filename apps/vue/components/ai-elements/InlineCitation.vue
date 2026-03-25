<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "InlineCitation" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <span :class="cn('group inline items-center gap-1', props.class)">
    <slot />
  </span>
</template>
