<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "ConfirmationAction" })

const props = defineProps<{
  class?: string
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    type="button"
    :class="cn('inline-flex items-center justify-center rounded-md text-sm font-medium h-8 px-3 bg-primary text-primary-foreground hover:bg-primary/90', props.class)"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>
