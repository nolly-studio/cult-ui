<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "QueueSectionContent" })

const props = defineProps<{
  class?: string
  open?: boolean
}>()
</script>

<template>
  <div v-if="props.open" :class="cn(props.class)">
    <slot />
  </div>
</template>
