<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "NodeHeader" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('gap-0.5 rounded-t-md border-b bg-secondary p-3', props.class)">
    <slot />
  </div>
</template>
