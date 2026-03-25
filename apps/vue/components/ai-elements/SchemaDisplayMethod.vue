<script setup lang="ts">
import { inject } from "vue"
import { cn } from "@/lib/utils"
import { schemaDisplayKey, type HttpMethod } from "./SchemaDisplay.vue"

defineOptions({ name: "SchemaDisplayMethod" })

const props = defineProps<{
  class?: string
}>()

const methodStyles: Record<HttpMethod, string> = {
  DELETE: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  GET: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  PATCH: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  PUT: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
}

const context = inject(schemaDisplayKey)
const method = context?.method ?? "GET"
</script>

<template>
  <span
    :class="cn(
      'inline-flex items-center rounded-md border px-2.5 py-0.5 font-mono text-xs font-semibold transition-colors',
      methodStyles[method],
      props.class
    )"
  >
    <slot>{{ method }}</slot>
  </span>
</template>
