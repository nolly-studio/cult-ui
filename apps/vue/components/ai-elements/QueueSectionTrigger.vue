<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "QueueSectionTrigger" })

const props = defineProps<{
  class?: string
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :class="cn(
      'group flex w-full items-center justify-between rounded-md bg-muted/40 px-3 py-2 text-left font-medium text-muted-foreground text-sm transition-colors hover:bg-muted',
      props.class
    )"
    type="button"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>
