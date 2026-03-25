<script setup lang="ts">
import { cn } from "@/lib/utils"
import { TerminalIcon } from "lucide-vue-next"

defineOptions({ name: "TerminalTitle" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="cn('flex items-center gap-2 text-sm text-zinc-400', props.class)"
  >
    <TerminalIcon class="size-4" />
    <slot>Terminal</slot>
  </div>
</template>
