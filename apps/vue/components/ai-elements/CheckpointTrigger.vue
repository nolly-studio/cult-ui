<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "CheckpointTrigger" })

const props = defineProps<{
  class?: string
  tooltip?: string
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    type="button"
    :class="cn('inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-9 px-3', props.class)"
    :title="props.tooltip"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>
