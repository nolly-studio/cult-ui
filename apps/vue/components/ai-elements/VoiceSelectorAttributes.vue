<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "VoiceSelectorAttributes" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('flex items-center text-xs', props.class)">
    <slot />
  </div>
</template>
