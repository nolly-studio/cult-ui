<script setup lang="ts">
import { computed } from "vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "CommitTimestamp" })

const props = defineProps<{
  class?: string
  date: Date
}>()

const relativeTimeFormat = new Intl.RelativeTimeFormat("en", { numeric: "auto" })

const formatted = computed(() =>
  relativeTimeFormat.format(
    Math.round((props.date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
    "day"
  )
)
</script>

<template>
  <time
    :class="cn('text-xs', props.class)"
    :dateTime="props.date.toISOString()"
  >
    <slot>{{ formatted }}</slot>
  </time>
</template>
