<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "ArtifactHeader" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="cn('flex items-center justify-between border-b bg-muted/50 px-4 py-3', props.class)"
  >
    <slot />
  </div>
</template>
