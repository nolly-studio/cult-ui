<script setup lang="ts">
import { Minus } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "CommitFileDeletions" })

const props = defineProps<{
  class?: string
  count: number
}>()
</script>

<template>
  <span
    v-if="props.count > 0"
    :class="cn('text-red-600 dark:text-red-400', props.class)"
  >
    <slot>
      <Minus class="inline-block size-3" />{{ props.count }}
    </slot>
  </span>
</template>
