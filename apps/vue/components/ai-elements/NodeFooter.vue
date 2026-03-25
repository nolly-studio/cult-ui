<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "NodeFooter" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('rounded-b-md border-t bg-secondary p-3', props.class)">
    <slot />
  </div>
</template>
