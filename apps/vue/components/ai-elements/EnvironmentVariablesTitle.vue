<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "EnvironmentVariablesTitle" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <h3 :class="cn('font-medium text-sm', props.class)">
    <slot>Environment Variables</slot>
  </h3>
</template>
