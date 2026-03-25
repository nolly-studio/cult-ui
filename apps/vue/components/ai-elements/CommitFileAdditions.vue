<script setup lang="ts">
import { Plus } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "CommitFileAdditions" })

const props = defineProps<{
  class?: string
  count: number
}>()
</script>

<template>
  <span
    v-if="props.count > 0"
    :class="cn('text-green-600 dark:text-green-400', props.class)"
  >
    <slot>
      <Plus class="inline-block size-3" />{{ props.count }}
    </slot>
  </span>
</template>
