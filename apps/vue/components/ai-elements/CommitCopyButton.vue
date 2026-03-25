<script setup lang="ts">
import { ref, onUnmounted } from "vue"
import { Check, Copy } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "CommitCopyButton" })

const props = withDefaults(
  defineProps<{
    class?: string
    hash: string
    timeout?: number
  }>(),
  { timeout: 2000 }
)

const emit = defineEmits<{
  copy: []
  error: [error: Error]
}>()

const isCopied = ref(false)
let timeoutId: ReturnType<typeof setTimeout> | undefined

async function copyToClipboard() {
  if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
    emit("error", new Error("Clipboard API not available"))
    return
  }
  try {
    if (!isCopied.value) {
      await navigator.clipboard.writeText(props.hash)
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
    :class="cn('inline-flex items-center justify-center size-7 shrink-0 rounded-md hover:bg-accent', props.class)"
    @click="copyToClipboard"
  >
    <slot>
      <Check v-if="isCopied" :size="14" />
      <Copy v-else :size="14" />
    </slot>
  </button>
</template>
