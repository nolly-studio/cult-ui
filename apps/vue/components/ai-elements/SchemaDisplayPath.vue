<script setup lang="ts">
import { inject, computed } from "vue"
import { cn } from "@/lib/utils"
import { schemaDisplayKey } from "./SchemaDisplay.vue"

defineOptions({ name: "SchemaDisplayPath" })

const props = defineProps<{
  class?: string
}>()

const context = inject(schemaDisplayKey)
const path = context?.path ?? ""

const highlightedPath = computed(() =>
  path.replaceAll(
    /\{([^}]+)\}/g,
    '<span class="text-blue-600 dark:text-blue-400">{$1}</span>'
  )
)
</script>

<template>
  <span
    :class="cn('font-mono text-sm', props.class)"
    v-html="highlightedPath"
  />
</template>
