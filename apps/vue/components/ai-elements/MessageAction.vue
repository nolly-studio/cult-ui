<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "MessageAction" })

const props = defineProps<{
  class?: string
  tooltip?: string
  label?: string
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    type="button"
    :class="cn('inline-flex items-center justify-center size-7 rounded-md hover:bg-accent', props.class)"
    :title="props.tooltip"
    @click="emit('click', $event)"
  >
    <slot />
    <span class="sr-only">{{ props.label || props.tooltip }}</span>
  </button>
</template>
