<script setup lang="ts">
import { inject } from "vue"
import { cn } from "@/lib/utils"
import { schemaDisplayKey } from "./SchemaDisplay.vue"

defineOptions({ name: "SchemaDisplayDescription" })

const props = defineProps<{
  class?: string
}>()

const context = inject(schemaDisplayKey)
const description = context?.description ?? ""
</script>

<template>
  <p
    :class="cn('border-b px-4 py-3 text-muted-foreground text-sm', props.class)"
  >
    <slot>{{ description }}</slot>
  </p>
</template>
