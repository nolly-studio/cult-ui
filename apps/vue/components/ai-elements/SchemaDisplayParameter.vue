<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "SchemaDisplayParameter" })

const props = defineProps<{
  class?: string
  name: string
  type: string
  required?: boolean
  description?: string
  location?: "path" | "query" | "header"
}>()
</script>

<template>
  <div :class="cn('px-4 py-3 pl-10', props.class)">
    <div class="flex items-center gap-2">
      <span class="font-mono text-sm">{{ props.name }}</span>
      <span class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors">
        {{ props.type }}
      </span>
      <span
        v-if="props.location"
        class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-secondary text-secondary-foreground"
      >
        {{ props.location }}
      </span>
      <span
        v-if="props.required"
        class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      >
        required
      </span>
    </div>
    <p v-if="props.description" class="mt-1 text-muted-foreground text-sm">
      {{ props.description }}
    </p>
  </div>
</template>
