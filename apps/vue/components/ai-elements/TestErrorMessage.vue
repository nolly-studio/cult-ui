<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "TestErrorMessage" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <p :class="cn('font-medium text-red-700 text-sm dark:text-red-400', props.class)">
    <slot />
  </p>
</template>
