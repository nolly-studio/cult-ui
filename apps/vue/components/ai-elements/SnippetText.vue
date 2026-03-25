<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "SnippetText" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <span :class="cn('pl-2 font-normal text-muted-foreground', props.class)">
    <slot />
  </span>
</template>
