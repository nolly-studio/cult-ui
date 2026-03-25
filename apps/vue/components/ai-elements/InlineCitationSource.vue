<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "InlineCitationSource" })

const props = defineProps<{
  class?: string
  title?: string
  url?: string
  description?: string
}>()
</script>

<template>
  <div :class="cn('space-y-1', props.class)">
    <h4 v-if="props.title" class="truncate font-medium text-sm leading-tight">{{ props.title }}</h4>
    <p v-if="props.url" class="truncate break-all text-muted-foreground text-xs">{{ props.url }}</p>
    <p v-if="props.description" class="line-clamp-3 text-muted-foreground text-sm leading-relaxed">
      {{ props.description }}
    </p>
    <slot />
  </div>
</template>
