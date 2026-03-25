<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "TestErrorStack" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <pre :class="cn('mt-2 overflow-auto font-mono text-red-600 text-xs dark:text-red-400', props.class)"><slot /></pre>
</template>
