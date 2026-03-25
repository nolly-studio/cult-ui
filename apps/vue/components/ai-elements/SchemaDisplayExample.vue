<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "SchemaDisplayExample" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <pre
    :class="cn(
      'mx-4 mb-4 overflow-auto rounded-md bg-muted p-4 font-mono text-sm',
      props.class
    )"
  ><slot /></pre>
</template>
