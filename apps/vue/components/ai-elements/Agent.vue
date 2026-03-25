<script setup lang="ts">
import { computed } from "vue"
import { Bot } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "Agent" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('not-prose w-full rounded-md border', props.class)">
    <slot />
  </div>
</template>
