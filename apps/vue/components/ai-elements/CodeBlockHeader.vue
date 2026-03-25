<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "CodeBlockHeader" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="cn('flex items-center justify-between border-b bg-muted/80 px-3 py-2 text-muted-foreground text-xs', props.class)"
  >
    <slot />
  </div>
</template>
