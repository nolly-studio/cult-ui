<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "TestError" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('mt-2 rounded-md bg-red-50 p-3 dark:bg-red-900/20', props.class)">
    <slot />
  </div>
</template>
