<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "SchemaDisplayHeader" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="cn('flex items-center gap-3 border-b px-4 py-3', props.class)"
  >
    <slot />
  </div>
</template>
