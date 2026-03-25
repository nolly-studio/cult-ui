<script setup lang="ts">
import { ContextMenuTrigger } from "radix-vue"

defineOptions({ name: "ContextMenuTrigger" })

defineProps<{ asChild?: boolean; disabled?: boolean }>()
</script>

<template>
  <ContextMenuTrigger :as-child="asChild" :disabled="disabled" v-bind="$attrs">
    <slot />
  </ContextMenuTrigger>
</template>
