<script setup lang="ts">
import { cn } from "@/lib/utils"
import CodeBlock from "./CodeBlock.vue"

defineOptions({ name: "ToolInput" })

const props = defineProps<{
  input: unknown
  class?: string
}>()
</script>

<template>
  <div :class="cn('space-y-2 overflow-hidden', props.class)">
    <h4 class="font-medium text-muted-foreground text-xs uppercase tracking-wide">
      Parameters
    </h4>
    <div class="rounded-md bg-muted/50">
      <CodeBlock :code="JSON.stringify(input, null, 2)" language="json" />
    </div>
  </div>
</template>
