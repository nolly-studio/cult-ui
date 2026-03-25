<script setup lang="ts">
import { Bot } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "AgentHeader" })

const props = defineProps<{
  class?: string
  name: string
  model?: string
}>()
</script>

<template>
  <div
    :class="cn('flex w-full items-center justify-between gap-4 p-3', props.class)"
  >
    <div class="flex items-center gap-2">
      <Bot class="size-4 text-muted-foreground" />
      <span class="font-medium text-sm">{{ props.name }}</span>
      <span
        v-if="props.model"
        class="inline-flex items-center rounded-md border px-2.5 py-0.5 font-mono text-xs font-semibold bg-secondary text-secondary-foreground"
      >
        {{ props.model }}
      </span>
    </div>
  </div>
</template>
