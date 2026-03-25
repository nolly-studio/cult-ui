<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "CommitAuthorAvatar" })

const props = defineProps<{
  class?: string
  initials: string
}>()
</script>

<template>
  <span
    :class="cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', props.class)"
  >
    <span class="flex size-full items-center justify-center rounded-full bg-muted text-xs">
      {{ props.initials }}
    </span>
  </span>
</template>
