<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "InlineCitationQuote" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <blockquote
    :class="cn('border-muted border-l-2 pl-3 text-muted-foreground text-sm italic', props.class)"
  >
    <slot />
  </blockquote>
</template>
