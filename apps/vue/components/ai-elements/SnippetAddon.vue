<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "SnippetAddon" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('flex items-center', props.class)">
    <slot />
  </div>
</template>
