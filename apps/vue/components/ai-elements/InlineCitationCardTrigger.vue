<script setup lang="ts">
import { computed } from "vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "InlineCitationCardTrigger" })

const props = defineProps<{
  class?: string
  sources: string[]
}>()

const hostname = computed(() => {
  if (!props.sources[0]) return "unknown"
  try {
    return new URL(props.sources[0]).hostname
  } catch {
    return "unknown"
  }
})

const extra = computed(() => props.sources.length > 1 ? ` +${props.sources.length - 1}` : "")
</script>

<template>
  <span
    :class="cn(
      'ml-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground cursor-pointer',
      props.class
    )"
  >
    {{ hostname }}{{ extra }}
  </span>
</template>
