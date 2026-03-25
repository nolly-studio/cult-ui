<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "CommitFileStatus" })

const fileStatusStyles: Record<string, string> = {
  added: "text-green-600 dark:text-green-400",
  deleted: "text-red-600 dark:text-red-400",
  modified: "text-yellow-600 dark:text-yellow-400",
  renamed: "text-blue-600 dark:text-blue-400",
}

const fileStatusLabels: Record<string, string> = {
  added: "A",
  deleted: "D",
  modified: "M",
  renamed: "R",
}

const props = defineProps<{
  class?: string
  status: "added" | "modified" | "deleted" | "renamed"
}>()
</script>

<template>
  <span :class="cn('font-medium font-mono text-xs', fileStatusStyles[props.status], props.class)">
    <slot>{{ fileStatusLabels[props.status] }}</slot>
  </span>
</template>
