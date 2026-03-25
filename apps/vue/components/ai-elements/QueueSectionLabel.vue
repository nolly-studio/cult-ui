<script setup lang="ts">
import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-vue-next"

defineOptions({ name: "QueueSectionLabel" })

const props = defineProps<{
  class?: string
  count?: number
  label: string
}>()
</script>

<template>
  <span :class="cn('flex items-center gap-2', props.class)">
    <ChevronDownIcon class="size-4 transition-transform group-data-[state=closed]:-rotate-90" />
    <slot name="icon" />
    <span>{{ props.count }} {{ props.label }}</span>
  </span>
</template>
