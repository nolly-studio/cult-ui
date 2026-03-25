<script setup lang="ts">
import { ref, computed } from "vue"
import { ChevronDown } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "AgentTool" })

const props = defineProps<{
  class?: string
  tool: { description?: string; jsonSchema?: object; inputSchema?: object }
}>()

const isOpen = ref(false)

const schema = computed(() => {
  if ("jsonSchema" in props.tool && props.tool.jsonSchema) {
    return props.tool.jsonSchema
  }
  return props.tool.inputSchema
})

const schemaJson = computed(() => JSON.stringify(schema.value, null, 2))
</script>

<template>
  <div :class="cn('border-b last:border-b-0', props.class)">
    <button
      class="flex w-full items-center justify-between px-3 py-2 text-sm hover:no-underline"
      type="button"
      @click="isOpen = !isOpen"
    >
      {{ props.tool.description ?? "No description" }}
      <ChevronDown
        :class="cn('size-4 transition-transform', isOpen && 'rotate-180')"
      />
    </button>
    <div v-if="isOpen" class="px-3 pb-3">
      <div class="rounded-md bg-muted/50">
        <CodeBlock :code="schemaJson" language="json" />
      </div>
    </div>
  </div>
</template>
