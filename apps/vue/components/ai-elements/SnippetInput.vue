<script setup lang="ts">
import { inject } from "vue"
import { cn } from "@/lib/utils"
import { snippetKey } from "./Snippet.vue"

defineOptions({ name: "SnippetInput" })

const props = defineProps<{
  class?: string
}>()

const context = inject(snippetKey)
const code = context?.code ?? ""
</script>

<template>
  <input
    :class="cn(
      'flex-1 bg-transparent px-3 py-1 text-sm text-foreground outline-none placeholder:text-muted-foreground',
      props.class
    )"
    readonly
    :value="code"
  />
</template>
