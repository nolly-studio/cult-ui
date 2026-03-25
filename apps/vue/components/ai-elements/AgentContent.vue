<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "AgentContent" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('space-y-4 p-4 pt-0', props.class)">
    <slot />
  </div>
</template>
