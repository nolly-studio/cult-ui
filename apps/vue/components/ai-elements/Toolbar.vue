<script setup lang="ts">
import { cn } from "@/lib/utils"
import { NodeToolbar, Position } from "@vue-flow/core"

defineOptions({ name: "Toolbar" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <NodeToolbar
    :class="cn('flex items-center gap-1 rounded-sm border bg-background p-1.5', props.class)"
    :position="Position.Bottom"
  >
    <slot />
  </NodeToolbar>
</template>
