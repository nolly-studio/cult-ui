<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "QueueItem" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <li
    :class="cn(
      'group flex flex-col gap-1 rounded-md px-3 py-1 text-sm transition-colors hover:bg-muted',
      props.class
    )"
  >
    <slot />
  </li>
</template>
