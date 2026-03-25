<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "TerminalHeader" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="cn(
      'flex items-center justify-between border-zinc-800 border-b px-4 py-2',
      props.class
    )"
  >
    <slot />
  </div>
</template>
