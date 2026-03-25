<script setup lang="ts">
import { computed } from "vue"
import { cn } from "@/lib/utils"
import CodeBlock from "./CodeBlock.vue"

defineOptions({ name: "ToolOutput" })

const props = defineProps<{
  output?: unknown
  errorText?: string
  class?: string
}>()

const isObjectOutput = computed(() =>
  typeof props.output === "object" && props.output !== null
)

const isStringOutput = computed(() => typeof props.output === "string")

const formattedOutput = computed(() => {
  if (isObjectOutput.value) {
    return JSON.stringify(props.output, null, 2)
  }
  if (isStringOutput.value) {
    return props.output as string
  }
  return ""
})

const hasOutput = computed(() => !!(props.output || props.errorText))
</script>

<template>
  <div v-if="hasOutput" :class="cn('space-y-2', props.class)">
    <h4 class="font-medium text-muted-foreground text-xs uppercase tracking-wide">
      {{ errorText ? 'Error' : 'Result' }}
    </h4>
    <div
      :class="cn(
        'overflow-x-auto rounded-md text-xs [&_table]:w-full',
        errorText
          ? 'bg-destructive/10 text-destructive'
          : 'bg-muted/50 text-foreground'
      )"
    >
      <div v-if="errorText">{{ errorText }}</div>
      <CodeBlock
        v-if="isObjectOutput || isStringOutput"
        :code="formattedOutput"
        language="json"
      />
      <div v-else-if="output">{{ output }}</div>
    </div>
  </div>
</template>
