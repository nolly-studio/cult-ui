<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue"
import { cn } from "@/lib/utils"
import { CheckIcon, CopyIcon } from "lucide-vue-next"
import Button from "@/components/ui/Button.vue"
import { useStackTrace } from "./stack-trace-utils"

defineOptions({ name: "StackTraceCopyButton" })

const props = withDefaults(
  defineProps<{
    class?: string
    timeout?: number
  }>(),
  {
    timeout: 2000,
  },
)

const emit = defineEmits<{
  copy: []
  error: [error: Error]
}>()

const { raw } = useStackTrace()
const isCopied = ref(false)
let timeoutId = 0

async function copyToClipboard() {
  if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
    emit("error", new Error("Clipboard API not available"))
    return
  }

  try {
    await navigator.clipboard.writeText(raw.value)
    isCopied.value = true
    emit("copy")
    timeoutId = window.setTimeout(() => {
      isCopied.value = false
    }, props.timeout)
  } catch (error) {
    emit("error", error as Error)
  }
}

onBeforeUnmount(() => {
  window.clearTimeout(timeoutId)
})
</script>

<template>
  <Button
    :class="cn('size-7', props.class)"
    size="icon"
    variant="ghost"
    @click="copyToClipboard"
  >
    <slot>
      <component :is="isCopied ? CheckIcon : CopyIcon" :size="14" />
    </slot>
  </Button>
</template>
