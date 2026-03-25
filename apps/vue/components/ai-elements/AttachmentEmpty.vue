<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "AttachmentEmpty" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="cn('flex items-center justify-center p-4 text-muted-foreground text-sm', props.class)"
  >
    <slot>No attachments</slot>
  </div>
</template>
