<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "DialogHeader" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('gap-2 flex flex-col', props.class)">
    <slot />
  </div>
</template>
