<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "AgentOutput" })

const props = defineProps<{
  class?: string
  schema: string
}>()
</script>

<template>
  <div :class="cn('space-y-2', props.class)">
    <span class="font-medium text-muted-foreground text-sm">Output Schema</span>
    <div class="rounded-md bg-muted/50">
      <CodeBlock :code="props.schema" language="typescript" />
    </div>
  </div>
</template>
