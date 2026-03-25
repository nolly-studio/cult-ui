<script setup lang="ts">
import { ref, inject, onUnmounted } from "vue"
import { Check, Copy } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import { CODE_BLOCK_KEY } from "./CodeBlock.vue"

defineOptions({ name: "CodeBlockCopyButton" })

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

const ctx = inject(CODE_BLOCK_KEY)
const isCopied = ref(false)
let timeoutId: ReturnType<typeof setTimeout> | undefined

async function copyToClipboard() {
  if (!ctx || typeof window === "undefined" || !navigator?.clipboard?.writeText) {
    emit("error", new Error("Clipboard API not available"))
    return
  }
  try {
    if (!isCopied.value) {
      await navigator.clipboard.writeText(ctx.code)
      isCopied.value = true
      emit("copy")
      timeoutId = setTimeout(() => { isCopied.value = false }, props.timeout)
    }
  } catch (error) {
    emit("error", error as Error)
  }
}

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId)
})
</script>

<template>
  <button
    type="button"
    :class="cn('inline-flex items-center justify-center shrink-0 size-8 rounded-md hover:bg-accent', props.class)"
    @click="copyToClipboard"
  >
    <slot>
      <Check v-if="isCopied" :size="14" />
      <Copy v-else :size="14" />
    </slot>
  </button>
</template>
