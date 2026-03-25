<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "ArtifactDescription" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <p :class="cn('text-muted-foreground text-sm', props.class)">
    <slot />
  </p>
</template>
