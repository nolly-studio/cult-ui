<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "Artifact" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="cn('flex flex-col overflow-hidden rounded-lg border bg-background shadow-sm', props.class)"
  >
    <slot />
  </div>
</template>
