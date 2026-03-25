<script setup lang="ts">
import { ref, inject, onUnmounted } from "vue"
import { cn } from "@/lib/utils"
import { CheckIcon, CopyIcon } from "lucide-vue-next"
import { snippetKey } from "./Snippet.vue"

defineOptions({ name: "SnippetCopyButton" })

const props = withDefaults(
  defineProps<{
    class?: string
    timeout?: number
  }>(),
  { timeout: 2000 }
)

const emit = defineEmits<{
  copy: []
  error: [error: Error]
}>()

const context = inject(snippetKey)
const code = context?.code ?? ""

const isCopied = ref(false)
let timeoutId: ReturnType<typeof setTimeout> | null = null

async function copyToClipboard() {
  if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
    emit("error", new Error("Clipboard API not available"))
    return
  }

  try {
    if (!isCopied.value) {
      await navigator.clipboard.writeText(code)
      isCopied.value = true
      emit("copy")
      timeoutId = setTimeout(() => {
        isCopied.value = false
      }, props.timeout)
    }
  } catch (error) {
    emit("error", error as Error)
  }
}

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})
</script>

<template>
  <button
    aria-label="Copy"
    :class="cn(
      'inline-flex items-center justify-center rounded-md px-2 py-1 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
      props.class
    )"
    title="Copy"
    type="button"
    @click="copyToClipboard"
  >
    <slot>
      <CheckIcon v-if="isCopied" class="size-3.5" :size="14" />
      <CopyIcon v-else class="size-3.5" :size="14" />
    </slot>
  </button>
</template>
