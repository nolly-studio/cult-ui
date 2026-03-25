<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "QueueItemAction" })

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
      'size-auto rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-muted-foreground/10 hover:text-foreground group-hover:opacity-100',
      props.class
    )"
    type="button"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>
