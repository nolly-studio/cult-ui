<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "ConversationEmptyState" })

const props = withDefaults(
  defineProps<{
    class?: string
    title?: string
    description?: string
  }>(),
  {
    title: "No messages yet",
    description: "Start a conversation to see messages here",
  }
)
</script>

<template>
  <div
    :class="cn('flex size-full flex-col items-center justify-center gap-3 p-8 text-center', props.class)"
  >
    <slot>
      <slot name="icon" />
      <div class="space-y-1">
        <h3 class="font-medium text-sm">{{ props.title }}</h3>
        <p v-if="props.description" class="text-muted-foreground text-sm">{{ props.description }}</p>
      </div>
    </slot>
  </div>
</template>
