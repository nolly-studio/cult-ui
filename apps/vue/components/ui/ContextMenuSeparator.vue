<script setup lang="ts">
import { ContextMenuSeparator } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "ContextMenuSeparator" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <ContextMenuSeparator
    :class="cn('-mx-1 my-1 h-px bg-border', props.class)"
  />
</template>
