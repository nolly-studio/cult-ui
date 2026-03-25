<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "FileTreeActions" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="cn('ml-auto flex items-center gap-1', props.class)"
    role="group"
    @click.stop
    @keydown.stop
  >
    <slot />
  </div>
</template>
