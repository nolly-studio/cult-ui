<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "CommitFile" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="cn('flex items-center justify-between gap-2 rounded px-2 py-1 text-sm hover:bg-muted/50', props.class)"
  >
    <slot />
  </div>
</template>
