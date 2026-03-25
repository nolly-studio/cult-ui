<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "WebPreviewNavigation" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('flex items-center gap-1 border-b p-2', props.class)">
    <slot />
  </div>
</template>
