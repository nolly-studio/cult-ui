<script setup lang="ts">
import { ref, inject, onUnmounted } from "vue"
import { Check, Copy } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import { ENV_VAR_KEY } from "./EnvironmentVariable.vue"

defineOptions({ name: "EnvironmentVariableCopyButton" })

const props = withDefaults(
  defineProps<{
    class?: string
    timeout?: number
    copyFormat?: "name" | "value" | "export"
  }>(),
  { timeout: 2000, copyFormat: "value" }
)

const emit = defineEmits<{
  copy: []
  error: [error: Error]
}>()

const envVar = inject(ENV_VAR_KEY)!
const isCopied = ref(false)
let timeoutId: ReturnType<typeof setTimeout> | undefined

function getTextToCopy(): string {
  const formatMap = {
    export: () => `export ${envVar.name}="${envVar.value}"`,
    name: () => envVar.name,
    value: () => envVar.value,
  }
  return formatMap[props.copyFormat]()
}

async function copyToClipboard() {
  if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
    emit("error", new Error("Clipboard API not available"))
    return
  }
  try {
    await navigator.clipboard.writeText(getTextToCopy())
    if (timeoutId) clearTimeout(timeoutId)
    isCopied.value = true
    emit("copy")
    timeoutId = setTimeout(() => { isCopied.value = false }, props.timeout)
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
    :class="cn('inline-flex items-center justify-center size-6 shrink-0 rounded-md hover:bg-accent', props.class)"
    @click="copyToClipboard"
  >
    <slot>
      <Check v-if="isCopied" :size="12" />
      <Copy v-else :size="12" />
    </slot>
  </button>
</template>
