<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "ChainOfThoughtSearchResult" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <span
    :class="cn('inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-normal bg-secondary text-secondary-foreground gap-1', props.class)"
  >
    <slot />
  </span>
</template>
