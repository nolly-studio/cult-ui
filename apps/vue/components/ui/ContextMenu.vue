<script setup lang="ts">
import { ContextMenuRoot } from "radix-vue"

defineOptions({ name: "ContextMenu" })

defineProps<{ dir?: "ltr" | "rtl"; modal?: boolean }>()
</script>

<template>
  <ContextMenuRoot :dir="dir" :modal="modal">
    <slot />
  </ContextMenuRoot>
</template>
