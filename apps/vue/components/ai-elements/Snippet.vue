<script setup lang="ts">
import { provide, type InjectionKey } from "vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "Snippet" })

export const snippetKey = Symbol("snippet") as InjectionKey<{ code: string }>

const props = defineProps<{
  class?: string
  code: string
}>()

provide(snippetKey, { code: props.code })
</script>

<template>
  <div
    :class="cn(
      'flex h-9 w-full items-center rounded-md border border-input bg-transparent shadow-xs font-mono',
      props.class
    )"
  >
    <slot />
  </div>
</template>
