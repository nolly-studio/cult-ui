<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "MessageToolbar" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('mt-4 flex w-full items-center justify-between gap-4', props.class)">
    <slot />
  </div>
</template>
