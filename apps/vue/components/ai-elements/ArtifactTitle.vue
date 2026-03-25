<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "ArtifactTitle" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <p :class="cn('font-medium text-foreground text-sm', props.class)">
    <slot />
  </p>
</template>
