<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "ConversationContent" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('flex flex-col gap-8 p-4', props.class)">
    <slot />
  </div>
</template>
