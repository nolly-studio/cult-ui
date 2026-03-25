<script setup lang="ts">
import type { Component } from "vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "ArtifactAction" })

const props = defineProps<{
  class?: string
  tooltip?: string
  label?: string
  icon?: Component
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    type="button"
    :class="cn('inline-flex items-center justify-center size-8 p-0 text-muted-foreground hover:text-foreground rounded-md hover:bg-accent', props.class)"
    :title="props.tooltip"
    @click="emit('click', $event)"
  >
    <slot>
      <component v-if="props.icon" :is="props.icon" class="size-4" />
    </slot>
    <span class="sr-only">{{ props.label || props.tooltip }}</span>
  </button>
</template>
