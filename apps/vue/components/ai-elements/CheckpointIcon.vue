<script setup lang="ts">
import { Bookmark } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "CheckpointIcon" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <slot>
    <Bookmark :class="cn('size-4 shrink-0', props.class)" />
  </slot>
</template>
