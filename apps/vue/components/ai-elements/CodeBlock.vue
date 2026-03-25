<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, provide, inject, type InjectionKey } from "vue"
import { Check, Copy } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "CodeBlock" })

export const CODE_BLOCK_KEY = Symbol("code-block") as InjectionKey<{ code: () => string }>

const props = withDefaults(
  defineProps<{
    class?: string
    code: string
    language: string
    showLineNumbers?: boolean
  }>(),
  { showLineNumbers: false }
)

provide(CODE_BLOCK_KEY, { code: () => props.code })

const lines = computed(() => props.code.split("\n"))
</script>

<template>
  <div
    :class="cn(
      'group relative w-full overflow-hidden rounded-md border bg-background text-foreground',
      props.class
    )"
    :data-language="props.language"
  >
    <slot />
    <div class="relative overflow-auto">
      <pre class="m-0 p-4 text-sm">
<code :class="cn('font-mono text-sm', props.showLineNumbers && '[counter-increment:line_0] [counter-reset:line]')"><span
  v-for="(line, idx) in lines"
  :key="idx"
  :class="props.showLineNumbers ? 'block before:content-[counter(line)] before:inline-block before:[counter-increment:line] before:w-8 before:mr-4 before:text-right before:text-muted-foreground/50 before:font-mono before:select-none' : 'block'"
>{{ line || "\n" }}</span></code></pre>
    </div>
  </div>
</template>
