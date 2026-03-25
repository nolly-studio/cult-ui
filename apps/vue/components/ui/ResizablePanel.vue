<script setup lang="ts">
import { Pane } from "splitpanes"

defineOptions({ name: "ResizablePanel" })

defineProps<{
  size?: number
  minSize?: number
  maxSize?: number
}>()
</script>

<template>
  <Pane :size="size" :min-size="minSize" :max-size="maxSize">
    <slot />
  </Pane>
</template>
