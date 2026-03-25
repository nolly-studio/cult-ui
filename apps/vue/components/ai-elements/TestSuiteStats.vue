<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "TestSuiteStats" })

const props = withDefaults(defineProps<{
  passed?: number
  failed?: number
  skipped?: number
  class?: string
}>(), {
  passed: 0,
  failed: 0,
  skipped: 0,
})
</script>

<template>
  <div :class="cn('ml-auto flex items-center gap-2 text-xs', props.class)">
    <slot>
      <span v-if="passed > 0" class="text-green-600 dark:text-green-400">
        {{ passed }} passed
      </span>
      <span v-if="failed > 0" class="text-red-600 dark:text-red-400">
        {{ failed }} failed
      </span>
      <span v-if="skipped > 0" class="text-yellow-600 dark:text-yellow-400">
        {{ skipped }} skipped
      </span>
    </slot>
  </div>
</template>
