<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "ModelSelectorName" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <span :class="cn('flex-1 truncate text-left', props.class)">
    <slot />
  </span>
</template>
