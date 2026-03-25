<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "QueueList" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('mt-2 -mb-1 overflow-auto', props.class)">
    <div class="max-h-40 pr-4">
      <ul>
        <slot />
      </ul>
    </div>
  </div>
</template>
